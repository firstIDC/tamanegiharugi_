import React, { useEffect, useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import './LuckyNumberInfo.css'
import LuckyNumberInfoSections from './Sections/LuckyNumberInfo'

const axios = require("axios");
const moment = require("moment")

function LuckyNumberInfo() {
    const [LuckyNumberInfoList, setluckyNumberInfoList] = useState([])
    const [selectDaysList, setSelectDaysList] = useState([])

    useEffect(() => {

        const today = moment();
        let thisYear = today.year();
        let thisMonth = () => {
            if ((('0' + today.month()).slice(-2)) === "00") {
                thisYear = (today.year()-1)
                return "12"
            } else {return (('0' + today.month()).slice(-2));}
        };

        getLuckyNumber(thisYear, thisMonth())

        axios.get("/api/luckyNumber/getSelectDaysList").then(res => {
            setSelectDaysList(createSelectDaysList());
            document.getElementById("selectedDay").value = null;
            
        })
    }, [])

    const createSelectDaysList = () => {
        
        let selectDaysList = [];
        
        let thisYear = null ;
        let thisMonth = null;
        const today = moment();
        const createUnit = 12;
        for (let i = 0; i < createUnit; i++) {
            if (i === 0) {
                thisYear = today.year();
                thisMonth = ('0' + (today.month()+1)).slice(-2);
            }else {
                const targetDate = today.subtract(1, 'months');
                thisYear = targetDate.year();
                thisMonth = (('0' + (targetDate.month()+1).toString()).slice(-2));
            }
            selectDaysList[i] = thisYear + "年" + thisMonth  + "月"
        }
        return selectDaysList;
    }

    const NullLuckyNumberInfoList = () => {
        alert("データを取得しております。")
        setTimeout(function(){selectedLuckyNumber()},3000)
    }

    const selectedLuckyNumber = () => {
        const selectedDay = document.getElementById("selectedDay").value;
        const selectedYear = selectedDay.substring(0, 4);
        const selectedMonth = selectedDay.substring(5, 7);
        getLuckyNumber(selectedYear, selectedMonth)
    }

    const getLuckyNumber = (thisYear, thisMonth) => {

        const endUrl = `/api/luckyNumber/getLuckyNumber?year=${thisYear}&month=${thisMonth}`
        axios.get(endUrl).then(res => {
            if (res.data.success === true) {
                setluckyNumberInfoList(res.data.luckyNumber)
            } else {
                alert("選択された年月はまだ行っておりません。")
            }
        })
    }

    return (
    <div>
        <br />
        <Container>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                    <Form.Label>当せん情報の年月を選択してください。</Form.Label>
                    <Form.Control id="selectedDay" as="select" htmlSize={3} custom onChange={selectedLuckyNumber}>
                        {selectDaysList && selectDaysList.map((select, index) => (
                            <React.Fragment key={index}>
                                <option>{select}</option>
                            </React.Fragment>
                        ))}

                    </Form.Control>
                </Form.Group>
            </Form>
            {/* <hr />
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                    <Form.Label>当せん情報の区別を選択してください。</Form.Label>
                    <Form.Control id="selectedGroup" as="select" htmlSize={3} custom>
                        {LuckyNumberGroupList && LuckyNumberGroupList.map((select, index) => (
                            <React.Fragment key={index}>
                                <option>{select}</option>
                            </React.Fragment>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form> */}
            <hr />
            {(LuckyNumberInfoList) ? LuckyNumberInfoList.map((item, index) => (
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
            )) : NullLuckyNumberInfoList() }
        </Container>
    </div>
    )
}

export default LuckyNumberInfo