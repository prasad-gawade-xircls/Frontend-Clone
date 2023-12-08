import React, { useContext, useEffect, useState } from "react"
import { BarChart2, RefreshCcw, User } from "react-feather"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import axios from "axios"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState({
    dataCount: ""
  })

  const outletDetail = getCurrentOutlet()
  const { userPermission } = useContext(PermissionProvider)
  // console.log(setToggle)
  const getData = () => {
    axios.get(`${SuperLeadzBaseURL}/api/v1/change-app-status/?shop=${outletDetail[0]?.web_url}&app=${userPermission?.appName}`)
    .then((resp) => {
      console.log(resp)
      setToggle(resp?.data?.status)
      const updatedData = {
        data: ""
      }

      setData((preData) => ({
        ...preData,
        ...updatedData
      }))
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
            <div className="card-body d-flex justify-content-between">
                <h4 className="m-0">Dashboard</h4>
                <div className="form-check-success form-switch cusor-pointer">
                    <input className="form-check-input" type="checkbox" role="switch" id="form-switch" onClick={(e) => changeStatus(e)} checked={toggle} />
                    <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px', whiteSpace: 'nowrap' }}>Plugin Setting</label>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <User size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <p className="me-5 h5 card-text">New Accounts Created</p>
                <h3>
                  {data.dataCount?.new_account_created ? data.dataCount?.new_account_created : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body ">
              <BarChart2 size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <p className="me-5 h5 card-text">Revenue Generation from</p>
                <h3>
                  {data.dataCount?.revenue_generated_form ? data.dataCount?.revenue_generated_form : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <RefreshCcw size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <p className="me-0 h5 card-text">Registered Customers</p>
                <h3>
                  {data.dataCount?.registered_customer ? data.dataCount?.registered_customer : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
