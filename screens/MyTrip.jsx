import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
import UpComingTripScreen from "./MyTrip/UpComingTripsScreen";
import CompletedTripsScreen from "./MyTrip/CompletedTripsScreen";
import CanceledTripsScreen from "./MyTrip/CanceledTripsScreen";
import { getMyBooking } from "../handleAPI/viewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TripScreen = () => {
  const loadData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const data = await getMyBooking(token);

    console.log(data.data);

  }

  useEffect(() => {
    loadData();
  }, []);



  return (
    <View style={styles.container}>
      <Text>My Upcoming Trip</Text>
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
