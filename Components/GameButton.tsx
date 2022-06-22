import {View, StyleSheet, Pressable, ViewStyle} from 'react-native';
import React, {useState, useEffect} from 'react';
import Sound from 'react-native-sound';
import {useAppSelector, useAppDispatch} from '../store/appHooks';
import * as stage from '../models/controllers';
import {passTurnToPlayer, playNote, updatePlayerChoice} from '../store/gameSlice';
import {ButtonProps} from '../models/gameProps';

const GameButton: React.FC<ButtonProps> = props => {
  const {
    gameStage,
    noteToPlay,
    currPlayersIndex,
    simonSequence,
    currPlayerScore,
  } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const [opacity, setOpacity] = useState(1);

  const btnHandler = (sound: Sound, note: string) => {
    sound.play((success: boolean) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    dispatch(updatePlayerChoice(note));
  };

  useEffect(() => {
  /** if (!(noteToPlay===props.note)) {
      return;
    }
  */  if (noteToPlay === props.note) {
   //console.log(`noteToPlay  : ${noteToPlay} = ? = props.note :  ${props.note}`);
    
   const timerUp = (ms:number)=>{
     setOpacity(0.5)
     // dispatch(playNote(''))
    const timer=setTimeout(() => {
     
      props.sound.play((success: boolean) => {
        if (success) {
          console.log(`changing opacity to ${props.color} button`);
    
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    },ms);
    return ()=>{clearTimeout(timer)}
;}
   
     
     // console.log(`returned from ${props.color}button = note is ${props.note}`);

      timerUp(200);
   
    }
    
  }, [noteToPlay]);

  useEffect(() => {
    if (opacity != 1) {
      
      const timer=setTimeout(()=>{
        //console.log(`current opacity ${opacity}  (inside change opacity to 1)`);
      setOpacity(1);
      },500)
timer
       return ()=>{clearTimeout(timer)}
    }
  
  }, [opacity]);

  return (
    <View
      style={[
        styles.gridItem,
        {backgroundColor: 'white', zIndex: 2},
        /**{},
     {backgroundColor:(noteToPlay===props.note)? props.color:'white'}
      * */
      ]}>
      <Pressable
        onPress={() => btnHandler(props.sound, props.note)}
        android_ripple={{color: 'white'}}
        style={({pressed}) => [
          styles.button,
          {backgroundColor: props.color},
          pressed ? styles.buttonPressed : null,
          {opacity: opacity},
        ]}
        disabled={stage.PLAYER_TURN != gameStage}></Pressable>
    </View>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  gridItem: {
    position: 'relative',
    margin: 5,
    width: 100,
    height: 100,
    elevation: 8,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.8,
    alignSelf: 'stretch',
    flexShrink: 1,
    // borderRadius: 50,
  },
});

/**  style={[styles.button,props.style]}>
 *
 *   style={({pressed})=>[styles.button,pressed? styles.buttonPressed:null,]}>
 */
