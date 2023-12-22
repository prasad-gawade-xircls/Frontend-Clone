import { lazy } from 'react'
import ThankYouPage from '../../views/CRM/Customers/ThankYouPage'
const Leads = lazy(() => import('../../views/Leads/Leads'))
const Customers = lazy(() => import('../../views/Leads/Customers'))
const AddCustomerGroups = lazy(() => import('../../views/CrossMarketing/AddCustomerGroups'))
const CustomerProfileBasic = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic'))
const CustomerProfileBooking = lazy(() => import('../../views/CRM/Customers/CustomerProfileBooking'))
const CustomerProfileCall = lazy(() => import('../../views/CRM/Customers/CustomerProfileCall'))
const CustomerProfileDetails = lazy(() => import('../../views/CRM/Customers/CustomerProfileDetails'))
const CustomerProfileInvoice = lazy(() => import('../../views/CRM/Customers/CustomerProfileInvoice'))
const CustomerProfileLoyalty = lazy(() => import('../../views/CRM/Customers/CustomerProfileLoyalty'))
const CustomerProfileOffer = lazy(() => import('../../views/CRM/Customers/CustomerProfileOffer'))
const CustomerProfileProducts = lazy(() => import('../../views/CRM/Customers/CustomerProfileProducts'))
const CustomerProfileVehicle = lazy(() => import('../../views/CRM/Customers/CustomerProfileVehicle'))
const CustomerBasicAccount = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic/CustomerBasicAccount'))
const CustomerBasicAddress = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic/CustomerBasicAddress'))
const CustomerBasicCompanyInfo = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic/CustomerBasicCompanyInfo'))
const CustomerBasicIdProof = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic/CustomerBasicIdProof'))
const CustomerBasicPersonal = lazy(() => import('../../views/CRM/Customers/CustomerProfileBasic/CustomerBasicPersonal'))
const AddCustomerForm = lazy(() => import('../../views/CRM/Customers/AddCustomerForm'))


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
    path: '/merchant/customers/customer_details',
    element: <CustomerProfileDetails />
  },
  {
    path: '/merchant/customers/customer_basic/',
    element: <CustomerProfileBasic />
  },
  {
    path: '/merchant/customers/customer_basic/personal_info',
    element: <CustomerBasicPersonal />
  },
  {
    path: '/merchant/customers/customer_basic/id_proof',
    element: <CustomerBasicIdProof />
  },
  {
    path: '/merchant/customers/customer_basic/address',
    element: <CustomerBasicAddress />
  },
  {
    path: '/merchant/customers/customer_basic/company_info',
    element: <CustomerBasicCompanyInfo />
  },
  {
    path: '/merchant/customers/customer_basic/account',
    element: <CustomerBasicAccount />
  },
  {
    path: '/merchant/customers/customer_booking',
    element: <CustomerProfileBooking />
  },
  {
    path: '/merchant/customers/customer_call',
    element: <CustomerProfileCall />
  },
  {
    path: '/merchant/customers/customer_invoice',
    element: <CustomerProfileInvoice />
  },
  {
    path: '/merchant/customers/customer_loyalty',
    element: <CustomerProfileLoyalty />
  },
  {
    path: '/merchant/customers/customer_offer',
    element: <CustomerProfileOffer />
  },
  {
    path: '/merchant/customers/customer_products',
    element: <CustomerProfileProducts />
  },
  {
    path: '/merchant/customers/customer_vehicle',
    element: <CustomerProfileVehicle />
  },
  {
    path: "/merchant/customers/create-groups/",
    element: <AddCustomerGroups />
  },
  {
    path: "/:outletName/add_customer/",
    meta: {
      layout: 'fullWidthLayout'
    },
    element: <AddCustomerForm />
  },
  {
    path: "/merchant/thank_you_page/",
    meta: {
      layout: 'fullWidthLayout'
    },
    element: <ThankYouPage />
  }

]

export default Customers_Routes