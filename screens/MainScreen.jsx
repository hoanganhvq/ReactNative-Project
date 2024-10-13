import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { hotelData } from '../Data/hotelData.js';
import { MasonryFlashList } from '@shopify/flash-list';
import { home } from '../handleAPI/viewAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { NetworkInfo } from "react-native-network-info"

const width = Dimensions.get('window').width;
const ITEM_WIDTH = width / 2 - 15;
const images = hotelData.images.imageHotel;

export default function MainScreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [delaySearch, setDelaySearch] = useState("");
  const [data, setData] = useState(null);
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
    setData(data)
  };

  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    const storedPhoto = await AsyncStorage.getItem('userPhoto');
    const storedName = await AsyncStorage.getItem('userName');

    setToken(storedToken);
    setPhoto(storedPhoto);
    setName(storedName);
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      fetchToken();
    })
  }, []);

  useLayoutEffect(() => {
    fetchData();
  }, []);




  const updateSearch = (text) => {
    let search = text.nativeEvent.text;
    console.log('Searching for:', search);

    setSearchQuery(search);

    if (!search.trim()) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // setDelaySearch(search);

    const timeoutId = setTimeout(() => {
      navigation.navigate("Searching", { searching: search });
    }, 3000);
    setSearchQuery(null);
  };

  const [scrollY] = useState(new Animated.Value(0));

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horiziontalItem}>
      <Image
        source={{ uri: `https://github.com/JINO25/IMG/raw/master/Hotel/${item.imgCover}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.viewText}>
        <EvilIcons name="location" size={25} color="green" style={{ marginRight: 0 }} />
        <Text style={styles.text}>{item.city}</Text>
      </View>

    </View>
  );

  const renderVerticalItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Hotel', { hotelId: item._id })}>
      <View style={styles.verticalItem}>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${item.imgCover}` }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.textName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const Content = () => {
    if (!data) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    return (
      <>
        {!token ? (
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <View style={styles.row}>
              <Text style={styles.text}>Login</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <View style={styles.row}>
              <Image
                source={{ uri: `https://github.com/JINO25/IMG/raw/master/user/${photo}` }}
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

        {/* <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          padding: 8,
          marginHorizontal: 16,
          marginVertical: 8,
        }}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(text) => setSearchQuery(text)}
            onSubmitEditing={updateSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.searchIcon}>
            <Feather name="search" size={24} color="gray" />
          </TouchableOpacity>
        </View> */}


        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Text style={{ fontSize: 20 }}>Khám Phá</Text>
          <Animated.FlatList
            data={data}
            renderItem={renderHorizontalItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            decelerationRate="fast"
            estimatedItemSize={255}
            style={styles.horizontalFlatlist}
          />

          <Text style={{ fontSize: 20 }}>Nổi bật</Text>

          <MasonryFlashList
            data={data}
            renderItem={renderVerticalItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
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
  textName: {
    fontSize: 16
  },
  viewText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
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
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  horizontalFlatList: {
    height: 100,
    marginBottom: 20,
  },
  horiziontalItem: {
    marginTop: 5
  },
  horizontalItem: {
    width: width * 0.8,
    height: 80,
    backgroundColor: '#f9c2ff',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  verticalFlatList: {
    paddingHorizontal: 20,
  },
  verticalItem: {
    flex: 1,
    backgroundColor: '#d3f9c2',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});