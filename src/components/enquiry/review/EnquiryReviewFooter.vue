<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
Enquiry review footer is a container for the Delete, Comment and Invite functions
that are housed in their own components
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {ref, reactive} from 'vue'
import {storeToRefs} from 'pinia';
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRouter} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseButton from "../../ui/BaseButton.vue";
import {useEnquiryStore} from "../../../stores/EnquiryStore.js";
import BaseErrorMessage from "../../ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../../ui/BaseInformationMessage.vue";

/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useErrorService from "../../../services/useErrorService.js";
import useMiscService from "../../../services/useMiscService.js";
import {testIfPromise} from "../../../utils/GeneralUtilities.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Emits
/*===============================================================================*/
const emit = defineEmits(['addComment'])
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
interface Payload {
    enquiry_id: number,
    email: string
}

interface GenericMessage {
    title: string,
    description: string
}

let payload: Payload = {
    enquiry_id: 0,
    email: ""
}
let errorMessage: GenericMessage = reactive({
    title: "",
    description: "",
})
let informationMessage: GenericMessage = reactive({
    title: "",
    description: "",
})
const isSubmitting = ref(false)
const userFound = ref(false)

if (enquiryStore.enquiry.user !== null) {
    userFound.value = true
}
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Functions
/*===============================================================================*/
const router = useRouter()
const {sendInvitation, getEnquiry, deleteEnquiry} = useMiscService()
const {errorMessageHandler} = useErrorService

const sendInvite = async () => {
    //console.log("sending invitation for " + enquiryStore.enquiry.email)
    try {
        await validateInvitation
    } catch (e) {

    }
    try {
        errorMessage.title = null
        informationMessage.title = null
        isSubmitting.value = true

        payload.enquiry_id = enquiryStore.enquiry.id
        payload.email = enquiryStore.enquiry.email

        //console.log(payload)
        await sendInvitation(payload)
        //payload = enquiryStore.enquiry.id
        //console.log(payload)
        let response = await getEnquiry(payload.enquiry_id)
        informationMessage.title = "Invitation Sent"
        informationMessage.description = "Congratulations - your invitation was successfuly sent."
        enquiryStore.enquiry = response.data
        isSubmitting.value = false
    } catch (e) {
        isSubmitting.value = false
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
                errorMessage.title = value.title
                errorMessage.description = value.description
                //console.log(errorMessage)
                //error.description=e
            })
        } else {
            errorMessage = await errorMessageHandler(e)
            //console.log(errorMessage)
        }
    }
}
const deleteCurrentEnquiry = async () => {
    isSubmitting.value = true
    errorMessage.title = null
    //console.log(enquiry.value.id)
    try {
        let response = await deleteEnquiry(enquiry.value.id)
        await router.push({name: "enquiries"})
    } catch (e) {
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
                The error handler throws a promise.reject so we need to resolve the promise
                to access the error information
                 */

                //error.description=e
            })
        } else {

        }
    }
    isSubmitting.value = false
}

const addComment = async () => {
    emit('addComment', "add", 0)
}
const validateInvitation = async () => {
}
</script>
<template>
    <div class="p-4  p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500 px-4 py-5 sm:px-6 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 flex flex-auto gap-y-8 gap-x-8">
        <div class="bg-black rounded-md border-1 shadow-inner shadow-gray-500 sm:rounded-lg  relative">
            <div class="px-8 py-5 sm:p-6 grid-rows-3 ">
                <h3 class="text-lg font-medium leading-6 text-teal-400">Delete</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-400 mb-12">
                    <p>Permanently delete the enquiry from the system.</p>
                </div>
                <div class="px-8 absolute inset-x-5 bottom-2 px-4">
                    <BaseButton
                          title="Delete"
                          :disabled="isSubmitting"
                          :submitting="isSubmitting"
                          @click="deleteCurrentEnquiry">
                    </BaseButton>
                </div>

            </div>
        </div>
        <div class="bg-black rounded-md border-1 shadow-inner shadow-gray-500 sm:rounded-lg relative">
            <div class="px-8 py-5 sm:p-6 flex flex-row flex-wrap ">
                <h3 class="text-lg font-medium leading-6 text-teal-400">Comment</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-400 mb-12">
                    <p>Comment on the enquiry for later review.</p>
                </div>
                <div class="px-8 absolute inset-x-5 bottom-2 px-4">
                    <BaseButton
                          title="Comment"
                          :submitting="isSubmitting"
                          :disabled="isSubmitting"
                          @click="addComment">
                    </BaseButton>
                </div>
            </div>
        </div>
        <div v-if="!userFound" class="bg-black rounded-md border-1 shadow-inner shadow-gray-500 sm:rounded-lg relative">
            <div class="px-8 py-5 sm:p-6 flex flex-row flex-wrap ">
                <h3 class="text-lg font-medium leading-6 text-teal-400">Invite</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-400 mb-12">
                    <p>Invite the enquirer to register as a user on the system.</p>
                </div>
                <div class="px-8 absolute inset-x-5 bottom-2 px-4">
                    <BaseButton
                          title="Invite"
                          :submitting="isSubmitting"
                          :disabled="isSubmitting"
                          @click="sendInvite">
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseErrorMessage
              v-if="errorMessage.title"
              :error-description=errorMessage.description
              :error-title=errorMessage.title>
        </BaseErrorMessage>
    </div>
    <div class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseInformationMessage
              v-if="informationMessage.title"
              :title=informationMessage.title
              :description="informationMessage.description"
              :error-title=informationMessage.title>
        </BaseInformationMessage>
    </div>

</template>