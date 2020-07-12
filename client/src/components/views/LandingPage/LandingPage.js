import React from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'
import Modal from '../commons/modal-base'
// import $ from "jquery";
// const axios = require("axios");
// const util = require('../../../util/util');
// const moment = require("moment")


function LandingPage() {

    

    // function ModalPage() {
    //     console.log("ModalPage22");
    //     return (
    //       <Modal visible={true}>Hello</Modal>
    //     )
    //   }
    
    //   console.log("ModalPage11")
    //   ModalPage()
    //   console.log("ModalPage33")


    return (
        <div className='topBody'>
            <hr/>
            <Container>
                <div className='topBox row'>
                    <div className='col-12 col-sm-6 leftBox'>
                        <div className='leftBox_top'>
                            <h2>私!本当に1等？</h2>
                            <h4>周りにバレずに確認しよう</h4>
                        </div>
                        <div className='leftBox_btm'>
                            <a href="/lotto7" className="btn btn-info btn-block btn-sm">ロト7</a>
                            <a href="/lotto6" className="btn btn-info btn-block btn-sm">ロト6</a>
                            <a href="/minilotto" className="btn btn-info btn-block btn-sm">ミニロト</a>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 rigthBox'>
                        <div className='iPhoneImg'></div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LandingPage

