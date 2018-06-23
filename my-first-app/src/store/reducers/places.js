import { ADD_PLACE, DELETE_PLACE } from './../actions/actionTypes'

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
        return {
          ...state,
          places: state.places.concat({
            key: `${Math.random()}`,
            name: action.placeName,
            image: {
              uri: "https://www.w3schools.com/w3css/img_lights.jpg"
            },
            location: action.location
          })
        };
    case DELETE_PLACE:
        return {
          ...state,
          places: state.places.filter(place => {
            return place.key !== action.placeKey;
          })
        };
    default:
      return state;
  }
};

export default reducer;