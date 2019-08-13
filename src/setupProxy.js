/* 백엔드를 담당하는 노드 서버와 통신하기 위해서 proxy 설정. 파일의 이름은 setupProxy 이어야 함. */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:3001' }));
}; 
