
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider, useDispatch, useSelector } from 'react-redux';

// import SignIn from '../screens/SignIn';
// import SignUp from '../screens/SignUp';
// import Register from '../screens/Register';
// import MainScreen from '../screens/MainScreen';
// import ImageScreen from '../screens/imageScreen';
// import EditProfile from '../screens/EditProfile';
// import FeedBackScreen from '../screens/FeedBackScreen';
// import HotelScreen from '../screens/hotelScreen';
// import UserProfile from '../screens/UserProfile';

// const AuthStack = createNativeStackNavigator();
// const AppStack = createNativeStackNavigator();

// const AuthStackNavigator = () => (
//   <AuthStack.Navigator
//     initialRouteName="SignIn"
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <AuthStack.Screen name="SignIn" component={SignIn} />
//     <AuthStack.Screen name="SignUp" component={SignUp} />
//     <AuthStack.Screen name="Register" component={Register} />
//   </AuthStack.Navigator>
// );

// const AppStackNavigator = () => (
//   <AppStack.Navigator
//     initialRouteName="Main"
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <AppStack.Screen name="Main" component={MainScreen} />
//     <AppStack.Screen name="Image" component={ImageScreen} />
//     <AppStack.Screen name="EditProfile" component={EditProfile} />
//     <AppStack.Screen name="FeedBack" component={FeedBackScreen} />
//     <AppStack.Screen name="Hotel" component={HotelScreen} />
//     <AppStack.Screen name="UserProfile" component={UserProfile} />
//   </AppStack.Navigator>
// );

// const RootNavigator = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const user = useSelector(state => state.auth.user);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
   
//       setIsLoading(false);
//     };
//     checkLoginStatus();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {user ? <AppStackNavigator /> : <AuthStackNavigator />}
//     </NavigationContainer>
//   );
// };

// const AppNavigator = () => (
//   <Provider >
//     <RootNavigator />
//   </Provider>
// );

// export default AppNavigator;
