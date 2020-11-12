/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View, Text} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import _ from 'lodash';
import { ToggleButton } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


const Exercise = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 16px;
`;

const BodyPart = styled.Text`
   color: #A8A4A4;
   font-size: 12px;
   font-family: 'Montserrat_500Medium';
   margin: 0px 0%;
`;

const AddButton = styled(AntDesign)`
    position: absolute;
    right: 10px;
    top: 18px;
    height: 25px;
    width: 25px;
    margin: 0px 25px 0px 0px;
`



const ExerciseItem = (props) => {
    const {
        name, subtext,
      } = props;
    
    const [select, setSelect] = React.useState(false)

    return (
        <View style={{
            marginLeft: 10,
            paddingVertical: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
            background: '#FFFFFF'
          }}>
            <Exercise>{name}</Exercise>
            <BodyPart>{subtext}</BodyPart>
            {select ?
                (<AddButton
                    name = 'pluscircle'
                    color = '#CAB0FF'
                    size = {22}
                    onPress = {()=>setSelect(select == true ? false : true)}
                />) :
                (<AddButton
                    name = 'pluscircleo'
                    size = {22}
                    color = "#CAB0FF"
                    onPress = {()=>setSelect(select == true ? false : true)}

                />)
            }
      
        </View>
    )



}

ExerciseItem.propTypes = {
    color: PropTypes.string,
    subtext: PropTypes.string,
    name: PropTypes.string.isRequired,
    onIconPress: PropTypes.func,
  };
  
ExerciseItem.defaultProps = {
    color: '#CAB0FF',
    subtext: '',
    onIconPress: () => {},
  };
  
export default ExerciseItem;
