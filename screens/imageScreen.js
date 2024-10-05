import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    SafeAreaView, 
    Animated, 
    Dimensions, 
    FlatList, 
    TouchableOpacity 
} from 'react-native';
import ImageViewing from 'react-native-image-viewing'; 
import { hotelData } from '../Data/hotelData.js';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; 
const IMAGE_NOTIFICATION_HEIGHT = 500;

const imageAlbums = [
    { 
        id: 1, 
        title: 'Khách sạn', 
        images: hotelData.images.imageHotel, 
        first: hotelData.images.imageHotel[0] 
    },
    { 
        id: 2, 
        title: 'Phòng', 
        images: hotelData.images.imagesRoom, 
        first: hotelData.images.imagesRoom[0] 
    },
    { 
        id: 3, 
        title: 'Thức ăn', 
        images: hotelData.images.imagesFood, 
        first: hotelData.images.imagesFood[0] 
    },
    { 
        id: 4, 
        title: 'Tiện nghi', 
        images: hotelData.images.imagesAmenities, 
        first: hotelData.images.imagesAmenities[0] 
    },
];

export default function ImageScreen() {
    const [scrollY] = useState(new Animated.Value(0));
    const [showNav, setShowNav] = useState(false);
    const [sectionOffsets, setSectionOffsets] = useState([]); 
    const scrollViewRef = useRef(null); 
    const sectionRefs = useRef([]);

    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
    const [imagesForViewer, setImagesForViewer] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    const handleShowImages = (item, index, albumIndex) => {
        const images = imageAlbums[albumIndex].images.map(img => ( img.src ));
        setImagesForViewer(images);
        setCurrentImageIndex(index);
        setIsImageViewerVisible(true);
    };

    const handleHideImages = () => {
        setIsImageViewerVisible(false);
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false, 
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setShowNav(offsetY > 150);
            }
        }
    );

    const getSectionPosition = () => {
        const offsets = [];
        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.measure((x, y, width, height, pageX, pageY) => {
                    offsets[index] = pageY - 170;
                    if (index === sectionRefs.current.length - 1) {
                        setSectionOffsets(offsets);
                    }
                });
            }
        });
    };

    const scrollToSection = (index) => {
        if (scrollViewRef.current && sectionOffsets[index] !== undefined) {
            scrollViewRef.current.scrollTo({ y: sectionOffsets[index], animated: true });
        }
    };

    const handleSelectAlbum = (item, index) => {
        setSelectedAlbumId(item.id);
        scrollToSection(index);
    };

    const renderImagesView = ({ item }) => (
        <TouchableOpacity 
            style={[
                styles.imageViewContainer, 
            ]} 
            onPress={() => handleSelectAlbum(item, item.id - 1)}
        >
            <Image source={item.first.src} style={styles.imageView} />
            <Text style={styles.imageText}>{item.title}</Text> 
        </TouchableOpacity>
    );

    const renderImage = ({ item, index }, albumIndex) => (
        <TouchableOpacity 
            style={styles.roomImageContainer} 
            onPress={() => {
                handleShowImages(item, index, albumIndex);
            }}
        >
            <Image source={item.src} style={styles.image} />
        </TouchableOpacity>
    );

    const renderAlbum = ({ item, index }) => {
        return (
            <View 
                style={styles.imageSectionContainer} 
                ref={el => sectionRefs.current[index] = el} 
                onLayout={getSectionPosition} 
            >
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <FlatList
                    data={item.images}
                    renderItem={({ item, index: imgIndex }) => renderImage({ item, index: imgIndex }, index)}
                    keyExtractor={(imgItem, imgIndex) => imgIndex.toString()} 
                    numColumns={2} 
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        );
    };

    useEffect(() => {
        if (imageAlbums.length > 0 && selectedAlbumId === null) {
            setSelectedAlbumId(imageAlbums[0].id);
        }
    }, [imageAlbums, selectedAlbumId]);

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
                    {imageAlbums.map((album, index) => (
                        <TouchableOpacity 
                            key={album.id} 
                            style={[
                                styles.navButton, 
                                selectedAlbumId === album.id && styles.selectedNavButton
                            ]} 
                            onPress={() => handleSelectAlbum(album, index)}
                        >
                            <Text style={[
                                styles.navText, 
                                selectedAlbumId === album.id && styles.selectedNavText
                            ]}>{album.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {isImageViewerVisible && (
                <Animated.View style={{ opacity: fadeAnim }}>
                  <ImageViewing
                        images={imagesForViewer}
                        imageIndex={currentImageIndex}
                        visible={isImageViewerVisible}
                        onRequestClose={handleHideImages}
                        swipeToCloseEnabled={true}
                        doubleTapToZoomEnabled={true}
                        animationType='fade'
                    />
                </Animated.View>
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
    selectedImageViewContainer: {
        borderWidth: 2,
        borderColor: '#007BFF',
        transform: [{ scale: 1.05 }],
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
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
        left: 0,
        backgroundColor: '#ffffff',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    navButton: {
        padding: 10,
        justifyContent: 'center',
    },
    selectedNavButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        padding: 8,
    },
    navText: {
        fontSize: 16,
        color: '#495057',
    },
    selectedNavText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#dc3545',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});
