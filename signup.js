import React from 'react';
import { SafeAreaView, View, StyleSheet,Image } from 'react-native'
import {DefaultTheme,configureFonts,Provider,Button, TextInput,Text} from 'react-native-paper'

const fontConfig = {
    default: {
      regular: {
        //Decide on main font
      },
      medium: {
        //Decdie on medium font
      },
      light: {
        //Decide on light font
      },
  
    },
  };
  
  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: '#5DB075',
      accent: '#F6F6F6',
    },
  };

export default class signup extends React.Component {
    state= {
        email:"",
        name:"",
        password:"",
        showPassword:false,
    }

    showPasswordPress = () => {
        this.setState({
            ...this.state,
            showPassword: !(this.state.showPassword)
        })
    }

    render(){
        return(
            <Provider theme={theme}>
                <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <Image style={styles.icon}
                            source={require('./assets/icon.png')}
                            >
                    </Image>
                    <TextInput style={styles.nameInput}
                                selectionColor={"#5DB075"}
                                placeholder={'Name'}
                                mode={'flat'}
                                underlineColor={'transparent'}
                                >

                    </TextInput>
                    <TextInput style={styles.emailInput}
                                mode={'flat'}
                                placeholder={'Email'}
                                selectionColor={"#5DB075"}
                                underlineColor={'transparent'}
                                textContentType={"emailAddress"}
                                >

                    </TextInput>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.passwordInput}
                                    mode={'flat'}
                                    placeholder={'Password'}
                                    selectionColor={"#5DB075"}
                                    underlineColor={'transparent'}
                                    textContentType={"password"}
                                    secureTextEntry={this.state.showPassword}
                                    >

                        </TextInput>
                        <Button style={styles.passwordShow}
                                uppercase={false}
                                mode={"text"}
                                color={"#5DB075"}
                                onPress={this.showPasswordPress}
                                >
                            Show
                        </Button>
                    </View>
                    <Button style={styles.signup}
                            uppercase={false}
                            mode={'contained'} 
                            dark={true}   
                            >
                        Sign Up
                    </Button>
                    <Button style={styles.login}
                            uppercase={false}
                            mode={'text'}
                            color={"#5DB075"}
                            >
                        Already have an account? Login
                    </Button>
                </View>
            </SafeAreaView>
            </Provider>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
        height:"100%",
    },
    icon: {
        width:225,
        height:225,
        marginTop:50,
        marginBottom:50,
    },
    nameInput: {
        alignSelf:"center",
        width:"80%",
        backgroundColor:"#f6f6f6",
        borderColor:"#E8E8E8",
        borderWidth:2,
        marginBottom:25,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        borderRadius:12,
    },
    emailInput:{
        alignSelf:"center",
        width:"80%",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        backgroundColor:"#f6f6f6",
        borderColor:"#E8E8E8",
        borderWidth:2,
        marginBottom:25,
        borderRadius:12,
    },
    passwordContainer: {
        width:'100%',
        position:'relative',
        alignSelf:'stretch',
        justifyContent:'center',
        flexDirection:'row',
    },
    passwordInput: {
        alignSelf:"center",
        width:"80%",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        backgroundColor:"#f6f6f6",
        borderColor:"#E8E8E8",
        borderWidth:2,
        marginBottom:25,
        borderRadius:12,
    },
    passwordShow: {
        position:'absolute',
        marginTop:12,
        padding:5,
        right:'9%',
    },
    signup: {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent: "center",
        marginTop:40,
        marginBottom: 10,
        backgroundColor: "#5DB075",
    },
    login: {
    },
});