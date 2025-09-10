import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
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
import AppleLogin from '../../assets/images/ecomapple.svg';
import FacebookLogin from '../../assets/images/ecomfacebook.svg';
import GoogleLogin from '../../assets/images/ecomgoogle.svg';
import VisibilityOff from '../../assets/images/visibilityof.svg';
import VisibilityOn from '../../assets/images/visibilityon.svg';
import { closeApp } from '../constants/commonfunctions';
import { fontFamilies } from '../constants/fonts';
import {
  firebaseSignIn,
  userGoogleSignIn,
  userSignIn,
} from '../redu/actions/UserActions';

const Login = () => {
  const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const [loading, setLoading] = useState(false);

  const loginButtonPress = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail === '') {
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
    } else if (userPassword === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Password.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      await dispatched(userSignIn(userEmail, userPassword));
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Login Successful.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
      navigation.navigate('Tabs');
    }
  };

  const userFirebaseSignIn = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail === '') {
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
    } else if (userPassword === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Password.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      await dispatched(firebaseSignIn(userEmail, userPassword));
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Login Successful.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
      navigation.navigate('Tabs');
    }
  };

  const googleSignInButtonPress = async () => {
    await dispatched(userGoogleSignIn());
    navigation.navigate('Tabs');
  };

  const isFocused = useIsFocused();

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
    }
    return () => {
      if (backHandlerCloseScreen) {
        backHandlerCloseScreen.remove();
      }
    };
  }, [isFocused]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
        <StatusBar backgroundColor="#171717" />
        {loading && (
          <View style={LoginStyle.progressLoaderOverlayBg}>
            <View style={LoginStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fontFamilies.INTER.bold,
              color: '#FFFFFF',
              fontSize: 36,
              marginLeft: 12,
              includeFontPadding: false,
              marginTop: 12,
            }}
          >
            {'Welcome'}
          </Text>
          <View style={{ top: 100 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                includeFontPadding: false,
                fontSize: 16,
                marginLeft: 12,
              }}
            >
              {'Email'}
            </Text>
            <View
              style={{
                paddingBottom: 10,
                borderRadius: 10,
                backgroundColor: '#323130',
                marginHorizontal: 12,
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
                  onChangeText={text => setUserEmail(text.trim())}
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
                marginLeft: 12,
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
                marginHorizontal: 12,
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
                  onChangeText={text => setUserPassword(text.trim())}
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
                fontFamily: fontFamilies.INTER.medium,
                fontSize: 12,
                marginTop: 12,
                textAlign: 'right',
                marginEnd: 12,
              }}
            >
              {'Forget Password?'}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                marginTop: 20,
                backgroundColor: '#F0DCBC',
                marginHorizontal: 12,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => {
                userFirebaseSignIn();
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
                {'Login'}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.medium,
                fontSize: 12,
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              {'Or'}
            </Text>
            <View
              style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  googleSignInButtonPress();
                }}
              >
                <View
                  style={{
                    padding: 14,
                    justifyContent: 'center',
                    width: 54,
                    height: 54,
                    borderRadius: 40,
                    borderColor: '#FFFFFF8F',
                    borderWidth: 1,
                    backgroundColor: '#F0DCBC',
                  }}
                >
                  <GoogleLogin width={24} height={24} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <View
                  style={{
                    padding: 14,
                    justifyContent: 'center',
                    width: 54,
                    height: 54,
                    borderRadius: 40,
                    borderColor: '#FFFFFF8F',
                    borderWidth: 1,
                    backgroundColor: '#F0DCBC',
                  }}
                >
                  <AppleLogin width={24} height={24} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <View
                  style={{
                    padding: 14,
                    justifyContent: 'center',
                    width: 54,
                    height: 54,
                    borderRadius: 40,
                    borderColor: '#FFFFFF8F',
                    borderWidth: 1,
                    backgroundColor: '#F0DCBC',
                  }}
                >
                  <FacebookLogin width={24} height={24} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 16,
                }}
              >
                {"Don't Have An Account?"}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.bold,
                  fontSize: 16,
                  marginLeft: 6,
                }}
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                {'Sign Up'}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const LoginStyle = StyleSheet.create({
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

export default Login;
