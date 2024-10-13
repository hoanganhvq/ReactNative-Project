import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TurboModuleRegistry } from 'react-native';
import MainScreen from './MainScreen';


import MyTripScreen from './MyTrip';
import CartScreen from "./CartScreen";
import UserProfile from "./UserProfile";

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Top Tab Navigator
const TopTab = createMaterialTopTabNavigator();

// chuyến đi sắp tới
const UpcomingTripsScreen = () => (
  <View style={styles.centeredContainer}>
    <Icon name="globe" size={80} color="#999" />
    <Text style={styles.infoText}>Chào abc,</Text>
    <Text style={styles.infoText}>Quý khách không có đặt chỗ sắp tới nào.</Text>
    <Text style={styles.subText}>Lên kế hoạch cho chuyến đi tiếp theo.</Text>
  </View>
);

// hoàn tất
const CompletedTripsScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.infoText}>Chuyến đi đã hoàn tất</Text>
  </View>
);

//Đã hủy
const CanceledTripsScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.infoText}>Chuyến đi đã hủy</Text>
  </View>
);


// Search Screen
const SearchScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.homeText}>Search Screen</Text>
  </View>
);



export default function HomeScreen() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Trang chủ':
                iconName = 'home';
                break;
              case 'Chuyến đi của tôi':
                iconName = 'suitcase';
                break;
              case 'Xe đẩy hàng':
                iconName = 'shopping-cart';
                break;
              case 'Thêm':
                iconName = 'user';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5652f2',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, paddingBottom: 10, height: 60,  },
          tabBarLabelStyle: { fontSize: 11,           
            fontWeight: 'bold',
            textAlign: 'center', }
        })}
      >
        <Tab.Screen name="Trang chủ" component={MainScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Chuyến đi của tôi" component={MyTripScreen} />
        <Tab.Screen name="Xe đẩy hàng" component={CartScreen} />
        <Tab.Screen name="Thêm" component={UserProfile} />
        
      </Tab.Navigator>
  );
};