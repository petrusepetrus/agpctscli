<template>

    <div class="pt-2 sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
            <h3 class="text-lg font-medium text-teal-500">Notifications</h3>
        </div>
    </div>
    <p class="my-2 text-sm text-gray-300">
        Please let us now which updates you would like
        to subscribe to and your preferences as to how to receive them.
    </p>
    <BaseSpinner
          v-if="flgIsLoading"
          action="Loading - please wait"
          class="text-teal-300"
    >
    </BaseSpinner>
    <div v-if="!flgIsLoading && flgProcessForm">
        <form novalidate class="space-y-6 " @submit.prevent="onSubmit">
            <div class="mt-2">
                <fieldset>
                    <div class="grid grid-cols-4 mt-2">
                        <div v-for="(notificationTopic,notificationTopicIndex) in notificationTopics"
                             class="md:col-span-1 col-span-4 mt-2 text-teal-50">
                            <BaseCheckbox
                                  :v-model="Boolean(notificationTopicSelected[notificationTopicIndex].selected)"
                                  :name="notificationTopicSelected[notificationTopicIndex].notification_topic"
                                  :model-value="Boolean(notificationTopicSelected[notificationTopicIndex].selected)"
                                  :label="notificationTopic.notification_topic"
                                  :label-description="notificationTopic.notification_topic_description"
                                  :label-class="'text-md text-gray-300'"
                                  :label-description-class="'text-gray-400'"
                                  :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                  @change="onChange($event)"
                            >
                            </BaseCheckbox>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="mt-2">
                    <div>
                        <p class="text-sm text-gray-300">How would you like to receive your notifications?</p>
                        <p class="text-sm text-gray-500">(Please select all that apply.)</p>
                        <p class="text-sm text-gray-300">Choose <span
                              class="text-sm text-red-600 font-bold">Opt Out</span> if you do not want to receive any
                            elective notifications at all.
                        </p>
                    </div>
                    <div class="mt-4 grid grid-cols-4">
                        <div class="md:col-span-1 col-span-2">
                            <BaseCheckbox
                                  v-model="email"
                                  :name="'EmailChk'"
                                  label="Email"
                                  :model-value="email"
                                  :label-class="'text-md text-gray-300'"
                                  :label-description-class="'text-gray-400'"
                                  :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                  @change="onChange($event)"
                            >
                            </BaseCheckbox>
                        </div>
                        <div class="md:col-span-1 col-span-2">
                            <BaseCheckbox
                                  v-model="sms"
                                  :name="'SMSChk'"
                                  label="SMS"
                                  :model-value="sms"
                                  :label-class="'text-md text-gray-300'"
                                  :label-description-class="'text-gray-400'"
                                  :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                  @change="onChange($event)"
                            >
                            </BaseCheckbox>
                        </div>
                        <div class="md:col-span-2 col-span-2">
                            <BaseCheckbox
                                  v-model="optOut"
                                  :name="'OptOutChk'"
                                  label="Opt out from receiving notifications"
                                  :model-value="optOut"
                                  :label-class="'text-md text-gray-300'"
                                  :label-description-class="'text-gray-400'"
                                  :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                  @change="onChange($event)"
                            >
                            </BaseCheckbox>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="mt-6 flex items-center flex-wrap sm:flex-nowrap">
                <div class="mr-2">
                    <BaseButton
                          v-if="flgIsDirty===true"
                          title="Save"
                          :submitting="flgIsSubmitting"
                          :disabled="flgIsSubmitting"
                          @click="onSubmit"
                    />
                </div>
                <div class="mr-2">
                    <BaseButton
                          v-if="flgIsDirty===true"
                          title="Cancel"
                          :disabled="flgIsSubmitting"
                          @click="onCancelled"
                    />
                </div>
            </div>
        </form>
    </div>
    <div v-if="errorMessage.title" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseErrorMessage
              v-if="errorMessage.title"
              :error-description=errorMessage.description
              :error-title=errorMessage.title>
        </BaseErrorMessage>
    </div>
</template>

<script setup>
/* Overview
-------------------------------------------------------------------------------
Present the user notification topics and channel preferences and maintain these
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {ref, reactive, onBeforeMount} from 'vue'
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRoute} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseCheckbox from "../ui/BaseCheckbox.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseButton from "../ui/BaseButton.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useUserService from "../../services/useUserService.js";
import useErrorService from "../../services/useErrorService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useUserStore} from "../../stores/UserStore.js";
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
const route = useRoute();
const userStore = useUserStore()
const {errorMessageHandler, handleHttpError} = useErrorService()
const {
    getUserNotificationPreference,
    createUserNotificationPreference,
    updateUserNotificationPreference,
    getUserNotificationTopics,
    getNotificationTopics
} = useUserService()

let userID = route.params.userID

let flgIsSubmitting = ref(false)                    /*flags user has saved changes*/
let flgIsLoading = ref(false)                         /*flags form is loading*/
let flgProcessForm = ref(false)                       /*flags that we are ready to process the form*/
let flgIsDirty = ref(false)
let flgPreferencesFound=ref(false)

let errorMessage = reactive({})

let notificationTopics = ref([])
let notificationTopicSelected = reactive([])
let email = ref(false)
let sms = ref(false)
let optOut = ref(false)


/*===============================================================================*/
/* Watches
/*===============================================================================*/

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
onBeforeMount(async () => {
    flgIsLoading.value = true
    await fetchNotificationTopics()
    await getUserNotificationPreferences(userID)
    await getUsersNotificationTopics(userID)
    flgIsLoading.value = false
    flgProcessForm.value=true
})
/*===============================================================================*/
/* Functions
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* API data retrieval
/*-------------------------------------------------------------------------------*/
/*
The Notification Channel Preferences assigned to the user.
These are stored as a complete set with either True or False set to
indicate whether they areactive. The values are mirrored into a
corresponding set of refs for use in the form.
*/
const getUserNotificationPreferences = async (userID) => {
    try {
        //console.log(userID)
        flgPreferencesFound.value=false
        let response = await getUserNotificationPreference(userID)
        userStore.notificationPreferences = response
        if (userStore.notificationPreferences.length !== 0) {
            email.value = Boolean(userStore.notificationPreferences.email)
            sms.value = Boolean(userStore.notificationPreferences.sms)
            optOut.value = Boolean(userStore.notificationPreferences.opt_out)
            flgPreferencesFound.value=true
        } else {
            email.value = false
            sms.value =false
            optOut.value = false
            userStore.notificationPreferences = {}
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage.value)
        await handleHttpError(errorMessage.value.status, errorMessage.value.title, errorMessage.value.description)
    }
}
/*
The Notification Topics assigned to the user. Unlike the topics, only those preferences
selected by the user will be stored previously and returned here (as opposed to the Channel Notification
Preferences which are all stored in one record per user with a True or False state).
The Notification Topics are stored in a reactive array for form management purposes.
*/
const getUsersNotificationTopics = async (userID) => {
    try {
        //console.log(userID)
        let response = await getUserNotificationTopics(userID)
        userStore.userNotificationTopics = response
        if (userStore.userNotificationTopics.length !== 0) {
            for (let i = 0; i < userStore.userNotificationTopics.length; i++) {
                for (let j = 0; j < notificationTopicSelected.length; j++) {
                    if (userStore.userNotificationTopics[i].id === notificationTopicSelected[j].id) {
                        notificationTopicSelected[j].selected = true
                    }else{
                        notificationTopicSelected[j].selected = false
                    }
                }
            }
        } else {
            userStore.userNotificationTopics = {}
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage.value)
        await handleHttpError(errorMessage.value.status, errorMessage.value.title, errorMessage.value.description)
    }
}
const fetchNotificationTopics = async () => {
    try {
        let response = await getNotificationTopics()
        notificationTopics = response
        notificationTopicSelected = response
        if (notificationTopics.length !== 0) {
            for (let i = 0; i < notificationTopicSelected.length; i++) {
                notificationTopicSelected[i].selected = false
            }
        } else {
            notificationTopics = []
            notificationTopicSelected = []
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage.value)
        await handleHttpError(errorMessage.value.status, errorMessage.value.title, errorMessage.value.description)
    }
}
/*-------------------------------------------------------------------------------*/
/* Form Submission
/*-------------------------------------------------------------------------------*/
const onSubmit = async () => {
    let validInput = selectionValidated()
    if (validInput) {
        flgIsSubmitting.value = true
        const formData = new FormData()
        let keysToSynch=[]
        for(let i=0;i<notificationTopicSelected.length;i++){
            ////console.log(notificationTopicSelected[i].notification_topic + " " +notificationTopicSelected[i].selected)
            if(Boolean(notificationTopicSelected[i].selected)===true) {
                keysToSynch.push(notificationTopicSelected[i].id)
            }
        }
        //console.log(keysToSynch)
        if(keysToSynch.length>0) {
            formData.append('keys_to_synch', keysToSynch)
        }
        //formData.append('Support Notices',true)
        formData.append('email', +email.value)
        formData.append('sms', +sms.value)
        formData.append('opt-out', +optOut.value)
        ////console.log(formData)
        try {
            if (flgPreferencesFound.value === false) {
                await createUserNotificationPreference(formData, userID)
            } else {
                await updateUserNotificationPreference(formData, userID)
            }
            await getUserNotificationPreferences(userID)
            flgIsSubmitting.value = false
            flgIsDirty.value = false
        } catch (e) {
            errorMessage.value = await errorMessageHandler(e)
            //console.log(errorMessage.value)
            await handleHttpError(errorMessage.value.status, errorMessage.value.title, errorMessage.value.description)
        }
    }
}
/*-------------------------------------------------------------------------------*/
/* Form management
/*-------------------------------------------------------------------------------*/
/*
WHen a change is detected on one of the Notification Topics or Notification Preferences
checkboxes we look at what has occurred and decide whether the form is now dirty and
we can Save or Cancel the change.

We also check the Opt Out option and if that is set to true, we reset all the other
notification options to false and then decide whether there is a change to be saved or cancelled.
 */
const onChange = (e) => {
    /*
    reset any pre-existing errors
     */
    errorMessage.title = ""
    errorMessage.description = ""

    /*
    We have a reactive variable array, notificationTopicSelected, which we bind to the
    Notification Topic checkboxes. We find the corresponding entry to the checkbox
    that has changed and set the selected value to whatever the checkbox value has been set to
     */
    for (let i = 0; i < notificationTopicSelected.length; i++) {
        if (notificationTopicSelected[i].notification_topic === e.target.name) {
            notificationTopicSelected[i].selected = e.target.checked
            break
        }
    }
    /*
    If the checkbox checked is not the Opt Out box then we set the Opt Out checkbox to false
    since by definition if it was already set to true then selecting anything else on the
    card means that we want some kind of notification topic or notification preference active
     */
    if (e.target.name !== 'OptOutChk') {
        optOut.value = false
    }
    /*
    If, on the other hand, the Opt Out checkbox has been selected then any notification topic
    needs to be set to false.
     */
    if (optOut.value === true) {
        for (let i = 0; i < notificationTopicSelected.length; i++) {
            notificationTopicSelected[i].selected = false
        }
        sms.value=false
        email.value=false
    }

    /*
    Now we check whether there the form is actually dirty
     */
    let flgFoundIt = false
    flgIsDirty.value = false
    /*
    We enumerate the notificationTopics array
     */
    for (let i = 0; i < notificationTopicSelected.length; i++) {
        flgFoundIt = false
        /*
        For each element in that array we check to see if there is corresponding item in the topics we downloaded with the user
        (we only download to the userStore notification topics already assigned to the user)
         */
        for (let j = 0; j < userStore.userNotificationTopics.length; j++) {
            /*
            If we find a corresponding entry in the userStore
             */
            if (notificationTopicSelected[i].notification_topic === userStore.userNotificationTopics[j].notification_topic) {
                flgFoundIt = true
                /*
                If the checkbox is false
                It's dirty as it must have been selected to have made it to the userStore and now it's unselected on the form
                In which case, we can stop searching for this notification topic
                */
                if (notificationTopicSelected[i].selected === false) {
                    flgIsDirty.value = true
                }
                break
            }
        }
        /*
        If we didn't find it in the userStore
            And the notification topic has now been selected
                That means the form is dirty because it wasn't downloaded with the user and we have since added it
         */
        if (flgFoundIt === false) {
            if (notificationTopicSelected[i].selected === true) {
                flgIsDirty.value = true
            }
        }
        /*
        if after all that we have found a dirty element then we can stop chacking as
        we only need to find one dirty item
         */
        if (flgIsDirty.value === true) {
            break
        }
    }
    /*
    if we didn't find any dirty items in the notification topics we need to check
    the channel preferences and if these differ to those we downloaded then
    the form is dirty
     */
    if (flgIsDirty.value !== true) {
        if ((email.value === Boolean(userStore.notificationPreferences.email)) &&
              (sms.value === Boolean(userStore.notificationPreferences.sms)) &&
              (optOut.value === Boolean(userStore.notificationPreferences.opt_out))) {
            flgIsDirty.value = false
        } else {
            flgIsDirty.value = true
        }
    }
}
/*
The user has been presented with a Save or Cancel. If he cancels we reload
the notification preferences and topics to instantiate the current state
of the database
 */

const onCancelled = async () => {
    //console.log("cancelled")
    await getUserNotificationPreferences()
    await getUsersNotificationTopics(userID)
    errorMessage.title=""
    errorMessage.description=""
    flgIsDirty.value = false
}
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/
/*
Check for consistency between the Opt Out option, channel selection and topic
selection
 */
const selectionValidated = () => {
    errorMessage.title = ""
    errorMessage.description = ""
    if (optOut.value === true) {
        return true
    }
    if (email.value === false && sms.value === false) {
        errorMessage.title = "Please select at least one channel"
        errorMessage.description = "To be able to send you notifications we need at least one channel selected." +
              " Alternatively, you can opt out if you don't want to receive any notifications at all."
        return false
    }
    let flgOneTopicSelected=false
    for(let i=0;i<notificationTopicSelected.length;i++){
        if(notificationTopicSelected[i].selected===true){
            flgOneTopicSelected=true
        }
    }
    if (flgOneTopicSelected===false) {
        errorMessage.title = "Please choose a topic to be notified about"
        errorMessage.description = "To be able to send you notifications we need at least one topic selected." +
              " Alternatively, you can opt out if you don't want to receive any notifications at all."
        return false
    }
    return true
}
</script>

<style scoped>

</style>