import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
    
})

export default SignUp