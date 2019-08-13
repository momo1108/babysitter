import React, { Component } from 'react';
import Detailsrch from './jobsearch/Detailsrch';
import Lists from './jobsearch/Lists';

export class Humansearch extends Component {
    render() {
        return (
            <div className='bodydiv'>
                <div className='searchtitle'>인재정보검색</div>
                <Detailsrch />
            </div>
        );
    }
};
export class Jobsearch extends Component {
    render() {
        return (
            <div className='bodydiv'>
                <div className='searchtitle'>채용정보검색</div>
                <Detailsrch />
            </div>
        );
    }
};