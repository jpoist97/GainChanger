import React, { useState } from 'react';
import {
   Alert,
   Modal,
   Pressable,
   View,
   TouchableOpacity,
   Image,
   Switch,
   Text,
   TextInput,
   Keyboard,
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
   font-size: 18px;
   padding-bottom: 5px;
   padding-top: 20px;
`;

const StyledButton = styled(TouchableOpacity)`
   background-color: #e2e2e2;
   border-radius: 20px;
   padding: 5px;
   padding-left: 15px;
   padding-right: 15px;
   margin-top: 25px;
`;

const Buttontext = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 16px;
`;

const ColorButton = styled(Pressable)`
   margin-top: 8px;
   margin-bottom: 10px;
   border-color: #000000;
   border-width: ${(props) => (props.selected ? '2px' : '0px')};
   margin: 4px;
   width: 45%;
   height: 32px;
`;

const CenterView = styled(Pressable)`
   display: flex;
   margin-top: 10px;
   align-items: center;
   padding-top: 160px;
   padding-bottom: 100px;
`;

const ModalView = styled(Pressable)`
   height: 470px;
   width: 350px;
   margin: 20px;
   background-color: white;
   border-radius: 20px;
   padding-left: 20px;
   padding-top: 13px;
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
   padding-bottom: 10px;
   color: ${(props) => (props.disabled ? 'darkgray' : 'black')};
`;

const SettingTextInput = styled(TextInput)`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  color: ${(props) => (props.disabled ? 'darkgray' : 'black')}
  margin-right: 10px;
  background-color: #EFEFEF;
  text-align: center;
  width: 55px;
  border-radius: 5px;
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
      colorTheme: settings.colorTheme,
   });

   const saveChanges = () => {
      dispatch(
         actions.settings.updateSettings({
            ...settingState,
            restNotificationTimer:
               parseInt(settingState.restNotificationTimer) ||
               settings.restNotificationTimer,
         })
      );

      setSettingState({
         ...settingState,
         restNotificationTimer:
            settingState.restNotificationTimer ||
            `${settings.restNotificationTimer}`,
      });

      setModalVisible(!modalVisible);
   };

   const discardChanges = () => {
      setSettingState({
         ...settings,
         restNotificationTimer: `${settings.restNotificationTimer}`,
      });
      setModalVisible(!modalVisible);
   };

   const attemptModalClose = () => {
      // If changes were made
      if (
         settings.enableRestNotifications !==
            settingState.enableRestNotifications ||
         `${settings.restNotificationTimer}` !==
            settingState.restNotificationTimer ||
         settings.colorTheme !== settingState.colorTheme
      ) {
         Alert.alert(
            'Unsaved Changes',
            'You have unsaved changes, do you want to keep or discard them?',
            [
               {
                  text: 'Keep',
                  onPress: saveChanges,
               },
               {
                  text: 'Discard',
                  onPress: discardChanges,
               },
            ]
         );
      } else {
         setModalVisible(!modalVisible);
      }
   };

   return (
      <View>
         <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
         >
            <CenterView onPress={attemptModalClose}>
               <ModalView
                  onPress={() => {
                     setModalVisible(modalVisible);
                     Keyboard.dismiss();
                  }}
               >
                  <TwinView>
                     <Title style={{ marginTop: -5 }}>Settings</Title>
                     <Pressable onPress={() => setModalVisible(false)}>
                        <Ionicons
                           name="ios-close"
                           size={30}
                           color="black"
                           onPress={attemptModalClose}
                           style={{ marginTop: -10, marginRight: -5 }}
                        />
                     </Pressable>
                  </TwinView>
                  <SubTitle>Rest Notifications</SubTitle>
                  <TwinView>
                     <SettingLabel>Enable Notifications:</SettingLabel>
                     <Switch
                        onValueChange={() => {
                           setSettingState({
                              ...settingState,
                              enableRestNotifications:
                                 !settingState.enableRestNotifications,
                           });
                        }}
                        value={settingState.enableRestNotifications}
                     />
                  </TwinView>

                  <TwinView>
                     <SettingLabel
                        disabled={!settingState.enableRestNotifications}
                        style={{ marginTop: 7 }}
                     >
                        Notification Timer:
                     </SettingLabel>
                     <View
                        style={{
                           display: 'flex',
                           flexDirection: 'row',
                           alignItems: 'center',
                           justifyContent: 'center',
                        }}
                     >
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
                           maxLength={3}
                        />
                        <SettingLabel
                           disabled={!settingState.enableRestNotifications}
                           style={{ marginTop: 8 }}
                        >
                           Secs
                        </SettingLabel>
                     </View>
                  </TwinView>

                  <SubTitle>Color Theme</SubTitle>
                  <TwinView>
                     <ColorButton
                        selected={settingState.colorTheme === 'aqua'}
                        onPress={() => {
                           setSettingState({
                              ...settingState,
                              colorTheme: 'aqua',
                           });
                        }}
                     >
                        <Image
                           source={require('../../assets/blue.png')}
                           style={{ width: '100%', height: '100%' }}
                        />
                     </ColorButton>
                     <ColorButton
                        selected={settingState.colorTheme === 'default'}
                        onPress={() => {
                           setSettingState({
                              ...settingState,
                              colorTheme: 'default',
                           });
                        }}
                     >
                        <Image
                           source={require('../../assets/purple.png')}
                           style={{ width: '100%', height: '100%' }}
                        />
                     </ColorButton>
                  </TwinView>

                  <TwinView>
                     <ColorButton
                        selected={settingState.colorTheme === 'red'}
                        onPress={() => {
                           setSettingState({
                              ...settingState,
                              colorTheme: 'red',
                           });
                        }}
                     >
                        <Image
                           source={require('../../assets/red.png')}
                           style={{ width: '100%', height: '100%' }}
                        />
                     </ColorButton>
                     <ColorButton
                        selected={settingState.colorTheme === 'multi'}
                        onPress={() => {
                           setSettingState({
                              ...settingState,
                              colorTheme: 'multi',
                           });
                        }}
                     >
                        <Image
                           source={require('../../assets/multi.png')}
                           style={{ width: '100%', height: '100%' }}
                        />
                     </ColorButton>
                  </TwinView>

                  <StyledButton
                     style={{ width: 145 }}
                     onPress={() => {
                        saveChanges();
                     }}
                  >
                     <Buttontext>Save Changes</Buttontext>
                  </StyledButton>

                  <StyledButton
                     style={{ width: 107 }}
                     onPress={async () => {
                        try {
                           await firebase.auth().signOut();
                           dispatch(actions.loading.resetLoadStore());
                           navigation.navigate('Login');
                        } catch (err) {
                           Alert.alert('Could not be signed out', err);
                        }
                        setModalVisible(false);
                     }}
                  >
                     <Buttontext>Log Out</Buttontext>
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
