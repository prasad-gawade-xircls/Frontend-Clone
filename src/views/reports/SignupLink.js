import React, { useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import Form from 'react-bootstrap/Form'
import { Copy } from 'react-feather'
import toast from 'react-hot-toast'

const SignupLink = () => {
    const [text, setText] = useState('')
    console.log(text)
    return (
        <>
            <Row>
                <Card>
                    <CardBody>
                        <h3 className='display-6 text-center mb-2'>Generate Sign-Up Link</h3>
                        <hr />
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <label>Link Type</label>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="product" name="radio" />
                                    <label>Product</label>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="general" name="radio" />
                                    <label>General</label>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="page" name="radio" />
                                    <label>Page</label>
                                </div>
                            </Col>

                        </Row>

                        <Row className='mt-4 d-flex align-items-center'>
                            <Col sm={4}>
                                <label>Referral Link</label>
                            </Col>
                            <Col sm={4}>
                                <select className="form-control" style={{padding: "1rem"}}>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </Col>
                            <Col sm={4}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                    >
                                        <Copy style={{ cursor: "pointer" }}
                                            size={25}
                                            onClick={() => {
                                                navigator.clipboard.writeText(text)
                                                toast('Copied')
                                            }} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row >
        </>
    )
}

export default SignupLink