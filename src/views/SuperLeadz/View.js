import React from 'react'
import JsonToJsx from '../Components/SuperLeadz/JsonToJsx'
import { useLocation } from 'react-router-dom'

const View = () => {
  const location = useLocation()


  return (

    <div className="flex-grow-1 position-relative" style={{ backgroundImage: 'url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")', height: "100vh" }}>
      <div className='d-flex align-items-center h-100'>
        {
          location?.state?.custom_theme ? <JsonToJsx isMobile={false} renderObj={JSON.parse(location?.state?.custom_theme)} scale={1} /> : ''
        }

      </div>
    </div>
  )
}

export default View