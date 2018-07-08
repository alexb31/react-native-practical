import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    const token = getState().auth.token;
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
            email: authData._username,
            password: authData._password,
            // firstName: authData.firstName,
            // lastName: authData.lastName,
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
          console.log('successssss');
          console.log("token: " +token);
          console.log(parsedRes);
          dispatch(uiStopLoading());
          if (!parsedRes.token) {
              alert("FUK UUUU!");
          } else {
              dispatch(authSetToken(parsedRes.token));
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