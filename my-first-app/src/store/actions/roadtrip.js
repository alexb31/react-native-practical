import { SET_PLACES, SET_ROADTRIPS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';


export const getRoadtrips = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        console.log('testing');
        if (!token) {
            return;
        }
        console.log("TOKEN: " +token);
        fetch("http://10.0.2.2:8000/app_dev.php/v1/api/user", {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.token, 
            }
          })
        .catch(err => {
            alert("PERDU HAHA");
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log("success !!!!!");
          console.log(parsedRes);
          const roadTrips = [];
          for (let key in parsedRes) {
            roadTrips.push({
                ...parsedRes[key],
                key: key
            })
            // console.log(parsedRes[key]); 
        }
        // console.log(roadTrips);
        dispatch(setRoadtrips(roadTrips));

        console.log(setRoadtrips(roadTrips));
        })
        .catch(err => {
            alert("ENCULE DE TOKEN: " + token);
            console.log(err);
        })
    };
};

export const setRoadtrips = roadTrips => {
    return {
        type: SET_ROADTRIPS,
        roadTrips: roadTrips
    };
}