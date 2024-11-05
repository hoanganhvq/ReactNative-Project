import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const vouchers = [
  { id: '1', discount: '22%', code: 'MKB22', condition: 'Đơn từ 1.000.000 đ', applicable: true },
  { id: '2', discount: '10%', code: 'MKB10', condition: 'Đơn từ 500.000 đ', applicable: true },
  { id: '3', discount: '40%', code: 'MKB10', condition: 'Đơn từ 5.000.000 đ', applicable: false },
  { id: '4', discount: '35%', code: 'MKB10', condition: 'Đơn từ 3.000.000 đ', applicable: false },
];

export default function VoucherScreen() {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedOption, setSelectedOption] = useState({}); // Stores selected radio button for each voucher

  const handleSelectVoucher = (id) => {
    setSelectedVoucher(id);
  };

  const handleOptionSelect = (voucherId, option) => {
    setSelectedOption((prev) => ({ ...prev, [voucherId]: option }));
  };

  const renderVoucherItem = ({ item }) => {
    const isSelected = selectedVoucher === item.id;

    return (
      <TouchableOpacity
        style={[styles.voucherItem, isSelected && styles.selectedVoucher, !item.applicable && styles.unavailableVoucher]}
        onPress={() => item.applicable && handleSelectVoucher(item.id)}
        disabled={!item.applicable}
      >
        <Text style={styles.discountText}>Giảm {item.discount}</Text>
        <Text style={styles.codeText}>Mã voucher: {item.code}</Text>
        <Text style={styles.conditionText}>Điều kiện: {item.condition}</Text>

        {/* Radio Buttons */}
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleOptionSelect(item.id, 'Discount')}
          >
            <Icon
              name={selectedOption[item.id] === 'Discount' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={20}
              color="#D32F2F"
            />
            <Text style={styles.radioText}>Discount</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleOptionSelect(item.id, 'Cashback')}
          >
            <Icon
              name={selectedOption[item.id] === 'Cashback' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={20}
              color="#D32F2F"
            />
            <Text style={styles.radioText}>Cashback</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chọn Voucher</Text>
      <FlatList
        data={vouchers}
        renderItem={renderVoucherItem}
        keyExtractor={(item) => item.id}
        extraData={selectedVoucher}
      />
<TouchableOpacity style={styles.applyButton} onPress={() => alert('Voucher applied!')}>
        <Text style={styles.applyButtonText}>Dùng ngay</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Quý khách chỉ dùng được 1 mã</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  voucherItem: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  selectedVoucher: {
    borderColor: '#4CAF50',
  },
  unavailableVoucher: {
    opacity: 0.5,
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  codeText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  conditionText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  applyButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 12,
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
});