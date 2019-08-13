const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * 사용자 정의
 * image(string)      : 프로필 이미지 주소 - join
 * userName(string)   : 사용자 이름 - join
 * age(number)        : 사용자 나이 - join
 * address(string)    : 희망 근무지 (시/도)
 * detailaddress(string) : 상세 희망 근무지
 * workStart(date)    : 희망 근무시간(시작~)
 * workEnd(date)      : 희망 근무시간(~끝)
 * nationality(string): 국적 - join
 * title(string)      : 자기소개제목
 * body(string)       : 자기소개본문
 * payment(number)    : 희망 급여
 * type(number)       : 근무 형태
 * career(number)     : 경력 - join
 * gender(string)     : 성별 - join
 **/
const userSchema = new Schema({
    image: {
        type: String,
        default: '/images/default.jpg'
    },
    userName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    detailaddress: {
        type: String,
        required: true
    },
    workStart: {
        type: String,
        required: true
    },
    workEnd: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    career: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('registereduser', userSchema);