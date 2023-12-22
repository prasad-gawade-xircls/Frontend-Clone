import React, { useContext, useEffect, useState } from "react"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import toast from "react-hot-toast"
import axios from "axios"
import Form from "./Form"
import Select from 'react-select'
import { ArrowLeft, ChevronUp, Settings, Type } from "react-feather"
import { Row, Col, Card, CardBody, Container, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap"
import CustomColorModifier from "../FormBuilder/FormBuilder(components)/CustomColorModifier"
import FrontBaseLoader from "../Components/Loader/Loader"
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import "./Form.css"
import { MdAttachEmail, MdOutlineRadioButtonChecked } from "react-icons/md"
import { GoHeading } from "react-icons/go"
import BasicEditor from "../Components/Editor/BaseEditor"
import Editor from "../NewCustomizationFlow/Editor"
import { useNavigate } from "react-router"
// import Editor from "../NewCustomizationFlow/Editor"

const Setting = () => {
  const [toggle, setToggle] = useState(false)
  const [editorBar, setEditorBar] = useState(true)
  const outletDetail = getCurrentOutlet()
  const [sideNav, setSideNav] = useState('Header')
  const outletData = getCurrentOutlet()
  const [openPage, setOpenPage] = useState(true)

  const navigate = useNavigate()


  const fontStyles = [
    { label: "Abril Fatface", value: `Abril Fatface` },
    { label: "Acme", value: `Acme` },
    { label: "Caveat", value: `Caveat` },
    { label: "Dancing Script", value: `Dancing Script` },
    { label: "Kalam", value: `Kalam` },
    { label: "Lato", value: `Lato` },
    { label: "Lexend", value: `Lexend` },
    { label: "Lilita One", value: `Lilita One` },
    { label: "Montserrat", value: `Montserrat` },
    { label: "Noto Sans", value: `Noto Sans` },
    { label: "Open Sans", value: `Open Sans` },
    { label: "Oswald", value: `Oswald` },
    { label: "Pacifico", value: `Pacifico` },
    { label: "Play", value: `Play` },
    { label: "Roboto", value: `Roboto` },
    { label: "Satisfy", value: `Satisfy` },
    { label: "sans-serif", value: `sans-serif` },
    { label: "Ubuntu", value: `Ubuntu` }
  ]

  const FONT_SIZE_OPTIONS = [
    { label: '10px', value: '10px' },
    { label: '11px', value: '11px' },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '14px', value: '14px' },
    { label: '15px', value: '15px' },
    { label: '16px', value: '16px' },
    { label: '17px', value: '17px' },
    { label: '18px', value: '18px' },
    { label: '19px', value: '19px' },
    { label: '20px', value: '20px' },
    { label: '21px', value: '21px' },
    { label: '22px', value: '22px' },
    { label: '23px', value: '23px' },
    { label: '24px', value: '24px' },
    { label: '25px', value: '25px' }
  ]

  const defaultData = {
    page_1: {
      heading: `Activate your FREE membership today!`,
      sub_heading: `Just submit a password to activate your account. There are NO monthly fees or ads EVER Your membership gives you access to additional new resources to help you succeed on your journey.`,
      heading_color: `#000000`,
      sub_heading_color: `#000000`,
      primary_font: "sans-serif",
      secondary_font: "sans-serif",
      button_text: "Submit",
      button_color: "#ffffff",
      button_bg_color: "#000000",
      password: "Password",
      confirm_password: "Confirm Password",
      heading_font_size: "24px",
      sub_heading_font_size: "14px",
      opt_in_email: "",
      opt_in_sms: "",
      opt_in_both: "",
      label_text_email: "Subscribe to email",
      label_text_sms: "Subscribe to sms",
      label_text_both: "Subscribe",
      email_check: true,
      sms_check: true,
      both_check: true,
      redirect_url: "",
      nextPage: false,
      email_from: "",
      subject: ""
    },
    page_2: {
      heading: `Congratulations! Your account has been activated.`,
      sub_heading: `Remember to login to track your orders, request support, see updates and more...`,
      heading_color: `#000000`,
      sub_heading_color: `#000000`,
      primary_font: "sans-serif",
      secondary_font: "sans-serif",
      button_text: "Login",
      button_color: "#ffffff",
      button_bg_color: "#000000",
      heading_font_size: "19px",
      sub_heading_font_size: "14px",
      redirect_url: ""
    },
    editorState: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 2;\",\"text\":\"Hello,\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 1;\",\"text\":\"Activate Your Account\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
    htmlContent: "<p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 2; white-space: pre-wrap;\">Hello,</strong></b></p><p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 1; white-space: pre-wrap;\">Activate Your Account</strong></b></p>"
  }

  const [currPage, setCurrPage] = useState("page_1")

  const [prevData, setPrevData] = useState(defaultData)

  const [currObj, setCurrObj] = useState(defaultData?.[currPage])

  const [apiLoader, setApiLoader] = useState(false)

  const { userPermission } = useContext(PermissionProvider)

  const getData = () => {
    axios.get(`${SuperLeadzBaseURL}/api/v1/change-app-status/?shop=${outletDetail[0]?.web_url}&app=${userPermission?.appName}`)
      .then((resp) => {
        console.log(resp)
        setToggle(resp?.data?.status)
        //   const updatedData = {
        //     data: ""
        //   }

        //   setData((preData) => ({
        //     ...preData,
        //     ...updatedData
        //   }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const changeStatus = (e) => {
    const form_data = new FormData()

    form_data.append("shop", outletDetail[0]?.web_url)
    form_data.append("app", userPermission?.appName)
    form_data.append("value", e.target.checked ? "1" : "0")
    axios.post(`${SuperLeadzBaseURL}/api/v1/change-app-status/`, form_data)
      .then((resp) => {
        console.log(resp)
        toast.success(!e.target.checked ? "Plugin Activated" : "Plugin Deactivated")
        setToggle(!e.target.checked)
      })
      .catch((error) => {
        console.log(error)
        setToggle(e.target.checked)
        toast.error("Something went wrong")
      })
  }

  useEffect(() => {
    getData()
    const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/add_template_json/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}`)
    axios({
      method: "GET",
      url
    }).then((data) => {
      console.log(data)
      if (data?.data?.error) {
        setCurrObj(defaultData)
      } else {
        setPrevData({ ...data?.data?.success })
        console.log(data.data.success)
        setCurrObj({ ...data?.data?.success?.[currPage] })

      }
    }).catch((error) => {
      console.log({ error })
      setCurrObj(defaultData)
      toast.error("Could not fetch your data, try reloading the page")
    })
  }, [])

  console.log(prevData)

  const handleDataChange = (e) => {
    const obj = { ...prevData }
    if (e.target.name?.includes("password") && e.target.name?.includes("opt_in") && e.target.name?.includes("label_text")) {
      obj.page_1[e.target.name] = e.target.value
      // if (e.target.name?.includes("opt_in") && obj?.page_1?.label_text === "") {
      //   obj.page_1.label_text = defaultLabelText[prevData?.page_1?.opt_in_type]
      // }
      setPrevData({ ...obj })
    } else {
      setPrevData({ ...prevData, [currPage]: { ...prevData?.[currPage], [e.target.name]: e.target.value } })
    }
  }

  const getColorPicker = ({ key }) => {
    return <CustomColorModifier styles={currObj} setStyles={setCurrObj} isHex={false} colorType={key} />
  }

  let saveTimer

  const handleSaveData = (e) => {
    e.preventDefault()
    setApiLoader(true)
    const timeout = 300
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const form_data = new FormData()
      const sendObj = {
        shop: outletData[0]?.web_url,
        app: userPermission?.appName,
        template_json: JSON.stringify(prevData)
      }
      Object.entries({ ...sendObj })?.map(([key, value]) => {
        form_data.append(key, value)
      })
      const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/add_template_json/`)
      axios({
        method: "POST",
        data: form_data,
        url
      }).then((data) => {
        if (data?.data?.success === "successfully updated") {
          setApiLoader(false)
          toast.success('Saved Successfully')
        }
        console.log(data)
      }).catch((error) => {
        console.log({ error })
        toast.error("There was an error while saving your data")
        setApiLoader(false)
      })
    }, timeout)
  }

  const handleSlideChange = (swiper) => {
    let pageName
    Object.keys(defaultData).forEach((key, index) => {
      if (index === swiper?.activeIndex) {
        pageName = key
      }
    })
    setCurrPage(pageName)
    setCurrObj({ ...prevData[pageName] })
  }


  useEffect(() => {
    setPrevData({ ...prevData, [currPage]: { ...currObj } })
  }, [currObj])

  console.log(sideNav, "sideNav")


  return (
    <>
      <Container fluid className='border-bottom px-0' style={{ height: "55px" }}>
        <style>
          {`
            .pages {
              background: #fff;
              color: #000
            }
            .pages.active {
              background: #000 !important;
              color: #fff !important;
            }
          `}
        </style>
        <Row className='align-items-center px-0'>
          <div className='col-md-6 d-flex justify-content-start align-items-cente'>
            <div className="card-body d-flex justify-content-start align-items-center gap-1 px-1">
              <ArrowLeft className="cursor-pointer" size={20} onClick={() => navigate(-1)} />
              <h4 className="m-0">
                {
                  toggle ? 'Deactivate Flash Accounts' : 'Activate Flash Accounts'
                }
              </h4>
              <div className="form-check-success form-switch cursor-pointer">
                <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="form-switch" onClick={(e) => changeStatus(e)} checked={toggle} />
                {/* <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px', whiteSpace: 'nowrap' }}>Plugin Setting</label> */}
              </div>
            </div>
          </div>
          {
            toggle ? <div className='col-md-6 d-flex flex-row justify-content-end align-items-center' style={{ padding: "0.5rem", gap: "0.5rem" }}>
              <div className="d-flex justify-content-center align-items-center" style={{ border: '1px solid #d8d6de', borderRadius: '0.357rem', gap: '5px' }}>
                <button onClick={(e) => handleSaveData(e, "Save")} id='saveBtn' className="btn btn-primary-main" style={{ whiteSpace: 'nowrap' }}>Save</button>
              </div>
            </div> : ''
          }

        </Row>
      </Container>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }

      {
        toggle ? (
          <>
            <div className="d-flex justify-content-center align-items-stretch border position-relative" style={{ height: "calc(100vh - 55px)" }}>
              <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem 18px", width: "100px", overflow: "auto", gap: '20px' }}>
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Header" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Header" ? "" : "Header")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <GoHeading size={'15px'} />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Header</span>
                </div>
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Sub_Header" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Sub_Header" ? "" : "Sub_Header")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <Type size={'15px'} />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Sub Header</span>
                </div>
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "button" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "button" ? "" : "button")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <MdOutlineRadioButtonChecked size={'15px'} />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Button</span>
                </div>
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "setting" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "setting" ? "" : "setting")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <Settings size="15px" />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Settings</span>
                </div>

                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Email" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Email" ? "" : "Email")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <MdAttachEmail size="15px" />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Emails</span>
                </div>
              </div>
              <div className="d-flex align-items-stretch flex-grow-1 h-100">
                <div className=" border-end bg-white position-relative h-100" style={{ width: sideNav === "" ? "0px" : "400px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                  <div className='w-100' style={{ height: "100%", overflowY: "auto" }}>
                    {sideNav === "Header" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "400px", transform: `translateX(${sideNav === "Header" ? "0px" : "-400px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.[currPage]?.heading} name="heading" type="text" className="form-control" id="heading" placeholder="Heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Primary Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.[currPage]?.primary_font)} options={fontStyles} id="primary_font" onChange={(eventData) => {
                                const e = { target: { name: "primary_font", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.[currPage]?.heading_font_size)} options={FONT_SIZE_OPTIONS} id="heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "heading_font_size", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "Sub_Header" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "400px", transform: `translateX(${sideNav === "Sub_Header" ? "0px" : "-400px"})`, position: "absolute", inset: "0px" }}>

                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.[currPage]?.sub_heading} name="sub_heading" className="form-control" id="sub_heading" placeholder="Sub-heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Secondary Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.[currPage]?.secondary_font)} options={fontStyles} id="secondary_font" onChange={(eventData) => {
                                const e = { target: { name: "secondary_font", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.sub_heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.sub_heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "sub_heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.[currPage]?.sub_heading_font_size)} options={FONT_SIZE_OPTIONS} id="sub_heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "sub_heading_font_size", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="d-flex justify-content-end align-items-center">
                              <button onClick={handleSaveData} className="btn text-white bg-black">Save</button>
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "button" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "400px", transform: `translateX(${sideNav === "button" ? "0px" : "-400px"})`, position: "absolute", inset: "0px" }}>

                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text</label>
                              <input onChange={handleDataChange} value={prevData?.[currPage]?.button_text} name="button_text" type="text" className="form-control" id="button_text" placeholder="Button Text" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.button_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.button_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "button_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.button_bg_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.button_bg_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "button_bg_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "setting" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "400px", transform: `translateX(${sideNav === "setting" ? "0px" : "-400px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Setting</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>

                            {
                              currPage === "page_1" ? (
                                <>
                                  <div className="py-1">
                                    <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Password</label>
                                    <input onChange={handleDataChange} value={prevData?.["page_1"]?.password} name="password" type="text" className="form-control" id="password" placeholder="Password" />
                                  </div>
                                  <div className="py-1">
                                    <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Confirm Password</label>
                                    <input onChange={handleDataChange} value={prevData?.["page_1"]?.confirm_password} name="confirm_password" type="text" className="form-control" id="confirm_password" placeholder="Confirm Password" />
                                  </div>
                                </>
                              ) : ''
                            }

                            
                              {currPage === "page_1" && <div className="py-1">
                                  <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                  <label style={{ fontSize: "0.85rem", marginBottom: '6px' }} htmlFor="opt_in" className="form-control-label">Opt-in</label>
                                  <div className="d-flex gap-2 flex-column">
                                    <div className="form-check cursor-pointer">
                                      <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_email === "email"} id="opt_in_email" onChange={(e) => {
                                        const updatedData = {
                                          opt_in_both: "",
                                          opt_in_email: e.target.checked ? e.target.value : ""
                                        }
                                        setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                      }} name="opt_in_email" value={"email"} className="form-check-input" /><label htmlFor="opt_in_email" className="form-check-label">Email Opt-in</label>
                                    </div>
                                    <div className="form-check cursor-pointer">
                                      <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_sms === "sms"} id="opt_in_sms" onChange={(e) => {
                                        const updatedData = {
                                          opt_in_both: "",
                                          opt_in_sms: e.target.checked ? e.target.value : ""
                                        }
                                        setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                      }} name="opt_in_sms" value={"sms"} className="form-check-input" /><label htmlFor="opt_in_sms" className="form-check-label">SMS Opt-in</label>
                                    </div>
                                    <div className="form-check cursor-pointer">
                                      <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_both === "both"} id="opt_in_both" onChange={(e) => {

                                        const updatedData = {
                                          opt_in_both: e.target.checked ? e.target.value : "",
                                          opt_in_email: "",
                                          opt_in_sms: ""
                                        }
                                        setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                      }} name="opt_in_both" value={"both"} className="form-check-input" />
                                      <label htmlFor="opt_in_both" className="form-check-label">Opt-in for marketing communication</label>
                                    </div>
                                  </div>
                                </Col>
                              </div>}
                            

                            <div className="py-1">
                              {currPage === "page_1" && (
                                <>
                                  {
                                    prevData?.page_1?.opt_in_email === "email" && (
                                      <>
                                        <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                          <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                            <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Email Text</label>
                                            <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="keep_email_check">Keep Selected by Default</label>
                                              <input id="keep_email_check" checked={prevData?.page_1?.email_check} type='checkbox' className='form-check-input m-0 p-0' name="email_check" onChange={(e) => setPrevData({ ...prevData, page_1: { ...prevData?.page_1, email_check: e.target.checked } })} />
                                            </div>
                                          </div>
                                          <input className="form-control" value={prevData?.page_1?.label_text_email} id="label_text_email" name="label_text_email" onChange={handleDataChange} />
                                        </Col>

                                      </>
                                    )
                                  }
                                  {
                                    prevData?.page_1?.opt_in_sms === "sms" && (
                                      <>
                                        <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                          <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                            <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Sms Text</label>
                                            <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="keep_sms_check">Keep Selected by Default</label>
                                              <input id="keep_sms_check" checked={prevData?.page_1?.sms_check} type='checkbox' className='form-check-input m-0 p-0' name="sms_check" onChange={(e) => setPrevData({ ...prevData, page_1: { ...prevData?.page_1, sms_check: e.target.checked } })} />
                                            </div>
                                          </div>
                                          <input className="form-control" value={prevData?.page_1?.label_text_sms} id="label_text_sms" name="label_text_sms" onChange={handleDataChange} />
                                        </Col>

                                      </>
                                    )
                                  }

                                  {
                                    prevData?.page_1?.opt_in_both === "both" && (
                                      <>
                                        <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                          <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                            <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Opt-in for marketing communication</label>
                                            <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="keep_both_check">Keep Selected by Default</label>
                                              <input id="keep_both_check" checked={prevData?.page_1?.both_check} type='checkbox' className='form-check-input m-0 p-0' name="both_check" onChange={(e) => setPrevData({ ...prevData, page_1: { ...prevData?.page_1, both_check: e.target.checked } })} />
                                            </div>
                                          </div>
                                          <input className="form-control" value={prevData?.page_1?.label_text_both} id="label_text_both" name="label_text_both" onChange={handleDataChange} />
                                        </Col>

                                      </>
                                    )
                                  }
                                </>
                              )}
                              {(!prevData?.page_1?.nextPage || currPage === "page_2") && <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                <label style={{ fontSize: "0.85rem", marginBottom: '6px' }} htmlFor="redirect_url" className="form-control-label">Button Redirect URL</label>
                                <input onChange={handleDataChange} value={prevData?.[currPage]?.redirect_url} name="redirect_url" type="text" className="form-control" id="redirect_url" placeholder="Redirect URL" />
                              </Col>}
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                        {sideNav === "Email" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "400px", transform: `translateX(${sideNav === "Email" ? "0px" : "-400px"})`, position: "absolute", inset: "0px" }}>
                          <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                            <AccordionItem>
                                <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                  <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Email</label>
                                </AccordionHeader>
                                <AccordionBody accordionId='1'>
                                  <div className="py-1">
                                    <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Email From</label>
                                    <input onChange={handleDataChange} value={prevData?.[currPage]?.email_from} name="email_from" type="text" className="form-control" id="email_from" placeholder="Email From" />
                                </div>

                                  <div className="py-1">
                                    <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Subject</label>
                                    <input onChange={handleDataChange} value={prevData?.[currPage]?.subject} name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
                                </div>
                                </AccordionBody>
                            </AccordionItem>
                          </UncontrolledAccordion>
                        </div>}

                    </div>
                  </div>

                <div id='preview-section-only' className="d-flex flex-column flex-grow-1 align-items-center bg-light-secondary position-relative">
                  <Row className="w-100">
                    <Col md="12">
                      <div className="switch d-flex justify-content-center align-items-center m-2">
                          <div className={`page_1 d-flex justify-content-center align-items-center pages ${currPage === "page_1" ? "active" : ''}`} onClick={() => setCurrPage('page_1')} style={{padding: '10px 15px', cursor: 'pointer'}}>
                            <p className="p-0 m-0">Main Page</p>
                          </div>
                          <div className={`page_2 d-flex justify-content-center align-items-center pages ${currPage === "page_2" ? "active" : ''}`} onClick={() => setCurrPage('page_2')} style={{padding: '10px 15px', cursor: 'pointer'}}>
                            <p className="p-0 m-0">Account Success Page</p>
                          </div>
                      </div>
                    </Col>
                    <div style={{ width: '630px', margin: '0 auto' }}>
                      <div className="mt-4" onClick={() => setEditorBar(!editorBar)} onBlur={() => setEditorBar(!editorBar)}>
                        {
                          sideNav === "Email" ? (
                            <>
                              <table
                                style={{ border: "1px solid #eee" }}
                                width="600px"
                                cellSpacing={0}
                                cellPadding={0}
                                border={0}
                                align="center"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{ padding: "10px 20px", lineHeight: '25px', color: "#424242" }}
                                      colSpan={2}
                                      bgcolor="#fff"
                                      align="center"
                                    >
                                      <font size={3} face="sans-serif">
                                        <div id="emailTemplateId">
                                          <BasicEditor elementId={`emailTemplateId`}
                                            style={{ width: '100%' }} key={sideNav}
                                            hideToolbar={editorBar}
                                            editorState={prevData?.editorState}
                                            htmlContent={prevData?.htmlContent}
                                            onChange={(html, ediorState) => {
                                              console.log(html, ediorState)
                                              const updatedData = {
                                                editorState: ediorState,
                                                htmlContent: html
                                              }
                                              setPrevData((pre) => ({
                                                ...pre,
                                                ...updatedData
                                              }))

                                            }}
                                          />
                                        </div>
                                      </font>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          ) : (
                            <>
                              {currPage === "page_1" ? (
                                <div className="previewSection">
                                  <div
                                    style={{
                                      padding: "40px",
                                      border: "solid 1px rgb(239, 239, 239)",
                                      boxShadow: "1px 1px 13px 3px rgba(0,0,0,0.05)",
                                      background: "white",
                                      borderRadius: "10px",
                                      width: "500px",
                                      margin: "auto",
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: prevData?.["page_1"]?.heading_color,
                                          marginTop: "0px",
                                          fontSize: prevData?.["page_1"]?.heading_font_size,
                                          fontWeight: "600",
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.primary_font
                                        }}
                                      >
                                        {prevData?.["page_1"]?.heading}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: prevData?.["page_1"]?.sub_heading_font_size,
                                          fontWeight: "300",
                                          marginTop: 10,
                                          color: prevData?.["page_1"]?.sub_heading_color,
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.secondary_font
                                        }}
                                      >
                                        {prevData?.["page_1"]?.sub_heading}
                                      </div>
                                      <div style={{ marginTop: 30, padding: "0 40px 0 0" }}>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            fontFamily: prevData?.["page_1"]?.secondary_font
                                          }}
                                        >
                                          <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                            {prevData?.["page_1"]?.password}
                                          </div>
                                          <input
                                            type="password"
                                            placeholder={prevData?.["page_1"]?.password}
                                            style={{
                                              width: "100%",
                                              border: "solid 1px rgb(185, 185, 185)",
                                              borderRadius: 5,
                                              fontSize: 14,
                                              padding: "10px 20px",
                                              marginTop: 5,
                                              outline: "none",
                                              color: "rgb(67, 67, 67)",
                                              letterSpacing: 1
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            marginTop: 20,
                                            fontFamily: prevData?.["page_1"]?.secondary_font
                                          }}
                                        >
                                          <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                            {prevData?.["page_1"]?.confirm_password}
                                          </div>
                                          <input
                                            type="password"
                                            placeholder={prevData?.["page_1"]?.confirm_password}
                                            style={{
                                              width: "100%",
                                              border: "solid 1px rgb(185, 185, 185)",
                                              borderRadius: 5,
                                              fontSize: 14,
                                              padding: "10px 20px",
                                              marginTop: 5,
                                              outline: "none",
                                              color: "rgb(67, 67, 67)",
                                              letterSpacing: 1
                                            }}
                                          />
                                        </div>
                                      </div>

                                      {
                                        prevData?.page_1?.opt_in_email === "email" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}>
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.email_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_email}</label>
                                            </div>

                                          </>
                                        )
                                      }

                                      {
                                        prevData?.page_1?.opt_in_sms === "sms" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}>
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.sms_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_sms}</label>
                                            </div>
                                          </>
                                        )
                                      }

                                      {
                                        prevData?.page_1?.opt_in_both === "both" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}>
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.both_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_both}</label>
                                            </div>
                                          </>
                                        )
                                      }

                                      <div
                                        style={{
                                          display: "grid",
                                          placeContent: "center",
                                          padding: "10px 30px",
                                          border: `solid 1px ${prevData?.["page_1"]?.button_color}`,
                                          backgroundColor: prevData?.["page_1"]?.button_bg_color,
                                          color: prevData?.["page_1"]?.button_color,
                                          fontSize: "15px",
                                          borderRadius: "5px",
                                          margin: "auto",
                                          marginTop: "25px",
                                          cursor: "pointer",
                                          fontFamily: prevData?.["page_1"]?.secondary_font
                                        }}
                                      >
                                        {prevData?.["page_1"]?.button_text}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                                      <div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '24px', fontWeight: 600, lineHeight: '25px' }}>
                                          Let us know you.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                          membership gives you access to additional new resources to help you succeed on your journey.</div>
                                        <div style={{ marginTop: '30px', padding: '0 40px 0 0' }}>
                                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                            <div htmlFor style={{ fontSize: '15px', color: 'rgb(91, 91, 91)' }}>Name</div>
                                            <input type="password" placeholder="Lisa" style={{ width: '100%', border: 'solid 1px rgb(185, 185, 185)', borderRadius: '5px', fontSize: '14px', padding: '10px 20px', marginTop: '5px', outline: 'none', color: 'rgb(67, 67, 67)', letterSpacing: '1px' }} />
                                          </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                                          <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                                            Submit
                                          </div>
                                          <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(60, 60, 60)', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                                            Skip
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                                      <div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                          Congratulations! Your account has been activated.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Remember to login to track your orders, request support, see updates and more...
                                        </div>
                                        <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', marginTop: '20px', width: '70px' }}>
                                          Login
                                        </div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                          Your membership has been activated.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                          membership gives you access to
                                        </div>
                                      </div>
                                    </div> */}
                                </div>
                              ) : (
                                <div className="previewSection">
                                  <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', margin: "auto", wordBreak: "break-word" }}>
                                    <div>
                                      <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: prevData?.["page_2"]?.heading_font_size, fontWeight: 600, lineHeight: 'auto', color: prevData?.["page_2"]?.heading_color, fontFamily: prevData?.page_2?.primary_font }}>
                                        {prevData?.["page_2"]?.heading}</div>
                                      <div style={{ fontSize: prevData?.["page_2"]?.sub_heading_font_size, fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: 'auto', color: prevData?.["page_2"]?.sub_heading_color, fontFamily: prevData?.page_2?.secondary_font }}>
                                        {prevData?.["page_2"]?.sub_heading}
                                      </div>
                                      <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: `solid 1px ${prevData?.["page_2"]?.button_color}`, backgroundColor: prevData?.["page_2"]?.button_bg_color, color: prevData?.["page_2"]?.button_color, fontSize: '15px', borderRadius: '5px', marginTop: '20px', fontFamily: prevData?.page_2?.secondary_font }}>
                                        {prevData?.["page_2"]?.button_text}
                                      </div>
                                      {/* <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                                      Your membership has been activated.</div>
                                                    <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                                      Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                                      membership gives you access to
                                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )
                        }

                      </div>
                    </div>
                  </Row>
                  {(sideNav !== "Email") && <div className="d-none" style={{ zIndex: "50000000", filter: `drop-shadow(0px 0px 15px rgba(0,0,0,0.5))`, transition: "0.3s ease-in-out", maxWidth: "100%", width: "100%", position: "absolute", bottom: "0px" }}>
                    <div className="position-relative" style={{ width: "auto" }}>
                      <span onClick={() => setOpenPage(!openPage)} className="position-absolute d-flex justify-content-center align-items-center cursor-pointer" style={{ top: "0px", left: "50%", transform: `translateX(-50%) translateY(-100%)`, padding: "0.25rem", aspectRatio: "30/9", width: "50px", borderRadius: "10px 10px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                        <ChevronUp style={{ rotate: openPage ? "-540deg" : "0deg", transition: "0.3s ease-in-out" }} size={12.5} color='#ffffff' />
                      </span>
                      <div id='page-selector d-none' style={{ overflowX: "auto", margin: "auto", borderRadius: "10px 10px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
                        <Swiper
                          direction={"horizontal"}
                          breakpoints={{
                            0: {
                              slidesPerView: 2
                            },
                            980: {
                              slidesPerView: 2
                            },
                            1440: {
                              slidesPerView: 2
                            }
                          }}
                          spaceBetween={0}
                          navigation={true}
                          loop={false}
                          modules={[Pagination, Navigation]}
                          className="mySwiper"
                          initialSlide={0}>
                          <SwiperSlide>
                            <div className="cursor-pointer pt-1">
                              <div className="cursor-pointer pt-1">
                                <div onClick={() => handleSlideChange({ activeIndex: 0 })} className={`overflow-hidden rounded position-relative bg-light-secondary ${currPage === "page_1" && openPage ? "border-dark" : ""} m-auto`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out", boxShadow: `0px 0px ${currPage === "page_1" && openPage ? "20px" : "0px"} rgba(0,0,0,0.75)` }}>
                                  <div className={`overflow-hidden d-flex justify-content-center align-items-center w-100 h-100`}>
                                    <div className="position-absolute" style={{ scale: "0.125", pointerEvents: "none", width: "auto" }}><div className="previewSection">
                                      <div
                                        style={{
                                          padding: "40px",
                                          border: "solid 1px rgb(239, 239, 239)",
                                          boxShadow: "1px 1px 13px 3px rgba(0,0,0,0.05)",
                                          background: "white",
                                          borderRadius: "10px",
                                          width: "500px",
                                          margin: "auto",
                                          wordBreak: "break-word"
                                        }}
                                      >
                                        <div>
                                          <div
                                            style={{
                                              color: prevData?.["page_1"]?.heading_color,
                                              marginTop: "0px",
                                              fontSize: prevData?.["page_1"]?.heading_font_size,
                                              fontWeight: "600",
                                              lineHeight: "auto",
                                              fontFamily: prevData?.["page_1"]?.primary_font
                                            }}
                                          >
                                            {prevData?.["page_1"]?.heading}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: prevData?.["page_1"]?.sub_heading_font_size,
                                              fontWeight: "300",
                                              marginTop: 10,
                                              color: prevData?.["page_1"]?.sub_heading_color,
                                              lineHeight: "auto",
                                              fontFamily: prevData?.["page_1"]?.secondary_font
                                            }}
                                          >
                                            {prevData?.["page_1"]?.sub_heading}
                                          </div>
                                          <div style={{ marginTop: 30, padding: "0 40px 0 0" }}>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "start",
                                                fontFamily: prevData?.["page_1"]?.secondary_font
                                              }}
                                            >
                                              <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                                {prevData?.["page_1"]?.password}
                                              </div>
                                              <input
                                                type="password"
                                                placeholder={prevData?.["page_1"]?.password}
                                                style={{
                                                  width: "100%",
                                                  border: "solid 1px rgb(185, 185, 185)",
                                                  borderRadius: 5,
                                                  fontSize: 14,
                                                  padding: "10px 20px",
                                                  marginTop: 5,
                                                  outline: "none",
                                                  color: "rgb(67, 67, 67)",
                                                  letterSpacing: 1
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "start",
                                                marginTop: 20,
                                                fontFamily: prevData?.["page_1"]?.secondary_font
                                              }}
                                            >
                                              <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                                {prevData?.["page_1"]?.confirm_password}
                                              </div>
                                              <input
                                                type="password"
                                                placeholder={prevData?.["page_1"]?.confirm_password}
                                                style={{
                                                  width: "100%",
                                                  border: "solid 1px rgb(185, 185, 185)",
                                                  borderRadius: 5,
                                                  fontSize: 14,
                                                  padding: "10px 20px",
                                                  marginTop: 5,
                                                  outline: "none",
                                                  color: "rgb(67, 67, 67)",
                                                  letterSpacing: 1
                                                }}
                                              />
                                            </div>
                                          </div>

                                          {
                                            prevData?.page_1?.opt_in_email === "email" && (
                                              <>
                                                <div
                                                  style={{
                                                    fontFamily: prevData?.["page_1"]?.secondary_font,
                                                    display: "flex",
                                                    gap: "10px",
                                                    alignItems: "center",
                                                    justifyContent: "start",
                                                    marginTop: "10px"
                                                  }}>
                                                  <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.email_check} />
                                                  <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_email}</label>
                                                </div>

                                              </>
                                            )
                                          }

                                          {
                                            prevData?.page_1?.opt_in_sms === "sms" && (
                                              <>
                                                <div
                                                  style={{
                                                    fontFamily: prevData?.["page_1"]?.secondary_font,
                                                    display: "flex",
                                                    gap: "10px",
                                                    alignItems: "center",
                                                    justifyContent: "start",
                                                    marginTop: "10px"
                                                  }}>
                                                  <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.sms_check} />
                                                  <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_sms}</label>
                                                </div>
                                              </>
                                            )
                                          }

                                          {
                                            prevData?.page_1?.opt_in_both === "both" && (
                                              <>
                                                <div
                                                  style={{
                                                    fontFamily: prevData?.["page_1"]?.secondary_font,
                                                    display: "flex",
                                                    gap: "10px",
                                                    alignItems: "center",
                                                    justifyContent: "start",
                                                    marginTop: "10px"
                                                  }}>
                                                  <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.both_check} />
                                                  <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_both}</label>
                                                </div>
                                              </>
                                            )
                                          }

                                          <div
                                            style={{
                                              display: "grid",
                                              placeContent: "center",
                                              padding: "10px 30px",
                                              border: `solid 1px ${prevData?.["page_1"]?.button_color}`,
                                              backgroundColor: prevData?.["page_1"]?.button_bg_color,
                                              color: prevData?.["page_1"]?.button_color,
                                              fontSize: "15px",
                                              borderRadius: "5px",
                                              margin: "auto",
                                              marginTop: "25px",
                                              cursor: "pointer",
                                              fontFamily: prevData?.["page_1"]?.secondary_font
                                            }}
                                          >
                                            {prevData?.["page_1"]?.button_text}
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                                      <div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '24px', fontWeight: 600, lineHeight: '25px' }}>
                                          Let us know you.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                          membership gives you access to additional new resources to help you succeed on your journey.</div>
                                        <div style={{ marginTop: '30px', padding: '0 40px 0 0' }}>
                                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                            <div htmlFor style={{ fontSize: '15px', color: 'rgb(91, 91, 91)' }}>Name</div>
                                            <input type="password" placeholder="Lisa" style={{ width: '100%', border: 'solid 1px rgb(185, 185, 185)', borderRadius: '5px', fontSize: '14px', padding: '10px 20px', marginTop: '5px', outline: 'none', color: 'rgb(67, 67, 67)', letterSpacing: '1px' }} />
                                          </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                                          <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                                            Submit
                                          </div>
                                          <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(60, 60, 60)', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                                            Skip
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                                      <div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                          Congratulations! Your account has been activated.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Remember to login to track your orders, request support, see updates and more...
                                        </div>
                                        <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', marginTop: '20px', width: '70px' }}>
                                          Login
                                        </div>
                                        <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                          Your membership has been activated.</div>
                                        <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                          Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                          membership gives you access to
                                        </div>
                                      </div>
                                    </div> */}
                                    </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-white fw-bold text-center"><span className="cursor-pointer" onClick={() => handleSlideChange({ activeIndex: 0 })}>Page 1</span></p>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="cursor-pointer pt-1">
                              <div className={`cursor-pointer pt-1 opacity-${prevData?.page_1?.nextPage ? "100" : "50"}`}>
                                <div onClick={() => {
                                  if (prevData?.page_1?.nextPage) {
                                    handleSlideChange({ activeIndex: 1 })
                                  }
                                }} className={`overflow-hidden rounded position-relative bg-light-secondary ${currPage === "page_2" && openPage ? "border-dark" : ""} m-auto`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out", boxShadow: `0px 0px ${currPage === "page_2" && openPage ? "20px" : "0px"} rgba(0,0,0,0.75)` }}>
                                  <div className={`overflow-hidden d-flex justify-content-center align-items-center w-100 h-100`}>
                                    <div className="position-absolute" style={{ scale: "0.215", pointerEvents: "none", width: "auto" }}>
                                      <div className="previewSection">
                                        <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', margin: "auto", wordBreak: "break-word" }}>
                                          <div>
                                            <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: prevData?.["page_2"]?.heading_font_size, fontWeight: 600, lineHeight: 'auto', color: prevData?.["page_2"]?.heading_color, fontFamily: prevData?.page_2?.primary_font }}>
                                              {prevData?.["page_2"]?.heading}</div>
                                            <div style={{ fontSize: prevData?.["page_2"]?.sub_heading_font_size, fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: 'auto', color: prevData?.["page_2"]?.sub_heading_color, fontFamily: prevData?.page_2?.secondary_font }}>
                                              {prevData?.["page_2"]?.sub_heading}
                                            </div>
                                            <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: `solid 1px ${prevData?.["page_2"]?.button_color}`, backgroundColor: prevData?.["page_2"]?.button_bg_color, color: prevData?.["page_2"]?.button_color, fontSize: '15px', borderRadius: '5px', marginTop: '20px', fontFamily: prevData?.page_2?.secondary_font }}>
                                              {prevData?.["page_2"]?.button_text}
                                            </div>
                                            {/* <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                                      Your membership has been activated.</div>
                                                    <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                                      Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                                      membership gives you access to
                                                    </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-white fw-bold text-center d-flex gap-1 align-items-center justify-content-center form-check form-switch"><span onClick={() => {
                                  if (prevData?.page_1?.nextPage) {
                                    handleSlideChange({ activeIndex: 1 })
                                  }
                                }} className="cursor-pointer">Page 2</span>
                                  <input className="form-check-input m-0 cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={(e) => {
                                    setPrevData({ ...prevData, page_1: { ...prevData?.page_1, nextPage: e.target.checked } })
                                    e.target.checked ? setCurrPage(currPage) : setCurrPage("page_1")
                                  }} checked={prevData?.page_1?.nextPage} /></p>
                              </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </>
        ) : ''
      }

    </>
  )
}

export default Setting