import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, Modal} from "react-native";
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage , auth} from '../config/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../assets/color.json";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

function User({navigation}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const clearAsync = async () => {
           
        try {
          await AsyncStorage.clear();
          console.log('AsyncStorage đã được xóa thành công.');
        } catch (error) {
          console.error('Lỗi khi xóa AsyncStorage:', error);
        }
      };

      const handleLogOut = async () => {
        await AsyncStorage.multiRemove(['userToken', 'userPhoto', 'user', 'userName', 'tokenFirebase']);
        clearAsync();
        navigation.navigate('Main');
    }

    useFocusEffect(
        React.useCallback(() => {
                fetchUser();
        }, [])
    );


    const handleConfirmLogout = () => {
      setModalVisible(false);
      handleLogOut(); // Gọi hàm đăng xuất khi người dùng xác nhận
    };
    
         
    const Content =() =>{
        if(isLoading){
            return <ActivityIndicator size="large" color={color.tilte} />;
        } 
        if(!user){
            return <Text>No user data available</Text>
        }
        return (
       
        <SafeAreaView style={styles.container}>

             
            <View style={styles.avatarUser}>
                 <Image source={{ uri: image}} style={{resizeMode:'cover',width:"100%",height:"100%"}}></Image>
            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color:"white"}}>{user.name}</Text>
            <Text style={{ color: 'white', fontSize: 15 , marginTop:10}}>{user.email}</Text>
           

            <View style={{marginTop: 25,height: 1,width:330,backgroundColor: '#555'}}></View>

            <TouchableOpacity style={styles.funItem}  onPress={()=>navigation.navigate('Edit Profile', {user: user})}>
            <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={24} color={color.tilte} />
            </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "white" }}>
                    Edit Profile 
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.funItem}  onPress={()=>navigation.navigate('MyTour')}>
            <View style={styles.iconBox}>
            <Ionicons name="airplane-outline" size={24} color={color.tilte} />
            </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "white"  }}>
                    My Trip
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.funItem} >
            <View style={styles.iconBox}>
            <Ionicons name="information-circle-outline" size={28} color={color.tilte} />
            </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "white" }}>
                    Help Center
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.funItem} onPress={() => setModalVisible(true)}>
            <View style={styles.iconBox}>
            <Ionicons name="log-out-outline" size={28} color="red" />
            </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "red" }}>
                    Log out
                </Text>
            </TouchableOpacity>

         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
          
        </SafeAreaView>
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
        backgroundColor: color.background_dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUser: {
        width: 100,
        borderRadius: 100,
        height: 100,
        borderWidth:2,
        borderColor: color.tilte,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    editBox: {
        width: 150,
        height: 40,
        backgroundColor: color.tilte,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    iconBox: {
        width: 40,
        height: 40,
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
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor:color.background_dark,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color:color.tilte,
        fontWeight:"bold"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: color.item_background_dark,
    },
    confirmButton: {
        backgroundColor: '#f00',
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight:"bold"
    },
}
);
export default User;