import { configureStore } from '@reduxjs/toolkit'

import gameSliceReducer from './gameSlice';
import scoreSliceReducer from './scoreSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  //...
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['game'],

  whitelist:['score']
}
const reducers = combineReducers({
  game: gameSliceReducer,
  score:scoreSliceReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch