import React, { Component } from 'react';
import Searchone from './Searchcomponents/Jobsearch';
import Searchtwo from './Searchcomponents/Sittersearch';
import Detailpageone from './Searchcomponents/Jobdetailpage';
import Detailpagetwo from './Searchcomponents/Sitterdetailpage';

export class Jobsearch extends Component {
    render() {
        return (
            <div className='bodydiv'>
                <div className='searchtitle'>채용정보검색</div>
                <Searchone />
            </div>
        );
    }
};
export class Sittersearch extends Component {
    render() {
        return (
            <div className='bodydiv'>
                <div className='searchtitle'>인재정보검색</div>
                <Searchtwo />
            </div>
        );
    }
};
export class Jobdetailpage extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <Detailpageone />
        )
    }
}
export class Sitterdetailpage extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <Detailpagetwo />
        )
    }
}