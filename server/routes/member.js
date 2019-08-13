const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const matchPwd = require(`${global.serverRoot}/server_modules/matchPwd`);
const hasher = require('pbkdf2-password')(); // 암호화 모듈을 가져옴.
const { imgUpload, docUpload } = require(`${global.serverRoot}/server_modules/fileupload`);
const UserSchema = require(`${global.serverRoot}/schemas/user`);
const FileSchema = require(`${global.serverRoot}/schemas/file`);
const os = require("os");


// 사용자 목록 json 파일 확인
// if (fs.existsSync(`${global.serverRoot}/data/userlist.json`)){
//     console.log('userlist.json 파일 있냐?', fs.existsSync(`${global.serverRoot}/data/userlist.json`));
//     let rawdata = fs.readFileSync(`${global.serverRoot}/data/userlist.json`);
//     userList = JSON.parse(rawdata);
// }

// 로그인 액션
router.post('/signin', async (req, res, next)=>{
    console.log('로그인 요청 받았다.');
    let data = {};
    try{
        const user = await UserSchema.findOne({userId: req.body.userId});
        // 유저가 있다면
        if(user){
            const chkPwd = await matchPwd(req.body.userId, req.body.pwd, user); // 비밀번호 체크
            console.log('chkPwd:', chkPwd);
            if(chkPwd){
                const file = await FileSchema.findOne({regId: req.body.userId, fileGroup: req.body.groupId}).sort('desc');
                console.log('file:', file);
                req.session.save(function() { 
                    // 세션 저장 후 다음코드 실행
                    data.state = 1;
                    data.message = '로그인에 성공했습니다.';
                    // 파일이 있을 경우
                    if(file){
                        data.user = {
                            ...user, 
                            image: (file.path + '/' + file.fileName + file.ext)
                        };
                    } else {
                        data.user = user;
                    }
                    console.log('로그인 성공');
                    res.json(data); 
                });
            } else {
                data.state = 0;
                data.message = '아이디와 비밀번호가 일치하지 않습니다.';
                res.json(data); 
            }
       } else {
            data.state = 0;
            data.message = '아이디를 가지고 있는 회원이 없습니다.';
            res.json(data);
       }
    } catch(err) { 
        next(err)
    }
});
// 로그아웃 액션
router.get('/signout', (req, res) => {
    req.session.destroy(() => {
        let data = {
            state : 1
        };
        res.json(data);
    });
});
// 아이디 중복 체크
router.get('/chkid', (req, res, next)=>{
    let data={};
    UserSchema.findOne({userId: req.query.userId})
        .count()
        .then((user) => {
            console.log("성공");
            console.log(user);
            console.log(typeof user);
            if(user){
                data.state = 0;
                data.message = '중복된 아이디입니다.';     
            }else{
                data.state = 1;
                data.message = '사용할 수 있는 아이디입니다.';    
            }
            res.json(data);
        })
        .catch((err) => {
            next(err)
        });
});
// 프로필 사진 업로드
router.post('/save_profile', (req, res, next)=>{
    console.log('파일 업로드 전송');
    imgUpload.single('file')(req, res, function(err) {
        if(err){
            next(err);
        }else{
            let data = {};
            data.message = '프로필 사진 저장 완료';
            let fileSchema = new FileSchema({
                fileGroup : req.body.fileGroup,
                size: req.file.size,
                originalName: req.file.originalname.split('.')[0],
                fileName: req.file.filename,
                ext: path.extname(req.file.originalname),
                path: '/images', 
                regId: req.body.regId,
                regDate: new Date(),
            });
            // 파일 collection에 저장
            fileSchema.save()
                    .then((result) => {
                       // 파일 저장
                        res.json(data);
                    })
                    .catch((err) => {
                        next(err);
                    });
            
        }
    });
});
// 회원 가입 액션
router.post('/signup', (req, res, next)=>{
    console.log('데이터 전송 요청');
    let data = {};
    hasher({ password: req.body.pwd }, (err, pass, salt, hash) =>{
        if(err){
            next(err);
        }else{
            const userSchema = new UserSchema({
                userId : req.body.userId, // 사용자 아이디
                userName : req.body.userName, // 사용자 이름
                salt : salt, // 암호화 salt
                pwd : hash, // 패스워드
                birthDay : req.body.birthDay, // 생년월일
                phone : req.body.phone // 전화번호
            });
            userSchema.save()
                .then((result) => {
                    console.log('데이터 전송 요청 성공');
                    data.message = '성공적으로 가입했습니다.';
                    data['result'] = result;
                    res.json(data);
                })
                .catch((err) => {
                    next(err);
                });
        }
    });
});

module.exports = router;