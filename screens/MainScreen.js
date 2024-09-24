import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions,ScrollView,FlatList  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { images } from '../Data/images.js'; // Đảm bảo dữ liệu images được nhập chính xác
import { MasonryFlashList } from '@shopify/flash-list';

const width = Dimensions.get('window').width; // Lấy chiều rộng của màn hình
const ITEM_WIDTH = width / 2 - 15; // Để có khoảng cách giữa các item

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho truy vấn tìm kiếm
  const updateSearch = (query) => setSearchQuery(query); // Cập nhật truy vấn tìm kiếm

  const [isScrollingVertically, setIsScrollingVertically] = useState(false); // Trạng thái kiểm tra cuộn dọc

  // Hàm gọi khi bắt đầu cuộn dọc
  const handleScrollVertical = () => {
    setIsScrollingVertically(true);
  };

  // Hàm gọi khi kết thúc cuộn dọc
  const handleScrollEnd = () => {
    setIsScrollingVertically(false);
  };

  // Render item cho FlatList ngang
  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horiziontalItem}>
      <Image source={item.src} style={styles.image}/>
      <Text style={styles.text}>{item.name}</Text> 
    </View>
  );

  // Render item cho FlatList dọc
  const renderVerticalItem = ({ item }) => (
    <View style={styles.verticalItem}>
      <Image source={item.src} style={styles.image} /> 
    </View>
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
      />

      <View>
        <Text style={{ fontSize: 20 }}>Khám Phá</Text>
      </View>

      <Animated.ScrollView
        onScrollBeginDrag={handleScrollVertical} // Bắt đầu cuộn
        onScrollEndDrag={handleScrollEnd} // Kết thúc cuộn
        scrollEventThrottle={16} // Tần suất cập nhật sự kiện cuộn
      >
        {!isScrollingVertically && (
          <Animated.FlatList
            data={images} 
            renderItem={renderHorizontalItem} // Sử dụng hàm render cho item ngang
            keyExtractor={item => item.id} // Khóa cho mỗi item
            horizontal={true} // Thiết lập FlatList cuộn ngang
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
           decelerationRate="fast"
            style={styles.horizontalFlatlist}
          />
        )}

        <MasonryFlashList
          data={images}
          renderItem={renderVerticalItem} // Sử dụng hàm render cho item dọc
          keyExtractor={item => item.id} // Khóa cho mỗi item
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
          numColumns={2} // Thiết lập số cột cho FlatList
          contentContainerStyle={styles.verticalFlatlist} // Style cho nội dung FlatList

        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginHorizontal: 8, // Khoảng cách giữa các item
    alignItems: 'center', // Căn giữa nội dung trong item
    justifyContent: 'center',
  },
  imageIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  horizontalFlatList: {
    height: 100, 
    marginBottom: 20, // Khoảng cách dưới FlatList ngang
  },
  horizontalItem: {
    width: width * 0.8, // Chiều rộng item ngang
    height: 80, // Chiều cao item ngang
    backgroundColor: '#f9c2ff', // Màu nền cho item ngang
    marginHorizontal: 10, // Khoảng cách giữa các item ngang
    justifyContent: 'center', // Căn giữa nội dung trong item
    alignItems: 'center', // Căn giữa nội dung trong item
    borderRadius: 10, // Bo góc cho item ngang
  },
  verticalFlatList: {
    paddingHorizontal: 20, // Padding cho FlatList dọc
  },
verticalItem: {
     flex: 1, // Tự động điều chỉnh chiều cao
    backgroundColor: '#d3f9c2', // Màu nền cho item dọc
    margin: 5, // Khoảng cách giữa các item dọc
    justifyContent: 'center', // Căn giữa nội dung trong item
    alignItems: 'center', // Căn giữa nội dung trong item
    borderRadius: 10, // Bo góc cho item dọc
},

});



//-----------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Dimensions,MasonryList } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import { images } from '../Data/images.js'; // Đảm bảo dữ liệu images được nhập chính xác

// const width = Dimensions.get('window').width; // Lấy chiều rộng của màn hình
// const ITEM_WIDTH = width / 2 - 15; // Để có khoảng cách giữa các item

// export default function MainScreen() {
//   const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho truy vấn tìm kiếm
//   const updateSearch = (query) => setSearchQuery(query); // Cập nhật truy vấn tìm kiếm

//   const [isScrollingVertically, setIsScrollingVertically] = useState(false); // Trạng thái kiểm tra cuộn dọc

//   // Hàm gọi khi bắt đầu cuộn dọc
//   const handleScrollVertical = () => {
//     setIsScrollingVertically(true);
//   };

//   // Hàm gọi khi kết thúc cuộn dọc
//   const handleScrollEnd = () => {
//     setIsScrollingVertically(false);
//   };

//   // Render item cho FlatList ngang
//   const renderHorizontalItem = ({ item }) => (
//     <View style={styles.horizontalItem}>
//       <Image source={item.src} style={styles.image} />
//       <Text style={styles.text}>{item.name}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.row}>
//         <Image source={require('../assets/Avatar.jpg')} style={styles.avatar} />
//         <Text style={styles.text}>Test</Text>
//       </View>

//       <SearchBar
//         placeholder="Tìm kiếm..."
//         onChangeText={updateSearch}
//         value={searchQuery}
//         containerStyle={styles.searchBarContainer}
//         inputContainerStyle={styles.searchBarInput}
//         searchIcon={{ size: 24, color: 'gray' }}
//         inputStyle={styles.inputStyle}
//       />

//       <View>
//         <Text style={{ fontSize: 20 }}>Khám Phá</Text>
//       </View>

//       <Animated.ScrollView
//         onScrollBeginDrag={handleScrollVertical} // Bắt đầu cuộn
//         onScrollEndDrag={handleScrollEnd} // Kết thúc cuộn
//         scrollEventThrottle={16} // Tần suất cập nhật sự kiện cuộn
//       >
//         {!isScrollingVertically && (
//           <Animated.FlatList
//             data={images}
//             renderItem={renderHorizontalItem} // Sử dụng hàm render cho item ngang
//             keyExtractor={item => item.id.toString()} // Khóa cho mỗi item
//             horizontal={true} // Thiết lập FlatList cuộn ngang
//             showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
//             snapToInterval={ITEM_WIDTH}
//             snapToAlignment="start"
//             decelerationRate="fast"
//             style={styles.horizontalFlatlist}
//           />
//         )}

//         {/* Sử dụng MasonryList để hiển thị các item dọc */}
//         <MasonryList
//           images={images.map(item => ({
//             uri: item.src, // Thay đổi nếu src là chuỗi đường dẫn
//             width: ITEM_WIDTH,
//             height: Math.random() * 150 + 100 // Chiều cao ngẫu nhiên từ 100 đến 250
//           }))}
//           column={2} // Số cột
//           showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
//           style={styles.verticalFlatlist}
//         />
//       </Animated.ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: '#ccc',
//   },
//   text: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#333',
//     padding: 10,
//   },
//   searchBarContainer: {
//     backgroundColor: 'transparent',
//     borderWidth: 0,
//     marginVertical: 16,
//   },
//   searchBarInput: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     borderWidth: 0,
//   },
//   inputStyle: {
//     padding: 0,
//   },
//   horizontalFlatlist: {
//     height: 100,
//     marginBottom: 20, // Khoảng cách dưới FlatList ngang
//   },
//   horizontalItem: {
//     width: ITEM_WIDTH,
//     height: 80,
//     backgroundColor: '#f9c2ff',
//     marginHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   verticalFlatlist: {
//     paddingHorizontal: 10, // Padding cho danh sách dọc
//   },
//   image: {
//     width: ITEM_WIDTH,
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
// });


//---------------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions,SafeAreaView } from 'react-native';

// // Lấy kích thước của màn hình
// const { width } = Dimensions.get('window');

// // Tạo dữ liệu với chiều cao khác nhau cho các item trong FlatList dọc
// const DATA_VERTICAL = Array.from({ length: 10 }, (_, index) => ({
//   id: (index + 1).toString(), // ID của mỗi item
//   title: `Vertical Item ${index + 1}`, // Tiêu đề của mỗi item
//   height: Math.random() * 150 + 50, // Chiều cao ngẫu nhiên từ 50 đến 200
// }));

// // Tạo dữ liệu cho các item trong FlatList ngang
// const DATA_HORIZONTAL = Array.from({ length: 10 }, (_, index) => ({
//   id: (index + 1).toString(), // ID của mỗi item
//   title: `Horizontal Item ${index + 1}`, // Tiêu đề của mỗi item
// }));

// export default function App() {
//   const [isScrollingVertically, setIsScrollingVertically] = useState(false); // Trạng thái để kiểm tra việc cuộn dọc

//   // Hàm gọi khi bắt đầu cuộn dọc
//   const handleScrollVertical = () => {
//     setIsScrollingVertically(true);
//   };

//   // Hàm gọi khi kết thúc cuộn dọc
//   const handleScrollEnd = () => {
//     setIsScrollingVertically(false);
//   };

//   // Render item cho FlatList ngang
//   const renderHorizontalItem = ({ item }) => (
//     <View style={styles.horizontalItem}>
//       <Text style={styles.text}>{item.title}</Text>
//     </View>
//   );

//   // Render item cho FlatList dọc
//   const renderVerticalItem = ({ item }) => (
//     <View style={[styles.verticalItem, { height: item.height }]}>
//       <Text style={styles.text}>{item.title}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView
//         onScrollBeginDrag={handleScrollVertical} // Gọi hàm khi bắt đầu cuộn
//         onScrollEndDrag={handleScrollEnd} // Gọi hàm khi kết thúc cuộn
//         scrollEventThrottle={16} // Tần suất cập nhật sự kiện cuộn
//         showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
//       >
//         {/* Chỉ hiển thị FlatList ngang khi không cuộn dọc */}
//         {!isScrollingVertically && (
//           <FlatList
//             data={DATA_HORIZONTAL} // Dữ liệu cho FlatList ngang
//             renderItem={renderHorizontalItem} // Hàm render từng item
//             keyExtractor={(item) => item.id} // Khóa cho mỗi item
//             horizontal // Thiết lập FlatList cuộn ngang
//             showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
//             style={styles.horizontalFlatList} // Style cho FlatList ngang
//           />
//         )}
//         <FlatList
//           data={DATA_VERTICAL} // Dữ liệu cho FlatList dọc
//           renderItem={renderVerticalItem} // Hàm render từng item
//           keyExtractor={(item) => item.id} // Khóa cho mỗi item
//           numColumns={2} // Sử dụng 2 cột cho FlatList
//           contentContainerStyle={styles.verticalFlatList} // Style cho nội dung của FlatList dọc
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
// // Các style cho các thành phần trong component
// const styles = StyleSheet.create({
//   horizontalFlatList: {
//     height: 100, // Chiều cao của FlatList ngang
//     marginBottom: 20, // Khoảng cách dưới FlatList ngang
//   },
//   horizontalItem: {
//     width: width * 0.8, // Chiều rộng item ngang
//     height: 80, // Chiều cao item ngang
//     backgroundColor: '#f9c2ff', // Màu nền cho item ngang
//     marginHorizontal: 10, // Khoảng cách giữa các item ngang
//     justifyContent: 'center', // Căn giữa nội dung trong item
//     alignItems: 'center', // Căn giữa nội dung trong item
//     borderRadius: 10, // Bo góc cho item ngang
//   },
//   verticalFlatList: {
//     paddingHorizontal: 20, // Padding cho FlatList dọc
//   },
//   verticalItem: {
//     flex: 1, // Tự động điều chỉnh chiều cao
//     backgroundColor: '#d3f9c2', // Màu nền cho item dọc
//     margin: 5, // Khoảng cách giữa các item dọc
//     justifyContent: 'center', // Căn giữa nội dung trong item
//     alignItems: 'center', // Căn giữa nội dung trong item
//     borderRadius: 10, // Bo góc cho item dọc
//   },
//   text: {
//     fontSize: 16, // Kích thước chữ
//   },
// });

// import React from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native'; // Đảm bảo import Image
// import MasonryList from 'react-native-masonry-list'; // Đảm bảo đã nhập đúng MasonryList
// import { images } from '../Data/images.js'; // Đảm bảo dữ liệu images được nhập chính xác

// // Tạo dữ liệu với chiều cao khác nhau cho các item
// const DATA_VERTICAL = images.map((item) => ({
//   id: item.id,
//   src: item.src,
//   height: Math.floor(Math.random() * 100) + 100 
// }))

// export default function App() {
//   // Tạo item với chiều cao khác nhau
//   const renderItem = ({ item }) => (
//     <View style={[styles.item, { height: item.height }]}>
//       <Image source={{ uri: item.src }} style={styles.image} />
//     </View>
//   );

//   return (
//     <MasonryList
//       images={DATA_VERTICAL.map(item => ({
//         uri: item.src,
//         width: 100, // Chiều rộng của item
//         height: item.height // Chiều cao của item
//       }))}
//       column={2} // Số cột
//       showsVerticalScrollIndicator={false}
//       style={styles.container}
       
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 10,
//   },
//   item: {
//     backgroundColor: '#d3f9c2',
//     marginBottom: 10, // Khoảng cách giữa các item
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     margin: 20,
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center', // Căn giữa tiêu đề
//     marginTop: 5, // Khoảng cách giữa hình ảnh và tiêu đề
//   },
//   image: {
//     width: '100%', // Đảm bảo hình ảnh chiếm toàn bộ chiều rộng item
//     height: '80%', // Chiều cao của hình ảnh
//     borderRadius: 10,
//   },
// });
