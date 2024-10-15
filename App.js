import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
// import RegisterScreen from './screens/Register';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import FeedBackScreen from './screens/FeedBackScreen';
import HotelScreen from './screens/hotelScreen';
import ImageScreen from './screens/imageScreen';
import BookingScreen from './screens/BookingScreen';
import EditProfile from './screens/EditProfile'
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import AppNavigation from './navigation/AppNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';
// import { RoleContext, ContextProvider } from './screens/ContextProvider';
const Stack = createNativeStackNavigator();
export default function App() {
  const [storedToken, setToken] = useState('');
  const [tokenFb, setTokenFireBase] = useState('');
  // const token = AsyncStorage.getItem('userToken')
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedTokenFb = await AsyncStorage.getItem('tokenFirebase')
      setToken(storedToken);
      setTokenFireBase(storedTokenFb);
    };

    checkToken();
  }, []);
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Main">
  //       <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="Hotel" component={HotelScreen} />

  //       {/* {storedToken ? ( */}
  //       <Stack.Screen name="ChatRoom" component={ChatScreen} />
  //       {/* ) : ( */}
  //       <Stack.Screen name="SignIn" component={SignInScreen} />
  //       {/* )} */}

  //       <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Rooms' }} />
  //       <Stack.Screen name="Searching" component={SearchScreen} options={{ title: 'Search' }} />
  //       <Stack.Screen name="UserProfile" component={UserPro} />
  //       <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="FeedBack" component={FeedBackScreen} />
  //       <Stack.Screen name="Image" component={ImageScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="Profile" component={EditProfile} options={{ title: 'Profile' }} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    <AppNavigator />
  )
}
