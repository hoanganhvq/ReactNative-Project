import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button ,TouchableWithoutFeedback, Platform} from 'react-native';
import { SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function RegisterScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.TopContainer}>
        <Text style={styles.Title}>Đăng Kí</Text>
        <Text style={styles.script}>Có tài khoản? Đăng nhập tại đây</Text>
      </View>
      <View>
        <Text>SỐ ĐIỆN THOẠI</Text>
        <TextInput style={styles.numberPhone} placeholder="Nhập số điện thoại" />

        <Text>EMAIL</Text>
        <TextInput style={styles.email} placeholder="Nhập email" />

        <Text>TÊN NGƯỜI DÙNG</Text>
        <TextInput style={styles.userName} placeholder="Nhập tên người dùng" />

        <Text>MẬT KHẨU</Text>   
        <TextInput style={styles.pass} placeholder="Nhập mật khẩu" secureTextEntry />

        <Text>NGÀY SINH</Text>
          <TextInput
            style={styles.selectedDate}
            value={date.toLocaleDateString()}
            editable={false}  
            onPressIn={showDatepicker}
          />

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>

      <Button title="Đăng Kí" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  script: {
    textAlign: 'center',
    marginVertical: 40,
  },
  numberPhone: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  email: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  userName: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pass: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  selectedDate: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
