import { View,StyleSheet,Text,Image,TouchableOpacity} from "react-native";
import { fontFamilies } from "../constants/fonts";
import Bulk from '../../assets/images/homebulk.svg';
import Star from '../../assets/images/productreviewstarhome.svg';

const ShowCategoryProductsOnHomeLayout = props =>{

    return(

    <View style = {{marginTop:12,marginLeft:12,width:175}}>
    <Image width = {163} height={178} source={props.sendData.image} style = {{borderRadius:14}}/>
    <Text style = {{fontSize:12,color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium,marginTop:10,includeFontPadding:false}}
    numberOfLines={2}>
    {props.sendData.productName}
    </Text>
    <View style = {{flexDirection:'row',marginTop:3}}>
    <Text style = {{color:'#F0DCBC',fontFamily:fontFamilies.INTER.italic,fontSize:15}}>
    {`₹${props.sendData.productReducedPrice}`}
    </Text> 
    <Text style = {{color:'#FFFFFF8F',fontFamily:fontFamilies.INTER.italic,fontSize:12,marginLeft:5,marginTop:2,textDecorationLine:'line-through'}}>
    {`₹${props.sendData.productOriginalPrice}`}
    </Text>      
    </View>
    <View style = {{marginTop:3,flexDirection:'row'}}>
    <View style = {{flexDirection:'row'}}>
    <Star width = {11} height = {11} marginTop = {3}/>    
    <Text style = {{color:'#FFFFFF',fontSize:10,fontFamily:fontFamilies.INTER.bold,marginLeft:3}}>
    {props.sendData.rating}
    </Text>
    <Text style = {{color:'#FFFFFF',fontSize:10,fontFamily:fontFamilies.INTER.medium,marginLeft:3}}>
    {`(${props.sendData.reviewCount})`}
    </Text>   
    </View>
    {props.sendData.bulkEligible?(
    <View style = {{position:'absolute',right:0,flexDirection:'row',marginRight:12}}>
    <Bulk width = {12} height = {12} marginTop = {1} marginRight = {3}/>
    <Text style = {{color:'#FFFFFF',fontSize:10,fontFamily:fontFamilies.INTER.italic}}>
    {"Bulk Eligible"}    
    </Text>
    </View>
    ):(
     null
    )} 
    </View>
    </View>

    );

};

export default ShowCategoryProductsOnHomeLayout;