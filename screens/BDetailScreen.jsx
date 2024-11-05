import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../assets/color.json';

const BookingDetails = ({ navigation, route }) => {
    const { hotel, checkInDate, checkOutDate, roomCount, roomName } = route.params;
    const rating = hotel.ratingsAverage ? hotel.ratingsAverage.toFixed(1) : 0;
    const [selectedPayment, setSelectedPayment] = useState('hotel');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.hotel}>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            source={{ uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${hotel.imgCover}` }}
                            style={styles.imageVertical}
                            resizeMode="cover"
                        />
                        <View style = {styles.hotelInfo}> 
                            <Text style={styles.textName}>{hotel.name}</Text>
                            <Text style={styles.textCity}>{hotel.city}</Text>
                            <View style = {styles.ratingContainer}>
                                <Text style={styles.rating}>⭐ {rating}</Text>
                                <Text style={styles.ratingSubtitle}>({hotel.ratingsQuantity} reviews)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={
                        {backgroundColor: '#888',
                        height: 1,
                        marginVertical: 15,}}/>
                    <View style={styles.dates}>
                        <Text style={styles.dateText}>{checkInDate.toLocaleDateString('vi-VN', { weekday: 'short' })}, {checkInDate.getDate()}/{checkInDate.getMonth() + 1}/{checkInDate.getFullYear()}    </Text>
                        <Icon name="arrow-right" type="font-awesome" size={16} color={color.tilte}/>
                        <Text style={styles.dateText}>   {checkOutDate.toLocaleDateString('vi-VN', { weekday: 'short' })}, {checkOutDate.getDate()}/{checkOutDate.getMonth() + 1}/{checkOutDate.getFullYear()}</Text>
                    </View>

                    <View style={
                        {backgroundColor: '#888',
                        height: 1,
                        marginVertical: 15,}}/>

                    <View style={styles.roomInfo}>
                    <Text style={styles.roomTitle}>{roomCount} x {roomName}</Text>
                </View>
                </View>
                        
            
                <View style={styles.priceSection}>
                    <View style={styles.voucherSection}>
                        <Text style={styles.voucherInput}>Thêm voucher</Text>
                        <Text style={styles.voucherCode}>MKB22 </Text>
                        <AntDesign name="right" size={20} color={color.tilte}  />

                    </View>
                    <View style={styles.totalSection}>
                        <Text style={styles.totalLabel}>Giá phòng</Text>
                        <Text style={styles.totalAmount}>1.800.000 đ</Text>
                    </View>
                    <View style={styles.sale}>
                        <Text style={styles.saleLable}>Giảm giá</Text>
                        <Text style={styles.saleAmount}>0</Text>
                    </View>
                    <View style={
                        {backgroundColor: '#888',
                        height: 1,
                        marginVertical: 15,}}/>
                    <View style={styles.finalSection}>
                        <Text style={styles.finalLabel}>Giá tiền</Text>
                        <Text style={styles.finalAmount}>1.404.000 đ</Text>
                    </View>
                </View>

                <View style={styles.paymentMethodSection}>
                    <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                    <View style = {{flexDirection:"row", padding:5}}>  
                        <AntDesign name="check" size={20} color={color.tilte} />
                        <Text style={styles.secureText}>
                            Mọi dữ liệu thanh toán được mã hóa và bảo mật
                        </Text>
                    </View>

                    <View style={styles.paymentOptions}>
                        <TouchableOpacity
                            style={[styles.optionButton, selectedPayment === 'hotel' && styles.optionButtonActive]}
                            onPress={() => setSelectedPayment('hotel')}
                        >
                            <Text style={[styles.optionButtonText, selectedPayment === 'hotel' && styles.optionButtonTextActive]}>Thanh toán tại khách sạn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, selectedPayment === 'immediate' && styles.optionButtonActive]}
                            onPress={() => setSelectedPayment('immediate')}
                        >
                            <Text style={[styles.optionButtonText, selectedPayment === 'immediate' && styles.optionButtonTextActive]}>Thanh toán ngay</Text>
                        </TouchableOpacity>
                    </View>

                    </View>
                    <View style={styles.paymentProcess}>
                        <View style={styles.creditCardSection}>
                            <View>

                                <View>
                                    <Text style={styles.cardLabel}>Thẻ tín dụng/thẻ ghi nợ</Text>
                                    <View style={styles.cardIcons}>
                                         <FontAwesome name="cc-visa" size={30} color="white" style={styles.cardIcon}/>
                                         <FontAwesome name="cc-mastercard" size={30} color="white" style={styles.cardIcon} />
                                         <FontAwesome name="cc-jcb" size={30} color="white" style={styles.cardIcon}/>
                                         <FontAwesome name="cc-amex" size={30} color="white" style={styles.cardIcon}/> 
                                    </View>
                                </View>
                            </View>
                           
                            <Text style={{color:'white'}}>Số thẻ tín dụng / thẻ ghi nợ</Text>
                                <TextInput
                                    style={styles.cardInput}
                                    keyboardType="numeric"
                                    placeholderTextColor='white'
                                />
                        </View>

                        
                    <View style={
                        {backgroundColor: '#888',
                        height: 1,
                        marginVertical: 15,}}/>

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
                   
                <View style={styles.confirmationSection}>
                    <CheckBox checked={true} containerStyle={styles.checkBox} />
                    <Text style={styles.confirmationText}>
                        Chúng tôi sẽ gửi xác nhận đặt phòng của bạn và cả thanh toán chuyển khoản (nếu có) đến <Text style={styles.emailBold}>dads@gmail.com</Text>
                    </Text>
                </View>

                <Button title="ĐẶT NGAY" onPress={() => { }} color="#1E90FF" />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: color.background_dark,
        flex: 1,
    },
    hotel: {
        flexDirection: 'column', 
        padding: 15,
        backgroundColor: color.item_background_dark, // Darker background for better contrast
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
      imageVertical: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 20,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.5)", // Đặt màu trắng với độ mờ 50%
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
    
    },
    
      textName: {
        fontSize: 18,
        color: '#ffffff', // Keeping the text white for visibility
        fontWeight: 'bold',
        marginBottom:20,
        marginTop:10,
      },
      textCity: {
        fontSize: 14,
        color: '#b0b0b0',
        marginBottom:20,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      rating: {
        fontSize: 16,
        color: color.tilte,
        marginRight: 5,
        fontWeight: "bold",
      },
      ratingSubtitle: {
        fontSize: 14,
        color: '#b0b0b0',
      },
    dates: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginVertical: 10,
    },
    dateText: {
        fontSize: 18,
        color: color.tilte,
        marginHorizontal: 4,
        fontWeight:"bold"
    },
    roomInfo: {
        paddingLeft: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        justifyContent:'center',
        alignItems:'center'
    },
    roomTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.tilte,
    },
    priceSection: {
        flexDirection: 'column', 
        padding: 15,
        backgroundColor: color.item_background_dark, // Darker background for better contrast
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
    voucherSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    voucherInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginRight: 8,
        fontSize: 20,
        paddingVertical: 8,
        color:'white',
        fontWeight: 'bold',

    },
    voucherCode: {
        color: color.tilte,
        fontSize:16,
        fontWeight: 'bold',

    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',

    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ccc',
    },
    sale: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    saleLable: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',

    },
    saleAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ccc',
    },
    finalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    finalLabel: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
    },
    finalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5722',
    },
    paymentMethodSection: {
        flexDirection: 'column', 
        padding: 15,
        backgroundColor: color.item_background_dark, // Darker background for better contrast
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'white',
    },
    secureText: {
        color: '#4CAF50',
        marginBottom: 16,
    },
    paymentMethodSection: {
        flexDirection: 'column',
        padding: 15,
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
    paymentOptions: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent:'center',
    },
    optionButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 40,
        marginLeft:2,
        marginRight: 8,
        backgroundColor: 'gray',
        justifyContent:'center',
        alignItems:'center'

    },
    optionButtonActive: {
        backgroundColor: color.tilte,
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight:'bold',
        color: '#555',
        borderColor:color.title
    },
    optionButtonTextActive: {
        color: '#ffffff',
    },
    paymentProcess:{
        flexDirection: 'column', 
        padding: 15,
        backgroundColor: color.item_background_dark, // Darker background for better contrast
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
 
    cardLabel: {
        fontSize: 18,
        marginBottom: 8,
        color:'white',
    },
    cardIcons: {
        flexDirection: 'row',
        marginBottom: 8,
        marginLeft:4
    },
    cardIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
        marginLeft:3
    },
    cardInput: {
        fontSize: 18,
        paddingVertical: 8,
        marginBottom: 8,
        paddingLeft:8,
        borderColor:color.tilte, borderWidth:1, borderRadius:5,marginVertical:10, flexDirection:'row',
        color:'white',
        height:50,
    },

    digitalPaymentSection: {
        marginBottom: 16,
    },
    sectionSubtitle: {
        fontSize: 18,
        marginBottom: 8,
        color:'white',
    },
    digitalOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkBox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    digitalIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    dropdownIcon: {
        marginLeft: 8,
    },
    confirmationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    confirmationText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    emailBold: {
        fontWeight: 'bold',
    },
});

export default BookingDetails;
