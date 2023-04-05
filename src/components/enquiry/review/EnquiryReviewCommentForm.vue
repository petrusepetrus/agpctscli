<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
UserReview enables the management of a selected Enquiry
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

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
//import BaseSpinner from "../../ui/BaseSpinner.vue";
import BaseTextarea from "../../ui/BaseTextarea.vue";
import BaseButton from "../../ui/BaseButton.vue";
import BaseInformationMessage from "../../ui/BaseInformationMessage.vue";
import BaseErrorMessage from "../../ui/BaseErrorMessage.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../../services/useMiscService.js";
import useErrorService from "../../../services/useErrorService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useEnquiryStore} from "../../../stores/EnquiryStore.js";

const enquiryStore = useEnquiryStore()
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/
import {FieldContext, useField, useForm, useIsFormDirty} from 'vee-validate'
import {object, string} from 'yup'
import {testIfPromise} from "../../../utils/GeneralUtilities.js";
/*===============================================================================*/
/* Props
/*===============================================================================*/
/*
If we are adding a comment
    the enquiryComment prop will be null
otherwise
    it will contain the set of comment details to be changed
 */
const props = defineProps({
    editMode: {
        type: String,
        default: "",
    },
    enquiryCommentID: {
        type: Number,
        default: null
    },
})
//console.log(props)
/*===============================================================================*/
/* Emits
/*===============================================================================*/
const emit = defineEmits(['cancelled', 'updated'])
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
interface GenericMessage {
    title: string,
    description: string
}
let errorMessage:GenericMessage = reactive({
    title:"",
    description:"",
})
const updateMessage:GenericMessage = reactive({
    title:"",
    description:"",
})
const enquiryCommentCharCount = ref(0)
const enquiryCommentCharLimit = ref(256)
const enquiryComment = ref("")
let enquiryCommentID = ref(0)
let editMode = ref("")

/*
store the props into reactive variables
 */
editMode = ref(props.editMode)
enquiryCommentID = ref(props.enquiryCommentID)
/*
if we are in change mode
    extract the comment from the enquiry store corresponding to the comment that was
    selected for editing using the comment id passed in the props
 */
if (editMode.value === "change") {
    for (let i = 0; i < enquiryStore.enquiry.enquiry_comments.length; i++) {
        if (enquiryStore.enquiry.enquiry_comments[i].id === enquiryCommentID.value) {
            enquiryComment.value = enquiryStore.enquiry.enquiry_comments[i].comment
        }
    }
}
/*
this is a little superfluous as the comment will already be blank or have a value depending
on whether we are adding or changing a comment but this makes it clear what is happening
 */
let formValues
if (editMode.value === "change") {
    formValues = {
        enquiry_comment: enquiryComment.value
    }
} else {
    formValues = {
        enquiry_comment: '',
    }
}

const validationSchema = object({
    enquiry_comment: string().required('Please add your comment'),
})

const {handleSubmit, isSubmitting, errors} = useForm({
    validationSchema,
    initialValues: formValues
})

/*
Track whether the form is dirty
 */
const isDirty = useIsFormDirty()

let {value: enquiry_comment}:FieldContext<string> = useField('enquiry_comment')
/*===============================================================================*/
/* Watches
/*===============================================================================*/
watch(enquiry_comment, () => {
    enquiryCommentCharCount.value = enquiry_comment.value.length
})
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Functions
/*===============================================================================*/
const {addEnquiryComment, updateEnquiryComment} = useMiscService()
const {errorMessageHandler} = useErrorService()

const onSubmit = handleSubmit(async (values) => {
    //console.log("in submit ")
    //console.dir(values)
    if (editMode.value === "change") {
        try {
            isSubmitting.value = true
            await updateEnquiryComment(props.enquiryCommentID, values)
            isSubmitting.value = false
            updateMessage.title = "Success"
            updateMessage.description = "Your changes have been saved successfully."
            emit('updated')
        } catch (e) {
            if (testIfPromise(e)) {
                console.log("oops")
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
    } else {
        try {
            isSubmitting.value = true
            //console.dir(values)
            //console.log(enquiryStore.enquiry.id)
            await addEnquiryComment(enquiryStore.enquiry.id, values)
            isSubmitting.value = false
            updateMessage.title = "Success"
            updateMessage.description = "Your changes have been added successfully."
            emit('updated')
        } catch (e) {
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
})

const onCancel = async () => {
    //console.log("cancelled")
    emit("cancelled")
}
</script>
<template>
    <form novalidate class="p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500" @submit="onSubmit">
        <p class="my-4 text-sm text-gray-400">
            Please {{ editMode }} your comment in the form below and either save when ready or cancel to go back
        </p>
        <div class="mt-4">
            <BaseTextarea
                  v-model="enquiry_comment"
                  label="Enquiry Comment"
                  name="enquiry_comment"
                  placeholder="Please enter your comment"
                  :required="true"
                  :rows="8"
                  :character-limit="enquiryCommentCharLimit"
                  :character-count="enquiryCommentCharCount"
                  :error="errors.enquiry"
                  :label-class="'block text-md text-gray-300'"
                  :char-limit-class="'text-sm text-gray-400'"
            >
            </BaseTextarea>
        </div>
        <div class="mt-2 flex items-center flex-wrap sm:flex-nowrap">
            <div class="mr-2">
                <BaseButton
                      v-if="isDirty"
                      title="Save"
                      type="'submit'"
                      :submitting="isSubmitting"
                      :disabled="isSubmitting"
                />
            </div>
            <div class="mr-2">
                <BaseButton
                      title="Cancel"
                      :submitting="isSubmitting"
                      :disabled="isSubmitting"
                      @click="onCancel"
                />
            </div>
        </div>
    </form>
    <div class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseInformationMessage v-if="updateMessage.title">
            {{ updateMessage }}
        </BaseInformationMessage>
    </div>
    <div
          v-if="errorMessage.title"
          class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseErrorMessage
              :error-description=errorMessage.description
              :error-title=errorMessage.title>
        </BaseErrorMessage>
    </div>
</template>