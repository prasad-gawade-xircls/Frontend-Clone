import { lazy } from 'react'
const Leads = lazy(() => import('../../views/Leads/Leads'))
const Customers = lazy(() => import('../../views/Leads/Customers'))
const AddCustomerGroups = lazy(() => import('../../views/CrossMarketing/AddCustomerGroups'))


const Customers_Routes = [
  {
    path: '/merchant/leads',
    element: <Leads />
  },
  {
    path: '/merchant/customers',
    element: <Customers />
  },
  {
    path: "/merchant/customers/create-groups/",
    element: <AddCustomerGroups />
  }

]

export default Customers_Routes