const express = require('express');
const router = express.Router();
const SearchSchema = require(`${global.serverRoot}/schemas/search`);


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