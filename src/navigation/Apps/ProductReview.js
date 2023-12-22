import { Circle, Home } from "react-feather"
import { ownUrl } from "../../views/Validator"
import { AiFillPhone } from "react-icons/ai"
import { BiDollar } from "react-icons/bi"

export const ProductReviewNavigation = [
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
      header: 'Product Review'
    },
    {
        id: 'product-review',
        title: 'Home',
        icon: <Circle size={20} />,
        navLink: '/merchant/product-review'
    },
    {
        id: 'analytics',
        title: 'Analytics',
        icon: <Circle size={20} />,
        navLink: '/merchant/analytics'
    },
    {
        id: 'reviews',
        title: 'Manage Reviews',
        icon: <Circle size={20} />,
        navLink: '/merchant/manage-reviews'
    }
]