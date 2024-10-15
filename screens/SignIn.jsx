import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Alert } from "react-native";
import { useEffect, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { findEmail, login } from "../handleAPI/viewAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
function SignIn({ navigation }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [ms, setMS] = useState('');

    // useEffect(() =>{
    //     const clearAsync = async () => {
           
    //         try {
    //           await AsyncStorage.clear();
    //           console.log('AsyncStorage đã được xóa thành công.');
    //         } catch (error) {
    //           console.error('Lỗi khi xóa AsyncStorage:', error);
    //         }
    //       };
    //       if(AsyncStorage){
    //         clearAsync();
    //       } else{
    //         console.log("Đéo có data để clear");
    //       }
          
    // }
    // )
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(text));
    };


    const onHandleLogin = async () => {

        if (!email || !password) {
            return alert('Vui lòng nhập đầy đủ thông tin.');
        }

        try {
            let tokenUser;
            validateEmail(email);

            await findEmail(email);


            await signInWithEmailAndPassword(auth, email, password)
                .then((rs) => {
                    tokenUser = rs._tokenResponse.idToken;
                    console.log(tokenUser);

                    AsyncStorage.setItem('tokenFirebase', tokenUser);
                    handleLoginSuccessfully(email);
                })
                .catch((e) => {
                    setIsValid(false);
                    setMS('Email hoặc mật khẩu không đúng!');
                })
        } catch (error) {
            if (error.status == '404') {
                setMS('Email không tồn tại!')
                setIsValid(false);
            }
            if (Array.isArray(error)) {
                console.log(error);
            }

        }
    }

    const handleLoginSuccessfully = async (email) => {
        try {
            console.log(email);

            const res = await login(email);
            const token = res.data.token;
            const photo = res.data.data.user.photo;
            const name = res.data.data.user.name;

            // const role = res.data.data.user.role;
            AsyncStorage.setItem('userToken', token);
            AsyncStorage.setItem('userPhoto', photo);
            AsyncStorage.setItem('userName', name);
            navigation.navigate('HomeScreen');
            // AsyncStorage.setItem('userRole', role);
        } catch (error) {
            console.log(error.status);

            if (error.status == '404') {
                setIsFound(false)
            } else {
                setIsValid(false);
            }
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.loginText}>Đăng nhập</Text>
            <View style={[styles.userBox, { flexDirection: 'row' }]}>
                <Feather name="user" size={24} color="black" style={{ marginLeft: 5 }} />
                <TextInput
                    style={{ fontSize: 16, marginLeft: 10, width: 280, height: 40 }}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={validateEmail}
                />
            </View>
            <View style={[styles.userBox, { flexDirection: 'row' }]}>
                <Feather name="lock" size={24} color="black" style={{ marginLeft: 5 }} />
                <TextInput
                    style={{ fontSize: 16, marginLeft: 10, width: 280, height: 40 }}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            {!isValid && (
                // <View style={styles.passwordConfirm}>
                <Text style={styles.errorText}>{ms}</Text>
                // </View>
            )}
            <TouchableOpacity style={styles.signBox} onPress={onHandleLogin}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 12, }} onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ color: '#8f8e8e' }}>
                    Chưa có tài khoản! Đăng ký tại đây
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: 0
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    loginText: {
        fontSize: 36,
        color: '#6562df',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    signBox: {
        width: 310,
        height: 68,
        backgroundColor: '#6562df',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        borderRadius: 5,
    },
    userBox: {
        width: 310,
        height: 46,
        borderRadius: 5,
        backgroundColor: "#ececec",
        alignItems: 'center',
        marginTop: 30,
    }
}
)
export default SignIn