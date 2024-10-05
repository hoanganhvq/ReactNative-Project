import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/Register';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import FeedBackScreen from './screens/FeedBackScreen';
import HotelScreen from './screens/hotelScreen';
import ImageScreen from './screens/imageScreen';
import BookingScreen from './screens/BookingScreen';
import AppNavigation from './navigation/AppNavigator'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="Image" component={ImageScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
   
  );


}