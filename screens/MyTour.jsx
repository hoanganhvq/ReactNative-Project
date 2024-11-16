import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useState } from "react";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import color from "../assets/color.json";
// cái này tự lấy data nha này t demo thôi
const HotelDatademo = [
  {
    id: 1,
    title: "Hotel cồn lường",
    addres: "abc xyz",
    type: "Phòng đôi",
    dateS: "T5, tháng 10 10",
    dateR: "T6, tháng 10 11 ",
    customer: "2 người lớn",
    price: "323.000đ",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    title: "Hotel cồn lường",
    addres: "abc xyz",
    type: "Phòng đôi",
    dateS: "T5, tháng 10 10",
    dateR: "T6, tháng 10 11 ",
    customer: "2 người lớn",
    price: "323.000đ",
    status: "Chưa thanh toán",
  },
];
const MyTour = () => {
  const getColor = (status) => {
    if (status === "Đã thanh toán") {
      return "#00BB38";
    } else {
      return "#FF3131";
    }
  };
  const renderHotel = ({ item }) => {
    return (
      <View style={styles.flatlistcontainer}>
        <View style={styles.hotelBox}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.rowCon}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
              }}
            />
            <View>
              <Text style={styles.textBox}>Địa chỉ: {item.addres}</Text>
              <Text style={styles.textBox}>Loại phòng: {item.type}</Text>
              <View>
                <View style={styles.rowCon}>
                  <AntDesign name="calendar" size={22} color="white" />
                  <Text style={styles.textDate}>
                    {item.dateS} - {item.dateR}
                  </Text>
                </View>
             
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", columnGap: 80, marginTop: 10 }}>
            <Text style={styles.priceText}>Giá: {item.price}</Text>
            <Text style={{ fontWeight: "bold", color: getColor(item.status), fontSize:18 }}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const [checkText, setCheckText] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ height: 60 }}></View>
      <FlatList data={HotelDatademo} renderItem={renderHotel} />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    backgroundColor:color.background_dark,
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistcontainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginBottom:10
  },
  hotelBox: {
    width: 370,
    height: 210,
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor:"#333",
   
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color:color.tilte
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
    marginBottom:12
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
});

export default MyTour;
