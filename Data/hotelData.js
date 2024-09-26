export const hotelData = {
  id: 1,
  name: "Sheraton Can Tho",
  rating: 4.5,
  ratingScale: 5,
  pricePerNight: "12.000.000",
  currency: "VND",
  description: "Khách sạn Sheraton Can Tho tọa lạc bên bờ sông Hậu, mang đến cho du khách trải nghiệm nghỉ dưỡng đẳng cấp giữa lòng thành phố Cần Thơ. Với phong cách thiết kế hiện đại, khách sạn cung cấp 198 phòng nghỉ sang trọng, được trang bị đầy đủ tiện nghi và ban công riêng nhìn ra cảnh sông thơ mộng.",
  amenities: [
    "WiFi miễn phí",
    "Hồ bơi",
    "Nhà hàng",
    "Phòng Gym",
    "Spa",
    "Dịch vụ phòng 24/7",
    "Dịch vụ đỗ xe",
    "Bar trên tầng thượng",
    "Phòng hội nghị",
    "Khu vực vui chơi cho trẻ em"
  ],
  location: {
    city: "Cần Thơ",
    address: "Đường 123, Quận Ninh Kiều",
    coordinates: {
      latitude: 10.0452,
      longitude: 105.7469
    }
  },
  contact: {
    phone: "+84 123 456 789",
    email: "info@sheratoncantho.com",
    website: "https://sheratoncantho.com"
  },
  images: [
    { id: 1, src: require("../assets/Anh1.jpg"), name: "Da Lat" },
    { id: 2, src: require("../assets/Anh2.jpg"), name: "Vung Tau" },
    { id: 3, src: require("../assets/Anh3.jpg"), name: "Nha Trang" },
    { id: 4, src: require("../assets/Anh4.jpg"), name: "TP HCM" },
    { id: 5, src: require("../assets/Anh5.jpg"), name: "Can Tho" },
    { id: 6, src: require("../assets/Anh6.jpg"), name: "Ha Noi" },
    { id: 7, src: require("../assets/Anh7.jpg"), name: "Da Nang" },
    { id: 8, src: require("../assets/Anh8.jpg"), name: "Nha Trang" },
    { id: 9, src: require("../assets/Anh9.jpg"), name: "Ca Mau" },
    { id: 10, src: require("../assets/Anh10.jpg"), name: "Soc Trang" },
    { id: 11, src: require("../assets/Anh11.jpg"), name: "Bac Lieu" },
    { id: 12, src: require("../assets/Anh12.jpg"), name: "Kien Giang" },
    { id: 13, src: require("../assets/Anh13.jpg"), name: "Phu Quoc" },
    { id: 14, src: require("../assets/Anh14.jpg"), name: "Tra Vinh" },
    { id: 15, src: require("../assets/Anh15.jpg"), name: "Nga Nam" },
    { id: 16, src: require("../assets/Anh16.jpg"), name: "Vinh Long" }
  ],
  policies: {
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Miễn phí hủy phòng trước 24 giờ trước khi nhận phòng. Sau 24 giờ, phí hủy là 50% tổng số tiền đặt phòng.",
    paymentMethods: [
      "Thẻ tín dụng (Visa, MasterCard)",
      "Tiền mặt",
      "Chuyển khoản"
    ]
  }

};
