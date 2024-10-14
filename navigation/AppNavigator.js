
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

import Booking from "../screens/BookingScreen"
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainScreen from '../screens/MainScreen';
import ImageScreen from '../screens/imageScreen';
import EditProfile from '../screens/EditProfile';
import FeedBackScreen from '../screens/FeedBackScreen';
import HotelScreen from '../screens/hotelScreen';
import UserProfile from '../screens/UserProfile';
import HomeScreen from '../screens/HomeScreen';
import Searching from '../screens/SearchScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({AsyncStorage: null});

const AuthenticatedUserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

const AppStackNavigator = () => (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Searching" component={Searching} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
);

const AuthStackNavigator = () => (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Searching" component={Searching} />
    </Stack.Navigator>
);

const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

const AppNavigator = () => (
    <AuthenticatedUserContextProvider>
        <RootNavigator />
    </AuthenticatedUserContextProvider>
);

export default AppNavigator;