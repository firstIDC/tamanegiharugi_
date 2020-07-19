import React from 'react'
import { Form, Button } from 'react-bootstrap';
import './css/groupBase.css'
function groupBase(props) {
    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>当せん情報の区別を選択してください。</Form.Label>
                <Form.Control id="selectedGroup" as="select" htmlSize={3} custom onChange={props.selectGroupFn}>
                    <option disabled selected>選択してください。</option>
                    {props.groupList && props.groupList.map((select, index) => (
                        <React.Fragment key={index}>
                            <option>{select}</option>
                        </React.Fragment>
                    ))}
                </Form.Control>
            </Form.Group>
            <br />
            <Button variant="danger" size="lg" block onClick={props.pageRefresh}>最初に戻る</Button>
        </Form>
        </>
    )
}

export default groupBase
