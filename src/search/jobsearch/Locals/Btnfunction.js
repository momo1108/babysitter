import React, { Component } from 'react';
import local from './address';

export class Btnfunctionstr extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <span>
                {this.props.btnnames.map((value, index) => {
                    return <div className={"searchselector " + this.props.forwhat} onClick={() => this.props.statesetter(this.props.forwhat, this.props.stateval[index], index)} key={index} id={this.props.forwhat + index}>{value}</div>
                })}
            </span>
        )
    }
}

export class Btnfunctionnum extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <span>
                {this.props.btnnames.map((value, index) => {
                    return <div className={"searchselector " + this.props.forwhat} onClick={() => this.props.statesetter(this.props.forwhat, index, index)} key={index} id={this.props.forwhat + index}>{value}</div>
                })}
            </span>
        )
    }
}
export class Btnfunctionlocal extends Component {
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