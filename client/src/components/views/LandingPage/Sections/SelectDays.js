import React from 'react'
import { Form } from 'react-bootstrap';
const axios = require("axios");

function SelectDays(props) {

    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                <Form.Label>当せん情報の年月を選択してください。</Form.Label>
                
                <Form.Control as="select" htmlSize={3} custom>
                    {props.selectList && props.selectList.map((select, index) => (
                        <React.Fragment key={index}>
                            {/* TODO: 1か月前の日付をdefaultとして選択する */}
                            <option selected={index == 1}>{select}</option>
                        </React.Fragment>
                    ))}

                </Form.Control>
            </Form.Group>
        </Form>
    )
}

export default SelectDays
