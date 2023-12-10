import React from 'react'
import { Info } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

const CardCom = ({ icon, title, data, info, indicator, indiInfo }) => {
    return (
        <Card>
            <CardBody>
                <div className='icon d-flex justify-content-between'>
                    <div>
                        {icon ? icon : ""}
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                        {indicator ? indicator : ""}
                        <h4>{indiInfo}</h4>
                    </div>

                </div>
                <div className="d-flex mt-2 justify-content-between align-items-baseline">
                    <h4 style={{ borderBottom: '0px dotted lightgray', whiteSpace: 'nowrap', paddingRight: '10px' }} title={info} className='m-0 position-relative cursor-default'>
                        {title ? title : ""}
                        {info && data ? <span className='position-absolute' title={info} style={{ top: '-10px', right: '-4px', cursor: 'pointer' }}><Info size={12} /></span> : ''}
                    </h4>
                    <h4 title={data} className='m-0' style={{ fontSize: '3rem', cursor: "default", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {data ? data : "0"}
                    </h4>
                </div>

            </CardBody>
        </Card>
    )
}

export default CardCom