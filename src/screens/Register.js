import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOff from '../../assets/images/visibilityof.svg';
import VisibilityOn from '../../assets/images/visibilityon.svg';
import { fontFamilies } from '../constants/fonts';
import { userSignUp } from '../redu/actions/UserActions';

const Register = () => {
  const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rePasswordVisibility, setRePasswordVisibility] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRePassword, setUserRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);

  const registerButtonClick = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userName === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Your Name.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userEmail === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Email.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (!emailRegex.test(userEmail)) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Valid Email.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userNumber === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Number.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userNumber.length !== 10) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Phone Number should be of 10 digits.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userDeliveryAddress === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Delivery Address.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userPassword === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Password.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userRePassword === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Same Password Once More.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (userPassword !== userRePassword) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Passwords Do Not Match.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      await dispatched(
        userSignUp(
          userName,
          userEmail,
          userRePassword,
          `+91${userNumber}`,
          userDeliveryAddress,
        ),
      );
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Registered Successfully.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
      navigation.navigate('Tabs');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
        <StatusBar backgroundColor="#171717" />
        {loading && (
          <View style={RegisterStyle.progressLoaderOverlayBg}>
            <View style={RegisterStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 4 }}>
            <Text
              style={{
                fontFamily: fontFamilies.INTER.bold,
                color: '#FFFFFF',
                fontSize: 36,
                marginLeft: 8,
                includeFontPadding: false,
                marginTop: 12,
              }}
            >
              {'Sign Up'}
            </Text>
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
                  source={require('../../assets/images/user.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={17}
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
                  marginTop={17}
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
              {'Password'}
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
                  source={require('../../assets/images/passwordlock.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={17}
                  marginLeft={8}
                />
                <TextInput
                  onChangeText={text => setUserPassword(text)}
                  value={userPassword}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 10,
                  }}
                  placeholder="Enter Password"
                  placeholderTextColor={'#FFFFFF8F'}
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 20,
                    marginRight: 10,
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    if (passwordVisibility) {
                      setPasswordVisibility(false);
                    } else {
                      setPasswordVisibility(true);
                    }
                  }}
                >
                  {passwordVisibility ? (
                    <VisibilityOff width={20} height={20} />
                  ) : (
                    <VisibilityOn width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
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
              {'Retype Password'}
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
                  source={require('../../assets/images/passwordlock.png')}
                  tintColor={'#FFFFFF8F'}
                  marginTop={17}
                  marginLeft={8}
                />
                <TextInput
                  onChangeText={text => setUserRePassword(text)}
                  value={userRePassword}
                  style={{
                    color: '#FFFFFF8F',
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    marginTop: 12,
                    marginLeft: 10,
                  }}
                  placeholder="Retype Password"
                  placeholderTextColor={'#FFFFFF8F'}
                  autoCorrect={false}
                  secureTextEntry={rePasswordVisibility}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 20,
                    marginRight: 10,
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    if (rePasswordVisibility) {
                      setRePasswordVisibility(false);
                    } else {
                      setRePasswordVisibility(true);
                    }
                  }}
                >
                  {rePasswordVisibility ? (
                    <VisibilityOff width={20} height={20} />
                  ) : (
                    <VisibilityOn width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              registerButtonClick();
            }}
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
              {'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const RegisterStyle = StyleSheet.create({
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

export default Register;
