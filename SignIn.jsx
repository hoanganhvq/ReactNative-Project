import { View,Text,StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
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
            <TouchableOpacity style={styles.signBox}>
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
