import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import color from "../assets/color.json";

export const AdminScreen = (navigation) => {
  const [hotel, setHotel] = useState(null);

  const getData = async () => {
    try {
      const data = await hotelDetail("67047e37640239aaa10d370a"); //Test thử với của thằng đầu tiên
      return data.data.doc;

    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const res = await getData();
    setHotel(res);
    console.log("fetchData");
    await getHotelier(res.hotelier.email);
  };
  useLayoutEffect(()=>{
    fetchData();
  })
  const Content =()=>{
  
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // URL ảnh demo, thay bằng ảnh khách sạn thực tế
            style={styles.hotelImage}
          />
          <Text style={styles.hotelName}>Tên khách sạn</Text>
        </View>
  
        <View style={styles.iconContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate("ManagementScreen")}}>
              <FontAwesome5 name="hotel" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Thông tin</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.card}>
              <FontAwesome5 name="comment-dots" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Tin nhắn</Text>
            </TouchableOpacity>
          </View>
  
          {/* Row 2 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <FontAwesome5 name="list" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Đặt phòng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background_dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: color.item_background_dark,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  hotelImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: color.tilte, // Viền ảnh
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.text_dark, // Tiêu đề sáng màu
  },
  iconContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: color.item_background_dark, // Nền card
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: color.text_dark, // Văn bản màu sáng
  },
});
