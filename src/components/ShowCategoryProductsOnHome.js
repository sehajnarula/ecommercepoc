import React from "react";
import {View,StyleSheet,FlatList,TouchableOpacity,Text} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontFamilies } from "../constants/fonts";
import RightArrow from '../../assets/images/seeallrightarrow.svg';
import ShowCategoryProductsOnHomeLayout from '../components/ShowCategoryProductsOnHomeLayout';
import {useNavigation} from "@react-navigation/native";

const ShowCategoryProductsOnHome = props =>{

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

   return(

    <View style = {{marginTop:3,marginBottom:insets.bottom+10}}>
    <FlatList
    horizontal = {props.isHorizontal}
    showsHorizontalScrollIndicator = {false}
    showsVerticalScrollIndicator = {false}
    data = {props.data}
    keyExtractor={category=>category.categoryId}
    renderItem={({item})=>(
      <View style = {{marginTop:11}}>
      <View style = {{marginTop:8,flexDirection:'row',marginLeft:12,marginEnd:10}}>
      <Text style = {{fontSize:18,fontFamily:fontFamilies.INTER.bold,color:'#FFFFFF'}}>
      {item.categoryName}  
      </Text>
      <TouchableOpacity
      activeOpacity={1}
      style = {{position:'absolute',right:0}}>
      <View style = {{flexDirection:'row',marginTop:5}}>
      <Text style = {{fontSize:12,color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium,marginRight:5}}>
      {"See All"}  
      </Text>
      <RightArrow width = {12} height = {8} marginTop = {5}/>
      </View>  
      </TouchableOpacity>
      </View>
      <FlatList
      style = {{marginTop:5,marginLeft:1}}
      horizontal = {false}
      showsHorizontalScrollIndicator = {false}
      showsVerticalScrollIndicator = {false}
      data = {item.products}
      keyExtractor={product=>product.productId}
      numColumns={2}
      renderItem={({item})=>(
        <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=>{
          navigation.navigate("ProductInfo",{productImage:item.image,productName:item.productName,originalPrice:item.productOriginalPrice,reducedPrice:item.productReducedPrice,rating:item.rating,reviewCount:item.reviewCount});
        }}>
        <ShowCategoryProductsOnHomeLayout
        sendData = {item}/>
        </TouchableOpacity>
      )}>
      </FlatList>        
      </View>    
    )}/>    
    </View>

   ); 

};

export default ShowCategoryProductsOnHome;