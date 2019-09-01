import React, { Component } from 'react';
import { connect } from "react-redux";
import { Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { passIdAction } from '../../redux/actions/actions';
import { Btngenerator, Selectbox, Slider } from './Locals/Searchhelper';
import axios from 'axios';

class Sittersearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local: '전체',
            localdetail: [],
            day: [],
            baby_age: [],
            workTime_start: 0,
            workTime_end: 0,
            care_type: [],
            sitter_age_from: 0,
            sitter_age_to: 0,
            sitters: ""
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
        this.selectsetter = (e) => {
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
                care_area: {
                    addr1: this.state.local,
                    addr2: this.state.localdetail
                },
                care_date: {
                    days: this.state.day,
                    start_time: this.state.workTime_start,
                    end_time: this.state.workTime_end
                },
                children: this.state.baby_age,
                activity: this.state.care_type,
                range_age: [this.state.sitter_age_from, this.state.sitter_age_to]
            }
        })
            .then(res => {
                this.setState({
                    sitters: res.data
                })
            })
            .catch(err => {
                console.log('Error : ', err);
            })
        this.search = (e) => {
            axios({
                url: '/api/search/show',
                method: 'post',
                type: 'json',
                data: {
                    care_area: {
                        addr1: this.state.local,
                        addr2: this.state.localdetail
                    },
                    care_date: {
                        days: this.state.day,
                        start_time: this.state.workTime_start,
                        end_time: this.state.workTime_end
                    },
                    children: this.state.baby_age,
                    activity: this.state.care_type,
                    range_age: [this.state.sitter_age_from, this.state.sitter_age_to]
                }
            })
                .then(res => {
                    this.setState({
                        sitters: res.data
                    })
                })
                .catch(err => {
                    console.log('Error : ', err);
                })
        }
    }
    render() {
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
                            <Selectbox btnnames={["오전 7시", "오전 8시", "오전 9시", "오전 10시", "오전 11시", "오전 12시", "오후 1시", "오후 2시", "오후 3시", "오후 4시", "오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시", "오후 10시"]} forstate="workTime_start" setter={this.selectsetter} />
                            <p>부터</p>
                        <Selectbox btnnames={["오전 7시", "오전 8시", "오전 9시", "오전 10시", "오전 11시", "오전 12시", "오후 1시", "오후 2시", "오후 3시", "오후 4시", "오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시", "오후 10시"]} forstate="workTime_end" setter={this.selectsetter} />
                            <p>까지</p>
                        </div>
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">아이 나이</b></div>
                        <Btngenerator btnnames={["신생아<br/>0~6개월", "영아<br/>7~36개월", "유아<br/>4~6세", "초등학생"]} forstate="baby_age" setter={this.multisetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">돌봄 내용</b></div>
                        <Btngenerator btnnames={["실내 놀이", "등하원 돕기", "영어 놀이", "한글 놀이", "학습 지도", "야외 지도", "밥 챙겨주기", "책 읽기"]} forstate="care_type" setter={this.multisetter} />
                    </div>
                    <div className="searchlist">
                        <div><b className="boldtitle">원하는 베이비시터 나이대</b></div>
                        <div className="btnbox">
                            <Selectbox btnnames={["20대", "30대", "40대", "50대", "60대"]} forstate="sitter_age_from" setter={this.selectsetter} />
                            <p>이상</p>
                            <Selectbox btnnames={["20대", "30대", "40대", "50대", "60대"]} forstate="sitter_age_to" setter={this.selectsetter} />
                            <p>이하</p>
                        </div>
                    </div>
                    <button className="searchbtn" onClick={this.search}>
                        검색하기
                    </button>
                </Jumbotron>
                <div className="listbox">
                    {this.state.sitters ? this.state.sitters.slice().map((value, index) => {
                        return (
                            <NavLink to="sittersearch/detail">
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

export default connect(null, { passIdAction })(Sittersearch);