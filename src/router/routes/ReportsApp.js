// import { lazy } from 'react'
import DetailAnalytics from '../../views/ReportsApp/DetailAnalytics'
import Graph from '../../views/ReportsApp/Graph'

const ReportsApp_Routes = [
    {
        path: '/merchant/ReportsApp/detailanalytics/',
        element: <DetailAnalytics />
    },
    {
        path: '/merchant/ReportsApp/graph/',
        element: <Graph />
    }
]

export default ReportsApp_Routes   