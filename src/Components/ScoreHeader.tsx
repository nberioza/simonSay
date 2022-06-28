import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
interface Props {
  place: number;
  name: string;
  score: number;
  date: string;

  children?: React.ReactNode;
}
const ScoreHeader: React.FC<Props> = props => {
  return (
    <View style={styles.container}  >
      <Text style={styles.placeStyle} >no</Text>
      <Text style={styles.nameStyle}  >name</Text>
      <Text  style={styles.scoreStyle} >score</Text>
      <Text style={styles.dateStyle} >date</Text>
    </View>
  );
};

export default ScoreHeader;

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems:'stretch',
      justifyContent:'space-between',
      flexDirection:'row',
      margin:5,
      
      borderWidth:1
      },
  placeStyle:{
    alignSelf:'flex-start',
    padding: 5,
    backgroundColor:'yellow',
   
    borderWidth:1
    
  },     
  nameStyle: {
    padding: 5,
  },
  scoreStyle: {
    padding: 5,
  },
  dateStyle: {
    padding: 5,

    marginRight:20
  },
});