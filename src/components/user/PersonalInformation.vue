<template>
    <form novalidate class="bg-black space-y-6" @submit="onSubmit">
        <div class="pt-2">
            <div>
                <h3 class="text-lg font-medium text-teal-500">Personal Information</h3>
                <p class="my-4 text-sm text-gray-300">
                    Please amend any personal details that have changed, as
                    appropriate.
                </p>
                <p class="my-4 text-sm text-gray-300">
                    Please note that a change of email address will, for
                    security reasons, entail sending a new verification email which will need to actioned
                    in order to gain full access to the account.
                </p>
                <p class="my-4 text-sm text-gray-300">
                    Once the email has been verified, then please sign back in
                    using the <strong>new email</strong> and your <strong>current password</strong>.
                </p>
            </div>
            <BaseSpinner
                  v-if="flgIsLoading"
                  action="Loading - please wait"
                  class="text-teal-300"
            >
            </BaseSpinner>
            <div>
                <div class="container mx-auto">
                    <div class="mt-6 grid grid-cols-3 gap-y-6 gap-x-4">
                        <div class="md:col-span-1 col-span-3">
                            <BaseInput
                                  v-model="first_name"
                                  type="string"
                                  :required="true"
                                  placeholder="first name"
                                  autocomplete="first name"
                                  label=" First Name"
                                  name="first_name"
                                  :error="errors.first_name"
                                  :label-class="'block text-md text-gray-300'"
                            >
                            </BaseInput>
                        </div>

                        <div class="md:col-span-1 col-span-3">
                            <BaseInput
                                  v-model="last_name"
                                  type="string"
                                  :required="true"
                                  placeholder="last name"
                                  autocomplete="last name"
                                  label="Last Name"
                                  name="last_name"
                                  :error="errors.last_name"
                                  :label-class="'block text-md text-gray-300'"
                            >
                            </BaseInput>
                        </div>
                        <div class="md:col-span-1 col-span-3">
                            <BaseInput
                                  v-model="email"
                                  type="email"
                                  :required="true"
                                  placeholder="email address"
                                  autocomplete="email"
                                  label="Email Address"
                                  name="email_address"
                                  :error="errors.email"
                                  :label-class="'block text-md text-gray-300'"
                            >
                            </BaseInput>
                        </div>
                    </div>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">

                    </div>

                </div>
                <div class="container mx-auto">
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                        <div class="mr-2">
                            <BaseButton
                                  v-if="isDirty"
                                  title="Save"
                                  :submitting="isSubmitting"
                                  :disabled="isSubmitting"
                            >
                            </BaseButton>
                        </div>
                        <div>
                            <BaseButton
                                  v-if="isDirty && !isSubmitting"
                                  title="Cancel"
                                  :submitting="isSubmitting"
                                  :disabled="isSubmitting"
                                  @click="onCancel"
                            >
                            </BaseButton>
                        </div>
                    </div>
                </div>
                <div v-if="updateMessages && !isDirty" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                    <BaseInformationMessage>
                        {{ updateMessages }}
                    </BaseInformationMessage>
                </div>
            </div>
            <div v-if="errorMessage.title" class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseErrorMessage
                      v-if="errorMessage.title"
                      :error-description=errorMessage.description
                      :error-title=errorMessage.title>
                </BaseErrorMessage>
            </div>


        </div>
    </form>
</template>

<script setup>
/* Overview
-------------------------------------------------------------------------------
The AddressInformation component manages
- the presentation of the user address details via the AddressCard components
- the addition of new addresses for a user
- changing a user's address details
-------------------------------------------------------------------------------*/

/* Imports
-------------------------------------------------------------------------------*/
/* Vue
*/
import {ref,reactive} from "vue";
/* Vue Router
 */
import {useRoute} from "vue-router";
/* Components
*/
import BaseButton from "../ui/BaseButton.vue"
import BaseInput from "../ui/BaseInput.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../ui/BaseInformationMessage.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
/* Services
load the User store to save any pre-existing addresses
load the Auth store as we need to retrieve the User ID of the current user
*/
import useAuthService from "../../services/useAuthService";
import useUserService from "../../services/useUserService.js";
/* Stores
load the User store to save any pre-existing addresses
load the Auth store as we need to retrieve the User ID of the current user
 */
import {useAuthStore} from "../../stores/AuthStore";
import {useUserStore} from "../../stores/UserStore.js";
/* API
load the getUserAddresses service to retrieve any existing user addresses
 */
/* vee-validate
load the getUserAddresses service to retrieve any existing user addresses
 */
import {useField, useForm, useIsFormDirty, useIsFieldDirty} from 'vee-validate'
import {object, string} from 'yup'
/* Others
 */
import useErrorService from "../../services/useErrorService.js";
import router from "../../router/index.js";
import {testIfPromise} from "../../utils/GeneralUtilities.js";

const {errorMessageHandler} = useErrorService()
/*-------------------------------------------------------------------------------*/
/* Emits
------------------------------------------------------------------------------- */
const emit = defineEmits(['userNotFound'])
/*-------------------------------------------------------------------------------*/

/* Variable Declaration and Initialisation
------------------------------------------------------------------------------- */

const route = useRoute();


const updateMessages = ref('')
const {updateCurrentAuthenticatedUser} = useAuthService()
const {updateUserProfile, createUserProfile} = useUserService()
const authStore = useAuthStore()
const userStore = useUserStore()
let errorMessage = reactive({})
let flgIsLoading = ref(false)
let addingNewUser = false

const userID = route.params.userID
//console.log(userID)
if (userID === "new") {
    addingNewUser = true
}

/* vee-validate form values */
const formValues = {
    first_name: userStore.user.first_name,
    last_name: userStore.user.last_name,
    email: userStore.user.email
}
/* vee-validate schema */
const validationSchema = object({
    first_name: string().required('Please enter your first name'),
    last_name: string().required('Please enter your last name'),
    email: string().email('Invalid email format').required('An email address is required'),
})
/* Implement the schema and initialise the fields  */
const {handleSubmit, isSubmitting, setErrors, errors, resetForm} = useForm({
    validationSchema,
    initialValues: formValues
})
/* Track whether the form is dirty and specifically, whether the email field is dirty  */
const isDirty = useIsFormDirty()
const isEmailDirty = useIsFieldDirty('email')
/* map the fields in vee-validate  */
let {value: first_name, handleChange} = useField('first_name')
let {value: last_name} = useField('last_name')
let {value: email} = useField('email')


/*-------------------------------------------------------------------------------*/
/* Functions
------------------------------------------------------------------------------- */
/*  handleSubmit
We have submitted a change to the user profile information so update the fields
as appropriate
 */
/*-------------------------------------------------------------------------------*/
//const {testIfPromise} = generalUtilities()
const onSubmit = handleSubmit(async (values, {resetForm}) => {
    //console.log("submitted")
    /*
    attempt to update the user
    if successful
        the update user process will change the relevant details for the user in the back end
        it will also populate the authStore with the new user details
        if the user's email has been changed the back end will send a verification email
    otherwise
        output the error to the user
    */
    try {
        if (Number(userID) === Number(authStore.user.id)) {
            //console.log("updating self")
            await updateCurrentAuthenticatedUser(values)
            userStore.user = authStore.user
        } else {
            if (addingNewUser === true) {
                await createUserProfile(values)
            } else {
                await updateUserProfile(values, userID)
            }
        }
        //flgIsSubmitting.value = false
        updateMessages.value = 'Congratulations, your changes have been saved.'
        if (isEmailDirty.value === true) {
            updateMessages.value += ' We have sent you a verification mail to your new email address.'
            updateMessages.value += ' When you next log in please use your new email address and your existing password.'
            updateMessages.value += ' You will need to have verified your new email to regain full access to your account.'
        }
        //await getUserToBeEdited(userID)
        resetForm({
            values: {
                first_name: userStore.user.first_name,
                last_name: userStore.user.last_name,
                email: userStore.user.email
            },
        })
    } catch (e) {
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
                errorMessage.title = value.title
                errorMessage.description = value.description
                //error.description=e
            })
        } else {
            errorMessage.value = await errorMessageHandler(e)
        }
    }
    return {
        onSubmit,
        first_name,
        last_name,
        email,
        handleChange,
        errors
    }
})



const onCancel = () => {
    resetForm()
    updateMessages.value = ''
}
/*-------------------------------------------------------------------------------*/
/* Lifecycle Hooks
---------------------------------------------------------------------------------*/


</script>


<style scoped>

</style>