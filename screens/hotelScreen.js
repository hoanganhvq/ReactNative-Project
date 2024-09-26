import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon đúng cách

import {hotelData} from '../Data/hotelData.js';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; // Chiều rộng của từng mục ảnh
const NOTIFICATION_HEIGHT = 500; // Chiều cao của notification

export default function HotelScreen() {
  const [showNotification, setShowNotification] = useState(false);
  const animatedValue = useRef(new Animated.Value(NOTIFICATION_HEIGHT)).current; // Giá trị ban đầu nằm ngoài màn hình
  const fullDescription = hotelData.description;
    const images = hotelData.images;


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
      toValue: NOTIFICATION_HEIGHT, // Di chuyển xuống ngoài màn hình
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowNotification(false));
  };
  
  const renderAmenities = ({ item }) => (
    <View style={styles.amenityContainer }>
        <Icon name="check" size={20} color="green" />
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
      <View style={styles.scrollImages}>
        <Animated.FlatList
          data={images}
          renderItem={renderImages}
          keyExtractor={item => item.id.toString()} // Đảm bảo key là chuỗi
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH} // Cuộn theo từng mục ảnh
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

    <View style={styles.AmentitiesContainerContainer}>
    <Text style={styles.AmentitiesContainer}>Tiện Nghi</Text>
    <FlatList
        data={hotelData.amenities}
        renderItem={renderAmenities}
        keyExtractor={(item) => item.toString()}
        horizontal={true} // Để hiển thị theo hàng
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        contentContainerStyle={styles.amenitiesList} // Bố cục cho danh sách tiện nghi
    />
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
    width: ITEM_WIDTH, // Đảm bảo chiều rộng của mỗi ảnh phù hợp với màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Chiếm 100% chiều rộng của container
    height: 200,
    borderRadius: 5,
  },
  imageText: {
    marginTop: 10,
    position: 'absolute', // Đặt văn bản trên ảnh
    bottom: 10, // Cách đáy của ảnh 10px
    left: 10, // Cách trái của ảnh 10px
    color: 'white', // Màu chữ trắng để nổi bật
    fontWeight: 'bold',
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Nền xám mờ để dễ đọc hơn
    paddingHorizontal: 15, // Khoảng trống ngang lớn hơn
    paddingVertical: 8, // Khoảng trống dọc lớn hơn
    borderRadius: 20, // Bo góc khung chữ để tạo khung tròn hơn
    overflow: 'hidden', // Ẩn các phần bị tràn khỏi viền bo góc
  },
  feedbackContainer: {
    padding: 20, // Khoảng cách bên trong
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
  tienNghiContainer: {
    padding: 15, // Khoảng cách bên trong
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
  },
  tienNghiTitle: {
    fontSize: 24, // Kích thước chữ tiêu đề
    fontWeight: 'bold', // Chữ đậm
    marginBottom: 10, // Khoảng cách dưới tiêu đề
  },
  amenitiesList: {
    flexDirection: 'row', // Sắp xếp theo hàng
    paddingVertical: 5, // Khoảng cách dọc cho danh sách
  },
  amenityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15, // Khoảng cách giữa các tiện nghi
    padding: 10, // Khoảng cách bên trong
    backgroundColor: '#ffffff', // Nền trắng cho mỗi tiện nghi
    borderRadius: 8, // Bo góc cho khung tiện nghi
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 2, // Đường kính của bóng
    elevation: 1, // Độ nổi trên Android
  },
  amenity: {
    marginLeft: 5, // Khoảng cách bên trái của tên tiện nghi
    fontSize: 16, // Kích thước chữ cho tên tiện nghi
    color: '#333', // Màu chữ
  },
});
