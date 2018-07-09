import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyCidD0kzuH9NQVQ7nMAaPCP5DJS2dBlwNI";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    let apiUrl = "http://10.0.2.2:8000/app_dev.php/v1/api/login_check";
      if (authMode === "signup") {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
      }
      fetch(
        apiUrl,
        {
          method: "POST",
          body: JSON.stringify({
            _username: authData.email,
            _password: authData.password,
            // firstName: authData.firstName,
            // lastName: authData.lastName,
            returnSecureToken: true
          }),
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          }
        }
      )
        .catch(err => {
          console.log("shit");
          console.log("error: " + err);
          alert("Authentication failed, please try again!");
          dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log('successssss');
          console.log(parsedRes);
          dispatch(uiStopLoading());
          if (!parsedRes.token) {
              alert("FUK UUUU!");
          } else {
              dispatch(authStoreToken(parsedRes.token));
              startMainTabs();
          }

        });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("ap:auth:token", token);
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });
      } else {
        console.log("TOKEN: " +token);
        resolve(token);
      }
    });
    return promise;
  };
};