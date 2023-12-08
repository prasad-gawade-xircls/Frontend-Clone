import { useState } from 'react'
import Breadcrumb from './Breadcrum'

const Wrapper = () => {

    const [campaignWiseData, setCampaignWiseData] = useState("ppp")

    console.log(campaignWiseData, setCampaignWiseData, "campaignWiseData")

    // useEffect(() => {
    //     const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=maapro.myshopify.com&app=superleadz&theme_id=${id}`)

    //     axios({
    //         method: "GET",
    //         url
    //     })
    //         .then((response) => {
    //             const theme = response.data.theme_json
    //             const custom_theme = JSON.parse(theme[0].custom_theme)
    //             console.log("cust theme:", custom_theme)
    //             // console.log("page name:", custom_theme.pages)
    //             // setCampaignWiseData(custom_theme)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    return (
        <>
            <div className='popup-cust'>
                <div className='mt-1'>
                    <Breadcrumb />
                </div>
                {/* <div className="center_div d-flex justify-content-center align-items-start bg-white h-100" style={{ width: '100%', borderRadius: '1rem', position: 'relative' }}>
                    <img className="position-absolute" style={{zIndex: '0', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))', rotate: '180deg'}} width={"145%"} src={cloudbg} alt="" />
                    {children}
                </div> */}
            </div>
        </>
    )
}

export default Wrapper