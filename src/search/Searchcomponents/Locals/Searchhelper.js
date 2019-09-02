import React, { Component } from 'react';
import local from './address';
import './Searchhelper.css';

export class Btngenerator extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // 버튼들을 누를때마다 setState를 사용하는게 아니라 검색 버튼(submit)을 누를 때에만 setState를 사용하게 하면 마지막에만 렌더링을 다시하지 않을까?
            // props - btnnames, forclass, forstate
            <div className="btnbox">
                {this.props.btnnames.map((value, index) => {
                    return <button key={index} id={this.props.forstate} title={index} onClick={this.props.setter} dangerouslySetInnerHTML={{ __html: value }} />
                })}
            </div>
        )
    }
}

export class Selectbox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <select id={this.props.forstate} onChange={this.props.setter}>
                    {this.props.btnnames.map((value, index) => {
                        return <option key={index}>{value}</option>
                    })}
                </select>
        )
    }
}

export class Slider extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        let wageslider = document.getElementById(this.props.forstate)
        wageslider.addEventListener("mousemove", ()=>{
            let percentage = (wageslider.value-8350)/6650*100;
            let slidercolor = "linear-gradient(90deg, rgb(110, 180, 255)"+percentage+"%, rgb(214,214,214)"+percentage+"%)";
            wageslider.style.background = slidercolor;
        })
    }
    render() {
        return (
            <div>
                <input type="range" min="8350" max="15000" step="10" id={this.props.forstate} onChange={this.props.setter} />
            </div>
        )
    }
}

export class Localsel extends Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate(){
        let currentlocal = this.props.localdetail.slice();
        for(let i=0; i<currentlocal.length; i++){
            if(document.getElementById(currentlocal[i])){
                document.getElementById(currentlocal[i]).classList.add('btnclicked');
            }
        }
    }
    render() {
        if(this.props.local === '전체'){
            return (
                <span></span>
            )
        } else {
            return (
                <div className='localdiv'>
                    <div className="firstlocalbtn" onClick={this.props.firstbtn} id={this.props.local+' 전체'}>{this.props.local} 전체</div>
                    {local[this.props.local].slice().map((value, index) => {
                        return <div className={"searchselector2"} onClick={this.props.togglefunc} key={index} id={this.props.local+' '+value}>{value}</div>
                    })}
                </div>
            )
        }
        
    }
}