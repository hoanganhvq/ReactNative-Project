import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, query, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getRoomId } from '../utils/getId';

const ChatListDetails = ({ item }) => {
    const [message, setMessages] = useState("");
    const navigation = useNavigation();
    const hotelierId = item;

    const onHandleRouter = () => {

        navigation.navigate("Chat", {
            hotelierId
        })

    };


    useEffect(() => {
        const user = auth.currentUser;
        let userId = item.userId;
        let roomId = getRoomId(user?.uid, userId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => ({
                ...doc.data()
            }));
            if (messages.length > 0) {
                setMessages(messages[0].text);
            }
        }, (error) => {
            console.error("Error fetching messages:", error);
        });

        return () => unsubscribe();

    }, [item.userId]);

    return (
        <>
            <TouchableOpacity onPress={onHandleRouter} style={styles.touchableOpacity}>
                <Image
                    source={{
                        uri: item?.profileUrl,
                    }}
                    style={styles.image}
                />
                <View style={styles.viewContainer}>
                    <View style={styles.viewRow}>
                        <Text style={styles.textName}>{item?.name}</Text>
                        <Text style={styles.textTime}>Time</Text>
                    </View>
                    <Text style={styles.textMessage}>{message}</Text>
                </View>
            </TouchableOpacity>

        </>
    )
}

export default ChatListDetails

const styles = StyleSheet.create({
    touchableOpacity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16, // mx-4
        alignItems: 'center',
        gap: 12, // gap-3
        marginBottom: 16, // mb-4
        paddingBottom: 8, // pb-2
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20, // rounded-full (makes it circular)
    },
    viewContainer: {
        flex: 1,
        gap: 4, // gap-1
    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textName: {
        fontSize: 18,
        fontWeight: '600', // font-semibold
        color: '#2C2C2C', // text-neutral-800
    },
    textTime: {
        fontSize: 16,
        fontWeight: '500', // font-medium
        color: '#6B7280', // text-neutral-500
    },
    textMessage: {
        fontSize: 16,
        fontWeight: '500', // font-medium
        color: '#6B7280', // text-neutral-500
    },
});