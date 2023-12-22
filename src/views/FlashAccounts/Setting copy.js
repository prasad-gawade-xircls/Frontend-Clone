import React, { useContext, useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import toast from "react-hot-toast"
import axios from "axios"
import Form from "./Form"

const Setting = () => {
  const [toggle, setToggle] = useState(false)
  const outletDetail = getCurrentOutlet()
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
      toast.success(resp?.data?.message)
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
  }, [])

  return (
    <>
        <div className="row">
            <div className="col-12">
                <div className="card">
                  <div className="card-body d-flex justify-content-between align-items-center">
                      <h4 className="m-0">Settings</h4>
                      <div className="form-check-success form-switch cusor-pointer">
                          <input className="form-check-input" type="checkbox" role="switch" id="form-switch" onClick={(e) => changeStatus(e)} checked={toggle} />
                          <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px', whiteSpace: 'nowrap' }}>Plugin Setting</label>
                      </div>
                  </div>
                </div>
            </div>
            {
              toggle ? <Form /> : ''
            }
        </div>
    </>
  )
}

export default Setting