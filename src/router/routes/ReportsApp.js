// import { lazy } from 'react'
import DetailAnalytics from '../../views/ReportsApp/DetailAnalytics'
import GraphicalAnalytics from '../../views/ReportsApp/GraphicalAnalytics'

const ReportsApp_Routes = [
    {
        path: '/merchant/ReportsApp/detailanalytics/',
        element: <DetailAnalytics />
    },
    {
        path: '/merchant/ReportsApp/graphicalanalytics/',
        element: <GraphicalAnalytics />
    }
]

export default ReportsApp_Routes   