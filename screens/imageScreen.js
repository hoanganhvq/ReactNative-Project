import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { hotelData } from '../Data/hotelData.js';  

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; 
const imageAlbums = [
    { id: 1, title: 'Khách sạn', images: hotelData.images.imageHotel ,first: hotelData.images.imageHotel[0]},
    { id: 2, title: 'Phòng', images: hotelData.images.imagesRoom,first: hotelData.images.imagesRoom[0] },
    { id: 3, title: 'Thức ăn', images: hotelData.images.imagesFood,first: hotelData.images.imagesAmenities[0]},
    { id: 4, title: 'Tiện nghi', images: hotelData.images.imagesAmenities ,first: hotelData.images.imagesFood[0]},
];

export default function ImageScreen() {
    const [scrollY] = useState(new Animated.Value(0));
    const [showNav, setShowNav] = useState(false);
    const [sectionOffsets, setSectionOffsets] = useState([]); // Thêm state để lưu vị trí các phần
    const scrollViewRef = useRef(null); 
    const sectionRefs = useRef([]); // Sử dụng ref cho từng section

    // Hàm lấy vị trí của các phần
    const getSectionPosition = () => {
        const offsets = sectionRefs.current.map(ref => {
            if (ref) {
                return ref.measure((x, y, width, height, pageX, pageY) => {
                    return pageY;
                });
            }
            return 0; // Nếu không có ref, trả về 0
        });
        setSectionOffsets(offsets);
    };

    const renderImagesView = ({ item }) => (
        <View style={styles.imageViewContainer}>
            <Image source={item.first.src} style={styles.imageView} />
            <Text style={styles.imageText}>{item.name}</Text>
        </View>
    );

    const renderImage = ({ item }) => (
        <View style={styles.roomImageContainer}>
            <Image source={item.src} style={styles.image} />
        </View>
    );

    const renderAlbum = ({ item, index }) => (
        <View 
            style={styles.imageSectionContainer} 
            ref={el => sectionRefs.current[index] = el} // Gán ref cho từng phần
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

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                setShowNav(event.nativeEvent.contentOffset.y > 150);
            }
        }
    );

    // Hàm cuộn đến vị trí cụ thể
    const scrollToSection = (index) => {
        if (scrollViewRef.current && sectionOffsets[index] !== undefined) {
            scrollViewRef.current.scrollTo({ y: sectionOffsets[index], animated: true });
        }
    };

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
                onLayout={getSectionPosition} // Gọi hàm để lấy vị trí khi layout thay đổi
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
        right: 20,
        backgroundColor: '#fff',
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        marginHorizontal: 10,
        padding: 14,
    },
    navText: {
        fontSize: 14,
        color: '#007bff',
    },
    getPositionText: {
        marginTop: 10,
        color: '#007bff',
    },
});
