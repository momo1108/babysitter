const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true, 
    },
    birthday: {
        type: Number,
        required: true, 
    },
    terms_use: {
        type: Boolean,
        required: true, 
    },
    terms_personal_info: {
        type: Boolean,
        required: true,
    },
    terms_event: {
        type: Boolean,
        required: true,
    },
    self_certi: {
        type: Boolean,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    hope_h_wage: {
        type: Number,
        required: true,
    },
    negotiations: {
        type: String,
        required: true,
    },
    negotiations: {
        type: String,
        required: true,
    },
    activity: {
        type : Array,
        required: true,
    },
    // 부모 key
    range_age: {
        type: Array
    },
    children: {
        type: Array
    },
    care_area: {
        type: Object
    },
    care_date: {
        type: Object
    },
    app_form: {
        type: String
    },
    // 베이비 시터 key
    care_age: {
        type: Array
    },
    activity_area: {
        type: Array
    },
    activity_date: {
        type: Object
    },
    terms_cctv: {
        type: Boolean
    },
    profile: {
        type: Number
    },
    self_intro: {
        type: String
    }
});

module.exports = mongoose.model('tb_member', memberSchema, 'tb_member');