<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { hotelData } from '../Data/hotelData.js';
import { images } from '../Data/images.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; 
const NOTIFICATION_HEIGHT = 500;

export default function HotelScreen({navigation}) {
  const [showNotification, setShowNotification] = useState(false);
  const animatedValue = useRef(new Animated.Value(NOTIFICATION_HEIGHT)).current; 
  const fullDescription = hotelData.description;
  const [scrollY] = useState(new Animated.Value(0)); 
  const translateY = scrollY.interpolate({
    inputRange: [0, 100], 
    outputRange: [0, 100], 
=======
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, Button, ScrollView, TouchableOpacity, LogBox, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { hotelData } from '../Data/hotelData.js';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import LoadingScreen from './LoadingScreen.jsx';
import { hotelDetail } from '../handleAPI/viewAPI.js';
import { auth, db } from '../config/firebase.js';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';
import colorTheme from '../assets/color.json';
import ImageViewing from 'react-native-image-viewing';


const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width;
const NOTIFICATION_HEIGHT = 500;

export default function HotelScreen({ navigation, route }) {
  LogBox.ignoreAllLogs(true);
  const user = auth.currentUser;
  const { hotelId , hotels} = route.params;

  const hotelImages = hotels.find(hotel => hotel.id === hotelId)?.images || [];
  const formattedHotel = hotelImages.map(url => ({uri: url}));

  const [hotelierId, setHotelierId] = useState('');
  const [hotel, setHotel] = useState(null);
  const [tokenUser, setToken] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;


  const handleShowImages = (item, index) => {

    setCurrentImageIndex(index);
    setIsImageViewerVisible(true);
};
const handleHideImages = () => {
  setIsImageViewerVisible(false);
};
  const checkToken = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    setToken(Token);
  };

  const getData = async () => {
    try {
      const data = await hotelDetail(hotelId);
      return data.data.doc;

    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const res = await getData();
    console.log("Avb",res);
    setHotel(res);
    await getHotelier(res.hotelier.email);
  };

  useEffect(() => {
    fetchData();
    console.log("hotel", hotelImages);
  }, [])

  useEffect(()=>{
    console.log("currentIndex " , currentIndex)
  },[currentIndex])

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  //get user from firebase
  const getHotelier = async (email) => {
    try {
      const hotelierRef = collection(db, 'users');
      const q = query(hotelierRef, where('email', '==', email))
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setHotelierId(doc.data());
      })

    } catch (error) {
      console.log('Error from firebase: ', error);

    }
  }

  const [showNotification, setShowNotification] = useState(false);
  const animatedValue = useRef(new Animated.Value(NOTIFICATION_HEIGHT)).current;
  const [scrollY] = useState(new Animated.Value(0));
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
>>>>>>> demoProduct
    extrapolate: 'clamp',
  });

  const handleShowDescription = () => {
<<<<<<< HEAD
    setShowNotification(true);
    Animated.timing(animatedValue, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
=======
    setDetailModalVisible(true);
>>>>>>> demoProduct
  };

  const handleHideNotification = () => {
    Animated.timing(animatedValue, {
<<<<<<< HEAD
      toValue: NOTIFICATION_HEIGHT, 
=======
      toValue: NOTIFICATION_HEIGHT,
>>>>>>> demoProduct
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowNotification(false));
  };
<<<<<<< HEAD
  
  const renderAmenities = ({ item }) => (
    <View style={styles.amenityContainer}>
      <Icon name="check" size={15} color="green" />
=======

  const renderAmenities = ({ item }) => (
    <View style={styles.amenityContainer}>
      <Icon name="check" size={15} color={colorTheme.tilte} />
>>>>>>> demoProduct
      <Text style={styles.amenity}>{item}</Text>
    </View>
  );

<<<<<<< HEAD
  const renderImages = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Image', { image: item })}>
      <Image
        source={item.src}
        style={styles.image}
      />
      <Text style={styles.imageText}>{item.id}/{images.length}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true } 
=======
  const Content = () => {
    if (!hotel) {
      return (
        <LoadingScreen/>
      );
    }
    let rating;
    if (!hotel.ratingsAverage) {
      rating = 0;
    } else {
      rating = hotel.ratingsAverage.toString().slice(0, 3);
    }


    return (
      <>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
>>>>>>> demoProduct
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollImages}>
<<<<<<< HEAD
          <Animated.FlatList
            data={images}
            renderItem={renderImages}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH} 
            snapToAlignment="start"
            decelerationRate="fast"
            style={styles.horizontalFlatlist}
          />
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.nameHotel}>{hotelData.name}</Text>
          <TouchableOpacity style={styles.ratingContainer} onPress={()=>{navigation.navigate("FeedBack")}}>
            <Text style={styles.rating}>{hotelData.rating}/{hotelData.ratingScale}⭐</Text>
            <Text style={styles.ratingSubtitle}>Đánh giá từ người thuê</Text>
=======
          <Carousel
            data={hotelImages}
            width={width}
            height={200}
            autoPlay={false}
            onSnapToItem={(index) => setCurrentIndex(index)}
            useScrollView={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={()=> {
                    handleShowImages(item, index);
                  }
                }
              >
                <Image
                  source={{
                    uri: item,
                  }}
                  style={styles.image}
                  // resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />

          <View style={styles.imageIndicator}>
            <Text style={styles.imageText}>
              {currentIndex + 1}/{hotelImages.length}
            </Text>
          </View>
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.nameHotel}>{hotel.name}</Text>
          {tokenUser ? (
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat', { hotelierId })}>
              <FontAwesome name="comments" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('SignIn')}>
              <FontAwesome name="comments" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.ratingContainer} onPress={() => { navigation.navigate("FeedBack", { reviews: hotel.reviews }); }}>
            <Text style={styles.rating}>{rating} / {hotelData.ratingScale} ⭐</Text>
            <Text style={styles.ratingSubtitle}>({hotel.ratingsQuantity})</Text>
>>>>>>> demoProduct
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>Mô tả Khách Sạn</Text>
<<<<<<< HEAD
            <Button style={{ paddingLeft: 40}} title="Tìm hiểu thêm" onPress={handleShowDescription} />
          </View>
          
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              {fullDescription.substring(0, 100) + '...'} 
            </Text>
          </View>
        </View>
=======
            <TouchableOpacity>
              <Text  style={{ fontWeight:"500", fontSize:18, paddingLeft: 15 ,color:colorTheme.tilte}} onPress={handleShowDescription}>Tìm hiểu thêm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              {hotel.description.substring(0, 100) + '...'}
            </Text>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={detailModalVisible}
          onRequestClose={() => setDetailModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Mô tả phòng</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setDetailModalVisible(false)}
                  accessibilityLabel="Close description modal"
                >
                  <EvilIcons name="close" size={28} color="#ccc" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDivider} />

              <ScrollView contentContainerStyle={styles.modalBody}>
                <Text style={styles.modalDescription}>{hotel.description}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
>>>>>>> demoProduct

        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesTitle}>Tiện Nghi</Text>
          <FlatList
<<<<<<< HEAD
            data={hotelData.amenities}
            renderItem={renderAmenities}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={styles.amenitiesList} 
            scrollEnabled={true} 
          />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.headerContact}>Contact</Text>
          <View style={styles.contactOption}>
            <FontAwesome name="phone" size={24} color="green" />
            <Text style={styles.contactText}>{hotelData.contact.phone}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="envelope" size={24} color="green" />
            <Text style={styles.contactText}>{hotelData.contact.email}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="globe" size={24} color="green" />
            <Text style={styles.contactText}>{hotelData.contact.website}</Text>
          </View>
        </View>
      </Animated.ScrollView>
      
      <View style={styles.footerContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.startingPrice}>Khởi điểm:</Text>
          <Text style={styles.priceText}>{hotelData.pricePerNight} {hotelData.currency}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.buttonText}>Xem mọi phòng</Text>
        </TouchableOpacity>
      </View>

      {showNotification && (
        <Animated.View style={[styles.notificationContainer, { transform: [{ translateY: animatedValue }] }]}>
          <View style={styles.notificationHeader}>
            <Button title="x" onPress={handleHideNotification} color="#FF6347" />
            <Text style={styles.notificationTitle}>Mô tả khách sạn</Text>
          </View>
          <ScrollView style={styles.notificationText}>
            <Text>{fullDescription}</Text>
          </ScrollView>
        </Animated.View>
      )}
=======
            data={hotel.utilities}
            renderItem={renderAmenities}
            keyExtractor={(item) => item.toString()}
            estimatedItemSize={255}
            contentContainerStyle={styles.amenitiesList}
            scrollEnabled={true} />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.headerContact}>Liên hệ</Text>
          <View style={styles.contactOption}>
            <FontAwesome name="phone" size={24} color={colorTheme.tilte}/>
            <Text style={styles.contactText}>{hotel.phone}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="envelope" size={24} color= {colorTheme.tilte}/>
            <Text style={styles.contactText}>{hotel.hotelier.email}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="location-arrow" size={24} color={colorTheme.tilte} />
            <Text style={styles.contactText}>{hotel.address}</Text>
          </View>
        </View>

      </Animated.ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{hotel.price} {hotelData.currency}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking', { hotel: hotel , token:tokenUser})}>
            <Text style={styles.buttonText}>Xem mọi phòng</Text>
          </TouchableOpacity>
        </View>

        {
          showNotification && (
            <Animated.View style={[styles.notificationContainer, { transform: [{ translateY: animatedValue }] }]}>
              <View style={styles.notificationHeader}>
                <Button title="x" onPress={handleHideNotification} color="#FF6347" />
                <Text style={styles.notificationTitle}>Mô tả khách sạn</Text>
              </View>
              <ScrollView style={styles.notificationText}>
                <Text>{hotel.description}</Text>
              </ScrollView>
            </Animated.View>
          )
        }
        {isImageViewerVisible && (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <ImageViewing
                        images={formattedHotel}
                        imageIndex={currentImageIndex}
                        visible={isImageViewerVisible}
                        onRequestClose={handleHideImages}
                        swipeToCloseEnabled={true}
                        doubleTapToZoomEnabled={true}
                        animationType='fade'
                    />
                </Animated.View>
            )}
      </>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Content />
>>>>>>> demoProduct
    </SafeAreaView>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollImages: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: ITEM_WIDTH, 
=======

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colorTheme.tilte,
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: colorTheme.background_dark,
  },
  scrollImages: {
    position: 'relative',
  },
  imageContainer: {
    width: ITEM_WIDTH,
>>>>>>> demoProduct
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
<<<<<<< HEAD
    width: '100%', 
    height: 200,
    borderRadius: 5,
  },
  imageText: {
    marginTop: 10,
    position: 'absolute', 
    bottom: 10, 
    left: 10, 
    color: 'white', 
    fontWeight: 'bold',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingHorizontal: 15, 
    paddingVertical: 8,
    borderRadius: 20, 
    overflow: 'hidden', 
  },
  feedbackContainer: {
    padding: 20, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    margin: 10, 
    shadowColor: '#000', 
=======
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    padding: 20,
    backgroundColor: colorTheme.item_background_dark,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
>>>>>>> demoProduct
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
<<<<<<< HEAD
    shadowRadius: 4, 
    elevation: 3, 
    alignItems: 'flex-start', 
=======
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
>>>>>>> demoProduct
  },
  nameHotel: {
    fontSize: 24,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: '#333',
=======
    color: 'white',
>>>>>>> demoProduct
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    marginTop: 5, 
=======
    marginTop: 5,
>>>>>>> demoProduct
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: '#ffcc00', 
    marginRight: 5,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#666', 
  },
  descriptionContainer: {
    padding: 10, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    margin: 10, 
    shadowColor: '#000', 
=======
    color: '#ffcc00',
    marginRight: 5,
  },
  ratingSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: colorTheme.item_background_dark,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
>>>>>>> demoProduct
    shadowOffset: {
      width: 0,
      height: 2,
    },
<<<<<<< HEAD
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, 
    alignItems: 'flex-start', 
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  
=======
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
>>>>>>> demoProduct
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
<<<<<<< HEAD
    paddingRight:60,
  },
  descriptionTextContainer: {
    maxHeight: 80, 
=======
    paddingRight: 60,
    color:'white'
  },
  descriptionTextContainer: {
    maxHeight: 80,
>>>>>>> demoProduct
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
<<<<<<< HEAD
    color: '#333',
  },
  notificationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 20,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5, 
    justifyContent: 'center',
  },
  notificationText: {
    marginTop: 10,
    color: '#333',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, 
    width: '100%',
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', 
    flex: 1,
  },
  amenitiesContainer: {
    padding: 10, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    margin: 10, 
    shadowColor: '#000', 
=======
    color: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: width * 0.95,
    maxHeight: height * 0.95,
    backgroundColor: colorTheme.background_dark,
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color:"white"
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,  
  },

  modalDivider: {
    backgroundColor: '#888',
    height: 1,
    marginVertical: 15,
  },
  modalBody: {
    paddingBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color:'#ccc',
    lineHeight: 22,
  },
  amenitiesContainer: {
    padding: 10,
    backgroundColor: colorTheme.item_background_dark,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
>>>>>>> demoProduct
    shadowOffset: {
      width: 0,
      height: 2,
    },
<<<<<<< HEAD
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, 
    maxHeight: 200, 
  },
  amenitiesTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 5, 
  },
  amenitiesList: {
    paddingVertical: 5, 
  },
  amenityContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 5, 
  },
  amenity: {
    marginLeft: 5,
    fontSize: 16, 
    color: '#333', 
  },
  contactContainer: {
    flexDirection: 'column', 
    padding: 20, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    margin: 10, 
    shadowColor: '#000', 
=======
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 200,
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 60,
    color:'white'
  },
  amenitiesList: {
    paddingVertical: 5,
    color:'white'

  },
  amenityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  amenity: {
    marginLeft: 5,
    fontSize: 16,
    color: '#ccc',
  },
  contactContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colorTheme.item_background_dark,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
>>>>>>> demoProduct
    shadowOffset: {
      width: 0,
      height: 2,
    },
<<<<<<< HEAD
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  contactOption: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 10, 
=======
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
>>>>>>> demoProduct
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    backgroundColor: '#007BFF', 
    borderRadius: 5, 
    padding: 10, 
    width: '100%', 
  },
  contactButtonText: {
    color: '#fff', 
    marginLeft: 5, 
    fontWeight: 'bold', 
  },
  contactText: {
    fontSize: 16, 
    color: '#333', 
    marginLeft: 10, 
=======
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  contactText: {
    fontSize: 16,
    color: '#ccc',
    marginLeft: 10,
>>>>>>> demoProduct
  },
  headerContact: {
    fontSize: 20,
    fontWeight: 'bold',
<<<<<<< HEAD
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fff', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    shadowColor: '#000', 
=======
    paddingRight: 60,
    color:'white'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: colorTheme.item_background_dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
>>>>>>> demoProduct
    shadowOffset: {
      width: 0,
      height: -2,
    },
<<<<<<< HEAD
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  priceContainer: {
    // Added missing priceContainer style
  },
  startingPrice: {
    fontSize: 14, 
    color: '#333', 
  },
  priceText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'red', 
  },
  button: {
    backgroundColor: '#007BFF', 
    borderRadius: 150,
    padding: 20,
    width: '45%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
  },
=======
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  },
  startingPrice: {
    fontSize: 14,
    color: 'white',
    paddingBottom:5
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorTheme.tilte,
  },
  button: {
    backgroundColor: colorTheme.tilte,
    borderRadius: 150,
    padding: 20,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
>>>>>>> demoProduct
});
