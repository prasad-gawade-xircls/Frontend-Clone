import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'
import CustomizationWrap from './views/Components/SuperLeadz/CustomizationWrap'
import PermissionWrapper from './configs/PermissionWrapper'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { SuperLeadzLinkValidation } from './Helper/Context'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])
  const [validateLink, setValidateLink] = useState({ audience: false, templates: false, editTheme: false })
  const [visitorSettings, setVisitorSettings] = useState("ALL_VISITORS")

  // ** Hooks
  const { layout } = useLayout()


  useEffect(() => {
    setAllRoutes(getRoutes(layout))
  }, [layout])


  return (
    <CustomizationWrap>
      <SuperLeadzLinkValidation.Provider value={{ validateLink, setValidateLink, visitorSettings, setVisitorSettings }}>
      <PermissionWrapper>
        <Suspense fallback={null}>
          <Router allRoutes={allRoutes} />
        </Suspense>
      </PermissionWrapper>
      </SuperLeadzLinkValidation.Provider>
    </CustomizationWrap>
  )
}

export default App
