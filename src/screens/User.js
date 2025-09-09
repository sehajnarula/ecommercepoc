import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as progress from 'react-native-progress';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BackArrow from '../../assets/images/navigatebacktoprevious.svg';
import { fontFamilies } from '../constants/fonts';

const User = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // const updateUserButton = async () => {
  //   setLoading(true);
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (userName === '') {
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Enter Your Name.',
  //       autoHide: true,
  //       position: 'bottom',
  //       visibilityTime: 3000,
  //     });
  //   } else if (userNumber === '') {
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Enter Number.',
  //       autoHide: true,
  //       position: 'bottom',
  //       visibilityTime: 3000,
  //     });
  //   } else if (userNumber.length !== 10) {
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Phone Number should be of 10 digits.',
  //       autoHide: true,
  //       position: 'bottom',
  //       visibilityTime: 3000,
  //     });
  //   } else if (userDeliveryAddress === '') {
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Enter Delivery Address.',
  //       autoHide: true,
  //       position: 'bottom',
  //       visibilityTime: 3000,
  //     });
  //   } else {
  //     await dispatched(
  //       userUpdate(
  //         userName,
  //         userDeliveryAddress,
  //         `+91${userNumber}`,
  //         userToken,
  //       ),
  //     );
  //     setLoading(false);
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Updated Successfully.',
  //       autoHide: true,
  //       position: 'bottom',
  //       visibilityTime: 3000,
  //     });
  //   }
  // };

  const getUserStateLocally = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson !== null) {
        const user = JSON.parse(userJson);

        let userSavedNumber = user.phoneNumber;

        if (userSavedNumber.startsWith('+91')) {
          userSavedNumber = userSavedNumber.substring(3);
        }

        setUserEmail(user.email);
        setUserName(user.name);
        setUserNumber(userSavedNumber);
        setUserDeliveryAddress(user.address);
        console.log('showuser', user);
      }
    } catch (error) {
      console.log('getuserlocallyerror', error);
    }
  };

  useEffect(() => {
    getUserStateLocally();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
        <StatusBar backgroundColor="#171717" />
        {loading && (
          <View style={UpdateUserStyle.progressLoaderOverlayBg}>
            <View style={UpdateUserStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackArrow width={18} height={18} marginTop={25} marginLeft={10} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fontFamilies.INTER.bold,
              color: '#FFFFFF',
              fontSize: 36,
              marginLeft: 10,
              includeFontPadding: false,
              marginTop: 12,
            }}
          >
            {'Profile'}
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 4 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                includeFontPadding: false,
                fontSize: 16,
                marginLeft: 8,
                marginTop: 20,
              }}
            >
              {'Full Name'}
            </Text>
            <View
              style={{
                paddingBottom: 10,
                borderRadius: 10,
                backgroundColor: '#323130',
                marginHorizontal: 8,
                marginTop: 12,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  width={24}
                  height={24}
                  source={require('../../assets/images/user.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={17}
                  marginLeft={5}
                />
                <TextInput
                  onChangeText={text => setUserName(text)}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 5,
                  }}
                  placeholder="Enter Full Name"
                  placeholderTextColor={'#FFFFFF8F'}
                  value={userName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                includeFontPadding: false,
                fontSize: 16,
                marginLeft: 8,
                marginTop: 12,
              }}
            >
              {'Email'}
            </Text>
            <View
              style={{
                paddingBottom: 10,
                borderRadius: 10,
                backgroundColor: '#323130',
                marginHorizontal: 8,
                marginTop: 12,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  width={24}
                  height={24}
                  source={require('../../assets/images/emailsmall.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={18}
                  marginLeft={5}
                />
                <TextInput
                  onChangeText={text => setUserEmail(text)}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 5,
                  }}
                  placeholder="Enter Email"
                  placeholderTextColor={'#FFFFFF8F'}
                  value={userEmail}
                  autoCorrect={false}
                  editable={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                includeFontPadding: false,
                fontSize: 16,
                marginLeft: 8,
                marginTop: 12,
              }}
            >
              {'Phone Number'}
            </Text>
            <View
              style={{
                paddingBottom: 10,
                borderRadius: 10,
                backgroundColor: '#323130',
                marginHorizontal: 8,
                marginTop: 12,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  width={24}
                  height={24}
                  source={require('../../assets/images/phoneiconsmall.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={17}
                  marginLeft={5}
                />
                <TextInput
                  onChangeText={text => setUserNumber(text)}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 5,
                  }}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={'#FFFFFF8F'}
                  value={userNumber}
                  maxLength={10}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                includeFontPadding: false,
                fontSize: 16,
                marginLeft: 8,
                marginTop: 12,
              }}
            >
              {'Delivery Address'}
            </Text>
            <View
              style={{
                paddingBottom: 10,
                borderRadius: 10,
                backgroundColor: '#323130',
                marginHorizontal: 8,
                marginTop: 12,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  width={24}
                  height={24}
                  source={require('../../assets/images/addresssmall.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={19}
                  marginLeft={5}
                />
                <TextInput
                  onChangeText={text => setUserDeliveryAddress(text)}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 5,
                  }}
                  placeholder="Enter Delivery Address"
                  placeholderTextColor={'#FFFFFF8F'}
                  value={userDeliveryAddress}
                  autoCorrect={false}
                  multiline={true}
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{ flexDirection: 'column', marginBottom: insets.bottom + 10 }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: '#F0DCBC',
              marginHorizontal: 12,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                fontSize: 16,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {'Update'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const UpdateUserStyle = StyleSheet.create({
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

export default User;
