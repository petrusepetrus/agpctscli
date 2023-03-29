<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
Enquiry review comment allows the user to review the comments associated
with a particular enquiry as a list with the facility to edit or delete
any enquiry in that list
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {reactive, ref, watch} from 'vue'
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {storeToRefs} from "pinia";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseWarningMessage from "../../ui/BaseWarningMessage.vue";
import BaseErrorMessage from "../../ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../../ui/BaseInformationMessage.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../../services/misc/useMiscService.js";
import useErrorService from "../../../services/useErrorService.js";
import moment from 'moment';
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useEnquiryStore} from "../../../stores/EnquiryStore.js";

const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)


/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/
const props = defineProps({
    changeMode: {
        type: String,
        default: ""
    },
    commentID: {
        type: Number,
        default: 0
    }
})
/*===============================================================================*/
/* Emits
/*===============================================================================*/
const emit = defineEmits(['changeComment', 'deleted'])
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
interface GenericMessage{
    title:string,
    description:string,
}
let errorMessage :GenericMessage = reactive({
    title:"",
    description:"",
})
let warningMessage  :GenericMessage = reactive({
    title:"",
    description:"",
})
let informationMessage  :GenericMessage = reactive({
    title:"",
    description:"",
})
let flgCommentsExist = ref(false)

let flgAddingComment = ref(false)            //flags we are adding a comment
let flgChangingComment = ref(false)          //flags we are changing a comment
let flgDeletingComment = ref(false)

let processForm = ref(true)

if (enquiryStore.enquiry.enquiry_comments.length > 0) {
    flgCommentsExist.value = true
}
/*===============================================================================*/
/* Watches
/*===============================================================================*/
watch(() => enquiryStore.enquiry.enquiry_comments.length, () => {
    //console.log("watcher saw change")
    if (enquiryStore.enquiry.enquiry_comments.length > 0) {
        flgCommentsExist.value = true
    } else {
        flgCommentsExist.value = false
    }
})
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Functions
/*===============================================================================*/
const {errorMessageHandler} = useErrorService()
const {deleteEnquiryComment, getEnquiryComments} = useMiscService()
const deleteComment = async (enquiryCommentToDeleteID, enquiryID) => {
    flgDeletingComment.value = true
    //console.log(enquiryCommentToDeleteID + " " + enquiryID)
    try {
        await deleteEnquiryComment(enquiryCommentToDeleteID)
        let response = await getEnquiryComments(enquiryID)
        //console.log(response)
        enquiryStore.enquiry.enquiry_comments = response
        informationMessage.title = "Comment Deleted"
        emit('deleted')
    } catch (e) {
        errorMessage = await errorMessageHandler(e)
        processForm.value = false
    }
    flgDeletingComment.value = false
}
const changeComment = (enquiryCommentID) => {
    //console.log("change mode ", "changeMode", enquiryCommentID)
    emit('changeComment', "change", enquiryCommentID)
}

/*
const onCancelled = () => {
/*
    triggered by PhoneForm component to indicate user cancelled the add
    or change so toggle the flags off to remove the PhoneForm component
*/
/*
    //console.log("cancellation received in list")
    flgAddingComment.value = false
    flgChangingComment.value = false
    informationMessage.title = "Change Cancelled"
}
*/
const formatDate = (dateToFormat) => {
    return moment(dateToFormat).format('DD/MM/YYYY h:mm a');
}
</script>
<template>
    <div v-if="flgCommentsExist" class="overflow-hidden  p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500">
        <div
              class="bg-black shadow sm:rounded-lg md:rounded-md mx-2 overflow-hidden
                sm:-mx-6 md:mx-0 ring-1 ring-black ring-opacity-5  md:rounded-md bg-white">
            <div class="px-4 py-5 sm:px-6 ">
                <h1 class="text-lg font-medium leading-6 text-teal-500">Enquiry Comments</h1>
            </div>

            <table class="min-w-full divide-y divide-gray-300 bg-black">
                <thead>
                <tr>
                    <th scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6 lg:table-cell">
                        ID
                    </th>
                    <th scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6 lg:table-cell">
                        Comment
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-400 sm:table-cell">
                        Date
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"><span
                          class="sr-only">Edit</span>
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"><span
                          class="sr-only">Delete</span>
                    </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-black">

                <tr v-for="comment in enquiry.enquiry_comments" :key="comment.id">
                    <td class="px-3 py-4 text-sm text-gray-300 sm:table-cell">
                        <div class="px-3 text-sm text-gray-300  ">
                            {{ comment.id }}
                        </div>
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-300 sm:table-cell">
                        <div class="px-3 text-sm text-gray-300  ">
                            {{ comment.comment }}
                        </div>
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">
                        <div class="px-3 text-sm text-gray-300  ">
                            {{ formatDate(comment.created_at) }}
                        </div>
                    </td>
                    <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                              :disabled="flgChangingComment"
                              class="text-teal-300 hover:text-teal-100"
                              @click="changeComment(comment.id)"
                        >Edit
                        </button>
                    </td>
                    <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                              :disabled="flgChangingComment  || flgAddingComment || flgDeletingComment"
                              class="text-teal-300 hover:text-teal-100"
                              @click="deleteComment(comment.id,enquiryStore.enquiry.id)"
                        >Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-if="informationMessage.title" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseInformationMessage
                      :title="informationMessage.title"
                      :description="informationMessage.description"
                >
                </BaseInformationMessage>
            </div>
            <div v-if="warningMessage.warningTitle" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseWarningMessage
                      v-if="warningMessage.warningTitle"
                      :warning-title="warningMessage.warningTitle"
                >
                    {{ warningMessage.text }}
                </BaseWarningMessage>
            </div>
            <div v-if="errorMessage.title" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseErrorMessage
                      v-if="errorMessage.title"
                      :error-description=errorMessage.description
                      :error-title=errorMessage.title>
                </BaseErrorMessage>
            </div>
        </div>
    </div>
</template>