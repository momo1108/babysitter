
global.serverRoot = __dirname;
const express = require('express');
const app = express();
const connect = require(`${global.serverRoot}/schemas/index`);
const fs = require('fs');
const path = require('path');
const cookieparser = require('cookie-parser'); // 쿠키파서 모듈을 가져옴.
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const memberRouter = require('./routes/member');
const searchRouter = require('./routes/search');
const hasher = require('pbkdf2-password')(); // 암호화 모듈을 가져옴.
const port = process.env.PORT || 3001;
connect();
app.use(express.urlencoded({
    extended: false //qs 모듈이 아닌 내장된 query스트링을 사용
}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads'))); // localhost/ 경로로 접속할 수 있음.  css, images 파일을 불러오기 위한 정적 미들웨어 설정
app.use(cookieparser());// 쿠키를 파싱함.
app.use(session({
    secret: '1A@W#E$E',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(), // 세션 파일 객체
}));
// 세션 생성 로직
app.use((req, res, next)=>{
    next();
});
// move to memberRouter
app.use('/api/member', memberRouter);
// 검색 요청시 검색 라우터로
app.use('/api/search', searchRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));