<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
RegisterByInvitation is activated by the the user clicking on the email
sent to them by the API which includes a token that enables them to register
for an account on the system.
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {reactive, ref, onBeforeMount} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRoute} from "vue-router";
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

/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/
import {object, string, ref as yref} from "yup";
import {useField, useForm} from "vee-validate";
import useMiscService from "../../services/misc/useMiscService.js";
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

const route = useRoute();
const {registerUser, callUserAPI} = useAuthService()
const {errorMessageHandler} = useErrorService()
const {retrieveInvitation, revokeInvitation} = useMiscService()

let registerMessage: GenericMessage = reactive({
    title: "",
    description: ""
})
let errorMessage: GenericMessage = reactive({
    title: "",
    description: ""
})
const userRegistered = ref(false)
const invitationValid = ref(false)
const invitation_email = ref('')

let invitationToken = reactive({})
invitationToken = route.query.token

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
    password_confirmation: string().required('Please confirm your password').oneOf([yref('password')], 'Passwords do not match'),

})
/*
Define functional components to be used by vee-validate 'useForm'
 */
const {handleSubmit, setFieldError, errors} = useForm({
    validationSchema
})

/*
Define the fieldset to be validated by vee-validate
 */
const {value: first_name} = useField('first_name', {validateOnValueUpdate: false})
const {value: last_name} = useField('last_name', {validateOnValueUpdate: false})
const {value: email, handleChange} = useField('email', {validateOnValueUpdate: false})
const {value: password} = useField('password', {validateOnValueUpdate: false})
const {value: password_confirmation} = useField('password_confirmation', {validateOnValueUpdate: false})
/*===============================================================================*/
/* Emits
/*===============================================================================*/

/*===============================================================================*/
/* Watches
/*===============================================================================*/

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
/*
validate whether there is a token attached to the invitation.
if there is...
    retrieve the invitation
    check if the expire date has passed...
        if it's in date...
            carry on processing...
 */
onBeforeMount(async () => {
    if (!invitationToken) {
        errorMessage.title = "Invalid Invitation"
        errorMessage.description = "The invitation credentials are invalid. Please request another invitation."
    } else {
        try {
            let response = await retrieveInvitation(invitationToken)
            let expireDate = new Date(response.data.expires_at)
            let currentDate = new Date()
            if (currentDate > expireDate) {
                errorMessage.title = "Invalid Invitation"
                errorMessage.description = "This invitation has expired. Please request another invitation."
            } else {
                invitationValid.value = true
                invitation_email.value = response.data.email
            }
        } catch (e) {
            errorMessage = await errorMessageHandler(e)
        }
    }
})
/*===============================================================================*/
/* Functions
/*===============================================================================*/
/*
Validate the input registration details
if the registration is valid...
    register the user
    retrieve their details
    revoke the invitation as it is no longer needed
 */
const onSubmit = handleSubmit(async (values) => {
    if (email.value !== invitation_email.value) {
        setFieldError('email', 'This email address does not correspond to this invitation. Please request another invitation.')
    } else {
        try {
            await registerUser(values)
            await callUserAPI
            await revokeInvitation(invitationToken)
            registerMessage.title = 'Registration Successful'
            registerMessage.description = 'Congratulations, you are now registered. Please check your email box for your verification email. Once verified you will be able to sign into your account.'
            userRegistered.value = true
        } catch (e) {
            errorMessage = await errorMessageHandler(e)
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
            <h2 class="mt-6 text-center text-2xl font-extrabold text-cyan-500">Register your account</h2>
            <p class="mt-2 text-center text-sm text-gray-300">
                Already registered?
                <router-link
                      class="font-medium text-teal-300 hover:text-teal-600"
                      to="/login">sign in to your account
                </router-link>
            </p>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div>
                    <p class="py-4 text-center text-sm text-gray-300">Please enter your credentials using the same email
                        address that you requested your invitation with.</p>
                </div>
                <form v-if="!userRegistered && invitationValid" novalidate class="space-y-6" @submit.prevent="onSubmit">
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
                              :disbaled="true"
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
                <div v-if="errorMessage.title" class="mt-2">
                    <BaseErrorMessage
                          :error-description=errorMessage.description
                          :error-title=errorMessage.title>
                    </BaseErrorMessage>
                </div>
                <div v-if="registerMessage.title" class="mt-2">
                    <BaseInformationMessage
                          :title="registerMessage.title"
                          :description="registerMessage.description"
                    >
                    </BaseInformationMessage>
                </div>
            </div>
        </div>
    </div>
</template>