import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CartScreen = () => {
    return (
        <View style={styles.centeredContainer}>
            <Text style={styles.homeText}>Cart Screen</Text>
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

export default CartScreen;  // Ensure this is a default export
