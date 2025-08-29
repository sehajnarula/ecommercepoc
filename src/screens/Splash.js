import React,{useEffect,useRef} from "react";
import {View,Animated} from "react-native";
import {SafeAreaView,SafeAreaProvider} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import SplashLogo from '../../assets/images/splashiconlogo.svg';

const Splash = ()=>{

    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;// initial opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,// takes one second for fade in opacity animation
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("LoginScreen");//splash screen stays for 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

    return(

     <SafeAreaProvider>
     <SafeAreaView style = {{flex:1,backgroundColor:'#171717'}}>
     <View style = {{flex:1}}>
     <View style = {{top:200,justifyContent:'center',alignItems:'center'}}>
     <Animated.View style = {{opacity:fadeAnim}}>
     <SplashLogo width = {275} height = {100}/>        
     </Animated.View>
     </View>   
     </View>   
     </SafeAreaView>
     </SafeAreaProvider>   

    );

};

export default Splash;