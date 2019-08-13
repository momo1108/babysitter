const multer = require('multer'); // 파일업로드를 위한 모듈 가져옴.
const upload = multer({dest: `${global.serverRoot}/uploads`}); // 기본 업로드 설정.
const path = require('path');
const fs = require('fs');
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('목적지 file 정보:', file);
        console.log('req.body', req.body);
        console.log('req.params', req.params);
        console.log('req.query', req.query);
        cb(null, `${global.serverRoot}/uploads/images`);
    },
    filename: function (req, file, cb) {
        let ext =  path.extname(file.originalname);
        const changeFileName = file.fieldname + '-' + Date.now() + ext;
        cb(null, changeFileName);
    },
});

const docStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('목적지 file 정보:', file);
        console.log('req.body', req.body);
        console.log('req.params', req.params);
        console.log('req.query', req.query);
        cb(null, `${global.serverRoot}/uploads/docs`);
    },
    filename: function (req, file, cb) {
        console.log('파일 이름 변경 file 정보:', file);
        const changeFileName = file.fieldname + '-' + Date.now();
        cb(null, changeFileName);
    }
});

console.log('imageStorage', imageStorage);
console.log('docStorage', docStorage);

// 이미지 필터
let imgFileFilter = function(req, file, cb){
    let ext =  path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'){
        console.log('이미지 파일 아님');
        return cb(new Error('Only images are allowed'));
    }
    return cb(null, true);
};

// 문서 파일 필터
let docFileFilter = function(req, file, cb){
    let ext =  path.extname(file.originalname);
    if(ext !== '.xlsx'){
        return cb(new Error('Only docs are allowed'));
    }
    cb(null, true);
};

// 이미지 업로더
const imgUpload = multer({ 
                    storage: imageStorage,
                    fileFilter: imgFileFilter,
                    limits: {
                        fileSize: 10*1024*1024
                    }
                });
// 문서 업로더
const docUpload = multer({ 
                    storage: docStorage,
                    fileFilter: docFileFilter,
                    limits: {
                        fileSize: 10*1024*1024
                    }
                });                

module.exports = { imgUpload, docUpload }