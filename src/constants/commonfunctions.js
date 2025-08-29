import { Platform,BackHandler } from "react-native";
export function closeApp (){
    if(Platform.OS==="android"){
        BackHandler.exitApp();
    }else{
      console.log("Unable to close");  
    }
};