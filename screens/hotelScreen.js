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
    extrapolate: 'clamp',
  });

  const handleShowDescription = () => {
    setShowNotification(true);
    Animated.timing(animatedValue, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
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
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollImages}>
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
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>Mô tả Khách Sạn</Text>
            <Button style={{ paddingLeft: 40}} title="Tìm hiểu thêm" onPress={handleShowDescription} />
          </View>
          
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              {fullDescription.substring(0, 100) + '...'} 
            </Text>
          </View>
        </View>

        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesTitle}>Tiện Nghi</Text>
          <FlatList
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
    </SafeAreaView>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
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
    paddingRight:60,
  },
  descriptionTextContainer: {
    maxHeight: 80, 
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
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
});
