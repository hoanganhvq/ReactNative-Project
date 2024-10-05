import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, ScrollView ,TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { hotelData } from '../Data/hotelData.js'; 
import { MasonryFlashList } from '@shopify/flash-list';

const width = Dimensions.get('window').width;
const ITEM_WIDTH = width / 2 - 15;
const images = hotelData.images.imageHotel;

export default function MainScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const updateSearch = (query) => setSearchQuery(query);

  const [scrollY] = useState(new Animated.Value(0));

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horiziontalItem}>
      <Image source={item.src} style={styles.image}/>
      <Text style={styles.text}>{item.name}</Text> 
    </View>
  );

  const renderVerticalItem = ({ item }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Hotel', { image: item })}>
      <View style={styles.verticalItem}>
      <Image source={item.src} style={styles.image} resizeMode="cover" />
    </View>
  </TouchableOpacity>
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
          { useNativeDriver: true }
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
    backgroundColor:'#fff'
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
    borderRadius: 10,
  },
});