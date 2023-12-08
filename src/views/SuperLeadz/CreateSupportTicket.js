import React, { useContext, useEffect, useState } from 'react'
import { getCurrentOutlet, validForm } from '../Validator'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { baseURL, getReq, postReq } from '../../assets/auth/jwtService'
import { PermissionProvider } from '../../Helper/Context'
import Select from 'react-select'
import { selectPhoneList } from '../../Helper/data'
import { Paperclip, Trash } from 'react-feather'
import FrontBaseLoader from '../Components/Loader/Loader'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CreateSupportTicket = () => {
    const outletData = getCurrentOutlet()
    const {userPermission} = useContext(PermissionProvider)
    const [apiLoader, setApiLoader] = useState(false)
    const defaultData = {
        firstname: '',
        email: '',
        phone: '',
        phonecode: "",
        department: '',
        mainreason: '',
        subject: '',
        message: '',
        priority: '',
        invoicesbooking: '',
        infiniti_extras: '',
        reason: '',
        shopify_url: outletData[0]?.web_url,
        apps: userPermission?.appName,
        product: userPermission?.appName,
        issue: "",
        subIssue: "",
        image: ""
    }

    const valueToCheck = [
        {
            name: 'firstname',
            message: 'Enter your name',
            type: 'string',
            id: 'firstname'
        },
        {
            name: 'email',
            message: 'Enter your email',
            type: 'string',
            id: 'email'
        },
        {
            name: 'product',
            message: 'Select product',
            type: 'string',
            id: 'product'
        },
        {
            name: 'issue',
            message: 'Select issue',
            type: 'string',
            id: 'issue'
        },
        {
            name: 'subIssue',
            message: 'Select sub issue',
            type: 'string',
            id: 'subIssue'
        },
        {
            name: 'priority',
            message: 'Please select priority',
            type: 'string',
            id: 'priority'
        },
        {
            name: 'subject',
            message: 'Enter your subject',
            type: 'string',
            id: 'subject'
        },
        {
            name: 'message',
            message: 'Enter your message',
            type: 'string',
            id: 'message'
        }
    ]

    const [supportData, setSupportData] = useState(defaultData)
    const [imageObject, setImageObject] = useState({})
    const [issuesList, setIssuesList] = useState([])
    const [product, setProduct] = useState([])
    const [subIssues, setSubIssues] = useState([])

    console.log(product, imageObject)
    const updateData = (e) => {
        setSupportData({ ...supportData, [e.target.name]: e.target.value })
    }

    const imageActions = (e) => {
        // const checkVaildImage = imageValidation(e)
        setSupportData({...supportData, image: URL.createObjectURL(e.target.files[0])})
        // setImageUrl()
        setImageObject(e.target.files[0])
        
    }

    const navigate = useNavigate()

    // const getProductList = () => {
    //     axios.get(`${baseURL}/support-system/product-list/`)
    //     .then((resp) => {
    //         console.log(resp)
    //         setProduct(resp.data.data.map((curElem) => {
    //             return {value: curElem.name.toLowerCase(), label: `${curElem.name}`}
    //         }))
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    const getData = () => {
        getReq('getAllApps')
        .then((res) => {
          console.log(res)
          setProduct(res?.data.map((curElem) => {
            // if (userPermission?.installedApps.includes(curElem.name.toLowerCase())) {
                return {value: curElem.name.toLowerCase(), label: `${curElem.name}`}
            // }
          }))
        })
        .catch((error) => {
          console.log(error)
        })
        
        getReq('getUserData')
        .then((resp) => {
            console.log(resp, "pre")
            const updatedData = {
                email: resp?.data?.data?.email,
                firstname: resp?.data?.data?.name
            }
            setSupportData((preData) => ({
                ...preData,
                ...updatedData
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getIssues = () => {
        const form_data = new FormData()
        // supportData.product?.forEach((cur) => {
            form_data.append('product_name', supportData.product)
        // })
        axios.post(`${baseURL}/support-system/product-issues-list/`, form_data)
        .then((resp) => {
            console.log(resp)
            setIssuesList(resp.data.data.map((curElem) => {
                return {value: curElem.id, label: `${curElem.issue}`}
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getSubIssue = () => {
        const form_data = new FormData()
        // supportData.product?.forEach((cur) => {
        form_data.append('issue_id', supportData.issue)
        // })
        axios.post(`${baseURL}/support-system/product-issues-list/`, form_data)
        .then((resp) => {
            console.log(resp)
            setSubIssues(resp?.data?.data?.map((curElem) => {
                return {value: curElem.id, label: `${curElem.issue}`}
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (supportData.product !== "") {
            getIssues()
        }
    }, [supportData.product])

    useEffect(() => {
        if (supportData.issue !== "") {
            getSubIssue()
        }
    }, [supportData.issue])

    const handleChange = (options, actionMeta, check) => {
        if (check) { 
            const option_list = options.map((cur) => {
                return cur.value
            })
            setSupportData({...supportData, [actionMeta.name]: option_list })
        } else {
            setSupportData({...supportData, [actionMeta.name]: options.value })
        }
    
    }

    const createTicket = () => {

        const checkForm = validForm(valueToCheck, supportData)

        if (checkForm) {
            setApiLoader(true)
            const newForm = document.getElementById("support-form")
    
            const form_data = new FormData(newForm)
            
            Object.entries(supportData).map(([key, value]) => {
                form_data.append(key, value)
            })
            form_data.append('attachment', imageObject)
            form_data.append("shop", outletData[0]?.web_url)
            form_data.append("app", userPermission?.appName)
            // form_data.append("raised_for_type", "Merchant")
    
            console.log(form_data)
    
            postReq("createSupportTicket", form_data)
            .then((resp) => {
                console.log(resp)
                toast.success("Support ticket created successfully")
                navigate("/merchant/support/")
                setApiLoader(false)
            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
                setApiLoader(false)
            })

        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <style>
                {`
                    .css-18kf399-control {
                        font-size: inherit !important;
                    }
                `}
            </style>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            {/* <Card>
                <CardBody>
                    <h4 className='mb-0'> Create Support Ticket</h4>
                </CardBody>
            </Card> */}

            <Card>
                <CardBody>
                    <Row>
                        {/* <Col md="10" className='offset-md-1'> */}
                        <Col md="12">
                            <form action="" className="container" id='support-form'>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <label htmlFor="first_name">Name</label>
                                        <input type="text" id='first_name' name='firstname' className='form-control' value={supportData.firstname} onChange={(e) => updateData(e)} 
                                        placeholder='Enter Your Name'/>
                                        <p id="firstname_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>
                                    <div className="col-6 mb-2">
                                        <label htmlFor="name">Email</label>
                                        <input type="email" id='name' name='email' className='form-control' value={supportData.email} onChange={(e) => updateData(e)} readOnly placeholder='Enter Your Email'/>
                                        <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                    
                                    </div>
                                    <div className="col-6 mb-2 d-none">
                                        <div className="row">
                                            <label htmlFor="phone">Mobile</label>
                                            <div className="col-md-3 mb-md-0">
                                                <Select
                                                    isMulti = {false}
                                                    options={selectPhoneList}
                                                    inputId="aria-example-input"
                                                    closeMenuOnSelect={true}
                                                    name="phonecode"
                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                    value={supportData?.phonecode ? selectPhoneList.filter(option => supportData?.phonecode.includes(option.value)) : ""}
                                                    styles={{
                                                        control: (baseStyles) => ({
                                                            ...baseStyles,
                                                            fontSize: '12px',
                                                            margin: 0,
                                                            height: '100%'
                                                        })
                                                    }}
                                                />

                                            </div>
                                            <div className="col-md-9 mb-md-0">
                                                <div className="w-100">
                                                    <input
                                                        type="number"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        value={supportData.phone}
                                                        onChange={updateData}
                                                        placeholder="Enter Your Phone Number"
                                                    />
                                                </div>
                                            </div>
                                            <p id="phone_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                    </div>

                                    <Col md="3" className='mb-1'>
                                        <div className="form-group">
                                            <label htmlFor="">Product:</label>
                                            <Select
                                                isMulti = {false}
                                                options={product.filter((curElem) => userPermission?.installedApps.includes(curElem.value))}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="product"
                                                noOptionsMessage={() => "Please select a product"}
                                                placeholder="Select Product"
                                                value={product?.filter(option => supportData.product === option.value)}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                            <p id="product_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        </div>
                                    </Col>
                                    <Col md="3" className='mb-1'>
                                        <div className="form-group">
                                            <label htmlFor="">Issues:</label>
                                            <Select
                                                isMulti = {false}
                                                options={issuesList}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="issue"
                                                noOptionsMessage={() => "Issues"}
                                                placeholder="Issues"
                                                value={issuesList?.filter(option => supportData.issue === option.value)}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                            <p id="issue_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                    </Col>

                                    <Col md="3" className='mb-1'>
                                        <div className="form-group">
                                            <label htmlFor="">Sub Issues:</label>
                                            <Select
                                                isMulti = {false}
                                                options={subIssues}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="subIssue"
                                                noOptionsMessage={() => "Sub Issues"}
                                                placeholder="Sub Issues"
                                                value={subIssues?.filter(option => supportData.subIssue === option.value)}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                            <p id="subIssue_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                    </Col>

                                    <div className="col-3 mb-2">
                                        <label htmlFor="priority">Priority</label>
                                        <select id='priority' name='priority' className='form-control' value={supportData.priority} onChange={(e) => updateData(e)} >
                                            <option value="Low" selected>Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <p id="priority_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>
                                    
                                    <div className="col-12 mb-2">
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" id='subject' name='subject' className='form-control' value={supportData.subject} onChange={(e) => updateData(e)} 
                                        placeholder='Enter Subject Here'/>
                                        <p id="subject_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>

                                    <div className="col-12 mb-2">
                                        <label htmlFor="message">Message</label>
                                        <textarea id='message' name='message' className='form-control' value={supportData.message} onChange={(e) => updateData(e)} 
                                        placeholder='Enter Message Here'/>
                                        <p id="message_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>

                                    <div className="col-6 mb-2">
                                        <label htmlFor="attachment">Attachment</label>
                                        {/* <div className="d-flex justify-content-start-align-items-center gap-2">
                                            <div className="left" style={{flexGrow: '1'}}>
                                                <input type="file" id='attachment' name='attachment' className='form-control' onChange={(e) => setImageObject(e.target.files[0])} />
                                            </div>
                                            <div className="right d-flex justify-content-center align-items-center">
                                                <a onClick={() => setImageObject({})}>
                                                    <Trash size={'20px'} color='#ea5455' />
                                                </a>
                                                
                                            </div>
                                        </div> */}
                                        <div className="d-flex gap-2 mb-2 align-items-center">
                                            <div className="w-75">
                                                <div className="main-wrapper d-flex justify-content-between align-items-center">
                                                    <div className="image-view">
                                                        <img className='image_viewer' width="200px" height="100px" src={supportData?.image} alt=" " />
                                                    </div>
                                                    <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                                        <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="offer_image" accept='image/jpeg, image/png, image/gif' id="offer_image" onChange={(e) => imageActions(e)} />
                                                        <label htmlFor="offer_image" className='btn btn-success text-white'>
                                                            <Paperclip size={17} />
                                                        </label>
                                                        <label className='btn btn-danger' onClick={() => {
                                                            setImageObject({})
                                                            setSupportData({...supportData, image: ""})
                                                        }}>
                                                            <Trash size={17} />
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p id="attachment_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>
                                    
                                </div>
                            </form>
                            <div className='action-btn mt-3 d-flex justify-content-end'>
                                <a className="btn btn-primary" onClick={() => createTicket()}>Create</a>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default CreateSupportTicket