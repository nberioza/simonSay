import Sound from 'react-native-sound';

export interface ButtonProps {
    note: string;
    sound: Sound;
    color: string;
    children?: React.ReactNode;
    // onPress:(event: GestureResponderEvent)=>void;
  }