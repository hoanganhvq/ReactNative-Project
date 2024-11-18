import { StyleSheet, TouchableOpacity, View, Text, Image, FlatList, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, query, getDocs, orderBy, onSnapshot, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getRoomId } from '../utils/getId';
import ChatListDetails from './ChatListDetail';

const ChatItem = () => {
    const [message, setMessages] = useState("");
    const [users, setUsers] = useState([]);
    const user = auth.currentUser;

    const getUsers = async () => {
        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where('userId', '!=', user?.uid));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data() });

            })

            setUsers(data);

        } catch (error) {

        }
    }

    useEffect(() => {
        if (user?.uid) {
            getUsers();
        }
    }, []);


    return (
        <>
            <SafeAreaView>
                <ScrollView>

                    <View className={styles.container}>
                        <FlatList
                            data={users}
                            contentContainerStyle={styles.content}
                            keyExtractor={(item) => item.userId}
                            showsVerticalScrollIndicator={false}
                            renderItem={(
                                { item, index }) => <ChatListDetails
                                    item={item}
                                    index={index} />
                            }
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        paddingVertical: 25
    }
})