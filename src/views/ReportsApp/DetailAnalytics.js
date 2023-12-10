import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { ArrowDown, ArrowUp, BarChart2, Link, PieChart } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import { postReq } from '../../assets/auth/jwtService'
import CardCom from '../Components/SuperLeadz/CardCom'
import Spinner from '../Components/DataTable/Spinner'

export const DetailAnalytics = () => {

    const [filterType, setFilterType] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [customDate, setCustomDate] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])

    const start_Date = moment(customDate[0])
    const end_Date = moment(customDate[1])

    const options = [
        { value: 'previous_week', label: 'Previous Week' },
        { value: 'this_week', label: 'This Week' },
        { value: 'custom', label: 'custom' }
    ]

    const [reportData, setReportData] = useState({
        orders: "0",
        customers: "0",
        sales: "0",
        return_rate: "0"
    })

    console.log(filterType, customDate[0], reportData)

    const analyticsData = () => {

        setIsLoading(true)
        const currentDate = moment()
        const form_data = new FormData()
        form_data.append('next_page', "True")
        form_data.append('cursor', "")

        if (filterType === "this_week") {
            form_data.append('start date', currentDate.clone().startOf('isoWeek').format('YYYY-MM-DD'))
            form_data.append('end date', currentDate.clone().endOf('isoWeek').format('YYYY-MM-DD'))
        } else if (filterType === "previous_week") {
            form_data.append('start date', currentDate.clone().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'))
            form_data.append('end date', currentDate.clone().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'))
        } else {
            form_data.append('start date', start_Date.format('YYYY-MM-DD'))
            form_data.append('end date', end_Date.format('YYYY-MM-DD'))
        }

        postReq('getAnalyticsData', form_data)
            .then((res) => {
                console.log("dd", res)
                const updateData = {
                    orders: res?.data?.count ? res.data.count : "2"
                }

                setReportData({ ...updateData })

                setIsLoading(false)
            })

            .catch((error) => {
                console.log("ee", error)
            })
    }

    useEffect(() => {
        analyticsData()
    }, [filterType, customDate])


    return (
        <>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <div className='d-flex justify-content-between align-items-center '>
                                <h4>Detail Analytics</h4>
                                <div className='d-flex gap-1'>
                                    <select className='form-control w-100' onChange={(e) => setFilterType(e.target.value)}>
                                        {options.map((ele) => {
                                            return <option value={ele.value}>{ele.label}</option>
                                        })}
                                    </select>
                                    {filterType === 'custom' ? (
                                        <div className="custom w-100">
                                            <Flatpickr options={{
                                                maxDate: "today",
                                                mode: "range",
                                                dateFormat: "Y-m-d"
                                            }} className='form-control w-100' value={customDate} onChange={(date) => setCustomDate(date)} />

                                        </div>
                                    ) : ''
                                    }
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <div className='section-1-heading'>
                <Row>
                    <span className='h4 text-left mb-1 mt-1'>Sales</span>
                </Row>
                <Row>
                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Average order value'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.29'} data={!isLoading ? reportData?.orders : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<PieChart />} title={'Average units ordered'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.45'} data={!isLoading ? reportData?.customers : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Gross sales'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.82'} data={!isLoading ? reportData?.sales : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Product variants by gross sales'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.89'} data={!isLoading ? reportData?.return_rate : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Sales by billing location'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.29'} data={!isLoading ? reportData?.orders : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<PieChart />} title={'Sales by channel'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.45'} data={!isLoading ? reportData?.customers : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={<>{'Top product variants'}<br />{'by units sold'}</>} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.82'} data={!isLoading ? reportData?.sales : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Top selling products'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.89'} data={!isLoading ? reportData?.return_rate : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Total sales'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.89'} data={!isLoading ? reportData?.return_rate : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Total sales breakdown'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.89'} data={!isLoading ? reportData?.return_rate : <Spinner size={'25px'} />} />
                    </Col>
                </Row>

                
                <Row>
                    <span className='h4 text-left mb-1 mt-1'>Orders</span>
                </Row>
                <Row>
                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Return quantity'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.29'} data={!isLoading ? reportData?.orders : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<PieChart />} title={'Return rate'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.45'} data={!isLoading ? reportData?.customers : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Top returned products'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.82'} data={!isLoading ? reportData?.sales : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Total orders'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.89'} data={!isLoading ? reportData?.return_rate : <Spinner size={'25px'} />} />
                    </Col>
                </Row>

                
                <Row>
                    <span className='h4 text-left mb-1 mt-1'>Behavior</span>
                </Row>
                <Row>
                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Customers'} indicator={<ArrowDown size={"20px"} color={'red'} />} indiInfo={'-0.29'} data={!isLoading ? reportData?.orders : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<PieChart />} title={'Customer cohort analysis'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.45'} data={!isLoading ? reportData?.customers : <Spinner size={'25px'} />} />
                    </Col>

                    <Col className='col-sm-12 col-md-3 col-xxl-3 col-xxxl-3 cursor-pointer'>
                        <CardCom icon={<BarChart2 />} title={'Returning customer rate'} indicator={<ArrowUp size={"20px"} color={'green'} />} indiInfo={'-0.82'} data={!isLoading ? reportData?.sales : <Spinner size={'25px'} />} />
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default DetailAnalytics