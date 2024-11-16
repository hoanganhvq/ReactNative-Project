<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
function SignUp({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.signText}>Đăng ký</Text>
            <TouchableOpacity style={{marginTop:20,alignItems:'center'}} onPress={()=>navigation.navigate('SignIn')}>
                <Text style={{color:'#8f8e8e'}}>Đã có tài khoản? Đăng nhập tại đây</Text>
            </TouchableOpacity>
            <Text style={styles.txtStl}>SỐ ĐIỆN THOẠI</Text>
            <View style={styles.txtBox}>
                <TextInput placeholder="00000-00000" style={{fontSize:14,color:'#8f8e8e',width:310,height:46,textAlign:'center'}}></TextInput>
            </View>
            <Text style={styles.txtStl}>EMAIL</Text>
            <View style={styles.txtBox}>
                <TextInput placeholder="hello@reallygreatsite.com" style={{fontSize:14,color:'#8f8e8e',width:310,height:46,textAlign:'center'}}></TextInput>
            </View>
            <Text style={styles.txtStl}>TÊN ĐĂNG NHẬP</Text>
            <View style={styles.txtBox}>
                <TextInput placeholder="cuongbeoquemientay" style={{fontSize:14,color:'#8f8e8e',width:310,height:46,textAlign:'center'}}></TextInput>
            </View>
            <Text style={styles.txtStl}>MẬT KHẨU</Text>
            <View style={styles.txtBox}>
                <TextInput secureTextEntry={true} style={{fontSize:14,color:'#8f8e8e',width:310,height:46,textAlign:'center'}}></TextInput>
            </View>
            <TouchableOpacity style={styles.signBox}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
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
    signBox:{
        width:310,
        height:68,
        backgroundColor:'#6562df',
        justifyContent:'center',
        alignItems:'center',
        marginTop:60,
        borderRadius:5,
    },
    
=======
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
  } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { findEmail, signUp } from "../handleAPI/viewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import color from "../assets/color.json";


const bg = require("../assets/background.png");
const height = Dimensions.get("screen").height;
const logo = require("../assets/LogoDark.jpg");
function SignUp({ navigation }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [ms, setMS] = useState('');
    const defaultProfilePicture = 'https://firebasestorage.googleapis.com/v0/b/chatapptest-f62b3.appspot.com/o/profile_pictures%2Fdefault.jpg?alt=media&token=621685c1-45ef-4b24-9146-39095f018e33';

    const [isValid, setIsValid] = useState(true);
    const [isExisted, setIsExisted] = useState(true);

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(text));
    };


    const handleSignUp = async () => {
        try {
            validateEmail(email);
            if (name && email && phone && pwd && isValid) {
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

            await setDoc(doc(db, 'users', response.user.uid), {
                email,
                profileUrl: defaultProfilePicture,
                userId: response.user.uid,
                name: name,
            });
            console.log("SignUp Successfully");
            navigation.navigate('SignIn');
        } catch (error) {
            console.log(error);
            if (error.status == '400') {
                setMS('Email đã tồn tại!')
                setIsExisted(false);
            }
        }
    }

    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ImageBackground
        source={bg}
        style={{ width: "100%", height, alignItems: "center" }}
      >
        <Animated.Image source={logo} style={styles.logo}
          entering={FadeInDown.delay(200).duration(2000).springify()}
        />
        <Animated.View
          entering={FadeInDown.delay(200).duration(2000).springify()}
          style={{ marginTop: 225 }}
        >
          <Text style={styles.signText}>Đăng ký</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(500).duration(1000).springify()}
          style={[styles.txtBox, { position: "absolute", bottom: 380 }]}
        >
          <TextInput placeholder="Họ và Tên" style={styles.input}
          value={name}
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).duration(1000).springify()}
          style={[styles.txtBox, { position: "absolute", bottom: 314 }]}
        >
          <TextInput placeholder="Số điện thoại" style={styles.input} 
             keyboardType="phone-pad"
             value={phone}
              onChangeText={(text) => setPhone(text)}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={[styles.txtBox, { position: "absolute", bottom: 247 }]}
        >
          <TextInput placeholder="Email" style={styles.input} 
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={validateEmail}
          />
        </Animated.View>
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

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={[styles.txtBox, { position: "absolute", bottom: 180 }]}
        >
          <TextInput
            secureTextEntry={true}
            placeholder="Mật khẩu"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            style={styles.input}
          />
        </Animated.View>
        
       
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
              onPress={handleSignUp}
            >
              <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold"}}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </Animated.View>

        <Animated.View
          style={styles.footer}
          entering={FadeInDown.delay(800).duration(1000).springify()}
        >
          <Text style={{fontSize:18}}>Đã có tài khoản? Đăng nhập</Text>
          <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
            <Text style={styles.linkText}>tại đây</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: 0
    },
   
    errorText: {
        color: 'red'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      },
      signText: {
        fontSize: 44,
        color: "#fff",
        fontWeight: "bold",
      },
      txtBox: {
        width: 250,
        height: 46,
        backgroundColor: "#ececec",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      input: {
        fontSize: 18,
        color: "#8f8e8e",
        width: 300,
        height: 46,
        textAlign: "center",
      },
      signBox: {
        width: 300,
        height: 65,
        backgroundColor: color.background_dark,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 97,
      },
      signButtonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
      },
      footer: {
        position: "absolute",
        bottom: 62,
        flexDirection: "row",
        columnGap: 5,
      },
      linkText: {
        color: "white",
        fontSize:18
      },
      logo: {
        width: 200,
        height: 200,
        position: "absolute",
        top: 60,
        resizeMode: "contain",
      }

>>>>>>> demoProduct
})

export default SignUp