import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const UpComingTripScreen = () => {
    return (
        <View style={styles.centeredContainer}>
            <Icon name="globe" size={80} color="#999" />
            <Text style={styles.infoText}>Chào abc,</Text>
            <Text style={styles.infoText}>Quý khách không có đặt chỗ sắp tới nào.</Text>
            <Text style={styles.subText}>Lên kế hoạch cho chuyến đi tiếp theo.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    subText: {
        fontSize: 14,
        color: '#666',
    },
});

export default UpComingTripScreen;
