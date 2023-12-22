import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap'
import toast from 'react-hot-toast'
import ComTable from '../Components/DataTable/ComTable'
import JsonToJsx from '../Components/SuperLeadz/JsonToJsx'
import moment from 'moment/moment'
import { ThemesProvider } from '../../Helper/Context'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
// import { getCurrentOutlet } from '../Validator'
import Spinner from '../Components/DataTable/Spinner'
import { Copy, Edit, Edit2, Edit3, Eye, Layout, MoreVertical, Plus, Trash, X } from 'react-feather'
import { getCurrentOutlet } from '../Validator'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// import pixels from "../../assets/images/superLeadz/pixels.png"
import Flatpickr from 'react-flatpickr'
import CampaignWiseData from '../Components/SuperLeadz/CampaignWiseData'

const AllCampaigns = ({ custom = false, viewAll, name = "All Campaigns" }) => {

    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const outletData = getCurrentOutlet()

    const navigate = useNavigate()

    const [allCampaigns, setAllCampaigns] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { setSelectedThemeNo, setEditTheme } = useContext(ThemesProvider)

    const [activeThemes, setActiveThemes] = useState([])
    const [conflictThemes, setConflictThemes] = useState([])
    const [conflictModal, setConflictModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currDetails, setCurrDetails] = useState({})
    const [checkedThemes, setCheckedThemes] = useState([])
    const [deleteMode, setDeleteMode] = useState("single")


    const [modal1, setModal1] = useState(false)

    const [dateModal, setDateModal] = useState(false)

    // const [prevModal, setPrevModal] = useState(false)

    const [dateRow, setDateRow] = useState({})
    console.log(setDateRow)

    const [dates, setDates] = useState({
        start_date: "",
        end_date: ""
    })

    const toggleDateModal = () => setDateModal(!dateModal)

    const getAllThemes = () => {
        const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/show_all_form_builder_theme/?shop=${outletData[0]?.web_url}&app=superleadz`)
        axios({
            method: "GET",
            url: getUrl
        }).then((data) => {
            const newArr = []
            setAllCampaigns([...data?.data?.success])
            setIsLoading(false)
            data.data.is_active.forEach(ele => {
                newArr.push(Number(ele))
            })
            setActiveThemes([...newArr])
        }).catch((err) => {
            console.log(err)
            toast.error("Data could not be loaded")
            setIsLoading(false)
        })
    }

    const deleteThemes = () => {
        const obj = {
            theme_id: deleteMode === "single" ? [currDetails.id] : [...checkedThemes]
        }
        console.log(obj, "obj")
        const form_data = new FormData()
        Object.entries(obj).map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => {
                    form_data.append(key, ele)
                })
            } else (
                form_data.append(key, value)
            )
        })

        axios(`${SuperLeadzBaseURL}/api/v1/delete/theme/`, {
            method: "POST",
            data: form_data
        })
            .then((data) => {
                console.log({ data })
                toast.success(data.data.message)
                getAllThemes()
            })
            .catch((error) => {
                alert("Error while deleting theme", error)
            })

    }

    const overlapConfirmation = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")
        form_data.append('theme_id', currDetails.id)
        form_data.append('campaign_name', currDetails.campaign_name || "")
        conflictThemes.map(ele => {
            form_data.append('overlap_theme_id', Number(ele.theme))
        })
        axios(`${SuperLeadzBaseURL}/api/v1/get/change-theme-status-overlap/`, {
            method: 'POST',
            data: form_data
        })
            .then(() => {
                // const newArray = resData.active.filter(item => conflictThemes.some(ele => `${ele.theme}` !== `${item}`))
                // setResData({ ...resData, active: [...data.active_response] })
                getAllThemes()
                setConflictModal(false)
            })
    }

    const sendConfirmation = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")
        form_data.append('theme_id', currDetails.id)
        form_data.append('campaign_name', currDetails.campaign_name)
        form_data.append('is_active', !activeThemes.includes(currDetails.id) ? 1 : 0)
        axios(`${SuperLeadzBaseURL}/api/v1/get/change-theme-status/`, {
            method: 'POST',
            data: form_data
        })
            .then(() => {
                getAllThemes()
            })
            .catch(err => {
                alert(err)
            })
    }

    const sendDuplicate = (ele) => {
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', 'superleadz')
        form_data.append('theme_id', ele.id)

        axios({
            method: "POST", url: `${SuperLeadzBaseURL}/api/v1/duplicate_form_builder/`, data: form_data
        }).then((data) => {
            console.log(data)
            if (data?.data?.success === "done") {
                getAllThemes()
                toast.success("Successfully created a duplicate!")
            } else {
                toast.error("Could not duplicate your theme")
            }
        }).catch((error) => {
            console.log({ error })
        })
    }

    const handleFilter = e => {
        const { value } = e.target
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = allCampaigns.filter(item => {
                const startsWith =
                    item?.campaign_name?.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item?.campaign_name?.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>{name}</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            <div className="d-flex gap-2 align-items-center">
                <Link to={"/merchant/SuperLeadz/themes/"} className='btn btn-primary-main' style={{ width: "240px" }}> Create Campaign</Link>
                <input type="text" className="form-control w-75" value={searchValue} onChange={handleFilter} placeholder='Search...' />
            </div>
        </Col>
    </>

    const columns = [
        // {
        //     name: <div className="p-0 m-0 form-check form-check-success">
        //         <input type="checkbox" className="form-check-input m-0" onChange={(e) => {
        //             if (e.target.checked) {
        //                 const allId = allCampaigns.map((curElem) => {
        //                     return curElem.id
        //                 })

        //                 setCheckedThemes(allId)
        //             } else {
        //                 setCheckedThemes([])
        //             }
        //         }} />
        //     </div>,
        //     cell: (row) => <div className="p-0 m-0 form-check form-check-success"><input checked={checkedThemes.includes(row.id)} onChange={e => {
        //         if (e.target.checked) {
        //             setCheckedThemes([...checkedThemes, row.id])
        //         } else {
        //             setCheckedThemes([...checkedThemes].filter(item => item !== row.id))
        //         }
        //     }} type="checkbox" className="form-check-input m-0" /></div>,
        //     width: "60px"
        // },
        {
            name: 'Campaign',
            selector: row => {
                return (
                    <div className='d-flex justify-content-start align-items-center gap-1 py-1'>
                        <div style={{ backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, backgroundSize: "100%" }}>
                            <div onClick={() => {
                                setSelectedThemeNo(row.default_id)
                                setEditTheme(row)
                                localStorage.setItem("is_draft", row.is_draft)
                                navigate(`/merchant/SuperLeadz/overview/${row.id}/`)
                            }} className="prev d-flex justify-content-center align-items-center rounded position-relative overflow-hidden cursor-pointer" style={{ width: "120px", height: "67.5px", backgroundColor: JSON.parse(row.custom_theme).overlayStyles.backgroundColor, backgroundImage: JSON.parse(row.custom_theme).overlayStyles.backgroundImage }}>
                                <span className="position-absolute">
                                    <JsonToJsx isMobile={false} renderObj={JSON.parse(row.custom_theme)} scale={0.1125} index={0} />
                                </span>
                            </div>
                        </div>
                        <div onClick={() => {
                            setSelectedThemeNo(row.default_id)
                            setEditTheme(row)
                            navigate(`/merchant/SuperLeadz/overview/${row.id}/`)
                        }} className='fw-bolder text-primary cursor-pointer'>{row.campaign_name}</div>
                    </div>
                )
            }
        },
        {
            name: 'Status',
            selector: row => {
                if (row.is_draft === 0) {
                    return (
                        <div className="m-auto form-check form-switch form-check-success cursor-pointer p-0 m-0" style={{ filter: `drop-shadow(0px 0px 7.5px rgba(40, 199, 111, ${row.is_active ? "0.5" : "0"}))` }}>
                            <input onChange={() => {
                                setCurrDetails(row)
                                const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/get/active-template/`)
                                const form_data = new FormData()
                                form_data.append("shop", outletData[0]?.web_url)
                                form_data.append("app", "superleadz")
                                form_data.append('theme_id', row.id)
                                form_data.append('campaign_name', row.campaign_name)
                                axios({
                                    method: "POST",
                                    url: getUrl,
                                    data: form_data
                                }).then((data) => {
                                    // data.data.response.forEach(row => {
                                    //     newArr.push(row.
                                    // })
                                    if ((data.data.response.length === 0) || (data.data.response.length > 0 && activeThemes.includes(row.id))) {
                                        setModal1(true)
                                    } else {
                                        setConflictThemes([...data.data.response])
                                        setConflictModal(true)
                                    }
                                }).catch((err) => {
                                    console.log({ err })
                                })
                            }} type='checkbox' checked={activeThemes.includes(row.id)} className='form-check-input cursor-pointer m-0' />
                        </div>
                    )
                } else {
                    return (
                        <div className='text-warning m-auto'>Draft</div>
                    )
                }
            }
            // new Date(row.created_at).toUTCString().replace("GMT", "")
        },
        {
            name: 'Start Date',
            selector: row => <span className='cursor-pointer' onClick={() => {
                toggleDateModal()
                setDateRow(row)
                setDates({ ...dates, start_date: row.start_date || "", end_date: row.end_date || "" })
            }}>{moment(row.start_date).format("DD-MM-YYYY")}</span>,
            dataType: 'offer_code'
        },
        {
            name: 'End Date',
            selector: row => <span className='cursor-pointer' onClick={() => {
                toggleDateModal()
                setDateRow(row)
                setDates({ ...dates, start_date: row.start_date || "", end_date: row.end_date || "" })
            }}>{row.end_date ? moment(row.end_date).format("DD-MM-YYYY") : "perpetual"}</span>
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex justify-content-center align-items-center gap-2">

                    {/* <button className="btn btn-info" onClick={e => {
                    e.preventDefault()
                    const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=${outletData[0]?.web_url}&app=superleadz&theme_id=${row.id}`)
                    axios({
                        method: "GET",
                        url
                    })
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }}>Check</button> */}
                    <UncontrolledButtonDropdown className='more-options-dropdown'>
                        <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
                            <span className={`border-none`}>
                                <MoreVertical size={15} />
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className='border dropdown-menu-custom'>
                            {!activeThemes.includes(row.id) && <DropdownItem onClick={() => {
                                setDeleteMode("single")
                                setCurrDetails(row)
                                setDeleteModal(!deleteModal)
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Trash stroke='#ea5455' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                </div>
                            </DropdownItem>}
                            <DropdownItem onClick={() => {
                                sendDuplicate(row)
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Copy stroke='#28c76f' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Duplicate</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                setSelectedThemeNo(row.default_id)
                                setEditTheme(row)
                                localStorage.setItem("is_draft", row.is_draft)
                                navigate(`/merchant/SuperLeadz/new_customization/${row.id}`, { state: row })
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Edit2 stroke='#ff9f43' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Edit</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                navigate(`/merchant/SuperLeadz/preview/${row.id}/`, { state: row })
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Layout stroke='#ff9f43' size={"15px"} className='cursor-pointer' />
                                    <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Preview</span>
                                </div>
                            </DropdownItem>

                            {/* <DropdownItem onClick={() => {
                                setDateRow(row)
                                setPrevModal(!prevModal)
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Eye stroke='#006aff' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Preview</span>
                                </div>
                            </DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            ),
            width: "100px"
        }
    ]

    useEffect(() => {
        getAllThemes()
    }, [])

    const ExpandedData = (data) => {
        console.log(data)
        return <CampaignWiseData campaignData={data.data} />

    }

    const deleteContent = <button onClick={() => {
        setDeleteMode("multiple")
        setDeleteModal(!deleteModal)
    }} className="btn btn-danger d-block">Deleting {checkedThemes.length} items</button>

    return (
        <>
            <style>
                {`
            
                    .dropdown-menu[data-popper-placement]:not([data-popper-placement^="top-"]) {
                        top: 40px !important;
                    }
                `}
            </style>

            {/* <Container fluid className='px-0 d-none'>
                <Row className='py-2 align-items-center border-bottom'>
                    <Col className='fw-bold text-black fs-5' xs={5}>
                        Campaign
                    </Col>
                    <Col className=' fw-bold text-black fs-5' xs={2}>
                        Status
                    </Col>
                    <Col className=' fw-bold text-black fs-5' xs={2}>
                        Start Date
                    </Col>
                    <Col className=' fw-bold text-black fs-5' xs={2}>
                        End Date
                    </Col>
                    <Col className=' fw-bold text-black fs-5 text-center' xs={1}>
                        Action
                    </Col>
                </Row>
                {!isLoading ? allCampaigns.map((ele, key) => {
                    return (
                        <Row className='py-2 align-items-center border-bottom' key={key}>
                            <Col className='d-flex justify-content-start align-items-center gap-1' xs={5}>
                                <div style={{ backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, backgroundSize: "100%" }}>
                                    <div onClick={() => {
                                        setSelectedThemeNo(ele.default_id)
                                        setEditTheme(ele)
                                        navigate(`/merchant/SuperLeadz/new_customization/${ele.id}`, { state: ele })
                                    }} to={"/merchant/SuperLeadz/new_customization/"} className="prev d-flex justify-content-center align-items-center rounded position-relative overflow-hidden cursor-pointer" style={{ width: "120px", height: "67.5px", backgroundColor: JSON.parse(ele.custom_theme).overlayStyles.backgroundColor, backgroundImage: JSON.parse(ele.custom_theme).overlayStyles.backgroundImage }}>
                                        <span className="position-absolute">
                                            <JsonToJsx isMobile={false} renderObj={JSON.parse(ele.custom_theme)} scale={0.1125} />
                                        </span>
                                    </div>
                                </div>
                                <div onClick={() => {
                                    setSelectedThemeNo(ele.default_id)
                                    setEditTheme(ele)
                                    navigate(`/merchant/SuperLeadz/new_customization/${ele.id}`, { state: ele })
                                }} className='fw-bolder text-primary cursor-pointer'>{ele.campaign_name}</div>
                            </Col>
                            <Col className='' xs={2}>
                                {ele.is_draft === 0 ? (
                                    <span className="form-check form-switch form-check-success cursor-pointer p-0 m-0" style={{ filter: `drop-shadow(0px 0px 7.5px rgba(40, 199, 111, ${ele.is_active ? "0.5" : "0"}))` }}>
                                        <input onChange={() => {
                                            setCurrDetails(ele)
                                            const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/get/active-template/`)
                                            const form_data = new FormData()
                                            form_data.append("shop", outletData[0]?.web_url)
                                            form_data.append("app", "superleadz")
                                            form_data.append('theme_id', ele.id)
                                            form_data.append('campaign_name', ele.campaign_name)
                                            axios({
                                                method: "POST",
                                                url: getUrl,
                                                data: form_data
                                            }).then((data) => {
                                                if ((data.data.response.length === 0) || (data.data.response.length > 0 && activeThemes.includes(ele.id))) {
                                                    setModal1(true)
                                                } else {
                                                    setConflictThemes([...data.data.response])
                                                    setConflictModal(true)
                                                }
                                            }).catch((err) => {
                                                console.log({ err })
                                            })
                                        }} type='checkbox' checked={activeThemes.includes(ele.id)} className='form-check-input cursor-pointer m-0' />
                                    </span>
                                ) : (
                                    <span className='text-warning'>Draft</span>
                                )}
                            </Col>
                            <Col className='' xs={2}>
                                {moment(ele.start_date).format("DD-MM-YYYY")}
                            </Col>
                            <Col className='' xs={2}>
                                {ele.end_date ? moment(ele.end_date).format("DD-MM-YYYY") : "never ending"}
                            </Col>
                            <Col className='' xs={1}>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <UncontrolledDropdown className='more-options-dropdown'>
                                        <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
                                            <span className={`border-none`}>
                                                <MoreVertical size={15} />
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu className='border'>
                                            <DropdownItem onClick={() => {
                                                setCurrDetails(ele)
                                                setDeleteModal(!deleteModal)
                                            }} className='w-100'>
                                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                    <Trash stroke='#ea5455' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem onClick={() => {
                                                sendDuplicate(ele)
                                            }} className='w-100'>
                                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                    <Copy stroke='#28c76f' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Duplicate</span>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem onClick={() => {
                                                setSelectedThemeNo(ele.default_id)
                                                setEditTheme(ele)
                                                navigate(`/merchant/SuperLeadz/new_customization/${ele.id}&&${ele.campaign_name}`, { state: ele })
                                            }} className='w-100'>
                                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                    <Edit2 stroke='#ff9f43' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Edit</span>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem onClick={() => {
                                                setSelectedThemeNo(ele.default_id)
                                                setEditTheme(ele)
                                                navigate(`/merchant/SuperLeadz/new_customization/${ele.id}&&${ele.campaign_name}`, { state: ele })
                                            }} className='w-100'>
                                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                    <Eye stroke='#ff9f43' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Preview</span>
                                                </div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </Col>
                        </Row>
                    )
                }) : (
                    <div className='d-flex justify-content-center mt-2'>
                        <Spinner size={'35px'} />
                    </div>
                )}
            </Container> */}
            {/* <div className="d-flex justify-content-between my-2">
                <h4>All Campaigns</h4>
                <div className="d-flex gap-2 align-items-center">
                    <input type="text" className="form-control" value={searchValue} onChange={handleFilter} />
                    <Link to={"/merchant/SuperLeadz/themes/"} className='btn btn-primary'>New Campaign</Link>
                </div>
            </div> */}
            <ComTable
                tableName=""
                content={defferContent}
                tableCol={columns}
                data={custom ? allCampaigns.filter((curElem) => curElem.is_draft === 0) : allCampaigns}
                searchValue={searchValue}
                filteredData={filteredData}
                isLoading={isLoading}
                custom={custom}
                isExpand={true}
                ExpandableTable={ExpandedData}
                viewAll={viewAll}
                selectableRows={true}
                selectedRows={checkedThemes}
                setSelectedRows={setCheckedThemes}
                deleteContent={deleteContent}
            />

            {/* {checkedThemes.length > 0 && } */}
            <Modal isOpen={modal1} toggle={() => setModal1(!modal1)} className='position-relative popup-cust' >
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setModal1(!modal1)}>
                        <X size={17.5} />
                    </span>
                    Do you want to {activeThemes.includes(currDetails.id) && 'de'}activate this theme?
                    <div className="text-end"><button onClick={() => {
                        setModal1(!modal1)
                        sendConfirmation()
                    }} className={`btn btn-${activeThemes.includes(currDetails.id) ? 'outline-primary' : 'primary'} text-capitalize`}>{activeThemes.includes(currDetails.id) && 'de'}activate</button></div>
                </ModalBody>
            </Modal>
            <Modal isOpen={conflictModal} onClick={() => setConflictModal(!conflictModal)} toggle={() => setConflictModal(!conflictModal)}>
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setConflictModal(!conflictModal)}>
                        <X size={17.5} />
                    </span>
                    This theme's settings conflict with {conflictThemes?.map((ele, index, array) => {
                        return <span className='fw-bold text-black' key={index}>{allCampaigns[allCampaigns.findIndex($ => $.id === Number(ele.theme))].campaign_name}{index < array.length - 2 ? ',' : index === array.length - 2 ? " and" : ""} </span>
                    })}.<br />Activating this theme will deactivate the above theme/s.
                    <div className="mt-2 d-flex gap-1 justify-content-end align-items-center"><button className="btn btn-primary" onClick={overlapConfirmation}>Activate</button> <button onClick={() => setConflictModal(!conflictModal)} className='btn btn-outline-primary'>Cancel</button></div>
                </ModalBody>
            </Modal>
            <Modal isOpen={deleteModal} onClick={() => setDeleteModal(!deleteModal)} toggle={() => setDeleteModal(!deleteModal)}>
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setDeleteModal(!deleteModal)}>
                        <X size={17.5} />
                    </span>
                    Are you sure you want to delete {deleteMode === "single" ? "this theme" : "these themes"}?
                    <div className="mt-2 d-flex gap-3 justify-content-end align-items-center">
                        <button className="btn btn-outline-primary" onClick={() => deleteThemes()}>Delete</button>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={dateModal} toggle={toggleDateModal}>
                <ModalBody>
                    {dateRow?.id}
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label className="form-control-label">Start Date</label>
                                <Flatpickr options={{ dateFormat: "d-m-Y", enableTime: true, minDate: "today", maxDate: dates.end_date }} value={dates.start_date} className='form-control' id='campSD' onChange={date => setDates({ ...dates, start_date: date })} />
                            </div>
                            <div className="ps-4">
                                <div className="form-check form-check-dark mb-2">
                                    <input onChange={e => {
                                        setDates({ ...dates, end_date: e.target.checked ? dates.start_date : "" })
                                    }} checked={dates.end_date !== ""} type="checkbox" className="form-check-input" />
                                    <label htmlFor="" className="form-check-label">Enable end date</label>
                                </div>
                            </div>
                            <div className="col-12 mb-2">
                                <label className="form-control-label">End Date</label>
                                {dates.end_date !== "" && <Flatpickr options={{ dateFormat: "d-m-Y", enableTime: true, minDate: dates.start_date }} value={dates.end_date} className='form-control' id='campED' onChange={date => setDates({ ...dates, start_date: date })} />}
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            {/* <Modal size='xl' isOpen={prevModal} toggle={() => setPrevModal(!prevModal)}>
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setPrevModal(!prevModal)}>
                        <X size={17.5} />
                    </span>
                    {prevModal && <JsonToJsx renderObj={JSON.parse(dateRow.custom_theme)} scale={1} />}
                </ModalBody>
            </Modal> */}
        </>
    )
}

export default AllCampaigns