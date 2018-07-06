import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

import RoadTripItem from '../RoadTripItem/RoadTripItem';

const RoadTripList = props => {
    return (
    <FlatList
    style={styles.listContainer}
        data="{props.roadtrips}"
        renderItem={(info) => (
            <RoadTripItem
            placeName="{info.item.name}"
            // placeImage={info.item.image}
            onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default RoadTripList;