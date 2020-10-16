import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { event } from 'react-native-reanimated';

export default class login extends React.Component {
    state={
        email:"",
        password:"",
        showPassword:true,
    }

    loginPressed = () => {
        alert("Login button pressed")
    }

    forgotPressed = () => {
        alert("forgot password pressed")
    }

    signUpPressed = () => {
        alert("sign up pressed")
    }

    showPasswordPress = () => {
        this.setState({
            ...this.state,
            showPassword: !(this.state.showPassword)
        });
    }

    render(){
        return (
        <View style={styles.container}>
            <Image style={styles.icon} 
                source={require('./assets/icon.png')}
            />
            <TextInput style={styles.email} 
                textContentType="emailAddress" 
                placeholder="Email" 
                value={this.state.email}
                onChangeText={(value) => this.setState({
                                                ...this.state,
                                                email:value
                                            })}
            />
            <View style={styles.passwordContainer}>
                <TextInput style={styles.password}
                    textContentType="password" 
                    placeholder="Password" 
                    value={this.state.password}
                    onChangeText={(value) => this.setState({
                                                    ...this.state,
                                                    password:value
                                                })}
                    secureTextEntry={this.state.showPassword}
                />
                <TouchableOpacity onPress={this.showPasswordPress} style={styles.showContainer}>
                    <Text style={styles.show}>Show</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.forgotPressed}>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.loginPressed} style={styles.loginBtn}>
                <Text style={styles.loginTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signUpPressed}>
                <Text style={styles.signup}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    passwordContainer:{
        position:'relative',
        alignSelf:'stretch',
        justifyContent:'center',
        flexDirection:'row',
        
    },
    showContainer:{
        position:'absolute',
        right:'11%',
        padding:3,
        marginTop:8,
        paddingRight:8,
    },
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
        marginBottom:150,
    },
    show: {
        color:"#5DB075",
        fontSize:16,
        fontWeight:'bold',
    },
    email: {
        alignSelf:"center",
        width:"80%",
        padding:10,
        borderRadius:10,
        backgroundColor:"#f6f6f6",
        borderColor:"#E8E8E8",
        borderWidth:1,
        marginBottom:25,
    },
    password: {
        alignSelf:"center",
        width:"80%",
        padding:10,
        borderRadius:10,
        backgroundColor:"#f6f6f6",
        borderColor:"#E8E8E8",
        borderWidth:1,
        marginBottom:25,
    },
    forgot: {
        color: "#5DB075",
        fontWeight:'bold',
    },
    loginBtn: {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent: "center",
        marginTop:40,
        marginBottom: 10,
        backgroundColor: "#5DB075",
    },
    loginTxt:{
        color:"white",
        fontSize:16,
    },
    signup: {
        color: "#5DB075",
        width: '100%',
    }
    });