<template>
    <div class="bg-black min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-24 w-auto w-24 rounded-full border-cyan-600 border-solid border-2 bg-gray-100"
                 src="/images/agcplogotrsp150x150.png"
                 alt="Agapanthus Consulting"/>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-cyan-600">Agapanthus Consulting</h1>
            <h2 class="mt-6 text-center text-2xl font-extrabold text-cyan-500">Verify your account</h2>
            <div class="mt-2 text-center text-sm text-gray-300">
                <p class="m-4">Please use the link in the Verification Email sent to your registered email address in order to gain full access to your account.</p>
                <p class="m-4">If you cannot find your Verification Email please request another one by clicking on the button below.</p>
            </div>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form novalidate v-on:submit.prevent="onSubmit" class="space-y-6">
                    <div>
                        <BaseButton
                              title="Request A New Verification Email"
                              :submitting="flgIsSubmitting"
                              :disabled="flgIsSubmitting"
                        />
                    </div>
                    <BaseErrorMessage
                          v-if="errorMessage.title"
                          :error-description=errorMessage.description
                          :error-title=errorMessage.title>
                    </BaseErrorMessage>
                    <BaseInformationMessage
                          v-if="verifyMessage"
                          :title="verifyMessage.title"
                          :description="verifyMessage.description"
                    >
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
import {ref,reactive} from 'vue'
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseInformationMessage from "../ui/BaseInformationMessage.vue";
import BaseButton from "../ui/BaseButton.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useAuthService from "../../services/useAuthService"
import useErrorService from "../../services/useErrorService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {useAuthStore} from "../../stores/AuthStore";
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
const {user} = useAuthStore()
const {sendVerificationEmail} = useAuthService()
const {errorMessageHandler}=useErrorService()
const verifyMessage = reactive({})
const flgIsSubmitting=ref(false)
const errorMessage=reactive({})
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
const onSubmit = async () => {
    flgIsSubmitting.value=true
    try {
        await sendVerificationEmail(user.id)
        verifyMessage.title = 'Success'
        verifyMessage.description = 'We have sent a verification email to your email address. ' +
              'Once verified, you will be able to sign into your account.'
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
    }
    flgIsSubmitting.value=false
}
</script>

<style scoped>

</style>