import React,{useState,useEffect} from "react";
import {View,FlatList,TouchableOpacity} from "react-native";
import HorizontalCategoriesHomeLayout from '../components/HorizontalCategoriesHomeLayout';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const HorizontalCategoriesHome = props =>{

    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState(props.data?.[0]?.categoryName || "");

    const handleCategoryClick = (category) => {
    setSelectedCategory(category.categoryName);
    };

    return(

      <View style = {{marginTop:6,backgroundColor:'#000000',marginBottom:insets.bottom+10}}>
      <FlatList
      horizontal = {props.isHorizontal}
      showsHorizontalScrollIndicator = {false}
      showsVerticalScrollIndicator = {false}
      data = {props.data}
      keyExtractor={categories=>categories.categoryId}
      renderItem={({item})=>(
        <View style = {{marginHorizontal:8}}>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{
        handleCategoryClick(item);
        }}>
        <HorizontalCategoriesHomeLayout
        sendData = {item}
        isSelected = {item.categoryName === selectedCategory}/>    
        </TouchableOpacity>
        </View>
      )}>
      </FlatList>  
      </View>  

    );

};

export default HorizontalCategoriesHome;