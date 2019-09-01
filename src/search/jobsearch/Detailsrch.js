import React, { Component } from 'react';
import { connect } from "react-redux";
import { Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { passIdAction } from '../../redux/actions/actions';
import { Btngenerator, Selectbox, Slider } from './Locals/Searchhelper';
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
    // 버튼 렌더링은 컴포넌트로 각각의 css를 적용할 클래스값을 props로 받는다.
    constructor(props) {
        super(props);
        this.state = {
            local: '전체',
            localdetail: [],
            day: [],
            baby_age: [],
            baby_num: 0,
            workTime_start: 0,
            workTime_end: 0,
            care_type: [],
            hope_h_wage: "8350",
            parents: ""
        }
        this.multisetter = (e) => {
            e.target.classList.toggle("btnclicked");
            if (this.state[e.target.id].indexOf(e.target.title) === -1) {
                let arr = this.state[e.target.id].slice();
                arr.push(e.target.title);
                this.setState({
                    [e.target.id]: arr
                })
            } else {
                let current = this.state[e.target.id].slice();
                let num = current.indexOf(e.target.title);
                current.splice(num, 1);
                this.setState({
                    [e.target.id]: current
                })
            }
        }
        this.singlesetter = (e) => {
            let btns = e.target.parentNode.children;
            for(let i=0; i<btns.length; i++){
                btns[i].classList.remove("btnclicked");
            }
            e.target.classList.add("btnclicked");
            this.setState({
                [e.target.id]: e.target.title
            })
        }
        this.timesetter = (e) => {
            this.setState({
                [e.target.id]: e.target.selectedIndex
            });
        }
        this.slidesetter = (e) => {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        axios({
            url: '/api/search/show',
            method: 'post',
            type: 'json',
            data: {
                local: this.state.local,
                localdetail: this.state.localdetail,
                type: this.state.type,
                career: this.state.career,
                nationality: this.state.nationality,
                gender: this.state.gender
            }
        })
            .then(res => {
                this.setState({
                    userdata: res.data
                })
            })
            .catch(err => {
                console.log('Error : ', err);
            })
    }
    componentDidMount() {

    }
    render() {
        let wage = this.state.hope_h_wage.slice(0, this.state.hope_h_wage.length-3) + "," + this.state.hope_h_wage.slice(this.state.hope_h_wage.length-3);
        console.log(this.state);
        return (
            <div>
                <Jumbotron className='searchjumbo'>
                    <div className="searchlist">
                        <div><b className="boldtitle">지역</b></div>

                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">요일</b></div>
                        <Btngenerator btnnames={["월", "화", "수", "목", "금", "토", "일"]} forstate="day" setter={this.multisetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">시간대</b></div>
                        <div className="btnbox">
                            <Selectbox btnnames={["오전 7시", "오전 8시", "오전 9시", "오전 10시", "오전 11시", "오전 12시", "오후 1시", "오후 2시", "오후 3시", "오후 4시", "오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시", "오후 10시"]} forstate="workTime_start" setter={this.timesetter} />
                            <p>부터</p>
                        <Selectbox btnnames={["오전 7시", "오전 8시", "오전 9시", "오전 10시", "오전 11시", "오전 12시", "오후 1시", "오후 2시", "오후 3시", "오후 4시", "오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시", "오후 10시"]} forstate="workTime_end" setter={this.timesetter} />
                            <p>까지</p>
                        </div>
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">아이 나이</b></div>
                        <Btngenerator btnnames={["신생아<br/>0~6개월", "영아<br/>7~36개월", "유아<br/>4~6세", "초등학생"]} forstate="baby_age" setter={this.multisetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">아이 수</b></div>
                        <Btngenerator btnnames={["무관", "1명", "2명"]} forstate="baby_num" setter={this.singlesetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">돌봄 내용</b></div>
                        <Btngenerator btnnames={["실내 놀이", "등하원 돕기", "영어 놀이", "한글 놀이", "학습 지도", "야외 지도", "밥 챙겨주기", "책 읽기"]} forstate="care_type" setter={this.multisetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">희망 시급</b></div>
                        <div className="sliderbox">
                            <p className="hope_h_wage">{wage}원 이상</p>
                            <Slider forstate="hope_h_wage" setter={this.slidesetter} />
                        </div>
                    </div>
                </Jumbotron>
                <div className="listbox">
                    {this.state.userdata ? this.state.userdata.slice().map((value, index) => {
                        return (
                            <NavLink to="jobsearch/detail">
                                <div className="listitem" key={index} onClick={() => this.props.passIdAction(1)}>
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