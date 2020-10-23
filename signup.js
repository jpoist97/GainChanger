import { SafeAreaView, View, StyleSheet } from 'react-native'
import {Button, Ima, TextInput} from 'react-native-paper'

export default class signup extends React.Component {
    render(){
        return(
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.icon}
                            source={require('./assets/icon.png')}
                            >
                    </Image>
                    <TextInput style={styles.nameInput}
                                mode={'flat'}
                                placeholder={'Name'}
                                >

                    </TextInput>
                    <TextInput style={styles.emailInput}
                                mode={'flat'}
                                placeholder={'Email'}
                                >

                    </TextInput>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.passwordInput}
                                    mode={'flat'}
                                    placeholder={'Password'}
                                    >

                        </TextInput>
                        <Button style={styles.passwordShow}>
                            Show
                        </Button>
                    </View>
                    <Button style={styles.signup}>
                        Sign Up
                    </Button>
                    <Button style={styles.login}>
                        <Text>Already have an account? Login</Text>
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    icon: {

    },
    nameInput: {

    },
    emailInput:{

    },
    passwordContainer: {

    },
    passwordInput: {

    },
    passwordShow: {
        
    },
    signup: {

    },
    login: {

    },
});