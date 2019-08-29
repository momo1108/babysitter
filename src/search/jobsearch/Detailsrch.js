import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Btnfunctionstr, Btnfunctionnum, Btnfunctionlocal } from './Locals/Btnfunction';
import axios from 'axios';

class Detailsrch extends Component {
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
        this.wholelocal = (e) => {
            let currentlocal = this.state.localdetail.slice();
            if (e.target.classList.contains('btnclicked')) {
                let localnum = currentlocal.indexOf(e.target.innerText);
                currentlocal.splice(localnum, 1);
                this.setState({
                    localdetail: currentlocal,
                })
                e.target.classList.toggle('btnclicked');
                return;
            }
            let i = 0;
            while (1) {
                if (!currentlocal[i]) break;
                let splitlocal = currentlocal[i].split(" ");
                if (splitlocal[0] === this.state.local) {
                    currentlocal.splice(i, 1);
                } else {
                    i++;
                }
            }
            if (currentlocal.length === 5) return;
            else {
                for (let j = 0; j < document.getElementsByClassName('localdiv')[0].children.length; j++) {
                    document.getElementsByClassName('localdiv')[0].children[j].classList.remove('btnclicked');
                }
                currentlocal.push(this.state.local + ' 전체');
                document.getElementsByClassName('localdiv')[0].children[0].classList.add('btnclicked');
            }
            this.setState({
                localdetail: currentlocal
            })
        }
        this.statesetter = (state, value, index) => {
            // 각 검색조건마다 버튼을 누르면 다른 버튼을 초기화시켜준다.
            for (let i = 0; i < document.getElementsByClassName(state).length; i++) {
                document.getElementsByClassName(state)[i].classList.remove('btnclicked');
            }
            // 현재 검색조건에서 누른 버튼만 활성화 시켜준다.
            document.querySelector('#' + state + index).classList.add('btnclicked');
            // 누른 버튼이 어떤 검색조건에 해당하는지 판단해서 state를 update해준다.
            if (state === "type") {
                this.setState({
                    type: value
                })
            } else if (state === "career") {
                this.setState({
                    career: value
                })
            } else if (state === "nationality") {
                this.setState({
                    nationality: value
                })
            } else if (state === "gender") {
                this.setState({
                    gender: value
                })
            } else {
                console.log('state의 이름을 제대로 입력하세요');
            }
        }
        this.whichlocal = (e) => {
            console.dir(e.target);
            if (e.target.innerText === '전체') {
                this.setState({
                    local: '전체',
                    localdetail: []
                })
            };
            this.setState({
                local: e.target.innerText
            });
            if (document.querySelector('.localdiv')) {
                for (let i = 0; i < document.querySelector('.localdiv').children.length; i++) {
                    document.querySelector('.localdiv').children[i].classList.remove('btnclicked');
                }
            };
            let selector = document.getElementsByClassName('locals');
            let i = 0;
            while (selector[i]) {
                selector[i].classList.remove('localclick');
                i++;
            };
            if (e.target.className === 'localtext') {
                e.target.parentElement.classList.add('localclick');
            } else {
                e.target.classList.add('localclick');
            };
        }
        this.togglefunc = (e) => {
            // 누른 버튼의 id를 가져와서 구분한다. id는 {선택지역(서울,인천...)+세부지역(역삼동,상도동....)}
            let text = e.target.id;
            // 현재 세부주소 state를 random array에 값을 옮겨 가져온다.
            let currentlocal = this.state.localdetail.slice();
            var firstbtnnum = currentlocal.indexOf(this.state.local + ' 전체');
            if (firstbtnnum !== -1) {
                document.querySelector('.firstlocalbtn').classList.remove('btnclicked');
                currentlocal.splice(firstbtnnum, 1);
            }
            // 활성화된 버튼이 클릭되면 토글로 비활성화 시켜주고 state에서 삭제해준다.
            // 비활성화된 버튼이 클릭되면 토글로 활성화 시켜주고 state에 추가해준다.
            if (e.target.classList.contains('btnclicked')) {
                var localnum = currentlocal.indexOf(text);
                currentlocal.splice(localnum, 1);
                this.setState({
                    localdetail: currentlocal,
                })
                e.target.classList.toggle('btnclicked');
            } else {
                if (currentlocal.length === 5) return;
                e.target.classList.toggle('btnclicked');
                currentlocal.push(text);
                this.setState({
                    localdetail: currentlocal
                })
            }
        }
        this.submit = (e) => {
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
        this.selectedlocals = (value) => {
            // console.log(document.getElementById(e.target.innerText));
            if (document.getElementById(value)) document.getElementById(value).classList.remove('btnclicked');
            let currentlocal = this.state.localdetail.slice();
            let localnum = currentlocal.indexOf(value);
            currentlocal.splice(localnum, 1);
            this.setState({
                localdetail: currentlocal,
            })

        }
    }
    componentDidMount() {
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
                            <div className="listitem" key={index}>
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
                        )
                    }) : ''}
                </div>
            </div>
        );
    }
};

export default Detailsrch;