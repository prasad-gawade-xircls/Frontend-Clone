// ** React Imports
import { Fragment, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown, File, FileText, Grid, Share, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import { Card, Input, Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { getCurrentOutlet, pageNo } from '../../Validator'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'

const ComTable = ({ tableCol, data, searchValue, filteredData, isLoading, isDeffer, content, isExpand, ExpandableTable, custom, viewAll, isExport = false }) => {
  // ** State
    const [currentPage, setCurrentPage] = useState(0)
    const [currentEntry, setCurrentEntry] = useState(custom ? 5 : 10)
    const [isDownLoad, setIsDownLoad] = useState(false)
    const outletData = getCurrentOutlet()
    // ** Hooks
    const { t } = useTranslation()

    // ** Function to handle pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Pagination Previous Component
    const Previous = () => {
        return (
        <Fragment>
            <span className='align-middle d-none d-md-inline-block'>{t('Prev')}</span>
        </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
        <Fragment>
            <span className='align-middle d-none d-md-inline-block'>{t('Next')}</span>
        </Fragment>
        )
    }
    // ** Custom Pagination Component
    const CustomPagination = () => (
        <div className="d-flex w-100 align-items-center justify-content-between">
        <span>Showing {currentPage + 1} to {currentEntry} of {data.length} entries</span>
        <ReactPaginate
            previousLabel={<Previous size={15} />}
            nextLabel={<Next size={15} />}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? Math.ceil(filteredData.length / currentEntry) : Math.ceil(data.length / currentEntry) || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName={'pagination react-paginate pagination-sm justify-content-end pe-1 mt-1'}
        />
        </div>
    )

    const customStyles = {
        headCells: {
            style: {
              color: "#6e6b7b",
              fontSize: "14px",
              fontWeight: "600",
              borderTop: `1px solid #ebe9f1`,
              borderRight: `1px solid #ebe9f1`,
              borderLeft: `1px solid #ebe9f1`
            }
        },
        cells: {
            style: {
              fontSize: "14px",
              border: `1px solid #ebe9f1`,
              color: "#464646",
              borderTop: `none`,
              borderBottom: '1px solid #ebe9f1'
            }
        }
    }

    console.log({customStyles})
    console.log(setIsDownLoad)
    const downloadCSV = (type) => {
        console.log(type)
        // window.location.href = `${SuperLeadzBaseURL}/api/v1/get/offer/?shop=${outletData[0]?.web_url}&app_name=superleadz&export=1&data_type=${type}`
        // fetch()
        // .then((data) => data.json())
        // .then((resp) => {
        //     console.log(resp)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    return (
        <>
            <style>
                {`
                    .table-menu {
                        transform: translate(0px, 10px) !important; 
                    }
                `}
            </style>
            {
                isDeffer ? '' : <>
                
                    <Row className='justify-content-end mx-0'>
                        <Col className='d-flex align-items-center justify-content-start gap-1' md='4' sm='12'>
                            <div className='d-flex justify-content-start align-items-center gap-2'>
                            <label>
                                Show
                            </label>
                            <select className='form-control' disabled={custom} value={currentEntry}  onChange={(e) => {
                                setCurrentEntry(Number(e.target.value))
                            }} style={{ appearance: 'auto' }}>
                                {
                                custom ? <option value={5}>5</option> : pageNo.map(page => <option value={page.value}>{page.label}</option>)
                                }
                            </select>

                            </div>
                            {
                                viewAll ? <>
                                    <Link className='btn btn-primary-main' to={viewAll}>View All</Link>
                                </> : ''
                            }

                            {
                                isExport ? (
                                    <UncontrolledButtonDropdown>
                                        <DropdownToggle color='secondary' caret outline>
                                            <Share size={15} />
                                            <span className='align-middle ms-50'>Export</span>
                                        </DropdownToggle>
                                        <DropdownMenu className='table-menu'>
                                            <DropdownItem className='w-100'>
                                                <a download href={`https://apps.demo.xircls.in/api/v1/get/offer/?shop=${outletData[0]?.web_url}&app_name=superleadz&export=1&data_type=pdf`}>
                                                    <FileText size={15} />
                                                    <span className='align-middle ms-50'>CSV</span>

                                                </a>
                                            </DropdownItem>
                                            <DropdownItem className='w-100' onClick={() => downloadCSV("pdf")}>
                                                <File size={15} />
                                                <span className='align-middle ms-50'>PDF</span>
                                            </DropdownItem>
                                            <DropdownItem className='w-100' onClick={() => downloadCSV("excel")}>
                                                <Grid size={15} />
                                                <span className='align-middle ms-50'>Excel</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                ) : ''
                            }
                            
                        </Col>
                        {content}
                    </Row>
                </>
            }
        

            <div className='react-dataTable' style={{ marginTop: '20px' }}>
                {<DataTable
                key={currentEntry}
                pagination
                customStyles={customStyles}
                selectableRowsNoSelectAll
                columns={tableCol}
                className='react-dataTable'
                paginationPerPage={currentEntry ? currentEntry : 7}
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                progressPending={isLoading}
                progressComponent={<Spinner size="40px" />}
                expandableRows={isExpand}
                expandOnRowClicked={isExpand}
                expandableRowsComponent={ExpandableTable}
                />}

            </div>

            <Modal isOpen={isDownLoad} toggle={() => setIsDownLoad(!isDownLoad)}>
                <ModalHeader>Download</ModalHeader>
                <ModalBody>
                    <form id='adddomian'>
                        <div className="row">
                            <div className="col-12 mb-1">
                                <label htmlFor="number_of_rows">Number of Rows</label>
                                <select name='number_of_rows' className='form-control'>
                                    <option value="all">All</option>
                                    {
                                        pageNo.map(page => <option value={page.value}>{page.label}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-12 mb-1">
                                <label htmlFor="date">Date</label>
                                <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                    maxDate: "today", // Sets the maximum date as today
                                    mode: "range",
                                    dateFormat: "Y-m-d"
                                }} className='form-control' placeholder='Select date' />
                            </div>
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={() => setIsDownLoad(!isDownLoad)}>
                        Cancel
                    </Button>
                    <Button color='primary' onClick={() => addDomainFunc()}>
                        Download
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ComTable
