import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from './store'
import * as stage from '../models/controllers'

interface gameState {
  gameStage:string;
  simonSequence: string[];
  currPlayerScore: number;
  playersChoice: string;
  currPlayersIndex:number;
  noteToPlay:string;
 
}

const initialState: gameState = {
  gameStage: stage.BEFORE_GAME ,
  simonSequence: [],
  currPlayerScore: 0,
  playersChoice: '',
  noteToPlay:'',
  currPlayersIndex: 0
 
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameStage = stage.SIMON_TURN_CHOICE;
      
    },
    updateSimonSequence(state, action: PayloadAction<string>) {
      state.simonSequence.push(action.payload);
      state.gameStage = stage.SIMON_TURN_PLAY;
      state.currPlayersIndex=0
    },
     playSimonSequence(state) {
      state.gameStage = stage.SIMON_TURN_PLAY;
     
    },
    updatePlayerChoice(state, action: PayloadAction<string>){
        state.playersChoice= action.payload
        if(state.simonSequence.length-1>state.currPlayersIndex&&
          state.simonSequence[state.currPlayersIndex]===action.payload){
         state.currPlayersIndex=state.currPlayersIndex+1
         return
        }
        if(state.simonSequence[state.currPlayersIndex]!=action.payload){
          state.gameStage=stage.AFTER_GAME
          return
        }
        if(state.simonSequence.length-1===state.currPlayersIndex&&
          state.simonSequence[state.currPlayersIndex]===action.payload){
         state.currPlayersIndex=0
         state.currPlayerScore=state.currPlayerScore+1;
         state.gameStage=stage.SIMON_TURN_CHOICE
         return
        }

    },
    passTurnToPlayer(state) {
      state.gameStage = stage.PLAYER_TURN;
    },
    updateScore(state){
        state.currPlayerScore=state.currPlayerScore+1
        state.playersChoice=''
    },
    playNote(state,action: PayloadAction<string>){
      state.noteToPlay=action.payload
    },
    setPlayerIndex(state,action: PayloadAction<number>){
    state.currPlayersIndex=action.payload
    },
    newGame(state){
      state.gameStage=stage.BEFORE_GAME,
      state.simonSequence= [],
      state.currPlayerScore= 0,
      state.playersChoice= '',
      state.noteToPlay=''
      state.currPlayersIndex= 0
    },
    endGame(state) {
      state.gameStage=stage.AFTER_GAME
    },
  },
});


export const {
  setPlayerIndex,
  startGame,
  endGame,
  updateSimonSequence,
  playSimonSequence,
  passTurnToPlayer,
  playNote,
  updatePlayerChoice,
  updateScore,
  newGame
} = gameSlice.actions;

export default gameSlice.reducer;
