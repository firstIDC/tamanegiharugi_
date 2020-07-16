import React, { useEffect, useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import './LuckyNumberInfo.css'
import LuckyNumberInfoSections from './Sections/LuckyNumberInfo'
import YearMonthBase from '../commons/yearMonthBase'
import Loading from '../commons/loading'
import $ from "jquery";
const axios = require("axios");
const util = require('../../../util/util');
const moment = require("moment")

function LuckyNumberInfo(props) {
    const [LuckyNumberInfoList, setluckyNumberInfoList] = useState([])
    const [selectDaysList, setSelectDaysList] = useState([])

    useEffect(() => {
        setSelectDaysList(util.createSelectDaysList);
        if (Object.keys(props.match.params).length !== 0) {
            getLuckyNumber(props.match.params.year, props.match.params.month, props.match.params.type)
            document.getElementById("selectedType").value = props.match.params.type
            setTimeout(function(){ document.getElementById("selectedDay").value = `${props.match.params.year}年${props.match.params.month}月`; }, 300);
        } else {
            const today = moment();
            let thisYear = today.year();
            let thisMonth = () => {
                if ((('0' + today.month()).slice(-2)) === "00") {
                    thisYear = (today.year()-1)
                    return "12"
                } else {return (('0' + today.month()).slice(-2));}
            };
            getLuckyNumber(thisYear, thisMonth(), "loto7")
            setTimeout(function(){ document.getElementById("selectedDay").value = null; }, 300);
        }
    }, [])

    const selectType = () => {
        document.getElementById("selectedDay").value = null;
    }

    const selectDay = () => {
        const selectedDay = document.getElementById("selectedDay").value;
        const selectedType = document.getElementById("selectedType").value;
        const selectedYear = selectedDay.substring(0, 4);
        const selectedMonth = selectedDay.substring(5, 7);
        getLuckyNumber(selectedYear, selectedMonth, selectedType)
    }

    //みずほホームページから、ロト情報取得する
    const getLuckyNumber = (thisYear, thisMonth, type) => {
        $('#loading').show();

        const endUrl = `/api/luckyNumber/getLuckyNumber?year=${thisYear}&month=${thisMonth}&type=${type}`
        axios.get(endUrl).then(res => {
            if (res.data.success === true) {
                console.log(res.data.luckyNumber);
                setluckyNumberInfoList(res.data.luckyNumber)
                $('#loading').hide();
            } else {
                alert("選択された年月はまだ行っておりません。")
            }
        })
    }

    return (
    <>
        <Loading />
        <br />
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>ロトの種類を選択してください。</Form.Label>
                    <Form.Control id="selectedType" as="select" htmlSize={3} custom onClick={selectType}>
                        <option value="loto7">ロト7</option>
                        <option value="loto6">ロト6</option>
                        <option value="miniloto">ミニロト</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <br />
            <YearMonthBase 
                selectDayFn = {selectDay}
                YearMonthList = {selectDaysList}
            />
            <hr />
            {LuckyNumberInfoList.map((item, index) => (
                <React.Fragment key={index}>
                    <LuckyNumberInfoSections
                        年月日={item.年月日}
                        区別={item.区別}
                        抽せん日={item.抽せん日}
                        本数字1={item.本数字1}
                        本数字2={item.本数字2}
                        本数字3={item.本数字3}
                        本数字4={item.本数字4}
                        本数字5={item.本数字5}
                        本数字6={item.本数字6}
                        本数字7={item.本数字7}
                        ボーナス数字1={item.ボーナス数字1}
                        ボーナス数字2={item.ボーナス数字2}
                        等1口={item.等1口}
                        等1金額={item.等1金額}
                        等2口={item.等2口}
                        等2金額={item.等2金額}
                        等3口={item.等3口}
                        等3金額={item.等3金額}
                        等4口={item.等4口}
                        等4金額={item.等4金額}
                        等5口={item.等5口}
                        等5金額={item.等5金額}
                        等6口={item.等6口}
                        等6金額={item.等6金額}
                        販売実績額={item.販売実績額}
                        キャリーオーバー={item.キャリーオーバー}
                    />
                </React.Fragment>
            ))}
            {/* {(LuckyNumberInfoList) ? LuckyNumberInfoList.map((item, index) => (
                <React.Fragment key={index}>
                    <LuckyNumberInfoSections
                        年月日={item.年月日}
                        区別={item.区別}
                        抽せん日={item.抽せん日}
                        本数字1={item.本数字1}
                        本数字2={item.本数字2}
                        本数字3={item.本数字3}
                        本数字4={item.本数字4}
                        本数字5={item.本数字5}
                        本数字6={item.本数字6}
                        本数字7={item.本数字7}
                        ボーナス数字1={item.ボーナス数字1}
                        ボーナス数字2={item.ボーナス数字2}
                        等1口={item.等1口}
                        等1金額={item.等1金額}
                        等2口={item.等2口}
                        等2金額={item.等2金額}
                        等3口={item.等3口}
                        等3金額={item.等3金額}
                        等4口={item.等4口}
                        等4金額={item.等4金額}
                        等5口={item.等5口}
                        等5金額={item.等5金額}
                        等6口={item.等6口}
                        等6金額={item.等6金額}
                        販売実績額={item.販売実績額}
                        キャリーオーバー={item.キャリーオーバー}
                    />
                </React.Fragment>
            )) : NullLuckyNumberInfoList() } */}
        </Container>
    </>
    )
}

export default LuckyNumberInfo