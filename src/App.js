import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import Signup from "./member/Signup";
import Signin from "./member/Signin";
import Faq from "./faq/Faq";
import Customer from "./customer/Customer";
import AlertCustom from "./alert/AlertCustom";
import {openAlertAction, closeAlertAction } from "./redux/actions/actions";
import { Navbar, Nav, NavDropdown, Row, Col, Image } from 'react-bootstrap';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import {Humansearch, Jobsearch} from "./search";
const axios = require("axios");

class Register extends React.Component {
    render(){
        return(
            <div>
                <form action="http://localhost:3001/api/search/register" method="POST">
                    <input type="text" name="name" placeholder="이름" /><br></br>
                    <input type="number" name="age" placeholder="나이" /><br></br>
                    <input type="text" name="address" placeholder="주소" /><br></br>
                    <input type="text" name="start" placeholder="시작" /><br></br>
                    <input type="text" name="end" placeholder="끝" /><br></br>
                    <input type="text" name="title" placeholder="제목" /><br></br>
                    <input type="text" name="body" placeholder="본문" /><br></br>
                    <input type="text" name="payment" placeholder="급여" /><br></br>
                    <input type="number" name="type" placeholder="형태" /><br></br>
                    <input type="number" name="career" placeholder="경력" /><br></br>
                    <input type="text" name="gender" placeholder="성별" /><br></br>
                    <input type="submit" value="제출" />
                </form>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
        this.Logged = this.Logged.bind(this);
        this.logout = this.logout.bind(this);
        console.log('App');
    }
    
    /**
     * 로그아웃
     * @author : jskpubller86 
     * @version : 1.0
     **/
    async logout(){
        try{
            const res = await axios.get();
        } catch(err){
            
        }
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
    
    /**
     * 로그인 상태 설정
     * @author : jskpubller86 
     * @version : 1.0
     **/
    Logged(){
        if(this.props.logged){
            return  (
                <Nav>
                    <Nav.Link herf="/signout" id="signup" onclick={this.logout}>회원가입</Nav.Link>
                    <Navbar.Text>
                        김종수
                        <Image className="o-profile" src={ "http://localhost:3001"+ this.props.user.image + ""}  roundedCircle />
                    </Navbar.Text>
                </Nav>
            );
        }else{
            return  (
                <Nav>
                    <NavLink to="/signup" id="signup" className="nav-link">회원가입</NavLink>
                    <NavLink to="/signin" id="signin" className="nav-link">로그인</NavLink>
                </Nav>
                );
        }
    }
    render(){
        return (
                <>
                    <AlertCustom message={this.props.alertReducer.message} 
                        heading={this.props.alertReducer.heading} 
                        cb={this.props.alertReducer.cb} 
                        variant={this.props.alertReducer.varient} 
                        show={this.props.alertReducer.show} />
                    <HashRouter>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                            <Navbar.Brand href="#home">BabySitter</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#jobsearch">채용정보</Nav.Link>
                                    <Nav.Link href="#humansearch">인재정보</Nav.Link>
                                    <Nav.Link href="#pricing">채용정보등록</Nav.Link>
                                    <Nav.Link href="#register">인재정보등록</Nav.Link>
                                    <NavLink to="/faq" id="faq" className="nav-link">Faq</NavLink>
                                    <Nav.Link href="#pricing">고객센터</Nav.Link>
                                </Nav>
                                {this.Logged()}
                            </Navbar.Collapse>
                        </Navbar>
                        {/* container 본문 */}
                        <Row>
                            <Col>
                                <Route exact path="/signup" component={Signup} />
                                <Route exact path="/signin" component={Signin} />
                                <Route exact path="/faq" component={Faq} />
                                <Route exact path="/customer" component={Customer} />
                                <Route exact path="/jobsearch" component={Jobsearch} />
                                <Route exact path="/humansearch" component={Humansearch} />
                                <Route exact path="/register" component={Register} />
                            </Col>
                        </Row>
                    </HashRouter>
                </>

        )
    }
}
const mapStateToProps = state =>{
    const { loggedReducer, alertReducer } = state;
    return { loggedReducer, alertReducer}
};
export default connect(mapStateToProps, {openAlertAction, closeAlertAction})(App);