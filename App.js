// import React, { useEffect, useState } from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from './screens/MainScreen';
// import SignInScreen from './screens/SignIn';
// import SignUpScreen from './screens/SignUp';
// import FeedBackScreen from './screens/FeedBackScreen';
// import HotelScreen from './screens/hotelScreen';
// import ImageScreen from './screens/imageScreen';
// import BookingScreen from './screens/BookingScreen';
// import EditProfile from './screens/EditProfile'
// import SearchScreen from './screens/SearchScreen';
// import AppNavigation from './navigation/AppNavigator'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { RoleContext, ContextProvider } from './screens/ContextProvider';
// const Stack = createNativeStackNavigator();
// export default function App() {
//   const [storedToken, setToken] = useState('');
//   // const token = AsyncStorage.getItem('userToken')
//   useEffect(() => {
//     const checkToken = async () => {
//       const storedToken = await AsyncStorage.getItem('userToken');
//       setToken(storedToken);
//     };

//     checkToken();
//   }, []);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Main">
//         <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Hotel" component={HotelScreen} />
//         <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Rooms' }} />
//         <Stack.Screen name="Searching" component={SearchScreen} options={{ title: 'Search' }} />
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="FeedBack" component={FeedBackScreen} />
//         <Stack.Screen name="Image" component={ImageScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Profile" component={EditProfile} options={{ title: 'Profile' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    return (
        <AppNavigator />
    );
}
