import React, { useState } from 'react';
import {
  Alert, Modal, Pressable, View, TouchableOpacity, Image,
} from 'react-native';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
`;

const SubTitle = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
`;

const Buttontext = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
`;

const StyledButton = styled(TouchableOpacity)`
   background-color: #E2E2E2;
   border-radius: 20px;
   padding: 5px;
   padding-left: 15px;
   padding-right: 15px;
   margin: 10px;
`;

const ColorButton = styled(TouchableOpacity)`
  background-color: #000000;
  padding: 1px;
  border-color: #000000;
  margin: 5px;
`;

const CenterView = styled(TouchableOpacity)`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  padding: 160px;
  padding-top: 130px;

`;

const ModalView = styled(TouchableOpacity)`
  height: 500px;
  width: 350px;
  margin: 10px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  align-items: center;
  shadow-color: #000;
  box-shadow: 0px 2px 4px;
  shadow-opacity: 0.25px;
  shadow-radius: 4px;
  elevation: 5px;
`;

const SettingsModal = (props) => {
  const { triggerSize } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >

        <CenterView onPress={() => setModalVisible(!modalVisible)}>
          <ModalView onPress={() => setModalVisible(modalVisible)}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="ios-close" size={triggerSize} color="black" />
            </Pressable>
            <Title>Settings</Title>
            <SubTitle>Notifications</SubTitle>
            <SubTitle>Color Theme</SubTitle>
            <ColorButton onPress={() => { alert('clicked blue'); }}>
              <Image source={require('../../assets/blue.png')} />
            </ColorButton>
            <ColorButton onPress={() => { alert('clicked purple'); }}>
              <Image source={require('../../assets/purple.png')} />
            </ColorButton>
            <StyledButton
              onPress={async () => {
                try {
                  await firebase.auth().signOut();
                  navigation.navigate('Login');
                } catch (err) {
                  Alert.alert('Could not be signed out', err);
                }
                setModalVisible(false);
              }}
            >
              <Buttontext>Log Out</Buttontext>
            </StyledButton>
            <StyledButton onPress={() => setModalVisible(!modalVisible)}>
              <Buttontext>Save Changes</Buttontext>
            </StyledButton>
          </ModalView>
        </CenterView>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name="ios-settings" size={triggerSize} color="black" />
      </Pressable>
    </View>

  );
};

SettingsModal.propTypes = {
  triggerSize: Proptypes.number,
};

SettingsModal.defaultProps = {
  triggerSize: 18,
};

export default SettingsModal;
