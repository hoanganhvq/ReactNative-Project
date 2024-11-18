import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../assets/color.json';
import { collection, getDoc , getDocs} from 'firebase/firestore';
import { db } from '../config/firebase';


export default function VoucherScreen({ route, navigation }) {
  const {total} = route.params;
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  const { onGoBack } = route.params;
  const [vouchers, setVouchers] = useState([]);

  
  // const vouchers = [
  //   { id: '1', discount: '10%', code: 'MKB10', condition: 'Đơn từ 500.000 đ', applicable: total > 500 ? true: false },
  //   { id: '2', discount: '22%', code: 'MKB22', condition: 'Đơn từ 550.000 đ', applicable: total > 550 ? true: false },
  //   { id: '3', discount: '35%', code: 'MKB35', condition: 'Đơn từ 3.000.000 đ', applicable: total > 3000 ? true: false },
  //   { id: '4', discount: '40%', code: 'MKB40', condition: 'Đơn từ 5.000.000 đ', applicable: total > 5000 ? true: false },
  // ];

  const fetchVoucher =async()=>{
    try {
      const voucherCollection = collection(db, 'vouchers');
      
      const voucherSnapshot = await getDocs(voucherCollection);
      
      const voucherList = voucherSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          code: data.code,
          condition: data.condition,
          discount: data.discount,
          applicable: data.applicable,
          applicable: total >= data.applicable
        };
      });
  
      console.log("Vouchers: ", voucherList);
      setVouchers(voucherList);      
    } catch (error) {
      console.error("Error fetching vouchers: ", error);
      throw error;
    }
   
  }

  useLayoutEffect(()=>{
    fetchVoucher();
  })
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    if (onGoBack) {
      onGoBack(voucher);
    }
    navigation.goBack();
  };

  const handleOptionSelect = (voucherId, option) => {
    setSelectedOption((prev) => ({ ...prev, [voucherId]: option }));
  };

  const renderVoucherItem = ({ item }) => {
    const isSelected = selectedVoucher && selectedVoucher.id === item.id;
    const isUnavailable = !item.applicable;

    return (
      <TouchableOpacity
        style={[
          styles.voucherItem,
          isSelected && !isUnavailable && styles.selectedVoucher,
          isUnavailable && styles.unavailableVoucher,
        ]}
        onPress={() => item.applicable && setSelectedVoucher(item)}
        disabled={!item.applicable}
      >
        <Text style={[styles.discountText, isUnavailable && styles.unavailableText]}>Giảm {item.discount}</Text>
        <Text style={[styles.codeText, isUnavailable && styles.unavailableText]}>Mã voucher: {item.code}</Text>
        <Text style={[styles.conditionText, isUnavailable && styles.unavailableTextCondition]}>Điều kiện: {item.condition}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Chọn Voucher</Text>
        <FlatList
          data={vouchers}
          renderItem={renderVoucherItem}
          keyExtractor={(item) => item.id}
          extraData={selectedVoucher}
        />
        <TouchableOpacity
          style={styles.applyButton}
          disabled={!selectedVoucher}
          onPress={() => handleSelectVoucher(selectedVoucher)}
        >
          <Text style={styles.applyButtonText}>Dùng ngay</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Quý khách chỉ dùng được 1 mã</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.background_dark,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  voucherItem: {
    flexDirection: 'column',
    padding: 15,
    borderWidth:0.2,
    borderColor:'#555',
    backgroundColor: color.item_background_dark,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedVoucher: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  unavailableVoucher: {
    opacity: 0.5,
    backgroundColor: '#111',
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.tilte,
  },
  codeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  conditionText: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  unavailableText: {
    color: '#A9A9A9',
  },
  unavailableTextCondition:{
    color:'orange'
  },  
  applyButton: {
    backgroundColor: color.tilte,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 18,
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
    color: '#ddd',
  },
});
