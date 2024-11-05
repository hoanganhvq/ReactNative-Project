import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native';

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [digitalPayment, setDigitalPayment] = useState('Momo');

  const handleBooking = () => {
    Alert.alert('Booking Confirmation', `Payment method: ${paymentMethod}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chi tiết thanh toán</Text>

      <Text style={styles.subHeader}>Phương thức thanh toán</Text>
      <Text style={styles.infoText}>Mọi dữ liệu thanh toán được mã hóa và bảo mật</Text>

      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'hotel' && styles.activeButton]}
          onPress={() => setPaymentMethod('hotel')}
        >
          <Text style={styles.buttonText}>Thanh toán tại khách sạn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'creditCard' && styles.activeButton]}
          onPress={() => setPaymentMethod('creditCard')}
        >
          <Text style={styles.buttonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'creditCard' && (
        <View style={styles.creditCardContainer}>
          <Text style={styles.label}>Thẻ tín dụng/thẻ ghi nợ</Text>
          <TextInput
            style={styles.input}
            placeholder="Số thẻ tín dụng / thẻ ghi nợ"
            value={creditCardNumber}
            onChangeText={setCreditCardNumber}
            keyboardType="numeric"
          />
        </View>
      )}

      {paymentMethod === 'digital' && (
        <View style={styles.digitalPaymentContainer}>
          <Text style={styles.label}>Thanh toán kỹ thuật số</Text>
          <Picker
            selectedValue={digitalPayment}
            onValueChange={(itemValue) => setDigitalPayment(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Momo" value="Momo" />
            <Picker.Item label="PayPal" value="PayPal" />
            <Picker.Item label="VNPay" value="VNPay" />
          </Picker>
        </View>
      )}

      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>ĐẶT NGAY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  infoText: {
    color: 'green',
    fontSize: 12,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#EEE',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#4A90E2',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  creditCardContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  digitalPaymentContainer: {
    marginVertical: 10,
  },
  picker: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  bookingButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});