const express = require('express');
const router = express.Router();
const SearchSchema = require(`${global.serverRoot}/schemas/search`);

router.get('/register', (req, res) => {

    // let human = new SearchSchema({
    //     "user_id": "goguma",
    // "pwd" : "goguma111",
    // "name" : "오경례",
    // "birthday": 19990309,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a4", "a5"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "서울시", "addr2": "강남구", "addr3": "일원동" },
    // "care_date" : {
    //        "start_date": new Date("2019-06-04T00:00"),
    //        "end_date": new Date("2019-06-05T00:00"),
    //        "start_time": new Date("2019-06-04T00:00"),
    //        "end_time": new Date("2019-06-05T00:00"),
    //        "days": [1, 2, 3, 4, 5, 6]
    // },
    // "app_form": "사람을 구합니다. 꼭 보세요. "
    // })
    // human.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human2 = new SearchSchema({
    //     "user_id": "oksusu",
    // "pwd" : "yogiyo123",
    // "name" : "옥수수",
    // "birthday": 19930325,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b1", "b3"],
    // "care_area" : {"addr1" : "서울시", "addr2": "서초구", "addr3": "반포동" },
    // "care_date" : {
    //        "start_date": new Date("2019-06-04T00:00"),
    //        "end_date": new Date("2019-06-05T00:00"),
    //        "start_time": new Date("2019-06-04T00:00"),
    //        "end_time": new Date("2019-06-05T00:00"),
    //        "days": [1, 4, 5]
    // },
    // "app_form": "사람을 구합니다. 고구마도 있어요."
    // })
    // human2.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human3 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human3.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human4 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human4.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human5 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human5.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human6 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human6.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human7 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human7.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human8 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human8.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human9 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human9.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
    // let human10 = new SearchSchema({
    //     "user_id": "jokimbab8282",
    // "pwd" : "kimbab8282",
    // "name" : "김밥나라",
    // "birthday": 20030303,
    // "terms_use": true,
    // "terms_personal_info": true,
    // "terms_event": true,
    // "self_certi": true,
    // "role" : "P",
    // "hope_h_wage" : 8500,
    // "negotiations" : true,
    // "activity" : ["a1", "a2", "a3"],
    // "range_age" : [10,60],
    // "children" : ["b2", "b3"],
    // "care_area" : {"addr1" : "성남시", "addr2": "수정구", "addr3": "위례동" },
    // "care_date" : {
    //        "start_date": new Date("2019-07-09T00:00"),
    //        "end_date": new Date("2019-07-10T00:00"),
    //        "start_time": new Date("2019-07-09T00:00"),
    //        "end_time": new Date("2019-07-10T00:00"),
    //        "days": [0, 2, 3, 4 ]
    // },
    // "app_form": "사람을 구합니다. 꼭 누르세요. "
    // })
    // human10.save((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log(result);
    //     }
    // })
})
// 리액트 서버로부터 익스프레스 서버에 데이터베이스 접근 요청
router.post('/jobshow', (req, res) => {
    console.log('지역 : ' + req.body.care_area);
    console.log('요일 : ' + req.body.days);
    console.log('시작시간 : ' + req.body.start_time);
    console.log('종료시간 : ' + req.body.end_time);
    console.log('아기 나이 : ' + req.body.children);
    console.log('활동 종류 : ' + req.body.activity);
    console.log('희망시급 : ' + req.body.hope_h_wage);
    let select = {};
    // if (req.body.care_area[0]) {
    //     let arr = [];
    //     if (req.body.care_area.length === 1) {
    //         if (req.body.care_area[0].split(" ")[1] === "전체") {
    //             select.care_area = { addr1: req.body.care_area[0].split(" ")[0] }
    //         } else select.care_area = {
    //             addr1: req.body.care_area[0].split(" ")[0],
    //             addr2: req.body.care_area[0].split(" ")[1]
    //         }
    //     }
    //     else {
    //         for (let i = 0; i < req.body.care_area.length; i++) {
    //             if (req.body.care_area[i].split(" ")[1] === "전체") {
    //                 arr.push({ care_area: { addr1: req.body.care_area[i].split(" ")[0]} })
    //             } else arr.push({ care_area: {
    //                 addr1: req.body.care_area[0].split(" ")[0],
    //                 addr2: req.body.care_area[0].split(" ")[1]
    //             } });
    //         }
    //         select = { $or: arr }
    //     }
    // }

    // select.care_date = {};
    // if (req.body.days.length === 0){
    // } else{
    //     req.body.days.sort();
    //     select.care_date.days = req.body.days;
    // }
    // if(req.body.start_time === 0 && req.body.end_time === 0){
    // } else{
    //     select.care_date.start_time = {'$gte': req.body.start_time};
    //     select.care_date.end_time = {'$lte': req.body.end_time};
    // }
    req.body.children.sort();
    req.body.children.forEach((e,i) => {
        let num = parseInt(e)+1;
        req.body.children[i] = 'b'+num;
    });
    req.body.activity.sort();
    req.body.activity.forEach((e,i) => {
        let num = parseInt(e)+1;
        req.body.activity[i] = 'a'+num;
    });
    if(req.body.children.length>1 && req.body.activity.length>1){
        let childarr = [];
        req.body.children.forEach((e,i)=>{
            childarr.push({children: {$elemMatch: {$eq: e}}});
        })
        let activityarr = [];
        req.body.activity.forEach((e,i)=>{
            activityarr.push({activity: {$elemMatch: {$eq: e}}});
        })
        select.$and = [{$or: childarr}, {$or: activityarr}];
    } else {
        if(req.body.children.length===0){
        } else if(req.body.children.length===1){
            select.children = { $elemMatch: {$eq: req.body.children[0]} };
        } else{
            let childarr = [];
            req.body.children.forEach((e,i)=>{
                childarr.push({children: {$elemMatch: {$eq: e}}});
            })
            select.$or = childarr;
        }
        if(req.body.activity.length===0){
        } else if(req.body.activity.length===1){
            select.activity = { $elemMatch: {$eq: req.body.activity[0]} };
        } else{
            let activityarr = [];
            req.body.activity.forEach((e,i)=>{
                activityarr.push({activity: {$elemMatch: {$eq: e}}});
            })
            select.$or = activityarr;
        }
    }
    select.hope_h_wage = {'$gte': req.body.hope_h_wage};
    console.log(select);
    // select.children = 
    SearchSchema.find(select, (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result);
            res.json(result);
        }
    })
});
// 리액트 서버로부터 익스프레스 서버에 데이터베이스 접근 요청
// router.post('/sittershow', (req, res) => {
//     console.log('지역 : ' + req.body.care_area);
//     console.log('요일 : ' + req.body.days);
//     console.log('시작시간 : ' + req.body.start_time);
//     console.log('종료시간 : ' + req.body.end_time);
//     console.log('아기 나이 : ' + req.body.children);
//     console.log('활동 종류 : ' + req.body.activity);
//     console.log('희망시급 : ' + req.body.hope_h_wage);
//     let select = {};
//     if (req.body.care_area[0]) {
//         if (req.body.care_area[0].split(" ")[1] === "전체") {
//             select.care_area = { addr1: req.body.care_area[0].split(" ")[0] }
//         } else select.care_area = {
//             addr1: req.body.care_area[0].split(" ")[0],
//             addr2: req.body.care_area[0].split(" ")[1]
//         }
//     }
//     if (req.body.days.length === 0){
//     } else{
//         req.body.days.sort();
//         select.care_date.days = req.body.days
//     }
//     SearchSchema.find(select, (err, result) => {
//         if (err) console.log(err)
//         else {
//             console.log(result);
//             res.json(result);
//         }
//     })
// });

module.exports = router;