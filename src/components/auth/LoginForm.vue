
<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
Provides login facilities for end user
and initialise authorisation details for user in the authStore
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
/* Vue */
import {reactive} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRouter} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useAuthService from "../../services/useAuthService.js";
import useErrorService from "../../services/useErrorService.js";
import {hasRole} from "../../utils/RolesAndPermissions.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useAuthStore} from "../../stores/AuthStore";
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/
import {useField, useForm} from 'vee-validate'
import {object, string} from 'yup'
/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
interface GenericMessage {
    title: string,
    description: string
}
const router = useRouter()
const authStore = useAuthStore()
const {login,logout} = useAuthService()
const {errorMessageHandler} = useErrorService()
let errorMessage:GenericMessage = reactive({
    title:"",
    description:""
})
/*
Set up the vee-validate validation items
*/
const validationSchema = object({
    password: string().required('Please enter your password'),
    email: string().email('Invalid email format').required('An email address is required'),
})
const {handleSubmit, isSubmitting, errors} = useForm({
    validationSchema
})
const {value: email, handleChange} = useField('email')
const {value: password} = useField('password')
/*===============================================================================*/
/* Emits
/*===============================================================================*/

/*===============================================================================*/
/* Watches
/*===============================================================================*/

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Functions
/*===============================================================================*/
const loginAttempt=async (values)=>{
    await login(values)
    if (authStore.isAuthenticated && authStore.isVerified) {
        if (hasRole(['super admin', 'admin'])) {
            await router.push({name: "home"})
        } else {
            await router.push({name: "user-dashboard"})
        }
    } else if (!authStore.isVerified) {
        await router.push({name: 'verify-email'})
    }
}
/*
On login attempt
*/
const onSubmit = handleSubmit(async values => {
    /*
    attempt to login
    if successful...
        the login process will have retrieved the user information from the back end
        and put this into the authStore.
        If the user is authenticated and verified...
            we redirect them to the home page.
        If they are not already verified we route them
            to the verify email page
    else, if the login is unsuccessful...
        output the error to the user
    */
    /**
     * TODO
     * need to adjust redirects to reflect behaviour for other authorised users
     * should we decide to implement at some point
     */
    try {
        await loginAttempt(values)
    } catch (e) {
        let errorReturned = await errorMessageHandler(e)
        if(errorReturned.status===419 || errorReturned.status===422){
            try{
                await logout()
                await loginAttempt(values)
            }catch(e){
                errorMessage = await errorMessageHandler(e)
            }
        }else{
            errorMessage=errorReturned
        }
    }
})
</script>

<template>
    <div class="bg-black min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-24 w-auto w-24 rounded-full border-cyan-600 border-solid border-2 bg-gray-100"
                 src="/images/agcplogotrsp150x150.png"
                 alt="Agapanthus Consulting"/>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-cyan-600">Agapanthus Consulting</h1>
            <h2 class="mt-6 text-center text-2xl font-extrabold text-cyan-500">Sign in to your account</h2>
            <!--
<p class="mt-2 text-center text-sm text-gray-600">
    Or
    {{ ' ' }}
    <router-link class="font-medium text-indigo-600 hover:text-indigo-500"
                 to="/register">register for an account
    </router-link>
</p>
            -->
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10 border-1 border-gray-100 rounded-sm shadow-md shadow-gray-300/50">
                <form novalidate v-on:submit.prevent="onSubmit" class="space-y-6">
                    <div class="mt-1">
                        <BaseInput
                              type="email"
                              :required="true"
                              placeholder="email address"
                              autocomplete="email"
                              label="Email"
                              name="email"
                              v-model="email"
                              :error="errors.email"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput
                              type="password"
                              :required="true"
                              placeholder="password"
                              autocomplete="password"
                              label="Password"
                              name="password"
                              v-model="password"
                              :error="errors.password"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   class="h-4 w-4 text-gray-300 focus:ring-teal-500 border-gray-300 rounded"/>
                            <label for="remember-me" class="ml-2 block text-sm text-gray-400"> Remember me </label>
                        </div>
                        <div class="text-sm">
                            <router-link class="font-medium text-teal-500 hover:text-teal-300"
                                         to="/forgot-password">Forgot your password
                            </router-link>
                        </div>
                    </div>
                    <div>
                        <BaseButton
                              title="Sign In"
                              :submitting="isSubmitting"
                              :disabled="isSubmitting"
                        />
                    </div>
                    <BaseErrorMessage
                          v-if="errorMessage.title"
                          :error-description=errorMessage.description
                          :error-title=errorMessage.title>
                    </BaseErrorMessage>
                </form>
            </div>
        </div>
    </div>
</template>