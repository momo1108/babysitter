const hasher = require('pbkdf2-password')(); // 암호화 모듈을 가져옴.
 /**
  * 패스워드 확인
  * @param(string) : 사용자 아이디
  * @param(string) : 비밀번호
  * @param(Object) : 사용자 객체
  * @return(Boolean) : 검사 결과
  * @author : jskpubller86 
  * @version : 1.0
  **/
module.exports = function (userId, pwd, user){
    return new Promise((resolve, reject) => {
        hasher({password: pwd, salt: user.salt}, (err, pass, salt, hash)=>{
            let result = false;
            console.log("hash", hash);
            console.log("user.pwd", user.pwd);
            if(hash === user.pwd){ // 패스워드와 아이디가 맞다면
                console.log("비밀번호 일치");
                result = true; // 함수를 넘겨 줌                 
            }
            resolve(result);
        });
    });
}