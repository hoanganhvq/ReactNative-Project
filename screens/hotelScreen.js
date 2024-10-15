import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, Button, ScrollView, TouchableOpacity, LogBox, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { hotelData } from '../Data/hotelData.js';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { hotelDetail } from '../handleAPI/viewAPI.js';
import { auth, db } from '../config/firebase.js';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';


const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width;
const NOTIFICATION_HEIGHT = 500;

export default function HotelScreen({ navigation, route }) {
  LogBox.ignoreAllLogs(true);
  const user = auth.currentUser;
  const { hotelId } = route.params;
  // const [hotelier, setHotelier] = useState('');
  const [hotelierId, setHotelierId] = useState('');
  const [hotel, setHotel] = useState(null);
  const [tokenUser, setToken] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setHotel(res);
    await getHotelier(res.hotelier.email);
  };

  useEffect(() => {
    fetchData();
  }, [])

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
        // console.log('Token: ', doc.data());
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
    extrapolate: 'clamp',
  });

  const handleShowDescription = () => {
    setDetailModalVisible(true);
  };

  const handleHideNotification = () => {
    Animated.timing(animatedValue, {
      toValue: NOTIFICATION_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowNotification(false));
  };

  const renderAmenities = ({ item }) => (
    <View style={styles.amenityContainer}>
      <Icon name="check" size={15} color="green" />
      <Text style={styles.amenity}>{item}</Text>
    </View>
  );

  const renderImages = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Image', { image: hotel.images, room: hotel.rooms })}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${item}`
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.imageText}>{currentIndex}/{hotel.images.length}</Text>
    </TouchableOpacity>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index + 1); // Set currentIndex based on the visible item
    }
  }).current;

  const Content = () => {
    if (!hotel) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
    let rating;
    if (!hotel.ratingsAverage) {
      rating = 0;
    } else {
      rating = hotel.ratingsAverage.toString().slice(0, 3);
    }


    return (
      <><Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollImages}>
          <Carousel
            loop
            width={width}
            height={200}
            autoPlay={false}
            data={hotel.images}
            onSnapToItem={(index) => setCurrentIndex(index)}
            scrollAnimationDuration={1000}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() =>
                  navigation.navigate('Image', {
                    image: hotel.images,
                    room: hotel.rooms,
                  })
                }
              >
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${item}`,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
          <View style={styles.imageIndicator}>
            <Text style={styles.imageText}>
              {currentIndex + 1}/{hotel.images.length}
            </Text>
          </View>
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.nameHotel}>{hotel.name}</Text>
          {tokenUser ? (
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('ChatRoom', { hotelierId })}>
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
            <Text style={styles.rating}>{rating}/{hotelData.ratingScale}⭐</Text>
            <Text style={styles.ratingSubtitle}>({hotel.ratingsQuantity})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>Mô tả Khách Sạn</Text>
            <Button style={{ paddingLeft: 40 }} title="Tìm hiểu thêm" onPress={handleShowDescription} />
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
                  <EvilIcons name="close" size={28} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDivider} />

              <ScrollView contentContainerStyle={styles.modalBody}>
                <Text style={styles.modalDescription}>{hotel.description}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesTitle}>Tiện Nghi</Text>
          <FlatList
            data={hotel.utilities}
            renderItem={renderAmenities}
            keyExtractor={(item) => item.toString()}
            estimatedItemSize={255}
            contentContainerStyle={styles.amenitiesList}
            scrollEnabled={true} />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.headerContact}>Contact</Text>
          <View style={styles.contactOption}>
            <FontAwesome name="phone" size={24} color="green" />
            <Text style={styles.contactText}>{hotel.phone}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="envelope" size={24} color="green" />
            <Text style={styles.contactText}>{hotel.hotelier.email}</Text>
          </View>
          <View style={styles.contactOption}>
            <FontAwesome name="location-arrow" size={24} color="green" />
            <Text style={styles.contactText}>{hotel.address}</Text>
          </View>
        </View>

      </Animated.ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.startingPrice}>Khởi điểm:</Text>
            <Text style={styles.priceText}>{hotel.price} {hotelData.currency}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking', { rooms: hotel.rooms })}>
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
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Content />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
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
    backgroundColor: '#fff',
  },
  scrollImages: {
    position: 'relative',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
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
    backgroundColor: 'white',
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
    alignItems: 'flex-start',
  },
  nameHotel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 60,
  },
  descriptionTextContainer: {
    maxHeight: 80,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
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
    backgroundColor: '#fff',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalDivider: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginVertical: 15,
  },
  modalBody: {
    paddingBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  amenitiesContainer: {
    padding: 10,
    backgroundColor: 'white',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  headerContact: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {},
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
});
