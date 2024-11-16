<<<<<<< HEAD
import { View,Text,StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
function SignIn({navigation}) {
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <Text style={styles.loginText}>Đăng nhập</Text>
            <View style={[styles.userBox,{flexDirection:'row'}]}>
                <Feather name="user" size={24} color="black" style={{marginLeft:5}} />
                <TextInput placeholder="Username" style={{fontSize:16, marginLeft: 10, width: 280, height: 40}}/>
            </View>
            <View style={[styles.userBox,{flexDirection:'row'}]}>
                <Feather name="lock" size={24} color="black" style={{ marginLeft: 5 }} />
                <TextInput placeholder="Password" secureTextEntry={true} style={{ fontSize: 16, marginLeft: 10, width: 280, height: 40 }} />
            </View>
            <TouchableOpacity style={styles.signBox} onPress={()=>navigation.navigate('Main')}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:12,}} onPress={()=>navigation.navigate('SignUp')}>
                <Text style={{ color: '#8f8e8e' }}>
                        Chưa có tài khoản đăng ký tại đây
                    </Text>
            </TouchableOpacity>
            </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    loginText: {
        fontSize: 36,
        color:'#6562df',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    signBox:{
        width:310,
        height:68,
        backgroundColor:'#6562df',
        justifyContent:'center',
        alignItems:'center',
        marginTop:60,
        borderRadius:5,
    },
    userBox: {
=======
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView ,ImageBackground, Pressable, Dimensions, Platform, Alert} from "react-native";
import { useEffect, useState } from "react";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from "expo-status-bar";

import { findEmail, login } from "../handleAPI/viewAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import color from "../assets/color.json";

const bg = require("../assets/background.png");
const height = Dimensions.get("screen").height;
const logo = require("../assets/LogoDark.jpg");

function SignIn({ navigation }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [ms, setMS] = useState('');


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
            console.log( error);
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
     
        <KeyboardAvoidingView style={styles.container } behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <StatusBar style="light" />
        <ImageBackground
          source={bg}
          style={{ width: "100%", height, alignItems: "center" }}
        >
          <Animated.Image
            source={logo}
            style={styles.logo}
            entering={FadeInDown.delay(200).duration(2000).springify()}
          ></Animated.Image>
          <Animated.View
            entering={FadeInDown.delay(200).duration(2000).springify()}
            style={{ marginTop: 225 }}
          >
            <Text style={styles.loginText}>Đăng nhập</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(2000).springify()}
            style={[styles.conBox, { flexDirection: "row", bottom: 330 }]}
          >
            <Feather
              name="user"
              size={24}
              color="#706e69"
              style={{ marginLeft: 5 }}
            />
            <TextInput style={styles.txtBox} 
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={false}
                value={email}
                onChangeText={validateEmail}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(300).duration(1000).springify()}
            style={[styles.conBox, { flexDirection: "row", bottom: 260 }]}
          >
            <Feather
              name="lock"
              size={24}
              color="#706e69"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              placeholder="Mật khẩu"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
               onChangeText={(text) => setPassword(text)}
              style={{ fontSize: 16, marginLeft: 10, width: 280, height: 40 }}
            />
          </Animated.View>

          {!isValid && (
                <Text style={styles.errorText}>{ms}</Text>
            )}

          <Animated.View
            style={styles.signBox}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            <TouchableOpacity
              style={{
                width: 310,
                height: 68,
                justifyContent: "center",
                alignItems: "center",

              }}
              onPress={onHandleLogin}
            >
              <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold"}}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 125,
              flexDirection: "row",
              columnGap: 5,
      
            }}
            entering={FadeInDown.delay(500).duration(1000).springify()}
          >
            <Text style={{fontSize:18 }}>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "white" , fontSize:18}}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
      </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop:160,
        fontWeight:"bold"
    },

    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      },
      loginText: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "bold",
      },
      signBox: {
        width: 310,
        height: 65,
        backgroundColor: color.background_dark,
        position: "absolute",
        borderRadius: 50,
        bottom: 157,
      },
      conBox: {
>>>>>>> demoProduct
        width: 310,
        height: 46,
        borderRadius: 5,
        backgroundColor: "#ececec",
<<<<<<< HEAD
        alignItems: 'center',
        marginTop: 30,
    }
}
)
export default SignIn
=======
        alignItems: "center",
        position: "absolute",
        marginTop: 20,
      },
      txtBox: {
        fontSize: 18,
        marginLeft: 10,
        width: 280,
        height: 40,
        fontWeight: "400",
      },
      logo: {
        width: 200,
        height: 200,
        position: "absolute",
        top: 40,
        resizeMode: "contain",
      },
}
)
export default SignIn
>>>>>>> demoProduct
