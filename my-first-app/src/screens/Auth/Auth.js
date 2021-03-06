import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from "../../assets/map2.png";
import ButtonBackground from "../../components/UI/ButtonBackground/ButtonBackground";
import headingText from '../../components/UI/HeadingText/HeadingText';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            firstName: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 2
                },
                touched: false
            },
            lastName: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 2
                },
                touched: false
            },
            gender: {
                value: "MALE",
                valid: true,
                touched: false
            },
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
      };
    
      constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
      }

      componentWillMount() {
          Dimensions.removeEventListener("change", this.updateStyles);
      }

      componentDidMount() {
          this.props.onAutoSignIn();
      }

      switchAuthModeHandler = () => {
          this.setState(prevState => {
              return {
                  authMode: prevState.authMode === "login" ? "signup" : "login"
              }
          })
      }

      updateStyles = (dims) => {
        this.setState({
            viewMode:
              dims.window.height > 500 ? "portrait" : "landscape"
          });
      }

    authHandler = () => {
        const authData = {
            firstName: this.state.controls.firstName.value,
            lastName: this.state.controls.lastName.value,
            gender: this.state.controls.gender.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onTryAuth(authData, this.state.authMode);
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
          const equalControl = this.state.controls[key].validationRules.equalTo;
          const equalValue = this.state.controls[equalControl].value;
          connectedValue = {
            ...connectedValue,
            equalTo: equalValue
          };
        }
        if (key === "password") {
          connectedValue = {
            ...connectedValue,
            equalTo: value
          };
        }
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === "password"
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
              },
              [key]: {
                ...prevState.controls[key],
                value: value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue
                ),
                touched: true
              }
            }
          };
        });
      };

    render() {
        
        let headingText = null;
        let nameControl = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <ButtonBackground 
                 color="#29aaf4"
                 onPress={this.authHandler}
                 disabled={
                     !this.state.controls.confirmPassword.valid && this.state.authMode === "signup"
                     || !this.state.controls.email.valid
                     || !this.state.controls.password.valid
                 }
                 >
                 Se Connecter
                 </ButtonBackground>
        );

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Formulaire de Connexion</HeadingText>
                </MainText>
            );
        }
        if (this.state.authMode === "signup") {

            nameControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                    <DefaultInput 
                            placeholder="FirstName" 
                            style={styles.input} 
                        value={this.state.controls.firstName.value} 
                        onChangeText={(val) => this.updateInputState('firstName', val)} 
                        valid={this.state.controls.firstName.valid}
                        touched={this.state.controls.firstName.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />

                        <DefaultInput 
                            placeholder="LastName" 
                            style={styles.input} 
                            value={this.state.controls.lastName.value} 
                            onChangeText={(val) => this.updateInputState('lastName', val)}
                            valid={this.state.controls.lastName.valid}
                            touched={this.state.controls.lastName.touched}
                        />
                </View>
            )

            confirmPasswordControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                        <DefaultInput 
                            placeholder="Confirm Password" 
                            style={styles.input} 
                            value={this.state.controls.confirmPassword.value} 
                            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                            valid={this.state.controls.confirmPassword.valid}
                            touched={this.state.controls.confirmPassword.touched}
                            secureTextEntry
                        />
                        </View>
            );
        }
        if(this.props.isLoading) {{
            submitButton = <ActivityIndicator />;
        }}
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            {headingText}
                {/* <ButtonBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch To {this.state.authMode === 'login' ? "Sign Up": "Login"}</ButtonBackground> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                {nameControl}
                    <DefaultInput 
                        placeholder="Adresse Email" 
                        style={styles.input} 
                        value={this.state.controls.email.value} 
                        onChangeText={(val) => this.updateInputState('email', val)} 
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                        <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>   
                        <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                        <DefaultInput
                            placeholder="Mot de Passe" 
                            style={styles.input} 
                            value={this.state.controls.password.value} 
                            onChangeText={(val) => this.updateInputState('password', val)}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                            secureTextEntry
                        />
                        </View>
                        {confirmPasswordControl}
                </View>
                </View>
                </TouchableWithoutFeedback>
                    {submitButton}
            </KeyboardAvoidingView>
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
        backgroundColor: "#fff",
        borderColor: "#000"
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
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);