import React,{useState} from "react";
import {View,StyleSheet,ScrollView,Text,TextInput,Image,TouchableOpacity} from "react-native";
import {SafeAreaView,SafeAreaProvider,useSafeAreaInsets} from "react-native-safe-area-context";
import {fontFamilies} from "../constants/fonts";
import UserIcon from '../../assets/images/homepageusericon.svg';
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import NotificationsIcon from '../../assets/images/homepagenotificationsicon.svg';
import SearchIcon from '../../assets/images/homesearchicon.svg';
import Microphone from '../../assets/images/homepagemicrophoneicon.svg';
import ShowCategoryProductsOnHome from '../components/ShowCategoryProductsOnHome';
import HorizontalCategoriesHome from '../components/HorizontalCategoriesHome';

const Home = ()=>{

    const [search,setSearch] = useState("");
    const insets = useSafeAreaInsets();

    const allCategories = [{
      categoryId:'1',
      categoryName:'Bedsheet',
      products:[{
       productId:'1',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetone.jpg'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'2',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheettwo.jpg'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'3',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetthree.png'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'4',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetfour.png'),
       reviewCount:'2000',
       bulkEligible:true 
      }],
      premiumCollection:[{
       premiumProductId:'9',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetfour.png'),
       reviewCount:'2000',
       bulkEligible:true 
      }],      
    },
    {
      categoryId:'2',
      categoryName:'Towels',
      products:[{
       productId:'5',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/towelone.png'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'6',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/toweltwo.png'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'7',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/towelthree.png'),
       reviewCount:'2000',
       bulkEligible:true 
      },
    {
       productId:'8',
       productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetfour.png'),
       reviewCount:'2000',
       bulkEligible:true 
      }],
      premiumCollection:[{
        premiumProductId:'10',
        productName:'Home Essential Vasant King Bedsheet Gift Set',
       productOriginalPrice:'2300', 
       productReducedPrice:'2100',
       rating:'4.3',
       image:require('../../assets/images/bedsheetfour.png'),
       reviewCount:'2000',
       bulkEligible:true 
      }],
    },];

    const horizontalCategories = [{
      categoryId:'0',
      categoryName:'All',
      image:require('../../assets/images/homepageallicon.png'),
    },
    {
    categoryId:'1',
    categoryName:'Bedsheet',
    image:require('../../assets/images/homepagebedsheeticon.png'),
    },
    {
    categoryId:'2',
    categoryName:'Towels',
    image:require('../../assets/images/homepagebedsheeticon.png'),
    },    
    {
    categoryId:'3',
    categoryName:'Curtains',
    image:require('../../assets/images/homepagecurtainsicon.png'),
    },
    {
    categoryId:'4',
    categoryName:'Sofa Cover',
    image:require('../../assets/images/homepagesofaicon.png'),
    },
    {
    categoryId:'5',
    categoryName:'Pillow',
    image:require('../../assets/images/homepagesofaicon.png'),
    },];

    return(

      <SafeAreaProvider>
      <SafeAreaView style = {{flex:1,backgroundColor:'#0E0E0E'}}>
      <View style = {{flexDirection:'row',marginHorizontal:10,marginTop:10,backgroundColor:'#000000'}}>
      <View>
       <Text style = {{color:'#FFFFFF',fontSize:12,fontFamily:fontFamilies.INTER.medium}}>
       {"Curated By"}
       </Text>
        <Text style = {{color:'#FFFFFF',fontSize:24,fontFamily:fontFamilies.INTER.bold,marginTop:3}}>
       {"Elitelivstyle"}
       </Text> 
      </View>
      <View style = {{position:'absolute',right:0,marginTop:12}}>
      <View style = {{flexDirection:'row'}}>
      <TouchableOpacity
      activeOpacity={1}>
      <NotificationsIcon width = {32} height = {32} marginEnd = {5}/>  
      </TouchableOpacity>
      <TouchableOpacity
      activeOpacity={1}>
      <FavourteIcon width = {32} height = {32} marginEnd = {5}/>  
      </TouchableOpacity>
      <TouchableOpacity
      activeOpacity={1}>
      <UserIcon width = {32} height = {32}/>  
      </TouchableOpacity>            
      </View>
      </View>
      </View>
      <ScrollView contentContainerStyle = {{flexGrow:1,marginBottom:insets.bottom+5}}>
      <View style = {{flex:1,padding:2}}>
      <View style = {{backgroundColor:'#FFFFFF',paddingTop:4,paddingBottom:4,borderRadius:8,marginHorizontal:14,marginTop:6}}>
      <View style = {{flexDirection:'row'}}>
      <SearchIcon width = {20} height = {20} marginTop = {10} marginLeft = {10}/>
      <TextInput
      onChangeText={(text)=>setSearch(text)}
      value={search}
      multiline = {true}
      autoCapitalize="none"
      autoCorrect = {false}
      style = {{color:'#171717',fontFamily:fontFamilies.INTER.medium,marginLeft:10}}
      placeholder="Search bedsheets"
      placeholderTextColor={"#171717"}>
      </TextInput>
      <TouchableOpacity
      style = {{position:'absolute',right:0,marginTop:11,marginRight:10}}
      activeOpacity={0.9}>
      <Microphone width = {15} height = {20}/>  
      </TouchableOpacity>
      </View>
      </View>
      <HorizontalCategoriesHome
      isHorizontal = {true}
      data = {horizontalCategories}/>      
      <ShowCategoryProductsOnHome
      isHorizontal = {false}
      data = {allCategories}/>
      </View>
      </ScrollView>  
      </SafeAreaView>  
      </SafeAreaProvider>  

    );

};

export default Home;