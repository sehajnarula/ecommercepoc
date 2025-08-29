import React from "react";
import {View,ScrollView,StyleSheet,Text,TouchableOpacity} from "react-native";
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context";

const Store = ()=>{

    return(

       <SafeAreaProvider>
       <SafeAreaView style = {{flex:1,backgroundColor:'#0E0E0E'}}>
        <ScrollView contentContainerStyle = {{flexGrow:1}}>
        <View style = {{flex:1,padding:4}}>
            
        </View>
        </ScrollView>
        </SafeAreaView> 
       </SafeAreaProvider>  

    );

};

export default Store;