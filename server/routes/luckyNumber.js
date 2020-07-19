const express = require('express');
const router = express.Router();
const util = require('../util/util');
const { LuckyNumber7 } = require('../models/LuckyNumber7');
const { LuckyNumber6 } = require('../models/LuckyNumber6');
const { LuckyNumberMini } = require('../models/LuckyNumberMini');


/**
 * 年月で当せん情報を取得する
 * 
 * @param {string} year : 年
 * @param {string} month : 月
 * @param {string} type : loto6、loto7、miniloto
 * ex) "/getLuckyNumber?year=2020&month=06&type=loto7"  
 * 
 */
router.get("/getLuckyNumber", async (req, res) => {
    if (req.query.type === "loto7") {
        //Dbから選択年度のloto情報がない場合は取得し、保存し当せん情報を返す。
        LuckyNumber7.find({"年月日" : req.query.year+"/"+req.query.month}).exec(async (err, luckyNumber) => {
            if (err) return res.status(400).send(err)
            if (luckyNumber.length == 0) {
                await util.luckyNumberCrawling(req.query.year, req.query.month, "loto7")
                .then(async luckyNumbers => {
                    let isSuccess = false

                    let loopLength = 0;
                    for (let j = 0; j < luckyNumbers.length; j++) {
                        if (luckyNumbers[j].本数字1 == "" && luckyNumbers[j].本数字2 == "" && luckyNumbers[j].本数字3 == "" ) {
                            return res.status(200).json({success: isSuccess})
                        }
                        loopLength++;
                    }

                    for (let i = 0; i < loopLength; i++) {
                        const collaction = new LuckyNumber7(luckyNumbers[i]);
                        try {
                            await collaction.save();
                            isSuccess = true;
                        } catch (error) {
                            return res.status(400).send(error)
                        }
                    }
                    return res.status(200).json({success: isSuccess, "luckyNumber":luckyNumbers})
                });
            } else {
                //取得データを返却
                res.status(200).json({success: true, "luckyNumber":luckyNumber})
            }
        })
    } else if (req.query.type === "loto6") {
        //Dbから選択年度のloto情報がない場合は取得し、保存し当せん情報を返す。
        LuckyNumber6.find({"年月日" : req.query.year+"/"+req.query.month}).exec(async (err, luckyNumber) => {
            if (err) return res.status(400).send(err)
            if (luckyNumber.length == 0) {
                await util.luckyNumberCrawling(req.query.year, req.query.month, "loto6")
                .then(async luckyNumbers => {
                    let isSuccess = false

                    let loopLength = 0;
                    for (let j = 0; j < luckyNumbers.length; j++) {
                        if (luckyNumbers[j].本数字1 == "" && luckyNumbers[j].本数字2 == "" && luckyNumbers[j].本数字3 == "" ) {
                            return res.status(200).json({success: isSuccess})
                        }
                        loopLength++;
                    }

                    for (let i = 0; i < loopLength; i++) {
                        const collaction = new LuckyNumber6(luckyNumbers[i]);
                        try {
                            await collaction.save();
                            isSuccess = true;
                        } catch (error) {
                            return res.status(400).send(error)
                        }
                    }
                    return res.status(200).json({success: isSuccess, "luckyNumber":luckyNumbers})
                });
            } else {
                //取得データを返却
                res.status(200).json({success: true, "luckyNumber":luckyNumber})
            }
        })
    } else if (req.query.type === "miniloto") {
        //Dbから選択年度のloto情報がない場合は取得し、保存し当せん情報を返す。
        LuckyNumberMini.find({"年月日" : req.query.year+"/"+req.query.month}).exec(async (err, luckyNumber) => {
            if (err) return res.status(400).send(err)
            if (luckyNumber.length == 0) {
                await util.luckyNumberCrawling(req.query.year, req.query.month, "miniloto")
                .then(async luckyNumbers => {
                    let isSuccess = false

                    let loopLength = 0;
                    for (let j = 0; j < luckyNumbers.length; j++) {
                        if (luckyNumbers[j].本数字1 == "" && luckyNumbers[j].本数字2 == "" && luckyNumbers[j].本数字3 == "" ) {
                            return res.status(200).json({success: isSuccess})
                        }
                        loopLength++;
                    }

                    for (let i = 0; i < loopLength; i++) {
                        const collaction = new LuckyNumberMini(luckyNumbers[i]);
                        try {
                            await collaction.save();
                            isSuccess = true;
                        } catch (error) {
                            return res.status(400).send(error)
                        }
                    }
                    return res.status(200).json({success: isSuccess, "luckyNumber":luckyNumbers})
                });
            } else {
                //取得データを返却
                res.status(200).json({success: true, "luckyNumber":luckyNumber})
            }
        })
    }




    
});
// router.get("/getLuckyNumber", async (req, res) => {
//     //Dbから選択年度のloto情報がない場合は取得し、保存し当せん情報を返す。
//     LuckyNumber.find({"年月日" : req.query.year+"/"+req.query.month}).exec(async (err, luckyNumber) => {
//         if (err) return res.status(400).send(err)
//         if (luckyNumber.length == 0) {
//             await util.luckyNumberCrawling(req.query.year, req.query.month, "ロト7")
//             .then(async luckyNumbers => {
//                 let isSuccess = false
//                 for (let i = 0; i < luckyNumbers.length; i++) {
//                     const collaction = new LuckyNumber(luckyNumbers[i]);
//                     try {
//                         await collaction.save();
//                         isSuccess = true;
//                     } catch (error) {
//                         return res.status(400).send(error)
//                     }
//                 }
//                 return res.status(200).json({success: isSuccess, "luckyNumber":luckyNumbers})
//             });
//         } else {
//             //取得データを返却
//             res.status(200).json({success: true, "luckyNumber":luckyNumber})
//         }
//     })
// });


/**
 * 当せん情報の年月取得する
 * 
 */
// router.get("/getSelectDaysList", async (req, res) => {
//     LuckyNumber7.find().limit(20).select('年月日')
//             .distinct('年月日').exec(async (err, selectDays) => {
//                 if (err) return res.status(400).send(err)
//                 selectDays.sort(function (a, b) {
//                     return b.localeCompare(a);
//                 });
//                 return res.status(200).json({success: true, selectDays})
//             })
// });

module.exports = router;