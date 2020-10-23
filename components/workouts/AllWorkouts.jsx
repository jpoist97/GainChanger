import * as React from 'react';
import { FlatList } from 'react-native';
import Card from './Card';

export default (props) => {
  const renderCard = ({ item }) => (
    <Card
      name={item.name}
      subtext={item.subtext}
      onIconPress={item.onIconPress}
      onPress={item.onPress}
    />
  );

  return (
    <FlatList
      data={props.items}
      renderItem={renderCard}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
  );
};
