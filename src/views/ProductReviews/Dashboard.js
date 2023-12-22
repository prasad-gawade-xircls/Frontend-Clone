import { React, useState, useEffect } from 'react'
import { Col, Row, Card, CardBody, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'
import { Download, Printer, File, FileText, Copy, Settings, MoreVertical, Trash2, ChevronDown } from 'react-feather'
import "./Dashboard.css"
import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import apiData from "@src/@core/auth/jwt/api/api.json"
import DailyBarGraph from './components/DailyBarGraph'
import ComTable from '../Components/DataTable/ComTable'
import { BiUpvote, BiDownvote } from "react-icons/bi"
import Spinner from '../Components/DataTable/Spinner'

const Dashboard = () => {
    const [reviewType, setReviewType] = useState("All")
    const [reviewsPerPage, setReviewsPerPage] = useState(10)
    const [reviewInfo, setReviewInfo] = useState({ total_reviews: 0, average_rating: 0 })
    const [starInfo, setStarInfo] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
    const [selectedRows, setSelectedRows] = useState({})
    const [reviewsArray, setReviewsArray] = useState({ reviews: [], filerReviews: [] })
    const [authorized, setAuthorized] = useState(false)
    console.log(setReviewsPerPage, setReviewType, selectedRows, reviewsPerPage, setSelectedRows, "setReviewsPerPage")
    const [selected, setSelected] = useState([])
    const [deleteMode, setDeleteMode] = useState("single")
    const [deleteModal, setDeleteModal] = useState(false)
    const [isModal, setIsModal] = useState(false)
    console.log(deleteMode)

    // const handleBulkAuthorized = () => {
    //     console.log("handle published", selectedRows.selectedRows)
    // }

    // const apiData = { d_ngrok: "" }

    // const handleBulkDelete = () => {
    //     const arrayOfIds = selectedRows?.selectedRows?.map(obj => obj.id)
    //     const form_data = new FormData()
    //     form_data.append("reviewIds", arrayOfIds)
    //     form_data.append("shop", "quickstart-6d4c5332.myshopify.com")
    //     fetch(`${apiData.d_ngrok}/bulk-delete/`, {
    //         method: 'POST',
    //         headers: {
    //             'ngrok-skip-browser-warning': true
    //         },
    //         body: form_data
    //     })
    //         .then((resp) => {
    //             if (!resp.ok) {
    //                 throw new Error('Network response was not ok')
    //             }
    //             console.log("successful delete")
    //             return resp.text()
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })

    // }

    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')

    const renderClient = row => {
        if (row.avatar) {
            return <Avatar alt="Gisela Leppard" src="/static/images/avatar/1.jpg" width='32' height='32' />
        } else {
            return (
                <Avatar
                    initials
                    className='me-1'
                    color={row.avatarColor || 'light-primary'}
                    content={row.first_name || 'Gisela Leppard'}
                />
            )
        }
    }

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.title.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.vendor.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.product_type.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.title.toLowerCase().includes(value.toLowerCase()) ||
                    item.vendor.toLowerCase().includes(value.toLowerCase()) ||
                    item.product_type.toLowerCase().includes(value.toLowerCase())

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


    const handleAuthorizeReview = async (review_id, status) => {
        const form_data = new FormData()
        form_data.append("shop", "quickstart-6d4c5332.myshopify.com")
        try {
            const response = await fetch(
                `${apiData.d_ngrok}/review/authorize/${review_id}/`,
                {
                    method: "POST",
                    headers: {
                        "Authorization-Action": status ? "unauthorize" : "authorize"
                    },
                    body: form_data
                }
            )

            // window.location.reload(true)
            if (!response.ok) {
                throw new Error(`Authorization failed due to:${response.status} `)
            }
            console.log("Authorization successful!")
            setAuthorized(!authorized)
        } catch (error) {
            console.error("Authorizing error: ", error)
        }
    }


    const handleDeleteReview = async (review_id) => {
        try {
            const response = await fetch(
                `${apiData.d_ngrok}/review/delete/${review_id}/`,
                {
                    method: "POST"
                }
            )
            if (!response.ok) {
                throw new Error(`Authorization failed due to:${response.status} `)
            }
            console.log("Delete successful!")
            setIsLoading(false)
        } catch (error) {
            console.error("Authorizing error: ", error)
        }
    }

    useEffect(() => {
        function formatDate(dateString) {
            const options = { year: "numeric", month: "short", day: "2-digit" }
            const formattedDate = new Date(dateString).toLocaleDateString(
                undefined,
                options
            )
            return formattedDate
        }
        fetch(`${apiData.d_ngrok}/reviews/?shop=quickstart-6d4c5332.myshopify.com`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok')
                }
                return resp.text()
            })
            .then(data => {
                // console.log("reviews", data)

                const jsonData = JSON.parse(data)
                const reviewList = jsonData?.reviews?.map(ele => {
                    return {
                        first_name: ele.customer.first_name,
                        last_name: ele.customer.last_name,
                        product: ele.product_name,
                        productImg: ele.product_image_url,
                        productDesc: ele.product_description,
                        state: ele.published,
                        votes: ele?.votes,
                        id: ele.id,
                        email: ele.customer.email,
                        date: formatDate(ele.created_at),
                        rating: ele.rating,
                        review: ele.review,
                        reviewdesc: ele.review,
                        likes: ele.total_likes,
                        dislikes: ele.total_dislikes
                    }

                })
                setReviewsArray({ reviews: reviewList.reverse(), filerReviews: reviewList.reverse() })

                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [authorized])

    useEffect(() => {
        if (reviewType === "All reviews") {
            setReviewsArray({ ...reviewsArray, filerReviews: reviewsArray.reviews })
        } else if (reviewType === "Published") {
            const fList = reviewsArray.reviews?.filter(ele => {
                return ele.state === true
            })
            setReviewsArray({ ...reviewsArray, filerReviews: fList })
        } else {
            const fList = reviewsArray.reviews?.filter(ele => {
                return ele.state === false
            })
            setReviewsArray({ ...reviewsArray, filerReviews: fList })
        }
    }, [reviewType])

    useEffect(() => {
        fetch(`${apiData.d_ngrok}/reviews/?shop=quickstart-6d4c5332.myshopify.com`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok')
                }
                return resp.text()
            })
            .then(data => {
                // console.log("reviews", data)

                const jsonData = JSON.parse(data)
                setReviewInfo({ total_reviews: jsonData.total_reviews, average_rating: jsonData.average_rating })
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

        fetch(`${apiData.d_ngrok}/top-products/?shop=quickstart-6d4c5332.myshopify.com`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok')
                }
                return resp.text()
            })
            .then(data => {
                // console.log("reviews", data)

                const jsonData = JSON.parse(data)
                setStarInfo({ 1: jsonData.ratings_data[1], 2: jsonData.ratings_data[2], 3: jsonData.ratings_data[3], 4: jsonData.ratings_data[4], 5: jsonData.ratings_data[5] })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteContent = <button onClick={() => {
        setDeleteMode("multiple")
        setDeleteModal(!deleteModal)
        setIsModal(!isModal)
    }} className="btn btn-danger text-white" style={{ whiteSpace: "no-wrap" }}>Delete</button>


    const Column = [
        {
            name: <span className='fw-bold h5'>PRODUCT</span>,
            width: '18rem',
            sortable: true,
            sortField: 'product',
            // selector: row => row.product,
            cell: row => (
                <div className=' my-1 d-flex align-items-center gap-1'>
                    <img src={row.productImg} alt="" style={{ width: '20%', height: "auto" }} />
                    <div  >
                        <span className='fw-medium' style={{ fontSize: '14px' }}>{row.product}</span>
                        <small className='text-muted mb-0 w-75'>{row.productDesc}</small>
                    </div>
                </div>
            )
        },
        {
            name: <span className='fw-bold h5'>REVIEWER</span>,
            sortable: true,
            width: "18rem",
            sortField: 'reviewer',
            // selector: row => row.reviewer,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {renderClient(row)}
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/apps/user/view/${row.id}`}
                            className='user_name text-truncate text-body'
                        // onClick={() => store.dispatch(getUser(row.id))}
                        >
                            <span className='fw-medium' style={{ fontSize: '14px', color: "#7367f0" }}>{row.first_name} {row.last_name}</span>
                        </Link>
                        <small className='text-truncate text-muted mb-0'>{row.email}</small>
                    </div>
                </div>

            )
        },
        {
            name: <span className='fw-bold h5'>REVIEW</span>,
            sortable: true,
            sortField: 'rating',
            width: '250px',
            // selector: row => row.review,
            cell: row => (
                <div className='d-flex flex-column mt-1'>
                    <div style={{ marginBottom: '5px' }}>
                        {Array.from({ length: row.rating }).map((_, index) => (
                            <FaStar key={index} size={21} color='#ff9f43' />
                        ))}
                        {Array.from({ length: 5 - row.rating }).map((_, index) => (
                            <FaStar key={index} size={21} color='#4b465c33' />
                        ))}
                    </div>
                    <p className="h6" style={{ marginBottom: '5px', fontSize: "14px" }}>{row.review}</p>

                </div>
            )

        },
        {
            name: <span className='fw-bold h5'>DATE</span>,
            sortable: true,
            // width: "15rem",
            // selector: row => row.date,
            sortField: 'dater',
            cell: row => (
                <span className='h5'>{row.date}</span>
            )
        },
        {
            name: <span className='fw-bold h5'>STATUS</span>,
            sortable: true,
            sortField: 'status',
            // selector: row => row.state,
            cell: row => (
                row.state ? (
                    <p className=" text-success" style={{ width: "9rem" }}>Approved</p>
                ) : (
                    <p className=" text-danger" style={{ width: "9rem" }}>Pending</p>
                )
            )
        },
        {
            name: <span className='fw-bold h5'>Votes</span>,
            sortable: true,
            sortField: 'votes',
            // selector: row => row.votes,
            cell: row => (
                <div className=' d-flex justify-content-between align-items-center gap-1'>
                    {/* {row.likes.length + row.dislikes.length} */}
                    <BiUpvote size={20} color='green' />
                    {row.likes}
                    <BiDownvote size={20} color='red' />
                    {row.dislikes}
                </div>
            )
        },
        {
            name: <span className='fw-bold h5'>ACTION</span>,
            width: "7rem",
            cell: row => (
                <div className='column-action'>
                    <UncontrolledDropdown>
                        <DropdownToggle tag='div' className='btn btn-sm'>
                            <MoreVertical size={14} className='cursor-pointer' />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                tag={Link}
                                className='w-100'
                                to={`/merchant/product-review`}
                                onClick={() => handleAuthorizeReview(row.id, row.state)}
                            >
                                <FileText size={14} className='me-50' />
                                <span className='align-middle'>{row.state ? "Unauthorise" : "Authorise"}</span>
                            </DropdownItem>
                            <DropdownItem
                                tag='a'
                                href='/'
                                className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    // store.dispatch(deleteUser(row.id))
                                    handleDeleteReview(row.id)
                                }}
                            >
                                <Trash2 size={14} className='me-50' />
                                <span className='align-middle'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    ]

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>All Reviews</h4>
        </Col>

        <Col className='d-flex align-items-center justify-content-end gap-1' md='4' sm='12'>
            <Input
                className='dataTable-filter form-control ms-1'
                style={{ width: `180px`, height: `2.714rem` }}
                type='text'
                bsSize='sm'
                id='search-input-1'
                placeholder='Search...'
                value={searchValue}
                onChange={handleFilter}
            />

            {
                deleteContent && selected.length > 0 ? <>
                    {deleteContent}
                </> : ''
            }
        </Col>
    </>

    return (
        <>
            <style>
                {`
                button:focus {
                    border: 1px solid rgba(0,0,0,0.3) !important
                }
                `}
            </style>
            <Card>
                <div className="card-body d-flex justify-content-between">
                    <h4 className='m-0'>Dashboard</h4>
                    <Link className="text-dark" to="/merchant/manage-reviews">
                        <Settings size="18px" />
                    </Link>
                </div>
            </Card>
            <Row className='match-height'>
                <Col xl='6'>
                    <Card className='rounded'>
                        <div className='d-flex align-items-center h-100'>
                            <CardBody className=''>
                                <Row>
                                    <div className='d-flex align-items-center'>
                                        <Col className='card1' md="5" sm="12">
                                            {!isLoading ? (
                                                <>
                                                    <h2 className="d-flex align-items-center fw-bold gap-1" style={{ color: "#7367f0", fontSize: "32px" }}>{reviewInfo.average_rating.toFixed(1)}
                                                        <FaStar className='my-1' size={20} style={{ color: "#7367f0" }} />
                                                    </h2>
                                                    <p className='fw-bold'>Total {reviewInfo.total_reviews} reviews</p>
                                                    <p className='gap-1'>All reviews are from genuine customers</p>
                                                    {/* <span className=' badge week-btn rounded'>+5 This week</span> */}
                                                </>
                                            ) : <div className='d-flex justify-content-center align-items-center'><Spinner size="40px" /></div>}

                                        </Col>
                                        <Col>
                                            <div className="vl" md="2" sm="12"></div>
                                        </Col>
                                        <Col md="5" sm="12" className=''>
                                            {!isLoading ? (
                                                <>
                                                    <div className='d-flex flex-column justify-content-between mx-1'>
                                                        <div className="card2 d-flex align-items-center">
                                                            <span className='fw-bold' style={{ width: '4rem' }} >5 star</span>
                                                            <div className="progress w-75 ">
                                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${((starInfo[5] / reviewInfo.total_reviews) * 100).toFixed(2)}%`, height: "13px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span className=' ms-1 fw-bold'>{starInfo[5] || 0}</span>
                                                        </div>
                                                        <div className="card2 d-flex align-items-center">
                                                            <span className='fw-bold' style={{ width: '4rem' }} >4 star</span>
                                                            <div className="progress w-75 ">
                                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${((starInfo[4] / reviewInfo.total_reviews) * 100).toFixed(2)}%`, height: "15px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span className=' ms-1 fw-bold'>{starInfo[4] || 0}</span>
                                                        </div>
                                                        <div className="card2 d-flex align-items-center">
                                                            <span className='fw-bold' style={{ width: '4rem' }} >3 star</span>
                                                            <div className="progress w-75 ">
                                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${((starInfo[3] / reviewInfo.total_reviews) * 100).toFixed(2)}%`, height: "15px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span className=' ms-1 fw-bold'>  {starInfo[3] || 0}</span>
                                                        </div>
                                                        <div className="card2 d-flex align-items-center">
                                                            <span className='fw-bold' style={{ width: '4rem' }} >2 star</span>
                                                            <div className="progress w-75 ">
                                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${((starInfo[2] / reviewInfo.total_reviews) * 100).toFixed(2)}%`, height: "15px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span className=' ms-1 fw-bold'>{starInfo[2] || 0}</span>
                                                        </div>
                                                        <div className="card2 d-flex align-items-center">
                                                            <span className='fw-bold' style={{ width: '4rem' }} >1 star</span>
                                                            <div className="progress w-75 ">
                                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${((starInfo[1] / reviewInfo.total_reviews) * 100).toFixed(2)}%`, height: "15px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span className=' ms-1 fw-bold'>{starInfo[1] || 0}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : <div className='d-flex justify-content-center align-items-center'><Spinner size="40px" /></div>}

                                        </Col>
                                    </div>
                                </Row>
                            </CardBody>
                        </div>
                    </Card>
                </Col>
                <Col xl='6'>
                    <Card>
                        <CardBody>
                            <Row className='d-flex justify-content-between'>
                                <Col sm="6">
                                    <div className="mb-5">
                                        <h4 className='text-nowrap mb-1'>Statistics</h4>
                                        <p>
                                            <span>12 new reviews</span>
                                            <span className='badge week-btn1 badge-success mx-1'>+8.4%</span>
                                        </p>
                                    </div>
                                    <div className=' d-flex align-items-end'>
                                        <h4 className="mb-1"><span className="text-success me-1">87%</span>Positive reviews</h4>
                                        <span className='mb-1 pb-1'><AiOutlineInfoCircle size={13} /></span>
                                    </div>
                                    <p className=''>See performance report</p>
                                </Col>
                                <Col sm="6" className='mt-1 '>
                                    <DailyBarGraph />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody className='mt-2' style={{ paddingTop: "0px" }}>
                            <div className="dataTableContainer">
                                <ComTable
                                    tableName="Products Reviews"
                                    content={defferContent}
                                    tableCol={Column}
                                    data={reviewsArray.filerReviews.reverse()}
                                    searchValue={searchValue}
                                    handleFilter={handleFilter}
                                    filteredData={filteredData}
                                    isLoading={isLoading}
                                    custom={true}
                                    viewAll={'/merchant/allreviews/'}
                                    selectableRows={true}
                                    setSelectedRows={setSelected}
                                />
                            </div>
                        </CardBody >
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default Dashboard