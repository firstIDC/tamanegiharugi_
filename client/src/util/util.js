// import $ from "jquery";
// const axios = require("axios");
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
 * ロト情報を取得する
 * 
 * @param {String} thisYear : 入力数字
 * @param {String} thisMonth : 確認数字
 * @param {String} type : ロトタイプ（loto7, loto6, miniloto）
 * @return {Array} ["取得結果","ロト情報","ロト情報の区別"]
 * 
 */
module.exports.getLuckyNumber = async (thisYear, thisMonth, type) => {
    // loading On
    // $('#loading').show();
    const endUrl = `/api/luckyNumber/getLuckyNumber?year=${thisYear}&month=${thisMonth}&type=${type}`
    await fetch(endUrl).then(res => res.json())
        .then(res => {
            if (res.success === true) {
                console.log(res);
                // setluckyNumberInfoList(res.data.luckyNumber)
                let luckyNumberGroups = [];
                for (let i = 0; i < res.luckyNumber.length; i++) {
                    luckyNumberGroups.push(res.luckyNumber[i].区別)
                }
                // setluckyNumberGroupList(luckyNumberGroups)
                document.getElementById("selectedGroup").value = null;

                // loading Off
                // $('#loading').hide();

                const result = [true, res.luckyNumber, luckyNumberGroups];
                console.log(result)
                return result
            }
        })
    
    // axios.get(endUrl).then(res => {
    //     if (res.data.success === true) {
    //         console.log(res);

    //         // setluckyNumberInfoList(res.data.luckyNumber)
    //         let luckyNumberGroups = [];
    //         for (let i = 0; i < res.data.luckyNumber.length; i++) {
    //             luckyNumberGroups.push(res.data.luckyNumber[i].区別)
    //         }
    //         // setluckyNumberGroupList(luckyNumberGroups)
    //         document.getElementById("selectedGroup").value = null;

    //         // loading Off
    //         $('#loading').hide();

    //         return [true ,res.data.luckyNumber, luckyNumberGroups]

    //     } else {
    //         alert("選択された年月はまだ行っておりません。")
    //         return [false]
    //     }
    // })
}


