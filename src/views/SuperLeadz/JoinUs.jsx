import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import axios from "axios"
import { CheckCircle, Circle } from "react-feather"
import pig from "../../assets/images/website-slide/pricing/pig.png"
import money from "../../assets/images/website-slide/pricing/grow.png"
import pro from "../../assets/images/website-slide/pricing/pro.png"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet } from "../Validator"
import Spinner from "../Components/DataTable/Spinner"
import { useLocation, useNavigate } from "react-router-dom"
import PricingCard from "./components/PricingCard"

const JoinUs = () => {
    // const [activeCard, setActiveCard] = useState()
    const [planData, setPlanData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState("grow plan")
    // console.log(activeCard)
    const outletData = getCurrentOutlet()
    const callPlans = (id) => {
        // e.preventDefault()
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/billing/`)
        const form = {
            app: "superleadz",
            shop: outletData[0]?.web_url,
            billing_plan_id: id
        }
        const formData = new FormData()
        Object.entries(form).map(([key, value]) => {
            formData.append(key, value)
        })
        axios({
            method: "POST",
            data: formData,
            url
        })
        .then((data) => {
            console.log(
                data.data.response.recurring_application_charge.confirmation_url
            )
            if (data?.data?.response) {
                window.open(data.data.response.recurring_application_charge.confirmation_url)
            }
        })
        .catch((error) => console.log(error))
    }

    // const handleCardClick = (card) => {
    //     setActiveCard(card === activeCard ? null : card)
    // }

    const getBilling = () => {

        fetch(`${SuperLeadzBaseURL}/api/v1/get/billing/?app=superleadz`)
            .then((resp) => resp.json())
            .then((data) => {
                setPlanData(data?.billing_cards)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })

    }

    useEffect(() => {
        getBilling()
        console.log(location, "location")
    }, [])

    return (
        <>
            <style>
                {` 
                    .action {
                        width: 90%;
                        position: absolute;
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .points {
                        margin-bottom: 38px
                    }
                `}
            </style>


            <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end align-items-center">
                                <a className="btn btn-outline-primary" onClick={() => {
                                  navigate("/merchant/SuperLeadz/joinus/")
                                }}>Show All Plans</a>
                            </div>
                            <div className="textContent text-center pt-3">
                                <h2 className="pb-1" style={{ fontSize: '2rem' }}>Choose a Plan</h2>
                                <p> Commit to a lifetime of effortless lead capture & conversion. <br /> Scale as you grow. We promise you'll make more than you pay us (or we'll cut you a check, really).</p>

                            </div>
                            <Row className="mb-2">
                                <Col className="col-lg-10 col-md-12 offset-lg-1 mt-3">
                                    <div className="row justify-content-center match-height">
                                        {
                                            isLoading ? <div className="d-flex justify-content-center align-items-center">
                                                <Spinner size={'40px'} />
                                            </div> : planData?.map((cur) => {
                                                return cur.plan_name === 'lite plan' ? <>
                                                    <PricingCard id={cur.id} title='Lite' price={cur.app_price} planTitle="lite plan" selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} imgSrc={pig} callPlans={callPlans} btnCondition={Number(location?.state) <= Number(cur.app_price)} features={["7,500 pop-up views"]} popular={false} />
                                                    {/* <div className="col-lg-3 col-md-6">
                                                        <div className={`card cursor-pointer ${selectedPlan === 'lite plan' ? 'border-primary' : ''}`} onClick={() => setSelectedPlan('lite plan')} style={{ border: '1px solid #dddde0' }}>
                                                            <div className="card-body pt-2 pb-2 text-center">
                                                                <div className="image" style={{ padding: '24px' }}>
                                                                    <img width="140px" style={{ marginBottom: '20px' }} height="140px" src={pig} alt="" />
                                                                    <h4>Lite</h4>
                                                                    <p className="m-0" style={{ fontSize: '15px' }}>Great for starting out</p>
                                                                </div>

                                                                <div className="pricing" style={{ padding: '0px 24px 24px' }}>
                                                                    <h2 style={{ fontSize: '3rem', lineHeight: '1' }} className="position-relative d-inline text-primary">
                                                                        <sup className="text-dark" style={{ position: 'absolute', top: '8px', left: '-10px', fontSize: '.8125rem' }}>$</sup>
                                                                        {cur.app_price}
                                                                    </h2>
                                                                    <sup className="text-dark mb-0" style={{ fontSize: '.8125rem', marginLeft: '5px' }}>/month</sup>
                                                                </div>
                                                                <div className="points" style={{ padding: '0px 24px 24px' }}>
                                                                    <div className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                                                        <Circle size={11} fill="#464646" stroke="#464646"  />
                                                                        <h5 className="m-0" style={{ fontSize: '15px', textAlign: "left" }}>7,500 pop-up views</h5>
                                                                    </div>

                                                                </div>
                                                                <div className="action">
                                                                    {
                                                                        Number(location?.state) <= Number(cur.app_price) ? (
                                                                            <a className={`btn ${selectedPlan === 'lite plan' ? 'bg-primary text-white' : 'bg-light-primary text-primry'} w-100 btn-block`} onClick={() => callPlans(cur.id)}>Buy Now</a>
                                                                        ) : (
                                                                            <a className="btn bg-light-secondary w-100 text-primary btn-block">Buy Now</a>
                                                                        )
                                                                    }
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </> : cur.plan_name === 'grow plan' ? <>
                                                    <PricingCard id={cur.id} title='Grow' price={cur.app_price} planTitle="grow plan" selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} imgSrc={money} callPlans={callPlans} btnCondition={Number(location?.state) <= Number(cur.app_price)} features={["25,000 pop-up views"]} popular={true} />
                                                    {/* <div className="col-lg-3 col-md-6">
                                                        <div className={`card position-relative ${selectedPlan === 'grow plan' ? 'border-primary' : ''}`} onClick={() => setSelectedPlan('grow plan')} style={{ border: '1px solid #dddde0' }}>
                                                            <span className="badge bg-light-primary" style={{ position: 'absolute', top: '15px', right: '15px' }}>Popular</span>
                                                            <div className="card-body pt-2 pb-2 text-center">
                                                                <div className="image" style={{ padding: '24px' }}>
                                                                    <img width="140px" style={{ marginBottom: '20px' }} height="140px" src={money} alt="" />
                                                                    <h4>Grow</h4>
                                                                    <p className="m-0" style={{ fontSize: '15px' }}>For small to medium businesses</p>
                                                                </div>

                                                                <div className="pricing" style={{ padding: '0px 24px 24px' }}>
                                                                    <h2 style={{ fontSize: '3rem', lineHeight: '1' }} className="position-relative d-inline text-primary">
                                                                        <sup className="text-dark" style={{ position: 'absolute', top: '8px', left: '-10px', fontSize: '.8125rem' }}>$</sup>
                                                                        {cur.app_price}
                                                                    </h2>
                                                                    <sup className="text-dark mb-0" style={{ fontSize: '.8125rem', marginLeft: '5px' }}>/month</sup>
                                                                </div>
                                                                <div className="points" style={{ padding: '0px 24px 24px' }}>
                                                                    <div className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                                                        <Circle size={11} fill="#464646" stroke="#464646"  />
                                                                        <h5 className="m-0" style={{ fontSize: '15px', textAlign: "left" }}>25,000 pop-up views</h5>
                                                                    </div>
                                                                
                                                                </div>
                                                                <div className="action">
                                                                    {
                                                                        Number(location?.state) <= Number(cur.app_price) ? (
                                                                            <a className={`btn ${selectedPlan === 'grow plan' ? 'bg-primary text-white' : 'bg-light-primary text-primry'} w-100 btn-block`} onClick={() => callPlans(cur.id)}>Buy Now</a>
                                                                        ) : (
                                                                            <a className="btn bg-light-secondary w-100 text-primary btn-block">Buy Now</a>
                                                                        )
                                                                    }
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </> : cur.plan_name === 'pro plan' ? <>
                                                    <PricingCard id={cur.id} title='Pro' price={cur.app_price} planTitle="pro plan" selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} imgSrc={pro} callPlans={callPlans} btnCondition={Number(location?.state) <= Number(cur.app_price)} features={["125,000 pop-up views", "Remove XIRCLS branding"]} popular={false} />
                                                    {/* <div className="col-lg-3 col-md-6">
                                                        <div className={`card cursor-pointer ${selectedPlan === 'pro plan' ? 'border-primary' : ''}`} onClick={() => setSelectedPlan('pro plan')} style={{ border: '1px solid #dddde0' }}>
                                                            <div className="card-body pt-2 pb-2 text-center">
                                                                <div className="image" style={{ padding: '24px' }}>
                                                                    <img width="140px" style={{ marginBottom: '20px' }} height="140px" src={pro} alt="" />
                                                                    <h4>Pro</h4>
                                                                    <p className="m-0" style={{ fontSize: '15px' }}>For growth-stage companies</p>
                                                                </div>

                                                                <div className="pricing" style={{ padding: '0px 24px 24px' }}>
                                                                    <h2 style={{ fontSize: '3rem', lineHeight: '1' }} className="position-relative d-inline text-primary">
                                                                        <sup className="text-dark" style={{ position: 'absolute', top: '8px', left: '-10px', fontSize: '.8125rem' }}>$</sup>
                                                                        {cur.app_price}
                                                                    </h2>
                                                                    <sup className="text-dark mb-0" style={{ fontSize: '.8125rem', marginLeft: '5px' }}>/month</sup>
                                                                </div>
                                                                <div className="points" style={{ padding: '0px 24px 24px' }}>
                                                                    <div className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                                                        <Circle size={11} fill="#464646" stroke="#464646" />
                                                                        <h5 className="m-0" style={{ fontSize: '15px', textAlign: "left" }}>125,000 pop-up views</h5>
                                                                    </div>
                                                                    <div className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                                                        <Circle size={11} fill="#464646" stroke="#464646" />
                                                                        <h5 className="m-0" style={{ fontSize: '15px', textAlign: "left" }}>Remove XIRCLS branding</h5>
                                                                    </div>

                                                                </div>
                                                                <div className="action">
                                                                    {
                                                                        Number(location?.state) <= Number(cur.app_price) ? (
                                                                            <a className={`btn ${selectedPlan === 'pro plan' ? 'bg-primary text-white' : 'bg-light-primary text-primry'} w-100 btn-block`} onClick={() => callPlans(cur.id)}>Buy Now</a>
                                                                        ) : (
                                                                            <a className="btn bg-light-secondary w-100 text-primary btn-block">Buy Now</a>
                                                                        )
                                                                    }
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </> : cur.plan_name === 'free' ? <>
                                                    <PricingCard id={cur.id} title='Forever Free' price={cur.app_price} planTitle="free" selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} imgSrc={pro} callPlans={callPlans} btnCondition={Number(location?.state) <= Number(cur.app_price)} features={["1,000 pop-up views"]} popular={false} />
                                                    {/* <div className="col-lg-3 col-md-6">
                                                        <div className={`card cursor-pointer ${selectedPlan === 'free' ? 'border-primary' : ''}`} onClick={() => setSelectedPlan('free')} style={{ border: '1px solid #dddde0' }}>
                                                            <div className="card-body pt-2 pb-2 text-center">
                                                                <div className="image" style={{ padding: '24px' }}>
                                                                    <img width="140px" style={{ marginBottom: '20px' }} height="140px" src={pro} alt="" />
                                                                    <h4>Forever Free</h4>
                                                                    <p className="m-0" style={{ fontSize: '15px' }}>&nbsp;</p>
                                                                </div>

                                                                <div className="pricing" style={{ padding: '0px 24px 24px' }}>
                                                                    <h2 style={{ fontSize: '3rem', lineHeight: '1' }} className="position-relative d-inline text-primary">
                                                                        <sup className="text-dark" style={{ position: 'absolute', top: '8px', left: '-10px', fontSize: '.8125rem' }}>$</sup>
                                                                        {cur.app_price}
                                                                    </h2>
                                                                    <sup className="text-dark mb-0" style={{ fontSize: '.8125rem', marginLeft: '5px' }}>/month</sup>
                                                                </div>
                                                                <div className="points" style={{ padding: '0px 24px 24px' }}>
                                                                    <div className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                                                        <Circle size={11} fill="#464646" stroke="#464646" />
                                                                        <h5 className="m-0" style={{ fontSize: '15px', textAlign: "left" }}>1,000 pop-up views</h5>
                                                                    </div>

                                                                </div>
                                                                <div className="action">
                                                                    {
                                                                        Number(location?.state) <= Number(cur.app_price) ? (
                                                                            <a className={`btn ${selectedPlan === 'free' ? 'bg-primary text-white' : 'bg-light-primary text-primry'} w-100 btn-block`} onClick={() => callPlans(cur.id)}>Buy Now</a>
                                                                        ) : (
                                                                            <a className="btn bg-light-secondary w-100 text-primary btn-block">Buy Now</a>
                                                                        )
                                                                    }
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </> : ""

                                            })
                                        }

                                    </div>
                                </Col>
                            </Row>
                            {/* <hr />
                            <div className="row page-pricing-free-trial-banner-bg">
                                <div className="col-md-10 col-12 d-flex align-center flex-md-row flex-column position-relative mx-auto">
                                    <div className="text-center text-md-start py-10 px-10 px-sm-0">
                                        <h3 className="text-h3 text-primary mb-2">
                                            Looking for Enterprise
                                        </h3>
                                        <p className="text-sm">
                                            You will get full access to all the features for 14 days.
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-4"
                                        >
                                            <span className="btn__content" data-no-activator="">
                                                Contact us
                                            </span>
                                        </button>
                                    </div>
                                    <div className="free-trial-illustrator">
                                        <div className="responsive img" style={{ width: 230 }}>
                                            <div
                                                className="responsive__sizer"
                                                style={{ paddingBottom: "113.636%" }}
                                            ></div>
                                            <img
                                                className="img__img img__img--contain"
                                                src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/laptop-girl-35162850.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <Row className="mt-3 mb-2">
                                <div className="text-center">
                                    <h4 className="mb-1">Overage (all plans): $0.001 / pop-up</h4>
                                    <h5 className="mb-1"><b>Enterprise</b></h5>
                                    <p className="mb-0"><u>Contact us</u> for enterprise-level customisation & pricing</p>
                                </div>
                            </Row> */}
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default JoinUs
