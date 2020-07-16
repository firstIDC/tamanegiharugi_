import React from 'react'
import { Form } from 'react-bootstrap';
import './css/yearMonthBase.css'
function yearMonthBase(props) {
    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>当せん情報の年月を選択してください。</Form.Label>
                <Form.Control id="selectedDay" as="select" htmlSize={3} custom onChange={props.selectDayFn}>
                    {props.YearMonthList && props.YearMonthList.map((select, index) => (
                        <React.Fragment key={index}>
                            <option>{select}</option>
                        </React.Fragment>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>
        </>
    )
}

export default yearMonthBase
