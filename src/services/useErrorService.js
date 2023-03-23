import {testIfPromise} from '../utils/GeneralUtilities.js'
import router from "../router/index.js";
export default function useErrorService(){
    const errorMessageHandler=async(errorReturned)=>{
        //console.log(errorReturned)
        let errorMessage={}
        //let flgPromise=testIfPromise(errorReturned)
        //console.log(testIfPromise(errorReturned))
        if(testIfPromise(errorReturned)){
            errorReturned.then((error) => {
                /*
                The error handler throws a promise.reject so we need to resolve the promise
                to access the error information
                 */
                //console.log(error)
                //console.log("promise in useErrorService")
                errorMessage.title = error.title
                errorMessage.description = error.description
                errorMessage.status=error.status
                //console.log(errorMessage.title)
                //error.description=e
            })
        }else{
            //console.log("here instead")
            //console.dir(errorReturned)
            errorMessage.status=500
            errorMessage.title = 'There is a unknown problem with the application.'
            errorMessage.description = 'Please try your action again. ' +
                'If the problem persists please make your designated contact aware.'
        }
        //console.log(errorMessage)
        return errorMessage
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
    return{
        errorMessageHandler,
        handleHttpError
    }
}