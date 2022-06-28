
import { Button, Text, View,TextInput,StyleSheet } from "react-native";
import {Props} from '../models/navType'
import {useAppSelector, useAppDispatch} from '../store/appHooks';
import React, {useEffect, useState} from 'react';
import { addToScore } from "../store/scoreSlice";


const ModalScreen:React.FC<Props> =(props)=> {
  const [text, onChangeText] = useState("");
 
  const {currPlayerScore} = useAppSelector(state => state.game);

  const submitHandler=(name:string , result : number)=>{
    const date = new Date()
    dispatch(addToScore({name:name  ,score:result , date:date.toLocaleDateString()}))
    props.navigation.navigate('ScoreScreen')
  }
 
  const dispatch = useAppDispatch();
    return (
      <View style={{ flex: 1, alignItems:'center', justifyContent:'flex-start' }}>
        <View style={{ borderColor:'black' ,borderWidth:1 ,paddingTop:20,paddingBottom:15}}  >
          <Text style={{ fontSize:24,fontWeight:'bold',textDecorationLine:'underline' }} > Please Enter your name </Text>
          <Text style={{ fontSize:20,fontStyle:'italic' }}> So your glorious result won't stay unnoticed</Text>
        </View>
        <View>
          <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        multiline={false}
         

      />
        </View>
        <Button onPress={()=>submitHandler(text , currPlayerScore)} title="Submit " />
      </View>
    );
  }

  export default ModalScreen

  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  