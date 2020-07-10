import React, { useEffect, useState } from 'react'
import { Container, Table, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Lotto7.css'
import $ from "jquery";
const axios = require("axios");
const util = require('../../../util/util');
const moment = require("moment")

function Lotto7() {

    const [isValidation, setisValidation] = useState(false)
    const [luckyNumberLine, setLuckyNumberLine] = useState([])
    const [LuckyNumberInfoList, setluckyNumberInfoList] = useState([])
    const [LuckyNumberGroupList, setluckyNumberGroupList] = useState([])
    const [selectDaysList, setSelectDaysList] = useState([])

    useEffect(() => {
        setLuckyNumberLine([
                        {"index": 1,"luckyNumbers":["","","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 2,"luckyNumbers":["","","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 3,"luckyNumbers":["","","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 4,"luckyNumbers":["","","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 5,"luckyNumbers":["","","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                    ]);
        const today = moment();
        let thisYear = today.year();
        let thisMonth = () => {
            if ((('0' + today.month()).slice(-2)) === "00") {
                thisYear = (today.year()-1)
                return "12"
            } else {return (('0' + today.month()).slice(-2));}
        };

        //util.getLuckyNumber(thisYear, thisMonth(), "loto7")
        
        getLuckyNumber(thisYear, thisMonth())

        axios.get("/api/luckyNumber/getSelectDaysList").then(res => {
            setSelectDaysList(createSelectDaysList());
            document.getElementById("selectedDay").value = null;
        })

    }, [])

    const checkWinLotto = () => {
        //入力本数字
        const numbersList = takeLuckyNumber();

        //区別
        const group = document.getElementById("selectedGroup").value;

        for (let i = 0; i < LuckyNumberInfoList.length; i++) {
            if (LuckyNumberInfoList[i].区別 === group) {
                const checkMainNum = [
                    LuckyNumberInfoList[i].本数字1
                    ,LuckyNumberInfoList[i].本数字2
                    ,LuckyNumberInfoList[i].本数字3
                    ,LuckyNumberInfoList[i].本数字4
                    ,LuckyNumberInfoList[i].本数字5
                    ,LuckyNumberInfoList[i].本数字6
                    ,LuckyNumberInfoList[i].本数字7
                ]
                const checkBonusNum = [
                    LuckyNumberInfoList[i].ボーナス数字1.substring(1,3)
                    ,LuckyNumberInfoList[i].ボーナス数字2.substring(1,3)
                ]
                checkLotto7(numbersList, checkMainNum, checkBonusNum);
                break; 
            }
        }

        javascript:window.scrollTo(0,0)
    }

    const checkLotto7 = (numbersList, checkMainNum, checkBonusNum) => {
        if (isValidation) {
            let luckyNumberFinalResult = [];
            for (let i = 0; i < numbersList.length; i++) {
                const result = util.isMatchNum(numbersList[i].luckyNumbers,checkMainNum);
                switch (result[0]) {
                    case 7:
                        //1等(申込数字が本数字7個と全て一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "1等","winNumber":result[1]})
                        break;
                    case 6:
                        const bonusResult2stAnd3st = util.isMatchNum(numbersList[i].luckyNumbers,checkBonusNum);
                        if (bonusResult2stAnd3st[0] > 0) {
                            //2等(申込数字が本数字6個と一致し、更にボーナス数字2個のうち1個と一致) 
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "2等","winNumber":result[1].concat(bonusResult2stAnd3st[1]),"bonusNums": bonusResult2stAnd3st[1]})
                        } else {
                            //3等(申込数字が本数字6個と一致)
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "3等","winNumber":result[1]})
                        }
                        break;
                    case 5:
                        //4等(申込数字が本数字5個と一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "4等","winNumber":result[1]})
                        break;
                    case 4:
                        //5等(申込数字が本数字4個と一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "5等","winNumber":result[1]})
                        break;
                    case 3:
                        const bonusResult6st = util.isMatchNum(numbersList[i].luckyNumbers,checkBonusNum);
                        if (bonusResult6st[0] === 2) {
                            //6等(申込数字が本数字3個と一致し、更にボーナス数字1個または2個と一致)
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "6等","winNumber":result[1].concat(bonusResult6st[1]),"bonusNums": bonusResult6st[1]})
                        } else {
                            //残念
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "残念","winNumber":result[1]})
                        }
                        break;
                    default:
                        //残念
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "残念","winNumber":result[1]})
                        break;
                }
            }

            setLuckyNumberLine(luckyNumberLine.filter(i => {
                luckyNumberFinalResult.filter(x => {
                    if (i.index === Number(x.index)) {
                        i.rank = x.rank
                        i.winNumber = x.winNumber
                        i.money = "未定"
                    }
                })
                return luckyNumberLine
            }))
            console.log(luckyNumberLine);
        } else {
            alert("本数字入力欄に誤りがあります。赤い枠の所を正しく入力してください。")
        }
    }

    const takeLuckyNumber = () => {
        const iLength = document.getElementsByClassName("luckyNumberBox").length;
        let numbersList = [];
        for (let i = 0; i < iLength; i++) {
            const index = document.getElementsByClassName("luckyNumberBox")[i].parentElement.children[0].innerText;
            const jLength =  document.getElementsByClassName("luckyNumberBox")[i].children.length;
            let numbers = [{
                "index": null
                ,"luckyNumbers": []
            }];
            for (let j = 0; j < jLength; j++) {
                
                const value = document.getElementsByClassName("luckyNumberBox")[i].children[j].value;
                if (value !== "") {
                    numbers[0].luckyNumbers.push(value)
                } else {
                    numbers[0].luckyNumbers.push("00")
                }
            }
            
            //"00"외에 다른게 들어있으면 push
            for (let z = 0; z < numbers[0].luckyNumbers.length; z++) {
                if (numbers[0].luckyNumbers[z] !== "00" ) {
                    numbers[0].index = index;
                    numbersList.push(numbers[0])
                    break
                }
            }
        }
        return numbersList;
    }

    const onLuckyNumHandler = (event) => {
        
        const mainLocation = Number(event.target.parentElement.parentElement.children[0].innerText);
        let subLocation;
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i] === event.target) {
                subLocation = i;
                break;
            }
            
        }
        if (subLocation != null) {
            setLuckyNumberLine(luckyNumberLine.filter(i => {
                if (i.index === mainLocation) {
                    i.luckyNumbers[subLocation] = event.target.value
                }
                return luckyNumberLine;
            }));
        }
    }

    const checkValidation = (event) => {
        const mainLocation = Number(event.target.parentElement.parentElement.children[0].innerText-1);
        let subLocation;
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i] === event.target) {
                subLocation = i;
                break;
            }
            
        }

        let val = Number(luckyNumberLine[mainLocation].luckyNumbers[subLocation]);
        if (luckyNumberLine[mainLocation].luckyNumbers[subLocation] !== "") {
            if (0 === val || val >= 38) {
                event.target.classList.add("luckyNumberError")
                setisValidation(false);
                // alert("1~37の数字を入力してください。")
            }else {
                setLuckyNumberLine(luckyNumberLine.filter(i => {
                    if (i.index === (mainLocation+1)) {
                        i.luckyNumbers[subLocation] = ('0' + val).slice(-2)
                    }
                    return luckyNumberLine;
                }));
    
                let overlapCount = 0;        
                for (let j = 0; j < luckyNumberLine[mainLocation].luckyNumbers.length; j++) {
                    if (luckyNumberLine[mainLocation].luckyNumbers[j] === (('0' + val).slice(-2))) overlapCount++
                }
                if (overlapCount > 1) {
                    if (!event.target.classList.contains("luckyNumberError")) {
                        event.target.classList.add("luckyNumberError")
                    }
                    setisValidation(false);
                    return;
                }
    
                if (event.target.classList.contains("luckyNumberError")) {
                    event.target.classList.remove("luckyNumberError")
                }
                
                setisValidation(true);
            }
        } else {
            setisValidation(true);
        }
    }
    const getLuckyNumber = (thisYear, thisMonth) => {
        // loading On
        $('#loading').show();
        const endUrl = `/api/luckyNumber/getLuckyNumber?year=${thisYear}&month=${thisMonth}&type=loto7`
        axios.get(endUrl).then(res => {
            if (res.data.success === true) {
                console.log(res);

                setluckyNumberInfoList(res.data.luckyNumber)
                let luckyNumberGroups = [];
                for (let i = 0; i < res.data.luckyNumber.length; i++) {
                    luckyNumberGroups.push(res.data.luckyNumber[i].区別)
                }
                setluckyNumberGroupList(luckyNumberGroups)
                document.getElementById("selectedGroup").value = null;

                // loading Off
                $('#loading').hide();

            } else {
                alert("選択された年月はまだ行っておりません。")
            }
        })
    }

    const selectDay = () => {
        const selectedDay = document.getElementById("selectedDay").value;
        const selectedYear = selectedDay.substring(0, 4);
        const selectedMonth = selectedDay.substring(5, 7);
        document.getElementById("choiceDay").value = selectedDay;
        $("#selectDayDiv").hide(700)
        $("#selectGroupDiv").show(700)
        getLuckyNumber(selectedYear, selectedMonth)
    }

    const selectGroup = () => {
        const group = document.getElementById("selectedGroup").value;
        document.getElementById("choiceGroup").value = group
        $("#selectGroupDiv").hide(700)
        $(".lotoLogo").hide(700)
        $("#selectLuckyNumverDiv").show(700)
    }

    const landingPageReset = () => {
        window.location.reload(false);    
    }

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

    const addLuckyNumber = ()  => {
        setLuckyNumberLine(luckyNumberLine.concat([{"index": (Number(luckyNumberLine[luckyNumberLine.length -1].index)+1),"luckyNumbers":["","","","","","",""],"winNumber" : null,"rank" : null,"money" : null}]));}

    const removeLuckyNumber = (event)  => {
        setLuckyNumberLine(luckyNumberLine.filter(i => {if (i.index !== Number(event.target.value)) return luckyNumberLine}))
    }
    return (
        <div>
        <div id="loading"><img id="loading-image" src="/imgs/loading.gif" alt="Loading..." /></div>
        <br />
        <Container>
            <div className="lotoLogo">
                <img src="/imgs/loto7.png" alt="loto7" />
            </div>
            <div id='selectDayDiv'>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                        <Form.Label>当せん情報の年月を選択してください。</Form.Label>
                        <Form.Control id="selectedDay" as="select" htmlSize={3} custom onChange={selectDay}>
                            {selectDaysList && selectDaysList.map((select, index) => (
                                <React.Fragment key={index}>
                                    <option>{select}</option>
                                </React.Fragment>
                            ))}

                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div id='selectGroupDiv'>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                        <Form.Label>当せん情報の区別を選択してください。</Form.Label>
                        <Form.Control id="selectedGroup" as="select" htmlSize={3} custom onChange={selectGroup}>
                            {LuckyNumberGroupList && LuckyNumberGroupList.map((select, index) => (
                                <React.Fragment key={index}>
                                    <option>{select}</option>
                                </React.Fragment>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div id='selectLuckyNumverDiv'>
                <div class="div-style">
                    <ul>
                        <li>
                            <label>年度</label>
                            <input id="choiceDay" readOnly/>
                            <span></span>
                        </li>
                        <li>
                            <label>区別</label>
                            <input id="choiceGroup" readOnly/>
                            <span></span>
                        </li>
                    </ul>
                </div>
                <form>
                    <Table striped bordered hover size="sm" className='luckyNumberTable'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>本数字</th>
                                <th>等数</th>
                                {/* <th>当選金額</th> */}
                                <th>削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {luckyNumberLine && luckyNumberLine.map((item, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{item.index}</td>
                                        <td className='luckyNumberBox input-group'>
                                            {item.luckyNumbers.map((target,j) => (
                                                <FormControl key={j} type='tel' 
                                                className={'luckyNumber ' + (item.winNumber ? item.winNumber.indexOf(target) !== -1  ? "winNum" : "" : "")} 
                                                value={target} minLength="1" maxLength="2" onChange={onLuckyNumHandler} onBlur={checkValidation.bind(this)}/>
                                            ))}
                                        </td>
                                        <td>{item.rank}</td>
                                        {/* <td>{item.money}</td> */}
                                        <td><Button variant="danger" size="sm" value={item.index} block onClick={removeLuckyNumber}>行削除</Button></td>
                                    </tr>
                                </React.Fragment>
                            ))}
                            <tr>
                                <td colSpan="6">
                                    <Button variant="primary" size="lg" block onClick={addLuckyNumber}>入力欄追加</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table> 
                    <Button variant="info" size="lg" block onClick={checkWinLotto}>結果確認</Button>
                    <Button variant="success" size="lg" block onClick={landingPageReset}>最初に戻る</Button>
                </form>
            </div>
        </Container>
        </div>
    )
}

export default Lotto7

