import React, { useState } from 'react';
import {
  Alert, Modal, Pressable, View, TouchableOpacity, Image, Switch, Text, TextInput, Keyboard,
} from 'react-native';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions/index';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
`;

const SubTitle = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
  margin-top: 20px;
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
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const TwinView = styled(View)`
  display: flex;
  width: 90%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const SettingLabel = styled(Text)`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  color: ${(props) => (props.disabled ? 'darkgray' : 'black')};
`;

const SettingTextInput = styled(TextInput)`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  color: ${(props) => (props.disabled ? 'darkgray' : 'black')}
  margin-right: 10px;
`;

const SettingsModal = (props) => {
  const { triggerSize } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [settingState, setSettingState] = useState({
    enableRestNotifications: settings.enableRestNotifications,
    restNotificationTimer: `${settings.restNotificationTimer}`,
  });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >

        <CenterView onPress={() => setModalVisible(!modalVisible)}>
          <ModalView onPress={() => {
            setModalVisible(modalVisible);
            Keyboard.dismiss();
          }}
          >
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="ios-close" size={triggerSize} color="black" />
            </Pressable>
            <Title>Settings</Title>

            <SubTitle>Rest Notifications</SubTitle>
            <TwinView>
              <SettingLabel>Enable Notifications:</SettingLabel>
              <Switch
                onValueChange={() => {
                  setSettingState({
                    ...settingState,
                    enableRestNotifications: !settingState.enableRestNotifications,
                  });
                }}
                value={settingState.enableRestNotifications}
              />
            </TwinView>

            <TwinView>
              <SettingLabel disabled={!settingState.enableRestNotifications}>Rest notification timer:</SettingLabel>
              <SettingTextInput
                disabled={!settingState.enableRestNotifications}
                editable={settingState.enableRestNotifications}
                value={settingState.restNotificationTimer}
                placeholder={`${settings.restNotificationTimer}`}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setSettingState({
                    ...settingState,
                    restNotificationTimer: text,
                  });
                }}
              />
            </TwinView>

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
            <StyledButton onPress={() => {
              dispatch(actions.settings.updateSettings({
                ...settingState,
                restNotificationTimer: parseInt(settingState.restNotificationTimer),
              }));
              setModalVisible(!modalVisible);
            }}
            >
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
