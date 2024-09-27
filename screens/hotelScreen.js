import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {hotelData} from '../Data/hotelData.js';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; 
const NOTIFICATION_HEIGHT = 500;

export default function HotelScreen() {
  const [showNotification, setShowNotification] = useState(false);
  const animatedValue = useRef(new Animated.Value(NOTIFICATION_HEIGHT)).current; 
  const fullDescription = hotelData.description;
  const images = hotelData.imagesHotel;
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
    <View style={styles.amenityContainer }>
        <Icon name="check" size={15} color="green" />
         <Text style={styles.amenity}>{item}</Text>
    </View>
   
  )


  const renderImages = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={item.src}
        style={styles.image}
      />
      <Text style={styles.imageText}>{item.id}/{images.length}</Text>
    </View>
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
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{hotelData.rating}/{hotelData.ratingScale}⭐</Text>
          <Text style={styles.ratingSubtitle}>Đánh giá từ người thuê</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionHeader}>
          <Text style={styles.descriptionTitle}>Mô tả Khách Sạn</Text>
          <Button style = {{}} title="Tìm hiểu thêm" onPress={handleShowDescription} />
        </View>
        
        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText}>
            {fullDescription.substring(0, 100) + '...'} 
          </Text>
        </View>
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
        <Text style = {styles.headerContact}>Contact</Text>
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
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xem mọi phòng</Text>
        </TouchableOpacity>
    </View>


  
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
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 3, // Độ nổi trên Android
    alignItems: 'flex-start', // Căn chỉnh các phần tử về bên trái
  },
  nameHotel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Khoảng cách trên giữa tên khách sạn và đánh giá
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffcc00', // Màu vàng cho đánh giá
    marginRight: 5,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#666', // Màu xám cho văn bản phụ
  },
  descriptionContainer: {
    padding: 10, // Khoảng cách bên trong
    backgroundColor: 'white', // Nền trắng cho feedback
    borderRadius: 10, // Bo góc cho khung feedback
    margin: 10, // Khoảng cách giữa các thành phần
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 3, // Độ nổi trên Android
    alignItems: 'flex-start', // Căn chỉnh các phần tử về bên trái
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Tạo khoảng cách giữa tiêu đề và nút
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionTextContainer: {
    maxHeight: 80, // Giới hạn chiều cao của vùng văn bản
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
    borderTopLeftRadius: 20, // Bo góc trên trái
    borderTopRightRadius: 20, // Bo góc trên phải
    padding: 20,
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 5, // Độ nổi trên Android
    justifyContent: 'center',
  },
  notificationText: {
    marginTop: 10, // Khoảng cách trên cho văn bản
    color: '#333',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // Khoảng cách giữa tiêu đề và văn bản mô tả
    width: '100%',
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa cho tiêu đề
    flex: 1, // Căn cho tiêu đề chiếm toàn bộ chiều rộng còn lại
  },
 amenitiesContainer: {
    padding: 10, // Giảm khoảng cách bên trong
    backgroundColor: '#f9f9f9', // Màu nền nhạt cho phần tiện nghi
    borderRadius: 10, // Bo góc cho khung
    margin: 10, // Khoảng cách giữa các thành phần
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 3, // Độ nổi trên Android
    maxHeight: 200, // Giới hạn chiều cao tối đa
  },
  amenitiesTitle: {
    fontSize: 20, // Kích thước chữ tiêu đề nhỏ hơn
    fontWeight: 'bold', // Chữ đậm
    marginBottom: 5, // Khoảng cách dưới tiêu đề
  },
  amenitiesList: {
    paddingVertical: 5, // Khoảng cách dọc cho danh sách
  },
  amenityContainer: {
    flexDirection: 'row', // Vẫn giữ hàng cho từng tiện nghi
    alignItems: 'center',
    marginBottom: 5, // Giảm khoảng cách giữa các tiện nghi
  },
  amenity: {
    marginLeft: 5,
    fontSize: 16, // Kích thước chữ cho tên tiện nghi nhỏ hơn
    color: '#333', // Màu chữ
  },

  contactContainer: {
    flexDirection: 'column', // Căn chỉnh theo cột
    padding: 20, // Khoảng cách bên trong
    backgroundColor: '#f8f9fa', // Nền màu sáng
    borderRadius: 10, // Bo góc cho khung
    margin: 10, 
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 3, // Độ nổi trên Android
  },
  contactOption: {
    flexDirection: 'row', // Căn chỉnh icon và text theo hàng
    alignItems: 'center',
    marginVertical: 10, // Khoảng cách dọc giữa các lựa chọn
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF', 
    borderRadius: 5, // Bo góc cho nút
    padding: 10, // Khoảng cách bên trong nút
    width: '100%', // Chiều rộng của nút
  },
  contactButtonText: {
    color: '#fff', // Màu chữ trắng
    marginLeft: 5, // Khoảng cách bên trái cho chữ
    fontWeight: 'bold', // Chữ đậm
  },
  contactText: {
    fontSize: 16, 
    color: '#333', // Màu chữ
    marginLeft: 10, // Khoảng cách bên trái cho chữ
  },
  headerContact:{
    fontSize: 20,
    fontWeight: 'bold',
  },

  footerContainer: {
    padding: 20,
    backgroundColor: '#fff', // Nền trắng

    flexDirection: 'row', // Sắp xếp theo hàng
    justifyContent: 'space-between', // Tạo khoảng cách giữa các thành phần
    alignItems: 'center', // Căn giữa theo chiều dọc
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
        width: 0,
        height: -2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Đường kính của bóng
    elevation: 5, // Độ nổi trên Android
  },
  startingPrice: {
    fontSize: 14, // Kích thước chữ nhỏ hơn cho "Khởi điểm"
    color: '#333', // Màu chữ tối
},

priceText: {
    fontSize: 24, // Kích thước chữ lớn cho giá
    fontWeight: 'bold',
    color: 'red', // Màu chữ đỏ
},

button: {
    backgroundColor: '#007BFF', // Màu nền xanh cho nút
    borderRadius: 150,
    padding: 20,
    width: '45%', 
    alignItems: 'center',
},

buttonText: {
    color: '#fff', // Màu chữ trắng
    fontWeight: 'bold',
    fontSize:15,
},

});
