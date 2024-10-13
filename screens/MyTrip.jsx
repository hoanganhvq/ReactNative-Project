import React from "react";
import { Text, View, StyleSheet } from "react-native"; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
import UpComingTripScreen from "./MyTrip/UpComingTripsScreen";
import CompletedTripsScreen from "./MyTrip/CompletedTripsScreen";
import CanceledTripsScreen from "./MyTrip/CanceledTripsScreen";

const TripScreen = () => {
    
        return (
            <TopTab.Navigator
              screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarIndicatorStyle: { backgroundColor: 'tomato' },
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: '#f7f7f7' }
              }}
            >
              <TopTab.Screen name="Sắp tới" component={UpComingTripScreen} />
              <TopTab.Screen name="Hoàn tất" component={CompletedTripsScreen} />
              <TopTab.Screen name="Đã hủy" component={CanceledTripsScreen} />
            </TopTab.Navigator>
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
