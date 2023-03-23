<template>
    <div class="bg-black min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-24 w-auto w-24 rounded-full border-cyan-600 border-solid border-2 bg-gray-100"
                 src="/images/agcplogotrsp150x150.png"
                 alt="Agapanthus Consulting"/>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-cyan-600">Agapanthus Consulting</h1>
            <h2 class="mt-6 text-center text-2xl font-extrabold text-cyan-500">Reset your password</h2>
            <p class="mt-2 text-center text-sm text-gray-300">
                Or, if you've remembered your password
                {{ ' ' }}
                <router-link class="font-medium text-teal-300 hover:text-teal-600"
                             to="/login">sign in to your account
                </router-link>
            </p>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                    <div class="mt-1">
                        <BaseInput

                              type="password"
                              :required="true"
                              placeholder="password"
                              autocomplete="password"
                              label="Confirm Password"
                              name="password_confirmation"
                              v-model="password_confirmation"
                              :error="errors.password_confirmation"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput
                              type="hidden"
                              :required="true"
                              nodi
                              placeholder="token"
                              autocomplete="token"
                              label=""
                              name="token"
                              v-model="token"
                              :error="errors.token"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                            <label for="remember-me" class="ml-2 block text-sm text-gray-400"> Remember me </label>
                        </div>

                        <div class="text-sm">
                            <router-link class="font-medium text-teal-300 hover:text-teal-600"
                                         to="/forgot-password">Forgot your password
                            </router-link>
                        </div>
                    </div>

                    <div>
                        <BaseButton
                              title="Reset Password"
                              :submitting="flgIsSubmitting"
                              :disabled="flgIsSubmitting"
                        />
                    </div>
                    {{errorMessage}}
                    {{informationMessage}}
                    <BaseErrorMessage
                          v-if="errorMessage.title"
                          :error-description=errorMessage.description
                          :error-title=errorMessage.title>
                    </BaseErrorMessage>
                    <BaseInformationMessage
                          v-if="informationMessage.title"
                          :title="informationMessage.title"
                          :description="informationMessage.description">
                    </BaseInformationMessage>
                </form>
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
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {reactive,ref} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRoute,useRouter} from 'vue-router'
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseInput from "../ui/BaseInput.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../ui/BaseInformationMessage.vue";
import BaseButton from "../ui/BaseButton.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useAuthService from "../../services/useAuthService";
import useErrorService from "../../services/useErrorService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/

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
const {resetPassword} = useAuthService()
const route = useRoute()
const router=useRouter()
const {errorMessageHandler}=useErrorService()

const form = reactive({
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
})

/*
Set up the validation schema
 */
const validationSchema = object({
    password: string().required('Please enter your password'),
    password_confirmation: string().required('Please enter your password'),
    email: string().email('Invalid email format').required('An email address is required'),
    token: string().required('token must be present')
})
const {handleSubmit,  setErrors, errors} = useForm({
    validationSchema
})
const {value: email, handleChange} = useField('email')
const {value: password} = useField('password')
const {value: password_confirmation} = useField('password_confirmation')
const {value: token} = useField('token')
const informationMessage = reactive({})
const flgIsSubmitting=ref(false)
const errorMessage=ref({})
/*
Initialise the hidden token field to the token value set by Laravel and passed
back in the /reset-password query parameters
 */
token.value = route.query.token
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
/*
On submit call the resetPassword endpoint
 */
const onSubmit = handleSubmit(async form => {
    try {
        flgIsSubmitting.value=true
        await resetPassword(form)
        informationMessage.title = 'Success'
        informationMessage.description = 'Your password has been reset.'
        setTimeout(() => {  router.push({name: 'login'}) }, 5000);
        flgIsSubmitting.value=false
    } catch (e) {
        //console.log(e)
        errorMessage.value = await errorMessageHandler(e)
        flgIsSubmitting.value=false
    }
    return {
        onSubmit,
        email,
        password,
        password_confirmation,
        handleChange,
        informationMessage
    }
})

</script>