import React, { useState } from "react";
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
import ImageViewing from "react-native-image-viewing";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import vdtData from "../Data/vdtData.js";
import color from "../assets/color.json";


const { width } = Dimensions.get("window");
const IMG_WIDTH = width * 0.9;
const IMG_HEIGHT = IMG_WIDTH * 0.5;

// Reusable RoomModal Component
const RoomModal = ({
  visible,
  onClose,
  roomCount,
  setRoomCount,
  maxRooms = 5, 
}) => {
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
            <EvilIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.modalDivider} />

          <FlatList
            data={roomOptions}
            renderItem={renderOption}
            keyExtractor={(item, index) => index.toString()}
          />
          
        </View>
      </View>
    </Modal>
  );
};

const BookingScreen = ({ navigation, route }) => {
  const { hotel, token } = route.params;
  const hotelData = hotel;
  const rooms = hotel.rooms;
  // Date Picker States
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [formattedCheckIn, setFormattedCheckIn] = useState("");
  const [formattedCheckOut, setFormattedCheckOut] = useState("");

  // Modal States
  const [isRoomModalVisible, setRoomModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  // Guest Counts
  const [roomCount, setRoomCount] = useState(1);

  // Carousel States
  const [activeIndex, setActiveIndex] = useState(0);


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

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const showDatePickerMode = (mode, pickerType) => {
    setShowDatePicker(true);
    setCurrentPicker(pickerType);
  };


  // Render Functions
  const renderVdtItem = ({ item }) => (
    <View style={styles.iconRow}>
      <AntDesign name="check" size={20} color={color.tilte} />
      <Text style={styles.vdtText}>  {item.txt}</Text>
    </View>
  );

  const renderDetailItem = ({ item }) => (
    <Text style={styles.detailText}>{item}</Text>
  );


  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => {
        setSelectedImageIndex(index);
        setIsViewerVisible(true);
      }}
    >
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
        <View style={styles.dateSelectionContainer}>
          {/* Check-In Date */}
          <View style={styles.dateBox}>
            <Text style={styles.label}>Ngày nhận phòng</Text>

            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => showDatePickerMode("date", "checkIn")}
            >
              <MaterialCommunityIcons name="calendar" size={22} color={color.tilte} />
              <Text style={styles.dateText}>{formattedCheckIn || "Chọn ngày"}</Text>
            </TouchableOpacity>
            
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
              <MaterialCommunityIcons name="calendar" size={22} color={color.tilte} />
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


        <FlatList
          data={rooms}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  backgroundColor: color.background_dark,
  },
  container: {
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 20,
  },
  dateSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
    backgroundColor:color.item_background_dark
  },
  dateBox: {
    width: "48%",
    backgroundColor:color.item_background_dark,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color:"#ccc"
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: color.tilte,
    marginLeft: 10,
    fontWeight:"bold"
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
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
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
  },
  roomInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    color:"#ccc",
    padding:7

  },
  roomInfoText: {
    fontSize: 12.5,
    fontWeight: "600",
    color:"#ccc"
  },
  divider: {
    width: 1,
    height: 20,
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
    color:"#ccc"
  },
  detailModalContent: {
    width: "90%",
    height: "50%",
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    padding: 20,
  },
  bookingBox: {
    width: "90%",
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
    marginBottom: 30,
  },
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bookingLabel: {
    fontSize: 18,
    marginLeft: 10,
    color:'white',
    fontWeight:"bold"
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
    fontSize: 14,
    color:"#ccc"
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
  
  },
  roomSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:'#444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: "space-between",
  },
  roomSelectorLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color:color.tilte
  },
  roomCountText: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: color.tilte,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: color.tilte,
    borderColor:"black"
  },
  // Modal Styles
  modalOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  modalOptionText: {
    fontSize: 18,
    color:"#ccc"
  },
});

export default BookingScreen;
