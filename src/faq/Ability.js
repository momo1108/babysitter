import React from "react";
import { ListGroup, Button, Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { modalVDIdOpen, modalVDIdClose } from "../redux/actions/actions";
const serialize = require('form-serialize');
const axios = require("axios");

class Ability extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Accordion defaultActiveKey="">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                            [인재회원] 회원가입은 어떻게 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        단디헬퍼 도우미(일자리를 구하시는 분)회원 가입은 온라인(PC, 모바일,앱)에서 별도의 비용없이 회원가입이 가능합니다.<br></br>
                        *도우미(일자리를 구하시는 분)회원 가입순서<br></br>
                        1.회원가입 클릭=>인재정보등록 또는[도우미]일 하실분 클릭<br></br>
                        2.이용약관 및 개인정보 수집 이용에 동의<br></br>
                        3.회원정보 및 구직정보 입력후 가입 완료
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    [인재회원] 채용정보에 등록된 채용자에게 연락을 하고 싶은데 어떻게 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        열람권을 신청후 결제가 완료되면 채용자의 연락처가 확인이 됩니다.<br></br>
                        직접 연락을 하셔서 면접요청을 하시면 됩니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    [인재회원] 아이디. 비밀번호를 잊어 버렸어요. 어떻게 찾을 수 있나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        아이디/비번찾기는 단디헬퍼 첫 화면에서 찾을 수 있습니다.<br></br>
                        1.단디헬퍼 첫 화면 좌측에 위치한 로그인 박스의 아래쪽에 아이디/비번찾기 클릭해주세요<br></br>
                        2.등록하신 핸드폰 번호를 입력하시고 확인버튼을 클릭해주세요.<br></br>
                        3.회원님의 명의로 된 아이디와 임시비밀번호를 문자로 받으실 수 있습니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                    [인재회원] 회원정보를 수정하고 싶은데 어떻게 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        회원정보 수정은 단디헬퍼 로그인하신후, 인재정보수정 또는 [마이페이지 >인재정보 수정/삭제]에서 가능하십니다.<br></br>
                        회원정보 수정하기 클릭후 회원정보수정이 가능하십니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                    [인재회원] 인재정보에 등록된 이력서를 수정을 하고 싶은데 어떻게 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>
                    [마이페이지>인재정보 수정/삭제]를 클릭하셔서 이력서 수정이 가능하십니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                    [인재회원] 휴대폰 번호가 변경되었을 때는 어떻게 변경하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body>
                    인재정보수정 또는 마이페이지>인재정보 수정/삭제에서 수정 가능합니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="6">
                    [인재회원] 개명시 어떻게 변경하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                        <Card.Body>
                    고객센터 1833-9197로 문의해 주십시요.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            // <ListGroup>
            //     <ListGroup.Item>Cras justo odio
            //         <ListGroup>
            //             <ListGroup.Item>a</ListGroup.Item>
            //             <ListGroup.Item>b</ListGroup.Item>
            //             <ListGroup.Item>c</ListGroup.Item>
            //             <ListGroup.Item>d</ListGroup.Item>
            //         </ListGroup>
            //     </ListGroup.Item>
            //     <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            //     <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            //     <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            //     <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            // </ListGroup>
        );
    }
}
// 연결하면서 반환
export default connect()(Ability)
