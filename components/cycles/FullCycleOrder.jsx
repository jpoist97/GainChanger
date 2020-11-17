import * as React from 'react'
import { FlatList } from 'react-native';
import CycleOrderCard from './CycleOrder';
import PropTypes from 'prop-types'

const FullCycleOrder = (props) => {

    const { workouts } = props;

    return (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString() }
          renderItem={({item}) => {
            return (
              <CycleOrderCard name={item.name}
                muscleGroups={item.muscleGroups}
                color={item.color}
                exercises={item.exercises}
              />
            )
          }}
        />
    )
}

FullCycleOrder.propTypes ={
  workouts: PropTypes.array.isRequired
}

FullCycleOrder.defaultProps = {
  workouts: []
}

export default FullCycleOrder;