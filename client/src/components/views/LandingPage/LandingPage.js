import React from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'
// import $ from "jquery";
// const axios = require("axios");
// const util = require('../../../util/util');
// const moment = require("moment")


function LandingPage() {
    var slideIndex = 0;
    const showSlides = () => {
        console.log(slideIndex)
        var slides = document.getElementsByClassName("mySlides");
        console.log(slides);
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 3000); // Change image every 2 seconds
    }

    window.addEventListener('load', showSlides);
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
                        <div className="mySlides fade" style={{opacity: 'initial'}}>
                            <img src="/imgs/loto7-1.png" />
                        </div>
                        <div className="mySlides fade" style={{opacity: 'initial'}}>
                         <img src="/imgs/loto7-2.png" />
                        </div>
                        <div className="mySlides fade" style={{opacity: 'initial'}}>
                            <img src="/imgs/loto7-3.png" />
                        </div>
                        <div className="mySlides fade" style={{opacity: 'initial'}}>
                            <img src="/imgs/loto7-4.png" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LandingPage

