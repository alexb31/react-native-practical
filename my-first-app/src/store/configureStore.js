import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import roadTripReducer from './reducers/roadtrip';
import uiReducer from "./reducers/ui";
import authReducer from './reducers/auth';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  places: placesReducer,
  roadTrips: roadTripReducer,
  roadTripsByUser: roadTripReducer,
  ui: uiReducer,
  auth: authReducer
});

let composeEnhancers = compose;

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(composeEnhancers(applyMiddleware(thunk))));
};

export default configureStore;