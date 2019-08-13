const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
autoIncrement.initialize(mongoose.connection);
/* 
    type : 데이터 타입
    required : 필수 여부
    unique :  중복여부, false이면 중복 허용.
 */
/**
 * 파일 스키마
 * fileGroup(string)    : 파일 그룹
 * originalName(string) : 파일 원본 이름
 * fileName(string)     : 변경된 파일 이름
 * ext(string)          : 확장자
 * path(string)         : 경로
 * size(number)         : 파일크기
 * useYn(String)        : 사용여부
 * regId(string)        : 등록자
 * regDate(string)      : 등록날짜
 **/
const fileSchema = new Schema({
    fileGroup: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    ext: {
        type: String,
        required: true,
    },
    path: {
        type: String,
    },
    size: {
        type: Number,
        required: true,
    },
    regId: {
        type: String,
        required: true,
    },
    useYn: {
        type: String,
    },
    regDate: {
        type: Date,
        required: true,
    },
});
fileSchema.plugin(autoIncrement.plugin, 'File');
module.exports = mongoose.model('File', fileSchema, 'files');
