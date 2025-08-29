import { View,Text,Image } from "react-native";
import { fontFamilies } from "../constants/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HorizontalCategoriesHomeLayout = props =>{
    const insets = useSafeAreaInsets();
    return(
      <View style = {{marginLeft:3,width:60,height:60}}>
        <View style = {{justifyContent:'center',alignItems:'center',marginTop:5}}>
        <Image width = {24} height = {24} source={props.sendData.image}/>
        </View>
        <Text style = {{textAlign:'center',includeFontPadding:false,fontFamily:fontFamilies.INTER.regular,fontSize:11,color:'#FFFFFF',marginTop:5,textDecorationLine: props.isSelected ? "underline" : "none",textDecorationColor: "#FFFFFF",textDecorationStyle: "solid"}}
        numberOfLines={2}>
        {props.sendData.categoryName}    
        </Text>
      </View>  
    )
};

export default HorizontalCategoriesHomeLayout;