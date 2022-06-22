import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type result= {
   name:string,
   score:number,
   date:string
}

interface scoreState {
     scores: result[]
  }
  

const initialState:scoreState ={
  scores: []
}
const scoreSlice = createSlice(
{   name:'score',
    initialState,
    reducers:{
      addToScore(state,action: PayloadAction<result>){
         state.scores.push(action.payload)
      }
     
    }}
)
export const {addToScore} =  scoreSlice.actions;
/**
// Other code such as selectors can use the imported `RootState` type
export const scoreCount = (state: RootState) => state.score */
export default  scoreSlice.reducer

/**
 * how to use type hooks
 * import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
    some logic
    return some jsx
 * 
 */