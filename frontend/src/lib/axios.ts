import axios from "axios";


// creates a base URL so it doesn't have to be retyped 
// every time you access the url through api
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
})