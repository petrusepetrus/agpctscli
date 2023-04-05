import axios from "axios";
import errorHandler from "./api/apiErrorHandler.js";

export default function useMiscService() {
    /*
    The base axios structure for the call to the laravel back end.
        withCredentials: true is required to handle the CSRF token to/from sanctum
     */
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
            return response;
        },
        function (error) {
            let errorMessage = errorHandler(error)
            return Promise.reject(errorMessage)
        }
    );
    const getCountries = async () => {
        let response = await apiClient.get('/countries')
        return response.data
    }
    const getAddressTypes = async () => {
        let response = await apiClient.get('/address-types')
        return response.data
    }
    const getPhoneTypes = async () => {
        let response = await apiClient.get('/phone-types')
        return response.data
    }
    const getEnquiry = async (payload) => {
        //console.log(payload)
        let response = await apiClient.get('/enquiry/' + payload)
        return response
    }

    const getEnquiries = async (payload) => {
        let response = await apiClient.get('/enquiries?page=' + payload.pageNumber, {
            params: payload
        })
        return response.data
    }
    const getEnquiryTypes = async () => {
        let response = await apiClient.get('/enquiry-types')
        return response.data
    }
    const getEnquiryStatuses = async () => {
        let response = await apiClient.get('/enquiry-statuses')
        return response.data
    }
    const storeEnquiry = async (payload) => {
        let response = await apiClient.post('/store-enquiry', payload)
        return response.data
    }
    const deleteEnquiry =async (id)=>{
        let response=await apiClient.delete('/delete-enquiry/'+ id)
        return response.data
    }
    const addEnquiryComment=async(id,payload)=>{
        let response = await apiClient.post('/create-enquiry-comment/enquiry/' + id,payload)
        return response.data
    }
    const updateEnquiryComment=async(id,payload)=>{
        let response = await apiClient.post('/update-enquiry-comment/enquiry/' + id,payload)
        return response.data
    }

    const deleteEnquiryComment=async(payload)=>{
        let response = await apiClient.delete('/delete-enquiry-comment/' + payload,{
        })
        return response.data
    }

    const getEnquiryComments=async(payload)=>{
        let response = await apiClient.get('/get-enquiry-comments/enquiry/' + payload,{
        })
        return response.data
    }

    const setEnquiryStatus = async (payload) => {
        let response = await apiClient.post('/update-enquiry-status/' + payload.id + '/status/' + payload.status, {
            params: payload
        })
        return response.data
    }
    const sendInvitation = async (payload) => {
        console.log(payload)
        let response = await apiClient.post('/invite/enquirer', payload)
        //console.log(response.data)
        return response.data
    }
    const retrieveInvitation = async (payload) => {
        //console.log(payload)
        let response = await apiClient.get('/retrieve-invitation/' + payload)
        //console.log(response.data)
        return response
    }
    const revokeInvitation = async (payload) => {
        //console.log(payload)
        let response = await apiClient.post('/revoke-invitation/' + payload)
        //console.log(response.data)
        return response
    }

    return {
        getCountries,
        getAddressTypes,
        getPhoneTypes,
        getEnquiries,
        getEnquiryTypes,
        getEnquiryStatuses,
        storeEnquiry,
        deleteEnquiry,
        getEnquiry,
        setEnquiryStatus,
        sendInvitation,
        retrieveInvitation,
        revokeInvitation,
        addEnquiryComment,
        updateEnquiryComment,
        deleteEnquiryComment,
        getEnquiryComments
    }
}