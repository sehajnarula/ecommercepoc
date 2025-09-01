import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashLogo from '../../assets/images/splashiconlogo.svg';

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        setTimeout(() => {
          if (storedUser) {
            navigation.replace('Tabs');
          } else {
            navigation.replace('LoginScreen');
          }
        }, 3000);
      } catch (error) {
        console.log('splash-check-user-error', error);
        navigation.replace('LoginScreen');
      }
    };

    checkUser();
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
        <View style={{ flex: 1 }}>
          <View
            style={{ top: 200, justifyContent: 'center', alignItems: 'center' }}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              <SplashLogo width={275} height={100} />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Splash;
