const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const luckyNumberSchema = mongoose.Schema({
    年月日: {type: String}
    ,区別: {type: String}
    ,抽せん日 :{type: String}
    ,本数字1:{type: String}
    ,本数字2:{type: String}
    ,本数字3:{type: String}
    ,本数字4:{type: String}
    ,本数字5:{type: String}
    ,本数字6:{type: String}
    ,ボーナス数字1:{type: String}
    ,等1口:{type: String}
    ,等1金額:{type: String}
    ,等2口:{type: String}
    ,等2金額:{type: String}
    ,等3口:{type: String}
    ,等3金額:{type: String}
    ,等4口:{type: String}
    ,等4金額:{type: String}
    ,等5口:{type: String}
    ,等5金額:{type: String}
    ,販売実績額:{type: String}
    ,キャリーオーバー:{type: String}
}, { timestamps: true })

const LuckyNumber6 = mongoose.model('LuckyNumber6', luckyNumberSchema);

module.exports = { LuckyNumber6 }