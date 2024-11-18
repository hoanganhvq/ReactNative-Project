import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainScreen from './MainScreen';
import color from "../assets/color.json";
import { AdminScreen } from './AdminScreen';
import MyTour from "./MyTour";
import UserProfile from "./UserProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [role, setRole] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchRole = async () => {
        const storedRole = await AsyncStorage.getItem("userRole");
        setRole(storedRole);
      };

      fetchRole();
    }, []) // Dependency array
  );

  if (!role) {
    return <LoadingScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Trang chủ':
              iconName = 'home';
              break;
            case 'Chuyến đi':
              iconName = 'plane';
              break;
            case 'Thêm':
              iconName = 'user';
              break;
            case 'Admin':
              iconName = 'user';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: color.tilte,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: color.background_dark, paddingBottom: 10, height: 70 },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingBottom: 10
        }
      })}
    >
      <Tab.Screen name="Trang chủ" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chuyến đi" component={MyTour} options={{
        headerShown: true, headerStyle: { backgroundColor: color.background_dark },
        headerTitleStyle: {
          color: "white",
          fontSize: 20
        },
      }} />
      <Tab.Screen name="Thêm" component={UserProfile} options={{ headerShown: false }} />
      {role === 'hotelier' && (
        <Tab.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
      )}
    </Tab.Navigator>
  );
};
