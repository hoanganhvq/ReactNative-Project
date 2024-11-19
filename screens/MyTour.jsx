import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import color from "../assets/color.json";
import { getMyBooking } from "../handleAPI/viewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

import LoadingScreen from "./LoadingScreen";
// cái này tự lấy data nha này t demo thôi

const MyTour = ({navigation}) => {
  const [myBooking, setMyBooking] = useState(null);
  const [doneFetch, setDoneFetch] = useState(false);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const data = await getMyBooking(token);
      return data.data;

    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const res = await getData();
    setMyBooking(res.data);
    console.log("myBooking: ", myBooking)
    setDoneFetch(true);
  };

  useEffect(() => {
    fetchData();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
        fetchData();
    }, [])
);



  const getColor = (status) => {
    if (status === "Đã thanh toán") {
      return "#00BB38";
    } else {
      return "#FF3131";
    }
  };
  const renderHotel = ({ item }) => {
    let checkIn = new Date(item.checkInDate).toLocaleDateString()
    let checkOut = new Date(item.checkOutDate).toLocaleDateString()
    let status = (item.method == 'Credit Card') ? "Đã thanh toán" : "Chưa thanh toán";



    return (
      <View style={styles.flatlistcontainer}>
        <View style={styles.hotelBox}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.hotel.name}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.rowCon}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: `https://github.com/JINO25/IMG/raw/master/Hotel/${item.hotel.imgCover}`,
              }}
            />
            <View>
              <Text style={styles.textBox}>Địa chỉ: {item.hotel.address}</Text>
              <Text style={styles.textBox}>Loại phòng: {item.room.name}</Text>
              <View>
                <View style={styles.rowCon}>
                  <AntDesign name="calendar" size={22} color="white" />
                  <Text style={styles.textDate}>
                    {checkIn} - {checkOut}
                  </Text>
                </View>

              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", columnGap: 80, marginTop: 10 }}>
            <Text style={styles.priceText}>Giá: {item.totalPrice}</Text>
            <Text style={{ fontWeight: "bold", color: getColor(status), fontSize: 18 }}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const [checkText, setCheckText] = useState(false);

 
  if (myBooking === null) {
    // Loading state
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen />
      </SafeAreaView>
    );
  }
  
  if (myBooking.length === 0) {
    // No bookings state
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://hips.hearstapps.com/hmg-prod/images/banff-517747003-1494616292.jpg?crop=0.9997418022205009xw:1xh;center,top&resize=980:*",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={{ fontSize: 16, color: "white", marginBottom: 20 }}>
              Bạn chưa có chuyến đi nào!
            </Text>
            <Text style={styles.slogan}>
              "Khám phá thế giới - Hành trình của bạn bắt đầu tại đây!"
            </Text>
      
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  
  // Booking list state
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myBooking}
        renderItem={renderHotel}
      />
    </SafeAreaView>
  );
  

};
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background_dark,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistcontainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginBottom: 10
  },
  hotelBox: {
    width: 370,
    height: 210,
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#333",

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: color.tilte
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#444",
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    width: "80%",
    marginTop: 10,
  },
  imageStyle: {
    width: 120,
    height: 110,
    borderRadius: 10,
  },
  rowCon: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },

  textBox: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginBottom: 12
  },
  textDate: {
    fontSize: 12,
    color: "#ACACAC",
    fontWeight: "500",
  },
  priceText: {
    color: "#da251d",
    fontSize: 18,
    fontWeight: "400",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  slogan: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:color.tilte,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    
  },
  benefits: {
    marginTop: 30,
  },
  benefitText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
});

export default MyTour;
