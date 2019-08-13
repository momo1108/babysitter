const mongoose = require('mongoose');

const { Schema } = mongoose;

/* 
    type : 데이터 타입
    required : 필수 여부
    unique :  중복여부, false이면 중복 허용.
 */
/**
 * local(string)  : 지역
 * wStyle(number) : 형태
 * career(number) : 요구경력
 * gender(string) : 성별
 * name(string)   : 이름
 * phone(string)  : 전화번호
 * subject(string) : 제목
 * content(string) : 내용
 **/
const recruitSchema = new Schema({
    local: {
        type: String,
        required: true,
    },
    wStyle: {
        type: Number,
        required: true,
    },
    career: {
        type: Number,
        required: true, 
    },
    gender: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
        required: true, 
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
        required: true, 
    },
    content: {
        type: Date,
    }
});

module.exports = mongoose.model('Recruit', recruitSchema, 'recruits');