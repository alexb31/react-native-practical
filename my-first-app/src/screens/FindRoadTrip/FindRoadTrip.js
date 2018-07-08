import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

// import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceList from '../../components/RoadTripList/RoadTripList';
import { getRoadtrips } from "../../store/actions/index";

class FindRoadTripScreen extends Component {
    static navigatorStyle = {
      navBarButtonColor: "orange"
    };
  
    state = {
      placesLoaded: false,
      removeAnim: new Animated.Value(1),
      placesAnim: new Animated.Value(0)
    };
  
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount() {
      this.props.onLoadPlaces();
    }
  
    onNavigatorEvent = event => {
      if (event.type === "NavBarButtonPress") {
        if (event.id === "sideDrawerToggle") {
          this.props.navigator.toggleDrawer({
            side: "left"
          });
        }
      }
    };
  
    placesLoadedHandler = () => {
      Animated.timing(this.state.placesAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    };
  
    placesSearchHandler = () => {
      Animated.timing(this.state.removeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          placesLoaded: true
        });
        this.placesLoadedHandler();
      });
    };
  
    itemSelectedHandler = key => {
      const selRoadTrip = this.props.roadTrips.find(place => {
        return place.key === key;
      });
      this.props.navigator.push({
        screen: "awesome-places.RoadTripDetailScreen",
        title: selRoadTrip.title,
        passProps: {
          selectedRoadTrip: selRoadTrip
        }
      });
      console.log("selPlace: " + selRoadTrip);
    };
  
    render() {
      let content = (
        <Animated.View
          style={{
            opacity: this.state.removeAnim,
            transform: [
              {
                scale: this.state.removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}
        >
          <TouchableOpacity onPress={this.placesSearchHandler}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Find Places</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
      if (this.state.placesLoaded) {
        content = (
          <Animated.View
            style={{
              opacity: this.state.placesAnim
            }}
          >
            <PlaceList
              roadTrips={this.props.roadTrips}
              onItemSelected={this.itemSelectedHandler}
            />
          </Animated.View>
        );
      }
      return (
        <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
          {content}
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    searchButton: {
      borderColor: "orange",
      borderWidth: 3,
      borderRadius: 50,
      padding: 20
    },
    searchButtonText: {
      color: "orange",
      fontWeight: "bold",
      fontSize: 26
    }
  });
  
  const mapStateToProps = state => {
    return {
      roadTrips: state.roadTrips.roadTrips
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onLoadPlaces: () => dispatch(getRoadtrips())
    };
  };
  
  console.log("mapStateToProps: " + mapStateToProps)
  
  export default connect(mapStateToProps, mapDispatchToProps)(FindRoadTripScreen);