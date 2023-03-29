<template>
    <div class="min-h-screen bg-black">
        <Navbar></Navbar>
        <div class="bg-black grid mx-auto sm:grid-cols-1 md:grid-cols-5 sm:px-6  lg:px-8">
            <div class="col-span-1">
                <Sidebar/>
            </div>
            <div class="overflow-hidden col-span-4 bg-black ">
                <div v-if="enquiryFound" class="overflow-hidden bg-black shadow sm:rounded-lg">
                    <div class="">
                        <div>
                            <EnquiryReviewHeader>
                            </EnquiryReviewHeader>
                        </div>
                        <div
                              v-if="(enquiryStore.enquiry.enquiry_type.enquiry_type==='New Website') ||
                                       enquiryStore.enquiry.enquiry_type.enquiry_type==='Redesign of Existing Website'"
                              class="mt-4">
                            <EnquiryReviewNewRedesignWebsiteCard>
                            </EnquiryReviewNewRedesignWebsiteCard>
                        </div>
                        <div
                              v-if="enquiryStore.enquiry.enquiry_type.enquiry_type==='Website Maintenance'"
                              class="mt-4">
                            <EnquiryReviewWebsiteMaintenanceCard>
                            </EnquiryReviewWebsiteMaintenanceCard>
                        </div>
                        <div
                              v-if="enquiryStore.enquiry.enquiry_type.enquiry_type==='Search Engine Optimisation and Digital Marketing'"
                              class="mt-4">
                            <EnquiryReviewSEOCard>
                            </EnquiryReviewSEOCard>
                        </div>
                        <div
                              v-if="enquiryStore.enquiry.enquiry_type.enquiry_type==='Something Else'"
                              class="mt-4">
                            <EnquiryReviewSomethingElseCard>
                            </EnquiryReviewSomethingElseCard>
                        </div>

                    </div>
                    <div>
                        <div class="mt-4">
                            <EnquiryReviewCommentList
                                  @change-comment="changeComment"
                                  @deleted="commentsChanged"
                            >
                            </EnquiryReviewCommentList>
                        </div>
                        <div class="mt-4">
                            <EnquiryReviewCommentForm
                                  v-if="flgAddingComment || flgChangingComment"
                                  :enquiry-comment-i-d="commentID"
                                  :edit-mode="editMode"
                                  @updated="commentsChanged"
                                  @cancelled="onCancelled"
                            >
                            </EnquiryReviewCommentForm>
                        </div>
                        <div class="mt-4">
                            <EnquiryReviewFooter
                                  @add-comment="addComment"
                            >
                            </EnquiryReviewFooter>
                        </div>
                    </div>
                </div>
                <div>

                    <BaseSpinner
                          v-if="flgIsSubmitting"
                          action="Loading - please wait"
                          class="text-teal-300"
                    >
                    </BaseSpinner>
                    <BaseErrorMessage
                          v-if="error.title"
                          :error-description=error.description
                          :error-title=error.title>
                    </BaseErrorMessage>
                    <BaseInformationMessage
                          v-if="warning.title"
                          :warning-title=warning.title
                          :warning-description=warning.description>
                    </BaseInformationMessage>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/* Overview
-------------------------------------------------------------------------------
UserReview enables the management of a selected Enquiry
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {onBeforeMount, onBeforeUnmount, ref, reactive} from 'vue'
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRoute} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseErrorMessage from "../../components/ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../../components/ui/BaseInformationMessage.vue";
import EnquiryReviewHeader from "../../components/enquiry/review/EnquiryReviewHeader.vue";
import EnquiryReviewNewRedesignWebsiteCard
    from "../../components/enquiry/review/EnquiryReviewNewRedesignWebsiteCard.vue";
import EnquiryReviewFooter from "../../components/enquiry/review/EnquiryReviewFooter.vue"
import EnquiryReviewSEOCard from "../../components/enquiry/review/EnquiryReviewSEOCard.vue";
import EnquiryReviewSomethingElseCard from "../../components/enquiry/review/EnquiryReviewSomethingElseCard.vue";
import EnquiryReviewCommentList from "../../components/enquiry/review/EnquiryReviewCommentList.vue";
import EnquiryReviewCommentForm from "../../components/enquiry/review/EnquiryReviewCommentForm.vue";
import EnquiryReviewWebsiteMaintenanceCard
    from "../../components/enquiry/review/EnquiryReviewWebsiteMaintenanceCard.vue";

import Sidebar from "../../components/layout/Sidebar.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../services/misc/useMiscService.js";
import {testIfPromise} from "../../utils/GeneralUtilities.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useEnquiryStore} from "../../stores/EnquiryStore.js";
import Navbar from "../../components/layout/Navbar.vue";


const enquiryStore = useEnquiryStore()
/*===============================================================================*/
/* Props
/*===============================================================================*/
/* Emits
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
let error = reactive({})
let warning = reactive({})
let flgIsSubmitting = ref(false)
let flgAddingComment = ref(false)
let flgChangingComment = ref(false)
let enquiryID = ref()
let commentID = ref()
let editMode = ref()
let enquiryFound = ref(false)
let statusParameters = {}
let userFound = ref(false)
const route = useRoute();

enquiryID.value = route.params.enquiryID
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
onBeforeMount(async () => {
    error.title = ""
    //console.log(enquiryID.value)
    await loadEnquiryStore(enquiryID.value)
})
onBeforeUnmount(async () => {
    if (enquiryStore.enquiry.enquiry_status.enquiry_status === "New") {
        try {
            statusParameters.id = enquiryStore.enquiry.id
            statusParameters.status = "Reviewed"
            setEnquiryStatus(statusParameters)
        } catch (e) {
            if (testIfPromise(e)) {
                e.then((value) => {
                    /*
                The error handler throws a promise.reject so we need to resolve the promise
                to access the error information
                 */
                    error.title = value.title
                    error.description = value.description
                    //error.description=e
                })
            } else {
                error.title = e
            }
        }
    }
})
/*===============================================================================*/
/* Functions
/*===============================================================================*/
const {getEnquiry, setEnquiryStatus, getEnquiryComments} = useMiscService()

async function loadEnquiryStore(enquiryID) {
    /*
    Purpose:
        get the qualifying list of enquiries and set up the pagination information
        based on the response from the API
    Parms:
        Direct:
            None
        Indirect:
            queryParams
                object containing the constructed query based on the user
                filters selected
    */
    flgIsSubmitting.value = true
    try {

        let response = await getEnquiry(enquiryID)
        if (response.data) {
            enquiryStore.enquiry = response.data
            enquiryFound.value = true
            if (enquiryStore.enquiry.user !== null) {
                userFound.value = true
                //console.log(userFound)
            }
        } else {
            error.title = "Enquiry not found"
            error.description = "We could not find a record for enquiry " + enquiryID +
                  " If you believe this is an error please contact your administrator."
        }
    } catch (e) {
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
                error.title = value.title
                error.description = value.description
                //error.description=e
            })
        } else {
            error.title = e
        }
    }
    flgIsSubmitting.value = false
}

const changeComment = async (enquiryEditMode, enquiryCommentID) => {
    //console.log("change a comment " + enquiryEditMode + " " + enquiryCommentID)
    flgChangingComment.value = true
    commentID.value = enquiryCommentID
    editMode.value = enquiryEditMode
}
const addComment = async (enquiryEditMode, enquiryCommentID) => {
    //console.log("add a comment " + enquiryEditMode + " " + enquiryCommentID)
    flgAddingComment.value = true
    commentID.value = 0
    editMode.value = enquiryEditMode
}
const commentsChanged = async () => {
    //console.log("updated")
    flgAddingComment.value = false
    flgChangingComment.value = false
    let response = await getEnquiryComments(enquiryStore.enquiry.id)
    //console.log(response)
    enquiryStore.enquiry.enquiry_comments = response
}

const onCancelled = () => {
    flgAddingComment.value = false
    flgChangingComment.value = false
}
</script>

<style scoped>

</style>