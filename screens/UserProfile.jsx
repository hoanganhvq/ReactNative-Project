import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import avImg from '../assets/avt.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMe } from "../handleAPI/viewAPI";


function User({navigation}) {
    const [user, setUser] = useState(null);1
    const [isLoading, setIsLoading] = useState(true);
    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const rs = await getMe(token);
            setUser(rs.data);
            console.log(rs.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setIsLoading(false);

        }
        
    }

    useEffect(() => {
        fetchUser();
    }, [])

         
    const Content =() =>{
        if(isLoading){
            return <ActivityIndicator size="large" color="#0000ff" />;
        } 
        if(!user || !user.data){
            return <Text>No user data available</Text>
        }
        return (
            /**
             * Set the loading state to false to hide the loading indicator
             */
        <View style={styles.container}>
            <View style={styles.avatarUser}>
                 <Image source={{ uri: `https://github.com/JINO25/IMG/raw/master/user/${user.data.photo}` }} style={{resizeMode:'cover',width:"100%",height:"100%"}}></Image>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{user.data.name}</Text>
            <Text style={{ color: 'gray', fontSize: 15 }}>{user.data.email}</Text>
            <TouchableOpacity style={styles.editBox} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{marginTop: 15,height: 1,width:500,backgroundColor: '#ebeced'}}></View>
            <TouchableOpacity style={styles.funItem}  onPress={()=>navigation.navigate('MyTrip')}>
            <View style={styles.iconBox}>
            <Ionicons name="airplane-outline" size={24} color="#7998D7" />
            </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                    My Trip
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.funItem}>
            <View style={styles.iconBox}>
            <AntDesign name="minuscircle" size={23} color="#7998D7" />
            </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                    Billing Details
                </Text>
            </TouchableOpacity>
                {/* <TouchableOpacity style={styles.funItem}>
                <View style={styles.iconBox}>
                <Entypo name="wallet" size={24} color="#7998D7" />
                </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                        User Management
                    </Text>
                </TouchableOpacity> */}
            <View style={{marginTop: 10,height: 1,width:500,backgroundColor: '#ebeced'}}></View>
        </View>
    )
    }

    return(
        <View style={styles.container}>
            <Content />
         </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUser: {
        width: 100,
        borderRadius: 100,
        height: 100,
        borderWidth:2,
        borderColor: '#3362E6',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    editBox: {
        width: 135,
        height: 35,
        backgroundColor: '#3362E6',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    funItem: {
        width: 360,
        height: 50,
        alignItems: "center",
        marginTop: 10,
        flexDirection: 'row',
        borderColor: '#ebeced',
        borderRadius:5,
    }
}
);
export default User;