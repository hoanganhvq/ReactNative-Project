import React, { useState, useLayoutEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getRoomId } from '../utils/getId'
import { ActivityIndicator, Text, View } from 'react-native';

export default function Chat({ route }) {
    const { hotelierId } = route.params;
    const user = auth.currentUser;
    const [tokenFireBase, setTokenFireBase] = useState(null);
    // console.log('hotel:', hotelierId.userId);


    const createRoomIfNotExist = async () => {
        let roomId = getRoomId(user?.uid, hotelierId.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createAt: Timestamp.fromDate(new Date())
        });
    };

    const [messages, setMessages] = useState([]);

    const fetchTokenFireBase = async () => {
        const token = await AsyncStorage.getItem('tokenFirebase');
        setTokenFireBase(token);
    };

    useLayoutEffect(() => {
        fetchTokenFireBase();
        createRoomIfNotExist();
        let roomId = getRoomId(user?.uid, hotelierId.userId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");

        const q = query(messageRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: {
                        _id: doc.data().userId,
                        avatar: hotelierId.profileUrl
                    }
                }))
            );
        });

        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { createdAt, text } = messages[0];
        let roomId = getRoomId(user?.uid, hotelierId.userId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");

        addDoc(messageRef, {
            createdAt,
            text,
            userId: user?.uid
        });
    }, []);

    const Content = () => {
        if (!user) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: '#000',
                    }}>Loading...</Text>
                </View>
            );
        }

        return (
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                messagesContainerStyle={{
                    backgroundColor: '#fff'
                }}
                textInputStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                }}
                user={{
                    _id: user?.uid,
                }}
            />
        )
    }

    return (
        <Content />
    );
}