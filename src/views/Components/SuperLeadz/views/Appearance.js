import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { SuperLeadzBaseURL } from '../../../../assets/auth/jwtService'
import Wrapper from './Wrapper'
import isEqual from "lodash.isequal"
import { ThemesProvider } from '../../../../Helper/Context'
import { allThemes as newThemes } from '../allThemes'
import Editor from '../../../NewCustomizationFlow/Editor'
import { Download, X } from 'react-feather'
import Spinner from '../../DataTable/Spinner'

const Appearance = () => {
    const { id } = useParams()

    const [title, setTitle] = useState([])
    const [colWise, setcolWise] = useState([])
    const [currPage, setCurrPage] = useState("OTP Page")
    const { selectedCustThemeId } = useContext(ThemesProvider)
    const allPreviews = [...newThemes]
    const [indexes, setIndexes] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    const [mouseEnterIndex, setMouseEnterIndex] = useState({ cur: false, curElem: false, subElem: false })
    const [isMobile, setIsMobile] = useState(false)
    const themeLoc = useLocation()
    const mobileCondition = isMobile ? "mobile_" : ""
    const [bgOffer, setBgOffer] = useState({ backgroundColor: "rgba(255,255,255,0)", bgType: "solid", paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "auto", marginLeft: "auto", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", maxWidth: "100%", maxHeight: "300px", overflow: "auto", boxSizing: "border-box" })

    const [finalObj, setFinalObj] = useState(themeLoc?.state?.custom_theme ? JSON.parse(themeLoc?.state?.custom_theme) : selectedCustThemeId !== "" ? { ...allPreviews[allPreviews?.findIndex($ => $?.theme_id === selectedCustThemeId)]?.object } : defaultObj)
    const [crossStyle, setCrossStyle] = useState({ ...finalObj?.crossButtons?.main })
    const [gotOffers, setGotOffers] = useState(false)
    const [bgStyles, setBgStyles] = useState(selectedCustThemeId === "" ? { backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '550px', maxWidth: "90%", minHeight: '75px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" } : finalObj.backgroundStyles[`${mobileCondition}main`])
    console.log(setCurrPage, setIsMobile, setFinalObj, setBgStyles, setCrossStyle, setBgOffer, setGotOffers, setMouseEnterIndex)
    // console.log(colWise, "colwise")
    useEffect(() => {
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=maapro.myshopify.com&app=superleadz&theme_id=${id}`)

        axios({
            method: "GET",
            url
        })
            .then((response) => {
                const theme = response.data.theme_json
                // console.log("res", response)
                // console.log("res theme:", theme[0])
                const custom_theme = JSON.parse(theme[0].custom_theme)
                // console.log("cust theme:", custom_theme)
                setTitle(custom_theme.pages)
                setcolWise(custom_theme.pages[0].values)
                setCurrPage(custom_theme.pages[0].pageName)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // const [activeItem, setActiveItem] = useState('page1')

    const handleItemClick = (itemPageName) => {
        setCurrPage(itemPageName)
        const themeIndex = title.findIndex(ele => ele.pageName === itemPageName)
        setcolWise(title[themeIndex].values)
    }

    return (
        <>
            <style>
                {`
                .navbar-item.active {
                    background-color: #fff;
                    border-radius: 999px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
                }
                `}
            </style>

            <Wrapper />

            <div className='d-flex align-items-center flex-column mt-1'>
                <div style={{ padding: "0.5rem", backgroundColor: "", color: "#000" }} className="w-100 d-flex justify-content-between rounded-pill mb-2 p-1">
                    <div className='d-flex justify-content-evenly w-100'>
                        {title?.map((item) => (
                            <div
                                key={item.pageName}
                                style={{ padding: "1vh" }}
                                className={`navbar-item cursor-pointer text-black px-5 ${currPage === item.pageName ? 'active' : ''}`}
                                onClick={() => handleItemClick(item.pageName)}
                            >
                                {item.pageName}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex-grow-1 position-relative w-75 " style={{ backgroundImage: 'url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")', height: "60vh" }}>
                    <div className='d-flex justify-content-center  align-items-center h-100'>
                        <div id="customization" className='d-flex justify-content-center align-items-center position-relative mt-2'>
                            {/* <div style={{ scale: '0.55', filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.5))'}}> */}
                            <div className="position-relative scroll-custom d-flex justify-content-center align-items-center" style={{ height: "45vh", maxHeight: '45vh', backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, overflow: 'hidden', cursor: "default"  }}>
                                <div style={{ scale: "0.7z"}}>
                                    {/* {
                                            selectedThemeNo === 3 ? <Theme1 themes={allThemes} setOpenSection={setActiveSect} /> : <Theme4 themes={allThemes} setOpenSection={setActiveSect} />
                                        } */}
                                    <div style={{ position: "relative", width: bgStyles?.width, maxWidth: bgStyles?.maxWidth, maxHeight: "100%", minHeight: bgStyles?.minHeight, marginTop: bgStyles?.marginTop, marginRight: bgStyles?.marginRight, marginBottom: bgStyles?.marginBottom, marginLeft: bgStyles?.marginLeft }}>
                                        <X size={crossStyle?.width} height={crossStyle?.height} color={crossStyle?.color} style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350", backgroundColor: crossStyle?.backgroundColor, borderRadius: crossStyle?.borderRadius, padding: `3px`, marginBottom: crossStyle?.marginBottom, transform: `translateX(${crossStyle?.translateX}) translateY(${crossStyle?.translateY})` }} onClick={(e) => {
                                            e.stopPropagation()
                                            // setCurrPosition({ ...currPosition, selectedType: "cross" })
                                        }} />
                                        <div id="dropZoneParent" onClick={(e) => {
                                            e.stopPropagation()
                                            // setCurrPosition({ ...currPosition, selectedType: "main" })
                                        }}
                                            // onDragOver={(e) => {
                                            //     handleDragOver(e)
                                            // }}
                                            onDrop={(e) => {
                                                const transferType = e.dataTransfer.getData("type")
                                                if (transferType !== "") {
                                                    handleLayoutDrop(e)
                                                    setIndexes(transferType.includes("col") ? { cur: colWise.length, curElem: "parent", subElem: "grandparent" } : { cur: colWise.length, curElem: "left", subElem: 0 })
                                                    // setCurrPosition({ ...currPosition, id: colWise.length, selectedType: transferType.includes("col") ? "block" : transferType })
                                                    setValues(elementStyles[transferType.includes("col") ? "block" : transferType])
                                                }
                                            }} className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "visible", ...bgStyles, backgroundColor: bgStyles?.backgroundColor, backgroundImage: bgStyles?.backgroundImage, width: "100%", maxWidth: "100%", marginTop: "0px", marginRight: "0px", marginBottom: "0px", marginLeft: "0px" }}>
                                            <style>{`
                                                            .ql-editor {
                                                            padding: 0px !important;
                                                            text-align: center !important
                                                            }
                                                            #dropZoneParent::-webkit-scrollbar, .nav-sidebar::-webkit-scrollbar {
                                                                display: none;
                                                            }
                                                            #dropZoneParent p {
                                                                margin: 0px;
                                                            }
                                                        `}</style>

                                            {
                                                colWise?.map((cur, key) => {

                                                    return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                                                        // onClick={(e) => {
                                                        //     e.stopPropagation()
                                                        //     makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                                        //     // setCurrPosition({ ...currPosition, selectedType: "block" })
                                                        //     setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                        //     setValues(cur?.style)
                                                        //     // setShowActive(!isEqual({ ...indexes }, { cur: key, curElem: "parent", subElem: "grandparent" }))
                                                        // }}
                                                        // onMouseEnter={(e) => {
                                                        //     e.stopPropagation()
                                                        //     setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                        // }}
                                                        // onMouseLeave={(e) => {
                                                        //     e.stopPropagation()
                                                        //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                        // }}
                                                        id={`${currPage}-${key}-parent-grandparent`}
                                                        className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "active-elem" : ""}`}
                                                    >
                                                        {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: "parent", subElem: "grandparent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%", zIndex: "1" }}
                                                        >
                                                            {
                                                                cur?.elements?.map((curElem, i) => {
                                                                    return (
                                                                        <div style={{ ...curElem?.style, position: "relative", width: isMobile ? "100%" : curElem?.style?.width }}
                                                                            // onClick={(e) => {
                                                                            //     e.stopPropagation()
                                                                            //     // setActiveRow("none")
                                                                            //     makActive(e, cur, curElem, curElem?.positionType, key, i, "parent")
                                                                            //     // setCurrPosition({ ...currPosition, selectedType: "column" })
                                                                            //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                            //     setValues(curElem?.style)
                                                                            // }}
                                                                            // onMouseEnter={(e) => {
                                                                            //     e.stopPropagation()
                                                                            //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                            // }}
                                                                            // onMouseLeave={(e) => {
                                                                            //     e.stopPropagation()
                                                                            //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                            // }}
                                                                            onDrop={e => {
                                                                                e.stopPropagation()
                                                                                handleColDrop(e, key, curElem?.positionType, curElem?.element?.length, i)
                                                                                // const transferType = e.dataTransfer.getData("type")
                                                                                // setCurrPosition({ ...currPosition, j: curElem?.element?.length, selectedType: transferType })
                                                                            }}
                                                                            id={`${currPage}-${key}-${curElem.positionType}-parent`}
                                                                            className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                            {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: "parent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                            {curElem?.element?.map((subElem, j) => {
                                                                                switch (subElem?.type) {
                                                                                    case 'text':
                                                                                        // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`}
                                                                                                // onDragStart={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     e.dataTransfer.setData("type", "rearrange_text")
                                                                                                //     // setTransfered("rearrange_text")
                                                                                                //     setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                //     // setDragStartIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                // }} 
                                                                                                style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                // onClick={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                //     // setCurrPosition({ ...currPosition, selectedType: "text" })
                                                                                                //     setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                //     setValues(subElem?.style)
                                                                                                //     setDisplayEditor({ textEditor: true, imageEditor: false })
                                                                                                //     console.log("cur", cur, indexes)
                                                                                                // }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem.positionType, j + 1, i)
                                                                                                        // setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                // onMouseEnter={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onMouseLeave={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                // }}
                                                                                                // onDragOver={e => {
                                                                                                //     e.preventDefault()
                                                                                                //     e.stopPropagation()
                                                                                                //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                                                                                                // }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                {/* <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" >
                                                                                                                    <Editor key={currPage} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })} onChange={(content, editorState) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                        htmlContent={subElem?.textValue}
                                                                                                                        editorState={subElem?.editorState || `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                                    />
                                                                                                                </div> */}
                                                                                                {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                {/* <SunEditor
                                                                                                                    setOptions={SunEditorConfig}
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    value={subElem.textValue || ''}
                                                                                                                    onChange={(content) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = content
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                /> */}
                                                                                            </div>
                                                                                        )
                                                                                    case 'image':
                                                                                        // const imageSelector = document.getElementById("hidden-image-input")
                                                                                        if (subElem.src !== "") {
                                                                                            return (
                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`}
                                                                                                    // onDragStart={e => {
                                                                                                    //     e.stopPropagation()
                                                                                                    //     e.dataTransfer.setData("type", "rearrange_image")
                                                                                                    //     // setTransfered("rearrange_image")
                                                                                                    //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    //     // setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    // }}
                                                                                                    // onMouseEnter={(e) => {
                                                                                                    //     e.stopPropagation()
                                                                                                    //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    // }}
                                                                                                    // onMouseLeave={(e) => {
                                                                                                    //     e.stopPropagation()
                                                                                                    //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                    // }}
                                                                                                    // onClick={e => {
                                                                                                    //     e.stopPropagation()
                                                                                                    //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                    //     // setCurrPosition({ ...currPosition, selectedType: "image" })
                                                                                                    //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    //     setValues(subElem?.style)
                                                                                                    //     setDisplayEditor({ textEditor: false, imageEditor: true })
                                                                                                    // }}
                                                                                                    onDrop={e => {
                                                                                                        e.stopPropagation()
                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                            // setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                        } else {
                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                        }
                                                                                                    }}
                                                                                                    // onDragOver={e => {
                                                                                                    //     e.preventDefault()
                                                                                                    //     e.stopPropagation()
                                                                                                    //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    //     setMousePos({ ...mousePos, y: e.clientY })
                                                                                                    // }}
                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                    {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                    <img
                                                                                                        className="img-fluid"
                                                                                                        src={subElem.src}
                                                                                                        alt={`Selected Image ${i}`}
                                                                                                        style={{ width: "100%" }}
                                                                                                    />
                                                                                                </div>
                                                                                            )
                                                                                        } else {
                                                                                            // setCurrPosition({ ...currPosition, j })
                                                                                            // imageSelector.click()
                                                                                            triggerImage()
                                                                                            const dupArray = [...colWise]
                                                                                            dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                                                            setcolWise([...dupArray])
                                                                                        }
                                                                                    case 'button':
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}
                                                                                                // onDragStart={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     e.dataTransfer.setData("type", "rearrange_button")
                                                                                                //     // setTransfered("rearrange_button")
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     // setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onClick={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                //     // setCurrPosition({ ...currPosition, selectedType: "button" })
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setValues(subElem?.style)
                                                                                                // }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        // setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                // onMouseEnter={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onMouseLeave={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                // }}
                                                                                                // onDragOver={e => {
                                                                                                //     e.preventDefault()
                                                                                                //     e.stopPropagation()
                                                                                                //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setMousePos({ ...mousePos, y: e.clientY })
                                                                                                // }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                                                    <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`}>
                                                                                                        {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                        {/* <SunEditor
                                                                                                                        setOptions={SunEditorConfig}
                                                                                                                        
                                                                                                                        value={subElem.textValue || ''}
                                                                                                                        onChange={(content) => {
                                                                                                                            const dupText = [...colWise]
                                                                                                                            dupText[key].elements[i].element[j].textValue = content
                                                                                                                            setcolWise(dupText)
                                                                                                                        }}
                                                                                                                    /> */}
                                                                                                        <div className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    case 'input':
                                                                                        return (
                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center" }}
                                                                                                // onDragStart={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     e.dataTransfer.setData("type", "rearrange_input")
                                                                                                //     // setTransfered("rearrange_input")
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     // setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onClick={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                //     // setCurrPosition({ ...currPosition, selectedType: "input" })
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setValues(subElem.style)
                                                                                                //     console.log("input clicked")
                                                                                                // }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        // setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                // onMouseEnter={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onMouseLeave={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                // }}
                                                                                                // onDragOver={e => {
                                                                                                //     e.preventDefault()
                                                                                                //     e.stopPropagation()
                                                                                                //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j + 1 })
                                                                                                //     setMousePos({ ...mousePos, y: e.clientY })
                                                                                                // }}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                <div style={{ width: subElem?.style?.width }}>
                                                                                                    {subElem?.hasLabel && (<label style={{ color: subElem?.style?.color, fontFamily: subElem?.style?.fontFamily }}>{subElem?.labelText}</label>)}
                                                                                                    <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%" }} readOnly />
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    case 'offer':
                                                                                        return (

                                                                                            <div
                                                                                                // onDragStart={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     e.dataTransfer.setData("type", "rearrange_offer")
                                                                                                //     // setTransfered("rearrange_offer")
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     // setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onMouseEnter={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                // }}
                                                                                                // onMouseLeave={(e) => {
                                                                                                //     e.stopPropagation()
                                                                                                //     setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                // }}
                                                                                                // onClick={e => {
                                                                                                //     e.stopPropagation()
                                                                                                //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                //     // setCurrPosition({ ...currPosition, selectedType: "offer" })
                                                                                                //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setValues(subElem?.style)
                                                                                                // }}
                                                                                                onDrop={e => {
                                                                                                    e.stopPropagation()
                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                        // setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                    } else {
                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                    }
                                                                                                }}
                                                                                                // onDragOver={e => {
                                                                                                //     e.preventDefault()
                                                                                                //     e.stopPropagation()
                                                                                                //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                //     setMousePos({ ...mousePos, y: e.clientY })
                                                                                                // }} 
                                                                                                style={{ ...subElem?.style, ...bgOffer, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}
                                                                                                id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                {gotOffers ? finalObj?.selectedOffers?.map((ele) => {
                                                                                                    return (
                                                                                                        <div style={{ margin: "10px 0px 20px" }}>
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
                                                                                                                    backgroundColor: finalObj?.offerProperties?.colors?.primaryBg
                                                                                                                }}>
                                                                                                                    <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{ padding: '15px' }}>
                                                                                                                        <div style={{ text: 'wrap' }}>
                                                                                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textTransform: 'uppercase' }}>
                                                                                                                                <h2 style={{ fontWeight: 'bolder', fontSize: '0.9rem', color: finalObj?.offerProperties?.colors?.code }}>
                                                                                                                                    {ele?.Code}
                                                                                                                                </h2>
                                                                                                                                {finalObj?.offerProperties?.showSections?.includes("description") && <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj?.offerProperties?.colors?.description }}>
                                                                                                                                    {ele?.Summary}
                                                                                                                                </span>}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        {finalObj?.offerProperties?.showSections?.includes("validity") && <div>
                                                                                                                            <div style={{ paddingTop: '0.5rem' }}>
                                                                                                                                <span style={{ color: finalObj?.offerProperties?.colors?.validity, textTransform: 'uppercase', fontWeight: '500', fontSize: '0.65rem' }}>
                                                                                                                                    valid until: {ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format('L') : "Never ending"}
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                        </div>}
                                                                                                                    </div>
                                                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", padding: "0px 15px 15px" }}>
                                                                                                                        <div style={{
                                                                                                                            position: 'relative',
                                                                                                                            display: 'flex',
                                                                                                                            flexDirection: 'column',
                                                                                                                            justifyContent: 'space-between',
                                                                                                                            alignItems: 'center',
                                                                                                                            backgroundColor: finalObj?.offerProperties?.colors?.secondaryBg,
                                                                                                                            // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                            padding: "1rem 0.25rem",
                                                                                                                            borderRadius: "0px 0px 5px 5px"
                                                                                                                        }}>
                                                                                                                            <h1 style={{
                                                                                                                                fontSize: '1.829rem',
                                                                                                                                fontWeight: '750',
                                                                                                                                fontFamily: 'Montserrat',
                                                                                                                                color: finalObj?.offerProperties?.colors?.value
                                                                                                                            }}>
                                                                                                                                {
                                                                                                                                    ele?.Type === "PERCENTAGE" ? (
                                                                                                                                        `${Number(ele?.Value).toFixed(0)}%`
                                                                                                                                    ) : `₹${Number(ele?.Value).toFixed(0)}`
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
                                                                                                                                color: finalObj?.offerProperties?.colors?.button,
                                                                                                                                // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                fontSize: '0.65rem',
                                                                                                                                fontWeight: '700',
                                                                                                                                cursor: 'pointer',
                                                                                                                                border: `0.75px solid ${finalObj?.offerProperties?.colors?.button}`,
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
                                                                                                                {finalObj?.offerProperties?.showSections?.includes("usage") && <div style={{
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
                                                                                                                    <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj.offerProperties.colors.usage, backgroundColor: finalObj.offerProperties.colors.primaryBg, fontWeight: '300', whiteSpace: "nowrap" }}>
                                                                                                                        Used xyz times
                                                                                                                    </span>
                                                                                                                </div>}
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
                                                                                    default:
                                                                                        return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                                                                        // onClick={(e) => makActive(e, cur)}
                                                                                        // onDragOver={(e) => {
                                                                                        //     e.preventDefault()
                                                                                        //     e.stopPropagation()
                                                                                        //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                        //     // handleDragOver(e)
                                                                                        //     setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                        //     setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                        // }}
                                                                                        // onClick={(e) => {
                                                                                        //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                        // }}
                                                                                        // onDrop={(e) => {
                                                                                        //     e.stopPropagation()
                                                                                        //     makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                        //     handleElementDrop(e, curElem?.positionType, key, i, curElem, j)
                                                                                        // }}
                                                                                        >
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
                            {/* </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Appearance