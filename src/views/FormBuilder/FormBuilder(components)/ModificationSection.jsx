import React, { useState, useEffect } from 'react'
import { ChevronLeft } from 'react-feather'

const ModificationSection = ({ styles, general, advanced, currPosition, setCurrPosition }) => {

    // console.log(styles, general, advanced, currPosition.selectedType)

    const list = [
        {
            label: "general",
            value: general
        },
        {
            label: "style",
            value: styles
        },
        {
            label: "advanced",
            value: advanced
        }
    ]

    const initialActiveMenu = general ? "general" : (styles ? "style" : "advanced")
    const [activeMenu, setActiveMenu] = useState(initialActiveMenu)
    // const [activeMenu, setActiveMenu] = useState(() => {
    //     const activeIndex = list.findIndex(ele => ele.value === general || ele.value === styles || ele.value === advanced)
    //     return general ? activeIndex !== -1 ? (list[activeIndex].label) : (general ? "general" : "style") : "style"
    // })   
    // console.log(activeMenu)
    useEffect(() => {
        const initialActiveMenu = general ? "general" : (styles ? "style" : "advanced")
        setActiveMenu(initialActiveMenu)
    }, [currPosition])
    return (
        <div className='d-flex flex-column h-100'>
            <div className="w-100 h-100 d-flex flex-column flex-grow-1">

                <div className="w-100 d-flex align-items-center my-1">
                    <button
                        type="button"
                        className="btn btn-link m-0 p-0"
                    >
                        <span onClick={() => {
                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                        }}>
                            <ChevronLeft />
                        </span>
                    </button>
                    <p className='m-0 fw-bolder text-black text-capitalize ps-1' style={{ padding: "0.25rem 0.5rem 0px", fontSize: "1.3rem" }}>{currPosition.selectedType}</p>
                </div>
                <div className="d-flex align-items-center border-bottom">
                    {list.map((ele, key) => {
                        if (ele.value) {
                            return (
                                <div key={key} className={`w-100 text-center text-capitalize ${activeMenu === ele.label ? "text-primary border-bottom-primary" : "border-bottom-white"}`} style={{ textDecorationColor: "#7367f0", cursor: "pointer", padding: "0.5rem" }} onClick={() => setActiveMenu(ele.label)}>{ele.label}</div>
                            )
                        }
                    })}
                </div>
                <div className="flex-grow-1" style={{ overflow: "auto", overflowX: 'hidden' }}>
                    {activeMenu === "general" && (
                        <>{general}</>
                    )}
                    {activeMenu === "style" && (
                        <>{styles}</>
                    )}
                    {activeMenu === "advanced" && (
                        <>{advanced}</>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModificationSection