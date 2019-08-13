const mongoose = require('mongoose');
const { Schema } = mongoose;
/* 
    type : 데이터 타입
    required : 필수 여부
    unique :  중복여부, false이면 중복 허용.
 */
/**
 * 사용자 정의
 * userId(string)     : 사용자 아이디
 * userName(string)   : 사용자 이름
 * pwd(string)        : 비밀번호
 * salt(string)       : 해시암호 salt
 * email(number)      : 이메일
 * birthDay(string)   : 생년월일
 * phone(string)      : 전화번호
 * role(string)       : 권한
 * useYn(Boolean)     : 사용여부
 * created_at(Date)   : 생성날짜
 **/
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true, 
    },
    salt: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
    },
    birthDay: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    useYn: {
        type: Boolean,
    },
    created_at: {
        type: Date,
    }
});

module.exports = mongoose.model('User', userSchema, 'users');