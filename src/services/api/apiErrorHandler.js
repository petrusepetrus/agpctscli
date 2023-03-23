import router from '../../router'
import {testIfPromise}from '/src/utils/GeneralUtilities.js'

export default async function errorHandler(error) {
    let errorResponse = {}
    /*
    Trap any failed requests and provide a specific message for Network related problems.
    For the rest, default to the provided message from the request
     */
    //console.dir(error)
    if (typeof error === 'undefined') {
        //console.log(error.response)
    }
    if (typeof error !== 'undefined') {
        //console.log(error.code)
        /*
        For requests returning html response codes, provide an appropriate message for the specific use case.
        These messages are set to the 'general' property and will be used in the form to return a message
        to BaseErrorMessage component (via vee-validate in most cases. If you don't have that bas component on your
        form then your error may not be noticed by the user.
        In the event of a 422, a validation error from the back end, use the validation error from Laravel. These will
        already be assigned the relevant field name(s) the message(s) should be displayed against.
         */
        if(Object.hasOwn(error,'response')){
            //console.log("has a response")
            //console.dir(error.response)
            //console.log(error.response.status)
            //console.log(error.response.status)
            errorResponse.status = error.response.status
            //console.log(errorResponse.status)
            if(testIfPromise(error)) {
                    /*
                    The error handler throws a promise.reject so we need to resolve the promise
                    to access the error information
                     */
                    //console.log('promise')
                    //error.description=e

            }
            switch (errorResponse.status) {
                /*
                * deal with the 500 errors and route to an HTTP error code page
                 */
                case 500:
                case '500':
                    //console.log("case 500")
                    if ((Object.hasOwn(error, 'message') && error.message === 'Network Error') ||
                        (Object.hasOwn(error, 'code') && error.code === 'ERR_Network')) {
                        //console.log("network error")
                        errorResponse.title = 'There is a problem with the network.'
                        errorResponse.description = 'Please check your network connectivity and try again. ' +
                            'If the problem persists please make your designated contact aware.'
                        // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)

                    } else if ((Object.hasOwn(error, 'message') && error.message === 'Request failed with status code 500') ||
                        (Object.hasOwn(error, 'code') && error.code === 'ERR_BAD_RESPONSE')) {
                        //console.log("Unknown error")
                        errorResponse.title = 'There is a unknown problem with the application.'
                        errorResponse.description = 'Please try your action again. ' +
                            'If the problem persists please make your designated contact aware.'
                        // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)

                    } else {
                        //console.log("Uncaptured")
                        //console.log(error.response.status)
                        //console.log(error.response.data.message)
                        errorResponse.status = error.response.status
                        errorResponse.title = 'An unknown error has occurred. Please contact support.'
                        // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
                    }
                    break
                case 422:
                    //console.log("case 422")
                    /*
                     * Laravel 'already authenticated' validation message so pass this back to the current view without
                     * routing to http error page
                     */
                    if (Object.hasOwn(error, 'response') && Object.hasOwn(error.response, 'data')) {
                        if (Object.hasOwn(error.response.data, 'error') && error.response.data.error === "Already authenticated.") {
                            errorResponse.title = "Already authenticated"
                            errorResponse.description = "You cannot proceed with this action if you are already logged in. Please sign out and try again."
                        } else if (Object.hasOwn(error.response.data, 'message') && error.response.data.message.length > 0) {
                            errorResponse.title = error.response.data.message
                            errorResponse.list = Object.values(error.response.data.errors).flat()
                            errorResponse.description = errorResponse.list[0]
                        }
                    }
                    break
                case 401:
                    //console.log("case 401")
                    /*
                     * Laravel 'not authorised' validation message so pass this back to the current view without
                     * routing to http error page
                     */
                    errorResponse.status = error.response.status
                    errorResponse.title = 'Not authorised'
                    errorResponse.description = 'You are either not authorised for this function or your login credentials have expired. ' +
                        'If you believe you should have access to this page then please log in again and retry. ' +
                        'If that still fails then please request access via your designated contact.'
                    break
                case 404:
                    //console.log("case 404")
                    /*
                     * 'page missing or undefined' so route to http error page
                     */
                    errorResponse.status = error.response.status
                    errorResponse.title = 'Page missing or undefined'
                    errorResponse.description = 'There is no such page on this site.'
                    // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
                    break
                case 405:
                    //console.log("case 405")
                    /*
                     * 'not allowed' so route to http error page
                     */
                    errorResponse.status = error.response.status
                    errorResponse.title = 'Not allowed.'
                    errorResponse.description = 'You do not have permission to perform this function.'
                    // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
                    break
                case 419:
                    //console.log("case 419")
                    //errorMessage = 'This sessions has expired'
                    errorResponse.status = error.response.status
                    errorResponse.title = 'This session has expired'
                    errorResponse.description = 'Please login again to reinstate your session.'
                    // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
                    break
                default:
                    //console.log("case default")
                    //console.log(error.response.status)
                    //console.log(error.response.data.message)
                    errorResponse.status = error.response.status
                    errorResponse.title = 'An unknown error has occurred. Please contact support.'
                    // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
                    break;
            }
            //console.log(errorResponse)
            return errorResponse
        }else{
            //console.log("this one ")
            errorResponse.status = "500"
            errorResponse.title = 'Network problems are preventing connection.'
            errorResponse.description='Please check your network status and try again. If the problem persists please make your designated contact aware.'
            // await handleHttpError(errorResponse.status, errorResponse.title, errorResponse.description)
            //console.log(errorResponse)
            return errorResponse
        }



        /*
        if (error.response.status === 422) {
            errorResponse.status = error.response.status
            // Laravel validation Message
            if (Object.hasOwn(error, 'response') && Object.hasOwn(error.response, 'data')) {
                if (Object.hasOwn(error.response.data, 'error') && error.response.data.error==="Already authenticated.") {
                    errorResponse.title = "Already authenticated"
                    errorResponse.description = "You cannot proceed with this action if you are already logged in. Please sign out and try again."
                    //console.log(errorResponse)
                }else
                if (Object.hasOwn(error.response.data, 'message') && error.response.data.message.length > 0) {
                    errorResponse.title = error.response.data.message
                    errorResponse.list = Object.values(error.response.data.errors).flat()
                    errorResponse.description = errorResponse.list[0]
                    //console.log(errorResponse)
                }
            }
        } else {
            //Setup Generic Response Messages
            if (error.response.status === 401) {
                //console.log(error.response.status)
                errorResponse.status = error.response.status
                errorResponse.title = 'Not authorised'
                errorResponse.description = 'You are either not authorised for this function or your login credentials have expired. ' +
                    'If you believe you should have access to this page then please log in again and retry. ' +
                    'If that still fails then please request access via your designated contact.'
            }
            if (error.response.status === 404) {
                //console.log(error.response.status)
                errorResponse.status = error.response.status
                errorResponse.title = 'Page missing or undefined'
                errorResponse.description = 'There is no such page on this site.'
            }
            if (error.response.status === 405) {
                //console.log(error.response.status)
                errorResponse.status = error.response.status
                errorResponse.title = 'Not allowed.'
                errorResponse.description = 'The function you are requesting is not allowed'
            }
            if (error.response.status === 419) {
                //console.log(error.response.status)
                //errorMessage = 'This sessions has expired'
                errorResponse.status = error.response.status
                errorResponse.title = 'This session has expired'
                errorResponse.description = 'Please login again to reinstate your session.'
            }
            if (error.response.status >= 500) {
                //console.log(error.response.status)
                //console.log(error.response.data.message)
                errorResponse.status = error.response.status
                errorResponse.title = 'An unknown error has occurred. Please contact support.'
            }
            await router.push({
                name: 'httperror',
                params: {
                    errorCode: errorResponse.status,
                    errorTitle: errorResponse.title,
                    errorDescription: errorResponse.description
                }
            })
        }(
    }
    */

        // return the error message
        //return errorResponse
        //errorHandler()

    }

    async function handleHttpError(errorResponseStatus, errorResponseTitle, errorResponseDescription) {
        //console.log(errorResponseStatus)
        await router.push({
            name: 'httperror',
            params: {
                errorCode: errorResponseStatus,
                errorTitle: errorResponseTitle,
                errorDescription: errorResponseDescription
            }
        })
        //console.log("returned from http")
    }

}
