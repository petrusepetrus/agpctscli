<template>
    <div class="bg-black min-h-screen">
        <Navbar></Navbar>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mx-auto mb-4 mt-4">
                <BaseSpinner
                      v-if="flgIsLoading"
                      action="Loading - please wait"
                      class="text-teal-300"
                >
                </BaseSpinner>
            </div>
            <div v-if="userFound" class="py-10">
                <header>
                    <div class="max-w-7xl mx-auto mb-4 ">
                        <h1 class="text-5xl block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">Profile</h1>
                    </div>
                </header>
                <main class="space-y-8 ">
                    <div class="bg-black p-4 shadow shadow-gray-500 overflow-hidden sm:rounded-lg">

                        <PersonalInformation></PersonalInformation>

                    </div>
                    <div v-if="!addingNewUser" class="bg-black p-4 shadow shadow-gray-500 overflow-hidden sm:rounded-lg">

                        <RolesList></RolesList>

                    </div>
                    <div v-if="!addingNewUser" class="bg-black p-4 shadow shadow-gray-500 overflow-hidden sm:rounded-lg">

                        <AddressList></AddressList>

                    </div>
                    <div v-if="!addingNewUser" class="bg-black p-4 shadow shadow-gray-500 overflow-hidden sm:rounded-lg">
                        <PhoneList></PhoneList>
                    </div>
                    <div v-if="!addingNewUser" class="bg-black p-4 shadow shadow-gray-500 overflow-hidden sm:rounded-lg">
                        <NotificationCard></NotificationCard>
                    </div>


                </main>

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

<script setup>
/*
-------------------------------------------------------------------------------
Overview
-------------------------------------------------------------------------------
Create or update for a given user the User Profile information, including:
- Personal Information
- Phone Numbers
- Addresses
- Notification Preferences
- Roles and Status
----------------------------------------------------------------------------*/
/*
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import {ref} from 'vue'
/* Vue Router */
import {useRoute} from "vue-router";
import router from "../../router/index.js";
/* Components  */
import PersonalInformation from "../../components/user/PersonalInformation.vue";
import PhoneList from "../../components/user/PhoneList.vue";
import AddressList from "../../components/user/AddressList.vue";
import NotificationCard from "../../components/user/NotificationCard.vue";
import RolesList from "../../components/user/RolesList.vue"
import BaseErrorMessage from "../../components/ui/BaseErrorMessage.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
/* Stores */
import {useUserStore} from "../../stores/UserStore.js";
/* Services */
import useAuthService from "../../services/useAuthService.js";
import useUserService from "../../services/useUserService.js";
import useErrorService from "../../services/useErrorService.js";
import Navbar from "../../components/layout/Navbar.vue";
/*
-------------------------------------------------------------------------------
Props
------------------------------------------------------------------------------- */

/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */

/*
-------------------------------------------------------------------------------
Initialisation
-------------------------------------------------------------------------------*/

/*
-------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/

/*
-------------------------------------------------------------------------------
Emits
------------------------------------------------------------------------------- */

/*
-------------------------------------------------------------------------------
Variable Declaration and Initialisation
------------------------------------------------------------------------------- */
const addingNewUser = ref(false)
const userFound = ref(false)
const flgIsLoading = ref(false)
const errorMessage = ref({})
const route = useRoute();

const {logout} = useAuthService()
const {getUser} = useUserService()
const {errorMessageHandler} = useErrorService()


/*
-------------------------------------------------------------------------------
Mainline
------------------------------------------------------------------------------- */
/* retrieve the userID from the URL parameters for the user in question  */
let userID = route.params.userID

if (userID === 'new') {
    //console.log("adding user")
    addingNewUser.value = true
} else {
    getUserToBeEdited(userID)
}

/*
-------------------------------------------------------------------------------
Functions
------------------------------------------------------------------------------- */
async function getUserToBeEdited(userID) {
    flgIsLoading.value = true
    try {
        //console.log("searching for one")
        let response = await getUser(userID)
        if (response.data) {
            //console.log("found one")

            userFound.value = true
            const userStore = useUserStore()
            userStore.user.id = response.data.id
            userStore.user.first_name = response.data.first_name
            userStore.user.last_name = response.data.last_name
            userStore.user.name = response.data.name
            userStore.user.email = response.data.email
            userStore.user.avatar = response.data.avatar
            userStore.user.email_verified_at = response.data.email_verified_at
            userStore.verified = !!response.data.email_verified_at;
            userStore.userRoles = response.data.roles
            userStore.userPermissions = response.data.permissions
        } else {
            userFound.value = false
            errorMessage.value.title = "No User Found"
            errorMessage.value.description = "We could not find a user with the ID of " + userID + ". If you think this is a mistake please contact support."
        }
    } catch (e) {
        userFound.value = false
        errorMessage.value = await errorMessageHandler(e)
        if (errorMessage.value.status === 401 || errorMessage.value.status === 419) {
            //console.log("401 or 409")
            try {
                if (localStorage.getItem('authStore')) {
                    const returnedState = JSON.parse(localStorage.getItem('authStore'))
                    //console.log(returnedState.authenticated)
                    //console.log(returnedState.verified)
                    //console.log(returnedState.user)
                }
                localStorage.removeItem('authStore')
                if (localStorage.getItem('authStore')) {
                    const returnedState = JSON.parse(localStorage.getItem('authStore'))
                    //console.log(returnedState.authenticated)
                    //console.log(returnedState.verified)
                    //console.log(returnedState.user)
                }
                await logout
            } catch (e) {
                //console.log(e)
            }

            await router.push({name: "login"})
        }
    }
    flgIsLoading.value = false
}

/*
-------------------------------------------------------------------------------
Lifecycle Hooks
---------------------------------------------------------------------------------*/
</script>

<style scoped>

</style>