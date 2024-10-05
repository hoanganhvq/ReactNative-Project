import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
const avImg = require('./assets/avt.png');
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
function User({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.avatarUser}>
                <Image source={avImg} style={{resizeMode:'cover',width:"100%",height:"100%"}}></Image>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Shamim Hossain</Text>
            <Text style={{ color: 'gray', fontSize: 15 }}>@ShamimGraphics</Text>
            <TouchableOpacity style={styles.editBox} onPress={() => navigation.navigate('Edit')}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{marginTop: 15,height: 1,width:500,backgroundColor: '#ebeced'}}></View>
            <TouchableOpacity style={styles.funItem}>
            <View style={styles.iconBox}>
            <Ionicons name="settings-sharp" size={24} color="#7998D7" />
            </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                    Settings
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.funItem}>
            <View style={styles.iconBox}>
            <AntDesign name="minuscircle" size={23} color="#7998D7" />
            </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                    Billing Details
                </Text>
            </TouchableOpacity>
                {/* <TouchableOpacity style={styles.funItem}>
                <View style={styles.iconBox}>
                <Entypo name="wallet" size={24} color="#7998D7" />
                </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, alignSelf: 'center', color: "gray" }}>
                        User Management
                    </Text>
                </TouchableOpacity> */}
            <View style={{marginTop: 10,height: 1,width:500,backgroundColor: '#ebeced'}}></View>
        </View>
    )

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
        overflow: 'hidden',
    },
    editBox: {
        width: 135,
        height: 35,
        backgroundColor: '#3362E6',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    funItem: {
        width: 360,
        height: 50,
        alignItems: "center",
        marginTop: 10,
        flexDirection: 'row',
        borderColor: '#ebeced',
        borderRadius:5,
    }
}
);
export default User;