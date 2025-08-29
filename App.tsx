/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import React,{useEffect} from "react";
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Splash from '../ecommercedemo/src/screens/Splash';
import Login from '../ecommercedemo/src/screens/Login';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Store from '../ecommercedemo/src/redu/store/Store';
import Register from '../ecommercedemo/src/screens/Register';
import Home from '../ecommercedemo/src/screens/Home';
import Tabs from '../ecommercedemo/src/navigation/tabs/Tabs';
import ProductInformation from '../ecommercedemo/src/screens/ProductInformation';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId:"1090895766635-ns4ktunhl44fgujle6kuk0q8a3hr775m.apps.googleusercontent.com",
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  },[]);

  return (
    <Provider store={Store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
    <Stack.Screen name='SplashScreen' component={Splash}/>
    <Stack.Screen name='LoginScreen' component={Login}/>
    <Stack.Screen name='RegisterScreen' component={Register}/>
    <Stack.Screen name='HomeScreen' component={Home}/>
    <Stack.Screen name='Tabs' component={Tabs}/>
    <Stack.Screen name='ProductInfo' component={ProductInformation}/>
    </Stack.Navigator>
    <Toast/>  
    </NavigationContainer>      
    </Provider>
  );
}

export default App;
