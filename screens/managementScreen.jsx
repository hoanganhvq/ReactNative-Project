import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView, Button, FlatList, Image, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoadingScreen from './LoadingScreen.jsx';
import color from "../assets/color.json";
import Carousel from "react-native-reanimated-carousel";
import * as ImagePicker from 'expo-image-picker';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase.js';

import AntDesign from "@expo/vector-icons/AntDesign";


const { width, height } = Dimensions.get("window");
const IMG_WIDTH = width * 0.9;
const IMG_HEIGHT = IMG_WIDTH * 0.5;
const ITEM_WIDTH = width;

export const ManagementScreen = ({ route }) => {
  // Ensure route.params is defined
  const { hotel , hotelImageCover, hotelImages} = route.params || {}; // Default to an empty object if undefined


  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelCity, setHotelCity] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomArea, setRoomArea] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  // const [hotelImages, setHotelImages] = useState([]);
  // const [hotelImageCover, setHotelImageCover] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalUtilities, setModalUtilities] = useState(false);
  const [modalVoucher, setModalVoucher] = useState(false);
  const [modalSuccessSave, setModalSuccessSave] = useState(false);
  const [modalNameHotel, setModalNameHotel] = useState(false);

  const [utility, setUtility] = useState('');
  const [utilities, setUtilities] = useState([]);

  const vouchers = [
    { id: '1', discount: '10%', code: 'MKB10', condition: 'Đơn từ 500.000 đ', applicable: true },
    { id: '2', discount: '22%', code: 'MKB22', condition: 'Đơn từ 550.000 đ', applicable: true },
    { id: '3', discount: '35%', code: 'MKB35', condition: 'Đơn từ 3.000.000 đ', applicable: false },
    { id: '4', discount: '40%', code: 'MKB40', condition: 'Đơn từ 5.000.000 đ', applicable: false },
  ]; //Data t fake de lam. m nhớ tạo voucher data rồi pull dữ liệu về xử lý nhe



  const addUtility = () => {
    if (utility.trim()) {
      setUtilities([...utilities, utility.trim()]);
      setUtility('');
    }
  };


  const renderVoucherItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.voucherItem}>
        <View style={styles.voucherInfo}>
          <Text style={styles.discountText}>Giảm {item.discount}</Text>
          <Text style={styles.codeText}>Mã voucher: {item.code}</Text>
          <Text style={styles.conditionText}>Điều kiện: {item.condition}</Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteVoucher(index)} style={styles.deleteVoucherButton}>
          <FontAwesome name="minus" style={styles.deleteVoucherButtonText} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  const removeUtility = (index) => {
    const updatedUtilities = [...utilities];
    updatedUtilities.splice(index, 1);
    setUtilities(updatedUtilities);
  };
  const handleSaveUtilityUpdated = () => {
    setModalUtilities(false)
  }


  const handleAddVoucher = () => {
    console.log("Add voucher s1uccessfully");
  }

  const onDeleteVoucher = (index) => {
    console.log("Xóa voucher ở ", index);
  }


  setTimeout(() => {
    setModalSuccessSave(false);
  }, 3000)

  useLayoutEffect(() => {
    console.log("hotel Data in management Screen: ", hotel)
  }, []);


  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.imageContainer}
     
    >
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Room/${item}`
        }}
        style={styles.imageStyle} />
    </TouchableOpacity>
  );

  const handleAddRoom = () => {
    setModalAddRoom(true)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      console.log("User canceled image selection.");
      return null; // Exit if user cancels selection
    } else if (result.assets && result.assets.length > 0) {
      console.log("Image selected successfully.");
      return result.assets[0]; // Return the selected image asset
    } else {
      console.log("Image selection failed.");
      return null;
    }
  };


  const uploadProfilePicture = async () => {
    try {
      const asset = await pickImage();
      if (!asset || !asset.uri) {
        console.error("No valid image selected for upload.");
        return; // Exit if no valid image was picked
      }

      const { uri } = asset;

      const hotelId = "67047e37640239aaa10d370a";
      const fileName = `${hotelId}_${Date.now()}.jpg`; // Đặt tên file độc nhất

      const storageRef = ref(storage, `hotel/${hotelId}/${fileName}`);

      const response = await fetch(uri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "hotels", hotelId), {
        imgCover: downloadURL,
      });
      fetchHotels()
      console.log("img Cover uploaded successfully!");

    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const pickImages = async () => {
    try {

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true, 
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      });

      if (!result.canceled) {
        console.log("Selected images:", result.assets);
        return result.assets;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error picking multiple images:", error);
      return [];
    }
  };

  const uploadImages = async () => {
    try {
      const assets = await pickImages();
      if (assets.length === 0) {
        console.log("No images selected.");
        return;
      }

      const hotelId = "67047e37640239aaa10d370a";

      for (const asset of assets) {
        const { uri } = asset;


        const fileName = `${hotelId}_${Date.now()}.jpg`; 
        const storageRef = ref(storage, `hotel/${hotelId}/${fileName}`);

        const response = await fetch(uri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "hotels", hotelId), {
          ["images." + Date.now()]: downloadURL, 
        });
      }
      console.log("Profile picture uploaded successfully!");
      fetchHotels()
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };


  const renderAmenities = ({ item }) => (
    <View style={styles.amenityContainer}>
      <FontAwesome name="check" size={15} color={color.tilte} />
      <Text style={styles.amenity}>{item}</Text>
    </View>
  );

  const renderContent = ({ item }) => {
    return (
      <>
        <View style={styles.headerKindRoom}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={item.images}
              renderItem={renderImageItem}
              width={width}
              height={IMG_HEIGHT}
              autoPlayInterval={3000}
              onSnapToItem={(index) => setActiveIndex(index)}
              loop={true}
            />
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {activeIndex + 1}/{item.images.length}
              </Text>
            </View>
          </View>

          <View style={styles.roomDetailsBox}>
            <Text style={styles.roomTitle}>{item.name}</Text>
            <View style={styles.roomInfoRow}>
              <Text style={styles.roomInfoText}>{item.area}m²</Text>
              <View style={{
                width: 1,
                height: 20,
                backgroundColor: "#999",
                marginHorizontal: 10,
              }} />
              <Text style={styles.roomInfoText}>{item.bedQuantity} giường lớn</Text>

            </View>

          </View>
        </View>
      </>
    )
  }


  const Content = () => {
    if (!hotelImages) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <>
        <View style={styles.hotelNameContainer}>


          <View >

            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                borderRadius: 8,
                color: "white",
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 10
              }}
            > {hotel.name}
            </Text>
          </View>

          <View  >
            <Image
              source={{ uri: hotelImageCover }}
              style={{
                width: '100%',  // chiều rộng của ảnh
                height: 220, // chiều cao của ảnh
                borderRadius: 10,
                marginRight: 10,
                marginBottom: 10

              }}
            />
          </View>

          <TouchableOpacity style={styles.openButton} onPress={() => setModalNameHotel(true)}>
            <Text style={styles.openButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>

          <Modal visible={modalNameHotel} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Chỉnh sửa</Text>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalNameHotel(false)}
                    accessibilityLabel="Close description modal">
                    <EvilIcons name="close" size={28} color="#ccc" />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#bbb', height: 1, marginVertical: 15 }} />
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.infoLabel}>Tên: </Text>
              <TextInput style={styles.inputInfo}  placeholder={hotel?.name || "Nhập tên khách sạn"}
              placeholderTextColor="gray" 
             ></TextInput>
            </View>
                  
                  <View style={styles.modalAddImage}>
                    <TouchableOpacity style={styles.iconUpload} onPress={uploadProfilePicture}>
                      <FontAwesome name="camera" size={40} color="white" />
                      <Text style={{ color: "white", marginTop: 10 }}>Avatar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.buttonAdd}>
                  <Text style={styles.txtButtonAdd}>Thêm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


        </View>



        <View style={styles.uploadImageContainer}>
          <Text style={styles.headerImage}>Hình ảnh - Bộ sưu tập</Text>
          <View style={{
            justifyContent: "center",
            alignItems: "center", marginTop: 20, borderRadius: 10
          }}>
            <Carousel
              data={hotelImages}
              width={width}
              height={200}
              autoPlay={false}
              useScrollView={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.imageContainer}
                >
                  <Image
                    source={{
                      uri: item,
                    }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              )}
            />

          </View>
        <TouchableOpacity style={styles.openButton} onPress={uploadImages}>
            <AntDesign name="pluscircle" size={25} style={styles.icon} />

            <Text style={styles.openButtonText}>Thêm ảnh</Text>
          </TouchableOpacity>
        </View>



        <View style={styles.relativeInformationContainer}>
          <Text style={styles.headerInfo}>Các thông tin liên quan</Text>
          <View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.infoLabel}>Địa chỉ: </Text>
              <TextInput style={styles.inputInfo} placeholder={hotel.address} placeholderTextColor="gray" onChangeText={(text) => setHotelLocation(text)}></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }} >
              <Text style={styles.infoLabel}>Thành phố: </Text>
              <TextInput style={styles.inputInfo} placeholder={hotel.city} placeholderTextColor="gray" onChangeText={(text) => setHotelCity(text)}></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.infoLabel}>Mô tả: </Text>
              <TextInput style={styles.inputInfo} placeholder={hotel.description} placeholderTextColor="gray" onChangeText={(text) => setHotelDescription(text)}></TextInput>
            </View>
            <TouchableOpacity style={styles.openButton} onPress={() => { setModalSuccessSave(true) }}>
              <Text style={styles.txtButtonModify}>Lưu thông tin</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccessSave}
            onRequestClose={() => setModalSuccessSave(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <AntDesign name="checkcircle" size={80} color="#4BB543" style={styles.successIcon} />
                <Text style={styles.successText}>Thay đổi thành công</Text>

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalSuccessSave(false)}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>

        <FlatList
          data={hotel.rooms}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />

        <TouchableOpacity style={styles.addRoomContainer} onPress={() => { handleAddRoom() }}>
          <AntDesign name="plus" size={100} color="white" />

          <Text style={{ fontSize: 20, color: "white" }}>Thêm chi tiết phòng</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalAddRoom}
          onRequestClose={() => { setModalAddRoom(false) }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Thêm phòng
                </Text>
                <TouchableOpacity style={styles.modalCloseButton}
                  onPress={() => { setModalAddRoom(false) }}
                  accessibilityLabel="Close description modal">
                  <EvilIcons name="close" size={28} color="#ccc" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDivider} />
              <View style={{ flexDirection: "row" }}>
                <View style={styles.modalInput}>

                  <View style={{ flexDirection: "column", marginBottom: 20 }}>
                    <Text style={styles.modalTitleInput}>Loại phòng: </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={{
                        borderWidth: 1,
                        width: 180,
                        height: 30,
                        marginRight: 7,
                        borderRadius: 5,
                        borderColor: "gray",
                        color: "white",
                        paddingLeft: 5
                      }}

                      ></TextInput>
                    </View>

                  </View>

                  <View style={{ flexDirection: "column", marginBottom: 20 }}>
                    <Text style={styles.modalTitleInput}>Diện tích: </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={styles.modalInputInfo} keyboardType='numeric'

                      ></TextInput>
                      <Text style={styles.modalUnit}> m²</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "column", marginBottom: 20 }}>
                    <Text style={styles.modalTitleInput}>Số giường</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={styles.modalInputInfo} keyboardType='numeric'

                      ></TextInput>
                      <Text style={styles.modalUnit}>Giường</Text>
                    </View>
                  </View>


                  <View style={{ flexDirection: "column", marginBottom: 20 }}>
                    <Text style={styles.modalTitleInput}>Giá</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={styles.modalInputInfo} keyboardType='numeric'

                      ></TextInput>
                      <Text style={styles.modalUnit}>đ</Text>
                    </View>
                  </View>

                </View>
                <View style={styles.modalAddImage}>
                  <TouchableOpacity style={styles.iconUpload}>
                    <FontAwesome name="camera" size={40} color="white" />
                    <Text style={{ color: "white", marginTop: 10 }}>Avatar</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity style={styles.buttonAdd}>
                  <Text style={styles.txtButtonAdd}>Thêm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>


        </Modal>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.headerImage}>Ti���n Nghi</Text>
          <FlatList
            data={hotel.utilities}
            renderItem={renderAmenities}
            keyExtractor={(item) => item.toString()}
            estimatedItemSize={255}
            contentContainerStyle={styles.amenitiesList}
            scrollEnabled={true} />
          <TouchableOpacity
            onPress={() => setModalUtilities(true)}
            style={styles.openButton}>
            <AntDesign name="pluscircle" size={25} style={styles.icon} />
            <Text style={styles.openButtonText}>Thêm tiện nghi</Text>
          </TouchableOpacity>

          <Modal visible={modalUtilities} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Thêm tiện nghi
                  </Text>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => { setModalUtilities(false) }}
                    accessibilityLabel="Close description modal">
                    <EvilIcons name="close" size={28} color="#ccc" />
                  </TouchableOpacity>
                </View>
                <View style={{
                  backgroundColor: '#aaa',
                  height: 1,
                  marginVertical: 15,
                }} />

                <TextInput
                  style={styles.input}
                  placeholder="Nhập tiện nghi mới"
                  value={utility}
                  onChangeText={(text) => { setUtility(text) }}
                />

                <TouchableOpacity style={styles.addButton} onPress={addUtility}>
                  <Text style={styles.addButtonText}>Thêm tiện nghi</Text>
                </TouchableOpacity>

                <FlatList
                  data={utilities}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.utilityItem}>
                      <Text style={styles.utilityText}>{item}</Text>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeUtility(index)}
                      >
                        <FontAwesome name="minus" style={styles.deleteButtonText} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
               <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


        </View>


        <View style={styles.voucherContainer}>
          <View>
            <Text style={styles.headerImage}>Chọn Voucher</Text>
            <FlatList
              data={vouchers}
              renderItem={renderVoucherItem}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
              style={styles.openButton} onPress={() => { setModalVoucher(true) }}>
              <AntDesign name="pluscircle" size={25} style={styles.icon} />
              <Text style={styles.openButtonText}>Thêm voucher</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={modalVoucher} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Thông tin Voucher</Text>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalVoucher(false)}
                    accessibilityLabel="Close description modal">
                    <EvilIcons name="close" size={28} color="#ccc" />
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Input Fields */}
                <View style={styles.inputVoucher}>
                  <Text style={styles.inforLabel}>Mã:</Text>
                  <TextInput
                    style={styles.infoInput}
                    placeholder="Nhập mã voucher"
                    placeholderTextColor="gray"
                  />
                </View>

                <View style={styles.inputVoucher}>
                  <Text style={styles.inforLabel}>Giảm:</Text>
                  <TextInput
                    style={styles.infoInput}
                    placeholder="80"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitLabel}>%</Text>
                </View>



                <View style={styles.inputVoucher}>
                  <Text style={styles.inforLabel}>Điều kiện:</Text>
                  <Text style={styles.conditionLabel}>Đơn lớn hơn</Text>
                  <TextInput
                    style={styles.infoInput}
                    placeholder="100000"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitLabel}>đ</Text>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Voucher saved')}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


        </View>
      </>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background_dark,
  },
  hotelNameContainer: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: color.item_background_dark, // Darker background for better contrast
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  iconUpload: {
    borderColor: "white",
    borderWidth: 3,
    padding: 30,
    borderRadius: 20,
    marginRight: 20,
    opacity: 0.5
  },
  uploadImageContainer: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  relativeInformationContainer: {
    padding: 15,
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  headerInfo: {
    fontSize: 25,
    fontWeight: "bold",
    color: color.tilte,
    marginBottom: 10
  },
  headerImage: {
    fontSize: 25,
    fontWeight: "bold",
    color: color.tilte
  },
  infoLabel: {
    fontWeight: "700",
    fontSize: 20,
    color: "white"
  },
  inputInfo: {
    marginTop: 2,
    width: width * 0.7,
    fontSize: 16,
    color: "white",
    flexWrap: "wrap",
    flex: 1,
    paddingRight: 10,
    fontSize:20
  },
  buttonModify: {
    backgroundColor: "black",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    width: 180,
    alignItems: "center"
  },
  txtButtonModify: {
    fontSize: 18,
    color: "white"
  },

  imageStyle: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    resizeMode: "cover",
    borderRadius: 10,
  },

  headerKindRoom: {
    backgroundColor: color.item_background_dark,
    borderColor: "#ccc",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  carouselContainer: {
    width: width,
    alignItems: "center",
    borderBlockColor: "red",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 20
  },
  counter: {
    position: 'absolute',
    bottom: 10,
    right: 23,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    color: 'white',
    fontWeight: 'bold',
  },

  roomDetailsBox: {
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    padding: 15,
    borderColor: "#ccc",
    marginEnd: 20
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white"
  },
  roomInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    color: "#ccc",
    padding: 7

  },
  roomInfoText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#ccc"
  },

  addRoomContainer: {
    padding: 15,
    backgroundColor: color.item_background_dark, // Darker background for better contrast
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successIcon: {
    marginBottom: 15,
    justifyContent: "center",
    alignSelf: "center"
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4BB543',
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  closeButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    width: 140,
    backgroundColor: color.tilte,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 30,

  },
  modalContent: {
    width: width * 0.95,
    maxHeight: height * 0.95,
    backgroundColor: color.background_dark,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: color.tilte
  },
  modalCloseButton: {
    position: "absolute",
    top: 4,
    right: 10,
  },

  modalDivider: {
    backgroundColor: '#111',
    height: 1,
    marginVertical: 15,
  },
  modalTitleInput: {
    fontSize: 20,
    color: "white",
    marginBottom: 7
  },
  modalInputInfo: {
    borderWidth: 1,
    width: 135,
    height: 30,
    marginRight: 7,
    borderRadius: 5,
    borderColor: "gray",
    color: "white",
    paddingLeft: 5
  },
  modalUnit: {
    color: "#888",
    fontSize: 16
  },
  modalAddImage: {
    justifyContent: "center",
    alignItems:"center",
    marginLeft: 20
  },
  buttonAdd: {
    backgroundColor: color.tilte,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop:10
  },
  txtButtonAdd: {
    fontWeight: "500",
    fontSize: 20,
    color: "white"
  },
  amenitiesContainer: {
    padding: 10,
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 200,
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 60,
    color: color.tilte
  },
  amenitiesList: {
    paddingVertical: 5,
    color: 'white'

  },
  amenityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  amenity: {
    marginLeft: 5,
    fontSize: 17,
    color: '#ccc',
  },
  openButton: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: color.tilte,
    borderRadius: 8,
    width: 220,
  },
  icon: {
    marginRight: 7,
    color: "#fff",
  },
  openButtonText: {
    fontSize: 20,
    color: "#fff",
  },

  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 15,
    alignItems: 'center',

  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  utilityItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row"

  },
  utilityText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF6347', // Màu đỏ cho nút xóa
    height: 30,
    width: 30, // Sử dụng width thay vì weight
    borderRadius: 15, // Bằng một nửa của chiều rộng/chiều cao để có nút tròn
    marginLeft: 10,
    position: "absolute",
    right: 10,
    top: 5,
    justifyContent: "center", // Canh giữa nội dung theo chiều dọc
    alignItems: "center", // Canh giữa nội dung theo chiều ngang
  },

  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: "center", // Căn giữa văn bản
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.tilte,
  },
  voucherContainer: {
    padding: 15,
    borderWidth: 0.2,
    borderColor: '#555',
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  voucherItem: {
    flexDirection: 'column',
    padding: 15,
    borderWidth: 0.2,
    borderColor: '#555',
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedVoucher: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  unavailableVoucher: {
    opacity: 0.5,
    backgroundColor: '#111',
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.tilte,
  },
  codeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  conditionText: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  applyButton: {
    backgroundColor: color.tilte,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 12,
    marginTop: 10,
  },
  deleteVoucherButton: {
    backgroundColor: '#FF6347', // Màu đỏ cho nút xóa
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    position: "absolute",
    right: 10,
    top: 5,
    justifyContent: "center",
    alignItems: "center", // Canh giữa nội dung theo chiều ngang
  },
  deleteVoucherButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: "center", // Căn giữa văn bản
  },
  divider: {
    backgroundColor: '#ddd',
    height: 1,
    marginVertical: 15,
  },
  inputVoucher: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inforLabel: {
    fontSize: 16,
    color: "white",
    marginRight: 2,
    flex: 1,
  },

  textInput: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  infoInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#333',
    textAlign: 'center',
  },
  unitLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft: 5,
  },
  conditionLabel: {
    fontSize: 14,
    color: '#777',
    marginRight: 5,
    flex: 2,
  },
  saveButton: {
    backgroundColor: color.tilte,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },

})