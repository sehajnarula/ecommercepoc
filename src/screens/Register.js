import React,{useState,useEffect} from "react";
import {View,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet,Image} from "react-native";
import {SafeAreaView,SafeAreaProvider,useSafeAreaInsets} from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import {fontFamilies} from "../constants/fonts";
import VisibilityOn from '../../assets/images/visibilityon.svg';
import VisibilityOff from '../../assets/images/visibilityof.svg';
import {userSignUp} from "../redu/actions/UserActions";
import {useSelector,useDispatch} from "react-redux";
import firestore from '@react-native-firebase/firestore';
import Toast from "react-native-toast-message";
import * as progress from 'react-native-progress';

const Register = ()=>{

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [allUsers,setAllUsers] = useState([]);
    const [passwordVisibility,setPasswordVisibility] = useState(false);
    const [rePasswordVisibility,setRePasswordVisibility] = useState(false);
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const [userRePassword,setUserRePassword] = useState("");
    const [loading,setLoading] = useState(false);
    const dispatched = useDispatch();
    const error = useSelector(state => state.user.error);

  const registerButtonClick = async()=>{
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userFound = allUsers.some((user) => user.email === userEmail);
    if(userName===""){
      setLoading(false);
        Toast.show({
          type:'error',
          text1: 'Enter Your Name.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });
    }else if(userEmail===""){
      setLoading(false);
          Toast.show({
          type:'error',
          text1: 'Enter Email.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });
    }else if(!emailRegex.test(userEmail)){
      setLoading(false);
          Toast.show({
          type:'error',
          text1: 'Enter Valid Email.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });      
    }else if(userPassword===""){
      setLoading(false);
          Toast.show({
          type:'error',
          text1: 'Enter Password.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });
    }else if(userRePassword===""){
      setLoading(false);
          Toast.show({
          type:'error',
          text1: 'Enter Same Password Once More.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });      
    }else if(userPassword!==userRePassword){
      setLoading(false);
        Toast.show({
          type:'error',
          text1: 'Passwords Do Not Match.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });  
    }else if(userFound){
      setLoading(false);
        Toast.show({
          type:'error',
          text1: 'User Already Exists',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });       
    }else{
      await dispatched(userSignUp(userName,userEmail,userRePassword));
      setLoading(false);    
      Toast.show({
          type:'success',
          text1: 'Registered Successfully.',
          autoHide: true,
          position:'bottom',
          visibilityTime: 3000,
        });
        navigation.navigate("Tabs");
    }
  };

   const getAllUsers = async()=>{
     try {
      const userSnapshot = await firestore().collection("users").get();
      const users = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("showallusers",users);
    setAllUsers(users); 
    } catch (error) {
      console.log("allusersfetcherror",error);
     } 
   };

   useEffect(()=>{
    getAllUsers();  
   },[isFocused]);

    return(

      <SafeAreaProvider>
      <SafeAreaView style = {{flex:1,backgroundColor:"#171717"}}>
        {loading && (
              <View style = {RegisterStyle.progressLoaderOverlayBg}>
             <View style = {RegisterStyle.progressLoaderContainer}>
             <progress.Circle
                indeterminate
                size={50}
                color="#F0DCBC"/>
             </View> 
            </View>
          )}  
      <ScrollView contentContainerStyle = {{flexGrow:1}}>
      <View style = {{flex:1,padding:4}}>
     <Text style = {{fontFamily:fontFamilies.INTER.bold,color:'#FFFFFF',fontSize:36,marginLeft:8,includeFontPadding:false,marginTop:12}}>
     {"Welcome"}   
     </Text>      
     <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:16,marginLeft:8,marginTop:20}}>
     {"Full Name"}   
     </Text>
     <View style = {{paddingBottom:10,borderRadius:10,backgroundColor:"#323130",marginHorizontal:8,marginTop:12}}>
     <View style = {{flexDirection:'row'}}>
     <Image width={24} height={24} source={require('../../assets/images/user.png')} tintColor={'#FFFFFF8F'} marginTop = {17} marginLeft = {5}/>   
    <TextInput
     onChangeText={(text)=>setUserName(text)}
     style = {{color:"#FFFFFF8F",fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginTop:12,marginLeft:5}}
     placeholder="Enter Full Name"
     placeholderTextColor={"#FFFFFF8F"}
     value={userName}
     autoCorrect = {false}
     autoCapitalize="none"/>
     </View>   
     </View>
      <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:16,marginLeft:8,marginTop:12}}>
      {"Email"}   
      </Text>    
     <View style = {{paddingBottom:10,borderRadius:10,backgroundColor:"#323130",marginHorizontal:8,marginTop:12}}>
     <View style = {{flexDirection:'row'}}>
     <Image width={24} height={24} source={require('../../assets/images/user.png')} tintColor={'#FFFFFF8F'} marginTop = {17} marginLeft = {5}/>   
    <TextInput
     onChangeText={(text)=>setUserEmail(text)}
     style = {{color:"#FFFFFF8F",fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginTop:12,marginLeft:5}}
     placeholder="Enter Email"
     placeholderTextColor={"#FFFFFF8F"}
     value={userEmail}
     autoCorrect = {false}
     autoCapitalize="none"/>
     </View>   
     </View>
     <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:16,marginLeft:8,marginTop:20}}>
     {"Password"}   
     </Text>
     <View style = {{paddingBottom:10,borderRadius:10,backgroundColor:"#323130",marginHorizontal:8,marginTop:12}}>
     <View style = {{flexDirection:'row'}}>
     <Image width={24} height={24} source={require('../../assets/images/passwordlock.png')} tintColor={'#FFFFFF8F'} marginTop = {17} marginLeft = {8}/>
     <TextInput
     onChangeText={(text)=>setUserPassword(text)}
     value={userPassword}
     style = {{color:"#FFFFFF8F",fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginTop:12,marginLeft:10}}
     placeholder="Enter Password"
     placeholderTextColor={"#FFFFFF8F"}
     autoCorrect = {false}
     secureTextEntry = {passwordVisibility}
     autoCapitalize="none"/>
     <TouchableOpacity style = {{position:'absolute',right:0,marginTop:20,marginRight:10}}
     activeOpacity={1}
     onPress={()=>{
        if(passwordVisibility){
           setPasswordVisibility(false); 
        }else{
          setPasswordVisibility(true);  
        }
     }}>
      {passwordVisibility?(
        <VisibilityOff width = {20} height = {20}/>
      ):(
        <VisibilityOn width = {20} height = {20}/>
      )}  
     </TouchableOpacity>     
     </View>   
     </View>
     <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:16,marginLeft:8,marginTop:20}}>
     {"Retype Password"}   
     </Text>
     <View style = {{paddingBottom:10,borderRadius:10,backgroundColor:"#323130",marginHorizontal:8,marginTop:12}}>
     <View style = {{flexDirection:'row'}}>
     <Image width={24} height={24} source={require('../../assets/images/passwordlock.png')} tintColor={'#FFFFFF8F'} marginTop = {17} marginLeft = {8}/>
     <TextInput
     onChangeText={(text)=>setUserRePassword(text)}
     value={userRePassword}
     style = {{color:"#FFFFFF8F",fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginTop:12,marginLeft:10}}
     placeholder="Retype Password"
     placeholderTextColor={"#FFFFFF8F"}
     autoCorrect = {false}
     secureTextEntry = {rePasswordVisibility}
     autoCapitalize="none"/>
     <TouchableOpacity style = {{position:'absolute',right:0,marginTop:20,marginRight:10}}
     activeOpacity={1}
     onPress={()=>{
        if(rePasswordVisibility){
           setRePasswordVisibility(false); 
        }else{
          setRePasswordVisibility(true);  
        }
     }}>
      {rePasswordVisibility?(
        <VisibilityOff width = {20} height = {20}/>
      ):(
        <VisibilityOn width = {20} height = {20}/>
      )}  
     </TouchableOpacity>     
     </View>   
     </View>          
      </View>  
      </ScrollView>
      <View style = {{flexDirection:'column',marginBottom:insets.bottom+10}}>
      <TouchableOpacity
      activeOpacity={0.9}
      onPress={()=>{
        registerButtonClick();
      }}
      style = {{backgroundColor:'#F0DCBC',marginHorizontal:12,borderRadius:4,justifyContent:'center',alignItems:'center',padding:10}}>
     <Text style = {{textAlign:'center',color:"#000000",fontSize:16,fontFamily:fontFamilies.INTER.medium,includeFontPadding:false}}>
     {"Register"}   
     </Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>  
      </SafeAreaProvider>  

    );
};

const RegisterStyle = StyleSheet.create({
    progressLoaderOverlayBg:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999
    },
    progressLoaderContainer:{
      elevation:5,
      shadowColor:'#000',
      borderRadius:10,
      backgroundColor:'#FFFFFF',
      width:100,
      height:100,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },
})

export default Register;