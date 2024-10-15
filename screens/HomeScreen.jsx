import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TurboModuleRegistry } from 'react-native';
import MainScreen from './MainScreen';


import CartScreen from "./CartScreen";
import UserProfile from "./UserProfile";

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="Xe đẩy hàng" component={CartScreen} />
        <Tab.Screen name="Thêm" component={UserProfile} />
        
      </Tab.Navigator>
  );
};