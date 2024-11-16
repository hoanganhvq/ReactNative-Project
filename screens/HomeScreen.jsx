import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainScreen from './MainScreen';
import color from "../assets/color.json";

import MyTour from "./MyTour";
import UserProfile from "./UserProfile";

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
              case 'Chuyến đi':
                iconName = 'plane';
                break;
              case 'Thêm':
                iconName = 'user';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: color.tilte,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: color.background_dark,  paddingBottom: 10, height: 70 },
          tabBarLabelStyle: { fontSize: 11,           
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom:10}
        })}
      >
        <Tab.Screen name="Trang chủ" component={MainScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Chuyến đi" component={MyTour} options={{headerShown: true, headerStyle: {backgroundColor: color.background_dark,},
                    headerTitleStyle: {
                        color: "white",
                        fontSize:20 
                    },
                }}/>
        <Tab.Screen name="Thêm" component={UserProfile} options={{ headerShown: false}}  />
        
      </Tab.Navigator>
  );
};