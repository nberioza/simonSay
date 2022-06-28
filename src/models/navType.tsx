import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export  type RootStackParamList = {
    GameScreen: undefined;
    ScoreScreen: undefined;
    ModalScreen:undefined;
  };
   
  
   export type Props = NativeStackScreenProps<RootStackParamList,'GameScreen'>;

export const Stack =  createNativeStackNavigator<RootStackParamList>();
