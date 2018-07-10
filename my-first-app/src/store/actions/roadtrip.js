import { SET_PLACES, SET_ROADTRIPS } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';


export const getRoadtrips = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch(
              "http://limitless-springs-83583.herokuapp.com/api/v1/accommodations", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+token, 
                }
              })
          })
            .catch(() => {
                alert("No Valid Token Found :/");
            })
            .then(res => res.json)
            .then(parsedRes => {
                console.log("success !!!!!");
                // console.log("RAAAAHHH : " +token);
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
                alert("ENCULE DE TOKEN: ");
                console.log(dispatch(authGetToken()));
                console.log("RAAAAHHH : ");
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