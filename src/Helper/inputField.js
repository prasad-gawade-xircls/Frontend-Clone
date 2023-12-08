import React from "react"
import Flatpickr from "react-flatpickr"
import moment from "moment"
import { Col } from "reactstrap"

const InputField = ({ dataToCheck, advanceData, updateData }) => {
    return (
        <>
            {dataToCheck.map((item) => (
                <Col key={item.id}>
                    <label>{item.title}</label>
                    {item.type === "text" ? (
                        <input
                            className="form-control"
                            name={item.id}
                            value={advanceData[item.id]}
                            onChange={(e) => updateData(e, item)}
                            placeholder={item.title}
                        />
                    ) : item.type === "date" ? (
                        <Flatpickr
                            options={{ minDate: "today", dateFormat: "Y-m-d" }}
                            className="form-control"
                            name={item.id}
                            value={advanceData[item.id]}
                            onChange={(e) => updateData({
                                target: {
                                    name: item.id,
                                    value: moment(e[0]).format("YYYY-MM-DD")
                                }
                            })}
                            placeholder={item.title}
                        />
                    ) : item.type === "select" ? (
                        <select
                            className="form-control"
                            name={item.id}
                            value={advanceData[item.id]}
                            onChange={(e) => updateData(e, item)}
                        >
                            {item.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                    ) : null
                    }
                </Col>
            ))}
        </>
    )
}

export default InputField
