import React from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, Animated} from 'react-native';
import {images} from '../Data/images.js'

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <Animated.FlatList
      data={DATA}                      // Danh sách dữ liệu 50 phần tử
      renderItem={renderItem}           // Hàm render từng item
      keyExtractor={item => item.id}    // Lấy id làm key cho mỗi item
      horizontal={true}                 // Thiết lập cuộn ngang
      showsHorizontalScrollIndicator={false} // Tắt hiển thị thanh cuộn ngang
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginHorizontal: 8, // Khoảng cách giữa các item
    alignItems: 'center', // Căn giữa nội dung trong item
    justifyContent: 'center',
    borderRadius: 10, // Bo góc cho item
  },
  title: {
    fontSize: 16,
  },
});
