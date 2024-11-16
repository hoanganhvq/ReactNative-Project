import React from "react";
import { Text, View, StyleSheet } from "react-native"; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
import UpComingTripScreen from "./MyTrip/UpComingTripsScreen";
import CompletedTripsScreen from "./MyTrip/CompletedTripsScreen";
import CanceledTripsScreen from "./MyTrip/CanceledTripsScreen";

const TripScreen = () => {
    
        return (
            <View style = {styles.container}>
              <Text>My Upcoming Trip</Text>
            </View>
          );
}

const styles = StyleSheet.create({
    // Example style
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TripScreen;
