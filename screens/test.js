

// import React from 'react';
// import { FlatList, Text, View, StyleSheet, Dimensions, Animated } from 'react-native';

// const DATA = Array.from({ length: 50 }, (_, index) => ({
//   id: (index + 1).toString(),
//   title: `Item ${index + 1}`,
// }));

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.8;

// export default function App() {
//   const scrollX = React.useRef(new Animated.Value(0)).current; // Tạo một giá trị animated cho scroll

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{item.title}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(100, 100, 250, 0.5)', // Màu nền có độ trong suốt
//           opacity: scrollX.interpolate({
//             inputRange: [0, ITEM_WIDTH],
//             outputRange: [1, 0.5], // Đổi độ mờ khi cuộn
//             extrapolate: 'clamp',
//           }),
//         }}
//       />
      
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={ITEM_WIDTH}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginHorizontal: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     width: ITEM_WIDTH,
//   },
//   title: {
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';

// Lấy kích thước của màn hình
const { width } = Dimensions.get('window');

// Tạo dữ liệu với chiều cao khác nhau cho các item trong FlatList dọc
const DATA_VERTICAL = Array.from({ length: 10 }, (_, index) => ({
  id: (index + 1).toString(), // ID của mỗi item
  title: `Vertical Item ${index + 1}`, // Tiêu đề của mỗi item
  height: Math.random() * 150 + 50, // Chiều cao ngẫu nhiên từ 50 đến 200
}));

// Tạo dữ liệu cho các item trong FlatList ngang
const DATA_HORIZONTAL = Array.from({ length: 10 }, (_, index) => ({
  id: (index + 1).toString(), // ID của mỗi item
  title: `Horizontal Item ${index + 1}`, // Tiêu đề của mỗi item
}));

export default function App() {
  const [isScrollingVertically, setIsScrollingVertically] = useState(false); // Trạng thái để kiểm tra việc cuộn dọc

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
    <View style={styles.horizontalItem}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  // Render item cho FlatList dọc
  const renderVerticalItem = ({ item }) => (
    <View style={[styles.verticalItem, { height: item.height }]}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView
        onScrollBeginDrag={handleScrollVertical} // Gọi hàm khi bắt đầu cuộn
        onScrollEndDrag={handleScrollEnd} // Gọi hàm khi kết thúc cuộn
        scrollEventThrottle={16} // Tần suất cập nhật sự kiện cuộn
      >
        {/* Chỉ hiển thị FlatList ngang khi không cuộn dọc */}
        {!isScrollingVertically && (
          <FlatList
            data={DATA_HORIZONTAL} // Dữ liệu cho FlatList ngang
            renderItem={renderHorizontalItem} // Hàm render từng item
            keyExtractor={(item) => item.id} // Khóa cho mỗi item
            horizontal // Thiết lập FlatList cuộn ngang
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            style={styles.horizontalFlatList} // Style cho FlatList ngang
          />
        )}
        <FlatList
          data={DATA_VERTICAL} // Dữ liệu cho FlatList dọc
          renderItem={renderVerticalItem} // Hàm render từng item
          keyExtractor={(item) => item.id} // Khóa cho mỗi item
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
          numColumns={2} // Sử dụng 2 cột cho FlatList
          contentContainerStyle={styles.verticalFlatList} // Style cho nội dung của FlatList dọc
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Các style cho các thành phần trong component
const styles = StyleSheet.create({
  horizontalFlatList: {
    height: 100, // Chiều cao của FlatList ngang
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
  text: {
    fontSize: 16, // Kích thước chữ
  },
});
