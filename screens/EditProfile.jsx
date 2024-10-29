import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import color from "../assets/color.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState , useLayoutEffect} from "react";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL , uploadBytes} from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage , auth} from '../config/firebase';

import { getMe } from "../handleAPI/viewAPI";
import { Icon } from 'react-native-elements';


function EditProfile({ navigation }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null);
    const currentUser = auth.currentUser;

    const fetchUser = async () => {
        setIsLoading(true);
        const currentUser = await auth.currentUser;
        try{
            if(!currentUser){
                console.log("No user is currently");
                return;
            }
    
            const userRef = doc(db,"users", currentUser.uid);
            const userDoc = await getDoc(userRef);
    
            if(userDoc.exists()){
                const data = userDoc.data();
                setUser(data);
                console.log("userA", user);
                setImage(data.profileUrl);
                console.log("Fetch ok");
            } else{
                setImage("default.jpg");
            }
    
        } catch (error) {
            console.error("Error fetching profile picture:", error);
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
                    onPress={() => navigation.navigate("UserProfile")} 
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


 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (result.canceled) {
            console.log("User canceled image selection.");
            return null; // Exit if user cancels selection
        } else if (result.assets && result.assets.length > 0) {
            console.log("Image selected successfully.");
            return result.assets[0]; // Return the selected image asset
        } else {
            console.log("Image selection failed.");
            return null; // Exit if there's no valid image asset
        }
    };
    
   
const uploadProfilePicture = async () => {
    try {
        const asset = await pickImage();
        if (!asset || !asset.uri) {
            console.error("No valid image selected for upload.");
            return; // Exit if no valid image was picked
        }

        const { uri } = asset;
        
            if (!currentUser) {
                console.error("No user is currently logged in.");
                return;
            }
            
            console.log("Current user:", currentUser);

        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}.jpg`);

        const response = await fetch(uri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", currentUser.uid), {
            profileUrl: downloadURL,
        });
        fetchUser();
        console.log("Profile picture uploaded successfully!");

    } catch (error) {
        console.error("Error uploading profile picture:", error);
    }
};

    const handleSaveInf = async () => {
        console.log('save');
    }

    const Content = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color={color.title} />;
        }

        if (!user) {
            return <Text>No user data available</Text>;
        }
        let birth = user.data?.yearOfBirth;
        if (!birth) birth = '';
        return (
            <>
                <View style={styles.avatarUser}>
                    <ImageBackground source={{
                        // uri: `https://github.com/JINO25/IMG/raw/master/user/${user.data.photo}`
                        uri:image
                    }} imageStyle={{ borderRadius: 50 }} style={styles.avatarImg}>
                        <TouchableOpacity style={{ width: 30, 
                            height: 30, 
                            position: "absolute",
                            bottom: 0, 
                            right: 0, 
                            backgroundColor: "blue", 
                            borderRadius: 100, 
                            justifyContent: "center", 
                            alignItems: "center" }} onPress={uploadProfilePicture}>
                            <Feather name="camera" size={18} color="white" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.txtShow}>Name</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={user.name} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>
                <Text style={styles.txtShow}>Email Adress</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={user.email} style={{ fontSize: 20, width: 300 }}></TextInput>
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