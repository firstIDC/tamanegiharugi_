import React, { useEffect, useState } from 'react'
import { Container, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'
import $ from "jquery";
// const axios = require("axios");
// const util = require('../../../util/util');
// const moment = require("moment")


function LandingPage() {

    return (
        <div>
            <hr/>
            <Container>
                <ListGroup>
                    <ListGroup.Item><a href="/lotto7">ロト7</a></ListGroup.Item>
                    <ListGroup.Item><a href="/lotto6">ロト6</a></ListGroup.Item>
                    <ListGroup.Item><a href="/minilotto">ミニロト</a></ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    )
}

export default LandingPage

