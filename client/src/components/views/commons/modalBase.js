import React from 'react'
import { Modal } from 'react-bootstrap';
import './css/modalBase.css'
function modalBase(props) {

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
            <Modal.Body>あなたの当選金額は{money}です。</Modal.Body>
      </Modal> 
    </>
  )
}

export default modalBase
