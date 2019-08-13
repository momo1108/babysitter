const express = require('express');
const router = express.Router();
const SearchSchema = require(`${global.serverRoot}/schemas/search`);

router.post('/register',(req,res)=>{

    let human = new SearchSchema({
        userName: req.body.name,
        age: req.body.age,
        address: req.body.address.split(" ")[0],
        addressdetail: req.body.address,
        workStart: req.body.start,
        workEnd: req.body.end,
        nationality: "korea",
        title: req.body.title,
        body: req.body.body,
        payment: req.body.payment,
        type: req.body.type,
        career: req.body.career,
        gender: req.body.gender
    })
    human.save((err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
        }
    })
})
// 리액트 서버로부터 익스프레스 서버에 데이터베이스 접근 요청
router.post('/show', (req, res)=>{
    console.log('지역 : '+req.body.local);
    console.log('세부지역 : '+req.body.localdetail);
    console.log('근무형태 : '+req.body.type);
    console.log('경력 : '+req.body.career);
    console.log('국적 : '+req.body.nationality);
    console.log('성별 : '+req.body.gender);
    let select = {};
    if(req.body.localdetail[0]) {
        let arr = [];
        if(req.body.localdetail.length === 1) {
            if(req.body.localdetail[0].split(" ")[1] === "전체"){
                select.address = req.body.localdetail[0].split(" ")[0];
            } else select.detailaddress = req.body.localdetail[0];
        }
        else {
            for (let i = 0; i < req.body.localdetail.length; i++) {
                if(req.body.localdetail[i].split(" ")[1] === "전체"){
                    arr.push({ address: req.body.localdetail[i].split(" ")[0]})
                } else arr.push({ detailaddress: req.body.localdetail[i] });
            }
            select = {$or: arr}
        }
    }
    if(req.body.type>0) select.type = req.body.type;
    if(req.body.career>0) select.career = {'$gte': req.body.career};
    if(req.body.nationality!='all') select.nationality = req.body.nationality;
    if(req.body.gender!='all') select.gender = req.body.gender;
    SearchSchema.find(select, (err,result)=>{
        if(err) console.log(err)
        else {
            console.log(result);
            res.json(result);
        }
    })
});

module.exports = router;