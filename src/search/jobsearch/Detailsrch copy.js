import React, { Component } from 'react';
import { connect } from "react-redux";
import { Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { passIdAction } from '../../redux/actions/actions';
import axios from 'axios';

class Detailsrch extends Component {
    // 검색 조건은 요일 - 전체, 월, 화, 수, 목, 금, 토, 일
    // 시간대 - 시작시간 select box, 종료시간 select box
    // 아이 나이 - 신생아, 영아, 유아, 초등학생
    // 희망시급 - 가능하면 Range Slider 안되면 select box
    // 돌봄 종류 - {
    //     a1: { name: "실내놀이", 사용유무: true | false } ,
    //     a2: { name: "등하원돕기", 사용유무: true | false } ,
    //     a3: { name: "영어놀이", 사용유무: true | false } ,
    //     a4: { name: "한글놀이", 사용유무: true | false } ,
    //     a5: { name: "학습지도", 사용유무: true | false },
    //     a6: { name: "야외지도", 사용유무: true | false },
    //     a7: { name: "밥 챙겨주기", 사용유무: true | false },
    //     a8: { name: "책 읽기", 사용유무: true | false },
    //     }
    // 아이 수 - 무관, 1, 2
    constructor(props) {
        super(props);
        this.state = {
            local: '전체',
            localdetail: [],
            type: 0,
            career: 0,
            nationality: 'korea',
            gender: 'all',
            userdata: ''
        }
        
    }
    componentDidMount() {
        // document.querySelectorAll("#type0, #career0, #nationality0, #gender0").classList.add("btnclicked");
        document.getElementById('type0').classList.add('btnclicked');
        document.getElementById('career0').classList.add('btnclicked');
        document.getElementById('nationality0').classList.add('btnclicked');
        document.getElementById('gender0').classList.add('btnclicked');
    }
    render() {
        return (
            <div>
                <Jumbotron className='searchjumbo'>
                    <div className="localflex">
                        <div className="localflexname"><span className="firstcondition">지역</span></div>
                        <div className="localflexselected">
                            {this.state.localdetail[0] ? this.state.localdetail.slice().map((value, index) => {
                                return <div className="selectedlocals" key={index}><div className="selectedlocalsfront" onClick={() => this.selectedlocals(value)}>{value}</div><div className="selectedlocalsback" onClick={() => this.selectedlocals(value)}>누르면 삭제</div></div>
                            }) : ""}
                        </div>
                    </div>
                    <ul>
                        {['전체', '서울', '경기', '인천', '부산', '대구', '세종', '광주', '울산', '강원', '경남', '경북', '전남', '전북', '충남', '충북', '제주', '해외'].map((value, index) => {
                            return <li className='locals' onClick={this.whichlocal} name={'localdiv' + index} key={index}><span className='localtext' name={'localdiv' + index}>{value}</span></li>
                        })}
                    </ul>
                    {this.state.local ? <Btnfunctionlocal local={this.state.local} localdetail={this.state.localdetail} togglefunc={this.togglefunc} firstbtn={this.wholelocal} /> : ''}
                    <hr className='firsthr' />
                    <span className="worktype">형태</span>
                    <Btnfunctionnum forwhat="type" btnnames={['전체', '출퇴근', '입주', '재택', '출퇴근&입주', '출퇴근&재택']} statesetter={this.statesetter} />
                    <hr />
                    <span className="worktype">경력</span>
                    <Btnfunctionnum forwhat="career" btnnames={['전체', '1년 이상', '2년 이상', '3년 이상']} statesetter={this.statesetter} />
                    <hr />
                    <span className="worktype">국적</span>
                    <Btnfunctionstr forwhat="nationality" btnnames={['전체', '한국', '해외']} stateval={['all', 'korea', 'overseas']} statesetter={this.statesetter} />
                    <hr />
                    <span className="worktype">성별</span>
                    <Btnfunctionstr forwhat="gender" btnnames={['전체', '남자', '여자']} stateval={['all', 'male', 'female']} statesetter={this.statesetter} /><br />
                    <div className="submitdiv"><p className="submitp" onClick={this.submit}>검색</p></div>
                </Jumbotron>
                <div className="listbox">
                    {this.state.userdata ? this.state.userdata.slice().map((value, index) => {
                        return (
                            <NavLink to="jobsearch/detail">
                                <div className="listitem" key={index} onClick={()=>this.props.passIdAction(1)}>
                                    <div className="imgdiv">
                                        <img src={require('../img/default.png')} /><br />
                                        <span className="cardinfo">{value.userName}({value.gender == 'male' ? '남' : '여'}/{value.nationality == 'korea' ? '한국' : '외국인'}) │ {value.age}살</span>
                                    </div>
                                    <div className="desdiv">
                                        <div className="desdivtitle">
                                            <div className="userinfo">
                                                <p className="cardbody">{value.address}</p>
                                                <p className="cardbody">{value.workStart} ~ {value.workEnd}</p>
                                            </div>
                                        </div>
                                        <div className="desdivbody">
                                            <p className="usertitle">{value.title}</p>
                                            <p className="userbody">{value.body}</p>
                                        </div>
                                        <div className="desdivfooter">
                                            <p className="userinfo2">{'희망 ' + value.payment}</p>
                                            <p className="userinfo2">{'경력 ' + value.career + '년'}</p>
                                            <p className="userinfo2">근무 형태 : {value.type === 0 ? '모든 형태가능' : value.type === 1 ? '출퇴근' : value.type === 2 ? '입주' : value.type === 3 ? '재택' : value.type === 4 ? '출퇴근&입주' : '출퇴근&재택'}</p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    }) : ''}
                </div>
            </div>
        );
    }
};

export default connect(null, { passIdAction })(Detailsrch);