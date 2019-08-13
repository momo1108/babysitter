import React from "react";
import { ListGroup, Button, Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { modalVDIdOpen, modalVDIdClose } from "../redux/actions/actions";
const serialize = require('form-serialize');
const axios = require("axios");

class Commonness extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Accordion defaultActiveKey="">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" >
                    [회원공통] 연락처가 갑자기 안보여요. 이럴 때는 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        갑자기 연락처가 보이지 않은 경우에는 다음에 해당되는지 확인하셔야 합니다. <br></br>

                        1. 로그인이 정상적으로 되어있는지 확인을 하셔야합니다.<br></br>
                        로그인 후에도 일정시간이 지나면 자동 로그아웃이 되기떄문에<br></br>
                        로그아웃 버튼을 클릭후 다시 로그인을 하시면 됩니다.<br></br>

                        2.열람권 기한을 확인하셔야 합니다.<br></br>
                        로그인후에도 연락처가 보이지 않는다면 열람권 기한을 확인하셔야 합니다.<br></br>
                        채용정보 열람권 또는 인재정보 열람권 아래에 열람기한이 게재가 되어있습니다.<br></br>
                        열람기한이 보이지 않는다면 열람권 신청후 이용하시면 됩니다.<br></br>

                        3.열람권 판매글이나 공유글을 올리셨나요?<br></br>
                        단디헬퍼에서는 열람권의 재판매 또는 공유를 금지합니다. 적발시 별도 통보없이 즉시 열람권한이 정지됩니다.<br></br>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    [회원공통] 로그인시 [로그인 인증]화면이 뜨면서 로그인이 안되요. 이럴 때는 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        단디헬퍼는 아이디 공유 금지 및 ID 도용방지를 위하여 IP 변경접속시 본인인증을 받으셔야 합니다.<br></br>
                        회원정보 휴대전화번호 옆 [인증번호발송]을 클릭하시고 받으신 인증번호6자리를 입력하신후 [인증]<br></br>
                        버튼을 클릭하시면 정상적으로 로그인이 되십니다.<br></br>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    [회원공통] 사이트 접속은 되는데 로그인시 '웹사이트를 표시할 수 없습니다' 또는 로그인이 안될 때는 어떻게 하나요?<br></br>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        로그인이 되지 않을 경우 회원님의 PC 설정상태를 확인해 주세요.<br></br>

                        1. 쿠키 등 검색 기록을 삭제해 주세요. <br></br>
                        (1) 브라우저 실행 > 도구 > 인터넷 옵션 > 일반 > 검색 기록 > [삭제] 클릭해 주세요.<br></br>
                        (2) 맨 위 [즐겨찾기 웹 사이트 데이터 보존]을 제외하고 모든 항목에 체크한 후 아래 [삭제] 버튼 클릭해 주세요. <br></br>
                        (3) 검색 기록 삭제가 완료되면 인터넷 옵션 창의 [확인] 버튼을 클릭하세요. <br></br>
                        (4) 띄워놓았던 인터넷 브라우저를 모두 닫고 새로 인터넷 브라우저를 열어 단디헬퍼 로그인을 해주세요. <br></br>

                        2. 보안 수정 재설정<br></br>
                        (1) 브라우저 실행 > 도구 > 인터넷 옵션 > 보안 > 인터넷 메뉴를 클릭하고, 보안 수준을 [기본 수준] 클릭해 주세요. <br></br>
                        (2) 신뢰할 수 있는 사이트 > 사이트 버튼 클릭 후 [*.dandihelper.com]을 추가하여 등록해 주세요. <br></br>
                        (3) 인터넷 옵션 창의 [확인] 버튼을 클릭하세요. <br></br>
                        (4) 띄워놓았던 인터넷 브라우저를 모두 닫고 새로 인터넷 브라우저를 열어 단디헬퍼 로그인을 해주세요. <br></br>

                        3. 제한된 사이트에서 해지 <br></br>
                        (1) 브라우저 실행 > 도구 > 인터넷 옵션 > 보안 > 제한된 사이트 클릭하고 [사이트] 버튼을 클릭해 주세요. <br></br>
                        (2) 제한된 사이트로 단디헬퍼가 등록되어 있다면, 선택하신 후 우측의 [제거] 버튼을 클릭해 주세요. <br></br>
                        (3) 인터넷 옵션 창의 [확인] 버튼을 클릭하세요. <br></br>
                        (4) 띄워놓았던 인터넷 브라우저를 모두 닫고 새로 인터넷 브라우저를 열어 단디헬퍼 로그인을 해주세요.<br></br>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                    [회원공통] 무통장 입금하였는데 승인이 되지 않았을 경우 어떻게 해야 하나요?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        단디헬퍼에서는 무통장 입금시 자동승인 처리가 되고 있습니다. <br></br>
                        1.열람권신청 버튼을 꼭 클릭하셔서 열람권신청을 하신후 묻고답하기에 글을 올려주시면 빠르게 처리해드리겠습니다.<br></br>
                        2.열람권신청을 하셨는데 입금자명이 다르시다면 다시 열람권신청을 하시던지 아니면 묻고답하기에 글을 올려주시면<br></br>
                        빠르게 처리해드리겠습니다.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
// 연결하면서 반환
export default connect()(Commonness)
