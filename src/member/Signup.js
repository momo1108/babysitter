import React from "react";
import { Container, Row, Col, Button, Form, Alert, InputGroup, Modal } from 'react-bootstrap';
import AlertCustom from "../alert/AlertCustom";
import ModalValidDuplId from "../modal/ModalValidDuplId";
import { connect } from 'react-redux';
import store from '../redux/store';
import {openAlertAction, closeAlertAction} from "../redux/actions/actions";
const serialize = require('form-serialize'); // 폼데이터 serialize name=value
const axios = require("axios");
const {gf_validPwdPattern, 
       gf_validEmailPattern, 
       gf_validPhonePattern, 
       gf_validUserNamePattern, 
       gf_validBirthDayPattern} = require('../client_module/valid_pattern');
/**
 * 회원가입 클래스
 * @author : jskpubller86
 **/
class Signup extends React.Component {
    constructor(props) {
        super(props);
        const valids = {};
        // 폼요소 초기 설정.
        ['userName', 'userId', 'pwd', 'chkPwd', 'phone', 'email', 'birthDay' ].map((el)=>{
            valids[el] = {
                valid: false, 
                inValid: false,
                feedBack: null
            }
        });
        //상태 설정
        this.state = {
            valids,
            modalVDIdShow: false
        }
        console.log('this props', this.props);
        // 메소드 설정
        this.signupSubmit =  this.signupSubmit.bind(this);
        this.modalVDIdOpen = this.modalVDIdOpen.bind(this);
        this.modalVDIdClose = this.modalVDIdClose.bind(this);
        this.validEmailPattern = this.validEmailPattern.bind(this);
        this.validPhonePattern = this.validPhonePattern.bind(this);
        this.validPwdPattern = this.validPwdPattern.bind(this);
        this.validUserNamePattern = this.validUserNamePattern.bind(this);
        this.validBirthDayPattern = this.validBirthDayPattern.bind(this);
        this.chkPwd = this.chkPwd.bind(this);
    }
    componentDidMount(){
        
    }
    componentDidUpdate(){
        
    }
    /**
     * 아이디 중복검사 모달 열기
     * @author : jskpubller86 
     * @version : 1.0
     **/

    modalVDIdOpen = e => {
        this.setState({modalVDIdShow: true});
    }
    /**
     * 아이디 중복검사 모달 닫기
     * @author : jskpubller86 
     * @version : 1.0
     **/
    modalVDIdClose(){
        this.setState({ modalVDIdShow: false });
    };
    /**
     * 회원가입처리
     * @author : jskpubller86 
     * @version : 1.0
     **/
    signupSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();
        const signup = this; // 클래스 인스턴스
        let chkRequired = false;
        let clonedState = {...this.state};
        for (let i = 0; i < this._form.elements.length; i++) {
            const el = this._form.elements[i];
            if(el.required && !el.value){
                clonedState = {
                    valids: {
                        ...clonedState.valids,
                        [el.name]: {
                            valid: false,
                            inValid: true,
                            feedBack: '필수 입니다.'
                        }
                    }
                }
                chkRequired = true;
            } 
        }
        this.setState(clonedState);
        // 필수가 비어 있는 경우 취소
        if(chkRequired){
            return false;
        }
        // 유효하지 않은 값이 있는지 확인
        let chkInvalid = false;
        for( const x in this.state.valids){
            if(this.state.valids[x].inValid){
                const state = {
                    alert: {
                        message: '유효하지 않은 입력요소가 있습니다.',
                        heading: '전송실패',
                        cb: null,
                        show: true,
                        varient: 'danger',
                    }
                }
                this.setState(state);
                chkInvalid = true;
                break;
            }
        }
        // 유효하지 않은 요소가 있다면 취소
        if(chkInvalid){
            return false;
        }
        //파일을 binary형태로 전달하기 위해서 FormData() 사용 
        try{
            // 프로필 사진이 있다면 저장 시도
            if(this._form.file.files[0]){
                const formData = new FormData();
                formData.append('file', this._form.file.files[0]);
                formData.append('fileGroup', 'member');
                formData.append('regId', this._form.userId.value);
                await axios.post(
                    '/api/member/save_profile', 
                    formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                );
            }
            // 폼 입력데이터 전송
            const formData = serialize(this._form, {hash: true});
            const res = await axios.post(
                '/api/member/signup', 
                formData,
            )
            const state = {
                data: res.data,
            }
            const alert =  {
                message: res.data.message,
                heading: '성공',
                cb: ()=> { signup.props.history.push('/') },
                show: true,
                varient: 'success',
            }
            console.log('성공 경고창띄운다.');
            signup.setState(state);
            this.props.openAlertAction(alert);
        } catch(err){
            console.log('실패 경고창띄운다.');
            const alert =  {
                message: `${err.toString()}`,
                heading: '실패',
                cb: null,
                show: true,
                varient: 'danger',
            }
            this.props.openAlertAction(alert);
        }
    };
    
    /**
     * 패스워드 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validPwdPattern(e){
        if(e.target.value){
            if(gf_validPwdPattern(e.target.value)){
                const state = {
                    valids: {
                        ...this.state.valids,
                        pwd: {
                            valid: true,
                            inValid: false,
                            feedBack: ''
                        }
                    }
                }
                this.setState(state);
            }else{
                const state = {
                    valids: {
                        ...this.state.valids,
                        pwd: {
                            valid: false,
                            inValid: true,
                            feedBack: '잘못된 형식입니다. 영소문자, 숫자, 특수문자(@$!%^*#?&amp;) 조합입니다.'
                        }
                    }
                }
                this.setState(state);
            }
        }
    }
    /**
     * 생년월일 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validBirthDayPattern(e){
        console.log('결과', gf_validBirthDayPattern(parseInt(e.target.value)) );
        if(e.target.value){
            if(gf_validBirthDayPattern(parseInt(e.target.value))){
                const state = {
                    valids: {
                        ...this.state.valids,
                        birthDay: {
                            valid: true,
                            inValid: false,
                            feedBack: ''
                        }
                    }
                }
                this.setState(state);
            }else{
                const state = {
                    valids: {
                        ...this.state.valids,
                        birthDay: {
                            valid: false,
                            inValid: true,
                            feedBack: '잘못된 형식입니다. YYYYMMDD'
                        }
                    }
                }
                this.setState(state);
            }
        }
    }
    /**
     * email 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validEmailPattern(e){
        if(e.target.value){
            if(gf_validEmailPattern(e.target.value)){
                const state = {
                    valids: {
                        ...this.state.valids,
                        email: {
                            valid: true, 
                            inValid: false,
                            feedBack: null
                        }
                    }
                }
                this.setState(state);
            }else{
                const state = {
                    valids: {
                        ...this.state.valids,
                        email: {
                            valid: false,
                            inValid: true,
                            feedBack: '이메일 형식이 올바르지 않습니다.',
                        }
                    }
                }
                this.setState(state);
            }
        }
    }
    /**
     * phone 패턴 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validPhonePattern(e){
        if(e.target.value){
            if(gf_validPhonePattern(e.target.value)){
                const state = {
                    valids: {
                        ...this.state.valids,
                        phone: { 
                            valid: true,
                            inValid: false,
                            feedBack: null
                        }
                    }
                }
                this.setState(state);
            }else{
                const state = {
                    valids: {
                        ...this.state.valids,
                        phone: {
                            valid: false,
                            inValid: true,
                            feedBack: '전화번호 형식이 올바르지 않습니다.'
                        }
                    }
                }
                this.setState(state);
            }
        }
    }
    /**
     * 사용자 이름 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validUserNamePattern(e){
        if(e.target.value){
            if(gf_validUserNamePattern(e.target.value)){
                const state = {
                    valids: {
                        ...this.state.valids,
                        userName: { 
                            valid: true,
                            inValid: false,
                            feedBack: null
                        }
                    }
                }
                this.setState(state);
            }else{
                const state = {
                    valids: {
                        ...this.state.valids,
                        userName: {
                            valid: false,
                            feedBack: '이름은 한글만 지원합니다.',
                            inValid: true,
                        }
                    }
                }
                this.setState(state);
            }
        }
    }
    /**
     * 비밀번호 재확인
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    chkPwd(e){
        if(e.target.value){
            if(e.target.value === this._form.pwd.value){
                const state = {
                    valids: {
                        ...this.state.valids,
                        chkPwd: {
                            valid: true, 
                            feedBack: null,
                            inValid: false,
                        }
                    }
                }
                this.setState(state);
            }else{
                    const state = {
                    valids: {
                        ...this.state.valids,
                        chkPwd: {
                            valid: false, 
                            inValid: true,
                            feedBack: '비밀번호가 일치하지 않습니다.'
                        }
                    }
                }
                this.setState(state);
            }
        }
    }

    render(){
        console.log(this.props.madals);
        return (
                <>
                <ModalValidDuplId show={this.state.modalVDIdShow} close={this.modalVDIdClose} />
                <Form noValidate ref={(el)=>{this._form = el;}} onSubmit={this.signupSubmit}>
                    <Form.Row>
                        <Form.Group controlId="userName" as={Col}>
                            <Form.Label>* 이름</Form.Label>
                            <Form.Control type="text" required name="userName" placeholder="이름을 입력해주세요." 
                                isInvalid={this.state.valids.userName.inValid} 
                                isValid={this.state.valids.userName.valid} 
                                onBlur={this.validUserNamePattern}
                                required />
                            <Form.Control.Feedback type="invalid">
                                {this.state.valids.userName.feedBack}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group xs={12} as={Col}>
                            * 생년월일
                        </Form.Group>
                        <Form.Group xs={12} controlId="birthDay" as={Col} >
                            <Form.Label srOnly="true">생일 년도</Form.Label>
                            <Form.Control type="number" name="birthDay" 
                                placeholder="YYYYMMDD"
                                isInvalid={this.state.valids.birthDay.inValid} 
                                isValid={this.state.valids.birthDay.valid} 
                                onBlur={this.validBirthDayPattern}
                                required />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.valids.birthDay.feedBack}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="userId" as={Col}>
                            <Form.Label>* 아이디</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button variant="outline-secondary" onClick={this.modalVDIdOpen}>중복검사</Button>
                                </InputGroup.Prepend>
                                <Form.Control  type="text" name="userId" 
                                    placeholder="아이디 중복검사를 해주세요." 
                                    isInvalid={this.state.valids.userId.inValid} 
                                    isValid={this.state.valids.userId.valid} 
                                    required
                                    readOnly={true}/>
                                <Form.Control.Feedback type="invalid">
                                    {this.state.valids.userId.feedBack}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="pwd" as={Col}>
                            <Form.Label>* 비밀번호</Form.Label>
                            <Form.Control type="password" name="pwd" placeholder="영소문자, 숫자, 특수문자(@$!%^*#?&amp;) 조합입니다."
                                isInvalid={this.state.valids.pwd.inValid} 
                                isValid={this.state.valids.pwd.valid}
                                required
                                onBlur={this.validPwdPattern} />
                            <Form.Control.Feedback type="invalid">
                                {this.state.valids.pwd.feedBack}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="chkPwd" as={Col}>
                            <Form.Label>* 비밀번호 재입력</Form.Label>
                            <Form.Control type="password" name="chkPwd" placeholder="비밀번호를 입력해주세요." 
                                isInvalid={this.state.valids.chkPwd.inValid} 
                                isValid={this.state.valids.chkPwd.valid}
                                required
                                onBlur={this.chkPwd} />
                            <Form.Control.Feedback type="invalid">
                                {this.state.valids.chkPwd.feedBack}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="phone" as={Col}>
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="ex) 000-0000-0000"
                                isInvalid={this.state.valids.phone.inValid} 
                                isValid={this.state.valids.phone.valid}
                                onBlur={this.validPhonePattern} />
                            <Form.Control.Feedback type="invalid">
                                {this.state.valids.phone.feedBack}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="email" as={Col}>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ex) emailId@email.com"
                                isInvalid={this.state.valids.email.inValid} 
                                isValid={this.state.valids.email.valid}
                                onBlur={this.validEmailPattern} />
                            <Form.Control.Feedback type="invalid">
                                {this.state.valids.email.feedBack}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="file" as={Col}>
                            <Form.Label>프로필 사진</Form.Label>
                            <Form.Control type="file" name="file" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="primary" type="submit">
                            전송
                        </Button>
                    </Form.Row>
                </Form>
                </>
        );
    }
}
const mapStateToProps = state =>{
    const { alertReducer } = state;
    return { alertReducer }
};
export default connect( mapStateToProps, {openAlertAction, closeAlertAction} )(Signup);


