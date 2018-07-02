import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData));
  };
};

export const authSignup = (authData) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("API_LINK", {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert("Authentication failed");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
        if (parsedRes.error) {
          alert("Authentication failed");
          console.log(err);
          dispatch(uiStopLoading());
        } else {
          startMainTabs();
        }
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
  };
};