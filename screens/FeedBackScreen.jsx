import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,SafeAreaView } from 'react-native';

const reviews = [
  {
    id: '1',
    title: 'Khách sạn thuận tiện',
    rating: 5,
    date: '31 tháng 2, 2025',
    description: 'Không có cảm âm, trợ kính âm, sạch sẽ, view đẹp có thể nhìn bấm kính. Nhân viên nhiệt tình thực hiện mọi nhu cầu',
    author: 'Cường',
    countryFlag: 'https://www.countryflags.io/vn/flat/64.png' // link ảnh lá cờ Việt Nam
  },
  // Thêm nhiều đánh giá khác ở đây
];

const RatingScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewTitle}>{item.title}</Text>
      <Text style={styles.rating}>R: {item.rating} ⭐</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
      <Text style={styles.reviewDescription}>{item.description}</Text>
      <View style={styles.authorContainer}>
        <Image source={{ uri: item.countryFlag }} style={styles.flagIcon} />
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần đánh giá tổng thể */}
      <View style={styles.headerContainer}>
        <Text style={styles.overallRating}>4.7/5⭐</Text>
        <Text style={styles.ratingLabel}>Tuyệt vời</Text>
        <Text style={styles.reviewCount}>6969 nhận xét</Text>
      </View>

      {/* Nút chọn sao */}
      <View style={styles.starFilterContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity key={index} style={styles.starButton}>
            <Text style={styles.starText}>{index + 1} ⭐</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách các đánh giá */}
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  overallRating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingLabel: {
    fontSize: 16,
    color: '#888',
  },
  reviewCount: {
    fontSize: 14,
    color: '#aaa',
  },
  starFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  starButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  starText: {
    fontSize: 16,
    color: '#555',
  },
  reviewContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ffcc00',
  },
  reviewDate: {
    fontSize: 14,
    marginBottom: 8,
    color: '#888',
  },
  reviewDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  flagIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  author: {
    fontSize: 14,
    color: '#333',
  },
});

export default RatingScreen;
