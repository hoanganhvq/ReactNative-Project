<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useLayoutEffect, useState } from "react";
>>>>>>> demoProduct
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
  SafeAreaView,
  ScrollView,
} from "react-native";
<<<<<<< HEAD
import ImageViewing from "react-native-image-viewing";
=======
>>>>>>> demoProduct
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
<<<<<<< HEAD
import Feather from "@expo/vector-icons/Feather";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import imgData from "../Data/imgData.js";
import vdtData from "../Data/vdtData.js";
import dtData from "../Data/dtData.js";
=======
import vdtData from "../Data/vdtData.js";
import color from "../assets/color.json";

>>>>>>> demoProduct

const { width } = Dimensions.get("window");
const IMG_WIDTH = width * 0.9;
const IMG_HEIGHT = IMG_WIDTH * 0.5;

// Reusable RoomModal Component
const RoomModal = ({
  visible,
  onClose,
  roomCount,
  setRoomCount,
<<<<<<< HEAD
  maxRooms = 5, // Default maximum number of rooms
}) => {
  // Generate room options dynamically based on maxRooms
=======
  maxRooms = 5, 
}) => {
>>>>>>> demoProduct
  const roomOptions = Array.from({ length: maxRooms }, (_, i) => `${i + 1} Phòng`);

  const handleSelect = (count) => {
    setRoomCount(count);
    onClose();
  };

  const renderOption = ({ item, index }) => {
    const selected = roomCount === index + 1;
    return (
      <TouchableOpacity
        style={styles.modalOptionContainer}
        onPress={() => handleSelect(index + 1)}
      >
        <Text style={styles.modalOptionText}>{item}</Text>
        {selected && <View style={styles.radioSelected} />}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Số phòng</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
<<<<<<< HEAD
            <EvilIcons name="close" size={30} color="black" />
=======
            <EvilIcons name="close" size={30} color="white" />
>>>>>>> demoProduct
          </TouchableOpacity>
          <View style={styles.modalDivider} />

          <FlatList
            data={roomOptions}
            renderItem={renderOption}
            keyExtractor={(item, index) => index.toString()}
          />
<<<<<<< HEAD
=======
          
>>>>>>> demoProduct
        </View>
      </View>
    </Modal>
  );
};

<<<<<<< HEAD
const BookingScreen = (navigation) => {
=======
const BookingScreen = ({ navigation, route }) => {
  const { hotel, token } = route.params;
  const hotelData = hotel;
  const rooms = hotel.rooms;
>>>>>>> demoProduct
  // Date Picker States
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [formattedCheckIn, setFormattedCheckIn] = useState("");
  const [formattedCheckOut, setFormattedCheckOut] = useState("");

  // Modal States
  const [isRoomModalVisible, setRoomModalVisible] = useState(false);
<<<<<<< HEAD
  const [isGuestModalVisible, setGuestModalVisible] = useState(false);
=======
>>>>>>> demoProduct
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  // Guest Counts
  const [roomCount, setRoomCount] = useState(1);
<<<<<<< HEAD
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  // Carousel States
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
=======

  // Carousel States
  const [activeIndex, setActiveIndex] = useState(0);

>>>>>>> demoProduct

  // Handlers for Date Picker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || (currentPicker === "checkIn" ? checkInDate : checkOutDate);
    setShowDatePicker(Platform.OS === "ios");
    if (currentPicker === "checkIn") {
      setCheckInDate(currentDate);
      setFormattedCheckIn(formatDate(currentDate));
    } else {
      setCheckOutDate(currentDate);
      setFormattedCheckOut(formatDate(currentDate));
    }
  };
<<<<<<< HEAD

=======
  useLayoutEffect(()=>{
    console.log("hotel Rooms: ", hotel);
  })
>>>>>>> demoProduct
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const showDatePickerMode = (mode, pickerType) => {
    setShowDatePicker(true);
    setCurrentPicker(pickerType);
  };

<<<<<<< HEAD
  // Handlers for Guest Modals
  const increment = (setter, count) => setter(count + 1);
  const decrement = (setter, count) => {
    if (count > 0) setter(count - 1);
  };
=======
>>>>>>> demoProduct

  // Render Functions
  const renderVdtItem = ({ item }) => (
    <View style={styles.iconRow}>
<<<<<<< HEAD
      <AntDesign name="check" size={20} color="#2FB33B" />
      <Text style={styles.vdtText}>{item.txt}</Text>
    </View>
  );

  const renderDetailItem = ({ item }) => <Text style={styles.detailText}>{item}</Text>;

  const renderDtItem = ({ item }) => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{item.title}</Text>
      <FlatList
        data={item.details}
        renderItem={renderDetailItem}
        keyExtractor={(detail, index) => index.toString()}
      />
    </View>
  );

=======
      <AntDesign name="check" size={20} color={color.tilte} />
      <Text style={styles.vdtText}>  {item.txt}</Text>
    </View>
  );

  const renderDetailItem = ({ item }) => (
    <Text style={styles.detailText}>{item}</Text>
  );


>>>>>>> demoProduct
  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => {
        setSelectedImageIndex(index);
        setIsViewerVisible(true);
      }}
    >
<<<<<<< HEAD
      <Image source={item.src} style={styles.imageStyle} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Date Selection */}
=======
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Room/${item}`
        }}
        style={styles.imageStyle} />
    </TouchableOpacity>
  );

  const renderContent = ({ item }) => {
    return (
      <>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.headerKindRoom}>
            <View style={styles.carouselContainer}>
              <Carousel
                data={item.images}
                renderItem={renderImageItem}
                width={width}   
                height={IMG_HEIGHT}
                autoPlay={true}
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
                  <View style={styles.divider} />
                  <Text style={styles.roomInfoText}>{item.bedQuantity} giường lớn</Text>
        
                <TouchableOpacity onPress={() => setDetailModalVisible(true)}>
                  <Text style={styles.detailLink}>Chi tiết</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.featuresRow}>
                <View style={styles.featureItem}>
                  <MaterialCommunityIcons name="shower" size={24} color={color.tilte} />
                  <Text style={styles.featureText}>Bồn tắm/Vòi sen riêng</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialCommunityIcons name="smoking-off" size={24} color={color.tilte} />
                  <Text style={styles.featureText}>Không hút thuốc</Text>
                </View>
              </View>
            </View>
          </View>
         

          <Modal
            animationType="slide"
            transparent={true}
            visible={isDetailModalVisible}
            onRequestClose={() => setDetailModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.detailModalContent}>
                <Text style={styles.modalHeader}>Chi tiết phòng</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setDetailModalVisible(false)}
                >
                  <EvilIcons name="close" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.modalDivider} />
                <FlatList
                  data={item.utilities}
                  renderItem={renderDetailItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </Modal>

          <View style={styles.bookingBox}>
            <View style={styles.bookingRow}>
              <FontAwesome name="money" size={24} color={color.tilte} />
              <Text style={styles.bookingLabel}> {item.price}đ/phòng</Text>
            </View>

            <FlatList
              data={vdtData}
              renderItem={renderVdtItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.vdtList}
            />

            <View style={styles.roomSelectionRow}>
              <TouchableOpacity
                style={styles.roomSelector}
                onPress={() => setRoomModalVisible(true)}
              >
                <View >
                  <Text style={styles.roomSelectorLabel}>Số phòng</Text>
                  <Text style={styles.roomCountText}>{roomCount}</Text>
                </View>
                <AntDesign name="down" size={20} color="white" />
              </TouchableOpacity>

              <RoomModal
                visible={isRoomModalVisible}
                onClose={() => setRoomModalVisible(false)}
                roomCount={roomCount}
                setRoomCount={setRoomCount}
                maxRooms={5} 
              />
              {token ?( <TouchableOpacity style={styles.bookButton} onPress={()=>navigation.navigate('BookingDetails',
              { hotel: hotelData, 
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
                roomCount:roomCount,
                roomName: item.name,
                roomPrice: item.price,
              })}>
                <Text style={styles.bookButtonText}>Đặt</Text>
              </TouchableOpacity>
              ) : ( <TouchableOpacity style={styles.bookButton} onPress={()=>navigation.navigate('SignIn',
                { hotel: hotelData, 
                  checkInDate:checkInDate,
                  checkOutDate:checkOutDate,
                  roomCount:roomCount,
                  roomName: item.name,
                  roomPrice: item.price,
                })}>
                  <Text style={styles.bookButtonText}>Đặt</Text>
                </TouchableOpacity>)}
             
            </View>
          </View>
        </View>

      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
>>>>>>> demoProduct
        <View style={styles.dateSelectionContainer}>
          {/* Check-In Date */}
          <View style={styles.dateBox}>
            <Text style={styles.label}>Ngày nhận phòng</Text>
<<<<<<< HEAD
=======

>>>>>>> demoProduct
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => showDatePickerMode("date", "checkIn")}
            >
<<<<<<< HEAD
              <MaterialCommunityIcons name="calendar" size={22} color="#8f8e8e" />
              <Text style={styles.dateText}>{formattedCheckIn || "Chọn ngày"}</Text>
            </TouchableOpacity>
=======
              <MaterialCommunityIcons name="calendar" size={22} color={color.tilte} />
              <Text style={styles.dateText}>{formattedCheckIn || "Chọn ngày"}</Text>
            </TouchableOpacity>
            
>>>>>>> demoProduct
            {showDatePicker && currentPicker === "checkIn" && (
              <DateTimePicker
                value={checkInDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Check-Out Date */}
          <View style={styles.dateBox}>
            <Text style={styles.label}>Ngày trả phòng</Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => showDatePickerMode("date", "checkOut")}
            >
<<<<<<< HEAD
              <MaterialCommunityIcons name="calendar" size={22} color="#8f8e8e" />
=======
              <MaterialCommunityIcons name="calendar" size={22} color={color.tilte} />
>>>>>>> demoProduct
              <Text style={styles.dateText}>{formattedCheckOut || "Chọn ngày"}</Text>
            </TouchableOpacity>
            {showDatePicker && currentPicker === "checkOut" && (
              <DateTimePicker
                value={checkOutDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>

<<<<<<< HEAD
        {/* Guest and Room Selection */}
        <TouchableOpacity
          style={styles.guestRoomBox}
          onPress={() => setGuestModalVisible(true)}
        >
          <View style={styles.guestRoomRow}>
            <Text style={styles.countText}>{roomCount}</Text>
            <Text style={styles.label}>Phòng</Text>
            <Text style={styles.countText}>{adultCount}</Text>
            <Text style={styles.label}>Người lớn</Text>
            <Text style={styles.countText}>{childCount}</Text>
            <Text style={styles.label}>Trẻ em</Text>
          </View>
        </TouchableOpacity>

        {/* Guest Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isGuestModalVisible}
          onRequestClose={() => setGuestModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Phòng và số khách</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setGuestModalVisible(false)}
              >
                <EvilIcons name="close" size={30} color="black" />
              </TouchableOpacity>
              <View style={styles.modalDivider} />

              {/* Rooms */}
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Phòng</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(setRoomCount, roomCount)}>
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{roomCount}</Text>
                  <TouchableOpacity onPress={() => increment(setRoomCount, roomCount)}>
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Adults */}
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Người lớn</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(setAdultCount, adultCount)}>
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{adultCount}</Text>
                  <TouchableOpacity onPress={() => increment(setAdultCount, adultCount)}>
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children */}
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Trẻ em</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(setChildCount, childCount)}>
                    <Feather name="minus-circle" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{childCount}</Text>
                  <TouchableOpacity onPress={() => increment(setChildCount, childCount)}>
                    <Feather name="plus-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Apply Button */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setGuestModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Xong</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            data={imgData}
            renderItem={renderImageItem}
            width={width}
            height={IMG_HEIGHT}
            autoPlay={true}
            autoPlayInterval={3000}
            onSnapToItem={(index) => setActiveIndex(index)}
            loop={true}
          />
          <FlatList
            images={imgData.map((img) => ({ uri: img.uri }))}
            imageIndex={selectedImageIndex}
            visible={isViewerVisible}
            onRequestClose={() => setIsViewerVisible(false)}
          />
          <View style={styles.carouselCounter}>
            <Text style={styles.counterText}>
              {activeIndex + 1}/{imgData.length}
            </Text>
          </View>
        </View>

        {/* Room Details */}
        <View style={styles.roomDetailsBox}>
          <Text style={styles.roomTitle}>Phòng có giường size Cồn Lường</Text>
          <View style={styles.roomInfoRow}>
            <Text style={styles.roomInfoText}>45m²</Text>
            <View style={styles.divider} />
            <Text style={styles.roomInfoText}>Tối đa 2 người lớn</Text>
            <View style={styles.divider} />
            <Text style={styles.roomInfoText}>1 giường lớn</Text>
            <TouchableOpacity onPress={() => setDetailModalVisible(true)}>
              <Text style={styles.detailLink}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="shower" size={24} color="black" />
              <Text style={styles.featureText}>Bồn tắm/Vòi sen riêng</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="smoking-off" size={24} color="black" />
              <Text style={styles.featureText}>Không hút thuốc</Text>
            </View>
          </View>
        </View>

        {/* Detail Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDetailModalVisible}
          onRequestClose={() => setDetailModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.detailModalContent}>
              <Text style={styles.modalHeader}>Phòng có giường King</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setDetailModalVisible(false)}
              >
                <EvilIcons name="close" size={30} color="black" />
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <FlatList
                data={dtData}
                renderItem={renderDtItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>

        {/* Booking Section */}
        <View style={styles.bookingBox}>
          <View style={styles.bookingRow}>
            <FontAwesome name="user" size={24} color="black" />
            <Text style={styles.bookingLabel}> {adultCount} người lớn</Text>
          </View>

          <FlatList
            data={vdtData}
            renderItem={renderVdtItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.vdtList}
          />

          <TouchableOpacity>
            <Text style={styles.seeDetailsLink}>Xem chi tiết</Text>
          </TouchableOpacity>

          <View style={styles.roomSelectionRow}>
            {/* Room Count Selector */}
            <TouchableOpacity
              style={styles.roomSelector}
              onPress={() => setRoomModalVisible(true)}
            >
              <View>
                <Text style={styles.roomSelectorLabel}>Số phòng</Text>
                <Text style={styles.roomCountText}>{roomCount}</Text>
              </View>
              <AntDesign name="down" size={20} color="black" />
            </TouchableOpacity>

            {/* Room Modal */}
            <RoomModal
              visible={isRoomModalVisible}
              onClose={() => setRoomModalVisible(false)}
              roomCount={roomCount}
              setRoomCount={setRoomCount}
              maxRooms={5} // Adjust as needed
            />

            {/* Book Button */}
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Đặt</Text>
            </TouchableOpacity>
          </View>
        </View>
=======

        <FlatList
          data={rooms}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
>>>>>>> demoProduct
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#fff',
  },
  container: {
    alignItems: "center",
=======
  backgroundColor: color.background_dark,
  },
  container: {
    alignItems: "center",
    justifyContent: 'center',
>>>>>>> demoProduct
    paddingVertical: 20,
  },
  dateSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
<<<<<<< HEAD
  },
  dateBox: {
    width: "48%",
    backgroundColor: "white",
=======
    backgroundColor:color.item_background_dark
  },
  dateBox: {
    width: "48%",
    backgroundColor:color.item_background_dark,
>>>>>>> demoProduct
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
<<<<<<< HEAD
=======
    color:"#ccc"
>>>>>>> demoProduct
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
<<<<<<< HEAD
    color: "#bf592b",
    marginLeft: 10,
=======
    color: color.tilte,
    marginLeft: 10,
    fontWeight:"bold"
>>>>>>> demoProduct
  },
  guestRoomBox: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  guestRoomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    color: "#bf592b",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
<<<<<<< HEAD
    backgroundColor: "white",
=======
    backgroundColor: color.item_background_dark,
>>>>>>> demoProduct
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
<<<<<<< HEAD
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalDivider: {
    backgroundColor: "#e8e8e8",
    height: 1,
    marginVertical: 10,
=======
    color:"white"
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 10,

  },
  modalDivider: {
    backgroundColor: '#888',
    height: 1,
    marginVertical: 15,
>>>>>>> demoProduct
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  modalLabel: {
    fontSize: 18,
  },
  counter: {
<<<<<<< HEAD
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
    justifyContent: "center",
  },
  counterText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    alignContent:'flex-start',
    justifyContent:'flex-start'
=======
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
>>>>>>> demoProduct
  },
  applyButton: {
    backgroundColor: "#4b47f2",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
<<<<<<< HEAD
  carouselContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
=======
  headerKindRoom:{
    backgroundColor: color.item_background_dark,
    borderColor: "#ccc",
    marginBottom: 20,
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  },
  carouselContainer: {
    width: width,
    alignItems: "center",
    borderBlockColor:"red",
    justifyContent:"center",
    marginRight:5,
    marginTop:20
>>>>>>> demoProduct
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    resizeMode: "cover",
    borderRadius: 10,
  },
<<<<<<< HEAD
  carouselCounter: {
    position: "absolute",
    bottom: 10,
    left: width / 2 - 40,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  roomDetailsBox: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  roomTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 5, 
=======

  roomDetailsBox: {
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    padding: 15,
    borderColor: "#ccc",
    marginEnd:20
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"white"
>>>>>>> demoProduct
  },
  roomInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
<<<<<<< HEAD
=======
    color:"#ccc",
    padding:7
>>>>>>> demoProduct

  },
  roomInfoText: {
    fontSize: 12.5,
    fontWeight: "600",
<<<<<<< HEAD
=======
    color:"#ccc"
>>>>>>> demoProduct
  },
  divider: {
    width: 1,
    height: 20,
<<<<<<< HEAD
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  detailLink: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
=======
    backgroundColor: "#999",
    marginHorizontal: 10,
  },
  detailLink: {

    color: color.tilte,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:20,
  },
  detailText:{
    fontSize:16,
    color:"white",

>>>>>>> demoProduct
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  featureText: {
    fontSize: 12,
<<<<<<< HEAD
  },
  detailModalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
=======
    color:"#ccc"
  },
  detailModalContent: {
    width: "90%",
    height: "50%",
    backgroundColor: color.item_background_dark,
>>>>>>> demoProduct
    borderRadius: 10,
    padding: 20,
  },
  bookingBox: {
    width: "90%",
<<<<<<< HEAD
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
=======
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
>>>>>>> demoProduct
    marginBottom: 30,
  },
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bookingLabel: {
<<<<<<< HEAD
    fontSize: 14,
    marginLeft: 10,
=======
    fontSize: 18,
    marginLeft: 10,
    color:'white',
    fontWeight:"bold"
>>>>>>> demoProduct
  },
  vdtList: {
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  vdtText: {
<<<<<<< HEAD
    fontSize: 12,
=======
    fontSize: 14,
    color:"#ccc"
>>>>>>> demoProduct
  },
  seeDetailsLink: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 10,
  },
  roomSelectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
<<<<<<< HEAD
=======
  
>>>>>>> demoProduct
  },
  roomSelector: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    borderWidth: 1,
    borderColor: "#4b47f2",
=======
    backgroundColor:'#444',
    borderWidth: 1,
>>>>>>> demoProduct
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: "space-between",
  },
  roomSelectorLabel: {
    fontSize: 14,
    fontWeight: "bold",
<<<<<<< HEAD
  },
  roomCountText: {
    fontSize: 16,
    color: "#bf592b",
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: "#4b47f2",
=======
    color:color.tilte
  },
  roomCountText: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: color.tilte,
>>>>>>> demoProduct
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: "white",
<<<<<<< HEAD
    fontSize: 16,
=======
    fontSize: 18,
>>>>>>> demoProduct
    fontWeight: "bold",
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
<<<<<<< HEAD
    backgroundColor: "#4B47F2",
=======
    backgroundColor: color.tilte,
    borderColor:"black"
>>>>>>> demoProduct
  },
  // Modal Styles
  modalOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
<<<<<<< HEAD
    borderBottomColor: "#f0f0f0",
  },
  modalOptionText: {
    fontSize: 18,
=======
    borderBottomColor: "#555",
  },
  modalOptionText: {
    fontSize: 18,
    color:"#ccc"
>>>>>>> demoProduct
  },
});

export default BookingScreen;
