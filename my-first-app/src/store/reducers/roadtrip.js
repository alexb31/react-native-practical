import { SET_PLACES, SET_ROADTRIPS } from './../actions/actionTypes'

const initialState = {
  roadTrips: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROADTRIPS:
    return {
      ...state,
      roadTrips: action.roadTrips
    }
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