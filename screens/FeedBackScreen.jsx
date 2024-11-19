import React, { useState, useLayoutEffect ,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, TextInput,
  Alert
} from 'react-native';
import { hotelData } from '../Data/hotelData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import color from '../assets/color.json';
import { hotelDetail, createReviewForHotel } from '../handleAPI/viewAPI.js';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase';
import LoadingScreen from './LoadingScreen';

export default function RatingScreen({ route, navigation }) {
  const { hotelId, tokenUser, rating } = route.params;
  const [reviews, setReviews] = useState(null)
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState(null);
  const [newReview, setNewReview] = useState('');  // Feedback input
  const [newRating, setNewRating] = useState(0);   // Rating input
  const [newTitle, setNewTitle] = useState(''); //
  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <Icon
                name="arrow-back" 
                size={29}
                color="#fff" 
                style={{ marginLeft: 5 }} 
                onPress={() => navigation.goBack()} 
            />
        ),
        headerStyle: {
            backgroundColor: color.background_dark, 
        },
        headerTintColor: 'white',
    });
}, [navigation]);

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
  console.log("Avb", res.reviews);
  setFilteredReviews(res.reviews);
  setReviews(res.reviews);
};

useEffect(() => {
  fetchToken();
  fetchData();
}, [])


const fetchToken = async () => {
  const storedToken = await AsyncStorage.getItem('userToken');
  if (!storedToken) {
    return;
  } else {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user is currently");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.name);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      setToken(storedToken);
    }
  }

};

React.useEffect(() => {
  navigation.addListener('focus', () => {
    fetchToken();
  })
}, []);

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

  const handleSubmitReview = async() => {
    // if (newReview && newRating) {
    //   const newReviewData = {
    //     id: Math.random().toString(),
    //     title: 'New Review',
    //     rating: newRating,
    //     review: newReview,
    //     createAt: new Date(),
    //     user: {
    //       name: 'Phan Hoang Anh',
    //       photo: 'default_photo.png'
    //     }
    //   };
    //   setFilteredReviews([...reviews, newReviewData]);
    //   setNewReview('');
    //   setNewRating(0);  // Reset after submit
    // }

    if (newReview && newRating) {
      try {
        console.log('token: ',tokenUser);
        console.log('hotelId: ',hotelId);
        console.log('newReview',newReview);
        console.log('newRating',newRating);
        console.log('newtitle',newTitle);
        await createReviewForHotel(tokenUser,hotelId, newTitle, newReview, newRating);
        Alert.alert('Review submitted successfully!');
        fetchData();
        setNewRating();
        setNewReview('');
        setNewTitle('');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color={index < item.rating ? '#FFD700' : '#CCCCCC'}
              style={styles.starIcon}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>{item.createAt.toLocaleString().slice(0, 10)}</Text>
      <Text style={styles.reviewDescription}>{item.review}</Text>
      <View style={styles.authorContainer}>
        <Image
          source={{ uri: `https://github.com/JINO25/IMG/raw/master/user/${item.user.photo}` }}
          style={styles.flagIcon}
        />
        <Text style={styles.author}>{item.user.name}</Text>
      </View>
    </View>
  );

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };
  if(!reviews){
    return <LoadingScreen/>
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>


        <View style={styles.overallRatingContainer}>
          <Text style={styles.averageRating}>{rating}/5</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesome
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
              <FontAwesome
                name="star"
                size={24}
                color={selectedRating === index + 1 ? '#FFD700' : '#CCCCCC'}
              />
              <Text style={styles.starLabel}>{index + 1} ⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tokenUser &&<View style={styles.newReviewContainer}>
          <Text style={styles.newReviewTitle}>Thêm Đánh Giá </Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity key={index} onPress={() => setNewRating(index + 1)}>
                <FontAwesome
                  name="star"
                  size={30}
                  color={index < newRating ? '#FFD700' : '#CCCCCC'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput 
            placeholder='Tiêu đề'
            style={styles.titlefeedbackInput}
            placeholderTextColor="white"
    
            value={newTitle}
            onChangeText={setNewTitle}
          >
            
          </TextInput>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Viết phản hồi của bạn..."
            placeholderTextColor="white"
            multiline
            value={newReview}
            onChangeText={setNewReview}
          />
          <TouchableOpacity style={styles.openButton} onPress={handleSubmitReview}>
            <Text style={styles.openButtonText}>Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>}


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
    backgroundColor: color.background_dark,
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
    padding: 15,
    backgroundColor: color.item_background_dark, // Darker background for better contrast
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
   
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
    backgroundColor: color.item_background_dark,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  starButton: {
    alignItems: 'center',
  },
  selectedStarButton: {
    backgroundColor: color.tilte,
    borderRadius: 10,
    padding: 5,
  },
  starLabel: {
    marginTop: 4,
    fontSize: 14,
    color: 'white',
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  reviewCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: color.item_background_dark,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
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
    color: color.tilte,
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 14,
    color: '#aaa',
    marginVertical: 4,
  },
  reviewDescription: {
    fontSize: 16,
    color: 'white',
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  newReviewContainer: {
    padding: 16,
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  newReviewTitle: {
    fontSize: 18,
    color: color.tilte,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titlefeedbackInput:{
    height: 30,
    width: 100,
    backgroundColor: '#999',
    color: '#333',
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 10,  
    alignSelf:'flex-start',
    
  },
  feedbackInput: {
    height: 100,
    width: '100%',
    backgroundColor: '#999',
    color: '#333',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  openButton: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: color.tilte,
    borderRadius: 8,
    width: 220,
  },
   openButtonText: {
    fontSize: 20,
    fontWeight:"500",
    color: "#fff",
  },
});
