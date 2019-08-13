const mongoose = require('mongoose'); // mongoose 모듈을 가져온다.
module.exports = () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }
    }
    //monngodb://[username:password@]host[:port][/[database][?options]]
    mongoose.connect('mongodb://localhost/detailsrch', {
        useNewUrlParser: true
    },(error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러',error);   
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });
    require('./user');
    require('./file');
    require('./person');
    require('./recruit');
}