import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/Register';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import RatingScreen from './screens/FeedBackScreen';
import HotelScreen from './screens/hotelScreen';
import ImageScreen from './screens/imageScreen';
import BookingScreen from './screens/BookingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}