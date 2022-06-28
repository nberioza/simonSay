import React from 'react';
import {View, FlatList,Button, Text} from 'react-native';
import ScoreHeader from '../Components/ScoreHeader';
import ScoreView from '../Components/ScoreView';
import {useAppSelector, useAppDispatch} from '../store/appHooks';
import { newGame } from '../store/gameSlice';
import {Props} from '../models/navType';

 const ScoreScreen: React.FC <Props>= (props) => {
  const compare = (a:any,b:any)=>{
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
  const dispatch = useAppDispatch();
  const{scores}   = useAppSelector(state => state.score);
  
  const renderArray=[...scores].sort(compare).map((item,index)=>{
       return{name: item.name,
        score: item.score,
        date: item.date,
        place:index+1
      }
  })
    
  const NewGameHandler=()=>{
     dispatch(newGame())
     props.navigation.popToTop()
  }

  const renderScoreItem = (itemData:any) => {
    
     console.log(itemData)
    return <ScoreView 
             name={itemData.item.name}
             score={itemData.item.score}
             date={itemData.item.date}
             place={itemData.item.place} />
  };

  return (
    <View>
      <View><Button
      title='New Game'
      onPress={()=>NewGameHandler()}
      />
      </View>
      <FlatList
        data={renderArray}
        renderItem={renderScoreItem}
        keyExtractor={item => item.place.toString()}
        ListHeaderComponent={ScoreHeader}
        >

        </FlatList>
    </View>
  );
};

export default ScoreScreen;
