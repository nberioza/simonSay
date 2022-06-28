/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from './src/screens/gameScreen';
import ScoreScreen from './src/screens/ScoreScreen';
import ModalScreen from './src/screens/ModalScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ScreenStackHeaderConfig } from 'react-native-screens';

let persistor = persistStore(store);

type RootStackParamList = {
  GameScreen: undefined;
  ScoreScreen: undefined;
  ModalScreen:undefined;
};

const Stack =createNativeStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GameScreen"  >
          <Stack.Group>
          <Stack.Screen name="GameScreen" component={GameScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ScoreScreen" component={ScoreScreen}  options={{headerShown:false}}/>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="ModalScreen" component={ModalScreen} options={{headerShown:false}}  />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

