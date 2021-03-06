import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken  } from './index';

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    };
};

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-awesome-places-3e57b.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw (new Error());
            }
        })
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://awesome-places-3e57b.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
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
            console.log(parsedRes);
            dispatch(uiStopLoading());
            dispatch(placeAdded());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        });
    };
};

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    };
};

export const getPlaces = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (!token) {
            return;
        }
        fetch("https://awesome-places-3e57b.firebaseio.com/places.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw (new Error());
            }
        })
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                })
            }
            dispatch(setPlaces(places));
            console.log(dispatch(setPlaces(places)));
        })
        .catch(err => {
            console.log(dispatch(setPlaces(places)));
            alert("Somethiong Went Wrong, sorry");
            console.log(err);
        })
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePLace(key));
        fetch("https://awesome-places-3e57b.firebaseio.com/places/" + key + ".json", {
                method: "DELETE"
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log("Done!");
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
    };
};

export const removePLace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};