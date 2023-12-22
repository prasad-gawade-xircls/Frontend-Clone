// import ProductReview from '@src/views/ProductReviews/Product_Review/ProductReview.js'
// import Reviews from '@src/views/ProductReviews/Manage_Reviews/Reviews.js'
import Dashboard from '../../views/ProductReviews/Dashboard'
import AllReviews from '../../views/ProductReviews/AllReviews'
import Analytics from '../../views/ProductReviews/Analytics'
import ManageReviews from '../../views/ProductReviews/ManageReviews'

export const ProductReview_Routes = [
    {
        path: '/merchant/product-review/',
        element: <Dashboard />
    },
    {
        path: '/merchant/analytics',
        element: <Analytics />
    },
    {
        path: '/merchant/manage-reviews',
        element: <ManageReviews />
    },
    {
        path: '/merchant/allreviews/',
        element: <AllReviews />
    }
]