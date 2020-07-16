import React from 'react'
import { Table } from 'react-bootstrap';

function LuckyNumberInfo(props) {

    return (
        <Table bordered size="sm" className='luckyNumberInfoTable'>
            <thead>
                <tr>
                    <th>区別</th>
                    <th colSpan="7">{props.区別}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>抽せん日</th>
                    <td colSpan="7">{props.抽せん日}</td>
                </tr>
                <tr>
                    <th>本数字</th>
                    <td>{props.本数字1}</td>
                    <td>{props.本数字2}</td>
                    <td>{props.本数字3}</td>
                    <td>{props.本数字4}</td>
                    <td>{props.本数字5}</td>
                    <td>{props.本数字6}</td>
                    <td>{props.本数字7}</td>
                </tr>
                <tr>
                    <th>ボーナス数字</th>
                    <td>{props.ボーナス数字1}</td>
                    <td>{props.ボーナス数字2}</td>
                    <td colSpan='5'></td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>1等</th>
                    <td colSpan="3">{props.等1口}</td>
                    <td colSpan="4">{props.等1金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>2等</th>
                    <td colSpan="3">{props.等2口}</td>
                    <td colSpan="4">{props.等2金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>3等</th>
                    <td colSpan="3">{props.等3口}</td>
                    <td colSpan="4">{props.等3金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>4等</th>
                    <td colSpan="3">{props.等4口}</td>
                    <td colSpan="4">{props.等4金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>5等</th>
                    <td colSpan="3">{props.等5口}</td>
                    <td colSpan="4">{props.等5金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>6等</th>
                    <td colSpan="3">{props.等6口}</td>
                    <td colSpan="4">{props.等6金額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>販売実績額</th>
                    <td colSpan="7">{props.販売実績額}</td>
                </tr>
                <tr className="luckyBonusRight">
                    <th>キャリーオーバー</th>
                    <td colSpan="7">{props.キャリーオーバー}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default LuckyNumberInfo
