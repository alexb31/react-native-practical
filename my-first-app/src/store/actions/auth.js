import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyCidD0kzuH9NQVQ7nMAaPCP5DJS2dBlwNI";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    let apiUrl = "http://10.0.2.2:8000/app_dev.php/v1/api/user";
      if (authMode === "signup") {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
      }
      fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
            firstName: authData.firstName,
            lastName: authData.lastName,
            returnSecureToken: true
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .catch(err => {
          consoler.log("shit");
          console.log("error: " + err);
          alert("Authentication failed, please try again!");
          dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log('success');
          console.log(parsedRes);
          dispatch(uiStopLoading());
          if (!parsedRes.idToken) {
              alert("Authentication failed, please try again!");
          } else {
              dispatch(authSetToken(parsedRes.idToken));
              startMainTabs();
          }
        });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};