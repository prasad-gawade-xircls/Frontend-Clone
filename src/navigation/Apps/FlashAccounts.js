import { Circle, Home } from "react-feather"
import { ownUrl } from "../../views/Validator"

export const flashAccountsNavigation = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20} />,
        navLink: '/merchant/home/'
    },
    {
        id: 'app',
        title: 'Apps',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}//images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/merchant/apps/'
    },
    {
      header: 'Flash Accounts'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/'
    },
    {
        id: 'registered_customer',
        title: 'Registered Customers',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/table/'
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/form/'
    }
]