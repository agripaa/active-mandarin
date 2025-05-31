import { url } from "./url"

export const API = (method, endpoint, data) => {
    return{
        method: method,
        url: `${url.BASE_URL}${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        data: data
    }
}