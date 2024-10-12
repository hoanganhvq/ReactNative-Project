import { Dimensions, Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { searchHotel } from '../handleAPI/viewAPI';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MasonryFlashList } from '@shopify/flash-list';

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

    const updateSearch = async (search) => {

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

    const renderVerticalItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Hotel', { hotelId: item._id })}>
            <View style={styles.verticalItem}>
                <Image
                    source={{ uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${item.imgCover}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

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
                        onChangeText={updateSearch}
                        value={search}
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
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.row}>
                        <Image source={require('../assets/Avatar.jpg')} style={styles.avatar} />
                        <Text style={styles.text}>Test</Text>
                    </View>
                </TouchableOpacity>

                <SearchBar
                    placeholder="Tìm kiếm..."
                    onChangeText={updateSearch}
                    value={search}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInput}
                    searchIcon={{ size: 24, color: 'gray' }}
                    inputStyle={styles.inputStyle}
                    clearIcon={{ size: 24, color: 'gray' }}
                />
                <MasonryFlashList
                    data={hotel}
                    renderItem={renderVerticalItem}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
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
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
        padding: 10,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        // marginVertical: 16,
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