import { lazy } from 'react'
import Setting from '../../views/FlashAccounts/Setting'
import JoinUs from '../../views/SuperLeadz/JoinUs'
import FlashAccountsBilling from '../../views/FlashAccounts/Billing'
const Table = lazy(() => import('../../views/FlashAccounts/Table'))
const Dashboard = lazy(() => import('../../views/FlashAccounts/Dashboard'))
const Form = lazy(() => import('../../views/FlashAccounts/Form.jsx'))


const FlashAccounts_Routes = [
  {
    path: '/merchant/Flash_Account/',
    element: <Dashboard />
  },
  {
    path: '/merchant/Flash_Account/table/',
    element: <Table />
  },
  // {
  //   path: "/merchant/Flash_Account/form/",
  //   element: <Form />
  // },
  {
    path: "/merchant/Flash_Account/settings/",
    element: <Setting />,
    meta: {
      layout: "fullWidthLayout"
    }
  },
  {
    path: "/merchant/Flash_Account/billing/",
    element: <FlashAccountsBilling />
  }
]

export default FlashAccounts_Routes