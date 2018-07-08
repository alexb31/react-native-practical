import { SET_PLACES, SET_ROADTRIPS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';


export const getRoadtrips = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        console.log(token);
        console.log('testing');
        // if (!token) {
        //     return;
        // }
        fetch("http://10.0.2.2:8000/app_dev.php/v1/api/roadtrip")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log("success");
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
            alert("Something Went Wrong, sorry");
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