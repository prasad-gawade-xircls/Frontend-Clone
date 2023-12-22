import React, { useContext, useEffect, useState } from "react"
// import ComTable from "../Components/DataTable/ComTable"
import { Button, Col, Input, Modal, ModalBody, ModalFooter, Row } from "reactstrap"
import ServerSideTable from "../Components/DataTable/ServerSide"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet, pageNo } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import moment from "moment/moment"
import { X } from "react-feather"

const Table = () => {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [currentEntry, setCurrentEntry] = useState(10)
  const [count, setCount] = useState(10)
  const [selected, setSelected] = useState([])
  const { userPermission } = useContext(PermissionProvider)
  const outletData = getCurrentOutlet()
  const [deleteMode, setDeleteMode] = useState("single")
  const [deleteModal, setDeleteModal] = useState(false)
  const [isModal, setIsModal] = useState(false)

  console.log(deleteMode)

  const deleteContent = <button onClick={() => {
    setDeleteMode("multiple")
    setDeleteModal(!deleteModal)
    setIsModal(!isModal)
  }} className="btn btn-success text-white" style={{ whiteSpace: "no-wrap" }}>Send Email</button>  //{selected.length}

  const getData = () => {
    setIsLoading(true)
    fetch(`${SuperLeadzBaseURL}/flash_accounts/all_customers/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}&page=${currentPage + 1}&size=${currentEntry}&searchValue=${searchValue}`)
      .then((data) => data.json())
      .then((resp) => {
        console.log("hh", JSON.parse(resp?.response))
        setTableData(JSON.parse(resp?.response))
        setCount(resp?.count)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (searchValue) {
      const delay = 1000
      const request = setTimeout(() => {
        getData()
      }, delay)

      return () => {
        clearTimeout(request)
      }
    }
  }, [searchValue])

  useEffect(() => {
    getData()
  }, [currentPage, currentEntry])

  const columns = [
    {
      name: 'Sr. No.',
      width: "100px",
      cell: (row, index) => index + 1 + ((currentPage) * currentEntry)
    },
    {
      name: 'Name',
      minWidth: '190px',
      selector: row => `${row?.fields?.first_name ? row?.fields?.first_name : ''} ${row?.fields?.last_name}`
    },
    {
      name: 'Email',
      minWidth: '300px',
      selector: row => row?.fields?.email
    },
    {
      name: 'Sign-up Date',
      minWidth: '150px',
      selector: row => moment(row?.fields?.created_at).format("YYYY-MM-DD")
    },
    {
      name: ('Purchase Count'),
      minWidth: '30px',
      selector: row => row?.fields?.purchase_count
    },
    // {
    //   name: ('Customer type'),
    //   minWidth: '180px',
    //   selector: row => row?.fields?.is_guest ? "Guest" : ""
    // },
    {
      name: 'Sign up Status',
      minWidth: '180px',
      cell: (row) => {
        return row?.fields?.is_guest === false ? (
          <span>Completed</span>
        ) : (
          <span>Not Completed</span>
        )
      }
    },
    {
      name: 'Opt-In',
      minWidth: '100px',
      cell: (row) => {
        const list = []
        if (row?.fields?.is_email) {
          list.push("Email")
        }
        if (row?.fields?.is_sms) {
          list.push("SMS")
        }

        return row?.fields?.is_guest === false ? <>
          {
            list?.map((cur, key) => {
              return (key + 1) === list.length ? cur : `${cur}, `
            })
          }
        </> : "--"
      }
    }
    // {
    //   name: ' SMS Opt-In',
    //   minWidth: '100px',
    //   cell: (row) => {
    //     return row?.fields?.is_guest === false ? <>
    //       {
    //         row?.fields?.is_sms ? (
    //           <>
    //             <span
    //               style={{
    //                 backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"
    //               }}
    //               className="badge badge-light-success"
    //             >
    //               Subscribed
    //             </span>
    //           </>
    //         ) : <span
    //           style={{
    //             backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"
    //           }}
    //           className="badge badge-light-danger"
    //         >
    //           Unsubscribed
    //         </span>
    //       }
    //     </>  : "--"
    //   }
    // }
  ]

  const defferContent = <>
    <Row className='justify-content-end mx-0'>
      <Col className='d-flex align-items-center justify-content-start gap-1' md='4' sm='12'>
        <div className='d-flex justify-content-start align-items-center gap-2'>
          <label>
            Show
          </label>
          <select className='form-control' value={currentEntry} onChange={(e) => {
            setCurrentEntry(Number(e.target.value))
          }} style={{ appearance: 'auto' }}>
            {pageNo.map(page => <option value={page.value}>{page.label}</option>)}
          </select>
        </div>

        {
          deleteContent && selected.length > 0 ? <>
            {deleteContent}
          </> : ''
        }

      </Col>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>All Customers</h4>
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
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Col>
    </Row>
  </>
  console.log(selected)
  return (
    <>
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
            <ServerSideTable
              content={defferContent}
              tableCol={columns}
              data={tableData}
              isLoading={isLoading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentEntry={currentEntry}
              count={count}
              selectableRows={true}
              setSelectedRows={setSelected}
              deleteContent={deleteContent}
            />
          </div>
        </div>
        <Modal className='modal-dialog-centered' isOpen={isModal}>
          <div class="modal-header d-flex justify-content-between align-items-center">
            <h5 class="modal-title m-0">Are you sure you want to send the mail?</h5>
            <a onClick={() => setIsModal(!isModal)}>
              <X size={'20px'} />
            </a>
          </div>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button outline onClick={() => setIsModal(!isModal)}>
              Cancel
            </Button>
            <Button color='primary'>
              Send
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    </>
  )
}

export default Table