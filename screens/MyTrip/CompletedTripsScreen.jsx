import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CompletedTripsScreen = () => {
    return (
        <View style={styles.centeredContainer}>
            <Text style={styles.homeText}>CompletedTripScreen </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CompletedTripsScreen;  // Ensure this is a default export
