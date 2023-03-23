<template>
    <BaseSpinner
          v-if="isLoading"
          action="Loading - please wait"
          class="text-teal-300"
    >
    </BaseSpinner>
    <div v-if="!isLoading  && processForm" class="rounded border border-grey p-2">
        <form novalidate class="space-y-6 " @submit="onSubmit">
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-2">
                    <BaseSelect
                          v-model="phone_type"
                          label="Number Type"
                          :options="phone_types"
                          :required="true"
                          :error="errors.phone_type"
                          :label-class="'block text-sm text-gray-300'"
                    >
                    </BaseSelect>
                </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                <div class="sm:col-span-3">
                    <BaseInput
                          v-model="phone_number"
                          type="string"
                          :required="true"
                          placeholder="Phone Number"
                          autocomplete="Phone Number"
                          label="Phone Number"
                          name="phone_number"
                          :error="errors.phone_number"
                          :label-class="'block text-sm text-gray-300'"
                    >
                    </BaseInput>
                </div>
                <div class="sm:col-span-2">
                    <BaseSelect
                          v-model="country"
                          label="Country"
                          :required="true"
                          :options="countries"
                          :error="errors.country"
                          :label-class="'block text-sm text-gray-300'"
                    >
                    </BaseSelect>
                </div>
                <div class="sm:col-span-1">
                    <BaseInput
                          v-model="international_dialling_code"
                          type="string"
                          :required="true"
                          placeholder="Code"
                          autocomplete="Phone Number"
                          label="Code"
                          name="international_dialling_code"
                          :error="errors.international_dialling_code"
                          :label-class="'block text-sm text-gray-300'"
                        :disabled="true">
                    </BaseInput>
                </div>
            </div>
            <div class="sm:col-span-3">
                <BaseCheckbox
                      v-model="preferred_contact_number"
                      label="Preferred contact number"
                      label-description="We will use this as your main contact number"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-2 flex items-center flex-wrap sm:flex-nowrap">
                <div class="mr-2">
                    <BaseButton
                          v-if="isDirty"
                          title="Save"
                          :submitting="flgIsSubmitting"
                          :disabled="flgIsSubmitting"
                    />
                </div>
                <div class="mr-2">
                    <BaseButton
                          title="Cancel"
                          :disabled="flgIsSubmitting"
                          @click="onCancel"
                    />
                </div>
            </div>
            <div class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseInformationMessage v-if="updateMessages && !isDirty">
                    {{ updateMessages }}
                </BaseInformationMessage>
            </div>
            <div class="mt-6 lg:col-span-1 md:col-span-1 sm:col-span-4">
                <BaseErrorMessage
                      v-if="errorMessage.title"
                      :error-description=errorMessage.description
                      :error-title=errorMessage.title>
                </BaseErrorMessage>
            </div>
        </form>
        <BaseSpinner
              v-if="flgIsSaving"
              :action="'Saving - please wait'"
              class="text-teal-300"
        />
    </div>
</template>

<script setup>
/* ----------------------------------------------------------------------------
Overview

The PhoneForm component manages
- the addition or change of a user's phone details
-------------------------------------------------------------------------------
/*------------------------------------------------------------------------------
Imports
------------------------------------------------------------------------------*/
/*
Vue
*/
import {onBeforeMount, reactive, ref, watch} from 'vue'
/*
Stores
*/

/*
Validation
*/
import {useField, useForm, useIsFormDirty} from 'vee-validate'
import {boolean, object, string} from 'yup'
/*
Base Components
*/
import BaseSelect from "../ui/BaseSelect.vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseInformationMessage from "../ui/BaseInformationMessage.vue";
import BaseErrorMessage from "../ui/BaseErrorMessage.vue";
import BaseCheckbox from "../ui/BaseCheckbox.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
/*
API
*/
import useMiscService from "../../services/misc/useMiscService.js";
import useUserService from "../../services/useUserService.js";
import useErrorService from "../../services/useErrorService.js";
//import {isValidPhoneNumber} from "libphonenumber-js";
import {isValidPhoneNumber,isSupportedCountry} from 'libphonenumber-js/max'
import parseMax from 'libphonenumber-js/max'
/*------------------------------------------------------------------------------
Props
------------------------------------------------------------------------------*/
/*
If we are adding a phone
    the userPhone prop will be null
otherwise
    it will contain the set of phone details to be changed
 */
const props = defineProps({
    userPhone: {},
    userID: String
})
/*-----------------------------------------------------------------------------
Emits
cancelled - announces that the action was cancelled
updated - announces that a user was
-------------------------------------------------------------------------------*/
const emit = defineEmits(['refresh', 'cancelled', 'updated'])
/*-----------------------------------------------------------------------------
Variable Declaration and Initialisation
-------------------------------------------------------------------------------*/
/*
Services
*/

/*
Refs
*/
const updateMessages = ref('')
let countries = ref([])
let phone_types = ref([])
let isLoading = ref(true)
let flgIsSaving=ref(false)
const processForm = ref(true)
const errorMessage = reactive({})
//const international_dialling_code=ref('')
let countriesFull=ref([])
let ISO_country_code=ref("")
/*
default changeMode to false
if we have a userPhone prop
    we are changing an existing phone so set changeMode to true
 */
let changeMode = false
if (props.userPhone != null) {
    changeMode = true
}
/*
Initialise the userID we are dealing with
TODO
we should accept this as a prop to make the component reusable
*/

/*
Set up the default entries for the form fields and
other items assuming we have entered the form to add an
address.
If, however, we have been passed a user address as a prop then we
are going to change an existing address so default the form fields
to their corresponding prop values
*/
let formValues;
let preferredContactNumberBoolean = false

if (changeMode === true) {
    if (props.userPhone.value.preferred_contact_number === 1) {
        preferredContactNumberBoolean = true
    }
    formValues = {
        phone_type: props.userPhone.value.phone_type,
        phone_number: props.userPhone.value.phone_number,
        country: props.userPhone.value.country,
        preferred_contact_number: preferredContactNumberBoolean,
        international_dialling_code:props.userPhone.value.international_dialling_code,
        international_dialling_code_formatted:props.userPhone.value.international_dialling_code_formatted
    }
} else {
    formValues = {
        phone_type: "",
        phone_number: "",
        preferred_contact_number: false,
        country: "UK",
        international_dialling_code:"44"
    };
}
ISO_country_code.value="GB"

/*
Define the validation schema
*/
const validationSchema = object({
    phone_type: string().required('Please select a phone type'),
    phone_number: string().required('Please enter your phone number'),
    country: string().required('Please select a country'),
    international_dialling_code: string().required('Country code required'),
    preferred_contact_number: boolean(),
})

/*
Implement the schema and initialise the fields
 */
const {handleSubmit, flgIsSubmitting, errors,setFieldError} = useForm({
    validationSchema,
    initialValues: formValues
})
/*
Track whether the form is dirty
 */
const isDirty = useIsFormDirty()

/*
map the fields in vee-validate
*/
let {value: phone_type} = useField('phone_type')
let {value: phone_number, handleChange} = useField('phone_number')
let {value: country} = useField('country')
let {value: preferred_contact_number} = useField('preferred_contact_number')
let {value: international_dialling_code} = useField('international_dialling_code')

watch(country, (countryValue)=>{
    for (const [key, value] of Object.entries(countriesFull.value)) {
        if (countryValue === value.country) {
            //console.log(value)
            international_dialling_code.value = value.international_dialling_code
            ISO_country_code.value=value.ISO_country_code
        }
    }
})
/*-----------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
const {getCountries} = useMiscService()
const {getAvailablePhoneTypes} = useUserService()
const {getPhoneTypes} = useMiscService()
const {updateUserPhone, addUserPhone} = useUserService()
const {errorMessageHandler} = useErrorService()
/*
Handle the form submission
 */
const onSubmit = handleSubmit(async (values) => {

    let fullNumber=('+' + String(international_dialling_code.value) + String(phone_number.value))
    const phoneValidation=validatePhoneNumber(fullNumber,country.value,ISO_country_code.value, phone_type.value)
    //console.log(phoneValidation.status)
    if(phoneValidation.status===true){
        if(phoneValidation.warningMessage!==""){
            updateMessages.value=phoneValidation.warningMessage
        }
    }else{
        //console.log("found an error " + phoneValidation.errorMessage)
        setFieldError('phone_number',phoneValidation.errorMessage)
           //useField('phone-number').setErrors(phoneValidation.errorMessage)
        return
    }
    /*
    Pull out the country and phone type ids to be stored
     */
    for (const [key, value] of Object.entries(countriesFull.value)) {
        if (value.country === country.value) {
            values.country_id = (value.id)

        }
    }
    for (const [key, value] of Object.entries(phone_types.value)) {
        if (value === phone_type.value) {
            values.phone_type_id = (key)
        }
    }
    //console.log(values.country_id)
    //console.log(values.phone_type_id)
    /*
    If we are changing an existing record
        update the phone details
    Otherwise
        add a new phone
     */
    flgIsSaving.value=true
    if (changeMode === true) {
        try {
            await updateUserPhone(values, props.userID, props.userPhone.value.id)
            emit('updated')
        } catch (e) {
            errorMessage.value = await errorMessageHandler(e)
            processForm.value = false
        }
    } else {

        try {
            console.log("adding phone " + values)
            await addUserPhone(values, props.userID)
            emit('refresh')

        } catch (e) {
            console.log("broke")
            errorMessage.value = await errorMessageHandler(e)
        }
    }
    flgIsSaving.value=true

    return {
        onSubmit,
        phone_type,
        phone_number,
        country,
        preferred_contact_number,
        handleChange,
        errors
    }
})
const validatePhoneNumber=(phoneNumber, country,ISOCountryCode,phoneType)=> {
    let validationResult={}
    //console.log(phoneNumber + " " + country + " " + ISOCountryCode + " " + phoneType)
    if(isSupportedCountry(ISOCountryCode)){
        //console.log("supported")
        if(isValidPhoneNumber(phoneNumber)){
            //console.log("valid")
            if(phoneType==="Mobile"){
                if(parseMax(phoneNumber).getType()==="MOBILE"){
                    //console.log("mobile")
                    validationResult.status=true
                }else{
                    validationResult.status=false
                    validationResult.errorMessage="The phone number does not appear to be a Mobile phone"
                }
            }else{
                validationResult.status=true
            }
        }else{
            validationResult.status=false
            validationResult.errorMessage="The phone number does not appear to be valid"
        }
    }else{
        validationResult.status=true
        validationResult.warningMessage="The country code " + country + " is not supported so we cannot validate the number"
    }
    return validationResult

}
/*
Announce to the parent that the user cancelled the edit
 */
const onCancel = () => {
    emit('cancelled')
}

/*
Initialise the countries and phone type variables
 */
onBeforeMount(async () => {
    try {
        countriesFull.value = await getCountries()
        //console.log(countriesFull.value)
        for (var i = 0; i < countriesFull.value.length; i++) {
            countries.value.push(countriesFull.value[i].country)
        }
    } catch (e) {
        //console.log(e)
        errorMessage.value = await errorMessageHandler(e)
        processForm.value = false
    }
    if (changeMode === true) {
        try {
            phone_types.value = await getPhoneTypes()
        } catch (e) {
            errorMessage.value = await errorMessageHandler(e)
            processForm.value = false
        }
    } else {
        try {
            phone_types.value = await getAvailablePhoneTypes(props.userID)
        } catch (e) {
            errorMessage.value = await errorMessageHandler(e)
            processForm.value = false
        }
    }
    isLoading.value = false
    return{
        countriesFull
    }
})
</script>

<style scoped>

</style>