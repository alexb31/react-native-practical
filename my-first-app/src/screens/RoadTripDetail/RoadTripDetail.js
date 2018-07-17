import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import backgroundImage from "../../assets/roadtrip.jpg";

import Icon from "react-native-vector-icons/Ionicons";
// import { deletePlace } from "../../store/actions/index";

class RoadTripDetail extends Component {
  state = {
    viewMode: "portrait"
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  }

  // renderLocation() {
  //   return(
  //     this.props.selectedRoadTrip.stops.map((stops) => {
  //       console.log("GOSHORYUKEN: " +stops['lat', 'lon']);
  //       <MapView
  //         initialRegion={{
  //           latitude: {stops},
  //           longitude: {stops},
  //           latitudeDelta: 4,
  //           longitudeDelta: 4,
  //         }}
  //         style={styles.map}
  //         />
  //         <MapView.Marker coordinate={stops} />
  //     })
  //   )
  // }

//   renderStop() {
//     return (
//       this.props.selectedRoadTrip.stops.map((stops, i) => {
//             return(
//             <Text key={i} style={styles.placeName}>
//             <Text key={i} style={{ color: '#bb4467' }}> Etapes {i + 1}:  </Text>
//             {stops['address']}
//           </Text>
//             );
//           }
//         )
//       )
// }

  //  renderCreatedBy() {
  //   return (
  //     this.props.selectedRoadTrip.owner.map((owner) => {
  //           return(
  //           <Text style={styles.placeName}>
  //           {owner['first_name']} {owner['last_name']}
  //           </Text>
  //           );
  //         }
  //       )
  //     )
  //  }

   renderStart() {
     return (
      <Text style={styles.placeName}>
          <Text style={{ color: '#bb4467' }}> Depart de:  </Text>
          {this.props.selectedRoadTrip.stop_start.address}{"\n"}
      </Text>
     );
    }

    renderSteps() {
      return (
        this.props.selectedRoadTrip.stops.map((stops, i) => {
              return(
              <Text key={i} style={styles.placeName}>
              <Text key={i} style={{ color: '#bb4467' }}> Etape {i + 1}:  </Text>
              {stops['address']}{"\n"}
            </Text>
              );
            }
          )
        )
    }

    renderEnd() {
      return (
       <Text style={styles.placeName}>
           <Text style={{ color: '#bb4467' }}> Arrivée à:  </Text>
           {this.props.selectedRoadTrip.stop_end.address}{"\n"}
       </Text>
      );
     }

    renderDuration() {
      return (
        <Text style={styles.placeName}>
            <Text style={{ color: '#bb4467' }}> {this.props.selectedRoadTrip.duration}  </Text>
            jours
        </Text>
       );
    }

renderList(i) {
  const stops_list = this.props.selectedRoadTrip;
  // if (this.state.showIngredients) {
    return (this.renderSteps(stops_list));
  // }
  // return (this.renderDirectionList(directions));
}

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <ScrollView>
      <View
        // style={[
        //   styles.container,
        //   this.state.viewMode === "portrait"
        //     ? styles.portraitContainer
        //     : styles.landscapeContainer
        // ]}
      >

      <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={backgroundImage}
              style={styles.placeImage}
            />
          </View>

        <View>
          
          <Text style={styles.roadTripInfo}>Crée par: </Text> 
          <Text style={styles.placeName}>
          {this.props.selectedRoadTrip.owner.first_name} {this.props.selectedRoadTrip.owner.last_name}
        </Text>
        </View>

        <View>
          
          <Text style={styles.roadTripInfo}>Description: </Text> 
          <Text style={styles.placeName}>
          {this.props.selectedRoadTrip.description}
        </Text>
        </View>

        <View>
          <Text style={styles.roadTripInfo}>Etapes: </Text> 
          <Text style={styles.placeName}>
          {this.renderStart()}
          {this.renderList().slice(0,-2)}
        {this.renderEnd()}
        </Text>
        </View>

        <View>
          <Text style={styles.roadTripInfo}>Durée du Roadtrip: </Text> 
          <Text style={styles.placeName}>
          {this.renderDuration()}
        </Text>
        </View>

        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {/* {this.props.selectedRoadTrip.owned.map(function(owned) {
                return owned['title'];
              })} */}
            </Text>
          </View>
          {/* <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 1
  },
  roadTripInfo: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#bb4467'
  },
  placeImage: {
    width: "100%",
    marginBottom: 20
    // height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    marginTop: 18,
    marginBottom: 18
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  }
});

// const mapDispatchToProps = dispatch => {
//   return {
//     onDeletePlace: key => dispatch(deletePlace(key))
//   };
// };

export default connect(null, null)(RoadTripDetail);