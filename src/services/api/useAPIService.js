import axios from "axios";
import errorHandler from "./apiErrorHandler.js";

export default function useAPIService() {
    /*
    The base axios structure for the call to the laravel back end.
        withCredentials: true is required to handle the CSRF token to/from sanctum
     */
    //baseURL: import.meta.env.VITE_API_DOMAIN + "/api",
    const apiClient = axios.create({
        baseURL: import.meta.env.VITE_API_DOMAIN + "/api",
        withCredentials: true,
    })
    /*
    Add a response interceptor to provide generic handling of success/fails
     */
   apiClient.interceptors.response.use(
        (response) => {
            /*
            All good. Return the received response from Axios.
             */
            //console.log(response)
            return response;
        },
       (error)=> {
            //console.log(error)
            let errorMessage=errorHandler(error)
            return Promise.reject (errorMessage)
        }
    );
}