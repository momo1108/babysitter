import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import {openAlertAction, closeAlertAction} from "../redux/actions/actions";

class AlertCustom extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.setShow.bind(this);
        console.log("this.props", this.props);
    }
    
    /**
     * 경고창 닫기
     * @author : jskpubller86 
     * @version : 1.0
     **/
    setShow(chk) {
        if(this.props.cb){
            this.props.cb();
        }
        this.props.closeAlertAction();
    };
    render(){
        const comp = <Alert show={this.props.alertReducer.show} variant={this.props.alertReducer.variant} onClose={() => this.setShow(false)}  dismissible>
                        <Alert.Heading>{this.props.alertReducer.heading}</Alert.Heading>
                        <p>
                            {this.props.alertReducer.message}
                        </p>
                    </Alert>;
        return (
                ReactDOM.createPortal(
                    comp,
                    document.querySelector('#container')
                )
                
        );
    }
}
const mapStateToProps = state =>{
    const { alertReducer } = state;
    return { alertReducer }
};
export default connect( mapStateToProps, {openAlertAction, closeAlertAction})(AlertCustom);