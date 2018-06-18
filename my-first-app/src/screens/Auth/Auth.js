import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import startMaintabs from '../MainTabs/startMainTabs';
import backgroundImage from "../../assets/img_lights.jpg";
import ButtonBackground from "../../components/UI/ButtonBackground/ButtonBackground";

class AuthScreen extends Component {
    loginHandler = () => {
        startMaintabs();
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
            <MainText>
                <HeadingText style={styles.textHeading}>Please Log In</HeadingText>
            </MainText>
                <ButtonBackground color="#29aaf4" onPress={() => alert('login')}>Switch To Login</ButtonBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your E-mail Adress" style={styles.input}/>
                    <DefaultInput placeholder="Password" style={styles.input}/>
                    <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                    <ButtonBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonBackground>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    }
})

export default AuthScreen;