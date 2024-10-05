import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { hotelData } from '../Data/hotelData';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
const reviews = [
  {
    id: '1',
    title: 'Khách sạn thuận tiện',
    rating: 5,
    date: '31 tháng 2, 2025',
    description: 'Không có cảm âm, trợ kính âm, sạch sẽ, view đẹp có thể nhìn bấm kính. Nhân viên nhiệt tình thực hiện mọi nhu cầu',
    author: 'Cường',
    countryFlag: 'https://www.countryflags.io/vn/flat/64.png', // Link ảnh lá cờ Việt Nam
  },
  {
    id: '2',
    title: 'Dịch vụ tốt',
    rating: 4,
    date: '28 tháng 2, 2025',
    description: 'Phòng sạch sẽ và nhân viên phục vụ tận tình. Rất đáng để quay lại.',
    author: 'Lan',
    countryFlag: 'https://www.countryflags.io/vn/flat/64.png',
  },
];

export default function RatingScreen() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const handleStarPress = (rating) => {
    setSelectedRating(rating);
    if (rating === selectedRating) {
      setFilteredReviews(reviews);
      setSelectedRating(null);
    } else {
      const filtered = reviews.filter(review => review.rating === rating);
      setFilteredReviews(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <Icon 
              key={index} 
              name="star" 
              size={16} 
              color={index < item.rating ? '#FFD700' : '#CCCCCC'} 
              style={styles.starIcon}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>{item.date}</Text>
      <Text style={styles.reviewDescription}>{item.description}</Text>
      <View style={styles.authorContainer}>
        <Image 
          source={{ uri: item.countryFlag }} 
          style={styles.flagIcon} 
        />
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </View>
  );

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Đánh giá</Text>
        </View>

        <View style={styles.overallRatingContainer}>
          <Text style={styles.averageRating}>{hotelData.rating}/5</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <Icon 
                key={index} 
                name="star" 
                size={24} 
                color={index < Math.round(calculateAverageRating()) ? '#FFD700' : '#CCCCCC'} 
                style={styles.starIcon}
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>{reviews.length} nhận xét</Text>
        </View>

        <View style={styles.starFilterContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.starButton, 
                selectedRating === index + 1 && styles.selectedStarButton
              ]}
              onPress={() => handleStarPress(index + 1)}
            >
              <Icon 
                name="star" 
                size={24} 
                color={selectedRating === index + 1 ? '#FFD700' : '#CCCCCC'} 
              />
              <Text style={styles.starLabel}>{index + 1} ⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredReviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reviewsList}
          ListEmptyComponent={
            <Text style={styles.noReviewsText}>
              {selectedRating 
                ? `Không có đánh giá nào với ${selectedRating} ⭐` 
                : 'Không có đánh giá nào.'}
            </Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  overallRatingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  reviewCount: {
    fontSize: 16,
    color: '#666',
  },
  starFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  starButton: {
    alignItems: 'center',
  },
  selectedStarButton: {
    backgroundColor: '#FFE58F',
    borderRadius: 10,
    padding: 5,
  },
  starLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 14,
    color: '#999',
    marginVertical: 4,
  },
  reviewDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  author: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
