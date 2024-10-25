import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import color from "../assets/color.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState , useLayoutEffect} from "react";
import { getMe } from "../handleAPI/viewAPI";
import { Icon } from 'react-native-elements';

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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Icon
                    name="arrow-back" 
                    size={29}
                    color="#fff" 
                    style={{ marginLeft: 5 }} 
                    onPress={() => navigation.goBack()} 
                />
            ),
            headerStyle: {
                backgroundColor: color.background_dark, 
            },
            headerTintColor: 'white',
        });
    }, [navigation]);
    
    useEffect(() => {
        fetchUser();

    }, [])

   

    const handleSaveInf = async () => {
        console.log('save');
    }

    const Content = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color={color.title} />;
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
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize:"18" }}>SAVE</Text>
                    </TouchableOpacity>
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
 
    container: {
        flex: 1,
        backgroundColor: color.background_dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUser: {
        width: 100,
        borderRadius: 100,
        height: 100,
        borderWidth: 2,
        borderColor: color.tilte,
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
        color:"white"
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
        marginTop: 40,
        width: 150,
        height: 50,
        backgroundColor: color.tilte,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 10
    }
})
export default EditProfile;