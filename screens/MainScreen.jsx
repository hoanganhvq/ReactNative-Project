import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SearchBar } from 'react-native-elements';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { MasonryFlashList } from '@shopify/flash-list';
import { home } from '../handleAPI/viewAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase';
import color from '../assets/color.json';
import { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import LoadingScreen from './LoadingScreen.jsx';


const width = Dimensions.get('window').width;
const ITEM_WIDTH = width / 2 - 15;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
export default function MainScreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [standoutDestination, setStandoutDestination] = useState(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [loading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);


  const getData = async () => {
    try {
      const data = await home();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const res = await getData();
    const data = res.data.data.hotel
    const dataStandoutDestination = res.data.data.standoutDestination;
    // console.log("Du lieu khach san", data);
    setData(data)
    setStandoutDestination(dataStandoutDestination);
  };

  const fetchImages = async () => {
    try {
      const hotelsCollection = collection(db, 'hotels');
      const hotelsSnapshot = await getDocs(hotelsCollection);
      const hotelsList = hotelsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          images: Object.values(data.images || {}),
          name: data.name,
          city: data.city,
          ratingsAverage: data.ratingsAverage,
          ratingsQuantity: data.ratingsQuantity,
          imgCover: data.imgCover
        };
      });
      setHotels(hotelsList);
      // console.log("hotel Images: ", hotelsList);

    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }

  };

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
          setPhoto(data.profileUrl);
          setName(data.name);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      } finally {
        setToken(storedToken);
        setIsLoading(false);
      }
    }

  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      fetchToken();
    })

  }, []);


  useLayoutEffect(() => {
    fetchImages();
    fetchData();
  }, []);



  const updateSearch = (text) => {
    let search = text.nativeEvent.text;

    setSearchQuery(search);

    if (!search.trim()) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const timeoutId = setTimeout(() => {
      navigation.navigate("Searching", { searching: search });
    }, 3000);
    setSearchQuery(null);
  };

  const [scrollY] = useState(new Animated.Value(0));



  const renderHorizontalItem = ({ item, index }) => {

    const translateY = scrollX.interpolate({
      inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE],
      outputRange: [0, -30, 0],
    })
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Searching', { searching: item.city })}>
        <Animated.View style={{
          padding: 10,
          alignItems: 'center',
          borderRadius: 34,
          transform: [{ translateY }],
          justifyContent: 'center',
          marginHorizontal: 10,

        }}>
          <Image
            source={{ uri: `https://github.com/JINO25/IMG/raw/master/Hotel/${item.imgCover}` }}
            style={styles.image}
          />
          <View style={styles.viewText}>
            <EvilIcons name="location" size={25} color="green" style={{ marginRight: 0, fontWeight: "bold" }} />
            <Text style={styles.txtCity}>{item.city}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };



  const renderVerticalItem = ({ item }) => {
    const rating = item.ratingsAverage ? item.ratingsAverage.toFixed(1) : 0;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Hotel', { hotelId: item.id, hotels: hotels })}>
        <View style={styles.verticalItem}>
          <Image
            source={{ uri: item.imgCover }}
            style={styles.imageVertical}
            resizeMode="cover"
          />
          <View style={styles.hotelInfo}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textCity}>{item.city}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {rating}</Text>
              <Text style={styles.ratingSubtitle}>({item.ratingsQuantity} reviews)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const Content = () => {
    if (!data) {
      return (
        <LoadingScreen />
      );
    }

    return (
      <>
        {!token ? (
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <View style={styles.row}>
              <Text style={styles.textLogin}>Login</Text>
            </View>
          </TouchableOpacity>

        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={{ marginTop: 20 }}>
            <View style={styles.row}>
              <Image
                source={{ uri: photo }}
                resizeMode='cover'
                style={styles.avatar} />
              <Text style={styles.text}>{name}</Text>
            </View>
          </TouchableOpacity>
        )
        }

        <SearchBar
          placeholder="Tìm kiếm..."
          autoFocus={false}
          onChange={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={updateSearch}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
          searchIcon={{ size: 24, color: 'gray' }}
          inputStyle={styles.inputStyle}
          clearIcon={{ size: 24, color: 'gray' }}
        />



        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Text style={{ fontSize: 25, color: "white", fontStyle: "bold", fontFamily: "Viga-Regular", marginLeft: 10 }}>Khám Phá</Text>
          <Animated.FlatList
            data={standoutDestination}
            renderItem={renderHorizontalItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 20
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            // scrollEventThrottle={16}
            decelerationRate={0}
            bounces={false}
            // onScroll={onScrollHandler}
            style={styles.horizontalFlatlist}
          />


          <Text style={{ fontSize: 25, color: "white", fontStyle: "bold", fontFamily: "Viga-Regular", marginLeft: 10 }}>Nổi bật</Text>

          <MasonryFlashList
            data={hotels}
            renderItem={renderVerticalItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={255}
            contentContainerStyle={styles.verticalFlatlist}
          />
        </Animated.ScrollView>
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

  viewText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'black',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.background_dark,
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
    marginLeft: 0,
    fontSize: 18,
    fontStyle: "bold",
    color: color.tilte,
    padding: 10,
  },
  txtCity: {
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "bold",
    color: color.tilte,
    padding: 10,

  },
  textLogin: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    padding: 10,
  },
  searchBarContainer: {
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginVertical: 16,
    borderBlockColor: color.background_dark,
  },
  searchBarInput: {
    backgroundColor: color.item_background_dark,
    borderRadius: 10,
    borderWidth: 0,
  },
  inputStyle: {
    padding: 0,
    color: 'white',
  },

  image: {
    width: 150,
    height: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },

  verticalItem: {
    flexDirection: 'row',
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
  },
  imageVertical: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)", // Đặt màu trắng với độ mờ 50%
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',

  },

  textName: {
    fontSize: 18,
    color: '#ffffff', // Keeping the text white for visibility
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  textCity: {
    fontSize: 14,
    color: '#b0b0b0',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: color.tilte,
    marginRight: 5,
    fontWeight: "bold",
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#b0b0b0',
  },
});

