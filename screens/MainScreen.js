import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions,ScrollView,FlatList  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { images } from '../Data/images.js'; // Đảm bảo dữ liệu images được nhập chính xác
import { MasonryFlashList } from '@shopify/flash-list';

const width = Dimensions.get('window').width; // Lấy chiều rộng của màn hình
const ITEM_WIDTH = width / 2 - 15; // Để có khoảng cách giữa các item

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho truy vấn tìm kiếm
  const updateSearch = (query) => setSearchQuery(query); // Cập nhật truy vấn tìm kiếm

  const [isScrollingVertically, setIsScrollingVertically] = useState(false); // Trạng thái kiểm tra cuộn dọc

  // Hàm gọi khi bắt đầu cuộn dọc
  const handleScrollVertical = () => {
    setIsScrollingVertically(true);
  };

  // Hàm gọi khi kết thúc cuộn dọc
  const handleScrollEnd = () => {
    setIsScrollingVertically(false);
  };

  // Render item cho FlatList ngang
  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horiziontalItem}>
      <Image source={item.src} style={styles.image}/>
      <Text style={styles.text}>{item.name}</Text> 
    </View>
  );

  // Render item cho FlatList dọc
  const renderVerticalItem = ({ item }) => (
    <View style={styles.verticalItem}>
      <Image source={item.src} style={styles.image} /> 
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image source={require('../assets/Avatar.jpg')} style={styles.avatar} /> 
        <Text style={styles.text}>Test</Text>
      </View>

      <SearchBar
        placeholder="Tìm kiếm..."
        onChangeText={updateSearch}
        value={searchQuery}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
        searchIcon={{ size: 24, color: 'gray' }}
        inputStyle={styles.inputStyle}
      />

      <View>
        <Text style={{ fontSize: 20 }}>Khám Phá</Text>
      </View>

      <Animated.ScrollView
        onScrollBeginDrag={handleScrollVertical} // Bắt đầu cuộn
        onScrollEndDrag={handleScrollEnd} // Kết thúc cuộn
        scrollEventThrottle={16} // Tần suất cập nhật sự kiện cuộn
      >
        {!isScrollingVertically && (
          <Animated.FlatList
            data={images} 
            renderItem={renderHorizontalItem} // Sử dụng hàm render cho item ngang
            keyExtractor={item => item.id} // Khóa cho mỗi item
            horizontal={true} // Thiết lập FlatList cuộn ngang
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
           decelerationRate="fast"
            style={styles.horizontalFlatlist}
          />
        )}

        <MasonryFlashList
          data={images}
          renderItem={renderVerticalItem} // Sử dụng hàm render cho item dọc
          keyExtractor={item => item.id} // Khóa cho mỗi item
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
          numColumns={2} // Thiết lập số cột cho FlatList
          contentContainerStyle={styles.verticalFlatlist} // Style cho nội dung FlatList

        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
    padding: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginVertical: 16,
  },
  searchBarInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 0,
  },
  inputStyle: {
    padding: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginTop: 1,
  },
  image: {
    width: ITEM_WIDTH * 1,  
    height: 200,  
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: 8, // Khoảng cách giữa các item
    alignItems: 'center', // Căn giữa nội dung trong item
    justifyContent: 'center',
  },
  imageIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  horizontalFlatList: {
    height: 100, 
    marginBottom: 20, // Khoảng cách dưới FlatList ngang
  },
  horizontalItem: {
    width: width * 0.8, // Chiều rộng item ngang
    height: 80, // Chiều cao item ngang
    backgroundColor: '#f9c2ff', // Màu nền cho item ngang
    marginHorizontal: 10, // Khoảng cách giữa các item ngang
    justifyContent: 'center', // Căn giữa nội dung trong item
    alignItems: 'center', // Căn giữa nội dung trong item
    borderRadius: 10, // Bo góc cho item ngang
  },
  verticalFlatList: {
    paddingHorizontal: 20, // Padding cho FlatList dọc
  },
verticalItem: {
     flex: 1, // Tự động điều chỉnh chiều cao
    backgroundColor: '#d3f9c2', // Màu nền cho item dọc
    margin: 5, // Khoảng cách giữa các item dọc
    justifyContent: 'center', // Căn giữa nội dung trong item
    alignItems: 'center', // Căn giữa nội dung trong item
    borderRadius: 10, // Bo góc cho item dọc
},

});
