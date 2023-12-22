import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Card, CardBody } from 'reactstrap'
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai"
import BarChart from './components/BarChart'
import "./Analytics.css"
import apiData from "@src/@core/auth/jwt/api/api.json"
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Spinner from '../Components/DataTable/Spinner'
import PieChart from './components/PieChart'


const Analytics = () => {
    const rateOptions = ['5 ', '4 ', '3 ', '2 ', '1 ']

    // const [continentOption, setContinentOption] = useState('AllContinents')
    // const continentOptions = ["Africa", "Antarctica", "Asia", "Australia", "Europe", "NorthAmerica", "SouthAmerica"]

    const [startMonth, setStartMonth] = useState('0')
    const [endMonth, setEndMonth] = useState('11')
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // const [durationOption, setDurationOption] = useState('1mo 0days')
    // const durationOptions = ["1mo 0 days", "1mo 3 days", "1mo 15 days", "2mo 0 days", "2mo 10 days"]

    const [productsData, setProductsData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [labels, setLabels] = useState()
    const [data, setData] = useState()

    const options = {
        mode: "range",
        dateFormat: "F Y",
        onClose: (selectedDates) => {
            console.log(selectedDates[0].getMonth())
            console.log(selectedDates[1].getMonth())

            setStartMonth(selectedDates[0].getMonth())
            setEndMonth(selectedDates[1].getMonth())

        }
    }

    const [countryReviews, setCountryReviews] = useState([])

    useEffect(() => {
        fetch(`${apiData.d_ngrok}/top-products/?shop=quickstart-6d4c5332.myshopify.com`,
            {
                method: "GET",
                headers: {
                    'ngrok-skip-browser-warning': true
                }
            }
        )
            .then(resp => {
                if (!resp.ok) {
                    console.log("error")
                }
                return resp.json()
            }).then(data => {
                console.log("country", data)
                setProductsData({ ...data })

                setCountryReviews(data.country_reviews)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const processedData = countryReviews.map(countryObj => {
            const country = Object.keys(countryObj)[0]
            const reviews = countryObj[country]
            return { country, reviews }
        })

        setLabels(processedData.map(country => country.country))
        setData(processedData.map(country => country.reviews))
    }, [countryReviews])

    // console.log('count', labels, data)

    return (
        <>
            <Card>
                <CardBody>
                    <h4>Analytics</h4>
                </CardBody>
            </Card>
            <Row>
                <Col md="6">
                    <Card style={{ minHeight: "380px" }}>
                        <CardBody >

                            <div className=' d-flex justify-content-between align-items-center mb-1'>
                                <p className=' fw-bold '>Average Rating</p>
                                <p className=' mb-2'><span className=' fw-bolder '>{productsData.average_rating}</span> Base on <span className=' fs-5 fw-bolder'>{productsData.total_reviews}</span> publish review</p>
                            </div>

                            <div className='mt-5'>
                                {!isLoading ? (
                                    <>
                                        <ul className=' list-unstyled '>
                                            {
                                                rateOptions.map((ele, index) => {
                                                    const percentage = productsData?.ratings_data ? ((productsData?.ratings_data[rateOptions?.length - index] / productsData?.total_reviews) * 100).toFixed(2) : 0
                                                    return (
                                                        <li key={index} className="d-flex justify-content-evenly align-items-center mb-1">
                                                            <AiFillStar style={{ color: "yellow", fontSize: "20px" }} />
                                                            <span className=' fw-bold fs-5'>{rateOptions.length - index}</span>
                                                            {/* <span className=' d-block w-75 rounded-pill' style={{ height: "5px", backgroundImage: `linear-gradient(to right, yellow ${percentage}%, rgb(219, 219, 219) ${100 - percentage}%` }}></span> */}
                                                            <div class="progress w-75 ">
                                                                <div class="progress-bar bg-success" role="progressbar" style={{ width: `${percentage}%`, height: "13px" }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            {percentage}%
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>
                                ) : <div className='d-flex justify-content-center align-items-center'><Spinner size="40px" /></div>}

                            </div>

                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card style={{ minHeight: "380px" }}>
                        <CardBody>
                            <div className=' d-flex justify-content-between align-items-center'>
                                <p className=' fw-bold '>Top Review Locations</p>
                            </div>

                            <div className='mt-3 w-100 d-flex justify-content-center'>
                                {!isLoading ? (
                                    <div className='d-flex justify-content-center align-items-center mt-2' style={{ width: '270px', height: '200px' }}>
                                        {/* <DoughnutChart continent={continentOption.toLowerCase()} /> */}
                                        <PieChart labels={labels} data={data} />

                                    </div>
                                ) : <div className='d-flex justify-content-center align-items-center mt-2'><Spinner size="40px" /></div>}
                            </div>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <div className=' d-flex justify-content-between align-items-center pb-2  border-bottom'>
                        <h4>Analytics</h4>

                        <Flatpickr className='form-control' style={{ width: "200px" }} options={options} />

                    </div>


                    <h5 className=' fw-bolder  text-capitalize my-2 '>Review Growth</h5>
                    {!isLoading ? (
                        <div>

                            {
                                productsData?.monthly_reviews && (
                                    <BarChart startMonth={startMonth} endMonth={endMonth} monthData={productsData?.monthly_reviews} />
                                )
                            }
                        </div>
                    ) : <div className='d-flex justify-content-center align-items-center'><Spinner size="40px" /></div>}

                </CardBody>
            </Card>

            <Row >
                <Col xl="6">
                    <Card style={{ minHeight: "250px" }}>
                        <CardBody>
                            <p className=' fw-bold  mb-1'><span className=' fw-bolder'>Best Rated Products & Avg. Review Posted</span></p>
                            {!isLoading ? (
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th className=' text-center ' scope="col">Image</th>
                                            <th className=' text-center ' scope="col">Name</th>
                                            <th className=' text-center ' scope="col">Avg. Rating</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            productsData ? productsData?.top_products?.slice(0, 5).map(item => (
                                                <tr>
                                                    <td className=' text-center '><img src={item.image} alt="product" width={30} /></td>
                                                    <td className=' text-center '>{item.name}</td>
                                                    <td className=' text-center '>{item.average}</td>
                                                </tr>
                                            )) : <tr>"No data available"</tr>
                                        }
                                    </tbody>


                                </table>
                            ) : <div className='d-flex justify-content-center align-items-center mt-5'><Spinner size="40px" /></div>}

                            <div className='d-flex justify-content-end' style={{ marginTop: isLoading ? "100px" : "0px" }}>
                                <p className='text-end'><Link to="/merchant/rating-based-product-list">All list <AiOutlineArrowRight /></Link></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                {/* <Col xl="3" md="6">
                    <Card style={{ minHeight: "250px" }}>
                        <CardBody>
                            <div className='d-flex flex-wrap  justify-content-between align-items-center '>
                                <p className=' fw-bold  mb-1'><span className=' fw-bolder'>Avg. Duration from Product Purchase to Review Posted</span></p>
                                <div>
                                    <button className="btn btn-outline-secondary fs-6 dropdown-toggle no-border-rate" type="button" data-bs-toggle="dropdown" aria-expanded="false">{durationOption}</button>
                                    <ul className="dropdown-menu">
                                        {
                                            durationOptions.map((ele, index) => {
                                                return (
                                                    <li key={index} className=" dropdown-item cursor-pointer" onClick={() => setDurationOption(ele)}>{ele}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col> */}
                <Col xl="6">
                    <Card style={{ minHeight: "250px" }}>
                        <CardBody>
                            <p className=' fw-bold  mb-1'><span className=' fw-bolder'>Request Email Analysis -</span> Sent, Open Clicked</p>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th className=' text-center ' scope="col">Sent</th>
                                        <th className=' text-center ' scope="col">Open</th>
                                        <th className=' text-center ' scope="col">Clicked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                    </tr>
                                    <tr>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                    </tr>
                                    <tr>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                        <td className=' text-center '>X</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row style={{ minHeight: "200px" }}>

            </Row>


        </>
    )
}

export default Analytics