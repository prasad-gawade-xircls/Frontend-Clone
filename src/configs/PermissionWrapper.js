import React, { useEffect, useState } from 'react'
import { PermissionProvider } from '../Helper/Context'
// import { getReq } from '../assets/auth/jwtService'

const PermissionWrapper = ({children}) => {
    const defaultData = {
        appName: '',
        multipleDomain: [],
        apiKey: '',
        installedApps: [],
        campaign: [],
        isSupport: false,
        isAdmin: false,
        currencySymbol: ""
    }
    const [userPermission, setUserPermission] = useState(localStorage.getItem('userPermission') ? JSON.parse(localStorage.getItem('userPermission')) : defaultData)
    const [reloader, setReloader] = useState(0)

    // let callbackChild = children
    //  console.log(callbackChild)
    // useEffect(() => {
    //     console.log("calling")
    //     callbackChild = children
    // }, [userPermission.apiKey, reloader])

    useEffect(() => {
        // console.log(userPermission, "changed")
        const params = new URLSearchParams(location.search)
        localStorage.setItem('userPermission', JSON.stringify(userPermission))
        if (params.get('aft_no')) {
            localStorage.setItem('aft_no', params.get('aft_no'))
        }

    }, [userPermission])

    // console.log(multipleDomain)

    return (
        <PermissionProvider.Provider value={{ userPermission, setUserPermission, setReloader, reloader}}>
            {children}
        </PermissionProvider.Provider>
    )
}

export default PermissionWrapper