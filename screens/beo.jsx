import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import ImageViewing from "react-native-image-viewing";
import imgData from "./imgData.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import vdtData from "./vdtData.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import dtData from "./dtData.js";

const width = Dimensions.get("window").width;
const imgW = width * 0.9;
const imgH = imgW * 0.5;

const images = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
  {
    uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  },
];
const vdtCon = ({ item }) => (
  <View style={styles.iconFl}>
    <AntDesign name="check" size={20} color="#2FB33B" />
    <Text style={styles.vdtTxt}>{item.txt}</Text>
  </View>
);
const renderDetails = ({ item }) => (
  <Text style={styles.dtDetails}>{item}</Text>
);
const dtCon = ({ item }) => (
  <View style={styles.dtConContainer}>
    <Text style={styles.dtTitle}>{item.title}</Text>
    <FlatList
      data={item.details}
      renderItem={renderDetails}
      keyExtractor={(detail, index) => index.toString()}
    />
  </View>
);
function beo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [currentPicker, setCurrentPicker] = useState(null);
  const [pTxt, setPTxt] = useState(0);
  const [nTxt, setNTxt] = useState(0);
  const [tTxt, setTTxt] = useState(0);
  const [mCount, setMCount] = useState(1);
  const [selected, setSelected] = useState(1);
  const [setModal, setSetModal] = useState(false);
  const [setModal2, setSetModal2] = useState(false);
  const [setModal3, setSetModal3] = useState(false);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imgCon = ({ item, index }) => (
    <View style={[styles.imgdaCon, { width }]} key={item.id}>
      <TouchableOpacity
        onPress={() => {
          setSelectedImageIndex(index);
          setIsViewerVisible(true);
        }}
      >
        <Image source={item.src} style={styles.imgSty} />
      </TouchableOpacity>
    </View>
  );
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === "ios");
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };
  const onChange2 = (e, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === "ios");
    setDate2(currentDate);
    let tempDate = new Date(currentDate);
    let fDate2 =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText2(fDate2);
  };
  const showMode = (currentMode, picker) => {
    setShow(true);
    setMode(currentMode);
    setCurrentPicker(picker);
  };
  return (
    <FlatList
      data={[{}]}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.topBox}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={[
                  styles.tBox,
                  {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderRightColor: "white",
                  },
                ]}
              >
                <Text style={{ fontSize: 14, marginTop: 3 }}>
                  Ngày nhận phòng
                </Text>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => showMode("date", "picker1")}
                >
                  <MaterialCommunityIcons
                    name="calendar"
                    size={22}
                    color="#8f8e8e"
                    style={{ marginTop: 10 }}
                  />
                  <Text style={{ fontSize: 18, color: "#bf592b" }}>{text}</Text>
                </TouchableOpacity>
                {show && currentPicker === "picker1" && (
                  <DateTimePicker
                    testID="datePicker1"
                    value={date1}
                    mode={mode}
                    display="default"
                    onChange={onChange1}
                  />
                )}
              </View>
              <View
                style={[
                  styles.tBox,
                  { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                ]}
              >
                <Text style={{ fontSize: 14, marginTop: 3 }}>
                  Ngày trả phòng
                </Text>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => showMode("date", "picker2")}
                >
                  <MaterialCommunityIcons
                    name="calendar"
                    size={22}
                    color="#8f8e8e"
                    style={{ marginTop: 10 }}
                  />
                  <Text style={{ fontSize: 18, color: "#bf592b" }}>
                    {text2}
                  </Text>
                </TouchableOpacity>
                {show && currentPicker === "picker2" && (
                  <DateTimePicker
                    testID="datePicker2"
                    value={date2}
                    mode={mode}
                    display="default"
                    onChange={onChange2}
                  />
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.bBox}
              onPress={() => setSetModal2(true)}
            >
              <Text style={styles.txtQuan}> {pTxt}</Text>
              <Text style={{ fontSize: 16, fontWeight: "450" }}>phòng</Text>
              <Text style={styles.txtQuan}>{nTxt}</Text>
              <Text style={{ fontSize: 16, fontWeight: "450" }}>người lớn</Text>
              <Text style={styles.txtQuan}>{tTxt}</Text>
              <Text style={{ fontSize: 16, fontWeight: "450" }}>trẻ em</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={setModal2}
              onRequestClose={() => {
                setSetModal2(false);
              }}
            >
              <View style={styles.conModal2}>
                <View style={styles.modContainer}>
                  <Text style={styles.modHeader}>Phòng và số khách</Text>
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, top: 10 }}
                    onPress={() => setSetModal2(false)}
                  >
                    <EvilIcons name="close" size={30} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: "#e8e8e8",
                    width: 380,
                    height: 1,
                    marginTop: 10,
                  }}
                ></View>
                <View style={styles.containerTxtModal2}>
                  <Text style={styles.txtQuan}>{pTxt}</Text>
                  <Text style={styles.txtQuan2}>Phòng</Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 80,
                    }}
                    onPress={() => setPTxt(pTxt - 1)}
                  >
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 20,
                    }}
                    onPress={() => setPTxt(pTxt + 1)}
                  >
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: "#e8e8e8",
                    width: 380,
                    height: 1,
                    marginTop: 10,
                  }}
                ></View>
                <View style={styles.containerTxtModal2}>
                  <Text style={styles.txtQuan}>{nTxt}</Text>
                  <Text style={styles.txtQuan2}>Người lớn</Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 80,
                    }}
                    onPress={() => setNTxt(nTxt - 1)}
                  >
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 20,
                    }}
                    onPress={() => setNTxt(nTxt + 1)}
                  >
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: "#e8e8e8",
                    width: 380,
                    height: 1,
                    marginTop: 10,
                  }}
                ></View>
                <View style={styles.containerTxtModal2}>
                  <Text style={styles.txtQuan}>{tTxt}</Text>
                  <Text style={styles.txtQuan2}>Trẻ em</Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 80,
                    }}
                    onPress={() => setTTxt(tTxt - 1)}
                  >
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 20,
                    }}
                    onPress={() => setTTxt(tTxt + 1)}
                  >
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={{
                width: 178.2,
                height: 35,
                backgroundColor: "#4b47f2",
                marginTop: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                Xong
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              data={imgData}
              renderItem={imgCon}
              width={width}
              height={imgH}
              scrollAnimationDuration={500}
              autoPlay={true}
              autoPlayInterval={3000}
              onSnapToItem={(index) => setActiveIndex(index)}
              loop={true}
            />
            <ImageViewing
              images={imgData.map((img) => img.src)}
              imageIndex={selectedImageIndex}
              visible={isViewerVisible}
              onRequestClose={() => setIsViewerVisible(false)}
            />
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {activeIndex + 1}/{imgData.length}
              </Text>
            </View>
          </View>
          <View style={styles.boxBelow}>
            <Text style={styles.cTxt}>Phòng có giường size Cồn Lường</Text>
            <View
              style={{
                flexDirection: "row",
                columnGap: 15,
                width: 330,
                marginLeft: 5,
              }}
            >
              <Text style={styles.txtBelow}>45m2</Text>
              <View
                style={{ width: 1, height: 20, backgroundColor: "black" }}
              ></View>
              <Text style={styles.txtBelow}>Tối đa 2 người lớn</Text>
              <View
                style={{ width: 1.4, height: 20, backgroundColor: "black" }}
              ></View>
              <Text style={styles.txtBelow}>1 giường lớn</Text>
              <TouchableOpacity
                style={{ width: 60, height: 25 }}
                onPress={() => {
                  setSetModal3(true);
                }}
              >
                <Text
                  style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}
                >
                  {" "}
                  Chi tiết
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                visible={setModal3}
                onRequestClose={() => setSetModal3(false)}
              >
                <View style={styles.conDetailModal}>
                  <View style={styles.detailModal}>
                    <View style={styles.modContainer}>
                      <Text style={styles.modHeader}>Phòng có giường King</Text>
                      <TouchableOpacity
                        style={{ position: "absolute", right: 14, top: 15 }}
                        onPress={() => setSetModal3(false)}
                      >
                        <EvilIcons name="close" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#e8e8e8",
                        width: 380,
                        height: 1,
                        marginTop: 10,
                      }}
                    />
                    <FlatList
                      data={dtData}
                      renderItem={dtCon}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.conboxBelow}>
              <MaterialCommunityIcons name="shower" size={24} color="black" />
              <Text style={{ fontSize: 11 }}>Bồn tắm/Vòi sen riêng</Text>
            </View>
            <View style={styles.conboxBelow}>
              <MaterialCommunityIcons
                name="smoking-off"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 11 }}>Không hút thuốc</Text>
            </View>
          </View>
          <View style={styles.bookBox}>
            <View style={{ flexDirection: "row", columnGap: 15 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 15,
                    alignItems: "center",
                    marginLeft: 15,
                    marginTop: 20,
                  }}
                >
                  <FontAwesome name="user" size={24} color="black" />
                  <Text style={{ fontSize: 11 }}>2 người lớn</Text>
                </View>

                <FlatList
                  data={vdtData}
                  renderItem={vdtCon}
                  nestedScrollEnabled={true}
                />
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 20,
                      fontWeight: "bold",
                      marginLeft: 20,
                      color: "blue",
                    }}
                  >
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      width: 170,
                      height: 45,
                      borderWidth: 1,
                      borderColor: "#535353",
                      marginLeft: 20,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderRightColor: "#4b47f2",
                    }}
                    onPress={() => setSetModal(true)}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                          marginLeft: 15,
                          marginTop: 5,
                        }}
                      >
                        Số phòng
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "400",
                          alignSelf: "flex-start",
                          marginLeft: 15,
                          color: "red",
                        }}
                      >
                        5 phòng cuối cùng
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 11,
                        marginTop: 5,
                        right: 35,
                        position: "absolute",
                        bottom: 15,
                      }}
                    >
                      {mCount}
                    </Text>
                    <AntDesign
                      name="down"
                      size={20}
                      color="black"
                      style={{ position: "absolute", right: 8, top: 11 }}
                    />
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={setModal}
                    onRequestClose={() => {
                      setSetModal(!setModal);
                    }}
                  >
                    <View style={styles.conquanModal}>
                      <View style={styles.quanModal}>
                        <View style={styles.modContainer}>
                          <Text style={styles.modHeader}>Số phòng</Text>
                          <TouchableOpacity
                            style={{ position: "absolute", right: 18, top: 12 }}
                            onPress={() => setSetModal(!setModal)}
                          >
                            <EvilIcons name="close" size={30} color="black" />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            backgroundColor: "#e8e8e8",
                            width: 380,
                            height: 1,
                          }}
                        ></View>
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() => [
                            setSelected(1),
                            setMCount(1),
                            setSetModal(!setModal),
                          ]}
                        >
                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: 22,
                              marginLeft: 20,
                            }}
                          >
                            1 Phòng
                          </Text>
                          <View style={styles.radioBtn}>
                            {selected === 1 ? (
                              <View style={styles.radioBg}></View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            backgroundColor: "#e8e8e8",
                            width: 380,
                            height: 1,
                            marginTop: 10,
                          }}
                        ></View>
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() => [
                            setSelected(2),
                            setMCount(2),
                            ,
                            setSetModal(!setModal),
                          ]}
                        >
                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: 22,
                              marginLeft: 20,
                            }}
                          >
                            2 Phòng
                          </Text>
                          <View style={styles.radioBtn}>
                            {selected === 2 ? (
                              <View style={styles.radioBg}></View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            backgroundColor: "#e8e8e8",
                            width: 380,
                            height: 1,
                            marginTop: 10,
                          }}
                        ></View>
                      </View>
                    </View>
                  </Modal>
                  <View
                    style={{
                      marginTop: 5,
                      width: 107,
                      height: 45,
                      borderWidth: 1,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      backgroundColor: "#4b47f2",
                      borderLeftColor: "#4b47f2",
                      borderTopColor: "#535353",
                      borderBottomColor: "#535353",
                      borderRightColor: "#535353",
                    }}
                  >
                    <TouchableOpacity style={{ width: 105, height: 43 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          alignSelf: "center",
                          color: "white",
                          justifyContent: "center",
                          marginTop: 10,
                        }}
                      >
                        Đặt
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f1ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  imgdaCon: {
    alignItems: "center",
    justifyContent: "center",
  },
  imgSty: {
    width: imgW,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  carouselContainer: {
    justifyContent: "center",
    height: 151,
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  cTxt: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "left",
    marginLeft: 5,
  },
  counterContainer: {
    position: "absolute",
    bottom: 8,
    left: 26,
    backgroundColor: "rgb(222, 242, 242)",
    padding: 5,
    borderRadius: 5,
    opacity: 0.4,
    width: 32,
    height: 27,
    alignItems: "center",
  },
  counterText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  txtBelow: {
    fontSize: 12,
    fontWeight: "bold",
  },
  boxBelow: {
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: "white",
    backgroundColor: "#ffffff",
    width: imgW,
    height: 112,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  bookBox: {
    width: 317.67,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    height: 320,
  },
  iconFl: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
  },
  vdtTxt: {
    fontSize: 11,
  },
  topBox: {
    width: 360.6,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  tBox: {
    width: 341.8 / 2,
    height: 70,
    backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  bBox: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    marginTop: 10,
    width: 341.8,
    height: 45,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
  },
  quanModal: {
    width: 380,
    height: 230,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  conquanModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  radioBtn: {
    height: 25,
    width: 24,
    borderRadius: 13,
    borderWidth: 1,
    position: "absolute",
    right: 40,
    top: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioBg: {
    backgroundColor: "#4B47F2",
    width: 19,
    height: 19,
    borderRadius: 13,
  },
  conModal2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  modHeader: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  modContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  containerTxtModal2: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
    width: "80%",
    height: 50,
  },
  txtQuan: {
    fontSize: 27,
    color: "#bf592b",
    marginLeft: 20,
  },
  txtQuan2: {
    fontSize: 24,
    color: "#919191",
    marginLeft: 20,
  },
  detailModal: {
    width: 380,
    height: 570,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  conDetailModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dtTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dtConContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dtDetails: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 3,
  },
  conboxBelow: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
    marginLeft: 5,
  },
});
export default beo;
