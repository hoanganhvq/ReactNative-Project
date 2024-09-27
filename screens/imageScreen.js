import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { hotelData } from '../Data/hotelData.js';  

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; 
const imageAlbums = [
    { id: 1, title: 'Khách sạn', images: hotelData.images.imageHotel, first: hotelData.images.imageHotel[0] },
    { id: 2, title: 'Phòng', images: hotelData.images.imagesRoom, first: hotelData.images.imagesRoom[0] },
    { id: 3, title: 'Thức ăn', images: hotelData.images.imagesFood, first: hotelData.images.imagesFood[0] }, // Fix this
    { id: 4, title: 'Tiện nghi', images: hotelData.images.imagesAmenities, first: hotelData.images.imagesAmenities[0] }, // Fix this
];

export default function ImageScreen() {
    const [scrollY] = useState(new Animated.Value(0));
    const [showNav, setShowNav] = useState(false);
    const [sectionOffsets, setSectionOffsets] = useState([]); 
    const scrollViewRef = useRef(null); 
    const sectionRefs = useRef([]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false, 
            listener: (event) => {
                setShowNav(event.nativeEvent.contentOffset.y > 150);
            }
        }
    );

    // Function to get section positions
    const getSectionPosition = () => {
        const offsets = [];
        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.measure((x, y, width, height, pageX, pageY) => {
                    offsets[index] = pageY - 170; // Store the measured position
                    if (index === sectionRefs.current.length - 1) {
                        setSectionOffsets(offsets); // Set offsets after measuring all
                    }
                });
            }
        });
    };

    // Scroll to a specific section
    const scrollToSection = (index) => {
        if (scrollViewRef.current && sectionOffsets[index] !== undefined) {
            scrollViewRef.current.scrollTo({ y: sectionOffsets[index], animated: true });
        }
    };

    // Render functions
    const renderImagesView = ({ item }) => (
        <TouchableOpacity style={styles.imageViewContainer} onPress={() => scrollToSection(item.id - 1)}>
            <Image source={item.first.src} style={styles.imageView} />
            <Text style={styles.imageText}>{item.title}</Text> 
        </TouchableOpacity>
    );

    const renderImage = ({ item }) => (
        <View style={styles.roomImageContainer}>
            <Image source={item.src} style={styles.image} />
        </View>
    );

    const renderAlbum = ({ item, index }) => (
        <View 
            style={styles.imageSectionContainer} 
            ref={el => sectionRefs.current[index] = el} 
            onLayout={getSectionPosition} 
        >
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
                data={item.images}
                renderItem={renderImage}
                keyExtractor={(imgItem) => imgItem.id.toString()} 
                numColumns={2} 
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );

    useEffect(() => {
        getSectionPosition();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Ảnh ({imageAlbums.length})</Text>
                <Text style={styles.hotelName}>{hotelData.name}</Text>
            </View>

            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <View style={styles.overview}>
                    <Text style={styles.overviewText}>Tổng quan về chỗ nghỉ</Text>
                    <FlatList
                        data={imageAlbums}
                        renderItem={renderImagesView}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
                <FlatList
                    data={imageAlbums}
                    renderItem={renderAlbum}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Animated.ScrollView>

            {showNav && (
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection(0)}>
                        <Text style={styles.navText}>Khách sạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection(1)}>
                        <Text style={styles.navText}>Phòng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection(2)}>
                        <Text style={styles.navText}>Thức ăn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection(3)}>
                        <Text style={styles.navText}>Tiện Nghi</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
    },
    hotelName: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 5,
    },
    overview: {
        marginBottom: 20,
    },
    overviewText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#495057',
    },
    scrollViewContainer: {
        paddingBottom: 20,
    },
    flatListContainer: {
        paddingVertical: 10,
    },
    imageViewContainer: {
        width: ITEM_WIDTH,
        marginRight: 15,
        alignItems: 'center',
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        padding: 10,
    },
    imageView: {
        width: ITEM_WIDTH * 0.9,
        height: 140,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dee2e6',
        resizeMode: 'cover',
    },
    imageText: {
        marginTop: 5,
        fontSize: 16,
        color: '#495057',
        textAlign: 'center',
    },
    roomImageContainer: {
        flex: 1,
        margin: 5,
    },
    image: {
        width: '100%', 
        height: 140,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    imageSectionContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#343a40',
    },
    navContainer: {
        width: '100%',
        position: 'absolute',
        top: 115,
        right: 0,
        backgroundColor: 'white',
        elevation: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        marginHorizontal: 10,
        padding: 10,
    },
    navText: {
        fontSize: 14,
        color: '#007bff',
    },
});

