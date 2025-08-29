import React,{useState,useReducer,useEffect} from "react";
import {View,StyleSheet,ScrollView,TouchableOpacity,Text,TextInput,Image} from "react-native";
import {useSafeAreaInsets,SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import BackArrow from '../../assets/images/productinfoarrow.svg';
import SearchIcon from '../../assets/images/searchinproductinfo.svg';
import CartIcon from '../../assets/images/productinfocart.svg';
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import AddToCartButton from '../../assets/images/addtocarttouchable.svg';
import QuantityPlus from '../../assets/images/quantityplusicon.svg';
import QuantityMinus from '../../assets/images/quantityminusicon.svg';
import SaveMoreWithBulk from '../../assets/images/savemorewithbulkicon.svg';
import Star from '../../assets/images/productinfostar.svg';
import { fontFamilies } from "../constants/fonts";
import LinearGradient from 'react-native-linear-gradient';
import ProductInfoArrowDetails from '../../assets/images/productinfoarrowtwo.svg';
import BottomFavourite from '../../assets/images/productinfobottomfavourite.svg';
import Calendar from '../../assets/images/calendarproductinfo.svg';

const reducer = (state, changeState) => {
  switch (changeState.type) {
    case 'Increase':
      return { ...state, count: state.count + changeState.value };
    case 'Decrease':
      return {
        ...state,
        count: state.count > 0 ? state.count - changeState.value : 0,
      };
    default:
      return state;
  }
};


const ProductInformation = ({route})=>{

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [search,setSearch] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [productInfo,setProductInfo] = useState(true);
    const {productName,productImage,originalPrice,reducedPrice,rating,reviewCount} = route.params;
    const originalPriceNumber = Number(originalPrice);
    const reducedPriceNumber = Number(reducedPrice);
    const reducedNumber = (originalPriceNumber-reducedPriceNumber);
    const[state, dispatch] = useReducer(reducer,{count:0});

    return(

      <SafeAreaProvider>
       <SafeAreaView style = {{flex:1,backgroundColor:'#0E0E0E'}}>
       <View style = {{backgroundColor:'#000000',paddingBottom:10,paddingTop:10,paddingRight:16,paddingLeft:10}}>
       <View style = {{flexDirection:'row'}}>
       <TouchableOpacity
       activeOpacity={1}
       style = {{marginTop:10}}
       onPress={()=>{
        navigation.goBack();
       }}>
       <BackArrow width = {20} height = {20}/>  
       </TouchableOpacity>
       <View style = {{backgroundColor:"#323130",paddingTop:3,paddingBottom:3,borderRadius:8,width:203,marginLeft:25}}>
       <View style= {{flexDirection:'row'}}>
       <SearchIcon width = {15} height = {15} marginLeft = {10} marginTop = {10}/>
       <TextInput
       onChangeText={(text)=>setSearch(text)}
       autoCapitalize="none"
       multiline = {true}
       style = {{color:'#FFFFFF8F',marginLeft:3,width:203}}
       placeholderTextColor={"#FFFFFF8F"}
       placeholder="Search"
       value = {search}/>
       </View> 
       </View>
       <View style = {{flexDirection:'row',position:'absolute',right:0,marginRight:5,marginTop:5}}>
       <FavourteIcon width = {32} height = {32} marginRight = {10}/>
       <CartIcon width = {32} height = {32}/>
       </View>
       </View>
       </View> 
       <ScrollView contentContainerStyle = {{flexGrow:1,marginBottom:insets.bottom+5}}>
       <View style = {{flex:1,padding:2}}>
       <View style = {{width:'100%',height:335,marginTop:5,position:'relative'}}>
       <Image style = {{width:'100%',height:'100%'}} source = {productImage}/>
       <View style = {{width:101,height:35,borderWidth:1,borderColor:'#F4A300',borderRadius:4,padding:10,backgroundColor:'#171717',position:'absolute',bottom:0,alignSelf:'flex-end',marginBottom:10,marginRight:5,justifyContent:'center'}}>
       <View style = {{flexDirection:'row'}}>
       <Star width = {11} height = {11} marginTop = {1}/>
       <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,fontSize:12,includeFontPadding:false,marginLeft:3}}>
       {rating}
       </Text>
       <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium,fontSize:12,includeFontPadding:false,marginLeft:3}}>
       {`(${reviewCount})`}
       </Text>       
       </View>
       </View>
       </View>
       <Text style = {{fontFamily:fontFamilies.INTER.medium,color:'#D5D5D5',fontSize:24,marginTop:10,marginHorizontal:12}}>
       {productName}
       </Text>
       <View style = {{flexDirection:'row',marginLeft:12}}>
       <Text style = {{color:'#D5D5D5',fontSize:16,fontFamily:fontFamilies.INTER.italic,includeFontPadding:false}}>
       {`₹ ${reducedPrice}/-`} 
       </Text>
      <Text style = {{color:'#FFFFFF8F',fontFamily:fontFamilies.INTER.italic,fontSize:14,marginLeft:10,marginTop:2,textDecorationLine:'line-through',includeFontPadding:false}}>
      {`₹ ${originalPrice}`}
      </Text>
      <Text style = {{color:'#8FC8A8',fontFamily:fontFamilies.INTER.italic,fontSize:14,marginLeft:10,marginTop:2,includeFontPadding:false}}>
      {`₹ ${reducedNumber} Off`}
      </Text>      
       </View>
       <LinearGradient
       colors={['#FFFFFF33', '#FFFFFF']}
       start={{x:0,y:0}}
       end={{x:1,y:0}}
       style={{padding:0.56,width:113,marginTop:10,marginLeft:12,borderRadius:5}}>
       <View style = {{backgroundColor:'#212121',padding:3}}>
       <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
       <TouchableOpacity
       style = {{width:22,height:22,borderRadius:5,padding:5,alignItems:'center',backgroundColor:'#424242'}}
       onPress={()=>{
       dispatch({type:'Decrease',value:1});
       }}
       activeOpacity={0.8}>
       <QuantityMinus width = {13} hieght = {13}/>
       </TouchableOpacity>
       <Text style = {{color:'#FFFFFF',fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:17}}>
       {`${state.count}`}
       </Text> 
        <TouchableOpacity
       style = {{width:22,height:22,borderRadius:5,padding:5,alignItems:'center',backgroundColor:'#424242'}}
       activeOpacity={0.8}
       onPress={()=>{
        dispatch({type:'Increase',value:1});
       }}>
       <QuantityPlus width = {13} hieght = {13}/>
       </TouchableOpacity>
       </View>
       </View> 
       </LinearGradient>
       <TouchableOpacity
       activeOpacity={0.9}
       style = {{backgroundColor:'#212121',borderWidth:1,borderColor:'#353535',borderRadius:8,paddingTop:10,paddingBottom:10,justifyContent:'center',alignItems:'center',marginTop:20,marginHorizontal:12}}>
       <View style = {{flexDirection:'row'}}>
       <SaveMoreWithBulk width = {21} height = {21}/>
       <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:14,includeFontPadding:false,color:'#F0DCBC',marginTop:3,marginLeft:10}}>
       {"Save More With Bulk Order"} 
       </Text>
       </View> 
       </TouchableOpacity>
       <View style = {{flexDirection:'row',marginTop:10,marginLeft:12}}>
       <Text style = {{color:'#D5D5D5',fontSize:14,fontFamily:fontFamilies.INTER.medium,includeFontPadding:false}}>
        {"Colour:"}
       </Text>
       <Text style = {{color:'#D5D5D5',fontSize:14,fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginLeft:5,marginTop:1}}>
        {"Royal White"}
       </Text>       
       </View>
       <View style = {{flexDirection:'row',marginTop:10,marginLeft:12}}>
       <Text style = {{color:'#D5D5D5',fontSize:14,fontFamily:fontFamilies.INTER.medium,includeFontPadding:false}}>
        {"Seller:"}
       </Text>
       <Text style = {{color:'#D5D5D5',fontSize:14,fontFamily:fontFamilies.INTER.regular,includeFontPadding:false,marginLeft:10,marginTop:1}}>
        {"Sehaj Narula"}
       </Text>       
       </View>       
       <View style = {{marginHorizontal:12,borderColor:'#323130',borderWidth:1,height:1,marginTop:20}}>
       </View>
       <Text style = {{marginTop:12,marginLeft:12,fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF'}}>
       {"luxury comfort, premium finish"}
       </Text>
       <Text style = {{marginTop:5,marginHorizontal:12,fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599'}}>
        {`soft, breathable cotton bedsheet with 600 thread count, perfect for everyday luxury and restful sleep. comes with 4 matching pillow covers.`}
       </Text>
       <View style = {{flexDirection:"row",marginLeft:12,marginRight:12,marginTop:15}}>
        <Text style = {{fontFamily:fontFamilies.INTER.medium,fontSize:14,color:'#D5D5D5'}}>
        {"Product Information"}  
        </Text>
       <TouchableOpacity
        activeOpacity={1}
        style={{ position: 'absolute', right: 0 }}
        onPress={() => setProductInfo(!productInfo)}>
        <ProductInfoArrowDetails
        width={24}
        height={24}
        style={{
        transform: [{ rotate: productInfo ? '0deg' : '180deg' }]}}/>
      </TouchableOpacity>
       </View>
       {productInfo?(
       <View style = {{marginTop:10}}>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5',marginHorizontal:12}}>
        {"Instructions for care: Hand wash or machine wash warm. do not use bleach. dry at low heat. warm iron recommended. do not dry clean"}  
        </Text>
        <View style = {{flexDirection:'row',marginTop:15,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"material:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"100% cotton"}  
        </Text>
        </View>  
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"type:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"fitted bedsheet"}  
        </Text>
        </View>
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"colour:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"green"}  
        </Text>
        </View>        
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"pattern:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"floral"}  
        </Text>
        </View>       
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"quality:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"premium"}  
        </Text>
        </View>
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"sustainable:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"regular"}  
        </Text>
        </View>
        <View style = {{flexDirection:'row',marginTop:3,marginLeft:12}}>       
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D5'}}>
        {"thread count:"}  
        </Text>
        <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#D5D5D599',marginLeft:5}}>
        {"600"}  
        </Text>
        </View>
        <Text style = {{marginTop:15,marginHorizontal:12,fontSize:12,color:'#D5D5D5',fontFamily:fontFamilies.INTER.regular}}>
        {`package contents : 1 king-size bedsheet (274 cm x 274 cm) + 4 pillow covers (46 cm x 69 cm)`}
        </Text>
        <Text style = {{marginTop:15,fontFamily:fontFamilies.INTER.regular,color:'#D5D5D5CC',marginHorizontal:12,fontSize:12}}>
        {`Hand Wash or Machine wash warm, Do not use bleach, Dry Low Heat, Warm Iron, Do not Dry Clean`}
        </Text>                    
       </View>
       ):(
        null
       )}   
       </View> 
       </ScrollView>
       <View style = {{flexDirection:'column',height:140,backgroundColor:'#42424240'}}>
       <Text style = {{color:'#8FC8A8',textAlign:'center',fontSize:10,fontFamily:fontFamilies.INTER.medium,marginTop:10}}>
       {`Deliever in 30 min to 30 Preet Nagar Opposite Invit..`}
       </Text>
       <View style = {{flexDirection:'row',marginTop:30,marginLeft:12}}>
       <TouchableOpacity style = {{backgroundColor:'#F0DCBC',width:223,padding:10,borderRadius:4,justifyContent:'center',alignItems:'center'}}
       activeOpacity={0.9}>
       <View style = {{flexDirection:'row'}}>
       <AddToCartButton width = {24} height = {24}/>
       <Text style = {{fontSize:17,fontFamily:fontFamilies.INTER.bold,color:'#000000',marginLeft:10}}>
       {"ADD TO CART"}
       </Text>
       </View>
       </TouchableOpacity>
        <TouchableOpacity
       activeOpacity={0.9}
       style = {{width:44,height:44,justifyContent:'center',backgroundColor:'#171717',borderColor:'#FFFFFF',borderWidth:0.5,borderRadius:8,padding:9,marginLeft:20}}>
       <Calendar width = {24} height = {24}/> 
       </TouchableOpacity>
        <TouchableOpacity
       activeOpacity={0.9}
       style = {{width:44,height:44,justifyContent:'center',backgroundColor:'#171717',borderColor:'#FFFFFF',borderWidth:0.5,borderRadius:8,padding:12,marginLeft:20}}>
       <BottomFavourite width = {20} height = {20}/> 
       </TouchableOpacity>
       </View>
       </View>
       </SafeAreaView> 
      </SafeAreaProvider>  

    );

};

export default ProductInformation;