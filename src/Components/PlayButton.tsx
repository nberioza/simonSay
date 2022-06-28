 import React from "react";
 import{View,Pressable, GestureResponderEvent,StyleSheet,Text} from 'react-native';
 
  interface Props{
    children?:React.ReactNode;
    onPress:(event: GestureResponderEvent)=>void;
    disabled:boolean | null | undefined
  }



 const PlayButton:React.FC<Props> = (props)=>{
    
    return(
        <Pressable
         style={({ pressed })=>[styles.container,pressed?styles.buttonPressed:null]}
        android_ripple={{color:'#f5fefb',foreground:true}}
        onPress={props.onPress}
        disabled={props.disabled}
        
        >
            <Text  style={styles.fontStyle}>Play</Text></Pressable>)
 }

 export default PlayButton

 const styles = StyleSheet.create({
     container:{
         
         height:60,
         width:200,
         backgroundColor:'#a0002b',
         margin:20,
         padding:5,
         justifyContent:"center",
         alignItems:"center",
         alignSelf:"auto",
        borderRadius:10,
         elevation: 8,
     },
     button:{
         flex:1
     },
     buttonPressed:{
        opacity:0.5,
     },

     fontStyle:{
         fontSize:30,
         fontWeight:'bold',
         color:'#f2f2d8',
         
     }
 })