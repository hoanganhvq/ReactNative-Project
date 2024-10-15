import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import avImg from '../assets/avt.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getMe } from "../handleAPI/viewAPI";

function EditProfile({ navigation }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const rs = await getMe(token);
            setUser(rs.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();

    }, [])

    const handleLogOut = async () => {
        await AsyncStorage.multiRemove(['userToken', 'userPhoto', 'user', 'userName', 'tokenFirebase']);
        navigation.navigate('Main');
    }

    const handleSaveInf = async () => {
        console.log('save');

    }

    const Content = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (!user || !user.data) {
            return <Text>No user data available</Text>;
        }
        let birth = user.data?.yearOfBirth;
        if (!birth) birth = '';
        return (
            <>
                <View style={styles.avatarUser}>
                    <ImageBackground source={{
                        uri: `https://github.com/JINO25/IMG/raw/master/user/${user.data.photo}`
                    }} imageStyle={{ borderRadius: 50 }} style={styles.avatarImg}>
                        <TouchableOpacity style={{ width: 30, height: 30, position: "absolute", bottom: 0, right: 0, backgroundColor: "blue", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                            <Feather name="camera" size={18} color="white" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.txtShow}>Name</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={user.data.name} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>
                <Text style={styles.txtShow}>Email Adress</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={user.data.email} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>
                <Text style={styles.txtShow}>Password</Text>
                <View style={styles.txtBox}>
                    <TextInput secureTextEntry={true} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>
                <Text style={styles.txtShow}>Year Birth</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={birth.toString()} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>

                <View style={styles.saveBox}>
                    <TouchableOpacity style={{ width: 100, height: 35, alignItems: "center", justifyContent: "center" }} onPress={handleSaveInf} >
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center", columnGap: 90 }}>
                    <Text style={{ fontSize: 12, fontWeight: 500 }}>Joined 04 March 2022</Text>
                    <View style={styles.logoutBox}>
                        <TouchableOpacity style={{ width: 80, height: 35, alignItems: "center", justifyContent: "center" }} onPress={handleLogOut} >
                            <Text style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <Content />
        </View>
    );
}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
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
        borderWidth: 2,
        borderColor: '#3362E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImg: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    txtBox: {
        marginTop: 15,
        backgroundColor: "#f2f5fe",
        width: 350,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    txtShow: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '500',
        alignSelf: "flex-start",
        width: 300,
        marginLeft: 30,
    },
    logoutBox: {
        width: 80,
        height: 35,
        backgroundColor: "#f2f5fe",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    saveBox: {
        marginTop: 10,
        width: 100,
        height: 35,
        backgroundColor: "#4da6ff",
        justifyContent: "flex-start",
        // alignItems: "center",
        borderRadius: 10
    }
})
export default EditProfile;