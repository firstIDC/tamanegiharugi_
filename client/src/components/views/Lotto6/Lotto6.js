import React, { useEffect, useState } from 'react'
import { Container, Table, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalBase from '../commons/modalBase'
import YearMonthBase from '../commons/yearMonthBase'
import GroupBase from '../commons/groupBase'
import Loading from '../commons/loading'
import './Lotto6.css'
import $ from "jquery";
const axios = require("axios");
const util = require('../../../util/util');
// const moment = require("moment")

function Lotto6() {

    const [isValidation, setisValidation] = useState(false)
    const [UserInputNumber, setUserInputNumber] = useState([])
    const [LuckyNumberOrigin, setLuckyNumberOrigin] = useState([])
    const [WinMoney, setWinMoney] = useState([])
    const [SelectedLuckyMainNumber, setSelectedLuckyMainNumber] = useState([])
    const [SelectedLuckyBonusNumber, setSelectedLuckyBonusNumber] = useState([])
    const [LuckyNumberGroupList, setluckyNumberGroupList] = useState([])
    const [selectDaysList, setSelectDaysList] = useState([])
    const [show, setShow] = useState(false);
    const [winNum, setwinNum] = useState()

    useEffect(() => {
        setUserInputNumber([
                        {"index": 1,"luckyNumbers":["","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 2,"luckyNumbers":["","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 3,"luckyNumbers":["","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 4,"luckyNumbers":["","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                        ,{"index": 5,"luckyNumbers":["","","","","",""]
                        ,"winNumber" : null,"rank" : null,"money" : null}
                    ]);
        setSelectDaysList(util.createSelectDaysList)
        setTimeout(function(){ document.getElementById("selectedDay").value = null; }, 300);
    }, [])

    const showToggle = () => setShow(!show)

    const checkWinLotto = async () => {
        //入力本数字
        const numbersList = util.takeLuckyNumber();

        let winResult = checkLotto6(numbersList, SelectedLuckyMainNumber, SelectedLuckyBonusNumber);

        window.scrollTo(0,0)
        if (winResult !== 99 && winResult < 4) {
            setwinNum(winResult)
            showToggle();
        }
    }

    //当選確認
    const checkLotto6 = (numbersList, checkMainNum, checkBonusNum) => {
        let winResult = 99;
        if (isValidation) {
            let luckyNumberFinalResult = [];
            for (let i = 0; i < numbersList.length; i++) {
                const result = util.isMatchNum(numbersList[i].luckyNumbers,checkMainNum);
                switch (result[0]) {
                    case 6:
                        //1等(申込数字が本数字6個と全て一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "1等","winNumber":result[1]})
                        winResult = 1
                        break;
                    case 5:
                        const bonusResult2stAnd3st = util.isMatchNum(numbersList[i].luckyNumbers,checkBonusNum);
                        if (bonusResult2stAnd3st[0] > 0) {
                            //2等(申込数字が本数字5個と一致し、更にボーナス数字1個と一致) 
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "2等","winNumber":result[1].concat(bonusResult2stAnd3st[1]),"bonusNums": bonusResult2stAnd3st[1]})
                            if (winResult > 2) {
                                winResult = 2
                            }
                        } else {
                            //3等(申込数字が本数字5個と一致)
                            luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "3等","winNumber":result[1]})
                            if (winResult > 3) {
                                winResult = 3
                            }
                        }
                        break;
                    case 4:
                        //4等(申込数字が本数字4個と一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "4等","winNumber":result[1]})
                        if (winResult > 4) {
                            winResult = 4
                        }
                        break;
                    case 3:
                        //5等(申込数字が本数字3個と一致)
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "5等","winNumber":result[1]})
                        if (winResult > 5) {
                            winResult = 5
                        }
                        break;
                    default:
                        //残念
                        luckyNumberFinalResult.push({"index":numbersList[i].index,"rank": "残念","winNumber":result[1]})
                        break;
                }
            }

            setUserInputNumber(UserInputNumber.filter(i => {
                luckyNumberFinalResult.filter(x => {
                    if (i.index === Number(x.index)) {
                        i.rank = x.rank
                        i.winNumber = x.winNumber
                        i.money = "未定"
                    }
                })
                return UserInputNumber
            }))
            return winResult
        } else {
            alert("本数字入力欄に誤りがあります。赤い枠の所を正しく入力してください。")
        }
    }

    //ユーザーから番号入力時
    const luckyNumInput = (event) => {
        
        const mainLocation = Number(event.target.parentElement.parentElement.children[0].innerText);
        let subLocation;
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i] === event.target) {
                subLocation = i;
                break;
            }
            
        }
        if (subLocation != null) {
            setUserInputNumber(UserInputNumber.filter(i => {
                if (i.index === mainLocation) {
                    i.luckyNumbers[subLocation] = event.target.value
                }
                return UserInputNumber;
            }));
        }
    }

    //入力バリデーションチェック
    const checkValidation = (event) => {
        const mainLocation = Number(event.target.parentElement.parentElement.children[0].innerText-1);
        let subLocation;
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i] === event.target) {
                subLocation = i;
                break;
            }
        }

        let val = Number(UserInputNumber[mainLocation].luckyNumbers[subLocation]);
        if (UserInputNumber[mainLocation].luckyNumbers[subLocation] !== "") {
            if (0 === val || val >= 44) {
                event.target.classList.add("luckyNumberError")
                setisValidation(false);
                // alert("1~37の数字を入力してください。")
            }else {
                setUserInputNumber(UserInputNumber.filter(i => {
                    if (i.index === (mainLocation+1)) {
                        i.luckyNumbers[subLocation] = ('0' + val).slice(-2)
                    }
                    return UserInputNumber;
                }));
    
                let overlapCount = 0;        
                for (let j = 0; j < UserInputNumber[mainLocation].luckyNumbers.length; j++) {
                    if (UserInputNumber[mainLocation].luckyNumbers[j] === (('0' + val).slice(-2))) overlapCount++
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

    //ホームページから、ロト情報取得する
    const getLuckyNumber = (thisYear, thisMonth) => {
        $('#loading').show();

        const endUrl = `/api/luckyNumber/getLuckyNumber?year=${thisYear}&month=${thisMonth}&type=loto6`
        axios.get(endUrl).then(res => {
            if (res.data.success === true) {
                console.log(res.data.luckyNumber);

                setLuckyNumberOrigin(res.data.luckyNumber)
                
                let luckyNumberGroups = [];
                for (let i = 0; i < res.data.luckyNumber.length; i++) {
                    luckyNumberGroups.push(res.data.luckyNumber[i].区別)
                }
                
                setluckyNumberGroupList(luckyNumberGroups)
                document.getElementById("selectedGroup").value = null;

                $('#loading').hide();

            } else {
                alert("選択された年月はまだ行っておりません。")
            }
        })
    }

    //年月押下時
    const selectDay = () => {
        const selectedDay = document.getElementById("selectedDay").value;
        const selectedYear = selectedDay.substring(0, 4);
        const selectedMonth = selectedDay.substring(5, 7);
        document.getElementById("choiceDay").value = selectedDay;

        $("#selectDayDiv").hide(700)
        $("#selectGroupDiv").show(700)

        getLuckyNumber(selectedYear, selectedMonth)
    }

    //区別押下時
    const selectGroup = () => {
        const group = document.getElementById("selectedGroup").value;
        document.getElementById("choiceGroup").value = group
        $("#selectGroupDiv").hide(700)
        $(".lotoLogo").hide(700)
        $("#selectLuckyNumverDiv").show(700) 

        for (let i = 0; i < LuckyNumberOrigin.length; i++) {
            if (LuckyNumberOrigin[i].区別 === group) {
                const checkMainNum = [
                    LuckyNumberOrigin[i].本数字1
                    ,LuckyNumberOrigin[i].本数字2
                    ,LuckyNumberOrigin[i].本数字3
                    ,LuckyNumberOrigin[i].本数字4
                    ,LuckyNumberOrigin[i].本数字5
                    ,LuckyNumberOrigin[i].本数字6
                ]
                const checkBonusNum = [
                    LuckyNumberOrigin[i].ボーナス数字1.substring(1,3)
                ]

                const winMoneyList = [{"rank" : 1 ,"money": LuckyNumberOrigin[i].等1金額}
                                    ,{"rank" : 2 ,"money": LuckyNumberOrigin[i].等2金額}
                                    ,{"rank" : 3 ,"money": LuckyNumberOrigin[i].等3金額}
                                    ,{"rank" : 4 ,"money": LuckyNumberOrigin[i].等4金額}
                                    ,{"rank" : 5 ,"money": LuckyNumberOrigin[i].等5金額}
                                    ,{"rank" : 6 ,"money": LuckyNumberOrigin[i].等6金額}]

                setWinMoney(winMoneyList);
                setSelectedLuckyMainNumber(checkMainNum);
                setSelectedLuckyBonusNumber(checkBonusNum);
                util.createLuckyNum(checkMainNum, "choiceMainNum")
                util.createLuckyNum(checkBonusNum, "choiceBonusNum")
                break; 
            }
        }
    }

    //行追加
    const addLuckyNumber = ()  => {
        setUserInputNumber(UserInputNumber.concat([{"index": (Number(UserInputNumber[UserInputNumber.length -1].index)+1),"luckyNumbers":["","","","","",""],"winNumber" : null,"rank" : null,"money" : null}]));
    }
    //行削除
    const removeLuckyNumber = (event)  => {
        setUserInputNumber(UserInputNumber.filter(i => {if (i.index !== Number(event.target.value)) return UserInputNumber}))
    }

    
    return (
        <>
        {winNum && <ModalBase 
            handleCloseFn = {showToggle}
            showParam = {show}
            winNumParam = {winNum}
            winMoney = {WinMoney}
        />}
        <Loading />
        <br />
        <Container>
            <div className="lotoLogo">
                <img src="/imgs/loto6.png" alt="loto6" />
            </div>
            <div id='selectDayDiv'>
                <YearMonthBase 
                    selectDayFn = {selectDay}
                    YearMonthList = {selectDaysList}
                />
            </div>
            <div id='selectGroupDiv'>
                <GroupBase 
                    selectGroupFn = {selectGroup}
                    groupList = {LuckyNumberGroupList}
                    pageRefresh = {util.pageRefresh}
                />
            </div>
            <div id='selectLuckyNumverDiv'>
                <div className="div-style-7-3">
                    <ul>
                        <li>
                            <label>本数字</label>
                            <div className='input-group' id='choiceMainNum'></div>
                            <span>当選本数字</span>
                        </li>
                        <li>
                            <label>ボーナス数字</label>
                            <div className='input-group' id='choiceBonusNum'></div>
                            <span>当選ボーナス数字</span>
                        </li>
                    </ul>
                </div>
                <div className="div-style-5-5">
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
                                <th>削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserInputNumber && UserInputNumber.map((item, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{item.index}</td>
                                        <td className='luckyNumberBox input-group'>
                                            {item.luckyNumbers.map((target,j) => (
                                                <FormControl key={j} type='tel' 
                                                className={'luckyNumber ' + (item.winNumber ? item.winNumber.indexOf(target) !== -1  ? "winNum" : "" : "")} 
                                                value={target} minLength="1" maxLength="2" onChange={luckyNumInput} onBlur={checkValidation.bind(this)}/>
                                            ))}
                                        </td>
                                        <td>{item.rank}</td>
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
                    <Button variant="success" size="lg" block onClick={checkWinLotto}>結果確認</Button>
                    <br />
                    <Button variant="danger" size="lg" block onClick={util.pageRefresh}>最初に戻る</Button>
                </form>
            </div>
        </Container>
        </>
    )
}

export default Lotto6

