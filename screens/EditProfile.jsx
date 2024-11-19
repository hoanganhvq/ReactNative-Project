import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator, Platform , Button, Alert} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import color from "../assets/color.json";
import React, { useEffect, useState , useLayoutEffect} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL , uploadBytes} from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage , auth} from '../config/firebase';

import { Icon } from 'react-native-elements';


function EditProfile({ navigation , route}) {
    const {user} = route.params;
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState(currentDate);
    const [showPicker, setShowPicker] = useState(false);

    const currentUser = auth.currentUser;


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
    

    const onChange = (event, selectedDate) => {
        const chosenDate = selectedDate || date;
        setShowPicker(true);
        setBirth(chosenDate);
        setShowPicker(false);
      };
    
      const showDatePicker = () => {
        setShowPicker(true);
      };


 
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
            return null; 
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
        console.log("Profile picture uploaded successfully!");
        Alert.alert("Cập nhật ảnh đại diện thành công");
        
    } catch (error) {
        console.error("Error uploading profile picture:", error);
    }
};

const handleSaveInf = async () => {
    if (!currentUser) {
        console.error("No user is currently logged in.");
        return;
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;

    if (Object.keys(updatedData).length === 0) {
        // Không có trường nào để cập nhật
        console.error("No valid data to update.");
        Alert.alert("Không có thông tin nào để thay đổi.");
        return;
    }

    try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, updatedData);
        console.log("User information updated successfully!");
        Alert.alert("Thay đổi thông tin thành công");
    } catch (error) {
        console.error("Error updating user information:", error);
    }
};


    return (
        <View style={styles.container}>
               <View style={styles.avatarUser}>
                    <ImageBackground source={{
                        uri: user.profileUrl
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
                    <TextInput 
                        placeholder={user.name} 
                        style={{ fontSize: 20, width: 300 }} 
                        value={name} 
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <Text style={styles.txtShow}>Email Adress</Text>
                <View style={styles.txtBox}>
                    <TextInput placeholder={user.email} style={{ fontSize: 20, width: 300 }} 
                    autoCapitalize = "none" 
                    value={email} 
                    onChangeText={(text)=>{setEmail(text)}}></TextInput>
                </View>
                <Text style={styles.txtShow}>Password</Text>
                <View style={styles.txtBox}>
                    <TextInput secureTextEntry={true} style={{ fontSize: 20, width: 300 }}></TextInput>
                </View>

                <Text style={styles.txtShow}>Date Of Birth</Text>
                <View style={styles.txtBox}>
                    <TextInput
                      placeholder={formattedCurrentDate}
                      value={birth.toLocaleDateString()}  
                      editable={false} 
                      onPressIn={showDatePicker} 
                     style={{ fontSize: 20, width: 300 }}></TextInput>

            <TouchableOpacity onPress={showDatePicker} />
                {showPicker && (
                    <DateTimePicker
                    value={birth}
                    mode="date" 
                    display="default"
                    onChange={onChange}
                />
                )}  
                </View>

                <View style={styles.saveBox}>
                    <TouchableOpacity style={{ width: 100, height: 35, alignItems: "center", justifyContent: "center" }} onPress={handleSaveInf} >
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize:"18" }}>SAVE</Text>
                    </TouchableOpacity>
                </View>

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