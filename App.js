import React from 'react';
import { StatusBar } from 'expo-status-bar';
import  MainScreen from './screens/MainScreen.js';
import RegisterScreen from './screens/Register.js';
import testScreen from './screens/test.js';
import SignInScreen from './screens/SignIn.jsx';
import SignUpScreen from './screens/SignUp.jsx';
import FeedBackScreen from './screens/FeedBackScreen.jsx';
import HotelScreen from './screens/hotelScreen.js';
import {hotelData} from './Data/hotelData.js';
const App = () => {
  return <HotelScreen/>;

};

export default App;
