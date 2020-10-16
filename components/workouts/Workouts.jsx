import * as React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardContainer from './CardContainer';

export default (props) => {
   return (    
      <View style={{marginTop: 100, flex:3, justifyContent: "center", alignItems: "center"}}>
         <CardContainer 
            items={[{name: 'workout name', subtext: 'subtext', onIconPress: () => alert('hello')}, 
                  {name: 'workout name', subtext: 'subtext'}, 
                  {name: 'workout name', subtext: 'subtext'}]} />
      </View>);
}