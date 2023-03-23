<template>
    <div class="pt-2 sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
            <h3 class="text-lg font-medium text-teal-500">Phone Details</h3>

        </div>

    </div>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-2 pt-2 my-4">
        <p class="lg:col-span-6 md:col-span-4 sm-col-span-1 mt-2 text-sm text-gray-300">
            Several different phone number types can be entered. Please nominate one of your phone numbers to be your
            primary contact number, preferably a mobile number.
        </p>
        <div v-if="!flgChangingPhone" class="col-span-1 md:col-start-6 lg:col-start-8 mt-6 sm:mt-0 float-right">
            <BaseButton
                  class="text-sm"
                  v-if="availablePhoneTypesCount!==0"
                  title="Add Phone"
                  @click="addPhone"
            />
        </div>
    </div>
    <BaseSpinner
          v-if="flgIsLoading || flgIsDeleting"
          :action="flgIsLoading ?'Loading - please wait' : 'Deleting - please wait'"
          class="text-teal-300"
    >
    </BaseSpinner>
    <div v-if="flgPhonesFound"
         class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-black">
            <tr>
                <th scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 lg:table-cell">
                    Type
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 sm:table-cell">
                    Country Code
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 sm:table-cell">
                    Number
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell">
                    Primary
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"><span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"><span class="sr-only">Delete</span>
                </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-black">
            <tr v-for="userPhone in userStore.userPhones" :key="userPhone.id">
                <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                    {{ userPhone.phone_type }}
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Number</dt>
                        <dd v-if="userPhone.international_dialling_code_formatted==='(+44)'"
                            class="mt-1 truncate text-gray-300 sm:hidden">
                            {{ userPhone.international_dialling_code_formatted }}
                        </dd>
                        <dd v-else class="mt-1 truncate text-red-500 sm:hidden">
                            {{ userPhone.international_dialling_code_formatted }}
                        </dd>
                        <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ userPhone.phone_number }}</dd>
                    </dl>
                </td>
                <td v-if="userPhone.international_dialling_code_formatted==='(+44)'"
                    class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">
                    {{ userPhone.international_dialling_code_formatted }}
                </td>
                <td v-else class="hidden px-3 py-4 text-sm text-red-500 sm:table-cell">
                    {{ userPhone.international_dialling_code_formatted }}
                </td>

                <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">{{ userPhone.phone_number }}</td>

                <td v-if="userPhone.preferred_contact_number===0" class="px-3 py-4 text-sm text-gray-300"></td>
                <td v-else class="px-3 py-4 text-sm text-gray-300">
                    <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true"/>
                </td>
                <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                          v-if="!flgChangingPhone"
                          class="text-teal-300 hover:text-teal-100"
                          @click="changePhone(userPhone)"
                    >Edit
                    </button>
                </td>
                <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                          v-if="!flgChangingPhone"
                          class="text-teal-300 hover:text-teal-100"
                          @click="deletePhone(userPhone)"
                    >Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-if="flgAddingPhone " class="m-4">
        <PhoneForm
              :user-i-d="userID"
              @refresh="onRefresh"
              @cancelled="onCancelled"
        >
        </PhoneForm>
    </div>
    <div v-if="flgChangingPhone && processForm" class="m-4">
        <PhoneForm
              :key="userPhoneToChange.id"
              :user-phone="userPhoneToChange"
              :user-i-d="userID"
              @cancelled="onCancelled"
              @updated="onUpdated"
        >
        </PhoneForm>
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
</template>

<script setup>
/*
-------------------------------------------------------------------------------
Overview
-------------------------------------------------------------------------------
The PhoneList component manages
- the presentation of the user Phone details
- the addition of new Phones for a user
- changing or deleting a user's Phone details
----------------------------------------------------------------------------*/
/*
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import {onBeforeMount, reactive, ref} from 'vue'
/* Router */
import {useRoute} from "vue-router";
/* Components  */
import PhoneForm from "../user/PhoneForm.vue"
import BaseButton from "../ui/BaseButton.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseWarningMessage from "../ui/BaseWarningMessage.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
import {CheckCircleIcon} from "@heroicons/vue/24/solid";
/* Stores  */
import {useUserStore} from "../../stores/UserStore.js";

const userStore = useUserStore()
/* Services
load the User services to manage user address CRUD
*/
import useUserService from "../../services/useUserService.js";
import useErrorService from "../../services/useErrorService.js";

const {getUserPhones, deleteUserPhone, getAvailablePhoneTypes} = useUserService()
const {errorMessageHandler} = useErrorService()
/*
-----------------------------------------------------------------------------
Variable Declaration
-------------------------------------------------------------------------------*/
let availablePhoneTypes = ref({})       //list of available phone types
let availablePhoneTypesCount = ref(0)   //count of available phone types

let warningMessage = reactive({})
let errorMessage = reactive({})

let flgPhonesFound = ref(false)               //flags user has phones
let flgIsLoading = ref(false)
let flgIsDeleting=ref(false)
let flgAddingPhone = ref(false)            //flags we are adding a phone
let flgChangingPhone = ref(false)          //flags we are changing a phone

let userPhoneToChange = reactive({})
/*
-------------------------------------------------------------------------------
Initialisation
-------------------------------------------------------------------------------
/* retrieve the userID from the URL parameters for the user in question  */
const route = useRoute();
let userID = route.params.userID
let processForm = reactive({})
processForm.value = true
/*
-----------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
const deletePhone = async (userPhoneToDelete) => {
    /* Deletes a user phone. Once the phone has been successfully deleted
    the 'refresh' event is emitted which triggers a refresh of the user phone
    in the userStore and the UserPhoneCards
    */
    flgIsDeleting.value=true
    try {
        await deleteUserPhone(userID, userPhoneToDelete.id)
        await refreshPhones()
        await findAvailablePhoneTypes()
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value = false
    }
    flgIsDeleting.value=false
}
/*
add a phone
set the userPhone prop to be received by the PhoneForm component to empty
this signifies we are adding a new phone
 */
const addPhone = () => {
    /* Clear the userAddress working area and flag we are
    in add (as distinct to change) mode
     */
    flgAddingPhone.value = true
}
const changePhone = (userPhoneParm) => {
    /* Clear the userPhone working area and flag we are
    in add (as distinct to change) mode
    */
    userPhoneToChange.value = userPhoneParm
    flgChangingPhone.value = true
}
const refreshPhones = async () => {
    /*
    refreshPhones is run via the onMounted hook and also triggered by the v-on:refresh
    event that emitted by the PhoneForm components to indicate
    that a change to the user's Phones has taken place and the Phones in the userStore
    should be updated
     */
    try {
        flgAddingPhone.value = false
        flgChangingPhone.value = false
        userStore.userPhones = ""
        userStore.userPhones = await getUserPhones(userID)
        //console.log(userStore.userPhones)
        let preferredNumberFound = false
        warningMessage.title = ""
        warningMessage.text = ""
        /* if we haven't found any phones
        remove the phone table from the DOM
        set a warning message for the user
        */
        if (userStore.userPhones.length === 0) {
            flgPhonesFound.value = false
            warningMessage.warningTitle = "Warning - no phone details"
            warningMessage.text = "Please provide a phone number, preferably a mobile"
        } else {
            /*
            flag that we have some phones and reveal the table in the DOM
            check if we have a preferred contact number set
             */
            flgPhonesFound.value = true
            for (let i = 0; i < userStore.userPhones.length; i++) {
                if (userStore.userPhones[i].preferred_contact_number === 1) {
                    preferredNumberFound = true
                }
            }
            /*
            if we have no preferred contact number set a warning for the user
             */
            if (!preferredNumberFound) {
                warningMessage.warningTitle = "Warning - you have no primary contact number selected"
                warningMessage.text = `Without a primary contact number you may miss urgent updates on class cancellations or other
            time sensitive items. We would recommend selecting a mobile phone for this purpose`
            }
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value = false
    }
}
const findAvailablePhoneTypes = async () => {
    /*
    find the available phone types for a user based on which phone types they have
    already assigned from the available phone types and thereby limiting the select
    to only those that they have not already used
     */
    try {
        availablePhoneTypes.value = await getAvailablePhoneTypes(userID)
        availablePhoneTypesCount.value = (Object.keys(availablePhoneTypes.value).length)
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value = false
    }
}
const onCancelled = () => {
    /*
    triggered by PhoneForm component to indicate user cancelled the add
    or change so toggle the flags off to remove the PhoneForm component
     */
    flgAddingPhone.value = false
    flgChangingPhone.value = false
}
const onUpdated = async () => {
    //console.log("updated")
    flgAddingPhone.value = false
    flgChangingPhone.value = false
    await refreshPhones()
    await findAvailablePhoneTypes(userID)
}
const onRefresh = async () => {
    /*
    triggered by PhoneForm component to indicate user completed the add
    or change so toggle the flags off to remove the PhoneForm component
    and refresh the phone list and the available phone types
     */
    flgIsLoading.value = true
    warningMessage.warningTitle = ""
    warningMessage.text = ""
    await refreshPhones()
    await findAvailablePhoneTypes(userID)
    flgIsLoading.value = false
}
/*
-------------------------------------------------------------------------------
Lifecycle Hooks
-------------------------------------------------------------------------------*/
onBeforeMount(async () => {
    flgIsLoading.value = true
    await refreshPhones()
    await findAvailablePhoneTypes()
    flgIsLoading.value = false
})

</script>

<style scoped>

</style>