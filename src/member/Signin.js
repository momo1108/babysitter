import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {onLoggedAction, offLoggedAction, setUserAction, openAlertAction } from "../redux/actions/actions";
import AlertCustom from "../alert/AlertCustom";
const serialize = require('form-serialize');
const axios = require("axios");
const {
    gf_validPwdPattern, 
    gf_validIdPattern
} = require('../client_module/valid_pattern');

class Singin extends React.Component {
    constructor(props) {
        super(props);
        const valids = {};
        // 폼요소 유효성 상태 설정
        ['userId', 'pwd' ].map((el)=>{
            valids[el] = {
                valid: false, 
                feedBack: null,
                inValid: false,
            }
        });
        this.state = {
            data: { 
                resultMssg: null,
                result: null
            },
            alert: {
                message: null,
                heading: null,
                cb: null,
                show: false,
                varient: null,
            },
            valids
        }

        this.signinSubmit = this.signinSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.validIdPattern = this.validIdPattern.bind(this);
        this.validPwdPattern = this.validPwdPattern.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        console.log('스토어 로그인 상태 : ', props.logged);
        return state;
    }

    /**
     * 로그인 처리
     * @param(object) : 이벤트 객체
     * @author : jskpubller86 
     * @version : 1.0
     **/
    signinSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();
        let formData = serialize(this._form, {hash: true});
        formData['groupId'] = 'member';
        const signin = this;
        let state = {};
        try{
            const res = await axios.post(
                this._form.action, 
                formData,
            );
            state = {
                alert: {},
            }
            state.alert['message'] = res.data.message;
            state.alert['show'] = true;
            if(res.data.state){ // 로그인 성공
                state.alert['heading'] = '성공';
                state.alert['cb'] = () => { 
                    signin.props.history.push('/'); 
                    signin.props.onLogged();
                    console.log("res.data.user.image", res.data.user.image);
                    signin.props.setUser(res.data.user);
                };
                state.alert['varient'] = 'success'; 
            }else{ // 로그인 실패
                state.alert['heading'] = '실패';
                state.alert['cb'] = null;
                state.alert['varient'] = 'danger'; 
            }
        } catch(err){
            state = {
                alert: {
                    message: err.message,
                    heading: '실패',
                    cb: () => null,
                    show: true,
                    varient: 'danger',
                },
            }
        }
        signin.setState(state);
        this.props.openAlertAction(alert);
    }
    /**
     * ID 패턴 검사 
     * @param(object): event 
     * @author: jskpubller86 
     * @version: 1.0
     **/
    validIdPattern(e){
        let state;
        if(e.target.value){
            if(gf_validIdPattern(e.target.value)){
                state = {
                    valids: {
                        ...this.state.valids,
                        userId: {
                            valid: true,
                            inValid: false,
                            feedBack: null
                        }
                    }
                }
            }else{
                state = {
                    valids: {
                        ...this.state.valids,
                        userId: {
                            valid: false,
                            inValid: true,
                            feedBack: "아이디는 영문 또는 영문 + 숫자 조합입니다."
                        }
                    }
                }
            }
        }else{
            state = {
                valids: {
                    ...this.state.valids,
                    userId: {
                        valid: false,
                        inValid: false,
                        feedBack: null
                    }
                }
            }
        }
        this.setState(state);
    }
    /**
     * 패스워드 검사
     * @param(object) : 이벤트
     * @author : jskpubller86 
     * @version : 1.0
     **/
    validPwdPattern(e){
        let state;
        if(e.target.value){
            if(gf_validPwdPattern(e.target.value)){
                state = {
                    valids: {
                        ...this.state.valids,
                        pwd: {
                            valid: true,
                            inValid: false,
                            feedBack: ''
                        }
                    }
                }
            }else{
                state = {
                    valids: {
                        ...this.state.valids,
                        pwd: {
                            valid: false,
                            inValid: true,
                            feedBack: '잘못된 형식입니다. 영소문자, 숫자, 특수문자(@$!%^*#?&amp;) 조합입니다.'
                        }
                    }
                }
            }
        }
        this.setState(state);
    }
    /**
     * 경고창 닫기
     * @author : jskpubller86 
     * @version : 1.0
     **/
    closeAlert = e => {
        const alert = {
            message: null,
            heading: null,
            cb: null,
            show: false,
            varient: null,
        }
        this.setState({alert});
    }
    // 렌더링
    render(){
        return (
                <>
                    <Form ref={(el)=>{this._form = el;}} action="/api/member/signin" method="POST" onSubmit={this.signinSubmit}>
                        <Form.Row>
                            <Form.Group controlId="userId" as={Col}>
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" name="userId" placeholder="아이디를 입력해주세요." 
                                    isInvalid={this.state.valids.userId.inValid} 
                                    isValid={this.state.valids.userId.valid}
                                    required
                                    onBlur={this.validIdPattern} />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.valids.userId.feedBack}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="pwd" as={Col}>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" name="pwd" placeholder="비밀번호를 입력해주세요." 
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
                            <Button variant="primary" type="submit" onClick={this.setData} >
                                로그인
                            </Button>
                        </Form.Row>
                    </Form>
                </>
        );
    }
}
const mapStateToProps = state =>{
    const { sessionReducer, alertReducer } = state;
    return {sessionReducer, alertReducer }
};
export default connect(
    mapStateToProps,
    {onLoggedAction, offLoggedAction, setUserAction, openAlertAction}
  )(Singin);