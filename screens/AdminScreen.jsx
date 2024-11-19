import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { hotelDetail } from '../handleAPI/viewAPI.js';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../config/firebase.js';

import color from "../assets/color.json";
import LoadingScreen from '../screens/LoadingScreen';

export const AdminScreen = ({ navigation }) => {
  const [hotel, setHotel] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelImageCover, setHotelImageCover] = useState("");

  const [loading, setLoading] = useState(false); // Trạng thái loading
  const hotelId = "67047e37640239aaa10d370a";

  const getData = async () => {
    try {
      const data = await hotelDetail(hotelId); // Fetch thông tin khách sạn
      return data.data.doc;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };



  const fetchData = async () => {
    const res = await getData();
    if (res) {
      setHotel(res);
      console.log("fetchData database ok:", res);
    }
  };

  const fetchHotels = async () => {
    try {
      const hotelsCollection = collection(db, 'hotels');
      const hotelsSnapshot = await getDocs(hotelsCollection);
      const hotelsList = hotelsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          images: Object.values(data.images || {}),
          name: data.name,
          imgCover: data.imgCover || "",
        };
      });

      const currentHotel = hotelsList.find(hotel => hotel.id === hotelId);
      if (currentHotel) {
        setHotelImages(currentHotel.images);
        setHotelImageCover(currentHotel.imgCover);
        console.log("fetch firebase ok: ", currentHotel)
      } else {
        console.warn("Không tìm thấy khách sạn!");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchData(), fetchHotels()]);
      } catch (error) {
        console.error("Error fetching all data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

    if (loading) {
      return (
        <LoadingScreen />
      );
    }
    if (!hotel && !hotelImages) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: color.text_dark }}>Không có dữ liệu khách sạn!</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: hotelImageCover || 'https://via.placeholder.com/60' }} // URL ảnh khách sạn
            style={styles.hotelImage}
          />
          <Text style={styles.hotelName}>{hotel?.name || "Tên khách sạn"}</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ManagementScreen", {
                hotel: hotel,
                hotelImageCover: hotelImageCover,
                hotelImages: hotelImages
              })}
            >
              <FontAwesome5 name="hotel" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ChatList")}>
              <FontAwesome5 name="comment-dots" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Tin nhắn</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("manageBooking")}>
              <FontAwesome5 name="list" solid color={color.tilte} size={70} />
              <Text style={styles.label}>Đặt phòng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  

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
    borderColor: color.tilte,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.text_dark,
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
    backgroundColor: color.item_background_dark,
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
    color: color.text_dark,
  },
});