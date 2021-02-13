import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import CycleCard from './CycleCard';
import actions from '../../actions/index';
import { COLORS } from '../../constants/index';
import 'firebase/firestore';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SectionHeader = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
  margin-bottom: 15px;
  padding-left: 5%;
  background-color: rgb(242, 242, 242);
`;

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const parseItems = (items, selectedCycle) => {
  // Sort names alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  // The second argument here is the initial accumulator, if there is a
  // selected cycle we want that to be in the initial accumulator, if not
  // we want an empty object as the initial accumulator
  const bucketData = items.reduce((accumulator, item, index) => {
    const bucket = item.name[0].toUpperCase();
    const newItem = {
      ...item,
      index,
    };

    // If this is the first time we've seen this letter, create a bucket
    if (!accumulator[bucket]) {
      accumulator[bucket] = [newItem];
    } else {
      accumulator[bucket].push(newItem);
    }

    return accumulator;
  }, (selectedCycle ? { 'Selected Cycle': [{ ...selectedCycle, color: '#4457BC' }] } : {}));

  return bucketData;
};

const AlphabetCycleList = (props) => {
  const dispatch = useDispatch();
  const { items, selectedCycle } = props;

  const parsedItems = parseItems(items, selectedCycle);
  const renderCard = ({ item }) => (
    <CycleCard
      name={item.name}
      subtext={item.subtext}
      selectCycle={() => {
        const currentUser = firebase.auth().currentUser.uid;
        firebase.firestore().collection('users').doc(currentUser).update({
          selectedCycleId: item.id,
          selectedCycleIndex: 0,
        });
        dispatch(actions.cycles.selectCycle(item.id));
      }}
      deleteCycle={() => {
        dispatch(actions.cycles.deleteCycle(item.id));
        const currentUser = firebase.auth().currentUser.uid;

        const cycleRef = firebase.firestore()
          .collection('users')
          .doc(currentUser)
          .collection('cycles')
          .doc(item.id);

        cycleRef.delete().then(() => {
          console.log('Document successfully deleted!');
        }).catch((error) => {
          console.error('Error removing document: ', error);
        });
      }}
      onPress={item.onPress}
      color={item.color || COLORS[item.index % COLORS.length]}
    />
  );

  return (
    <View style={{ height: '100%' }}>
      <Title>Cycles</Title>
      <AlphabetSectionList
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
        getRightSectionListTitle={(title) => (title === 'Selected Cycle' ? '' : title)}
      />
    </View>
  );
};

AlphabetCycleList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedCycle: PropTypes.object,
};

AlphabetCycleList.defaultProps = {
  selectedCycle: undefined,
};

export default AlphabetCycleList;
