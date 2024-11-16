import { booking, bookingWithVoucher } from "./viewAPI"

export const postBooking = async (token, hotelId, roomId, checkIn, CheckOut, quantity, total, methodPayment, voucher) => {
    let rs
    if (voucher != null) {
        console.log("start");

        const voucherTicket = {
            id: voucher.code,
            discount: voucher.discount
        }

        rs = bookingWithVoucher(token, hotelId, roomId, checkIn, CheckOut, quantity, total, methodPayment, voucherTicket);

    } else {
        rs = booking(token, hotelId, roomId, checkIn, CheckOut, quantity, total, methodPayment);
    }
    return rs;
}