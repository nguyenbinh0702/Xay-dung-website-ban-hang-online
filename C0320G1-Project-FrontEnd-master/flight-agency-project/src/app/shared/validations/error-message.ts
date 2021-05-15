export const PASSENGERS_ERRORS = {
    fullNameErrors: [
        { code: 'required', message: 'Vui lòng nhập họ tên' },
        { code: 'pattern', message: 'Họ tên không hợp lệ' }
    ],
    genderErrors: [
        { code: 'required', message: 'Vui lòng chọn giới tính' }
    ],
    baggagePriceErrors: [
        { code: 'required', message: 'Vui lòng chọn hành lý' }
    ],
    idCardErrors: [
        { code: 'required', message: 'Vui lòng số CMND hoặc passport' },
        { code: 'pattern', message: 'Số CMND hoặc passport không hợp lệ' }
    ],
    emailErrors: [
        { code: 'required', message: 'Vui lòng nhập địa chỉ email' },
        { code: 'format', message: 'Email không hợp lệ' },
    ],
    phoneNumberErrors: [
        { code: 'required', message: 'Vui lòng nhập số điện thoại' },
        { code: 'format', message: 'Số điện thoại không hợp lệ. Số điện thoại bao gồm 10 kí tự số' },
        { code: 'alphabel', message: 'Kí tự không hợp lệ. Vui lòng nhập kí tự số' },
    ]
};