
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
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
import Chat from '../screens/ChatScreen';
import Searching from '../screens/SearchScreen';
import MyTrip from '../screens/MyTrip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({ AsyncStorage: null });

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
        <Stack.Screen name="ChatRoom" component={Chat} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Searching" component={Searching} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MyTrip" component={MyTrip} options={{ headerShown: true }} />
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
    const [storedToken, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const token = AsyncStorage.getItem('userToken')
    useEffect(() => {
        const checkToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{
                    marginTop: 10,
                    fontSize: 16,
                    color: '#000',
                }}>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {storedToken ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

const AppNavigator = () => (

    <AuthenticatedUserContextProvider>
        <RootNavigator />
    </AuthenticatedUserContextProvider>
);

export default AppNavigator;