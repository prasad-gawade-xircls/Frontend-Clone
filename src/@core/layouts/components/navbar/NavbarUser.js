// ** Dropdowns Imports
import { useContext, useEffect } from 'react'
import UserDropdown from './UserDropdown'
import { PermissionProvider } from '../../../../Helper/Context'
import { getReq } from '../../../../assets/auth/jwtService'
import { Link, useNavigate } from 'react-router-dom'
import countries from '../../../../views/NewFrontBase/Country'
// import NavbarSearch from './NavbarSearch'
// import { FaLayerGroup } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom'

const NavbarUser = ({disableName}) => {
  const { userPermission, setUserPermission, setReloader, reloader } = useContext(PermissionProvider)
  // const [campaignData, setCampaignData] = useState()

  const campaignData = userPermission?.campaign ? userPermission?.campaign?.filter((cur) => {
    return userPermission?.appName === cur.app
  }) : []
  
  const navigate = useNavigate()
  const getApps = () => {
    getReq('getApps')
    .then((resp) => {
      console.log(resp)
      let name
      // if (userPermission.installedApps.includes(resp.data.installed_apps[0])) {
      //   name = userPermission.appName
      // } else {
      //   name = resp.data.installed_apps[0]
      // }

      const currentOutlet = userPermission?.multipleDomain?.filter((curElem) => curElem.api_key === userPermission?.apiKey)
      // console.log(currentOutlet, "currentOutlet")
      const symbol = currentOutlet[0]?.outlet_currency ? currentOutlet[0]?.outlet_currency : "AFN"
      const merchantCurrency = countries.filter((curElem) => curElem?.currency?.code === symbol)

      if (resp.data.installed_apps.includes(userPermission?.appName)) {
        name = userPermission?.appName
      } else {
        navigate('/merchant/apps/')
        name = ""
      }

      const updatedPermission = {
        appName: name,
        installedApps: resp.data.installed_apps,
        campaign: resp?.data?.status,
        currencySymbol: merchantCurrency[0]?.currency?.symbol
      }

      setUserPermission((curElem) => ({
        ...curElem,
        ...updatedPermission
      }))

    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    // if (userPermission?.apiKey !== "") {
      getApps()
    // }
    
  }, [userPermission?.apiKey])

  console.log(campaignData, "campaignData")

  return (
    <div className='d-flex just-content-end align-items-center gap-2'>
      {
        userPermission?.appName === "infiniti" && (campaignData[0]?.status === 0 || campaignData[0]?.status === "0") ? <Link to={"/merchant/campaign/"} className='btn btn-outline-primary' style={{whiteSpace: 'nowrap'}}>Complete Your Campaign</Link> : ''
      }

      {
        userPermission?.multipleDomain.length > 1 ? <select className='form-control' style={{appearance: 'auto'}} onChange={(e) => {
          // window.location.reload(false)
          setReloader(reloader + 1)
          setUserPermission({...userPermission, apiKey : e.target.value})
          navigate('/merchant/apps/')
        }}>
          {
            userPermission?.multipleDomain?.map((cur, i) => {
              return <option key={i} value={cur.api_key} selected={userPermission?.apiKey === cur.api_key}>{cur.outlet_name}</option>
            })
          }
        </select> : ''
      }
      
      
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <UserDropdown disableName={disableName} />
      </ul>
    </div>
  )
}
export default NavbarUser
