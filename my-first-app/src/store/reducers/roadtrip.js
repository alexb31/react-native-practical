import { SET_PLACES, SET_ROADTRIPS, SET_ROADTRIPS_BY_USER } from './../actions/actionTypes'

const initialState = {
  roadTrips: [],
  roadTripsByUser: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROADTRIPS:
    return {
      ...state,
      roadTrips: action.roadTrips
    };
    case SET_ROADTRIPS_BY_USER:
    return {
      ...state,
      roadTripsByUser: action.roadTripsByUser
    };
    // case REMOVE_PLACE:
    //     return {
    //       ...state,
    //       places: state.places.filter(place => {
    //         return place.key !== action.key;
    //       })
    //     };
    default:
      return state;
  }
};

export default reducer;