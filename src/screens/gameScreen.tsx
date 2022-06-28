import {View, StyleSheet} from 'react-native';
//import GameButton from '../Components/GameButton';
import React, {useEffect, useState} from 'react';
import {buttonArray} from '../models/appTypeConfig';
import PlayButton from '../Components/PlayButton';
import {buttonList} from '../models/appTypeConfig';
import * as stage from '../models/controllers';
import {Props} from '../models/navType';
import {useAppSelector, useAppDispatch} from '../store/appHooks';
import {
  startGame,
  endGame,
  updateSimonSequence,
  playSimonSequence,
  passTurnToPlayer,
  playNote,
  setPlayerIndex,
  updatePlayerChoice,
  updateScore,
} from '../store/gameSlice';

//useEffect in game advancement

const GameScreen: React.FC<Props> = props => {
  const {
    currPlayersIndex,
    noteToPlay,
    gameStage,
    simonSequence,
    currPlayerScore,
    playersChoice,
  } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  /** console.log(
   " noteToPlay :" ,noteToPlay,'\n',
  "game stage :", gameStage,
   " simonSequence :",simonSequence,'\n',
   " currPlayerScore :", currPlayerScore,'\n',
   " playersChoice :", playersChoice,'\n',
 )
 */
  useEffect(() => {
    if (gameStage === stage.AFTER_GAME) {
      props.navigation.navigate('ModalScreen');
    }
  }, [gameStage]);

  //will be triggered if the game is on and its simon's turn
  //TO PLAY THE SEQUENCE OF NOTES=================================
  useEffect(() => {
    if (!(gameStage === stage.SIMON_TURN_PLAY)) {
      return;
    }

    const delayNotePlaying = (index: number) => {
     
      setTimeout(() => {
        console.log('on index',index)
        console.log('play note is  :  ',simonSequence[index])
       dispatch(playNote(simonSequence[index]));
        dispatch(playNote(''));
        if(index>=simonSequence.length-1){
          dispatch(passTurnToPlayer());
          console.log('passing turn to the player');
           }
      
      }, 1000 * index);
    };
    let i = 0
    for (i; i < simonSequence.length; i++) {
      delayNotePlaying(i);
    }
    console.log(`outside of for loop simon las index is ${simonSequence.length-1} while i is ${i}`)
   
    return () => {};
  }, [gameStage]);

  //ADDING NEW NOTE TO SIMON'S SEQUENCE
  useEffect(() => {
    if (!(gameStage === stage.SIMON_TURN_CHOICE)) {
      return;
    }

    const time = setTimeout(() => {
      const rand = Math.floor(Math.random() * 3);
      console.log(`adding note to an array ${buttonArray[rand].note}`);
      dispatch(updateSimonSequence(buttonArray[rand].note));
    }, 2000);
    time;
    return () => {
      clearTimeout(time);
    };
  }, [gameStage]);

  //will be triggered only when its player's turn
  //and with each change of players choice

  // helper use toggling the game

  //here have to be array with defined buttons
  return (
    <View style={styles.mainContainer}>
      <PlayButton
        onPress={() => {
          dispatch(startGame());
        }}
        disabled={!(gameStage === stage.BEFORE_GAME)}
      />
      <View style={styles.GameButtonsContainer}>{buttonList}</View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#446475',
    flexDirection: 'column',
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameButtonContainer: {
    marginTop: 30,
    backgroundColor: '#babcbf',
    flexDirection: 'row',
    height: 120,
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    elevation: 50,
  },
  GameButtonsContainer: {
    flex: 1,
    height: 120,
    width: 50,
    backgroundColor: '#75496b',
  },
  ligtened: {
    opacity: 0.5,
  },
  gadget: {
    flex: 4,
  },
});

/**
     *   let turnOn = new Promise((resolve,reject)=>{
setTimeout(()=>{},500)
    })
    //console.log("in effect")
if(isGameOn&&!isPlayerTurn){
   // console.log("in effect in if")
//choose next note to the sequence
let rand=Math.floor(Math.random() * 4) ;
let temp =notesArray[rand]
//console.log("temp = ",temp)
setSimon((simonSequence)=>[...simonSequence,temp])
//console.log("simonSequence = ",simonSequence)
simonSequence.forEach((sound,i)=>{
    const timeout=setTimeout(() => {
      
        toggleButtonLight(sound)
        buttonHandler(sound);
      
        console.log("in foreEach sound = ",sound)
      },i*1000);
       
   }
   
     */

/**
    * const buttonHandler = async (note: string) => {
    let sound = new Sound(note, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.play((success: boolean) => {
        if (success) {
          console.log('successfully finished playing', note);
          sound.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };
    * 
    * 
    */
