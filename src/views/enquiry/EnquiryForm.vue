<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
Enquiry form controller for determining which components
of the various enquiry options to display, based on the user's enquiry type
selection.
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {ref,reactive, watch} from 'vue'
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRouter} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseErrorMessage from "../../components/ui/BaseErrorMessage.vue";
import EnquiryNewWebsiteCard from "../../components/enquiry/entry/EnquiryNewWebsiteCard.vue";
import EnquiryHeader from "../../components/enquiry/entry/EnquiryHeader.vue";
import EnquiryWebsiteRedesignCard from "../../components/enquiry/entry/EnquiryWebsiteRedesignCard.vue";
import EnquiryWebsiteMaintenanceCard from "../../components/enquiry/entry/EnquiryWebsiteMaintenanceCard.vue";
import EnquirySEOCard from "../../components/enquiry/entry/EnquirySEOCard.vue"
import EnquirySomethingElseCard from "../../components/enquiry/entry/EnquirySomethingElseCard.vue"
import EnquiryFooter from "../../components/enquiry/entry/EnquiryFooter.vue"
import EnquiryConfirmation from "../../components/enquiry/entry/EnquiryConfirmation.vue";
import Navbar2 from "../../components/layout/Navbar.vue";
import {PhoneIcon, EnvelopeIcon} from "@heroicons/vue/24/solid"
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../services/useMiscService.js";
import useErrorService from "../../services/useErrorService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Emits
/*===============================================================================*/

/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
interface GenericMessage {
    title: string,
    description: string,
}
const router = useRouter()
let errorMessage:GenericMessage = reactive({
    title:"",
    description:""
})
const enquiryHeader = ref(null)
const enquiryNewWebsiteCard = ref(null)
const enquiryWebsiteRedesignCard = ref(null)
const enquiryWebsiteMaintenanceCard = ref(null)
const enquirySEOCard = ref(null)
const enquirySomethingElseCard = ref(null)
const enquiryFooter = ref(null)
const errorMessageBlock=ref(null)

let enquiryType = ref('nought')
let enquirySelected = ref(false)
let flgIsSubmitting = ref(false)
let flgSubmissionSuccessful = ref(false)

let consolidateFormValues = {}

const {storeEnquiry} = useMiscService()
const {errorMessageHandler} = useErrorService()
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Watchers
/*===============================================================================*/
/*
Detecting whether the error message block has been mounted in the DOM and
if so, move focus to it so that user can see a problem has been found.
Watch the error message block to see if it has changed
If it has and there is some value in the errorMessage title then we have found an
error
If this is the case then we need to scroll the screen down as far as the bottom
of the error message to make sure it is visible in the
 */
watch(errorMessageBlock,(newValue,oldValue)=> {
          //console.log(newValue)
          if (newValue !== null) {
              //console.log(errorMessageBlock.value.$el.offsetTop)
              //console.log(errorMessageBlock.value.$el.clientHeight)
              let position=errorMessageBlock.value.$el.offsetTop + errorMessageBlock.value.$el.clientHeight
              //console.log(position)
              window.scrollTo({ top: position });
          }
      }
)
/*===============================================================================*/
/* Functions
/*===============================================================================*/
const onSubmit = async (e) => {
    errorMessage.title=""
    e.preventDefault
    flgIsSubmitting.value = true
    let formsToValidate = []
    let sfm1 = await enquiryHeader.value.validateForm()
    formsToValidate.push(sfm1)
    //console.log(enquiryType.value)
    if (enquiryType.value === 'New Website') {
        let sfm2 = await enquiryNewWebsiteCard.value.validateForm()
        //console.log(sfm2)
        formsToValidate.push(sfm2)
    }
    if (enquiryType.value === 'Redesign of Existing Website') {
        let sfm3 = await enquiryWebsiteRedesignCard.value.validateForm()
        //console.log(sfm3)
        formsToValidate.push(sfm3)
    }
    if (enquiryType.value === 'Website Maintenance') {
        let sfm4 = await enquiryWebsiteMaintenanceCard.value.validateForm()
        formsToValidate.push(sfm4)
    }
    if (enquiryType.value === 'Search Engine Optimisation and Digital Marketing') {
        let sfm5 = await enquirySEOCard.value.validateForm()
        formsToValidate.push(sfm5)
    }
    if (enquiryType.value === 'Something Else') {
        let sfm6 = await enquirySomethingElseCard.value.validateForm()
        formsToValidate.push(sfm6)
    }
    let sfm7 = await enquiryFooter.value.validateForm()
    formsToValidate.push(sfm7)

    Promise.all(formsToValidate).then(result => {
        //console.log(result)
        let formValid = true
        for (const element of result) {
            if (element.valid === false) {
                formValid = false
                break
            } else {
                consolidateFormValues = {...consolidateFormValues, ...element.formValues}
            }
        }
        if (formValid === true) {
            //console.log(consolidateFormValues)
            saveEnquiry()
        } else {
            errorMessage.title = "Oops - something doesn't look right."
            errorMessage.description = "Please check that all the fields highlighted with a red asterisk are filled in, that " +
                  "there are no error messages showing and then give it another go."
            //console.log("failed")
            flgIsSubmitting.value = false

        }
    })
}
const saveEnquiry = async () => {
    try {
        await storeEnquiry(consolidateFormValues)
        errorMessage.title = null
        errorMessage.description = null
        flgSubmissionSuccessful.value = true
        flgIsSubmitting.value = false
        /**
         * To Do
         * at the moment the behaviour:smooth CSS argument does not
         * work in Safari so has been omitted in the code below. Need
         * to find a fix for this in the longer term
         * window.scrollTo({ top: -1,left:0, behaviour:smooth });
         */
        window.scrollTo({ top: 0,left:0 });
        setTimeout(() => {
                  //flgSubmissionSuccessful.value = false
                  router.push({name: "home"})
              },
              5000
        )

    } catch (e) {
        errorMessage = await errorMessageHandler(e)
        flgIsSubmitting.value = false
    }
}
const changeEnquiryType = (newEnquiryType) => {
    enquirySelected.value = true
    enquiryType.value = newEnquiryType
}

</script>
<template>
    <div>
        <Navbar2></Navbar2>
        <div class="bg-black pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 md:pb-8 lg:pb-0">
            <div class="mx-auto max-w-7xl lg:px-8">
                <div  class="lg:grid lg:grid-cols-2 lg:gap-8 md:grid md:grid-cols-1">
                    <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                        <div v-if="!flgSubmissionSuccessful" class="lg:py-8 ">
                            <h1
                                  class="text-5xl block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                                Contact Me
                            </h1>
                            <div class="mx-auto max-w-7xl">
                                <div class="flex mt-12">
                                    <PhoneIcon class="block h-12 w-12 text-teal-500"></PhoneIcon>
                                    <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl ml-6 text-left ">Call
                                        <span class="text-base text-cyan-600 lg:text-lg xl:text-xl">Peter </span>on
                                        <span class="text-base text-cyan-600 lg:text-lg xl:text-xl">07557 199365</span>. If
                                        I'm not available,
                                        please leave a message and contact number and I'll return your call you as soon as I
                                        am able.
                                    </p>
                                </div>
                            </div>
                            <div class="mx-auto max-w-7xl" >
                                <p class="my-4  text-center  text-base text-teal-300 sm:text-xl lg:text-lg xl:text-xl">
                                    - or -
                                </p>
                            </div>
                            <div class="mx-auto max-w-7xl">
                                <div class="flex mt-6">
                                    <EnvelopeIcon class="block h-12 w-12 text-teal-500"></EnvelopeIcon>
                                    <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl ml-6 text-left ">Mail me using
                                        the form below, selecting the enquiry type
                                        that most closely matches what you would like to talk about. I will respond as soon
                                        as I am able.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-if="flgSubmissionSuccessful"
                             class=" mx-auto max-w-7xl px-4 py-10 sm:col-span-1 md:col-span-2 lg:col-span-2 ">
                            <EnquiryConfirmation></EnquiryConfirmation>
                        </div>
                    </div>
                    <div class="lg:mt-24 lg:-mb-16 md:-mb-24 mt-12  sm:-mb-48 lg:relative lg:m-0 ">
                        <div class="mx-auto  max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            <img class="lg:absolute lg:inset-y-0 lg:left-0 max-h-80 "
                                 src="/images/website_design.jpg" alt=""/>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="min-h-screen bg-black ">
            <div class="bg-black mx-auto max-7-4xl md:pt-20 lg:pt-0 sm:pt-0">
                <main>
                    <!-- Side-by-side grid -->
                    <div v-if="!flgSubmissionSuccessful" class=" mx-auto max-w-7xl px-4 py-2 sm:col-span-1 md:col-span-2 lg:col-span-3 ">
                        <div
                              v-if="!flgSubmissionSuccessful"
                              class="p-6 mt-8 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50"
                        >
                            <EnquiryHeader
                                  ref="enquiryHeader"
                                  :title="'Your Details'"
                                  @change-enquiry-type="changeEnquiryType"
                            ></EnquiryHeader>
                        </div>
                        <div
                              v-if="enquiryType==='New Website' & !flgSubmissionSuccessful"
                              class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquiryNewWebsiteCard
                                  ref="enquiryNewWebsiteCard">
                            </EnquiryNewWebsiteCard>
                        </div>
                        <div v-if="enquiryType==='Redesign of Existing Website' & !flgSubmissionSuccessful"
                             class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquiryWebsiteRedesignCard
                                  ref="enquiryWebsiteRedesignCard">
                            </EnquiryWebsiteRedesignCard>
                        </div>
                        <div
                              v-if="enquiryType==='Website Maintenance' & !flgSubmissionSuccessful"
                              class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquiryWebsiteMaintenanceCard
                                  ref="enquiryWebsiteMaintenanceCard">
                            </EnquiryWebsiteMaintenanceCard>
                        </div>
                        <div
                              v-if="enquiryType==='Search Engine Optimisation and Digital Marketing' & !flgSubmissionSuccessful"
                              class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquirySEOCard
                                  ref="enquirySEOCard">
                            </EnquirySEOCard>
                        </div>
                        <div
                              v-if="enquiryType==='Something Else' & !flgSubmissionSuccessful"
                              class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquirySomethingElseCard
                                  ref="enquirySomethingElseCard">
                            </EnquirySomethingElseCard>
                        </div>
                        <div
                              v-if="enquirySelected & !flgSubmissionSuccessful"
                              class="p-6 mt-2 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                            <EnquiryFooter
                                  ref="enquiryFooter">
                            </EnquiryFooter>
                        </div>
                        <div
                              v-if="enquirySelected & !flgSubmissionSuccessful"
                              class="mt-6 lg:w-32  lg:justify-items-end md:justify-end sm:col-span-2">
                            <BaseButton
                                  title="Submit"
                                  :submitting="flgIsSubmitting"
                                  :disabled="flgIsSubmitting"
                                  @click="onSubmit($event)">
                            </BaseButton>
                        </div>
                        <div class="mt-6 col-span-2" >
                            <BaseErrorMessage
                                  v-if="errorMessage.title"
                                  :error-description=errorMessage.description
                                  :error-title=errorMessage.title
                                  ref="errorMessageBlock"
                            >
                            </BaseErrorMessage>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>