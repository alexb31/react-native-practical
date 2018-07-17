import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from '../../../App';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let apiLocal = "http://10.0.2.2:8000/app_dev.php/v1/api/login_check";
    let apiProd = "http://roadmontrip.fr/v1/api/login_check";
      fetch(
        apiProd,
        {
          method: "POST",
          body: JSON.stringify({
            _username: authData.email,
            _password: authData.password,
            returnSecureToken: true
          }),
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          }
        }
      )
        .then(res => {
          if(res.ok) {
              return res.json();
              console.log(res.json());
          } else {
              throw (new Error());
              console.log("PERDU");
              console.log(res.json());
          }
        })
        .then(parsedRes => {
          console.log('successssss');
          console.log(parsedRes);
          dispatch(uiStopLoading());
          if (!parsedRes.token) {
              alert("Erreur d'authentification!");
          } else {
              dispatch(authStoreToken(parsedRes.token));
              startMainTabs();
          }
        })
        .catch(err => {
          console.log("shit");
          console.log("error: " + err);
          alert("Erreur d'authentification");
          dispatch(uiStopLoading());
        })
  };
};

export const authStoreToken = (token) => {
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
      const jwtDecode = require('jwt-decode');
      const decoded = jwtDecode(token);
      console.log(decoded);
        console.log(getState());
      if (!token) {
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject();
              return;
            }
              dispatch(authSetToken(tokenFromStorage));
              resolve(tokenFromStorage);
          });
      } else {
        console.log("TOKEN: " +token);
        resolve(token);
      }
    });
    promise.catch(err => {
      dispatch(authClearStorage()); 
    });
    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token => {
      startMainTabs();
    })
    .catch(err => console.log("Erreur de Token"));
  };
};

export const authClearStorage = () => {
  return dispatch => {
   return AsyncStorage.removeItem("ap:auth:token");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
};