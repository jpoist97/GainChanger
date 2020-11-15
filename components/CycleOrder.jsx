import { View, LayoutAnimation } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { IconButton,Text } from 'react-native-paper';
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import * as React from 'react';

const CycleTitle = styled.Text`
   color: #FFFFFF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
   textAlign: left;
   paddingLeft: 15px;
   paddingTop: 5px;
`;

const SubTitle = styled(CycleTitle)`
    font-size: 16px;
    paddingBottom: 5px;
`;

const WorkoutViewText = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    alignSelf: center;
    paddingTop: 2px;
    paddingBottom: 4px;
`;

const ExerciseColumn = styled.View`
    flexDirection: column;
    alignContent: center;
    font-family: 'Montserrat_500Medium';
`;

const CycleOrderCard = (props) => {
    const [showDetailed, setshowDetailed] = React.useState(false)
    const [icon, setIcon] = React.useState('chevron-down')

    const {
        title, type, color, exercises
    } = props;
    
    const FullBody = styled.View`
        width: 90%;
        margin: auto;
        background-color: ${color};
        borderRadius: 10px;
        box-shadow: 1px 5px 2px gray;
    `;

    const ExercisesView = (items) => {
        const workoutItems = items.items
        console.log(workoutItems[0].workoutName);
        return (
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
            <ExerciseColumn>
                <SubTitle>Exercise</SubTitle>
                <FlatList 
                    data={workoutItems}
                    renderItem={({item}) => <WorkoutViewText>{item.workoutName}</WorkoutViewText>}
                />
            </ExerciseColumn>
            <ExerciseColumn>
                <SubTitle>Sets x Reps</SubTitle>
                <FlatList 
                    data={workoutItems}
                    renderItem={({item}) => {
                        console.log(item);
                    <WorkoutViewText>{item.sets + 'x' + item.reps}</WorkoutViewText>}
                    }
                />
            </ExerciseColumn>
            <ExerciseColumn>
                <SubTitle>Previous</SubTitle>
                <FlatList 
                    data={workoutItems}
                    renderItem={({item}) => <WorkoutViewText>{item.previous + 'lbs.'}</WorkoutViewText>}
                />
            </ExerciseColumn>
        </View>
        )
    };

    function showDetail() {
        if(icon == 'chevron-down'){
            setIcon('chevron-up')
        } else {
            setIcon('chevron-down')
        }
        setshowDetailed(!showDetailed)
    } 

    return (
            <FullBody>
                <CycleTitle>{title}</CycleTitle>
                <IconButton 
                    icon={icon}
                    color="white"
                    size={25}
                    onPress={showDetail}
                    style={{position: 'absolute',alignSelf:"flex-end", marginTop:0}}
                />
                {!showDetailed && <SubTitle>{type}</SubTitle>}
                {showDetailed && <ExercisesView items={exercises}/>}
            </FullBody>
    )
};

CycleOrderCard.propTypes={
    title: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    exercises: PropTypes.array
};

CycleOrderCard.defaultProps={
    title: 'Cycle Title',
    type: '',
    color:'#CAB0FF',
    exercises: []
};

export default CycleOrderCard;