import * as React from 'react';
import { Text, View } from 'react-native';
import CardContainer from './CardContainer';
import SwapView from './SwapView';
import AllWorkouts from './AllWorkouts';
import AllCycles from './AllCycles';

const workouts = [{
   name: 'workout name 1', subtext: 'subtext', onIconPress: () => alert('hello'), onPress: () => alert('goodbye'),
 },
 { name: 'workout name 2', subtext: 'subtext' },
 { name: 'workout name 3', subtext: 'subtext' },
 { name: 'workout name 4', subtext: 'subtext' },
 { name: 'workout name 5', subtext: 'subtext' },
 { name: 'workout name 6', subtext: 'subtext' },
 { name: 'workout name 7', subtext: 'subtext' },
 { name: 'workout name 8', subtext: 'subtext' },
 { name: 'workout name 9', subtext: 'subtext' },
 { name: 'workout name 10', subtext: 'subtext' },
 { name: 'workout name 11', subtext: 'subtext' },
 { name: 'workout name 12', subtext: 'subtext' },
 { name: 'workout name 13', subtext: 'subtext' },
 { name: 'workout name 14', subtext: 'subtext' },
 { name: 'workout name 15', subtext: 'subtext' }];

 const cycles = [{
   name: 'cycle name 1', subtext: 'subtext', onIconPress: () => alert('hello'), onPress: () => alert('goodbye'),
 },
 { name: 'cycle name 2', subtext: 'subtext' },
 { name: 'cycle name 3', subtext: 'subtext' },
 { name: 'cycle name 4', subtext: 'subtext' },
 { name: 'cycle name 5', subtext: 'subtext' },
 { name: 'cycle name 6', subtext: 'subtext' },
 { name: 'cycle name 7', subtext: 'subtext' },
 { name: 'cycle name 8', subtext: 'subtext' },
 { name: 'cycle name 9', subtext: 'subtext' },
 { name: 'cycle name 10', subtext: 'subtext' },
 { name: 'cycle name 11', subtext: 'subtext' },
 { name: 'cycle name 12', subtext: 'subtext' },
 { name: 'cycle name 13', subtext: 'subtext' },
 { name: 'cycle name 14', subtext: 'subtext' },
 { name: 'cycle name 15', subtext: 'subtext' }]

export default (props) => (
  <View style={{
    marginTop: 50, flex: 3, justifyContent: 'center', alignItems: 'center',
  }}
  >
    <SwapView
      left={(
        <CardContainer
          items={workouts}
        />
      )}
      right={(
        <AllCycles
          items={cycles}
        />
      )}
    />
  </View>
);
