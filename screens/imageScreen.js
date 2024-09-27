import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, TouchableOpacity,scrollViewRef } from 'react-native';
import { hotelData } from '../Data/hotelData.js';  

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; 
const imageData = [
    { id: 1, image: hotelData.images.imageHotel[0], name: 'Khách sạn' },
    { id: 2, image: hotelData.images.imagesRoom[0], name: 'Phòng' },
    { id: 3, image: hotelData.images.imagesAmenities[0], name: 'Tiện nghi' },
    { id: 4, image: hotelData.images.imagesFood[0], name: 'Thức ăn' },
];

export default function ImageScreen() {
    const [scrollY] = useState(new Animated.Value(0));
    const [showNav, setShowNav] = useState(false);

    const renderImagesView = ({ item }) => (
        <View style={styles.imageViewContainer}>
            <Image source={item.image.src} style={styles.imageView} />
            <Text style={styles.imageText}>{item.name}</Text>
        </View>
    );

    const renderImages = ({ item }) => (
        <View style={styles.roomImageContainer}>
            <Image source={item.src} style={styles.image} />
        </View>
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                // Hiển thị thanh điều hướng khi cuộn xuống
                setShowNav(event.nativeEvent.contentOffset.y > 150);
            }
        }
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Ảnh ({imageData.length})</Text>
                <Text style={styles.hotelName}>{hotelData.name}</Text>
            </View>

            <Animated.ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <View style={styles.overview}>
                    <Text style={styles.overviewText}>Tổng quan về chỗ nghỉ</Text>
                    <FlatList
                        data={imageData}
                        renderItem={renderImagesView}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View style={styles.imageSectionContainer}>
                    <Text style={styles.sectionTitle}>Hình ảnh khách sạn</Text>
                    <FlatList
                        data={hotelData.images.imageHotel}
                        renderItem={renderImages}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} 
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View style={styles.imageSectionContainer}>
                    <Text style={styles.sectionTitle}>Phòng</Text>
                    <FlatList
                        data={hotelData.images.imagesRoom}
                        renderItem={renderImages}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} 
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View style={styles.imageSectionContainer}>
                    <Text style={styles.sectionTitle}>Thức ăn</Text>
                    <FlatList
                        data={hotelData.images.imagesFood}
                        renderItem={renderImages}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} 
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View style={styles.imageSectionContainer}>
                    <Text style={styles.sectionTitle}>Tiện Nghi</Text>
                    <FlatList
                        data={hotelData.images.imagesAmenities}
                        renderItem={renderImages}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} 
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </Animated.ScrollView>

            {showNav && (
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection('hotelImages')}>
                        <Text style={styles.navText}>Khách sạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection('roomImages')}>
                        <Text style={styles.navText}>Phòng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection('foodImages')}>
                        <Text style={styles.navText}>Thức ăn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => scrollToSection('amenitiesImages')}>
                        <Text style={styles.navText}>Tiện Nghi</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );

    function scrollToSection(section) {
        const offset = {
            hotelImages: 0, // Thay đổi giá trị này cho phù hợp
            roomImages: 300, // Thay đổi giá trị này cho phù hợp
            foodImages: 600, // Thay đổi giá trị này cho phù hợp
            amenitiesImages: 900, // Thay đổi giá trị này cho phù hợp
        };
        scrollViewRef.current.scrollTo({ y: offset[section], animated: true });
    }
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
        position: 'absolute',
        top: 20,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        marginHorizontal: 5,
        padding: 5,
    },
    navText: {
        fontSize: 14,
        color: '#007bff',
    },
});
