/* eslint-disable */
import * as React from 'react';
import {
  Text, View, Alert, SafeAreaView, StyleSheet,
} from 'react-native';
import {
  Button, Avatar, List, TextInput,
} from 'react-native-paper';
import firebase from 'firebase';

export default ({ navigation }) => {
  const [name, setName] = React.useState('John Doe');
  const [state, setState] = React.useState('6x a week');
  return (
    <SafeAreaView style={{ containier: { flex: 1 } }}>
      <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        {/* Start ofRow containing, settings, profile, and logout */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: '8%' }}>
          <View style={{ width: '25%' }}>
            <Button
              uppercase={false}
              compact
              onPress={() => Alert.alert('Settings Pressed')}
              mode="text"
            >
              Settings
            </Button>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.HeaderText}>Profile</Text>
          </View>
          <View style={{ width: '25%', height: 50 }}>
          <Button
              compact
              uppercase={false}
              mode="text"
              onPress={() => firebase.auth().signOut().then(function() {
                console.log("sign out successful. Navigating to login...")
                navigation.navigate('Login');
              }).catch(function(error) {
                Alert.alert("Could not be signed out", error)
              })}
            >
              Logout
            </Button>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: '22%' }}>
          <Avatar.Image size={170} source={require('../../assets/Baby_Cole.jpg')} />
        </View>
        <View style={styles.cardView}>
          <List.Section>
            <List.Subheader style={{ textAlign: 'center', fontSize: 24 }}> Update Profile</List.Subheader>
            <TextInput style={{ backgroundColor: '#F6F6F6' }} type="flat" isFocused={false} label="Name" value={name} onChangeText={(name) => setName(name)} />
            <TextInput style={{ backgroundColor: '#F6F6F6' }} type="flat" label="Workout Frequency" value={state} onChangeText={(state) => setState(state)} />
            <List.Section>
              <List.Subheader style={{ marginLeft: -10, paddingBottom: -10, fontSize: 12 }}> Goals</List.Subheader>
              <List.Item
                title="Goal 1"
                style={styles.bottomBorder}
                description="Lose 20 pounds by March 1st"
              />
              <List.Item
                title="Goal 2"
                style={styles.bottomBorder}
                description="This is what a really long goal looks like, It can span multiple lines if needed."
              />
              <List.Item
                title="Goal 3"
                style={styles.bottomBorder}
                description="User can have a max of 3 Goals"
              />

            </List.Section>
          </List.Section>
        </View>
        {/* End of Card View */}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#B7B7B7',
    padding: 2,
  },
  cardView: {
    margin: '8%',
    height: '62%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F6F6F6',
    borderWidth: 3,
    borderColor: '#5DB075',
    borderRadius: 10,
  },
  HeaderText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});