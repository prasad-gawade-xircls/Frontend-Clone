import React, { useContext } from 'react'
import { Lock, PlusCircle, X, Download, Trash, ChevronUp, MoreVertical, Airplay, StopCircle, Edit3, Check, Copy } from 'react-feather'
import Editor from '../NewCustomizationFlow/Editor'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import Spinner from '../Components/DataTable/Spinner'
import ReturnOfferHtml from '../NewCustomizationFlow/ReturnOfferHtml'
import { elementStyles, commonObj } from '../NewCustomizationFlow/defaultStyles'
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap'
import { ImDisplay } from 'react-icons/im'
import { PermissionProvider } from '../../Helper/Context'
import toast from 'react-hot-toast'

const RenderPreview = (props) => {
    const { outletData, slPrevBg, bgsettings, currPage, setCurrPage, currPosition, setCurrPosition, indexes, setIndexes, popPosition, bgStyles, crossStyle, values, setValues, showBrand, handleColDrop, handleDragOver, handleElementDrop, handleLayoutDrop, handleRearrangeElement, mouseEnterIndex, setMouseEnterIndex, mousePos, setMousePos, isEqual, makActive, colWise, setcolWise, setDragStartIndex, setDragOverIndex, isMobile, finalObj, setFinalObj, mobileCondition, openPage, setOpenPage, brandStyles, gotOffers, setTransfered, sideNav, setSideNav, btnStyles, offerTheme, navigate, triggerImage, gotDragOver, setGotDragOver, indicatorPosition, setIndicatorPosition, selectedOffer, setSelectedOffer, renamePage, setRenamePage, pageName, setPageName, undo } = props

    const { userPermission } = useContext(PermissionProvider)
    const setDragEnter = ({ type, position, id }) => {
        console.log(type)
        setGotDragOver({ ...position })
        const elem = document.getElementById(id)
        const { y, height } = elem?.getBoundingClientRect()

        if (mousePos.y - (y + (height / 2)) < 0) {
            setIndicatorPosition("top")
        } else {
            setIndicatorPosition("bottom")
        }
    }

    return (
        sideNav === "rules" ? (
            <>
                <style>
                    {`

                        [dir] .show > .dropdown-menu {
                            transform: translate(140px, -90px) !important;
                        }
                        .custom_dropMenu {
                            transform: translate(140px, -90px) !important;
                        }
                        .card_active {
                            border: 1px solid #000 !important;
                        }
                        .container {
                        display: block;
                        position: relative;
                        cursor: pointer;
                        padding-left: 35px !important;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        }
                        
                        .container input {
                        position: absolute;
                        opacity: 0;
                        cursor: pointer;
                        }

                        .checkmark {
                        position: absolute;
                        top: 2px;
                        left: 0;
                        height: 16px;
                        width: 16px;
                        background-color: #ffffff;
                        border-radius: 50%;
                        border: 1px solid #006aff;
                        }

                        .container:hover input ~ .checkmark {
                        }

                        .container input:checked ~ .checkmark {
                        background-color: #006aff;
                        }

                        .checkmark:after {
                        content: "";
                        position: absolute;
                        display: none;
                        }

                        .container input:checked ~ .checkmark:after {
                        display: block;
                        }

                        .container .checkmark:after {
                            top: 4px;
                            left: 4px;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background: white;
                        }
                        ul {
                        display: block;
                        list-style-type: disc;
                        margin-top: 1em;
                        margin-bottom: 1 em;
                        margin-left: 0;
                        margin-right: 0;
                        padding-left: 40px;
                        }
                        li::marker{
                        color: #006aff;
                        font-size: 20px;
                          }
                    `}
                </style>
                <div className="flex-grow-1 w-100 preview-section border-end d-flex justify-content-center align-items-stretch p-1 bg-white position-relative overflow-auto overflow-x-hidden" style={{ flexDirection: 'column' }}>
                    <div className="row w-100">
                        <div className="col-md-10 offset-md-1">
                            <Card className={`${currPosition?.selectedType === "display_frequency" ? "card_active" : ""}`} style={{ boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`, cursor: 'pointer' }}
                                onClick={() => setCurrPosition({ ...currPosition, selectedType: "display_frequency" })}
                            >
                                <CardBody>
                                    <div className="d-flex justify-content-start align-items-center gap-1">
                                        <div className="icon" style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '7px' }}>
                                            <ImDisplay size="18px" />
                                        </div>
                                        <h5 className='m-0'>Display Frequency</h5>
                                    </div>

                                </CardBody>
                            </Card>
                            <Card className={`${currPosition?.selectedType === "display_when" ? "card_active" : ""}`} style={{ boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`, cursor: 'pointer' }}
                                onClick={() => setCurrPosition({ ...currPosition, selectedType: "display_when" })}
                            >
                                <CardBody>
                                    <div className="d-flex justify-content-start align-items-center gap-1">
                                        <div className="icon" style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '7px' }}>
                                            <ImDisplay size="18px" />
                                        </div>
                                        <h5 className='m-0'>When to display</h5>
                                    </div>

                                </CardBody>
                            </Card>
                            <Card className={`${currPosition?.selectedType === "stop_display_when" ? "card_active" : ""}`} style={{ boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`, cursor: 'pointer' }}
                                onClick={() => setCurrPosition({ ...currPosition, selectedType: "stop_display_when" })}
                            >
                                <CardBody>
                                    <div className="d-flex justify-content-start align-items-center gap-1">
                                        <div className="icon" style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '7px' }}>
                                            <StopCircle size="18px" />
                                        </div>
                                        <h5 className='m-0'>When to Stop displaying</h5>
                                    </div>

                                </CardBody>
                            </Card>
                            <Card className={`${currPosition?.selectedType === "on_pages" ? "card_active" : ""}`} style={{ boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`, cursor: 'pointer' }}
                                onClick={() => setCurrPosition({ ...currPosition, selectedType: "on_pages" })}
                            >
                                <CardBody>
                                    <div className="d-flex justify-content-start align-items-center gap-1">
                                        <div className="icon" style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '7px' }}>
                                            <Airplay size="18px" />
                                        </div>
                                        <h5 className='m-0'>On Pages</h5>
                                    </div>

                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div id='preview-section-only' className="flex-grow-1 w-100 preview-section border-end d-flex justify-content-center align-items-stretch p-1 bg-white position-relative overflow-auto overflow-x-hidden">
                    <div style={{ width: isMobile ? "300px" : '100%' }} className="h-100 border d-flex flex-column align-items-stretch justify-content-start m-auto">
                        <div className='nav-bar d-flex justify-content-between align-items-center rounded-top gap-2' style={{ backgroundColor: '#D7DBDF', padding: '0.5rem' }}>
                            <div className="d-flex justify-content-start align-items-center flex-grow-1">
                                <div className='d-flex justify-content-start align-items-center bg-white rounded-pill w-100' style={{ marginLeft: '1.5rem', padding: '0.25rem 1.25rem', gap: '0.5rem', width: '30rem' }}><Lock size={12} /><span style={{ fontSize: '0.9rem' }}>{outletData[0]?.web_url || ""}</span></div>
                            </div>
                            {!isMobile && <div className='d-flex justify-content-end align-items-center' style={{ gap: '0.75rem', marginRight: '1.25rem' }}>
                                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#22c55e' }}></div>
                                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#f59e0b' }}></div>
                                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#ef4444' }}></div>
                            </div>}
                        </div>
                        <div className="flex-grow-1 position-relative" style={{ backgroundImage: `url(${slPrevBg})`, backgroundSize: '100% 100%' }}>
                            <div className="flex-grow-1 position-relative h-100" style={{ backgroundImage: `url(${slPrevBg})`, backgroundSize: '100% 100%', backgroundPosition: 'top center', overflowY: "auto", position: "relative", ...bgsettings, backgroundImage: currPage === "button" ? "none" : bgsettings?.backgroundImage, backgroundColor: currPage === "button" ? "none" : bgsettings?.backgroundColor, display: "flex", flexDirection: "column" }}>
                                <div id='preview_section' onClick={() => {
                                    setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                    setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                }} style={{ width: "100%", height: "100%", position: "relative", overflowY: "auto", display: "flex", justifyContent: popPosition?.includes("L") ? "start" : popPosition?.includes("C") ? "center" : "end", alignItems: popPosition?.includes("T") ? "start" : popPosition?.includes("M") ? "center" : "end", flexGrow: "1" }}>
                                    <div style={currPage === "button" ? { position: "relative", width: btnStyles?.width, maxWidth: btnStyles?.maxWidth, maxHeight: "100%", minHeight: btnStyles?.minHeight, marginTop: btnStyles?.marginTop, marginRight: btnStyles?.marginRight, marginBottom: btnStyles?.marginBottom, marginLeft: btnStyles?.marginLeft, borderRadius: btnStyles?.borderRadius } : { position: "relative", width: bgStyles?.width, maxWidth: bgStyles?.maxWidth, maxHeight: "100%", minHeight: bgStyles?.minHeight, marginTop: bgStyles?.marginTop, marginRight: bgStyles?.marginRight, marginBottom: bgStyles?.marginBottom, marginLeft: bgStyles?.marginLeft, borderRadius: bgStyles?.borderRadius }}>
                                        {currPage !== "button" && <X size={crossStyle?.width} height={crossStyle?.height} color={crossStyle?.color} style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "2", backgroundColor: crossStyle?.backgroundColor, borderRadius: crossStyle?.borderRadius, padding: `3px`, marginBottom: crossStyle?.marginBottom, transform: `translate(${crossStyle?.translateX}, ${crossStyle?.translateY})` }} onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrPosition({ ...currPosition, selectedType: "close" })
                                        }} />}
                                        <div id="dropZoneParent" onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                        }} onDragOver={(e) => {
                                            handleDragOver(e)
                                        }}
                                            onDrop={(e) => {
                                                const transferType = e.dataTransfer.getData("type")
                                                if (transferType !== "") {
                                                    handleLayoutDrop(e)
                                                    setIndexes(transferType.includes("col") ? { cur: colWise.length, curElem: "parent", subElem: "grandparent" } : { cur: colWise.length, curElem: "left", subElem: 0 })
                                                    setCurrPosition({ ...currPosition, id: colWise.length, selectedType: transferType.includes("col") ? "block" : transferType })
                                                    setValues(elementStyles[transferType.includes("col") ? "block" : transferType])
                                                }
                                            }} className="pop-up" style={currPage === "button" ? { position: 'relative', zIndex: '1', overflow: "visible", ...btnStyles, backgroundColor: btnStyles?.backgroundColor, backgroundImage: btnStyles?.backgroundImage, width: "100%", maxWidth: "100%", marginTop: "0px", marginRight: "0px", marginBottom: "0px", marginLeft: "0px", position: "relative" } : { position: 'relative', zIndex: '1', overflow: "visible", ...bgStyles, backgroundColor: bgStyles?.backgroundColor, backgroundImage: bgStyles?.backgroundImage, width: "100%", maxWidth: "100%", marginTop: "0px", marginRight: "0px", marginBottom: "0px", marginLeft: "0px", position: "relative" }}>
                                            {currPage !== "button" && showBrand && <div className="branding" style={{ position: "absolute", inset: "auto 0px 0px auto", zIndex: "9999999999999999999999999", ...brandStyles }}><span className="cursor-pointer" onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                setCurrPosition({ ...currPosition, selectedType: "brand" })
                                            }}>Powered by <span onClick={e => {
                                                e.stopPropagation()
                                                navigate("/")
                                            }} className="text-decoration-underline">XIRCLS</span></span></div>}
                                            {/* render layout Here */}
                                            {
                                                colWise?.map((cur, key) => {
                                                    return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: cur === indexes.cur ? "2" : "0" }} key={key}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                            setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                            setValues(cur?.style)
                                                            // setShowActive(!isEqual({ ...indexes }, { cur: key, curElem: "parent", subElem: "grandparent" }))
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.stopPropagation()
                                                            setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                        }}
                                                        onDragEnter={e => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            setDragEnter({ type: "block", position: { cur: key, curElem: "parent", subElem: "grandparent" }, id: `${currPage}-${key}-parent-grandparent` })
                                                        }}
                                                        onDragExit={e => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.stopPropagation()
                                                            setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                        }}
                                                        id={`${currPage}-${key}-parent-grandparent`}
                                                        className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "active-elem" : ""}`}
                                                    >
                                                        {isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...gotDragOver }) && (
                                                            <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                        )}
                                                        {isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...mouseEnterIndex }) && <span
                                                            onMouseEnter={(e) => {
                                                                e.stopPropagation()
                                                                setMouseEnterIndex({ ...mouseEnterIndex })
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.stopPropagation()
                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                            }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                            <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                e.stopPropagation()
                                                                if (colWise.length <= 1) {
                                                                    // setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                    setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                } else {
                                                                    // setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                    setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                }
                                                                const arr = [...colWise]
                                                                arr.splice(key, 1)
                                                                setcolWise([...arr])
                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                            }} />
                                                            {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                        e.stopPropagation()
                                                                                        setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                        setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                        const arr = [...colWise]
                                                                                        arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                        setValues(subElem?.style)
                                                                                        setcolWise([...arr])
                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                    }} /> */}
                                                        </span>}
                                                        {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: "parent", subElem: "grandparent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                        <div style={{ display: "flex", flexDirection: currPage === "button" ? "row" : isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%" }}
                                                        >
                                                            {
                                                                cur?.elements?.map((curElem, i) => {
                                                                    return (
                                                                        <div style={{ ...curElem?.style, position: "relative", width: currPage === "button" ? curElem?.style?.width : isMobile ? "100%" : curElem?.style?.width, zIndex: (cur === indexes.cur) && (curElem.positionType === indexes.curElem) ? "2" : "0" }} onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            // setActiveRow("none")
                                                                            makActive(e, cur, curElem, curElem?.positionType, key, i, "parent")
                                                                            setCurrPosition({ ...currPosition, selectedType: "column" })
                                                                            setIndexes({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                            setValues(curElem?.style)
                                                                        }}
                                                                            onMouseEnter={(e) => {
                                                                                e.stopPropagation()
                                                                                setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                e.stopPropagation()
                                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                            }}
                                                                            onDragEnter={e => {
                                                                                e.preventDefault()
                                                                                e.stopPropagation()
                                                                                setDragEnter({ type: "col", position: { cur: key, curElem: curElem.positionType, subElem: "parent" }, id: `${currPage}-${key}-${curElem?.positionType}-parent` })
                                                                            }}
                                                                            onDragExit={e => {
                                                                                e.preventDefault()
                                                                                e.stopPropagation()
                                                                                setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                            }}
                                                                            onDrop={e => {
                                                                                e.stopPropagation()
                                                                                handleColDrop(e, key, curElem?.positionType, curElem?.element?.length, i)
                                                                                const transferType = e.dataTransfer.getData("type")
                                                                                setCurrPosition({ ...currPosition, j: curElem?.element?.length, selectedType: transferType })
                                                                            }}
                                                                            id={`${currPage}-${key}-${curElem.positionType}-parent`}
                                                                            className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "active-elem" : ""}`}>

                                                                            {isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...gotDragOver }) && (
                                                                                <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                            )}
                                                                            {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: "parent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                            {curElem?.element?.map((subElem, j) => {
                                                                                switch (subElem?.type) {
                                                                                    case 'text':
                                                                                        // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable={!isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes })} style={{ zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1", position: "relative" }} onDragStart={(e) => {
                                                                                                e.stopPropagation()
                                                                                                e.dataTransfer.setData("type", "rearrange_text")
                                                                                                setTransfered("rearrange_text")
                                                                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                setDragStartIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                            }}
                                                                                                onDragEnter={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                }}
                                                                                                onDragExit={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onClick={e => {
                                                                                                    e.stopPropagation()
                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    setCurrPosition({ ...currPosition, selectedType: "text" })
                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                    setValues(subElem?.style)
                                                                                                }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem.positionType, j + 1, i)
                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                onMouseEnter={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseLeave={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onDragOver={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                                                                                                }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>

                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                    <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                )}

                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                                                                    <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        if (colWise.length <= 1) {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                                                            setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                                                        } else {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                            setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                                                        }
                                                                                                        const arr = [...colWise]
                                                                                                        if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                                                            arr.splice(key, 1)
                                                                                                        } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                                                        } else {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                                                        }
                                                                                                        setcolWise([...arr])
                                                                                                    }} />
                                                                                                    {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }}
                                                                                                                                onClick={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                                                                    const arr = [...colWise]
                                                                                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                    setcolWise([...arr])
                                                                                                                                }} /> */}
                                                                                                </span>}
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                                                <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" >
                                                                                                    <Editor fontColor={subElem.style.isInitialColor ? finalObj?.defaultThemeColors[subElem.style.initialColor] : ""} fontFamilies={subElem.isInitialFont ? finalObj?.fontFamilies[subElem.textType] : ""} elementId={`${currPage}-${key}-${curElem?.positionType}-${j}`} key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })}
                                                                                                        onChange={(content, editorState) => {
                                                                                                            if (!isEqual(content, subElem?.editorState)) {
                                                                                                                const dupText = [...colWise]
                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                }
                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                }
                                                                                                                setcolWise(dupText)
                                                                                                            }
                                                                                                        }}
                                                                                                        // htmlContent={subElem?.textValue}
                                                                                                        editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    case 'image':
                                                                                        if (subElem.src !== "") {
                                                                                            return (
                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                    onDragStart={e => {
                                                                                                        e.stopPropagation()
                                                                                                        e.dataTransfer.setData("type", "rearrange_image")
                                                                                                        setTransfered("rearrange_image")
                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }}
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }}
                                                                                                    onDragEnter={e => {
                                                                                                        e.preventDefault()
                                                                                                        e.stopPropagation()
                                                                                                        setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                    }}
                                                                                                    onDragExit={e => {
                                                                                                        e.preventDefault()
                                                                                                        e.stopPropagation()
                                                                                                        setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                    }}
                                                                                                    onClick={e => {
                                                                                                        e.stopPropagation()
                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                        setCurrPosition({ ...currPosition, selectedType: "image" })
                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                        setValues(subElem?.style)
                                                                                                    }}
                                                                                                    onDrop={e => {
                                                                                                        e.stopPropagation()
                                                                                                        setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                        } else {
                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                        }
                                                                                                    }}
                                                                                                    onDragOver={e => {
                                                                                                        e.preventDefault()
                                                                                                        e.stopPropagation()
                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                    }}
                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                    {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                        <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                    )}
                                                                                                    {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span className="d-flex"
                                                                                                        onMouseEnter={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                        }}
                                                                                                        onMouseLeave={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                        }} style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                                                                        <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            if (colWise.length <= 1) {
                                                                                                                setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                                                                setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                                                            } else {
                                                                                                                setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                                                            }
                                                                                                            const arr = [...colWise]
                                                                                                            if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                                                                arr.splice(key, 1)
                                                                                                            } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                                                                arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                                                            } else {
                                                                                                                arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                                                            }
                                                                                                            setcolWise([...arr])
                                                                                                        }} />
                                                                                                        {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }}
                                                                                                                                    onClick={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                                                                        const arr = [...colWise]
                                                                                                                                        arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                                                                        setValues(subElem?.style)
                                                                                                                                        setcolWise([...arr])
                                                                                                                                    }} /> */}
                                                                                                    </span>}
                                                                                                    {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                                                    <img
                                                                                                        className="img-fluid"
                                                                                                        src={subElem.src}
                                                                                                        alt={`Selected Image ${i}`}
                                                                                                        style={{ width: "100%" }}
                                                                                                    />
                                                                                                </div>
                                                                                            )
                                                                                        } else {
                                                                                            setCurrPosition({ ...currPosition, j })
                                                                                            // imageSelector.click()
                                                                                            triggerImage()
                                                                                            const dupArray = [...colWise]
                                                                                            dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                                                            setcolWise([...dupArray])
                                                                                        }
                                                                                    case 'button':
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable={!isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes })} style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center", zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                onDragStart={e => {
                                                                                                    e.stopPropagation()
                                                                                                    e.dataTransfer.setData("type", "rearrange_button")
                                                                                                    setTransfered("rearrange_button")
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onDragEnter={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                }}
                                                                                                onDragExit={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onClick={e => {
                                                                                                    e.stopPropagation()
                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    setCurrPosition({ ...currPosition, selectedType: "button" })
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setValues(subElem?.style)
                                                                                                }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                onMouseEnter={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseLeave={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onDragOver={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                    <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                )}
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                                                                    <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        if (colWise.length <= 1) {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                                                            setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                                                        } else {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                            setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                                                        }
                                                                                                        const arr = [...colWise]
                                                                                                        if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                                                            arr.splice(key, 1)
                                                                                                        } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                                                        } else {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                                                        }
                                                                                                        setcolWise([...arr])
                                                                                                    }} />
                                                                                                    {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }}
                                                                                                                                onClick={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                                                                    const arr = [...colWise]
                                                                                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                    setcolWise([...arr])
                                                                                                                                }} /> */}
                                                                                                </span>}
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                                                <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                                                    <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`} style={{ display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems }}>
                                                                                                        <Editor fontColor={subElem.style.isInitialColor ? finalObj?.defaultThemeColors[subElem.style.initialColor] : ""} fontFamilies={subElem.isInitialFont ? finalObj?.fontFamilies[subElem.textType] : ""} elementId={`${currPage}-${key}-${curElem?.positionType}-${j}`} key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })}
                                                                                                            onChange={(content, editorState) => {
                                                                                                                if (!isEqual(content, subElem?.editorState)) {
                                                                                                                    const dupText = [...colWise]
                                                                                                                    if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                    }
                                                                                                                    if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                    }
                                                                                                                    setcolWise(dupText)
                                                                                                                }
                                                                                                            }}
                                                                                                            // htmlContent={subElem?.textValue}
                                                                                                            editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                        />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    case 'input':
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center", zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                onDragStart={e => {
                                                                                                    e.stopPropagation()
                                                                                                    e.dataTransfer.setData("type", "rearrange_input")
                                                                                                    setTransfered("rearrange_input")
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onDragEnter={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                }}
                                                                                                onDragExit={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onClick={e => {
                                                                                                    e.stopPropagation()
                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    setCurrPosition({ ...currPosition, selectedType: "input" })
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setValues(subElem.style)
                                                                                                }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                onMouseEnter={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseLeave={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onDragOver={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                    <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                )}
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                                                                    <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        if (colWise.length <= 1) {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                                                            setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                                                        } else {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                            setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                                                        }
                                                                                                        const arr = [...colWise]
                                                                                                        if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                                                            arr.splice(key, 1)
                                                                                                        } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                                                        } else {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                                                        }
                                                                                                        setcolWise([...arr])
                                                                                                    }} />
                                                                                                    {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }}
                                                                                                                                onClick={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                                                                    const arr = [...colWise]
                                                                                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                    setcolWise([...arr])
                                                                                                                                }} /> */}
                                                                                                </span>}
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                                                <div style={{ width: subElem?.style?.width, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, display: "flex", flexDirection: "column", gap: subElem?.style?.elemGap ? subElem?.style?.elemGap : "0px" }}>
                                                                                                    {subElem?.hasLabel && (<Editor fontColor={subElem.style.isInitialColor ? finalObj?.defaultThemeColors[subElem.style.initialColor] : ""} fontFamilies={subElem.isInitialFont ? finalObj?.fontFamilies[subElem.textType] : ""} elementId={`${currPage}-${key}-${curElem?.positionType}-${j}`} key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ width: "100%", position: "relative", display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })}
                                                                                                        onChange={(content, editorState) => {
                                                                                                            if (!isEqual(content, subElem?.editorState)) {
                                                                                                                const dupText = [...colWise]
                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                }
                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                }
                                                                                                                setcolWise(dupText)
                                                                                                            }
                                                                                                        }}
                                                                                                        // htmlContent={subElem?.textValue}
                                                                                                        editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                    />)}
                                                                                                    <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} readOnly />
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    case 'offer':
                                                                                        return (
                                                                                            <div
                                                                                                onDragStart={e => {
                                                                                                    e.stopPropagation()
                                                                                                    e.dataTransfer.setData("type", "rearrange_offer")
                                                                                                    setTransfered("rearrange_offer")
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseEnter={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseLeave={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onDragEnter={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                }}
                                                                                                onDragExit={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onClick={e => {
                                                                                                    e.stopPropagation()
                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    setCurrPosition({ ...currPosition, selectedType: "offer" })
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setValues(subElem?.style)
                                                                                                }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                onDragOver={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                }} style={{ ...subElem?.style, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                    <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                )}
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}>
                                                                                                    <Trash color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }} onClick={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        if (colWise.length <= 1) {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                                                            setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                                                        } else {
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                            setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                                                        }
                                                                                                        const arr = [...colWise]
                                                                                                        if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                                                            arr.splice(key, 1)
                                                                                                        } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                                                        } else {
                                                                                                            arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                                                        }
                                                                                                        setcolWise([...arr])
                                                                                                    }} />
                                                                                                    {/* <Copy color="#ffffff" size={30} className="cursor-pointer" style={{ padding: "0.5rem" }}
                                                                                                                                onClick={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                                                                                    const arr = [...colWise]
                                                                                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                    setcolWise([...arr])
                                                                                                                                }} /> */}
                                                                                                </span>}
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "0", backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
                                                                                                {gotOffers ? finalObj?.selectedOffers?.map((ele, key) => {
                                                                                                    console.log({ isEqual: isEqual(ele, selectedOffer), ele, selectedOffer })
                                                                                                    return (
                                                                                                        <div title="Click on offer to edit more settings" style={{ position: "relative" }} onClick={() => {
                                                                                                            setSelectedOffer(ele)
                                                                                                        }}>
                                                                                                            {isEqual(ele, selectedOffer) && (
                                                                                                                <div className='position-absolute w-100 h-100 bg-black opacity-25 top-0 start-0 z-1'></div>
                                                                                                            )}
                                                                                                            <ReturnOfferHtml details={ele} key={key} theme={offerTheme} colors={finalObj?.offerProperties?.colors} />
                                                                                                        </div>
                                                                                                    )
                                                                                                }) : (
                                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                                                        <Spinner />
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )
                                                                                    case 'icon':
                                                                                        return (
                                                                                            <div>icon</div>
                                                                                        )
                                                                                    case 'tnc':
                                                                                        return (
                                                                                            <div
                                                                                                onDragEnter={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragEnter({ type: subElem?.type, position: { cur: key, curElem: curElem.positionType, subElem: j }, id: `${currPage}-${key}-${curElem?.positionType}-${j}` })
                                                                                                }}
                                                                                                onDragExit={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setGotDragOver({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onDragStart={e => {
                                                                                                    e.stopPropagation()
                                                                                                    e.dataTransfer.setData("type", "rearrange_tnc")
                                                                                                    setTransfered("rearrange_tnc")
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseEnter={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                }}
                                                                                                onMouseLeave={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                }}
                                                                                                onClick={e => {
                                                                                                    e.stopPropagation()
                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    setCurrPosition({ ...currPosition, selectedType: "tnc" })
                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setValues(subElem?.style)
                                                                                                }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                onDragOver={e => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                }} style={{ ...subElem?.style, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...gotDragOver }) && (
                                                                                                    <span style={{ position: "absolute", top: indicatorPosition === "top" ? "0px" : "100%", width: "100%", border: "1px solid #727272" }}></span>
                                                                                                )}
                                                                                                {isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...mouseEnterIndex }) && <span
                                                                                                    onMouseEnter={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ ...mouseEnterIndex })
                                                                                                    }}
                                                                                                    onMouseLeave={(e) => {
                                                                                                        e.stopPropagation()
                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    }} className="d-flex" style={{ backgroundColor: "#727272", position: "absolute", top: "0px", left: "0px", transform: "translateY(-99%)", zIndex: "99999999999999999999999999999999999999" }}></span>}
                                                                                                <input type="checkbox" id={`tnc-${currPage}-${key}-${curElem.positionType}-${j}`} />

                                                                                                <Editor fontColor={subElem.style.isInitialColor ? finalObj?.defaultThemeColors[subElem.style.initialColor] : ""} fontFamilies={subElem.isInitialFont ? finalObj?.fontFamilies[subElem.textType] : ""} elementId={`${currPage}-${key}-${curElem?.positionType}-${j}`} key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ width: "100%", position: "relative", display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })} onChange={(content, editorState) => {

                                                                                                    if (!isEqual(content, subElem?.editorState)) {
                                                                                                        const dupText = [...colWise]
                                                                                                        if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                            dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                        }
                                                                                                        if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                            dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                        }
                                                                                                        setcolWise(dupText)
                                                                                                    }
                                                                                                }}
                                                                                                    // htmlContent={subElem?.textValue}
                                                                                                    editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                />

                                                                                            </div>
                                                                                        )
                                                                                    default:
                                                                                        return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                                                                            // onClick={(e) => makActive(e, cur)}
                                                                                            onDragOver={(e) => {
                                                                                                e.preventDefault()
                                                                                                e.stopPropagation()
                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                handleDragOver(e)
                                                                                                setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                            }}
                                                                                            onClick={(e) => {
                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                            }}
                                                                                            onDrop={(e) => {
                                                                                                e.stopPropagation()
                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                handleElementDrop(e, curElem?.positionType, key, i, curElem, j)
                                                                                            }}>
                                                                                            <Download size={10} style={{ color: 'grey' }} />
                                                                                            <p style={{ margin: '0px', fontSize: '10px', color: 'grey' }}>Drop an element here</p>
                                                                                        </div>
                                                                                }
                                                                            })}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div style={{ zIndex: "50000000", filter: `drop-shadow(0px 0px 15px rgba(0,0,0,0.5))`, transition: "0.3s ease-in-out", maxWidth: "100%", width: "100%" }}>
                                    <div className="position-relative" style={{ width: "auto" }}>
                                        <span onClick={() => setOpenPage(!openPage)} className="position-absolute d-flex justify-content-center align-items-center cursor-pointer" style={{ top: "0px", left: "50%", transform: `translateX(-50%) translateY(-100%)`, padding: "0.25rem", aspectRatio: "30/9", width: "50px", borderRadius: "10px 10px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                                            <ChevronUp style={{ rotate: openPage ? "-540deg" : "0deg", transition: "0.3s ease-in-out" }} size={12.5} color='#ffffff' />
                                        </span>
                                        <div id='page-selector' style={{ overflowX: "auto", margin: "auto", borderRadius: "10px 10px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
                                            <Swiper
                                                direction={"horizontal"}
                                                key={mobileCondition}
                                                breakpoints={isMobile ? {
                                                    0: {
                                                        slidesPerView: 1
                                                    },
                                                    980: {
                                                        slidesPerView: 1
                                                    },
                                                    1440: {
                                                        slidesPerView: 1
                                                    }
                                                } : {
                                                    0: {
                                                        slidesPerView: 1
                                                    },
                                                    980: {
                                                        slidesPerView: 2
                                                    },
                                                    1440: {
                                                        slidesPerView: finalObj?.pages?.length + 1
                                                    }
                                                }}
                                                spaceBetween={0}
                                                navigation={true}
                                                loop={false}
                                                modules={[Pagination, Navigation]}
                                                className="mySwiper"
                                                initialSlide={0}>
                                                {finalObj?.[`${mobileCondition}pages`]?.map((ele, key) => {
                                                    const elem = <div key={key} className="cursor-pointer pt-1">
                                                        <div onClick={() => {
                                                            if (finalObj?.verificationEnabled || ele?.id !== "user_verification") {
                                                                setCurrPage(ele?.id)
                                                                if (ele?.id === "offers") {
                                                                    setSideNav("offers")
                                                                } else {
                                                                    setSideNav("add-elements")
                                                                }
                                                                setIndexes(({ cur: 0, curElem: "left", subElem: "grandparent" }))
                                                                setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                setFinalObj({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: bgStyles } })
                                                            }
                                                        }} className={`overflow-hidden rounded position-relative bg-light-secondary ${currPage === ele.id && openPage ? "border-dark" : ""} ${ele.id === "user_verification" && !finalObj.verificationEnabled ? "opacity-25" : currPage !== ele.id && openPage ? "opacity-50" : ""} m-auto`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out", boxShadow: `0px 0px ${currPage === ele.id && openPage ? "20px" : "0px"} rgba(0,0,0,0.75)` }}>
                                                            <div className={`overflow-hidden d-flex justify-content-center align-items-center w-100 h-100`}>
                                                                <div className="position-absolute" style={{ scale: "0.215", pointerEvents: "none", width: isMobile ? "325px" : "auto" }}>
                                                                    <div style={{ position: "relative", width: bgStyles.width, maxHeight: "100%", maxWidth: "", minHeight: bgStyles.minHeight }}>
                                                                        <span style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350" }}><X size={18} /></span>
                                                                        <div id="dropZoneParent" className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "auto", backgroundColor: "white", ...bgStyles, backgroundImage: bgStyles?.backgroundImage, width: "100%", maxWidth: "100%" }}>
                                                                            {/* render layout Here */}
                                                                            {
                                                                                ele.values?.map((cur, key) => {
                                                                                    return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation()
                                                                                            makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                            setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                                            setValues(cur?.style)
                                                                                            // setShowActive(!isEqual({ ...indexes }, { cur: key, curElem: "parent", subElem: "grandparent" }))
                                                                                        }}
                                                                                        onMouseEnter={(e) => {
                                                                                            e.stopPropagation()
                                                                                            setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                                        }}
                                                                                        onMouseLeave={(e) => {
                                                                                            e.stopPropagation()
                                                                                            setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                        }}
                                                                                        id={`${currPage}-${key}-parent-grandparent`}
                                                                                        className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "active-elem" : ""}`}
                                                                                    >
                                                                                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%", zIndex: "1" }}
                                                                                        >
                                                                                            {
                                                                                                cur?.elements?.map((curElem, i) => {
                                                                                                    return (
                                                                                                        <div style={{ ...curElem?.style, position: "relative", width: isMobile ? "100%" : curElem?.style?.width }} onClick={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            // setActiveRow("none")
                                                                                                            makActive(e, cur, curElem, curElem?.positionType, key, i, "parent")
                                                                                                            setCurrPosition({ ...currPosition, selectedType: "column" })
                                                                                                            setIndexes({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                                            setValues(curElem?.style)
                                                                                                        }}
                                                                                                            onMouseEnter={(e) => {
                                                                                                                e.stopPropagation()
                                                                                                                setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                                            }}
                                                                                                            onMouseLeave={(e) => {
                                                                                                                e.stopPropagation()
                                                                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                            }}
                                                                                                            onDrop={e => {
                                                                                                                e.stopPropagation()
                                                                                                                handleColDrop(e, key, curElem?.positionType, curElem?.element?.length, i)
                                                                                                                const transferType = e.dataTransfer.getData("type")
                                                                                                                setCurrPosition({ ...currPosition, j: curElem?.element?.length, selectedType: transferType })
                                                                                                            }}
                                                                                                            id={`${currPage}-${key}-${curElem.positionType}-parent`}
                                                                                                            className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                            {curElem?.element?.map((subElem, j) => {
                                                                                                                switch (subElem?.type) {
                                                                                                                    case 'text':
                                                                                                                        // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                                                        return (
                                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable={!isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes })} onDragStart={(e) => {
                                                                                                                                e.stopPropagation()
                                                                                                                                e.dataTransfer.setData("type", "rearrange_text")
                                                                                                                                setTransfered("rearrange_text")
                                                                                                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                                setDragStartIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                            }} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                                                onClick={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "text" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                }}
                                                                                                                                onDrop={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                                        handleColDrop(e, key, curElem.positionType, j + 1, i)
                                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                    } else {
                                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                                onMouseEnter={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onMouseLeave={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                }}
                                                                                                                                onDragOver={e => {
                                                                                                                                    e.preventDefault()
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                                                                                                                                }}
                                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    case 'image':
                                                                                                                        if (subElem.src !== "") {
                                                                                                                            return (
                                                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                                                                                    onDragStart={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        e.dataTransfer.setData("type", "rearrange_image")
                                                                                                                                        setTransfered("rearrange_image")
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseEnter={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseLeave={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                    }}
                                                                                                                                    onClick={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "image" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setValues(subElem?.style)
                                                                                                                                    }}
                                                                                                                                    onDrop={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                        } else {
                                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                    onDragOver={e => {
                                                                                                                                        e.preventDefault()
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                    }}
                                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                    <img
                                                                                                                                        className="img-fluid"
                                                                                                                                        src={subElem.src}
                                                                                                                                        alt={`Selected Image ${i}`}
                                                                                                                                        style={{ width: "100%" }}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        } else {
                                                                                                                            setCurrPosition({ ...currPosition, j })
                                                                                                                            // imageSelector.click()
                                                                                                                            triggerImage()
                                                                                                                            const dupArray = [...colWise]
                                                                                                                            dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                                                                                            setcolWise([...dupArray])
                                                                                                                        }
                                                                                                                    case 'button':
                                                                                                                        return (
                                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}
                                                                                                                                onDragStart={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    e.dataTransfer.setData("type", "rearrange_button")
                                                                                                                                    setTransfered("rearrange_button")
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onClick={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "button" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setValues(subElem.style)
                                                                                                                                }}
                                                                                                                                onDrop={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                    } else {
                                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                                onMouseEnter={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onMouseLeave={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                }}
                                                                                                                                onDragOver={e => {
                                                                                                                                    e.preventDefault()
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                }}
                                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                                                                                    <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`}>
                                                                                                                                        {/* <Editor key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })} onChange={(content, editorState) => {

                                                                                                                                            if (!isEqual(content, subElem?.editorState)) {
                                                                                                                                                const dupText = [...colWise]
                                                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                                                }
                                                                                                                                                if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                                                                    dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                                                }
                                                                                                                                                setcolWise(dupText)
                                                                                                                                            }
                                                                                                                                        }}
                                                                                                                                            // htmlContent={subElem?.textValue}
                                                                                                                                            editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                                                        /> */}
                                                                                                                                        <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                                    </span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    case 'input':
                                                                                                                        console.log(`${currPage}-${key}-${curElem?.positionType}-${j}: `, subElem)
                                                                                                                        return (
                                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center" }}
                                                                                                                                onDragStart={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    e.dataTransfer.setData("type", "rearrange_input")
                                                                                                                                    setTransfered("rearrange_input")
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onClick={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "input" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setValues(subElem.style)
                                                                                                                                }}
                                                                                                                                onDrop={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                    } else {
                                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                                onMouseEnter={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onMouseLeave={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                }}
                                                                                                                                onDragOver={e => {
                                                                                                                                    e.preventDefault()
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j + 1 })
                                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                }}
                                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                <div style={{ width: subElem?.style?.width, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}>
                                                                                                                                    {subElem?.hasLabel && (<label style={{ color: subElem?.style?.color, fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}>{subElem?.labelText}</label>)}
                                                                                                                                    <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} disabled />
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    case 'offer':
                                                                                                                        return (
                                                                                                                            <div
                                                                                                                                onDragStart={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    e.dataTransfer.setData("type", "rearrange_offer")
                                                                                                                                    setTransfered("rearrange_offer")
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onMouseEnter={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onMouseLeave={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                }}
                                                                                                                                onClick={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "offer" })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setValues(subElem?.style)
                                                                                                                                }}
                                                                                                                                onDrop={e => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                    } else {
                                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                                onDragOver={e => {
                                                                                                                                    e.preventDefault()
                                                                                                                                    e.stopPropagation()
                                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                }} style={{ ...subElem?.style, ...values, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}
                                                                                                                                id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                {gotOffers ? finalObj?.selectedOffers?.map((ele) => {
                                                                                                                                    return (
                                                                                                                                        <ReturnOfferHtml details={ele} key={key} theme={offerTheme} colors={finalObj?.offerProperties?.colors} />
                                                                                                                                    )
                                                                                                                                }) : (
                                                                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                                                                                        <Spinner />
                                                                                                                                    </div>
                                                                                                                                )}
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    default:
                                                                                                                        return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                                                                                                            // onClick={(e) => makActive(e, cur)}
                                                                                                                            onDragOver={(e) => {
                                                                                                                                e.preventDefault()
                                                                                                                                e.stopPropagation()
                                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                handleDragOver(e)
                                                                                                                                setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                            }}
                                                                                                                            onClick={(e) => {
                                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                            }}
                                                                                                                            onDrop={(e) => {
                                                                                                                                e.stopPropagation()
                                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                handleElementDrop(e, curElem?.positionType, key, i, curElem, j)
                                                                                                                            }}>
                                                                                                                            <Download size={10} style={{ color: 'grey' }} />
                                                                                                                            <p style={{ margin: '0px', fontSize: '10px', color: 'grey' }}>Drop an element here</p>
                                                                                                                        </div>
                                                                                                                }
                                                                                                            })}
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <div className="d-flex justify-content-center align-items-center form-check form-switch form-check-dark p-0 z-1" style={{ gap: "0.0125rem" }}>
                                                                <div className="position-relative z-1">
                                                                    <p onClick={() => {
                                                                        if (finalObj?.verificationEnabled || ele.id !== "user_verification") {
                                                                            setCurrPage(ele.id)
                                                                            setSideNav("add-elements")
                                                                            setIndexes(({ cur: 0, curElem: "left", subElem: "grandparent" }))
                                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                            setFinalObj({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: bgStyles } })
                                                                        }
                                                                    }} className={`text-center m-0 fw-bold ${currPage === ele?.id ? "text-white" : "dark"} ${ele?.id === "user_verification" && !finalObj?.verificationEnabled ? "opacity-50" : ""}`} style={{ fontSize: "12px", padding: "0.5rem" }}>{ele?.pageName}</p>
                                                                    {(renamePage === ele?.id) && <div className="position-absolute d-flex align-items-center bg-white rounded renameTab z-1" style={{ padding: "0.25rem", gap: "0.25rem", width: "300px" }}>
                                                                        <input value={pageName} onChange={e => setPageName(e.target.value)} type="text" style={{ padding: "0.5rem" }} className="form-control w-100" />
                                                                        <Check onClick={() => {
                                                                            const pageIndex = finalObj?.pages?.findIndex($ => $?.id === renamePage)
                                                                            const newObj = { ...finalObj }
                                                                            newObj.pages[pageIndex].pageName = pageName
                                                                            newObj.mobile_pages[pageIndex].pageName = pageName
                                                                            setFinalObj({ ...newObj })
                                                                            setRenamePage("")
                                                                        }} color="#727272" size={"25px"} />
                                                                        <X onClick={() => setRenamePage("")} color="#727272" size={"25px"} />
                                                                    </div>}
                                                                </div>
                                                                {(ele.id === "user_verification") && <input checked={finalObj?.verificationEnabled} onChange={e => {
                                                                    if (!e.target.checked && (currPage === "user_verification")) {
                                                                        setCurrPage(finalObj?.[`${mobileCondition}pages`][0]?.id)
                                                                        setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                    }
                                                                    setFinalObj({ ...finalObj, verificationEnabled: e.target.checked })
                                                                }} style={{ width: "30px", height: "15px" }} type="checkbox" className="form-check-input m-0 cursor-pointer" />}
                                                            </div>
                                                            <UncontrolledButtonDropdown className='more-options-dropdown'>
                                                                <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
                                                                    <span>
                                                                        <MoreVertical size='18' />
                                                                    </span>
                                                                </DropdownToggle>
                                                                <DropdownMenu end className='custom_dropMenu' style={{ transform: 'translate(140px, -90px)' }}>
                                                                    <DropdownItem onClick={e => {
                                                                        e.stopPropagation()
                                                                        setRenamePage(ele?.id)
                                                                        setPageName(ele?.pageName)
                                                                    }} className='w-100'>
                                                                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                            <Edit3 stroke='blue' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Rename</span>
                                                                        </div>
                                                                    </DropdownItem>
                                                                    {ele?.id?.includes("Page") && <DropdownItem className='w-100' onClick={() => {

                                                                        const newObj = finalObj


                                                                        const pageCurrentIndex = newObj?.pages?.findIndex(($) => $?.id === ele?.id)
                                                                        const mobilePageCurrentIndex = newObj?.mobile_pages?.findIndex(($) => $?.id === ele?.id)
                                                                        const responsivePageArray = newObj?.responsive?.findIndex($ => $?.pageName === ele?.id)

                                                                        const page = newObj?.pages[pageCurrentIndex]
                                                                        const mobilePage = newObj?.mobile_pages[mobilePageCurrentIndex]
                                                                        const responsiveArray = newObj?.responsive[responsivePageArray]

                                                                        const duplicatedPage = { ...page, id: `Page${newObj?.pages.length + 1}`, pageName: `Page ${newObj?.pages.length + 1}` }
                                                                        const duplicatedMobilePage = { ...mobilePage, id: `Page${newObj?.mobile_pages.length + 1}`, pageName: `Page ${newObj?.mobile_pages.length + 1}` }
                                                                        const duplicatedresponsiveArray = { ...responsiveArray, pageName: `Page${newObj?.pages.length + 1}` }


                                                                        newObj?.pages?.splice(pageCurrentIndex + 1, 0, duplicatedPage)
                                                                        newObj?.mobile_pages?.splice(mobilePageCurrentIndex + 1, 0, duplicatedMobilePage)
                                                                        newObj?.responsive?.splice(responsivePageArray + 1, 0, duplicatedresponsiveArray)

                                                                        console.log(newObj, "newObj")
                                                                        setFinalObj({ ...newObj })
                                                                    }}>
                                                                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                            <Copy stroke='green' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Duplicate</span>
                                                                        </div>
                                                                    </DropdownItem>}
                                                                    {ele?.id?.includes("Page") && <DropdownItem onClick={() => {
                                                                        const newObj = { ...finalObj }

                                                                        const pageArray = newObj?.pages?.filter($ => $?.id !== ele?.id)
                                                                        const mobilePageArray = newObj?.mobile_pages?.filter($ => $?.id !== ele?.id)
                                                                        const responsivePageArray = newObj?.responsive?.filter($ => $?.pageName !== ele?.id)
                                                                        if (currPage === ele?.id) {
                                                                            setCurrPage(pageArray[0]?.id)
                                                                        }
                                                                        toast.success(<div className="d-flex gap-1 align-items-center">Page removed! <button onClick={undo} className="btn-primary btn">Undo</button></div>)
                                                                        setFinalObj({ ...finalObj, pages: pageArray, mobile_pages: mobilePageArray, responsive: responsivePageArray })
                                                                    }} className='w-100'>
                                                                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                            <Trash stroke='red' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                                                        </div>
                                                                    </DropdownItem>}
                                                                    {ele?.id?.includes("Page") && <DropdownItem onClick={() => {
                                                                        const newObj = { ...finalObj }

                                                                        const pageArray = newObj?.pages?.filter($ => $?.id !== ele?.id)
                                                                        const mobilePageArray = newObj?.mobile_pages?.filter($ => $?.id !== ele?.id)
                                                                        const responsivePageArray = newObj?.responsive?.filter($ => $?.pageName !== ele?.id)

                                                                        if (currPage === ele?.id) {
                                                                            setCurrPage(pageArray[0]?.id)
                                                                        }
                                                                        toast.success(<div className="d-flex gap-1 align-items-center">Page removed! <button onClick={undo} className="btn-primary btn">Undo</button></div>)
                                                                        setFinalObj({ ...finalObj, pages: pageArray, mobile_pages: mobilePageArray, responsive: responsivePageArray })
                                                                    }} className='w-100'>
                                                                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                            <Trash stroke='red' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                                                        </div>
                                                                    </DropdownItem>}
                                                                </DropdownMenu>
                                                            </UncontrolledButtonDropdown>
                                                        </div>
                                                    </div>
                                                    if (!ele?.isHidden) {
                                                        return (
                                                            <SwiperSlide className={`${(renamePage === ele?.id) ? "z-1" : ""}`}>{elem}</SwiperSlide>
                                                        )
                                                    }
                                                })}
                                                <SwiperSlide>
                                                    <div className='cursor-pointer pt-1'>
                                                        <div onClick={() => {
                                                            if (finalObj?.teaserEnabled) {
                                                                setCurrPage("button")
                                                                setSideNav(sideNav === "display" ? "display" : "button")
                                                                setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                            }
                                                        }} className={`m-auto rounded d-flex justify-content-center align-items-center bg-light-secondary ${!finalObj?.teaserEnabled ? "opacity-25" : currPage !== "button" ? "opacity-50" : "border-dark"}`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out", boxShadow: `0px 0px ${currPage === "button" && openPage ? "20px" : "0px"} rgba(0,0,0,0.75)` }}>
                                                            <div className="position-absolute" style={{ scale: "0.5", pointerEvents: "none", overflow: "hidden", transition: "0.3s ease-in-out", opacity: openPage ? "1" : "0" }}>
                                                                <div style={{ position: "relative", width: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.width, maxWidth: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.maxWidth, maxHeight: "100%", minHeight: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.minHeight }}>
                                                                    {/* <span style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350" }}><X size={18} /></span> */}
                                                                    <div id="dropZoneParent" className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "auto", backgroundColor: "white", ...finalObj?.backgroundStyles[`${mobileCondition}button`], backgroundImage: finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundImage, width: "100%", maxWidth: "100%" }}>
                                                                        {/* render layout Here */}
                                                                        {
                                                                            finalObj[`${mobileCondition}button`]?.map((cur, key) => {
                                                                                return <div style={{ ...cur?.style, backgroundImage: cur?.style?.backgroundImage, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                                                                                >
                                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%", zIndex: "1" }}
                                                                                    >
                                                                                        {
                                                                                            cur?.elements?.map((curElem, i) => {
                                                                                                return (
                                                                                                    <div style={{ ...curElem?.style, backgroundImage: curElem?.style?.backgroundImage }}>
                                                                                                        {curElem?.element?.map((subElem, j) => {
                                                                                                            switch (subElem?.type) {
                                                                                                                case 'text':
                                                                                                                    // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                                                    return (
                                                                                                                        <div id={`button-${key}-${curElem?.positionType}-${j}`} style={{ ...subElem.style, backgroundImage: subElem?.style?.backgroundImage, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                                                            <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                case 'image':
                                                                                                                    // const imageSelector = document.getElementById("hidden-image-input")
                                                                                                                    if (subElem.src !== "") {
                                                                                                                        return (
                                                                                                                            <div id={`button-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, overflow: "hidden", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                                                                <img
                                                                                                                                    className="img-fluid"
                                                                                                                                    src={subElem.src}
                                                                                                                                    alt={`Selected Image ${i}`}
                                                                                                                                    style={{ width: "100%" }}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    } else {
                                                                                                                        setCurrPosition({ ...currPosition, j })
                                                                                                                        // imageSelector.click()
                                                                                                                        triggerImage()
                                                                                                                        const dupArray = [...colWise]
                                                                                                                        dupArray[key].elements[i].element[j].type = ""
                                                                                                                        setcolWise([...dupArray])
                                                                                                                    }
                                                                                                                case 'button':
                                                                                                                    return (
                                                                                                                        <div id={`button-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}>
                                                                                                                            <div style={{ ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center" }} >
                                                                                                                                <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`} style={{ display: "flex", justifyContent: subElem?.style?.justifyContent, alignItems: subElem?.style?.alignItems }}>
                                                                                                                                    {/* <Editor key={`${currPage}-${key}-${curElem?.positionType}-${j}-${isMobile}`} id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })} onChange={(content, editorState) => {

                                                                                                                                        if (!isEqual(content, subElem?.editorState)) {
                                                                                                                                            const dupText = [...colWise]
                                                                                                                                            if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.textValue) {
                                                                                                                                                dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                                            }
                                                                                                                                            if (dupText[key]?.elements[colWise[key]?.elements?.findIndex($ => $?.positionType === curElem.positionType)]?.element[j]?.editorState) {
                                                                                                                                                dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                                            }
                                                                                                                                            setcolWise(dupText)
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                        // htmlContent={subElem?.textValue}
                                                                                                                                        editorState={subElem?.editorState ? subElem?.editorState : `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                                                    /> */}
                                                                                                                                    <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                case 'input':
                                                                                                                    return (
                                                                                                                        <div id={`input-${key}-${curElem.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                                                            <div style={{ width: subElem?.style?.width }}>
                                                                                                                                {subElem?.hasLabel && (<label>{subElem?.labelText}</label>)}
                                                                                                                                <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, width: "100%" }} />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                case 'offer':
                                                                                                                    return (

                                                                                                                        <div className='p-1' style={{ ...values }}>
                                                                                                                            {gotOffers ? finalObj?.selectedOffers?.map((ele) => {
                                                                                                                                return (
                                                                                                                                    <div className='p-0 mx-0 mt-1 mb-2'>
                                                                                                                                        <div style={{
                                                                                                                                            flexDirection: 'column',
                                                                                                                                            justifyContent: 'center',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            position: "relative"
                                                                                                                                        }}>
                                                                                                                                            <div style={{
                                                                                                                                                width: '100%',
                                                                                                                                                minHeight: '100%',
                                                                                                                                                justifyContent: 'center',
                                                                                                                                                // boxShadow: 'rgba(0, 0, 0, 0.125) 10px 2px 5px',
                                                                                                                                                filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 10px',
                                                                                                                                                borderRadius: '10px',
                                                                                                                                                display: 'flex',
                                                                                                                                                position: "relative",
                                                                                                                                                backgroundColor: 'white'
                                                                                                                                            }}>
                                                                                                                                                <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{ padding: '15px' }}>
                                                                                                                                                    <div style={{ text: 'wrap' }}>
                                                                                                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textTransform: 'uppercase' }}>
                                                                                                                                                            <h2 style={{ fontWeight: 'bolder', fontSize: '0.9rem', color: '#FF671C' }}>
                                                                                                                                                                {ele?.Code}
                                                                                                                                                            </h2>
                                                                                                                                                            <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: 'black' }}>
                                                                                                                                                                {ele?.Summary}
                                                                                                                                                            </span>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    <div>
                                                                                                                                                        <div style={{ paddingTop: '0.5rem' }}>
                                                                                                                                                            <span style={{ color: 'black', textTransform: 'uppercase', fontWeight: '500', fontSize: '0.65rem' }}>
                                                                                                                                                                valid until: {ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format('L') : "Never ending"}
                                                                                                                                                            </span>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", padding: "0px 15px 15px" }}>
                                                                                                                                                    <div style={{
                                                                                                                                                        position: 'relative',
                                                                                                                                                        display: 'flex',
                                                                                                                                                        flexDirection: 'column',
                                                                                                                                                        justifyContent: 'space-between',
                                                                                                                                                        alignItems: 'center',
                                                                                                                                                        backgroundColor: '#FF671C',
                                                                                                                                                        // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                                        padding: "1rem 0.25rem",
                                                                                                                                                        borderRadius: "0px 0px 5px 5px"
                                                                                                                                                    }}>
                                                                                                                                                        <h1 style={{
                                                                                                                                                            fontSize: '1.829rem',
                                                                                                                                                            fontWeight: '750',
                                                                                                                                                            fontFamily: 'Montserrat',
                                                                                                                                                            color: 'white'
                                                                                                                                                        }}>
                                                                                                                                                            {
                                                                                                                                                                ele?.Type === "PERCENTAGE" ? (
                                                                                                                                                                    `${Number(ele?.Value)?.toFixed(0)}%`
                                                                                                                                                                ) : `${userPermission?.currencySymbol}${Number(ele?.Value)?.toFixed(0)}`
                                                                                                                                                            }
                                                                                                                                                        </h1>
                                                                                                                                                    </div>
                                                                                                                                                    <div style={{
                                                                                                                                                        display: 'flex',
                                                                                                                                                        flexDirection: 'column',
                                                                                                                                                        justifyContent: 'flex-end',
                                                                                                                                                        alignItems: 'center'
                                                                                                                                                    }}>
                                                                                                                                                        <button type="button" style={{
                                                                                                                                                            color: '#FF671C',
                                                                                                                                                            // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                                            fontSize: '0.65rem',
                                                                                                                                                            fontWeight: '700',
                                                                                                                                                            cursor: 'pointer',
                                                                                                                                                            border: '0.75px solid #FF671C',
                                                                                                                                                            borderRadius: '15px',
                                                                                                                                                            padding: '0.195rem',
                                                                                                                                                            backgroundColor: 'transparent',
                                                                                                                                                            textTransform: 'uppercase',
                                                                                                                                                            cursor: 'pointer'
                                                                                                                                                        }}>
                                                                                                                                                            <span >
                                                                                                                                                                Redeem
                                                                                                                                                            </span>
                                                                                                                                                        </button>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div style={{
                                                                                                                                                width: 'auto',
                                                                                                                                                // margin: '-0.5rem auto',
                                                                                                                                                position: 'absolute',
                                                                                                                                                bottom: "0px",
                                                                                                                                                backgroundColor: 'white',
                                                                                                                                                textAlign: 'center',
                                                                                                                                                padding: '0.25rem 0.5rem',
                                                                                                                                                borderRadius: '10px',
                                                                                                                                                boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.15)',
                                                                                                                                                transform: "translate(-50%, 50%)",
                                                                                                                                                left: "50%"
                                                                                                                                            }}>
                                                                                                                                                <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: 'black', fontWeight: '300', whiteSpace: "nowrap" }}>
                                                                                                                                                    Used xyz times
                                                                                                                                                </span>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            }) : (
                                                                                                                                <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                                                                                    <Spinner />
                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                    )
                                                                                                            }
                                                                                                        })}
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center align-items-center form-check form-switch form-check-dark p-0" style={{ gap: "0.0125rem" }}>
                                                            <p onClick={() => {
                                                                if (finalObj?.teaserEnabled) {
                                                                    setCurrPage("button")
                                                                    setSideNav(sideNav === "display" ? "display" : "button")
                                                                    setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                }
                                                            }} className={`form-check-label m-0 fw-bold ${currPage === "button" ? "text-white" : "dark"} ${finalObj?.teaserEnabled ? "" : "opacity-50"}`} style={{ fontSize: "12px", padding: "0.5rem" }}>Button</p> <input checked={finalObj?.teaserEnabled} onChange={e => {
                                                                if (!e.target.checked && currPage === "button") {
                                                                    setCurrPage(finalObj?.[`${mobileCondition}pages`][0]?.id)
                                                                    setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                }
                                                                setFinalObj({ ...finalObj, teaserEnabled: e.target.checked })
                                                            }} style={{ width: "30px", height: "15px" }} type="checkbox" className="form-check-input m-0 cursor-pointer" />
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div onClick={() => {
                                                        setFinalObj({ ...finalObj, [`pages`]: [...finalObj?.[`pages`], { pageName: `Page${finalObj[`pages`]?.length + 1}`, id: `Page${finalObj[`pages`]?.length + 1}`, values: [] }], [`mobile_pages`]: [...finalObj?.[`mobile_pages`], { pageName: `Page${finalObj[`mobile_pages`]?.length + 1}`, id: `Page${finalObj[`mobile_pages`]?.length + 1}`, values: [] }] })
                                                        setCurrPage(`Page${finalObj[`${mobileCondition}pages`]?.length + 1}`)
                                                        setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                    }} className="cursor-pointer pt-1">
                                                        <div className="m-auto bg-light-secondary d-flex justify-content-center align-items-center rounded overflow-hidden" style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out" }}>
                                                            <PlusCircle size={25} color='#000' />
                                                        </div>
                                                        <p className='text-center m-0' style={{ fontSize: "12px", padding: "0.5rem" }}>Add Page</p>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default RenderPreview