import Voice from '@react-native-voice/voice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import * as progress from 'react-native-progress';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import Microphone from '../../assets/images/homepagemicrophoneicon.svg';
import NotificationsIcon from '../../assets/images/homepagenotificationsicon.svg';
import UserIcon from '../../assets/images/homepageusericon.svg';
import SearchIcon from '../../assets/images/homesearchicon.svg';
import HorizontalCategoriesHome from '../components/HorizontalCategoriesHome';
import ShowCategoryProductsOnHome from '../components/ShowCategoryProductsOnHome';
import { closeApp } from '../constants/commonfunctions';
import { fontFamilies } from '../constants/fonts';
import { shiprocketAuthCall } from '../redu/actions/ShipRocketActions';
import { userSignOut } from '../redu/actions/UserActions';

const Home = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const insets = useSafeAreaInsets();
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const navigation = useNavigation();

  const signOutButtonPress = async () => {
    await dispatched(userSignOut());
    navigation.navigate('LoginScreen');
  };

  const recordAudioDevicePermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.RECORD_AUDIO
        : PERMISSIONS.IOS.MICROPHONE;

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  };

  const isFocused = useIsFocused();

  const getTokenShipRocketOnScreen = async () => {
    setLoading(true);
    await dispatched(shiprocketAuthCall());
    setLoading(false);
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults; // results after getting voice input
    Voice.onSpeechError = onSpeechError; //showerror

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = event => {
    if (event.value && event.value.length > 0) {
      setSearch(event.value[0]); // identify voice text
    }
  };

  const onSpeechError = event => {
    console.log('Speech error:', event.error); //api error
    setIsListening(false);
  };

  const handleMicPress = async () => {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        const hasPermission = await recordAudioDevicePermission();
        if (hasPermission) {
          await Voice.start('en-US');
          setIsListening(true);
        } else {
          console.log('Microphone permission denied');
        }
      }
    } catch (e) {
      console.error('Voice error:', e);
    }
  };

  useEffect(() => {
    let backHandlerCloseScreen;

    if (isFocused) {
      backHandlerCloseScreen = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          closeApp();
          return true;
        },
      );
      getTokenShipRocketOnScreen();
    }
    return () => {
      if (backHandlerCloseScreen) {
        backHandlerCloseScreen.remove();
      }
    };
  }, [isFocused]);

  const allCategories = [
    {
      categoryId: '1',
      categoryName: 'Bedsheet',
      products: [
        {
          productId: '1',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/bedsheetone.jpg'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '2',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/bedsheettwo.jpg'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '3',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/bedsheetthree.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '4',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/bedsheetfour.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
      ],
      premiumCollection: {
        premiumProductId: '9',
        productName: 'Home Essential Vasant King Bedsheet Gift Set',
        productOriginalPrice: '2300',
        productReducedPrice: '2100',
        rating: '4.3',
        image: require('../../assets/images/bedsheetfour.png'),
        reviewCount: '2000',
        bulkEligible: true,
      },
    },
    {
      categoryId: '2',
      categoryName: 'Towels',
      products: [
        {
          productId: '5',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/towelone.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '6',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/toweltwo.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '7',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/towelthree.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
        {
          productId: '8',
          productName: 'Home Essential Vasant King Bedsheet Gift Set',
          productOriginalPrice: '2300',
          productReducedPrice: '2100',
          rating: '4.3',
          image: require('../../assets/images/bedsheetfour.png'),
          reviewCount: '2000',
          bulkEligible: true,
        },
      ],
      premiumCollection: {
        premiumProductId: '10',
        productName: 'Home Essential Vasant King Bedsheet Gift Set',
        productOriginalPrice: '2300',
        productReducedPrice: '2100',
        rating: '4.3',
        image: require('../../assets/images/towelthree.png'),
        reviewCount: '2000',
        bulkEligible: true,
      },
    },
  ];

  const horizontalCategories = [
    {
      categoryId: '0',
      categoryName: 'All',
      image: require('../../assets/images/homepageallicon.png'),
    },
    {
      categoryId: '1',
      categoryName: 'Bedsheet',
      image: require('../../assets/images/homepagebedsheeticon.png'),
    },
    {
      categoryId: '2',
      categoryName: 'Towels',
      image: require('../../assets/images/homepagebedsheeticon.png'),
    },
    {
      categoryId: '3',
      categoryName: 'Curtains',
      image: require('../../assets/images/homepagecurtainsicon.png'),
    },
    {
      categoryId: '4',
      categoryName: 'Sofa Cover',
      image: require('../../assets/images/homepagesofaicon.png'),
    },
    {
      categoryId: '5',
      categoryName: 'Pillow',
      image: require('../../assets/images/homepagesofaicon.png'),
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <StatusBar backgroundColor="#171717" />

        {loading && (
          <View style={HomeStyle.progressLoaderOverlayBg}>
            <View style={HomeStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}

        <View
          style={{
            backgroundColor: '#000000',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: fontFamilies.INTER.medium,
                }}
              >
                {'Curated By'}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontFamily: fontFamilies.INTER.bold,
                  marginTop: 3,
                }}
              >
                {'Elitelivstyle'}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0,
                marginTop: 20,
                marginRight: 5,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={1}>
                  <NotificationsIcon width={32} height={32} marginEnd={10} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}>
                  <FavourteIcon width={32} height={32} marginEnd={10} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    navigation.navigate('UserScreen');
                  }}
                >
                  <UserIcon width={32} height={32} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginRight: 5, marginTop: 8 }}
                  activeOpacity={0.9}
                  onPress={() => {
                    signOutButtonPress();
                  }}
                >
                  <Image
                    width={24}
                    height={24}
                    source={require('../../assets/images/logouticonsmall.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#000000' }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                paddingTop: 4,
                paddingBottom: 4,
                paddingRight: 30,
                paddingLeft: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <SearchIcon
                width={20}
                height={20}
                marginTop={10}
                marginLeft={10}
              />

              <TextInput
                onChangeText={text => setSearch(text)}
                value={search}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  color: '#171717',
                  fontFamily: fontFamilies.INTER.medium,
                  marginLeft: 9,
                  flex: 1,
                }}
                placeholder="Search bedsheets"
                placeholderTextColor={'#171717'}
              ></TextInput>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 13,
                  marginRight: 12,
                }}
                activeOpacity={0.9}
                onLongPress={() => {
                  handleMicPress();
                }}
              >
                <Microphone width={15} height={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#000000' }}>
          <HorizontalCategoriesHome
            isHorizontal={true}
            data={horizontalCategories}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: insets.bottom + 5,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, padding: 2 }}>
            <ShowCategoryProductsOnHome
              isHorizontal={false}
              data={allCategories}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const HomeStyle = StyleSheet.create({
  progressLoaderOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  progressLoaderContainer: {
    elevation: 5,
    shadowColor: '#000',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
