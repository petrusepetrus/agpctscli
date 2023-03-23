<template>
    <div class="bg-black min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-24 w-auto w-24 rounded-full border-cyan-600 border-solid border-2 bg-gray-100"
                 src="/images/agcplogotrsp150x150.png"
                 alt="Agapanthus Consulting"/>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-cyan-600">Agapanthus Consulting</h1>
            <h2 class="mt-6 text-center text-2xl font-extrabold text-cyan-500">Register for an account</h2>
            <p class="mt-2 text-center text-sm text-gray-300">
                Already registered?
                {{ ' ' }}
                <router-link
                      class="font-medium text-teal-300 hover:text-teal-600"
                      to="/login">sign in to your account
                </router-link>
            </p>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form v-if="!userRegistered" novalidate class="space-y-6" @submit.prevent="onSubmit">
                    <div class="mt-1">
                        <BaseInput
                              v-model="first_name"
                              type="string"
                              :required="true"
                              placeholder="first name"
                              autocomplete="first name"
                              label=" First name"
                              name="first_name"
                              :error="errors.first_name"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput
                              v-model="last_name"
                              type="string"
                              :required="true"
                              placeholder="last name"
                              autocomplete="last name"
                              label="Last name"
                              name="last_name"
                              :error="errors.last_name"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput
                              v-model="email"
                              type="email"
                              :required="true"
                              placeholder="email address"
                              autocomplete="email"
                              label="Email"
                              name="email"
                              :error="errors.email"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput

                              v-model="password"
                              type="password"
                              :required="true"
                              placeholder="password"
                              autocomplete="password"
                              label="Password"
                              name="password"
                              :error="errors.password"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div class="mt-1">
                        <BaseInput
                              v-model="password_confirmation"
                              type="password"
                              :required="true"
                              placeholder="confirm password"
                              autocomplete="password"
                              label="Password confirmation"
                              name="password_confirmation"
                              :error="errors.password_confirmation"
                              :label-class="'block text-md text-gray-300'"
                              :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-gray-500'"
                        >
                        </BaseInput>
                    </div>
                    <div>
                        <BaseButton
                              title="Register"
                              :submitting="flgIsSubmitting"
                              :disabled="flgIsSubmitting"
                        />
                    </div>


                </form>
                <BaseErrorMessage
                      v-if="errorMessage.title"
                      :error-description=errorMessage.description
                      :error-title=errorMessage.title>
                </BaseErrorMessage>
                <BaseInformationMessage v-if="registerMessages"
                >
                    {{ registerMessages }}
                </BaseInformationMessage>
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
import {reactive, ref} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseInput from "../ui/BaseInput.vue";
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
import {useAuthStore} from "../../stores/AuthStore.js"
import {storeToRefs} from 'pinia'
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/
import {object, string} from "yup";
import {useField, useForm} from "vee-validate";
/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
const authStore = useAuthStore()
const {user} = storeToRefs(authStore)
const {errorMessageHandler}=useErrorService()
const {registerUser, callUserAPI} = useAuthService()

const registerMessages = ref('')
const userRegistered = ref(false)
const errorMessage=reactive({})

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
/*
Set up the vee-validate validation schema
 */
const validationSchema = object({
    first_name: string().required('Please enter your first name'),
    last_name: string().required('Please enter your last name'),
    email: string().email('Invalid email format').required('An email address is required'),
    password: string().required('Please enter your password'),
    password_confirmation: string().required('Please confirm your password'),

})
/*
Define functional components to be used by vee-validate 'useForm'
 */
const {handleSubmit, flgIsSubmitting, setErrors, errors} = useForm({
    validationSchema
})
/*
Define the fieldset to be validated by vee-validate
 */
const {value: first_name} = useField('first_name')
const {value: last_name} = useField('last_name')
const {value: email, handleChange} = useField('email')
const {value: password} = useField('password')
const {value: password_confirmation} = useField('password_confirmation')
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
On submit
Await the registerUser function response
If there are any errors returned from the registerUser function raise these with vee-validate
 */
const onSubmit = handleSubmit(async values => {
    try {
        await registerUser(values)
        await callUserAPI
        registerMessages.value = 'Congratulations, you are now registered. Please check your email box for your verification email. Once verified you will be able to sign into your account.'
        userRegistered.value = true
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
    }

    return {
        onSubmit,
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        handleChange,
        registerMessages
    }
})
</script>

<style scoped>

</style>