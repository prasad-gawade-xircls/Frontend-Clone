import axios from 'axios'
import React, { useContext, useState } from 'react'
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
import { Copy, Edit, Edit2, Edit3, Eye, Layout, MoreVertical, Plus, Sliders, Trash, X } from 'react-feather'
import { getCurrentOutlet, pageNo } from '../Validator'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// import pixels from "../../assets/images/superLeadz/pixels.png"
import Flatpickr from 'react-flatpickr'
import CampaignWiseData from '../Components/SuperLeadz/CampaignWiseData'
import ServerSideTable from '../Components/DataTable/ServerSide'
import InputField from '../../Helper/inputField'

const AllCampaigns = ({ custom = false, viewAll, name = "All Campaigns" }) => {

    const [searchValue, setSearchValue] = useState('')
    console.log("searchValue", searchValue)
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

    //------------------------------------------------------------------------
    const [isAdvanceFieldsOpen, setIsAdvanceFieldsOpen] = useState(false)
    const handleSliderClick = () => {
        setIsAdvanceFieldsOpen(!isAdvanceFieldsOpen)
    }

    const dataToCheck = [
        {
            title: "Campaign Name",
            name: "campaign_Name",
            type: "text",
            id: "campaign_Name",
            options: ["Option 1", "Option 2", "Option 3"]
        },
        {
            title: "Start Date",
            name: "start_Date",
            type: "date",
            id: "start_Date"
        },
        {
            title: "End Date",
            name: "end_Date",
            type: "date",
            id: "end_Date"
        }
    ]

    const [advanceData, setAdvanceData] = useState({
        campaign_Name: "",
        start_Date: "",
        end_Date: ""
    })

    // const [advanceData, setAdvanceData] = useState({
    //     campain_Name: "",
    //     start_Date: "",
    //     end_Date: ""
    // })

    const [currentPage, setCurrentPage] = useState(0)
    const [currentEntry, setCurrentEntry] = useState(10)
    const [count, setCount] = useState(10)

    //-------------------------------------------------------------------------


    const [modal1, setModal1] = useState(false)

    const [dateModal, setDateModal] = useState(false)

    // const [prevModal, setPrevModal] = useState(false)

    const [dateRow, setDateRow] = useState({})
    // console.log(dateRow)

    const [dates, setDates] = useState({
        start_date: "",
        end_date: ""
    })

    // const updateData = (e) => {
    //     setAdvanceData({ ...advanceData, [e.target.name]: e.target.value })
    // }
    const updateData = (e) => {
        const { name, value } = e.target
        setAdvanceData((prevAdvanceData) => ({
            ...prevAdvanceData,
            [name]: value
        }))
    }

    // const saveInnerXirclsDetails = () => {
    //     const check = validForm(valueToCheck, dataToCheck)
    //     console.log(check)
    // }

    console.log(advanceData)
    // Object.keys(advanceData).map(key => {
    //     console.log("key", key)
    // })

    const toggleDateModal = () => setDateModal(!dateModal)

    const getAllThemes = () => {
        const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/show_all_form_builder_theme/`)
        getUrl.searchParams.append('shop', outletData[0]?.web_url)
        getUrl.searchParams.append('app', 'superleadz')
        Object.entries(advanceData).map(([key, value]) => {
            getUrl.searchParams.append(key, value)
        })

        axios({
            method: "GET",
            url: getUrl
        }).then((data) => {
            const newArr = []
            setAllCampaigns([...data?.data?.success])
            setIsLoading(false)
            setCount(data?.data?.count)
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

    // useEffect(() => {
    //     if (advanceData) {
    //         const delay = 1000
    //         const request = setTimeout(() => {
    //             getAllThemes()
    //         }, delay)

    //         return () => {
    //             clearTimeout(request)
    //         }
    //     }
    // }, [advanceData])


    // useEffect(() => {
    //     getAllThemes()
    // }, [])


    const deleteThemes = () => {
        const obj = {
            theme_id: deleteMode === "single" ? [currDetails.id] : [...checkedThemes]
        }

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
        <Row>
            <Col className='d-flex align-items-center' md='4' sm='12'>
                <div className='d-flex justify-content-start align-items-center gap-2'>
                    <label>
                        Show
                    </label>
                    <select className='form-control' value={currentEntry} onChange={(e) => {
                        setCurrentEntry(Number(e.target.value))
                    }} style={{ appearance: 'auto' }}>
                        {pageNo.map(page => <option value={page.value}>{page.label}</option>)}
                    </select>

                </div>
            </Col>
            <Col className='d-flex align-items-center' md='4' sm='12'>
                <h4 className='m-0'>{name}</h4>
            </Col>
            <Col className='d-flex align-items-center' md='4' sm='12'>
                <div className="d-flex gap-2 align-items-center">
                    <Link to={"/merchant/SuperLeadz/themes/"} className='btn btn-primary-main' style={{ width: "265px" }}> Create Campaign</Link>
                    <input type="text" className="form-control w-75" value={searchValue} onChange={handleFilter} placeholder='Search...' />
                    <span onClick={() => handleSliderClick()} className="center toolbar" style={{ padding: 5, fontSize: 18, marginLeft: 5, cursor: 'pointer' }} data-toggle="tooltip" data-placement="bottom" title="Advance Filtering">
                        <Sliders size={20} strokeWidth={2.5} style={{ transform: 'rotate(-90deg)', fontWeight: 'bold' }} />
                    </span>
                </div>
            </Col>
        </Row>

        <Col>
            {isAdvanceFieldsOpen && (
                <div className="row py-2 advance_filter_row">
                    <Row>
                        <InputField dataToCheck={dataToCheck} advanceData={advanceData} updateData={updateData} />
                    </Row>
                </div>
            )}
        </Col>
    </>

    const columns = [
        {
            name: '',
            cell: (row) => <div className="p-0 m-0 form-check form-check-success"><input checked={checkedThemes.includes(row.id)} onChange={e => {
                if (e.target.checked) {
                    setCheckedThemes([...checkedThemes, row.id])
                } else {
                    setCheckedThemes([...checkedThemes].filter(item => item !== row.id))
                }
            }} type="checkbox" className="form-check-input m-0" /></div>,
            width: "50px"
        },
        {
            name: '',
            cell: (row) => (
                <div className='d-flex justify-content-start align-items-center gap-1 py-1'>
                    <div style={{ backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, backgroundSize: "100%" }}>
                        <div onClick={() => {
                            setSelectedThemeNo(row.default_id)
                            setEditTheme(row)
                            localStorage.setItem("is_draft", row.is_draft)
                            navigate(`/merchant/SuperLeadz/overview/${row.id}/`)
                        }} className="prev d-flex justify-content-center align-items-center rounded position-relative overflow-hidden cursor-pointer" style={{ width: "120px", height: "67.5px", backgroundColor: JSON.parse(row.custom_theme).overlayStyles.backgroundColor, backgroundImage: JSON.parse(row.custom_theme).overlayStyles.backgroundImage }}>

                            <span className="position-absolute">
                                <JsonToJsx isMobile={false} renderObj={JSON.parse(row.custom_theme)} scale={0.1125} />
                            </span>
                        </div>
                    </div>
                </div>
            ),
            width: "180px"
        },

        {
            name: '',
            cell: (row) => (
                <div className='d-flex flex-column' style={{ gap: "12px" }}>
                    <div onClick={() => {
                        setSelectedThemeNo(row.default_id)
                        setEditTheme(row)
                        localStorage.setItem("is_draft", row.is_draft)
                    //     navigate(`/merchant/SuperLeadz/new_customization/${row.id}`, { state: row })
                    // }} className='fw-bolder text-primary cursor-pointer'>{row.campaign_name}
                    navigate(`/merchant/SuperLeadz/overview/${row.id}/`)
                    }} className='fw-bolder text-primary cursor-pointer'>{row.campaign_name}


                    </div>
                    <div className=' d-flex flex-column justify-content-start' >

                        <div className=' d-flex justify-content-start align-items-center' style={{ gap: "7px" }}>
                            <div>
                                <span className='cursor-pointer' onClick={() => {
                                    toggleDateModal()
                                    setDateRow(row)
                                    setDates({ ...dates, start_date: row.start_date || "", end_date: row.end_date || "" })
                                }} style={{ color: "#5e5858" }}>
                                    <span className='fw-bold' style={{ color: "#000" }} >From </span>
                                    {moment(row.start_date).format("DD-MM-YYYY")}
                                </span>
                            </div>
                            <div>
                                <span className='cursor-pointer' onClick={() => {
                                    toggleDateModal()
                                    setDateRow(row)
                                    setDates({ ...dates, start_date: row.start_date || "", end_date: row.end_date || "" })
                                }} style={{ color: "#5e5858" }}>
                                    <span className='fw-bold' style={{ color: "#000" }}>To </span>
                                    {row.end_date ? moment(row.end_date).format("DD-MM-YYYY") : "never ending"}
                                </span>
                            </div>
                            <div>
                                <span className='cursor-pointer' style={{ color: "#5e5858" }}>
                                    <span className='fw-bold' style={{ color: "#000" }}>Conversion: </span>
                                    30.69%
                                </span>
                            </div>
                            <div>
                                <span className='cursor-pointer' style={{ color: "#5e5858" }}>
                                    <span className='fw-bold' style={{ color: "#000" }}>Revenue: </span>
                                    $1,60,000
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )

        },
        {
            name: "",
            cell: (row) => (
                <>
                    <div>
                        {
                            row.is_draft === 0 ? (
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
                            ) : (
                                <div className='text-warning m-auto'>Draft</div>
                            )
                        }
                    </div>
                </>
            ),
            width: "150px"
        },
        {
            name: '',
            cell: row => (
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <div onClick={() => {
                        setDeleteMode("single")
                        setCurrDetails(row)
                        setDeleteModal(!deleteModal)
                    }}>
                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Trash stroke='#ea5455' size={"15px"} className='cursor-pointer' />

                        </div>
                    </div>
                    <div onClick={() => {
                        sendDuplicate(row)
                    }} >
                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Copy stroke='#28c76f' size={"15px"} className='cursor-pointer' />

                        </div>
                    </div>
                    <div onClick={() => {
                        setSelectedThemeNo(row.default_id)
                        setEditTheme(row)
                        localStorage.setItem("is_draft", row.is_draft)
                        navigate(`/merchant/SuperLeadz/new_customization/${row.id}`, { state: row })
                    }}>
                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Edit2 stroke='#ff9f43' size={"15px"} className='cursor-pointer' />

                        </div>
                    </div>
                    <div onClick={() => {
                        navigate(`/merchant/SuperLeadz/preview/${row.id}/`, { state: row })
                    }}>
                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Layout stroke='#ff9f43' size={"15px"} className='cursor-pointer' />

                        </div>
                    </div>
                </div>
            ),
            width: "250px"
        }
    ]

    // useEffect(() => {
    // getAllThemes()
    // }, [])

    const ExpandedData = (data) => {
        console.log(data)
        return <CampaignWiseData campaignData={data.data} />

    }

    return (
        <>
            <style>
                {`
 
                    .dropdown-menu[data-popper-placement]:not([data-popper-placement^="top-"]) {
                        top: 40px !important
                    }
                `}
            </style>

            <ServerSideTable
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentEntry={currentEntry}
                count={count}
                isStyling={true}
                getAllThemes={getAllThemes}
                advanceData={advanceData}
            />

            {checkedThemes.length > 0 && <button onClick={() => {
                setDeleteMode("multiple")
                setDeleteModal(!deleteModal)
            }} className="position-fixed btn btn-danger d-block m-auto" style={{ inset: "auto 50% 10px auto", transform: "translateX(50%)" }}>Delete selection</button>}
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
        </>
    )
}

export default AllCampaigns