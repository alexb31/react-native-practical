import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {
    return (
    <FlatList
    style={styles.listContainer}
        data={props.roadTrips}
        renderItem={(info) => (
    <ListItem
        placeName={info.item.title}
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

export default placeList;