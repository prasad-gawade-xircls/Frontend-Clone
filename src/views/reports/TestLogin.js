import React, { useState } from "react"
import { Container, Row, Form } from 'reactstrap'
// import { postReq } from "../../assets/auth/jwtService"
// import { setToken } from "../../assets/auth/auth"
import toast from "react-hot-toast"
import { validateEmail } from "../Validator"

const TestLogin = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [showError, setShowError] = useState(false)

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    console.log(data)

    const loginButtonHandler = () => {
        if (data.email === "" || data.password === "") {
            setShowError(true)
        } else  {
            const emailCheck = validateEmail(data.email)

            if (!emailCheck) {
                toast.error("Invaild email ID")
            }
        }
        toast('Sign Up Sucesfull')
    }

    console.log(data)

    return (
        <>
            <div className="xircls_front_base products">
                <Container className='login py-6 d-flex justify-content-center'>
                    <Row className="w-100">
                        <div className='mx-auto' style={{ width: `666px`, maxWidth: `95%` }}>
                            <div className="front_border" style={{padding : "2rem"}}>
                                
                                <Form style={{border: "1px solid #c9c9cb", padding: "3rem"}}> 
                                    <h3 className="third-font text-center font-three mb-2">Login to your Account</h3>
                                    <hr />
                                    <div className="username mb-3 mt-2">
                                        <label htmlFor="username" className='mb-1 fs-4'>USERNAME:</label>
                                        <input id='username' name="username" type='text' placeholder='Email address' value={data.username} className="form-control rounded-0" onInput={(e) => inputChangeHandler(e)} />
                                        {showError && data.email === "" ? (
                                        <p
                                            className="text-danger m-0 p-0"
                                            style={{ fontSize: "0.9rem" }}
                                            >
                                            * Enter your email address
                                            </p>
                                        ) : ""}
                                    </div>
                                    <div className="password my-3">
                                        <label htmlFor="password" className='mb-1 fs-4'>PASSWORD:</label>
                                        <input id='password' name="password" type='password' placeholder='Password' className="form-control rounded-0" onInput={(e) => inputChangeHandler(e)} />
                                        {showError && data.password === "" ? (
                                            <p
                                            className="text-danger m-0 p-0 mb-3"
                                            style={{ fontSize: "0.9rem" }}
                                            >
                                            * Enter your password
                                            </p>
                                        ) : ""}
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <div id='login-btn' className="btn-dark btn rounded-1">
                                            <a onClick={() => loginButtonHandler()} className='text-light' >LOGIN</a>
                                        </div>
                                        <a href="#" id='f-password' className='mx-2'>Forgot password?</a>
                                    </div>
                                </Form>
                                
                            </div>
                        </div>
                    </Row>
                </Container >
            </div>

        </>
    )
}

export default TestLogin