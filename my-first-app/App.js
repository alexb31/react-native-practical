import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import RoadTripDetailScreen from './src/screens/RoadTripDetail/RoadTripDetail';
import FindRoadTrip from './src/screens/RoadTrip/RoadTrip';
import FindRoadTripByUser from './src/screens/RoadTripByUser/RoadTripByUser';
import configureStore from './src/store/configureStore';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

//  Register Screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindRoadTrip", () => FindRoadTrip, store, Provider);
Navigation.registerComponent("awesome-places.FindRoadTripByUser", () => FindRoadTripByUser, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider );
Navigation.registerComponent("awesome-places.RoadTripDetailScreen", () => RoadTripDetailScreen, store, Provider );
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer, store, Provider);

// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }  
});