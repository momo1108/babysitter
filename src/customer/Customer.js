import React from "react";
import { Container, Row, Col, Button, Form, Modal, InputGroup, Jumbotron, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
const serialize = require('form-serialize');
const axios = require("axios");

class Customer extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <>
                
            </>
        );
    }
}
// 연결하면서 반환
export default connect()(Customer)
