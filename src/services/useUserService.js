import axios from "axios";
import errorHandler from "./api/apiErrorHandler.js";

export default function useUserService() {
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
            //console.log(error)
            let errorMessage = errorHandler(error)
            return Promise.reject(errorMessage)
        }
    );
    /*
    Users
     */
    const getUser = async (payload) => {
        let response = await apiClient.get('/user/' + payload)
        return response
    }
    const checkUserExists = async (payload) => {
        let response = await apiClient.get('/user-exists/' + payload)
        return response
    }
    const getUsers = async (payload) => {
        let response = await apiClient.get('/users?page=' + payload.pageNumber, {
            params: payload
        })
        //console.log("done getUsers")
        return response.data
    }
    /*
    Addresses
     */
    const getUserAddresses = async (payload) => {
        let response = await apiClient.get('/user-addresses/' + payload)
        return response.data
    }
    const getAvailableAddressTypes = async (userID) => {
        let response = await apiClient.get('/available-address-types/user/' + userID)
        return response.data
    }
    const addUserAddress = async (payload, userID) => {
        let response = await apiClient.post('/store-address/user/' + userID, payload)
        return response.data
    }
    const updateUserAddress = async (payload, userID, addressID) => {
        let response = await apiClient.post('/update-address/user/' + userID + '/address/' + addressID, payload)
        return response.data
    }
    const deleteUserAddress = async (userID, addressID) => {
        let response = await apiClient.delete('/delete-address/user/' + userID + '/address/' + addressID)
        return response.data
    }
    /*
    User Profile
    */
    const createUserProfile = async (payload) => {
        await apiClient.post("/new-user/", payload)
    }

    const updateUserProfile = async (payload, userID) => {
        await apiClient.post("/user/" + userID, payload)
    }
    /*
    Phone numbers
     */
    const addUserPhone = async (payload, userID) => {
        console.log(payload + " " + userID)
        let urlString = '/store-phone/user/' + userID
        console.log(urlString)
        let response = await apiClient.post('/store-phone/user/' + userID, payload)
        return response.data
    }

    const updateUserPhone = async (payload, userID, phoneID) => {
        console.log(payload + " " + userID + " " + phoneID)
        let response = await apiClient.post('/update-phone/user/' + userID + '/phone/' + phoneID, payload)
        return response.data
    }

    const deleteUserPhone = async (userID, phoneID) => {
        let response = await apiClient.delete('/delete-phone/user/' + userID + '/phone/' + phoneID)
        return response.data
    }

    const getUserPhones = async (payload) => {
        let response = await apiClient.get('/user-phones/' + payload)
        //console.log(response.data)
        return response.data
    }

    const getAvailablePhoneTypes = async (userID) => {
        let response = await apiClient.get('/available-phone-types/user/' + userID)
        return response.data
    }
    /*
    userTypes
     */
    const getUserTypes = async () => {
        let response = await apiClient.get('/user-types')
        return response.data
    }
    const getUserUserTypes = async (userID) => {
        let response = await apiClient.get('/user-types/user/' + userID)
        return response.data
    }
    const getAvailableUserTypes = async (userID) => {
        let response = await apiClient.get('/available-user-types/user/' + userID)
        return response.data
    }
    const getUserTypeStatuses = async () => {
        let response = await apiClient.get('/user-type-status')
        return response.data
    }
    const updateUserTypes = async (payload, userID) => {
        let response = await apiClient.post('/update-user-types/user/' + userID, payload)
        return response.data
    }
    /*
Notification Preferences
 */
    const getUserNotificationPreference = async (userID) => {
        let response = await apiClient.get('/get-notification-preference/user/' + userID)
        return response.data
    }
    const createUserNotificationPreference = async (payload, userID) => {
        //console.log(payload)
        let response = await apiClient.post('/create-notification-preference/user/' + userID, payload)
        return response.data
    }
    const updateUserNotificationPreference = async (payload, userID) => {
        //console.log(payload)
        let response = await apiClient.post('/update-notification-preference/user/' + userID, payload)
        return response.data
    }
    const getUserNotificationTopics = async (userID) => {
        let response = await apiClient.get('/get-notification-topics/user/' + userID)
        //console.log(response)
        return response.data
    }
    const getNotificationTopics = async () => {
        let response = await apiClient.get('/get-notification-topics')
        return response.data
    }


    return {
        getUser,
        getUsers,
        createUserProfile,
        updateUserProfile,
        getUserTypes,
        getUserUserTypes,
        getAvailableUserTypes,
        getUserTypeStatuses,
        updateUserTypes,
        addUserAddress,
        updateUserAddress,
        deleteUserAddress,
        getUserAddresses,
        getAvailableAddressTypes,
        addUserPhone,
        updateUserPhone,
        deleteUserPhone,
        getUserPhones,
        getAvailablePhoneTypes,
        getUserNotificationPreference,
        createUserNotificationPreference,
        updateUserNotificationPreference,
        getUserNotificationTopics,
        getNotificationTopics,
        checkUserExists
    }
}