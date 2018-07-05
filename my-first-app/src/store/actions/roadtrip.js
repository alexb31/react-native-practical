import { SET_ROADTRIPS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';


export const getRoadtrips = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        console.log('testing');
        if (!token) {
            return;
        }
        fetch("http://10.0.2.2:8000/app_dev.php/v1/api/roadtrip")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log("success");
          console.log("parsedRes: " + parsedRes)
            const roadTrip = [4];
            for (let key in parsedRes) {
              roadTrip.push({
                    ...roadTrip,
                    // image: {
                    //     uri: parsedRes[key].image
                    // },
                    key: key
                })
            }
            console.log(roadTrip);
            dispatch(setRoadtrip(roadTrip));
        })
        .catch(err => {
            alert("Something Went Wrong, sorry");
            console.log(err);
        })
    };
};

export const setRoadtrip = roadTrip => {
    return {
        type: SET_ROADTRIPS,
        roadTrip: roadTrip
    };
}