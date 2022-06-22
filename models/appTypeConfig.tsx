import Sound from 'react-native-sound';
import GameButton from '../Components/GameButton';
import React from 'react';

/**
 * Data and type configurations
 * contains:
 * -game buttons array
 */

export interface buttonProp {
  note: string;
  sound: Sound;
  color: string;
}

//let buttonArray: buttonProp[];

export const  buttonArray:buttonProp[]  = [
  {
    note: 'e4',
    sound: new Sound('e4.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    }),
    color: 'red',
  },
  {
    note: 'a4',
    sound: new Sound('a4.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    }),
    color: 'blue',
  },
  {
    note: 'c_4',
    sound: new Sound('c_4.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    }),
    color: 'green',
  },
  {
    note: 'e3',
    sound: new Sound('e3.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    }),
    color: 'yellow',
  },
];

export const buttonList =  buttonArray.map((btn)=>{
return(<GameButton
key={btn.note}
color={btn.color}
note={btn.note}
sound={btn.sound}
/>)
})


