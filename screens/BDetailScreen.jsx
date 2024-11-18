import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../assets/color.json';
import payment from '../assets/payment/payment.json';
import { postBooking } from '../handleAPI/booking';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingDetails = ({ navigation, route }) => {
    const { roomId, hotel, checkInDate, checkOutDate, roomCount, roomName, roomPrice } = route.params;
    const rating = hotel.ratingsAverage ? hotel.ratingsAverage.toFixed(1) : 0;
    const days = checkInDate == checkOutDate ? 1 : Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) + 1;
    const [total, setTotal] = useState(roomCount * roomPrice * days);
    const [selectedPayment, setSelectedPayment] = useState('hotel');
    const [value, setValue] = useState(null);
    const [selected, setSelected] = useState("Cash");
    const [successfullyModal, setSuccessfullyModal] = useState(false);
    const [voucher, setVoucher] = useState(null);
    const [discount, setDiscount] = useState(0);



    const getBooking = async () => {
        const token = await AsyncStorage.getItem("userToken");
        console.log("total: " , total);
        let methodPayment = "Cash";

        if (selected == 'Credit Card' && selectedPayment != 'hotel') {
            methodPayment = 'Credit Card';
        } else if (selected == 'Digital') {
            methodPayment = selectedItem.label.trim();
        } else if (selected == 'Credit Card' && selectedPayment == 'hotel') {
            methodPayment = 'Cash'
        }

        console.log(methodPayment);

        console.log(roomId);
        const calculatedTotal = (roomCount * roomPrice * days) - discount;
         setTotal(calculatedTotal);

        const rs = await postBooking(token, hotel._id, roomId, checkInDate, checkOutDate, roomCount, total, methodPayment, voucher);

        if (rs.data.status == 'success') {
            setSuccessfullyModal(true);
        }
        navigation.navigate("HomeScreen");
    };


    const handleSelectVoucher = (voucher) => {
        setVoucher(voucher);
    
        if (voucher) {
            const discountValue = (parseInt(voucher.discount.replace('%', '')) / 100) * (roomCount * roomPrice * days);
            setDiscount(discountValue); // Cập nhật discount
            setTotal((roomCount * roomPrice * days) - discountValue); // Trừ discount khỏi total
        } else {
            setDiscount(0); // Không có voucher thì giảm giá = 0
            setTotal(roomCount * roomPrice * days); // Tổng trở lại giá trị gốc
        }
    };
    

    const DigitalPayment = [
        {
            label: ' Momo',
            value: '1',
            icon: () => <Image source={{ uri: payment.Momo }} style={{ width: 40, height: 40 }} />
        },
        {
            label: ' VNPay',
            value: '2',
            icon: () => <Image source={{ uri: payment.VNPay }} style={{ width: 40, height: 40 }} />
        },
        {
            label: ' Paypal',
            value: '3',
            icon: () => <Image source={{ uri: payment.Paypal }} style={{ height: 40, width: 40 }} />
        },
        {
            label: ' ZaloPay',
            value: '4',
            icon: () => <Image source={{ uri: payment.ZaloPay }} style={{ height: 40, width: 40 }} />
        },
    ]

    const selectedItem = DigitalPayment.find(item => item.value === value);


    const renderItem = item => {
        return (
            <View style={styles.item}>
                {item.icon()}
                <Text style={styles.textItem}>{item.label}</Text>

            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>



                <View style={styles.hotel}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{ uri: `https://raw.githubusercontent.com/JINO25/IMG/master/Hotel/${hotel.imgCover}` }}
                            style={styles.imageVertical}
                            resizeMode="cover"
                        />
                        <View style={styles.hotelInfo}>
                            <Text style={styles.textName}>{hotel.name}</Text>
                            <Text style={styles.textCity}>{hotel.city}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.rating}>⭐ {rating}</Text>
                                <Text style={styles.ratingSubtitle}>({hotel.ratingsQuantity} reviews)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={
                        {
                            backgroundColor: '#bbb',
                            height: 1,
                            marginVertical: 15,
                        }} />
                    <View style={styles.dates}>
                        <Text style={styles.dateText}>{checkInDate.toLocaleDateString('vi-VN', { weekday: 'short' })}, {checkInDate.getDate()}/{checkInDate.getMonth() + 1}/{checkInDate.getFullYear()}    </Text>
                        <FontAwesome name="arrow-right" type="font-awesome" size={16} color={color.tilte} />
                        <Text style={styles.dateText}>   {checkOutDate.toLocaleDateString('vi-VN', { weekday: 'short' })}, {checkOutDate.getDate()}/{checkOutDate.getMonth() + 1}/{checkOutDate.getFullYear()}</Text>
                    </View>

                    <View style={
                        {
                            backgroundColor: '#bbb',
                            height: 1,
                            marginVertical: 15,
                        }} />

                    <View style={styles.roomInfo}>
                        <Text style={styles.roomTitle}>{roomCount} x {roomName}</Text>
                    </View>
                </View>


                <View style={styles.priceSection}>
                    <View style={styles.voucherSection}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('VoucherScreen', { onGoBack: handleSelectVoucher, total: total })}>
                            <Text style={styles.voucherInput}>Thêm voucher</Text>
                            {voucher && <Text style={styles.voucherCode}>{voucher.code}</Text>}
                            <AntDesign name="right" size={20} color={color.tilte} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.totalSection}>
                        <Text style={styles.totalLabel}>Giá phòng</Text>
                        <Text style={styles.totalAmount}>{roomPrice * roomCount}</Text>
                    </View>
                    <View style={styles.sale}>
                        <Text style={styles.saleLable}>Số ngày</Text>
                        <Text style={styles.saleAmount}>x {days}</Text>
                    </View>
                    <View style={styles.sale}>
                        <Text style={styles.saleLable}>Giảm giá</Text>
                        <Text style={styles.saleAmount}>- {discount}</Text>
                    </View>
                    <View style={
                        {
                            backgroundColor: '#bbb',
                            height: 1,
                            marginVertical: 15,
                        }} />
                    <View style={styles.finalSection}>
                        <Text style={styles.finalLabel}>Giá tiền</Text>
                        <Text style={styles.finalAmount}>{total}</Text>
                    </View>
                </View>

                <View style={styles.paymentMethodSection}>
                    <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                    <View style={{ flexDirection: "row", padding: 5 }}>
                        <AntDesign style={styles.icon} color='#00bb38' name="Safety" size={16} />
                        <Text style={styles.secureText}> Mọi dữ liệu thanh toán được mã hóa và bảo mật</Text>
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

                {selectedPayment == 'immediate' && <View style={styles.paymentProcess}>
                    <View style={styles.creditCardSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ flexDirection: "row" }}
                                onPress={() => setSelected('Credit Card')}
                            >
                                <Icon
                                    name={selected === 'Credit Card' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                    size={20}
                                    color={color.tilte}
                                />
                                <View style={{ marginLeft: 18 }}>
                                    <Text style={styles.cardLabel}>Thẻ tín dụng/thẻ ghi nợ</Text>
                                    <View style={styles.cardIcons}>
                                        <FontAwesome name="cc-visa" size={30} color="white" style={styles.cardIcon} />
                                        <FontAwesome name="cc-mastercard" size={30} color="white" style={styles.cardIcon} />
                                        <FontAwesome name="cc-jcb" size={30} color="white" style={styles.cardIcon} />
                                        <FontAwesome name="cc-amex" size={30} color="white" style={styles.cardIcon} />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <Text style={{ color: 'white', marginLeft: 15, opacity: 0.8 }}>Số thẻ tín dụng / thẻ ghi nợ</Text>
                        <TextInput
                            style={styles.cardInput}
                            keyboardType="numeric"
                            placeholderTextColor='#999'
                            placeholder='0000-0000-0000-0000'
                        />
                    </View>


                    <View style={
                        {
                            backgroundColor: '#888',
                            height: 1,
                            marginVertical: 15,
                        }} />

                    <View style={styles.digitalPaymentSection}>
                        <View >
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginBottom: 20 }}
                                onPress={() => setSelected('Digital')}
                            >
                                <Icon
                                    name={selected === 'Digital' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                    size={20}
                                    color={color.tilte}
                                />
                                <View style={{ marginLeft: 18 }}>
                                    <Text style={styles.sectionSubtitle}>Thanh toán kỹ thuật số</Text>
                                    <View style={styles.cardIcons}>
                                        <Image style={styles.cardIcon} source={{ uri: payment.Momo }} />
                                        <Image style={styles.cardIcon} source={{ uri: payment.VNPay }} />
                                        <Image style={styles.cardIcon} source={{ uri: payment.Paypal }} />
                                        <Image style={styles.cardIcon} source={{ uri: payment.ZaloPay }} />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>


                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={DigitalPayment}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={selectedItem ? selectedItem.label : "Chọn hình thức thanh toán"} // Hiển thị tên đã chọn
                            value={value}
                            renderLeftIcon={() => (
                                selectedItem ? selectedItem.icon() : null
                            )}
                            onChange={item => {
                                setValue(item.value);
                            }}
                            renderItem={renderItem}

                        />

                    </View>

                </View>}


                <View style={styles.confirmationSection}>
                    <CheckBox checked={true} containerStyle={styles.checkBox} />
                    <Text style={styles.confirmationText}>
                        Chúng tôi sẽ gửi xác nhận đặt phòng của bạn và cả thanh toán chuyển khoản (nếu có) đến email của bạn
                    </Text>
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={getBooking} >
                    <Text style={styles.confirmText}>ĐẶT NGAY</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={successfullyModal}
                    onRequestClose={() => setSuccessfullyModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <AntDesign name="checkcircle" size={80} color="#4BB543" style={styles.successIcon} />
                            <Text style={styles.successText}>Thanh Toán Thành Công!</Text>
                            <Text style={styles.message}>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</Text>

                            <TouchableOpacity style={styles.closeButton} onPress={() => setSuccessfullyModal(false)}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.background_dark,
        flex: 1,
    },
    hotel: {
        flexDirection: 'column',
        borderWidth: 0.2,
        borderColor: '#555',
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
        fontSize: 20,
        color: '#ffffff', // Keeping the text white for visibility
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 10,
        opacity: 1
    },
    textCity: {
        fontSize: 15,
        color: '#b0b0b0',
        marginBottom: 30,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',

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
        justifyContent: 'center',
        marginVertical: 2,
    },
    dateText: {
        fontSize: 16,
        color: color.tilte,
        marginHorizontal: 4,
        opacity: 0.8,
        fontWeight: "500"
    },
    roomInfo: {
        paddingLeft: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roomTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: color.tilte,
        opacity: 0.8
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
        borderWidth: 0.2,
        borderColor: '#555',
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
        color: 'white',
        fontWeight: 'bold',

    },
    voucherCode: {
        color: color.tilte,
        fontSize: 16,
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
        borderWidth: 0.2,
        borderColor: '#555',
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
        color: '#00bb38',
        marginBottom: 16,
        fontSize: 13,
    },
    paymentMethodSection: {
        flexDirection: 'column',
        padding: 15,
        borderWidth: 0.2,
        borderColor: '#555',
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
        justifyContent: 'center',
    },
    optionButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 40,
        marginLeft: 2,
        marginRight: 8,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.35

    },
    optionButtonActive: {
        backgroundColor: color.tilte,
        opacity: 1
    },
    optionButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderColor: color.title
    },
    optionButtonTextActive: {
        color: 'black',
        opacity: 0.65
    },
    paymentProcess: {
        flexDirection: 'column',
        borderWidth: 0.2,
        borderColor: 'gray',
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
        color: 'white',
        fontWeight: 'bold'
    },
    cardIcons: {
        flexDirection: 'row',
        marginVertical: 8,
        marginLeft: 20

    },
    cardIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
        marginLeft: 3
    },
    cardInput: {
        fontSize: 18,
        paddingVertical: 8,
        marginBottom: 8,
        paddingLeft: 8,
        borderWidth: 1, borderRadius: 12, marginVertical: 10, flexDirection: 'row',
        borderColor: color.item_background_dark,
        color: 'white',
        backgroundColor: '#444',
        height: 50,
        marginLeft: 10,
    },

    digitalPaymentSection: {
        marginBottom: 16,
    },
    sectionSubtitle: {
        fontSize: 18,
        marginBottom: 8,
        color: 'white',
        fontWeight: "bold"
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
    dropdown: {
        height: 50,
        backgroundColor: '#444',
        borderRadius: 12,
        borderColor: color.item_background_dark,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'white'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    confirmationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    confirmationText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    emailBold: {
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: color.tilte,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginTop: 10,
        marginBottom: 20
    },
    confirmText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: color.item_background_dark,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10,
    },
    successIcon: {
        marginBottom: 15,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4BB543',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        backgroundColor: color.tilte,
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default BookingDetails;