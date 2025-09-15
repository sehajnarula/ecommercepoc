import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Dimensions,
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
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import * as progress from 'react-native-progress';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { startSpeechToText } from 'react-native-voice-to-text';
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
import keys from '../constants/keys';
import { shiprocketAuthCall } from '../redu/actions/ShipRocketActions';
import { userSignOut } from '../redu/actions/UserActions';

const Home = ({ setShowTab }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatched = useDispatch();
  const [deviceLocation, setDeviceLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const error = useSelector(state => state.user.error);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const signOutButtonPress = async () => {
    await dispatched(userSignOut());
    navigation.navigate('LoginScreen');
  };

  const lastOffsetY = useRef(0);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY <= 0) {
      // always show when user is at very top
      setShowTab(true);
    } else if (offsetY + layoutHeight >= contentHeight - 20) {
      // after scroll ends
      setShowTab(true);
    } else if (offsetY > lastOffsetY.current) {
      // scrolling down
      setShowTab(false);
    } else if (offsetY < lastOffsetY.current) {
      // scrolling up
      setShowTab(false);
    }
    lastOffsetY.current = offsetY;
  };

  const recordAudioDevicePermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.RECORD_AUDIO
        : PERMISSIONS.IOS.MICROPHONE;

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  };

  const requestLocationPermissions = async () => {
    // try {
    //   if (Platform.OS === 'android') {
    //     // First check coarse location
    //     const coarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    //     if (coarse !== RESULTS.GRANTED) {
    //       await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    //     }

    //     // Then check fine location
    //     const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //     if (fine !== RESULTS.GRANTED) {
    //       await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //     }

    //     // Finally check background location (Android 10+)
    //     const background = await check(
    //       PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    //     );
    //     if (background !== RESULTS.GRANTED) {
    //       await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
    //     }
    //   } else if (Platform.OS === 'ios') {
    //     // iOS uses locationWhenInUse / locationAlways
    //     const whenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //     if (whenInUse !== RESULTS.GRANTED) {
    //       await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //     }

    //     const always = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    //     if (always !== RESULTS.GRANTED) {
    //       await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    //     }
    //   }
    // } catch (error) {
    //   console.warn('Permission check/request error:', error);
    // }

    try {
      if (Platform.OS === 'android') {
        // 1. Request FINE location for android
        let fineStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (fineStatus !== RESULTS.GRANTED) {
          fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (fineStatus === RESULTS.GRANTED) {
          // 2. Request BACKGROUND location (only Android 10+ shows dialog)
          let backgroundStatus = await check(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
          );
          if (backgroundStatus !== RESULTS.GRANTED) {
            backgroundStatus = await request(
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            );
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });

              console.log('showlatlong', position.coords.latitude);
              console.log('showlatlong', position.coords.longitude);
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );

          return {
            fine: fineStatus,
            background: backgroundStatus,
          };
        } else {
          return {
            fine: fineStatus,
            background: RESULTS.DENIED,
          };
        }
      } else if (Platform.OS === 'ios') {
        // iOS permission check
        let whenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (whenInUse !== RESULTS.GRANTED) {
          whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        let always = RESULTS.DENIED;
        if (whenInUse === RESULTS.GRANTED) {
          always = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
          if (always !== RESULTS.GRANTED) {
            always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }

        return {
          whenInUse,
          always,
        };
      }
    } catch (error) {
      console.warn('Permission check/request error:', error);
      return null;
    }
  };

  const isFocused = useIsFocused();

  const getTokenShipRocketOnScreen = async () => {
    setLoading(true);
    await dispatched(shiprocketAuthCall());
    setLoading(false);
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
      requestLocationPermissions();
      console.log('showbaseurlinkeysfile', keys.appApiBaseUrl);
    }
    return () => {
      if (backHandlerCloseScreen) {
        backHandlerCloseScreen.remove();
      }
    };
  }, [isFocused]);

  const animatedFlatListArray = [
    {
      dataId: '1',
      image: require('../../assets/images/animatedslideshowimageone.jpg'),
      textOne: `Buy Together.`,
      textTwo: `Save big.`,
      textThree: `Get exclusive prices by teaming up with neighbours.`,
    },
    {
      dataId: '2',
      image: require('../../assets/images/animatedslideshowimagetwo.jpg'),
      textOne: `Buy Big.`,
      textTwo: `Sell big.`,
      textThree: `Get exclusive prices by teaming up with neighbours.`,
    },
  ];

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
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  includeFontPadding: false,
                  fontFamily: fontFamilies.INTER.medium,
                }}
              >
                {'Curated By'}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  includeFontPadding: false,
                  fontFamily: fontFamilies.PLAYFAIR.semiBold,
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
                marginTop: 15,
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
                  style={{ marginRight: 5 }}
                  onPress={() => {
                    navigation.navigate('UserScreen');
                  }}
                >
                  <UserIcon width={32} height={32} />
                </TouchableOpacity>

                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
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
                onChangeText={text => setSearch(text.trim())}
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
                  marginTop: 14,
                  marginRight: 18,
                }}
                activeOpacity={0.9}
                onLongPress={async () => {
                  const hasPermission = await recordAudioDevicePermission();
                  console.log('Permission granted?', hasPermission);
                  if (hasPermission) {
                    console.log('Starting voice');
                    try {
                      const text = await startSpeechToText();
                      setSearch(`${text}`);
                      console.log('Speech result', text);
                    } catch (error) {
                      console.log('errorvoice', error);
                    }
                  }
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
          contentContainerStyle={{ flexGrow: 1 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: width * 0.91,
                marginLeft: 3.5,
                alignSelf: 'center',
                height: 407,
                marginTop: 5,
              }}
            >
              <Image
                style={{ width: '100%', height: '100%', borderRadius: 11 }}
                source={require('../../assets/images/animatedslideshowimageone.jpg')}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: 15,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', marginLeft: 22 }}>
                  <Text
                    style={{
                      fontFamily: fontFamilies.PLAYFAIR.medium,
                      fontSize: 22,
                      includeFontPadding: false,
                      color: '#FFFFFF',
                    }}
                  >
                    {`Buy Together.`}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontFamilies.PLAYFAIR.medium,
                      fontSize: 22,
                      marginLeft: 3,
                      includeFontPadding: false,
                      color: '#F0DCBC',
                    }}
                  >
                    {`Save Big.`}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.medium,
                    fontSize: 11,
                    marginTop: 5,
                    includeFontPadding: false,
                    color: '#FFFFFF',
                    // textAlign: 'center',
                  }}
                >
                  {`Get exclusive prices by teaming up with neighbours.`}
                </Text>
              </View>
            </View>
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
