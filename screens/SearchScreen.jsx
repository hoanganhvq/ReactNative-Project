import { Dimensions, Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { searchHotel } from '../handleAPI/viewAPI';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MasonryFlashList } from '@shopify/flash-list';
import color from "../assets/color.json";

const width = Dimensions.get('window').width;
const ITEM_WIDTH = width / 2 - 15;

const SearchScreen = ({ navigation, route }) => {
    const { searching } = route.params;
    const [search, setSearch] = useState(searching);
    const [searchDelay, setSearchDelay] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [noDataMessage, setNoDataMessage] = useState(searching);


    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await searchHotel(search);
                setSearch(null);
                setHotel(res.data.data);
                console.log("hotel ",hotel)
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    const message = error.response.data.message;
                    setSearch(null);
                    setHotel(null);
                    setNoDataMessage(message);
                } else {
                    console.error("Error fetching hotel details:", error);

                }
            }
        };

        fetchHotel();
    }, [searchDelay]);

    const updateSearch = async (text) => {
        let search = text.nativeEvent.text;

        if (!search.trim()) {
            return;
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const timeoutId = await setTimeout(() => {
            setSearch(search);
            setSearchDelay(search);
        }, 3000);
    };

    const renderVerticalItem = ({ item }) => {
        const rating = item.ratingsAverage ? item.ratingsAverage.toFixed(1) : 0; 
        
        return (
          <TouchableOpacity onPress={() => navigation.navigate('Hotel', { hotelId: item._id })}>
            <View style={styles.verticalItem}>
              <Image
                source={{ uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${item.imgCover}` }}
                style={styles.imageVertical}
                resizeMode="cover"
              />
              <View style = {styles.hotelInfo}> 
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textCity}>{item.city}</Text>
                <View style = {styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {rating}</Text>
                  <Text style={styles.ratingSubtitle}>({item.ratingsQuantity} reviews)</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      };


    const [scrollY] = useState(new Animated.Value(0));

    const translateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    const Content = () => {
        if (!hotel) {
            return (
                <SafeAreaView style={styles.container}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={styles.row}>
                            <Image source={require('../assets/Avatar.jpg')} style={styles.avatar} />
                            <Text style={styles.text}>Test</Text>
                        </View>
                    </TouchableOpacity> */}

                    <SearchBar
                        placeholder="Tìm kiếm..."
                        // onChangeText={updateSearch}
                        // value={search}
                        // containerStyle={styles.searchBarContainer}
                        // inputContainerStyle={styles.searchBarInput}
                        // searchIcon={{ size: 24, color: 'gray' }}
                        // inputStyle={styles.inputStyle}
                        // clearIcon={{ size: 24, color: 'gray' }}
                        onChange={(text) => setSearch(text)}
                        value={search}
                        onSubmitEditing={updateSearch}
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInput}
                        searchIcon={{ size: 24, color: 'gray' }}
                        inputStyle={styles.inputStyle}
                        clearIcon={{ size: 24, color: 'gray' }}
                    />
                    <Text>{noDataMessage}</Text>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.row}>
                        <Image source={require('../assets/Avatar.jpg')} style={styles.avatar} />
                        <Text style={styles.text}>Test</Text>
                    </View>
                </TouchableOpacity> */}

                <SearchBar
                    placeholder="Tìm kiếm..."
                    // onChangeText={updateSearch}
                    // value={search}
                    // containerStyle={styles.searchBarContainer}
                    // inputContainerStyle={styles.searchBarInput}
                    // searchIcon={{ size: 24, color: 'gray' }}
                    // inputStyle={styles.inputStyle}
                    // clearIcon={{ size: 24, color: 'gray' }}
                    onChange={(text) => setSearch(text)}
                    value={search}
                    onSubmitEditing={updateSearch}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInput}
                    searchIcon={{ size: 24, color: 'gray' }}
                    inputStyle={styles.inputStyle}
                    clearIcon={{ size: 24, color: 'gray' }}
                />
                <MasonryFlashList
                    data={hotel}
                    renderItem={renderVerticalItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={255}
                    contentContainerStyle={styles.verticalFlatlist}
                />
            </SafeAreaView>
        );
    };

    return <Content />;
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: color.background_dark
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
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginVertical: 16,
        borderBlockColor: color.background_dark,
        width:"100%"
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
        marginVertical: 15,
        marginHorizontal: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        width:"100%"
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
        marginBottom:20,
        marginTop:10,
      },
      textCity: {
        fontSize: 14,
        color: '#b0b0b0',
        marginBottom:20,
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