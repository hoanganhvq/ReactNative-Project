import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';


const BookingDetails = (navigation, route) => {
  const {hotel, checkInDate,checkOutDate, roomCount} = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chi tiết thanh toán</Text>
      </View>
      
      {/* Payment Method Section */}
      <View style={styles.paymentMethodSection}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <Text style={styles.secureText}>
          ✅ Mọi dữ liệu thanh toán được mã hóa và bảo mật
        </Text>

        {/* Payment Options */}
        <View style={styles.paymentOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Thanh toán tại khách sạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionButton, styles.optionButtonActive]}>
            <Text style={styles.optionButtonTextActive}>Thanh toán ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Credit Card Input */}
        <View style={styles.creditCardSection}>
          <Text>Thẻ tín dụng/thẻ ghi nợ</Text>
          <View style={styles.cardIcons}>
            <Image source={{ uri: 'https://example.com/visa-icon.png' }} style={styles.cardIcon} />
            <Image source={{ uri: 'https://example.com/mastercard-icon.png' }} style={styles.cardIcon} />
            <Image source={{ uri: 'https://example.com/jcb-icon.png' }} style={styles.cardIcon} />
          </View>
          <TextInput
            style={styles.cardInput}
            placeholder="Số thẻ tín dụng / thẻ ghi nợ"
            keyboardType="numeric"
          />
          <Icon name="lock" type="font-awesome" style={styles.lockIcon} />
        </View>

        {/* Digital Payment */}
        <View style={styles.digitalPaymentSection}>
          <Text style={styles.sectionSubtitle}>Thanh toán kỹ thuật số</Text>
          <View style={styles.digitalOptions}>
            <CheckBox checked={false} containerStyle={styles.checkBox} />
            <Image source={{ uri: 'https://example.com/momo-icon.png' }} style={styles.digitalIcon} />
            <Text style={styles.dropdownText}>Momo</Text>
            <Icon name="chevron-down" type="font-awesome" style={styles.dropdownIcon} />
          </View>
        </View>
      </View>

      {/* Email Confirmation */}
      <View style={styles.confirmationSection}>
        <CheckBox checked={true} containerStyle={styles.checkBox} />
        <Text style={styles.confirmationText}>
          Chúng tôi sẽ gửi xác nhận đặt phòng của bạn và cả thanh toán chuyển khoản (nếu có) đến <Text style={{ fontWeight: 'bold' }}>dads@gmail.com</Text>
        </Text>
      </View>

      {/* Book Button */}
      <Button title="ĐẶT NGAY" onPress={() => {}} color="#1E90FF" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodSection: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  secureText: {
    color: '#4CAF50',
    marginBottom: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    borderRadius: 4,
  },
  optionButtonActive: {
    backgroundColor: '#1E90FF',
  },
  optionButtonText: {
    color: '#333',
  },
  optionButtonTextActive: {
    color: '#fff',
  },
  creditCardSection: {
    marginBottom: 16,
  },
  cardIcons: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  cardIcon: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  cardInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginVertical: 8,
    fontSize: 14,
  },
  lockIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  digitalPaymentSection: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  digitalOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
  },
  checkBox: {
    margin: 0,
    padding: 0,
  },
  digitalIcon: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  confirmationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  confirmationText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default BookingDetails;