import axios, { AxiosHeaders } from 'axios'

export const BASE_URL = "http://192.168.1.158:8000"
export const BASE_URL_WS = "ws://192.168.1.158:8000"

const api = axios.create({
    baseURL: BASE_URL
})

export const fetchJosn = () => {
     axios.AxiosHeaders = AxiosHeaders;
     return axios;
}

export default api;