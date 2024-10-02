import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { hotelData } from '../Data/hotelData.js'; 
import { MasonryFlashList } from '@shopify/flash-list';

const width = Dimensions.get('window').width;
const ITEM_WIDTH = width / 2 - 15;
const images = hotelData.images.imageHotel;
export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const updateSearch = (query) => setSearchQuery(query);

  const [scrollY] = useState(new Animated.Value(0)); // Sử dụng Animated.Value để theo dõi vị trí cuộn

  // Tạo một giá trị translateY dựa trên vị trí cuộn để ẩn dần chữ "Khám Phá"
  const translateY = scrollY.interpolate({
    inputRange: [0, 100], // Giới hạn cuộn (0 là ở trên cùng, 100 là khi đã cuộn xuống)
    outputRange: [0, 100], // Tại vị trí 0, "Khám Phá" hiển thị bình thường, tại vị trí 100 nó ẩn đi
    extrapolate: 'clamp',
  });

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horiziontalItem}>
      <Image source={item.src} style={styles.image}/>
      <Text style={styles.text}>{item.name}</Text> 
    </View>
  );

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
        clearIcon={{ size: 24, color: 'gray' }}
      />
     

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true } // Sử dụng Native Driver để cải thiện hiệu suất
        )}
        scrollEventThrottle={16}
      >
         <Text style={{ fontSize: 20 }}>Khám Phá</Text>
        <Animated.FlatList
          data={images}
          renderItem={renderHorizontalItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          style={styles.horizontalFlatlist}
        />
        
        <Text style={{ fontSize: 20 }}>Nổi bật</Text>
        
        <MasonryFlashList
          data={images}
          renderItem={renderVerticalItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.verticalFlatlist}
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
