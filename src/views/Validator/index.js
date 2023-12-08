import toast from "react-hot-toast"
import $ from "jquery"
import { PermissionProvider } from "../../Helper/Context"
import { useContext } from "react"

export const imageValidation = (e) => {
    const maxSizeKB = 100 //Size in KB
    const maxSize = maxSizeKB * 1024 //File size is returned in Bytes
    const file_name = e.target.files[0].name.split('.').slice(0, -1).join('.')

    if (e.target.files[0].size > maxSize) {
        toast.error("File size is above 100KB")
        return false
    } else if (file_name.includes('.')) {
        toast.error("File name should not contain dot")
        return false
    } else if (file_name.includes(' ')) {
        toast.error("File name should not contain space.")
        return false
    } else {
        return true
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}

export function formatDate(date) {
    return `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
}

export const validateEmail = (email) => {

    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailCheck.test(email)) {
        return true
        // this is a valid email address
    } else {
        return false
        // invalid email
    }

}

export const xircls_url = "https://api.xircls.com/static"
export const ownUrl = "https://api.xircls.com/static"

export const formatNumberWithCommas = (number) => {
    let data
    try {
        data = Number(number).toLocaleString()
    } catch (error) {
        data = 0
    }
    return data
}

export const pageNo = [{ label: 10, value: 10 }, { label: 25, value: 25 }, { label: 50, value: 50 }, { label: 100, value: 100 }]

export const timelineName = {
    infiniti: {
        dashboard: "/merchant/dashboard/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/plan_pricing/1/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_ret_offer_created: "/merchant/create_offers/?purpose=RET",
        is_acq_offer_created: "/merchant/create_offers/?purpose=ACQ",
        is_ret_offer_synced: "/merchant/offers/",
        is_acq_offer_synced: "/merchant/offers/"
    },
    superleadz: {
        dashboard: "/merchant/SuperLeadz/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/merchant/SuperLeadz/joinus/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_offer_created: "/merchant/SuperLeadz/create_offers/",
        is_offer_synced: "/merchant/SuperLeadz/offers/",
        is_campaign_started: "/merchant/SuperLeadz/Themes/",
        is_campaign_completed: "/merchant/campaign/"
    }
}

export const CompleteTimelineName = {
    infiniti: {
        dashboard: "/merchant/dashboard/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/plan_pricing/1/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_ret_offer_created: "/merchant/create_offers/?purpose=RET",
        is_acq_offer_created: "/merchant/create_offers/?purpose=ACQ",
        is_ret_offer_synced: "/merchant/offers/",
        is_acq_offer_synced: "/merchant/offers/"
    },
    superleadz: {
        is_plugin_installed: "/merchant/SuperLeadz/",
        is_plan_purchased: "/merchant/SuperLeadz/billing/",
        is_campaign_started: "/merchant/SuperLeadz/all_campaigns/"
    }
}

export function validForm(validator, value) {
    console.log(validator.length)
    let isValid = true
    for (let i = 0; i < validator.length; i++) {
        const currentObject = validator[i]
        const fieldValue = value[currentObject.name]
        console.log(`${currentObject.id}_val`)

        const valueType = Array.isArray(fieldValue)
        console.log(valueType, "isArray")
        if (valueType) {
            if (fieldValue.length === 0) {
                $(`#${currentObject.id}_val`).html(currentObject.message)
                $(`input[name="${currentObject.id}"]`).focus()
                isValid = false
                break 
            } else {
                $(`#${currentObject.id}_val`).html('')
                // console.log('Some fields are empty')
            }
        } else {

            if (!fieldValue) {
                $(`#${currentObject.id}_val`).html(currentObject.message)
                $(`input[name="${currentObject.id}"]`).focus()
                isValid = false
                break 
            } else {
                $(`#${currentObject.id}_val`).html('')
                // console.log('Some fields are empty')
            }
        }
        
        // (empty string, empty array, false, null, undefined) covered ths all
    } 

    
    return isValid 
}

// $('.make_capitail').on('keyup', function() {
//     const $this = $(this)
//     const val = $this.val()

//     val = val.substr(0, 1).toUpperCase() + val.substr(1)
//     $this.val(val)
// });

export function getCurrentOutlet() {
    const { userPermission } = useContext(PermissionProvider)

    const campaignData = userPermission?.multipleDomain?.filter((cur) => cur?.api_key === userPermission?.apiKey)

    return campaignData
}

export const dashboardURL = {
    infiniti: "/merchant/dashboard/",
    superleadz: "/merchant/SuperLeadz/",
    referral: "/merchant/Referral/",
    flash_accounts: "/merchant/Flash-Account/"
}

export function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Letters
    const numbers = '0123456789' // Numbers
  
    const randomLetter = () => characters.charAt(Math.floor(Math.random() * characters.length))
    const randomNumber = () => numbers.charAt(Math.floor(Math.random() * numbers.length))
  
    const randomString = randomNumber() + randomLetter() + randomLetter()
    return randomString
}