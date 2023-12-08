import React, { useEffect, useState } from 'react'
import { User, BarChart2, CheckCircle, Link } from 'react-feather'
import CardCom from '../Components/SuperLeadz/CardCom'
import { Card, CardBody, Col, Input } from 'reactstrap'
// import ComTableAdvance from '../Components/DataTable/ComTableAdvance'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import moment from 'moment/moment'
import ComTable from '../Components/DataTable/ComTable'
import Spinner from '../Components/DataTable/Spinner'

export default function SuperLeadzLeads() {

    const [tableData, setTableData] = useState([])
    const [custVisit, setCustVisit] = useState(0)
    const [verified, setVerified] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const outletData = getCurrentOutlet()

    useEffect(() => {
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app_name', "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/v1/get/offer/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("hjg", data?.data?.lead_list)
                setTableData(data?.data?.lead_list)
                setCustVisit(data?.data?.cust_visit)
                setVerified(data?.data?.verified)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })

    }, [])


    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter(item => {
              const startsWith =
                item?.email?.toLowerCase().startsWith(value.toLowerCase()) ||
                item?.state?.toLowerCase().startsWith(value.toLowerCase())
      
              const includes =
                item?.email?.toLowerCase().includes(value.toLowerCase()) ||
                item?.state?.toLowerCase().includes(value.toLowerCase())
      
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

    const columns = [
        // {
        //     name: 'Sr. No.',
        //     width: '90px',
        //     cell: (row, index) => index + 1
        // },
        {
            name: 'Date',
            minWidth: '150px',
            selector: row =>  moment(row.created_at).format('MMM D, YYYY')
        },
        {
            name: 'Time',
            minWidth: '100px',
            selector: row => moment(row.created_at).format('h:mm:ss a')
        },
        // {
        //     name: 'First Name',
        //     minWidth:'200px',
        //     selector: row => {
        //         return row.first_name ? <p title={row.first_name} className='m-0'>{row.first_name}</p> : "--"
        //     },
        //     dataType: "contact"
        // },
        // {
        //     name: 'Last Name',
        //     minWidth:'200px',
        //     selector: row => {
        //         return row.last_name ? <p title={row.last_name} className='m-0'>{row.last_name}</p> : "--"
        //     },
        //     dataType: "contact"
        // },
        {
            name: 'Email',
            minWidth:'200px',
            selector: row => row.email,
            dataType:'email'
        },
        {
            name: 'Visitor Type',
            minWidth:'15%',
            selector: row => row.visitor_type
            // cell: (row) => {
            //     return (
            //         <div className='d-flex justify-content-start align-items-start flex-column'>
            //             <span>{row.visitor_type}</span>
            //             <span style={{marginTop: '3px'}}>{row.status === "HOT" ? "Hot" : row.status === "WARM" ? "Warm" : row.status === "COLD" ? "Cold" : ""}</span>
            //         </div>
            //     )
            // }
        },
        {
            name: 'Rating',
            minWidth:'200px',
            selector: row => <span style={{marginTop: '3px'}}>{row.status === "HOT" ? "Hot" : row.status === "WARM" ? "Warm" : row.status === "COLD" ? "Cold" : ""}</span>
        },
        {
            name: 'Status',
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span>{row.is_offer ? "Verified" : "Not Verified"}</span>
                    </div>
                )
            }
            // selector: row => {
            //     const status = row.is_offer ? "Verified" : "Not Verified"
            //     return status
            // },
            // dataType: 'is_offer'
        },
        {
            name: 'State',
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <h6 style={{marginTop: '3px'}}>{row.status === "HOT" ? "Hot" : row.status === "WARM" ? "Warm" : row.status === "COLD" ? "Cold" : ""}</h6>
                    </div>
                )
            }
        }
    ]


    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Leads</h4>
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

    const ExpandedData = (data) => {
        console.log(data)
        return (
            <Card>
                <CardBody>
                    {
                        data?.data?.first_name ? <h5 className='mb-1'>First Name: {data?.data?.first_name}</h5> : ''
                    }

                    {
                        data?.data?.last_name ? <h5 className='mb-1'>Last Name: {data?.data?.last_name}</h5> : ''
                    }

                    {
                        data?.data?.email ? <h5 className='mb-1'>Email: {data?.data?.email}</h5> : ''
                    }

                    {
                        data?.data?.mobile ? <h5 className='mb-1'>Phone Number: {data?.data?.mobile}</h5> : ''
                    }

                </CardBody>
            </Card>
        )
        
    }

    return (
        <>
            <section>
                <div className="row">
                    <div className="col-4">
                        <CardCom icon={<User size='25px' />} title="Total Visitors" data={isLoading ? <Spinner size={'25px'} /> : custVisit} />
                    </div>
                    <div className="col-4">
                        <CardCom icon={<BarChart2 size='25px' />} title="Total Leads" data={isLoading ? <Spinner size={'25px'} /> : tableData?.length} />
                    </div>
                    <div className="col-4">
                        <CardCom icon={<CheckCircle size='25px' />} title="Verified Leads" data={isLoading ? <Spinner size={'25px'} /> : verified} />
                    </div>
                </div>
            </section>
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
                            isExpand={true}
                            isExport={true}
                            ExpandableTable={ExpandedData}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
