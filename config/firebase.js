import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.apiKey,
    authDomain: Constants.expoConfig.extra.authDomain,
    projectId: Constants.expoConfig.extra.projectId,
    storageBucket: Constants.expoConfig.extra.storageBucket,
    messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
    appId: Constants.expoConfig.extra.appId,
    measurementId: Constants.expoConfig.extra.measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const authen = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });
export const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');