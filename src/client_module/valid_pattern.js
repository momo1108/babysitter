
/**
 * 아이디검증 
 * @param(string) : 아이디 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validIdPattern = (id) => {
    const patt = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,15}$/g);
    return patt.test(id);    
}
/**
 * 비밀번호검증 
 * @param(string) : 비밀번호 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validPwdPattern = (pwd) => {
    const patt = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%^*#?&])[A-Za-z\d$@$!%^*#?&]{8,}$/g);
    return patt.test(pwd);    
}
/**
 * 이메일검증 
 * @param(string) : 이메일 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validEmailPattern = (email) => {
    const patt = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g);
    return patt.test(email);
}
/**
 * 전화번호검증 
 * @param(string) : 전화번호 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validPhonePattern = (phone) => {
    const patt = new RegExp(/^\d{2,3}-\d{4}-\d{4}$/g);
    return patt.test(phone);    
}
/**
 * 이름검증 
 * @param(string) : 이름 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validUserNamePattern = (name) => {
    const patt = new RegExp(/^[가-힣]{2,8}$/g);
    return patt.test(name);    
}
/**
 * 생년월일 검증
 * @param(string) : 생년월일 
 * @return(boolean) : 결과
 * @author : jskpubller86
 * @created_by: 20190730
 **/
const gf_validBirthDayPattern = (birthDay) => {
    const patt = new RegExp(/^(\d{8})$/g);
    return patt.test(birthDay);    
}
module.exports = {gf_validIdPattern, gf_validPwdPattern, gf_validEmailPattern, gf_validPhonePattern, gf_validUserNamePattern, gf_validBirthDayPattern};
