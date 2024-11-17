
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
import ChatList from '../screens/ChatListScreen';
import Searching from '../screens/SearchScreen';
import MyTour from '../screens/MyTour';
import BookingDetails from '../screens/BDetailScreen';
import VoucherScreen from '../screens/VoucherScreen';
import color from '../assets/color.json';
import { ManagementScreen } from '../screens/managementScreen';
import { AdminScreen } from '../screens/AdminScreen';
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
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="ManagementScreen" component={ManagementScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Chat" component={Chat} options={{
            headerShown: true, headerStyle: { backgroundColor: color.background_dark, },
            headerTitleStyle: {
                color: "white",
                fontSize: 25
            },
        }}
        />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfile} options={{
            headerShown: true, headerStyle: { backgroundColor: color.background_dark, },
            headerTitleStyle: {
                color: "white",
                fontSize: 20
            },
        }} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} options={
            {
                title: 'Nhận xét',
                headerShown: true,
                headerStyle: { backgroundColor: color.item_background_dark },
                headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
                headerTintColor: color.tilte,
                headerBackVisible: false
            }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{
            headerShown: false,
            headerStyle: { backgroundColor: color.background_dark },
            headerTitleStyle: {
                color: "white",
                fontSize: 20
            },
            headerLeft: () => null, // Không hiển thị gì
        }} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Searching" component={Searching} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MyTour" component={MyTour} options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerBackTitle: { color: "white" },
            headerTitle: "Chi tiết",
            headerStyle: { backgroundColor: '#2c2c2c' },
            headerTitleStyle: { color: '#fff' },
        }} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} options={
            {
                title: 'Thanh toán',
                headerShown: true,
                headerStyle: { backgroundColor: color.item_background_dark },
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
                headerTintColor: "white",
                headerBackVisible: false
            }} />
        <Stack.Screen name="VoucherScreen" component={VoucherScreen} options={
            {
                headerTitle: 'Chọn voucher',
                headerBackTitle: '',
                headerShown: true,
                headerStyle: { backgroundColor: color.item_background_dark },
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
                headerTintColor: color.tilte,
            }} />
    </Stack.Navigator>
);

const AuthStackNavigator = () => (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackScreen} options={
            {
                title: 'Nhận xét',
                headerShown: true,
                headerStyle: { backgroundColor: color.item_background_dark },
                headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
                headerTintColor: color.tilte,
                headerBackVisible: false
            }} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Searching" component={Searching} />
        <Stack.Screen name="ChatRoom" component={Chat} />
    </Stack.Navigator>
);


const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    useEffect(() => {
        // fetchRole();

        // const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
        //     authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        //     setLoading(false);
        // });

        // return () => unsubscribe();

        const fetchData = async () => {
            const role = await AsyncStorage.getItem("userRole");
            setRole(role);

            const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                setLoading(false);
            });

            return () => unsubscribe();
        };

        fetchData();
    }, [setUser]);

    console.log("role:", role);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>
        );
    } else {
        // console.log("user", user);

        return (
            <NavigationContainer>
                {user ? <AppStackNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
        );
    }

};

const AppNavigator = () => (
    <AuthenticatedUserContextProvider>
        <RootNavigator />
    </AuthenticatedUserContextProvider>
);
export default AppNavigator;