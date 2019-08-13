import React from "react";
import { ListGroup, Button, Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { modalVDIdOpen, modalVDIdClose } from "../redux/actions/actions";
const serialize = require('form-serialize');
const axios = require("axios");

class recruitment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Accordion defaultActiveKey="">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        [채용회원] 회원가입은 어떻게 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            단디헬퍼 채용(일 맡기실 분) 회원 가입은 온라인(PC, 모바일,앱)에서 별도의 비용없이 회원가입이 가능합니다.<br></br>
                            *채용(일 맡기실 분)회원 가입순서<br></br>
                            1.회원가입 클릭=>채용정보등록 또는[채용자]구인하시는 분 클릭<br></br>
                            2.이용약관 및 개인정보 수집 이용에 동의<br></br>
                            3.회원정보 및 채용정보 입력후 가입 완료<br></br>
                            *휴대폰번호 옆 [인증번호발송]을 클릭하셔서 인증번호를 입력하셔야 회원가입이 가능하십니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    [채용회원] 채용정보를 등록했는데 언제부터 뜨나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            등록하신 채용정보는 채용정보를 등록후 1~5분내에 채용정보에서 확인이 가능하십니다.<br></br>
                            단, 야간시간대에 작성되는 채용정보는 최대한 빠른시간 관리자의 승인후 게재됩니다.<br></br>
                            단디헬퍼에 등록되는 모든 채용정보는 관리자의 승인후 광고게재가 됩니다.<br></br>
                            가정도우미 구인구직과 무관한 자료는 별도의 통보없이 자동 삭제됨을 알려드립니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    [채용회원] 인재정보의 연락처를 보고 싶은데 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            단디헬퍼에 등록된 인재정보의 연락처는열람권을 구매한 회원에게만 제공되고 있습니다.<br></br>
                            열람권 신청 및 결제완료후 연락처 확인이 가능하십니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                    [채용회원] 인재정보를 스크랩 하고 싶은데 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            회원 로그인 후, 스크랩하고자 하는 인재정보를 클릭 하신 후, 하단의 [스크랩] 버튼을 클릭하시면 <br></br>
                            [마이페이지=>스크랩 목록]에 자동으로 저장됩니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                    [채용회원] 아이디와 비밀번호를 잊어버렸어요. 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>
                        로그인 하단에 보시면 [아이디/비번찾기] 클릭후 등록하신 핸드폰 번호를 입력하시면<br></br>
                        문자로 아이디와 임시비밀번호를 전송해드립니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                    [채용회원] 아이디와 비밀번호를 변경하고 싶어요. 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body>
                        아이디는 변경이 불가능하며 비밀번호는 [마이페이지=>정보수정 또는 회원정보 수정/탈퇴=>비밀번호 변경]<br></br>
                        에서 변경이 가능하십니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="6">
                    [채용회원] 채용공고를 대신 등록해 줄 수 있나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                        <Card.Body>
                        인터넷 이용이 익숙하지 않거나 업무로 바쁘신 분들을 위해서 단디헬퍼 고객센터에서 채용정보 대행등록을 해드리고 있습니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
// 연결하면서 반환
export default connect()(recruitment)
