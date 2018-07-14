import { SET_PLACES, SET_ROADTRIPS } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';


export const getRoadtrips = () => {
    return dispatch => {
        const apiLocal = "http://10.0.2.2:8000/app_dev.php/v1/api/roadtrip";
        const apiProd = "http://roadmontrip.fr/v1/api/roadtrip";
        
        dispatch(authGetToken())
        .then(token => {
            return fetch(
              apiProd, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token, 
                }
              })
          })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw (new Error());
                }
            })
            .then(parsedRes => {
                console.log("success !!!!!");
                // console.log("RAAAAHHH : " +token);
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
                alert("Erreur, ");
                console.log(dispatch(authGetToken()));
                console.log("RAAAAHHH : ");
                console.log(err);
            })
            .catch(() => {
                alert("No Valid Token Found :/");
            });
    };
};

export const getAllRoadtrips = () => {
    return dispatch => {
        const apiLocal = "http://10.0.2.2:8000/app_dev.php/v1/api/roadtrip";
        const apiProd = "http://roadmontrip.fr/v1/api/roadtrip";
        
        dispatch(authGetToken())
        .then(token => {
            return fetch(
              apiProd, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token, 
                }
              })
          })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw (new Error());
                }
            })
            .then(parsedRes => {
                console.log("success !!!!!");
                // console.log("RAAAAHHH : " +token);
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
                alert("Erreur, ");
                console.log(dispatch(authGetToken()));
                console.log("RAAAAHHH : ");
                console.log(err);
            })
            .catch(() => {
                alert("No Valid Token Found :/");
            });
    };
};

export const setRoadtrips = roadTrips => {
    return {
        type: SET_ROADTRIPS,
        roadTrips: roadTrips
    };
}