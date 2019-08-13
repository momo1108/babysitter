import React from "react";
import { Tabs, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import Recruitment from './Recruitment';
import Ability from './Ability';
import Commonness from './Commonness';
import "./css/faq.css";
const serialize = require('form-serialize');
const axios = require("axios");

class Faq extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="전체">
                    <Commonness />
                <Recruitment />
                <Ability />
                </Tab>
                <Tab eventKey="Commonness" title="회원공통">
                    <Commonness />
                </Tab>
                <Tab eventKey="Recruitment" title="채용회원">
                    <Recruitment />
                </Tab>
                <Tab eventKey="Ability" title="인재회원">
                    <Ability />
                </Tab>
            </Tabs>
        );
    }
}
// 연결하면서 반환
export default connect()(Faq)
