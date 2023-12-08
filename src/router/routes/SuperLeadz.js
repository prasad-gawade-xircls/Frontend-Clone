import { lazy } from 'react'
import CustomizationParent from '../../views/SuperLeadz/CustomizationParent'
import AllCampaigns from '../../views/NewCustomizationFlow/AllCampaigns'
import CreateSupportTicket from '../../views/SuperLeadz/CreateSupportTicket'
import QuillTest from '../../views/NewCustomizationFlow/QuillTest'
import Customization from '../../views/SuperLeadz/Intro/Customization'
import Preview from '../../views/SuperLeadz/Preview'
import Overview from '../../views/SuperLeadz/campaignView/Overview'
import Appearance from '../../views/SuperLeadz/campaignView/Appearance'
import Rules from '../../views/SuperLeadz/campaignView/Rules'
import Duration from '../../views/SuperLeadz/campaignView/Duration'
import Campaign from '../../views/SuperLeadz/reports/Campaign'
import Offers from '../../views/SuperLeadz/reports/Offers'
import View from '../../views/SuperLeadz/View'
// import Overview from '../../views/Components/SuperLeadz/views/Overview'
// import Appearance from '../../views/Components/SuperLeadz/views/Appearance'
// import Rules from '../../views/Components/SuperLeadz/views/Rules'
// import Duration from '../../views/Components/SuperLeadz/views/Duration'
const CreateOffers = lazy(() => import('../../views/SuperLeadz/CreateOffers'))
const EditSupport = lazy(() => import('../../views/SuperLeadz/EditSupport'))
const LiveUpdates = lazy(() => import('../../views/SuperLeadz/Live'))
const CustomTemplate = lazy(() => import('../../views/SuperLeadz/Customization/CustomTemplate'))
const ButtonPosition = lazy(() => import('../../views/SuperLeadz/Customization/ButtonPosition'))
const Intro = lazy(() => import('../../views/SuperLeadz/Intro/Intro'))
const TheAudience = lazy(() => import('../../views/SuperLeadz/Intro/TheAudience'))
const Editbutton = lazy(() => import('../../views/SuperLeadz/Intro/Editbutton'))
const TheButton = lazy(() => import('../../views/SuperLeadz/Intro/TheButton'))
const Discount = lazy(() => import('../../views/SuperLeadz/Intro/Discount'))
const JoinUs = lazy(() => import('../../views/SuperLeadz/JoinUs'))
const FormEditor = lazy(() => import('../../views/FormBuilder/FormBuilder(components)/FormEditor'))
const MyFormBuilder = lazy(() => import('../../views/FormBuilder/MyFormBuilder'))
const NewCustomization = lazy(() => import('../../views/SuperLeadz/Customization/NewCustomization'))
const SuperLeadzDashboard = lazy(() => import('../../views/SuperLeadz/Dashboard'))
const SuperLeadzLeads = lazy(() => import('../../views/SuperLeadz/Leads'))
const SuperLeadzPerformance = lazy(() => import('../../views/SuperLeadz/Performance'))
const SuperLeadzOffers = lazy(() => import('../../views/SuperLeadz/Offers'))
const SuperLeadzBilling = lazy(() => import('../../views/SuperLeadz/Billing'))
const SuperLeadzFAQ = lazy(() => import('../../views/SuperLeadz/FAQ'))
const SuperLeadzSupport = lazy(() => import('../../views/SuperLeadz/Support'))
const Themes = lazy(() => import('../../views/SuperLeadz/Customization/Themes'))
const SemperFi = lazy(() => import('../../views/SuperLeadz/SemperFi'))
const Editor = lazy(() => import('../../views/NewCustomizationFlow/Editor'))


const SuperLeads_Routes = [
  {
    path: '/merchant/SuperLeadz/joinus/',
    element: <JoinUs />
  },
  {
    path: '/merchant/SuperLeadz/',
    element: <SuperLeadzDashboard />
  },
  {
    path: '/merchant/SuperLeadz/intro/',
    element: <Intro />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/TheAudience/',
    element: <TheAudience />
  },
  {
    path: '/merchant/SuperLeadz/Editbutton/',
    element: <Editbutton />
  },
  {
    path: '/merchant/SuperLeadz/Thebutton/',
    element: <TheButton />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/discount/',
    element: <Discount />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/leads/',
    element: <SuperLeadzLeads />
  },
  {
    path: '/merchant/SuperLeadz/performance/',
    element: <SuperLeadzPerformance />
  },
  {
    path: '/merchant/SuperLeadz/offers/',
    element: <SuperLeadzOffers />
  },
  {
    path: '/merchant/SuperLeadz/billing/',
    element: <SuperLeadzBilling />
  },
  {
    path: '/merchant/SuperLeadz/FAQ/',
    element: <SuperLeadzFAQ />
  },
  {
    path: '/merchant/support/',
    element: <SuperLeadzSupport />
  },
  {
    path: '/merchant/SuperLeadz/create_offers/',
    element: <CreateOffers />
  },
  {
    path: '/merchant/SuperLeadz/ticket/:id/',
    element: <EditSupport />
  },
  {
    path: '/merchant/SuperLeadz/live/',
    element: <LiveUpdates />
  },
  {
    path: '/merchant/SuperLeadz/CustomTemplate/',
    element: <CustomTemplate />
  },
  {
    path: '/merchant/SuperLeadz/ButtonPosition/',
    element: <ButtonPosition />
  },
  {
    path: '/merchant/SuperLeadz/MyFormBuilder/',
    element: <FormEditor />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/quilltest/',
    element: <QuillTest />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/Themes/',
    element: <Themes />
  },
  {
    path: '/merchant/SuperLeadz/testfmb/',
    element: <MyFormBuilder />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  // {
  //   path: '/merchant/SuperLeadz/new_customization/',
  //   element: <NewCustomization />
  // },
  {
    path: '/merchant/SuperLeadz/new_customization/',
    element: <CustomizationParent />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/new_customization/:EditThemeId/',
    element: <CustomizationParent />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/all_campaigns/',
    element: <AllCampaigns />
  },
  {
    path: '/merchant/SuperLeadz/semperfi/',
    element: <SemperFi />
  },
  {
    path: '/merchant/create_support/',
    element: <CreateSupportTicket />
  },
  {
    path: '/merchant/SuperLeadz/quick_setup/',
    element: <Customization />
  },
  {
    path: '/merchant/SuperLeadz/preview/:id/',
    element: <Preview />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/overview/:id/',
    element: <Overview />
  },
  {
    path: '/merchant/SuperLeadz/appearance/:id/',
    element: <Appearance />
  },
  {
    path: '/merchant/SuperLeadz/rules/:id/',
    element: <Rules />
  },
  {
    path: '/merchant/SuperLeadz/duration/:id/',
    element: <Duration />
  },
  {
    path: '/merchant/SuperLeadz/reports/campaign/',
    element: <Campaign />
  },
  {
    path: '/merchant/SuperLeadz/reports/offers/',
    element: <Offers />
  }
]

export default SuperLeads_Routes