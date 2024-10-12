import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { color } from "react-native-elements/dist/helpers";
import { findEmail, signUp } from "../handleAPI/viewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";

function SignUp({ navigation }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [pwdConfirm, setPwdConfirm] = useState(null);
    const [ms, setMS] = useState('');


    const [isValid, setIsValid] = useState(true);
    const [isExisted, setIsExisted] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(text));
    };

    const checkPasswordMatch = (text) => {
        setPwdConfirm(text);
        setIsPasswordMatch(pwd === text);
    };

    const handleSignUp = async () => {
        try {
            validateEmail(email);
            checkPasswordMatch(pwdConfirm)
            if (name && email && phone && pwd && pwdConfirm && isValid && isPasswordMatch) {
                handleSignUpSuccessfully(name, email, phone);

            } else {
                alert('Vui lòng điền đầy đủ thông tin và sửa lỗi trước khi đăng ký.');
            }
        } catch (error) {

            console.log(error);

        }


    }

    const handleSignUpSuccessfully = async (name, email, phone) => {
        try {
            const rs = await signUp(name, email, phone);

            const token = rs.data.token;
            const photo = rs.data.data.user.photo;

            AsyncStorage.setItem('userToken', token);
            AsyncStorage.setItem('userPhoto', photo);
            AsyncStorage.setItem('userName', name);

            const response = await createUserWithEmailAndPassword(auth, email, pwd);

            // Set user data in Firestore
            await setDoc(doc(db, 'users', response.user.uid), {
                email,
                profileUrl: 'default.jpg',
                userId: response.user.uid,
                name: name,
            });

            navigation.navigate('Main');
        } catch (error) {
            console.log(error);
            if (error.status == '400') {
                setMS('Email đã tồn tại!')
                setIsExisted(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.signText}>Đăng ký</Text>

            <Text style={styles.txtStl}>Họ Tên</Text>
            <View style={styles.txtBox}>
                <TextInput
                    placeholder="Tên"
                    style={{ fontSize: 14, color: '#8f8e8e', width: 310, height: 46, textAlign: 'center' }}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <Text style={styles.txtStl}>SỐ ĐIỆN THOẠI</Text>
            <View style={styles.txtBox}>
                <TextInput
                    placeholder="00000-00000"
                    style={{ fontSize: 14, color: '#8f8e8e', width: 310, height: 46, textAlign: 'center' }}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
            </View>
            <Text style={styles.txtStl}>EMAIL</Text>
            <View style={styles.txtBox}>
                <TextInput
                    placeholder="hello@reallygreatsite.com"
                    style={{ fontSize: 14, color: '#8f8e8e', width: 310, height: 46, textAlign: 'center' }}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={validateEmail}
                />
            </View>
            {!isValid && (
                // <View style={styles.passwordConfirm}>
                <Text style={styles.errorText}>Email không đúng!</Text>
                // </View>
            )}
            {!isExisted && (
                // <View style={styles.passwordConfirm}>
                <Text style={styles.errorText}>{ms}</Text>
                // </View>
            )}
            <Text style={styles.txtStl}>MẬT KHẨU</Text>
            <View style={styles.txtBox}>
                <TextInput
                    placeholder="********"
                    secureTextEntry={true}
                    style={{ fontSize: 14, color: '#8f8e8e', width: 310, height: 46, textAlign: 'center' }}
                    value={pwd}
                    onChangeText={(text) => setPwd(text)}
                />
            </View>
            <Text style={styles.txtStl}>XÁC NHẬN MẬT KHẨU</Text>
            <View style={styles.txtBox}>
                <TextInput
                    placeholder="********"
                    secureTextEntry={true}
                    style={{ fontSize: 14, color: '#8f8e8e', width: 310, height: 46, textAlign: 'center' }}
                    value={pwdConfirm}
                    onChangeText={checkPasswordMatch}
                />
            </View>
            {!isPasswordMatch && (
                // <View style={styles.passwordConfirm}>
                <Text style={styles.errorText}>Mật khẩu không khớp!</Text>
                // </View>
            )}
            <TouchableOpacity style={styles.signBox} onPress={handleSignUp}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => navigation.navigate('SignIn')}>
                <Text style={{ color: '#8f8e8e' }}>Đã có tài khoản? Đăng nhập tại đây</Text>
            </TouchableOpacity>
        </View >
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
    errorText: {
        color: 'red'
    },
    signText: {
        fontSize: 36,
        color: '#6562df',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    txtBox: {
        width: 310,
        height: 46,
        backgroundColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    txtStl: {
        alignSelf: 'center',
        marginTop: 10,
        color: '#8f8e8e',
        fontSize: 15
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

})

export default SignUp