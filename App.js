import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './navigation/AppNavigator';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <AppNavigator />
  )
}
