import React, { useEffect, useState } from "react"
import ComTable from "../Components/DataTable/ComTable"
import CardCom from "../Components/SuperLeadz/CardCom"
import { Col, Input, Row, Card, CardBody } from "reactstrap"
import moment from "moment/moment"
import { getCurrentOutlet } from "../Validator"
import { SuperLeadzBaseURL, baseURL } from "../../assets/auth/jwtService"
import Spinner from "../Components/DataTable/Spinner"
import { User, BarChart2, RefreshCw, DollarSign, Info, Menu, UserPlus, UserCheck, Users, Percent, Check } from 'react-feather'
import { SiConvertio } from "react-icons/si"
import { AiFillPhone, AiOutlineMail, AiFillCaretRight, AiOutlineQuestion } from 'react-icons/ai'
import { BiDollar } from "react-icons/bi"
import "./css/Dashboard.css"
import SuperLeadzCampaign from '../Apps/SuperLeadzCampaign'
import AllCampaigns from '../NewCustomizationFlow/AllCampaigns'
import { PermissionProvider } from '../../Helper/Context'
import Flatpickr from 'react-flatpickr'

export default function SuperLeadzPerformance() {
    const [chargesLoader, setChargesLoader] = useState(true)
    const [performanceData, setPerformanceData] = useState({
        active_campaign: "0",
        campaign_revenue: "0",
        impressions: "0",
        engaged: "0",
        leadsGenerated: "0",
        uniqueLeadsGenerated: "0",
        verifiedLeads: "0",
        uniqueVerifiedLeads: "0",
        vists: "0",
        vistsToLead: "0",
        leadConverted: "0.00",
        leadToCustomer: "0.00"

    })

    console.log(setChargesLoader, setPerformanceData)
    // const moment = require("moment")
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState([])
    // const [redemption, setRedemption] = useState(0)
    // const [revenue, setRevenue] = useState(0)

    const [offerData, setOfferData] = useState({
        activeOffers: "",
        redemption: "",
        revenue: "",
        isOfferData: false
    })
    const [heatMapData, setHeatMapData] = useState([])
    const [startDate, setStartDate] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])
    // const [barGraph, setBarGraph] = useState(false)
    const outletData = getCurrentOutlet()
    console.log(setHeatMapData, heatMapData)
    // const [endDate, setEndDate] = useState("")
    console.log(setStartDate)

    console.log("adas:", startDate, moment(startDate[0]).subtract(7, 'd').format("YYYY-MM-DD"))

    const getHeatMapData = () => {
        const form_data = new FormData()
        form_data.append("app", "superleadz")
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("start_date", moment(startDate[0]).format("YYYY-MM-DD"))
        form_data.append("end_date", moment(startDate[1]).format("YYYY-MM-DD"))

        fetch(`${SuperLeadzBaseURL}/api/v1/customer_visitor_data/`, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            const subArray = new Array()
            const refArray = new Array()
            data?.cust_hour_wise_visit?.map(ele => {
                if (!refArray.includes(ele.visit_date)) {
                    subArray.push({ date: ele.visit_date, data: [{ x: ele.hour, y: ele.cust_visit }] })
                    refArray.push(ele.visit_date)
                } else {
                    subArray[refArray.indexOf(ele.visit_date)].data.push({ x: ele.hour, y: ele.cust_visit })
                }
            })
            // setHeatMapData(subArray)
            console.log("arrays", subArray, refArray)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getHeatMapData()
    }, [startDate])

    const getTableData = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/get/getdisc/`, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            const useableData = data.data.codeDiscountNodes.nodes
            console.log(data)
            setTableData(useableData)
            setIsLoading(false)

            // let calcRed = 0
            // let calcRev = 0
            // useableData.map((ele) => {
            //     calcRed = calcRed + (ele?.codeDiscount?.asyncUsageCount ? Number(ele?.codeDiscount?.asyncUsageCount) : 0)
            //     calcRev = calcRev + (ele?.codeDiscount?.totalSales?.amount ? Number(ele?.codeDiscount?.totalSales?.amount) : 0)
            // })
            // setRedemption(calcRed)
            // setRevenue(calcRev)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const getData = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${baseURL}/api/v1/superleadz_performance/`, {
            method: "POST",
            body: form_data
        })
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp, "pppp")
            const updateData = {
                activeOffers: resp?.active_offers,
                redemption: resp?.redemptions,
                revenue: resp?.revenue,
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })
        .catch((error) => {
            console.log(error)
            const updateData = {
                activeOffers: "",
                redemption: "",
                revenue: "",
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })

    }

    useEffect(() => {
        getData()
        getTableData()
        getHeatMapData()
    }, [])

    // ** Function to handle filter
    const handleFilter = (e) => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter((item) => {
                const startsWith =
                item?.codeDiscount?.title?.toString().toLowerCase().startsWith(value.toLowerCase()) ||
                item?.codeDiscount?.asyncUsageCount?.toString().toLowerCase().startsWith(value.toLowerCase())
      
                const includes =
                    item?.codeDiscount?.title?.toString().toLowerCase().includes(value.toLowerCase()) ||
                    item?.codeDiscount?.asyncUsageCount?.toString().toLowerCase().includes(value.toLowerCase())

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
        <h4 className='m-0'>Offer Performance</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
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
        </Col>
    </>
    const columns = [
        {
            name: "Sr. No.",
            width: "7.5%",
            cell: (row, index) => index + 1
        },
        {
            name: "Date",
            width: "25%",
            selector: (row) => moment(row.codeDiscount.createdAt).format('ddd, D MMM YYYY h:mm:ss')
            // new Date(row.codeDiscount.createdAt).toUTCString().replace("GMT", "")
        },
        {
            name: "Offer Code",
            width: "20%",
            selector: (row) => row.codeDiscount.title
        },
        {
            name: "Redemption",
            selector: (row) => row.codeDiscount.asyncUsageCount
        },
        // {
        //     name: "Revenue",
        //     selector: (row) => {
        //         const rev = row.codeDiscount.totalSales ? row.codeDiscount.totalSales.amount : "-"
        //         return rev !== "-" ? `Rs. ${rev}` : "-"
        //     }
        // },
        {
            name: "Status",
            selector: (row) => {
                return (
                    <>
                        {row.codeDiscount.status ? (
                            <span>
                                <div
                                    className="circle"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: "#388E3C",
                                        marginRight: "4px",
                                        display: "inline-block"
                                    }}></div>
                                Active
                            </span>
                        ) : (
                            <span>
                                <div
                                    className="circle"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ea5455",
                                        marginRight: "4px",
                                        display: "inline-block"
                                    }}></div>
                                Inactive
                            </span>
                        )}
                    </>
                )
            }
        }
    ]

    return (
        <>
            <div className="row match-height">
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Total Revenue"
                        data={offerData?.isOfferData ? `₹${offerData?.revenue}` : <Spinner size={'25px'} />}
                        info={`Total earnings`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Total Redemption"
                        data={offerData?.isOfferData ? offerData?.redemption : <Spinner size={'25px'} />}
                        info={`Total leads who redeemed their discount`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/563/563491.png" width="25px" />}
                        title="Active Offers"
                        data={offerData?.isOfferData ? offerData?.activeOffers : <Spinner size={'25px'} />}
                        info={`All offers active on your dashboard`}
                    />
                </div>

                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Impressions"
                        data={offerData?.Impressions ? `${offerData?.Impressions}` : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Conversions"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Conversion rate"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>

                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Engaged"
                        data={offerData?.Impressions ? `${offerData?.Impressions}` : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="CTR"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Revenue"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
            </div>
            <Row className='match-height'>
                {/* <Col md="3">
                    <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='25px' />} title="Revenue" data={isRevenue ? `₹${totalRevenue}` : '₹0.00'} info={'Total earnings'} />
                </Col> */}

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<Check width={'20px'}/>} title={<div style={{marginTop: "-14px"}}>Average Order <br/> Value</div>} data={!isLoading ? performanceData.active_campaign : <Spinner size={'25px'} />} info={`The ratio of leads who convert to customers`} />
                </div>

                <Col className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='25px' />} title={<div style={{marginTop: "-2vh"}}>Campaign <br/> Revenue</div>} data={<div>{!isLoading ? `₹${performanceData.campaign_revenue}` : <Spinner size={'25px'} />}</div>} />
                </Col>

                <Col md="6" className='d-none'>
                    <Card>
                        <CardBody>
                            {
                                chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : billing?.mainData.length === 0 ? <>
                                    <div className=" d-flex flex-column normal-card text-center">
                                        <h5>No Plan Purchased</h5>
                                        <div className='mt-1'>
                                            <Link to="/merchant/SuperLeadz/joinus/" className='btn btn-primary'>BUY NOW</Link>
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="normal-card">
                                        <div className='d-flex justify-content-between align-items-center flex-grow-1 w-100 mb-2'>
                                            {/* <img width={"25px"} src="https://static.vecteezy.com/system/resources/previews/000/512/317/non_2x/vector-wallet`-glyph-black-icon.jpg" alt="" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                            <button onClick={() => {
                                                navigate("/merchant/SuperLeadz/joinus/", { state: billing?.price })
                                            }} className='btn btn-sm btn-success text-white'>Upgrade</button>
                                        </div>
                                        {
                                            chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 style={{ borderBottom: '0px dotted lightgray', fontSize: '18px', position: "relative", cursor: 'pointer' }}>{<p style={{ color: "" }}>Your Current PLan is <span style={{ color: "#48a441", textTransform: 'capitalize' }}>{billing?.mainData[0]?.plan_id}</span></p>}<span className='position-absolute cursor-pointer' title={`Plan that you have subscribed to`} style={{ top: '-8px', right: '-16px' }}></span></h4>
                                                <div className='d-flex gap-3 align-items-center'>
                                                    <p className='position-relative' style={{ fontSize: `0.85rem`, borderBottom: '0.5px dotted lightgray;', cursor: 'pointer' }} onClick={() => navigate('/leads')}>{"Pop-ups - "}</p>
                                                    <h5 style={{ fontSize: `3rem`, cursor: "default" }}>{`${billing?.usage_count}/${billing?.usage_charge}`}</h5>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </>
                            }

                        </CardBody>
                    </Card>
                </Col>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<Check width={'25px'} />} title={<div style={{marginTop: "-30px"}}>Impressions</div>} data={!isLoading ? performanceData.impressions : <Spinner size={'25px'} />} info={`The ratio of leads who convert to customers`} />
                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<Check width={'25px'} />} title={<div style={{marginTop: "-30px"}}>Engagement</div>} data={!isLoading ? performanceData.engaged : <Spinner size={'25px'} />} info={`The ratio of leads who convert to customers`} />
                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<UserPlus width={'25px'} />} title={<div style={{marginTop: "-14px"}}>Lead Opportunities <br/> Generated</div>} data={!isLoading ? performanceData?.leadsGenerated : <Spinner size={'25px'} />} info={`Total visitors who've submitted their contact information via a SuperLeadz pop-up`} />

                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<UserPlus width={'25px'} />} title={<div style={{marginTop: "-30px"}}>Leads Generated</div>} data={!isLoading ? performanceData?.uniqueLeadsGenerated : <Spinner size={'25px'} />} info={`Total visitors who've submitted their contact information via a SuperLeadz pop-up`} />

                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<UserCheck width={'25px'} />} title={<div style={{marginTop: "-14px"}}>Verified Lead <br/> Opportunities</div>} data={!isLoading ? performanceData?.verifiedLeads : <Spinner size={'25px'} />} info={`Total leads who've verified their contact information via OTP authentication`} />

                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<UserCheck width={'25px'} />} title={<div style={{marginTop: "-30px"}}>Verified Leads</div>} data={!isLoading ? performanceData?.uniqueVerifiedLeads : <Spinner size={'25px'} />} info={`Total leads who've verified their contact information via OTP authentication`} />

                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<User width={'25px'} />} title={<>Visits</>} data={!isLoading ? performanceData?.vists : <Spinner size={'25px'} />} info={`Total website traffic (since SuperLeadz was installed - July 15th, 2023 3:55pm)`} />

                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<Users width={'25px'} />} title={<div style={{marginTop: "-14px"}}>Visitor-to-Lead <br /> Conversion Rate</div>} data={!isLoading ? `${performanceData?.vistsToLead}%` : <Spinner size={'25px'} />} info={`Proportion of visitors to your website who convert to self-qualified leads`} />
                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-pointer'>
                    <CardCom icon={<SiConvertio size={'25px'} />} title="Leads Converted" data={!isLoading ? performanceData.leadConverted : <Spinner size={'25px'} />} info={`Total leads who redeemed their discount`} />
                </div>

                <div className='col-md-6 col-xl-4 col-xxl-3 cursor-default'>
                    <CardCom icon={<Percent width={'25px'} />} title={<div style={{marginTop: "-14px"}}>Lead-to-Customer <br /> Conversion Rate</div>} data={!isLoading ? `${performanceData?.leadToCustomer}%` : <Spinner size={'25px'} />} info={`The ratio of leads who convert to customers`} />
                </div>

            </Row>
            
            <section>
                <div className="card">
                    <div className="card-body">
                        <ComTable
                            content={defferContent}
                            tableCol={columns}
                            data={tableData}
                            searchValue={searchValue}
                            filteredData={filteredData}
                            isLoading={isLoading}
                            paginationPerPage={7}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
