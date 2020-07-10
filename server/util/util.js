const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;
const moment = require("moment")


//collactions
// const { LuckyNumber } = require('../models/LuckyNumber7');

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
 * 当せん情報取得 loto7
 * @param {string} year : 当せん情報取得する年度
 * @param {string} month : 当せん情報取得する月
 * @param {string} type : loto種別(loto7、loto6、miniloto等)
 */
module.exports.luckyNumberCrawling = async (year, month, type) => {

  const capabilities = webdriver.Capabilities.chrome();
  capabilities.set('chromeOptions', {
      args: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          `--window-size=1980,2000`
          // other chrome options
      ]
  });
  
  //ブラウザ立ち上げ
  const driver = await new Builder().withCapabilities(capabilities).build();
  
  let getUrl = null;
  
  if (type === "loto7") {
    getUrl = 'https://www.mizuhobank.co.jp/retail/takarakuji/loto/loto7/index.html?year={0}&month={1}';
  } else if (type === "loto6") {
    getUrl = 'https://www.mizuhobank.co.jp/retail/takarakuji/loto/loto6/index.html?year={0}&month={1}';
  } else if (type === "miniloto") {
    getUrl = 'https://www.mizuhobank.co.jp/retail/takarakuji/loto/miniloto/index.html?year={0}&month={1}';
  }
  const endUrl = this.strReplace(getUrl, [year,month])
  
  //ページに移動
  await driver.get(endUrl);

  //ロト情報画面待ち
  await driver.wait(until.elementLocated(By.className('typeTK')), 4000);

  //executeScriptのTimeOutsを設定
  await driver.manage().setTimeouts({script: null});
  
  //취득fn을 실행
  let luckyNumberList = null;

  if(type === "loto7") {
    luckyNumberList = await driver.executeScript(lotto7Fn,year,month)
  } else if(type === "loto6") {
    luckyNumberList = await driver.executeScript(lotto6Fn,year,month)
  } else if(type === "miniloto") {
    luckyNumberList = await driver.executeScript(minilotoFn,year,month)
  }

  // ブラウザ終了
  driver.quit();

  return luckyNumberList
}


//ロト7
let lotto7Fn = (year, month) => {
    
  const luckyNumberLength = document.getElementsByClassName("typeTK").length;

  let lottoInfoList = [];
  for (let i = 0; i < luckyNumberLength; i++) {
    lottoInfoList[i] = {
      "年月日" : year+"/"+(('0' + month).slice(-2))
      ,"区別" : document.getElementsByClassName("typeTK")[i].children[0].children[0].children[1].innerText
      ,"抽せん日" : document.getElementsByClassName("typeTK")[i].children[1].children[0].children[1].innerText
      ,"本数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[1].innerText
      ,"本数字2" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[2].innerText
      ,"本数字3" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[3].innerText
      ,"本数字4" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[4].innerText
      ,"本数字5" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[5].innerText
      ,"本数字6" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[6].innerText
      ,"本数字7" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[7].innerText
      ,"ボーナス数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[2].children[1].innerText
      ,"ボーナス数字2" : document.getElementsByClassName("typeTK")[i].children[1].children[2].children[2].innerText
      ,"等1口" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[1].innerText
      ,"等1金額" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[2].innerText
      ,"等2口" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[1].innerText
      ,"等2金額" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[2].innerText
      ,"等3口" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[1].innerText
      ,"等3金額" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[2].innerText
      ,"等4口" : document.getElementsByClassName("typeTK")[i].children[1].children[6].children[1].innerText
      ,"等4金額" : document.getElementsByClassName("typeTK")[i].children[1].children[6].children[2].innerText
      ,"等5口" : document.getElementsByClassName("typeTK")[i].children[1].children[7].children[1].innerText
      ,"等5金額" : document.getElementsByClassName("typeTK")[i].children[1].children[7].children[2].innerText
      ,"等6口" : document.getElementsByClassName("typeTK")[i].children[1].children[8].children[1].innerText
      ,"等6金額" : document.getElementsByClassName("typeTK")[i].children[1].children[8].children[2].innerText
      ,"販売実績額" : document.getElementsByClassName("typeTK")[i].children[1].children[9].children[1].innerText
      ,"キャリーオーバー" : document.getElementsByClassName("typeTK")[i].children[1].children[10].children[1].innerText
    }
  }
  return lottoInfoList;
}

//ロト6
let lotto6Fn = (year, month) => {
  console.log("ロト6")
    
  const luckyNumberLength = document.getElementsByClassName("typeTK").length;

  let lottoInfoList = [];
  for (let i = 0; i < luckyNumberLength; i++) {
    lottoInfoList[i] = {
      "年月日" : year+"/"+(('0' + month).slice(-2))
      ,"区別" : document.getElementsByClassName("typeTK")[i].children[0].children[0].children[1].innerText
      ,"抽せん日" : document.getElementsByClassName("typeTK")[i].children[1].children[0].children[1].innerText
      ,"本数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[1].innerText
      ,"本数字2" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[2].innerText
      ,"本数字3" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[3].innerText
      ,"本数字4" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[4].innerText
      ,"本数字5" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[5].innerText
      ,"本数字6" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[6].innerText
      ,"ボーナス数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[2].children[1].innerText
      ,"等1口" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[1].innerText
      ,"等1金額" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[2].innerText
      ,"等2口" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[1].innerText
      ,"等2金額" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[2].innerText
      ,"等3口" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[1].innerText
      ,"等3金額" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[2].innerText
      ,"等4口" : document.getElementsByClassName("typeTK")[i].children[1].children[6].children[1].innerText
      ,"等4金額" : document.getElementsByClassName("typeTK")[i].children[1].children[6].children[2].innerText
      ,"等5口" : document.getElementsByClassName("typeTK")[i].children[1].children[7].children[1].innerText
      ,"等5金額" : document.getElementsByClassName("typeTK")[i].children[1].children[7].children[2].innerText
      ,"販売実績額" : document.getElementsByClassName("typeTK")[i].children[1].children[8].children[1].innerText
      ,"キャリーオーバー" : document.getElementsByClassName("typeTK")[i].children[1].children[9].children[1].innerText
    }
  }
  return lottoInfoList;
}

//ミニロト
let minilotoFn = (year, month) => {
  console.log("ミニロト")
    
  const luckyNumberLength = document.getElementsByClassName("typeTK").length;

  let lottoInfoList = [];
  for (let i = 0; i < luckyNumberLength; i++) {
    lottoInfoList[i] = {
      "年月日" : year+"/"+(('0' + month).slice(-2))
      ,"区別" : document.getElementsByClassName("typeTK")[i].children[0].children[0].children[1].innerText
      ,"抽せん日" : document.getElementsByClassName("typeTK")[i].children[1].children[0].children[1].innerText
      ,"本数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[1].innerText
      ,"本数字2" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[2].innerText
      ,"本数字3" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[3].innerText
      ,"本数字4" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[4].innerText
      ,"本数字5" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[5].innerText
      ,"ボーナス数字1" : document.getElementsByClassName("typeTK")[i].children[1].children[1].children[6].innerText
      ,"等1口" : document.getElementsByClassName("typeTK")[i].children[1].children[2].children[1].innerText
      ,"等1金額" : document.getElementsByClassName("typeTK")[i].children[1].children[2].children[2].innerText
      ,"等2口" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[1].innerText
      ,"等2金額" : document.getElementsByClassName("typeTK")[i].children[1].children[3].children[2].innerText
      ,"等3口" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[1].innerText
      ,"等3金額" : document.getElementsByClassName("typeTK")[i].children[1].children[4].children[2].innerText
      ,"等4口" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[1].innerText
      ,"等4金額" : document.getElementsByClassName("typeTK")[i].children[1].children[5].children[2].innerText
      ,"販売実績額" : document.getElementsByClassName("typeTK")[i].children[1].children[6].children[1].innerText
    }
  }
  return lottoInfoList;
}