import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const avImg = require('./assets/avt.png');
function EditProfile({Navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.avatarUser}>
                <ImageBackground source={avImg} imageStyle={{borderRadius:50} } style={styles.avatarImg}>
                    <TouchableOpacity style={{width:30,height:30,position:"absolute",bottom:0,right:0,backgroundColor:"blue",borderRadius:100,justifyContent:"center",alignItems:"center"}}>
                    <Feather name="camera" size={18} color="white" />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <Text style={styles.txtShow}>Name</Text>
            <View style={styles.txtBox}>
                <TextInput placeholder="Shamim Hossain" style={{fontSize:20,width:300}}></TextInput>
            </View>
            <Text style={styles.txtShow}>Email Adress</Text>
            <View style={styles.txtBox}>
            <TextInput placeholder="youremail@gmail.com" style={{fontSize:20,width:300}}></TextInput>
            </View>
            <Text style={styles.txtShow}>Username</Text>
            <View style={styles.txtBox}>
            <TextInput placeholder="Shamim4552" style={{fontSize:20,width:300}}></TextInput>
            </View>
            <Text style={styles.txtShow}>Password</Text>
            <View style={styles.txtBox}>
            <TextInput secureTextEntry={true} style={{fontSize:20,width:300}}></TextInput>
            </View>
            <Text style={styles.txtShow}>Year Birth</Text>
            <View style={styles.txtBox}>
                <TextInput placeholder="1999" style={{ fontSize: 20, width: 300 }}></TextInput>
            </View>
            <View style={{flexDirection:"row",marginTop:40,alignItems:"center",columnGap:90}}>
                <Text style={{ fontSize: 12, fontWeight: 500 }}>Joined 04 March 2022</Text>
                <View style={styles.logoutBox}>
                    <TouchableOpacity style={{width:80,height:35,alignItems:"center",justifyContent:"center"}} >
                        <Text style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUser: {
        width: 100,
        borderRadius: 100,
        height: 100,
        borderWidth:2,
        borderColor: '#3362E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImg: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end" 
    },
    txtBox: {
        marginTop: 15,
        backgroundColor: "#f2f5fe",
        width: 350,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    txtShow: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '500',
        alignSelf: "flex-start",
        width: 300,
        marginLeft:30,
    },
    logoutBox: {
        width: 80,
        height:35,
        backgroundColor: "#f2f5fe",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    }
})
export default EditProfile;