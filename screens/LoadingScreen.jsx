import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import color from '../assets/color.json';

export default function LoadingScreen() {
    const LogoDark = require('../assets/LogoDark.jpg');
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <Image
                source={LogoDark}
                style={styles.loadingImage}
                resizeMode="contain"
            />
            <ActivityIndicator size="large" color={color.tilte} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        paddingBottom: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:color.background_dark
    },

});
