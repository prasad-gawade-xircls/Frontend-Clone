import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from "../Components/DataTable/ComTable"
import { getReq, postReq } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import CampaignNav from './components/CampaignNav'
import FrontBaseLoader from '../Components/Loader/Loader'


const VerifyYourEmail = () => {

  const [data, setdata] = useState([])
  const [emailList, setEmailList] = useState("")
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [textValue, setTextValue] = useState("")
  const [apiLoader, setApiLoader] = useState(false)


  const handleFilter = e => {
      const value = e.target.value
      let updatedData = []
      setSearchValue(value)
  
      if (value.length) {
        updatedData = data.filter(item => {
          const startsWith =
            item.email_id.toLowerCase().startsWith(value.toLowerCase())
  
          const includes =
            item.email_id.toLowerCase().includes(value.toLowerCase())
  
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
      <h4 className='m-0'>Verified Email</h4>
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

  const getData = () => {
    getReq('verifyEmail')
    .then((resp) => {
      console.log(resp)
      setdata(resp?.data?.data?.oulet_email)
      setEmailList(resp?.data?.data?.sender)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  }

  const emailStatusChange = (e, email_id) => {
    setApiLoader(true)
    const form_data = new FormData()
    // form_data.append('email_to_verify', email_id)
    form_data.append('email_to_toggle', email_id)
    form_data.append('activate_status', e.target.checked ? "1" : "0")
    console.log(e.target.checked)
    postReq('verifyEmail', form_data)
    .then((resp) => {
      toast.success(resp.data.message)
      getData()
      setApiLoader(false)
    })
    .catch((error) => {
      console.log(error)
      setApiLoader(false)
      toast.error("Something went wrong!")
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      name: 'Sr No.',
      cell: (row, index) => index + 1,
      width: '90px'
    },
    {
        name: 'Email Id',
        minWidth: '200px',
        selector: row => row.email_id
    },
    {
        name: 'Verfication Status',
        cell: (row) => {
          return (
              row.is_verified ? <>
                <span className="badge badge-light-primary">Verified</span>
              </> : <>
                <span className="badge badge-light-danger">Not Verified</span>
              </>
                
          )
          
        }
    },
    {
        name: 'Activate Sender ID',
        cell: (row) => {
          return (
            <>
              <div className='form-check form-switch form-check-primary mb-1 cursor-pointer'>
                <Input type='checkbox' id='verify' defaultChecked={emailList === row.email_id} onChange={(e) => emailStatusChange(e, row.email_id)} />
              </div>
            </>
          )
        }
    }
  ]

  const verifyEmail = () => {
    setApiLoader(true)

    if (textValue) {
      document.getElementById('textValue_val').innerHTML = ""
      const form_data = new FormData()
      form_data.append("email_to_verify", textValue)
      postReq('verifyEmail', form_data)
      .then((resp) => {
        console.log(resp)
        getData()
        setApiLoader(false)

        toast.success(`Verification email has been sent to ${textValue}`)
        setTextValue("")
      })
      .catch((error) => {
        console.log(error)
        setApiLoader(false)
        
        toast.success("Something went wrong!")
      })

    } else {
      setApiLoader(false)

      document.getElementById('textValue_val').innerHTML = "Please enter your email"
    }
  }


  return (
    <Row className="match-height">
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      <Col md="3">
          <Card>
              <CardBody>
                  <CampaignNav />
              </CardBody>
          </Card>
      </Col>
      <Col md="9">
        <Card>
          <CardBody>
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <input type='text' className='form-control' value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <a style={{whiteSpace: 'nowrap'}} className='btn btn-primary' onClick={() => verifyEmail()}> Click to Get Verification mail </a>
            </div>
            <p id="textValue_val" className="text-danger m-0 p-0 vaildMessage"></p>
            <Row className='mt-2'>
                <ComTable
                  // tableName="Verified Email"
                  content={defferContent}
                  tableCol={columns}
                  data={data}
                  searchValue={searchValue}
                  // handleFilter={handleFilter}
                  filteredData={filteredData}
                  isLoading={isLoading}
                />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  )
}

export default VerifyYourEmail