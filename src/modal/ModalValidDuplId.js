import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
const serialize = require('form-serialize');
const axios = require("axios");
const {gf_validIdPattern} = require('../client_module/valid_pattern');

class ModalValidDuplId extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                show: false,
                feedBack: null,
                valid: false,
                inValid: false,
                value: '',
            };
        this.validDupliId = this.validDupliId.bind(this);
        this.validIdPattern = this.validIdPattern.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setData = this.setData.bind(this);
    }
    /* props가 변경이 되면 state 적용 */
    static getDerivedStateFromProps(props, state){
        return {show: props.show};
    }
     /**
     * ID 중복 검사
     * @param(object): event 
     * @author: jskpubller86 
     * @version: 1.0
     **/
     validDupliId(e){
        let self = this;
        axios.get(
                '/api/member/chkid',{
                    params: {userId: this._form.validUserId.value.trim()}
                }
            )
            .then(function (res) {
                let state = {};
                if(res.data.state){
                    state["feedBack"] = '사용할 수 있는 아이디입니다.';
                    state["valid"] = true;
                    state["inValid"] = false;
                    state.value = self._form.validUserId.value;
                } else {
                    state["feedBack"] = '중복된 아이디입니다.';
                    state["valid"] = false;
                    state["inValid"] = true;
                }
                 self.setState(state);
            })
            .catch(function (error) {
                 console.log(error);
            });
        e.preventDefault();
        e.stopPropagation();
    }
    /**
     * ID 패턴 검사 
     * @param(object): event 
     * @author: jskpubller86 
     * @version: 1.0
     **/
    validIdPattern(e){
        let state = {};
        if(e.target.value){
            if(gf_validIdPattern(e.target.value.trim())){
                state["feedBack"] = null;
                state["valid"] = false;
                state["inValid"] = false;
            }else{
                state["feedBack"] = "아이디는 영문 또는 영문 + 숫자 조합입니다.";
                state["valid"] = false;
                state["inValid"] = true;
            }
        }else{
            state["valid"] = false;
            state["inValid"] = false;
        }
        this.setState(state);
    }
    /**
     * 모달닫기
     * @author: jskpubller86 
     * @version: 1.0
     **/
    handleClose(){
        console.log('click');
        const state = {
            show: false,
            valid: false,
            inValid: false,
            feedBack: false 
        }
        this.setState(state);
        this.props.close();
    }
    /**
     * 아이디 전송
     * @author: jskpubller86 
     * @version: 1.0
     **/
    setData(){
        let state = {};
        // 폼 값이 있고 valid가 true일 때
        if(this._form.validUserId.value){
            if(this.state.valid){
                // userId로 검증된 아이디 전송
                document.querySelector('#userId').value = this._form.validUserId.value.trim(); 
                state["valid"] = false;
                state["show"] = false;
                this.handleClose();
            }else{
                state["feedBack"] = '아이디 중복 검사를 해주세요.'; 
                state["inValid"] = true;
            }
        } else {
            state["feedBack"] = '아이디가 없습니다.'; 
            state["inValid"] = true;
        }
        this.setState(state);
    }
    /* 렌더 */
    render(){
        const comp = <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>아이디 중복검사</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form ref={(el)=>{this._form = el;}} onSubmit={this.validDupliId}>
                                <Form.Group controlId="validUserId">
                                    <Form.Label srOnly="true">아이디</Form.Label>
                                    <InputGroup>
                                        <Form.Control  type="text" name="validUserId" 
                                            placeholder="아이디는 영소문자, 숫자 조합입니다." 
                                            isInvalid={this.state.inValid} 
                                            isValid={this.state.valid} 
                                            required
                                            onBlur={this.validIdPattern}/>
                                        <InputGroup.Append>
                                            <Button variant="outline-info" type="submit">검사</Button>
                                        </InputGroup.Append>
                                        <Form.Control.Feedback>
                                            {this.state.feedBack}
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.feedBack}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                            취소
                            </Button>
                            <Button variant="primary" onClick={this.setData}>
                            확인
                            </Button>
                        </Modal.Footer>
                    </Modal>
        return (
            ReactDOM.createPortal(
                comp,
                document.querySelector('#container')
            )
        );
    }
}
// 연결하면서 반환
export default connect()(ModalValidDuplId);
