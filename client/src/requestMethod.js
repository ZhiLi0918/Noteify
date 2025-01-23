import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjMyNzM0ZmE2MWNmM2M2YTc2MzU1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDg4NzI3NiwiZXhwIjoxNzExMTQ2NDc2fQ.VRuNrx_H1hz_sRPnpHnqLC1A2XkMcLEnH-HEE2FtYbM"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})