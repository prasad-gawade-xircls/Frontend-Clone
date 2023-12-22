// ** React Imports
import { Outlet } from 'react-router-dom'
// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'
import { SuperLeadzNavigation } from '../navigation/Apps/SuperLeadz'
import { InfinitiNavigation } from '../navigation/Apps/Infiniti'
import { referralNavigation } from '../navigation/Apps/Referral'
import { flashAccountsNavigation } from '../navigation/Apps/FlashAccounts'
import { useContext } from 'react'
import { PermissionProvider } from '../Helper/Context'
import { DefaultNav } from '../navigation/Apps/DefualtNav'
import { ProductReviewNavigation } from '../navigation/Apps/ProductReview'

// ** Menu Items Array
// import navigation from '@src/navigation/vertical'

const VerticalLayout = props => {

  const { userPermission } = useContext(PermissionProvider)

  let navigation = []

  if (userPermission?.appName === "superleadz") {
    navigation = SuperLeadzNavigation
  } else if (userPermission?.appName === "infiniti") {
    navigation = InfinitiNavigation
  } else if (userPermission?.appName === "referral") {
    navigation = referralNavigation
  } else if (userPermission?.appName === "flash_accounts") {
    navigation = flashAccountsNavigation
  } else if (userPermission?.appName === "product_review") {
    navigation = ProductReviewNavigation
  } else {
    navigation = DefaultNav
  }

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
