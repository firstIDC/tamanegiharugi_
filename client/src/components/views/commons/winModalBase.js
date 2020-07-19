import React from 'react'
import { Modal } from 'react-bootstrap';
import './css/winModalBase.css'
function winModalBase(props) {

  console.log(props.checkAddress)

  const checkUrl = `/luckyNumberInfo/${props.checkAddress[0].substring(0, 4)}/${props.checkAddress[1].substring(5, 7)}/${props.checkAddress[2]}`;
  
  console.log(checkUrl)
  let money;
  for (let i = 0; i < props.winMoney.length; i++) {
    if (props.winMoney[i].rank === props.winNumParam) {
      money = props.winMoney[i].money
      break;
    }
  }

  return (
    <>
     <Modal show={props.showParam} onHide={props.handleCloseFn}>
            <Modal.Header className={(props.winNumParam === 1 ? 'win1st' : props.winNumParam === 2 ? 'win2st' : 'win3st')} closeButton></Modal.Header>
            <Modal.Body>
              <h4>あなたの当選金額は{money}です。</h4>
              <a href={checkUrl}>当せん情報確認</a>
              </Modal.Body>
      </Modal>
    </>
  )
}

export default winModalBase
