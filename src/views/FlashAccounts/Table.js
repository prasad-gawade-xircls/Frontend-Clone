import React, { useEffect, useState } from "react"
import ComTable from "../Components/DataTable/ComTable"
import { Col, Input } from "reactstrap"

const Table = () => {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    // Simulating static data
    const staticData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        signUpDate: "2023-07-01",
        purchaseCount: 5,
        emailOpt: true,
        smsOpt: false,
        whatsappOpt: true
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        signUpDate: "2023-07-02",
        purchaseCount: 3,
        emailOpt: true,
        smsOpt: true,
        whatsappOpt: false
      }
      // Add more static data entries here
    ]

    setTableData(staticData)
    setIsLoading(false)
  }, [])

  const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.seller_ref_code.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.seller_ref_code.toLowerCase().includes(value.toLowerCase())

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
    {
      name: (
        <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>
          Sr No.
        </p>
      ),
      width: "100px",
      cell: (row, index) => index + 1
    },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>Name</p>
    //   ),
    //   selector: "name"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>Email ID</p>
    //   ),
    //   selector: "email"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>Sign Up Date</p>
    //   ),
    //   selector: "signUpDate"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>Purchase count</p>

    //   ),
    //   selector: "purchaseCount"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}> Email Opt</p>
    //   ),
    //   selector: "emailOpt"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>SMS Opt</p>
    //   ),
    //   selector: "smsOpt"
    // },
    // {
    //   name: (
    //     <p className="fw-bolder" style={{ fontSize: "0.95rem" }}>Whatsapp Opt</p>
    //   ),
    //   selector: "whatsappOpt"
    // }
    {
        name: 'Email ID',
        selector: row => row.offer_name
    },
    {
      name: 'Sign Up Date',
      minWidth: '200px',
      selector: row => row.offer_name
    },
    {
        name: 'Purchase count',
        minWidth: '200px',
        selector: row => row.offer_name
      },
      {
        name: 'Email Opt',
        minWidth: '200px',
        selector: row => row.offer_name
      },
      {
        name: 'SMS Opt',
        minWidth: '200px',
        selector: row => row.offer_name
      },
      {
        name: 'Whatsapp Opt',
        minWidth: '200px',
        selector: row => row.offer_name
      }
  ]

  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Registered Customers</h4>
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

  return (
    <>
      <section>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h3 style={{ marginTop: "9px" }}>Registered Customers</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="card">
          <div className="card-body">
            {/* <ComTable
              tableName="Registered Customers"
              tableCol={columns}
              data={filteredData.length ? filteredData : tableData}
              searchValue={searchValue}
              handleFilter={handleFilter}
              paginationPerPage={2}
              isLoading={isLoading}
            /> */}
            <ComTable
                content={defferContent}
                tableCol={columns}
                data={tableData}
                searchValue={searchValue}
                filteredData={filteredData}
                isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Table