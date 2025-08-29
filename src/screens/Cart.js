import React,{useState,useEffect} from "react";
import {View,ScrollView,TouchableOpacity,StyleSheet,Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaProvider,useSafeAreaInsets,SafeAreaView} from "react-native-safe-area-context";
import BackArrow from '../../assets/images/productinfoarrow.svg';
import {fontFamilies} from "../constants/fonts";
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import LocationIcon from'../../assets/images/cartlocationicon.svg';
import EditAddress from'../../assets/images/carteditaddress.svg';

const Cart = ()=>{

    const navigation = useNavigation();

    return(

      <SafeAreaProvider>
      <SafeAreaView style = {{flex:1,backgroundColor:'#0E0E0E'}}>
      <View style = {{backgroundColor:'#000000',height:50}}>
      <View style = {{flexDirection:'row'}}>
      <TouchableOpacity
      style = {{position:'absolute',left:0,marginLeft:5,marginTop:15}}
      activeOpacity={1}
      onPress={()=>{
        navigation.goBack();
      }}>    
      <BackArrow width = {18} height = {18}/>
      </TouchableOpacity>
    <Text style={{color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium,marginTop:50,fontSize:16,textAlign:'center',position:'absolute',alignSelf:'center',width:'100%'}}>
      {'Cart'}
    </Text>
      <TouchableOpacity
      activeOpacity={1}
      style = {{position:'absolute',right:0,marginRight:5,marginTop:9}}>
      <FavourteIcon width = {32} height = {32}/>
      </TouchableOpacity>      
      </View>
      </View>
      <ScrollView contentContainerStyle = {{flexGrow:1}}>
      <View style = {{flex:1,padding:2}}>
       <View style = {{backgroundColor:'#151515',borderWidth:1,borderColor:'#414141',padding:15,borderRadius:12,justifyContent:'center',alignItems:'center'}}>
       <View style = {{flexDirection:'row'}}>
       <LocationIcon width = {14} height = {20}/> 
       <View>
       <Text style = {{fontFamily:fontFamilies.INTER.medium,fontSize:13,color:'#FFFFFF'}}>
       {`Deliver`}
       </Text> 
       </View>
       </View>
       <View>
      </View> 
       </View> 
      </View>
      </ScrollView>
      </SafeAreaView>  
      </SafeAreaProvider>  

    );

};

export default Cart;