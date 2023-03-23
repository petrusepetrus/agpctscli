<template>
    <div class="pt-2 sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
            <h3 class="text-lg font-medium text-teal-500">Address Details</h3>
        </div>
    </div>

    <div class="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-2 pt-2 my-4">
        <p class="lg:col-span-6 md:col-span-4 sm-col-span-1 mt-2 text-sm text-gray-300">
            Several different address types can be entered. Please nominate one as your primary correspondence address which
            should be an address where you can receive mail.
        </p>
        <div v-if="!flgChangingAddress" class="col-span-1 md:col-start-6 lg:col-start-8 mt-6 sm:mt-0 float-right">
            <BaseButton
                  class="text-sm"
                  v-if="availableAddressTypesCount!==0"
                  title="Add Address"
                  @click="addAddress"
            />
        </div>
    </div>
    <BaseSpinner
          v-if="flgIsLoading"
          action="Loading - please wait"
          class="text-teal-300"
    >
    </BaseSpinner>
    <div
          v-if="flgAddressesFound"
          class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-black ">
            <tr>
                <th
                      scope="col"
                      class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 lg:table-cell">
                    Type
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell">
                    Address
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 sm:table-cell">

                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell">
                    Town
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell">
                    Post Code
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell">
                    Country
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
            <tr v-for="userAddress in userStore.userAddresses" :key="userAddress.id">
                <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                    {{ userAddress.address_type }}
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Address</dt>
                        <dd class="mt-1 truncate text-gray-300 sm:hidden">{{ userAddress.address_line_1 }}</dd>
                    </dl>
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Address</dt>
                        <dd class="mt-1 truncate text-gray-300 sm:hidden">{{ userAddress.address_line_2 }}</dd>
                    </dl>
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Address</dt>
                        <dd class="mt-1 truncate text-gray-300 sm:hidden">{{ userAddress.town }}</dd>
                    </dl>
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Country</dt>
                        <dd class="mt-1 truncate text-gray-300 sm:hidden">{{ userAddress.country }}</dd>
                    </dl>
                    <dl class="font-normal lg:hidden">
                        <dt class="sr-only sm:hidden">Post Code</dt>
                        <dd class="mt-1 truncate text-gray-300 sm:hidden">{{ userAddress.post_code }}</dd>
                    </dl>
                </td>
                <td class="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{{ userAddress.address_line_1 }}</td>
                <td class="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{{ userAddress.address_line_2 }}</td>
                <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">{{ userAddress.town }}</td>
                <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">{{ userAddress.post_code }}</td>
                <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">{{ userAddress.country }}</td>
                <td v-if="userAddress.preferred_contact_address===0" class="px-3 py-4 text-sm text-gray-300"></td>
                <td v-else class="px-3 py-4 text-sm text-gray-300">
                    <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true"/>
                </td>
                <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                          v-if="!flgChangingAddress"
                          class="text-teal-300 hover:text-teal-100"
                          @click="changeAddress(userAddress)"
                    >Edit
                    </button>
                </td>
                <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                          v-if="!flgChangingAddress"
                          class="text-teal-300 hover:text-teal-100"
                          @click="deleteAddress(userAddress)"
                    >Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div>
        <div v-if="flgAddingAddress && processForm" class="m-4">
            <AddressForm
                  :user-i-d="userID"
                  @refresh="onRefresh"
                  @cancelled="onCancelled"
            >
            </AddressForm>
        </div>
        <div v-if="flgChangingAddress && processForm" class="m-4">
            <AddressForm
                  :key="userAddressToChange.id"
                  :user-address="userAddressToChange"
                  :user-i-d="userID"
                  @cancelled="onCancelled"
                  @updated="onUpdated"
            >
            </AddressForm>
        </div>
    </div>
    <div v-if="warningMessage.text" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
        <BaseWarningMessage
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
The AddressInformation component manages
- the presentation of the user Address details via the AddressCard components
- the addition of new Addresses for a user
- changing or deleting a user's Address details
----------------------------------------------------------------------------*/
/* 
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import { ref, reactive, onBeforeMount} from 'vue'
/* Vue Router */
import {useRoute} from "vue-router";
/* Components  */
import AddressForm from "../user/AddressForm.vue"
import BaseButton from "../ui/BaseButton.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseWarningMessage from "../ui/BaseWarningMessage.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
import {CheckCircleIcon} from "@heroicons/vue/24/solid";
/* Stores
load the User store to save any pre-existing Addresss
 */
import {useUserStore} from "../../stores/UserStore.js";

const userStore = useUserStore()
/* Services
load the User services to manage user address CRUD
 */
import useUserService from "../../services/useUserService.js";
import useErrorService from "../../services/useErrorService.js";

const {getUserAddresses, deleteUserAddress, getAvailableAddressTypes} = useUserService()
const {errorMessageHandler} = useErrorService()
/* 
-------------------------------------------------------------------------------
Variable declarations
------------------------------------------------------------------------------ */
let availableAddressTypes = ref({})     //list of available address types
let availableAddressTypesCount = ref(0) //count of available address types

let warningMessage = reactive({})
let errorMessage = reactive({})

let flgIsLoading =ref(false)

let flgAddressesFound = ref(false) //flags whether user has any addresses

let flgAddingAddress = ref(false)       //flags whether we are adding an address
let flgChangingAddress = ref(false)     //flags whether we are changing an address

let userAddressToChange = reactive({})/*
-------------------------------------------------------------------------------
Initialisation
-------------------------------------------------------------------------------
/* retrieve the userID from the URL parameters for the user in question  */
const route = useRoute();
let userID = route.params.userID
const processForm=reactive({})
processForm.value=true
/*
-------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
const deleteAddress = async (userAddressToDelete) => {
    /* Deletes a user address. Once the address has been successfully deleted
     the 'refresh' event is emitted which triggers a refresh of the user address
     in the userStore and the UserAddressCards
     */
    try {
        await deleteUserAddress(userID, userAddressToDelete.id)
        await refreshAddresses()
        await findAvailableAddressTypes()
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value=false
    }
}
const addAddress = () => {
    /* Clear the userAddress working area and flag we are
    in add (as distinct to change) mode
     */
    flgAddingAddress.value = true
}
const changeAddress = (userAddressParm) => {
    /* Prime the userAddressToChange working area with the address to change
     and flag that we are in change (as distinct to add) mode
    */
    userAddressToChange.value = userAddressParm
    flgChangingAddress.value = true
}
const refreshAddresses = async () => {
    /*
    refreshAddresses is run via the onMounted hook and also triggered by the v-on:refresh
    event that can be emitted by the AddressCard and AddressDetails components to indicate
    that a change to the user's Addresss has taken place and the Addresss in the userStore
    should be updated and the AddressCards refreshed with hose new details
     */
    try {
        flgAddingAddress.value = false
        flgChangingAddress.value = false
        userStore.userAddresses = await getUserAddresses(userID)
        let preferredAddressFound = false
        warningMessage.warningTitle = ""
        warningMessage.text = ""
        /* if we haven't found any addresses
                remove the addresses table from the DOM
                set a warning message for the user
         */
        if (userStore.userAddresses.length === 0) {
            flgAddressesFound.value = false
            warningMessage.warningTitle = "Warning - no address details"
            warningMessage.text = "You need to provide an address to receive mail and enrol on courses"
        } else {
            /*
            flag that we have some addresses and reveal the table in the DOM
            check if we have a preferred contact address set
             */
            flgAddressesFound.value = true
            for (let i = 0; i < userStore.userAddresses.length; i++) {
                if (userStore.userAddresses[i].preferred_contact_address === 1) {
                    preferredAddressFound = true
                }
            }
            /*
            if we have no preferred contact address set a warning for the user
             */
            if (!preferredAddressFound) {
                warningMessage.warningTitle = "Warning - your have no primary contact address selected"
                warningMessage.text = "Without a primary address selected you will not receive any mail or be able to enrol on any courses"
            }
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value=false
    }
}
const findAvailableAddressTypes = async () => {
    /*
    retrieve the available address types from the database and populate the select
    a user can have one address for each available type so this returns only the
    unused address types. If there are no address types returned then we test this
    and remove the 'add address' button in the DOM
     */
    try {
        availableAddressTypes.value = await getAvailableAddressTypes(userID)
        availableAddressTypesCount.value = (Object.keys(availableAddressTypes.value).length)
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        processForm.value=false
    }

}
const onCancelled = () => {
    flgAddingAddress.value = false
    flgChangingAddress.value = false
}
const onUpdated = async () => {
    flgAddingAddress.value = false
    flgChangingAddress.value = false
    await refreshAddresses()
    await findAvailableAddressTypes(userID)
}
const onRefresh = async () => {
    flgIsLoading.value=true
    warningMessage.warningTitle=""
    warningMessage.text=""
    await refreshAddresses()
    await findAvailableAddressTypes(userID)
    flgIsLoading.value=false
}
/*
-------------------------------------------------------------------------------
Lifecycle Hooks
-------------------------------------------------------------------------------*/
onBeforeMount(async () => {
    flgIsLoading.value=true
    await refreshAddresses()
    await findAvailableAddressTypes(userID)
    flgIsLoading.value=false
})

</script>

<style scoped>

</style>