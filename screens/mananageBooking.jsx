import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import color from "../assets/color.json";
import { getBookingForHotelier } from '../handleAPI/viewAPI';


export default function Component({ navigation }) {
  const hotelId = "67047e37640239aaa10d370a";

  const [booking, setBooking] = useState([]);



  const getBooking = async () => {
    const data = await getBookingForHotelier(hotelId);
    setBooking(data.data.data);
    console.log("Booking", data.data.data);
  }

  useEffect(() => {
    getBooking()
  }, [])


  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Tên:  </Text>
        <Text style={styles.value}>{item.user.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:  </Text>
        <Text style={styles.value}>{item.user.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Số điện thoại:  </Text>
        <Text style={styles.value}>{item.user.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Loại phòng:  </Text>
        <Text style={styles.value}>{item.room.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Thời gian:</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.value}>{new Date(item.checkInDate).toLocaleDateString()}</Text>
          <FontAwesome name="long-arrow-right" size={16} color="#666" style={styles.arrowIcon} />
          <Text style={styles.value}>{new Date(item.checkOutDate).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={booking}
        renderItem={renderBookingItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background_dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    color: color.item_background_dark
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: color.item_background_dark,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#999',
    width: '100%',
    marginVertical: 10,
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: {
    width: 100,
    fontSize: 16,
    color: 'white',
    marginRight: 7
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
});