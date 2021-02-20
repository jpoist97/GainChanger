import React, { useState } from 'react';
import {
  Alert, Modal, StyleSheet, Pressable, View, TouchableOpacity, Image,
} from 'react-native';
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    height: 500,
    width: 350,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
  },
  colorButton: {
    backgroundColor: 'black',
    padding: 1,
    borderColor: 'black',
    margin: 5,
  },
});

const SettingsPopup = (props) => {
  const { triggerSize } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >

        <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
          <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(modalVisible)}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="ios-close" size={triggerSize} color="black" />
            </Pressable>
            <Title>Settings</Title>
            <SubTitle>Notifications</SubTitle>
            <SubTitle>Color Theme</SubTitle>
            <TouchableOpacity style={styles.colorButton} onPress={() => { alert('clicked blue'); }}>
              <Image source={require('../../assets/blue.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.colorButton} onPress={() => { alert('clicked purple'); }}>
              <Image source={require('../../assets/purple.png')} />
            </TouchableOpacity>
            <Pressable
              style={[styles.button]}
              onPress={async () => {
                setModalVisible(false);
                try {
                  await firebase.auth().signOut();
                  navigation.navigate('Login');
                } catch (err) {
                  Alert.alert('Could not be signed out', err);
                }
              }}
            >
              <Buttontext>Log Out</Buttontext>
            </Pressable>
            <Pressable style={[styles.button]} onPress={() => setModalVisible(!modalVisible)}>
              <Buttontext>Save Changes</Buttontext>
            </Pressable>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name="ios-settings" size={triggerSize} color="black" />
      </Pressable>
    </View>

  );
};

// SettingsPopup.propTypes = {
//   style: Proptypes.array,
//   options: Proptypes.array.isRequired,
//   triggerSize: Proptypes.number,
// };

// SettingsPopup.defaultProps = {
//   style: [],
//   triggerSize: 18,
// };

export default SettingsPopup;
