import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import startMaintabs from '../MainTabs/startMainTabs';
import backgroundImage from "../../assets/img_lights.jpg";
import ButtonBackground from "../../components/UI/ButtonBackground/ButtonBackground";
import headingText from '../../components/UI/HeadingText/HeadingText';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      };
    
      constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
      }

      componentWillMount() {
          Dimensions.removeEventListener("change", this.updateStyles);
      }

      updateStyles = (dims) => {
        this.setState({
            viewMode:
              dims.window.height > 500 ? "portrait" : "landscape"
          });
      }

    loginHandler = () => {
        startMaintabs();
    }

    render() {
        
        let headingText = null;

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
            {headingText}
                <ButtonBackground color="#29aaf4" onPress={() => alert('login')}>Switch To Login</ButtonBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your E-mail Adress" style={styles.input}/>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}
                        >
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                        <DefaultInput placeholder="Password" style={styles.input}/>
                        </View>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                        <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                        </View>
                </View>
                </View>
                    <ButtonBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonBackground>
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
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
      },
      landscapePasswordWrapper: {
        width: "45%"
      },
      portraitPasswordWrapper: {
        width: "100%"
      }
})

export default AuthScreen;