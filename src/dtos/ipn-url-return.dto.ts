import {
    IsAlphanumeric,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';

export class VnpayIpnUrlPayloadDTO {
    /**
     * Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4
     */
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(8, 8)
    vnp_TmnCode?: string;

    /**
     * Số tiền thanh toán. VNPAY phản hồi số tiền nhân thêm 100 lần.
     */
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(999999999999)
    vnp_Amount: number;

    /**
     * 	Mã Ngân hàng thanh toán. Ví dụ: NCB
     */
    @IsOptional()
    @Length(3, 20)
    vnp_BankCode: string;

    /**
     * Mã giao dịch tại Ngân hàng. Ví dụ: NCB20170829152730
     */
    @IsOptional()
    @Length(1, 255)
    vnp_BankTranNo: string;

    /**
     * Loại tài khoản/thẻ khách hàng sử dụng:ATM, QRCODE
     */
    @IsOptional()
    @IsString()
    @Length(2, 20)
    vnp_CardType: string;

    /**
     * @description The date time when the transaction is created
     * @default - Format is `yyyyMMddHHmmss`
     */
    @IsOptional()
    vnp_PayDate: number;

    /**
     * 	Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
     */
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    vnp_OrderInfo: string;

    /**
     * Mã giao dịch ghi nhận tại hệ thống VNPAY. Ví dụ: 20170829153052
     */
    @IsNotEmpty()
    @IsNumber()
    vnp_TransactionNo: number;

    /**
     * Mã phản hồi kết quả thanh toán. Quy định mã trả lời 00 ứng với kết quả Thành công cho tất cả các API.
     *
     * Tham khảo thêm tại bảng mã lỗi
     * @see https://sandbox.vnpayment.vn/apis/docs/bang-ma-loi/
     */
    @IsNotEmpty()
    vnp_ResponseCode: string | number;

    /**
     * 	Mã phản hồi kết quả thanh toán. Tình trạng của giao dịch tại Cổng thanh toán VNPAY.
     *
     *  -00: Giao dịch thanh toán được thực hiện thành công tại VNPAY
     *
     *  -Khác 00: Giao dịch không thành công tại VNPAY
     *
     * Tham khảo thêm tại bảng mã lỗi
     * @see https://sandbox.vnpayment.vn/apis/docs/bang-ma-loi/
     */
    @IsNotEmpty()
    vnp_TransactionStatus: string | number;

    /**
     * Giống mã gửi sang VNPAY khi gửi yêu cầu thanh toán. Ví dụ: 23554
     */
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    vnp_TxnRef: string;

    /**
     * Loại mã băm sử dụng: SHA256, HmacSHA512
     */
    @IsString()
    vnp_SecureHashType?: string;

    /**
     * Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ VNPAY về Website TMĐT.
     * Cần kiểm tra đúng checksum khi bắt đầu xử lý yêu cầu (trước khi thực hiện các yêu cầu khác)
     */
    @IsNotEmpty()
    @IsString()
    @Length(32, 256)
    vnp_SecureHash: string;
}

export interface VnpayReturnObject extends VnpayIpnUrlPayloadDTO {
    /**
     * @vi_vn Trạng thái giao dịch
     */
    isSuccess: boolean;

    /**
     * @vi_vn Thông báo lỗi
     */
    message: string;
}
