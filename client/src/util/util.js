// const $ = require("jquery")
// const axios = require("axios");
const moment = require("moment")


/**
 * 文字列置換
 */
module.exports.strReplace = function(strValue, aryArg) {
    for (let i = 0; i < aryArg.length; i++) {
        strValue = strValue.replace("{" + i.toString() + "}", aryArg[i]);
    }
    return strValue;
}


/**
 * 入力数字と確認数字を比較し、一致する数字個数と一致する数字を返す
 * 
 * @param {Array} inputNum : 入力数字
 * @param {Array} checkNum : 確認数字
 * 
 */
module.exports.isMatchNum = function(inputNum, checkNum) {
    
    let isMatch = [];
    let matchCount = 0;
    for (let i = 0; i < inputNum.length; i++) {
        checkNum.find(item => {
            if (item === inputNum[i]) {
                isMatch.push(inputNum[i])
                matchCount++;
            }
        })
    }

    const result = [matchCount, isMatch]
    
    return result;
}

/**
 * 年月リストを作成する
 * 
 * @return {Array} ["取得結果","ロト情報","ロト情報の区別"]
 * 
 */
module.exports.createSelectDaysList = function() {
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

/**
 * 入力数字を回収する
 * 
 * @return {Array} ["ロト1行","ロト2行","ロトn行"]
 * 
 */
module.exports.takeLuckyNumber = function() {
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

/**
 * 区別選択画面制御
 * 
 */
// module.exports.selectGroup = function() {
//     const group = document.getElementById("selectedGroup").value;
//     document.getElementById("choiceGroup").value = group
//     $("#selectGroupDiv").hide(700)
//     $(".lotoLogo").hide(700)
//     $("#selectLuckyNumverDiv").show(700) 
// }

/**
 * 画面をリフレッシュする
 * 
 */
module.exports.pageRefresh = function() {
    window.location.reload(false);    
}

/**
 * 参考用の当選数字作成
 * 
 * @param {Array} arrTarget : 数字
 * @param {Array} position : 入力する場所のID名（hoiceMainNum、choiceBonusNum）
 */
module.exports.createLuckyNum = function(arrTarget, position) {
    for (let index = 0; index < arrTarget.length; index++) {
        let inputElem = document.createElement('input');
        inputElem.setAttribute('class', 'form-control');
        inputElem.setAttribute('value', arrTarget[index]);
        inputElem.readOnly = true;
        document.getElementById(position).appendChild(inputElem)
    }
}
