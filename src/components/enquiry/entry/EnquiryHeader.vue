<template>
    <div v-if="isLoading">
        <span>
            <BaseSpinner
                  class="text-teal-300"
                  action="Loading - please wait"
            >
            </BaseSpinner>
        </span>
    </div>

    <form
          novalidate
          v-if="!isLoading && !errorMessage.title"
          class=""
    >
        <div class="">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-medium text-teal-600">{{ props.title }}</h3>
            </div>
        </div>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-y-6 sm:gap-x-8">
            <div class="lg:col-span-1 md:col-span-2 sm:col-span-3">
                <BaseInput
                      v-model="first_name"
                      type="string"
                      :required="true"
                      :disabled="props.disabled"
                      placeholder="first name"
                      autocomplete="first name"
                      label="First Name"
                      name="first_name"
                      :error="errors.first_name"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
            <div class="lg:col-span-1 md:col-span-2 sm:col-span-3">
                <BaseInput
                      v-model="last_name"
                      type="string"
                      :required="true"
                      :disabled="props.disabled"
                      placeholder="last name"
                      autocomplete="last name"
                      label="Last Name"
                      name="last_name"
                      :error="errors.last_name"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
            <div class="grid lg:col-span-2 md:col-span-4">
                <BaseInput
                      v-model="email"
                      type="email"
                      :required="true"
                      :disabled="props.disabled"
                      placeholder="email"
                      autocomplete="email"
                      label="Email"
                      name="email"
                      :error="errors.email"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
        </div>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-y-6 sm:gap-x-8">
            <div class="lg:col-span-2 md:col-span-2">
                {{ errors.phone_number }}
                <BaseInput
                      v-model="phone_number"
                      type="string"
                      :required="true"
                      :disabled="props.disabled"
                      placeholder="Phone Number"
                      autocomplete="phone"
                      label="Phone"
                      name="phone_number"
                      :error="errors.phone_number"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
            <div class="lg:col-span-1 md:col-span-1">
                <BaseSelect
                      v-model="country"
                      label="Country"
                      placeholder="Country"
                      :required="true"
                      :disabled="props.disabled"
                      :options="countries"
                      :error="errors.country"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseSelect>
            </div>
            <div class="lg:col-span-1">
                <BaseInput
                      v-model="international_dialling_code"
                      type="string"
                      placeholder="Dialling Code"
                      autocomplete="Phone Number"
                      label="Code"
                      name="international_dialling_code"
                      :error="errors.international_dialling_code"
                      :disabled="true"
                      :label-class="'block text-md text-gray-300'"
                      :input-class="'block w-full rounded-md  py-2 px-4  font-medium text-white'"
                >

                </BaseInput>
            </div>
            <div class="lg:col-span-1 md:col-span-2">
                <BaseSelect
                      v-model="phone_type"
                      label="Phone Type"
                      :options="phone_types"
                      :required="true"
                      :disabled="props.disabled"
                      :error="errors.phone_type"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseSelect>
            </div>
        </div>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-y-6 sm:gap-x-8">
            <div class="col-span-3">
                <BaseSelect
                      v-model="enquiry_type"
                      label="Enquiry Type"
                      value="'undefined'"
                      :prompt-option="'Please Select Your Enquiry Type'"
                      :options="enquiry_types"
                      :required="true"
                      :disabled="props.disabled"
                      :error="errors.enquiry_type"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseSelect>
            </div>
        </div>
    </form>
    <div class="mt-6">
        {{ errorMessage }}
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
Captures the header information for the enquiry
- name
- contact details
- enquiry type
----------------------------------------------------------------------------*/
/*
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import {reactive, ref, watch} from 'vue'
/* Vue Router */
/* Components  */
import BaseInput from "../../ui/BaseInput.vue";
import BaseSelect from "../../ui/BaseSelect.vue";
import BaseErrorMessage from "../../ui/BaseErrorMessage.vue";
import BaseSpinner from "../../ui/BaseSpinner.vue";

/* Stores */
/* Services */
import useMiscService from "../../../services/misc/useMiscService.js";
import useErrorService from "../../../services/useErrorService.js";

/* Validation */
import {useField, useForm} from 'vee-validate'
import {object, string} from 'yup'
import {isValidPhoneNumber, isSupportedCountry} from 'libphonenumber-js/max'
import parseMax from 'libphonenumber-js/max'


/*
-------------------------------------------------------------------------------
Props
------------------------------------------------------------------------------- */
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "Enquirer Details"
    }
})
/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */
/* services */
const {getCountries, getEnquiryTypes, getPhoneTypes} = useMiscService()
const {errorMessageHandler,handleHttpError} = useErrorService()

/* refs */
let errorMessage = ref({})
let enquiryTypesFull = ref([])
const enquiry_types = ref([])
let countriesFull = ref([])
let countries = ref([])
let enquiry_type_id = ref([])
let country_id = ref('')
let phone_type_id = ref('')
let phone_types = ref([])
let ISO_country_code = ref("")
let isLoading = ref(true)

let formValues = {
    country: "UK",
    international_dialling_code: "44"
}
ISO_country_code.value = "GB"

/* vee-validate schema */
const validationSchema = object({
    first_name: string().required('Please enter your first name'),
    last_name: string().required('Please enter your last name'),
    email: string().email('Invalid email format').required('An email address is required'),
    phone_number: string().required('A phone number is required'),
    phone_type: string().required('Please select a phone type'),
    country: string().required('Please select a country'),
    international_dialling_code: string().required('Country code required'),
    enquiry_type: string().required('Please select an enquiry type')
})

const {validate, errors, setFieldError} = useForm({
    validationSchema,
    initialValues: formValues
})
/*
-------------------------------------------------------------------------------
Initialisation
-------------------------------------------------------------------------------*/
let {value: first_name} = useField('first_name')
let {value: last_name} = useField('last_name')
let {value: email} = useField('email')
let {value: phone_number} = useField('phone_number')
let {value: country} = useField('country')
let {value: international_dialling_code} = useField('international_dialling_code')
let {value: phone_type} = useField('phone_type')
let {value: enquiry_type} = useField('enquiry_type')
/*
explicitly expose the vaildateForm function so that it can be called by the parent component
 */
defineExpose({
    validateForm,
    enquiry_type
})
/*
populate the enquiry type options for the drop down
 */
initialiseForm()
const emit = defineEmits(['change-enquiry-type'])
watch(enquiry_type, (newValue) => {
    emit('change-enquiry-type', newValue)
})
watch(country, (countryValue) => {
    for (const [key, value] of Object.entries(countriesFull.value)) {
        if (countryValue === value.country) {
            international_dialling_code.value = value.international_dialling_code
            ISO_country_code.value = value.ISO_country_code
        }
    }
})

/*
-------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
async function validateForm() {
    /*
    let vee-validate validate form first
     */
    let {valid} = await validate()
    /*
    test the phone number
     */
    let fullNumber = ('+' + String(international_dialling_code.value) + String(phone_number.value))
    const phoneValidation = validatePhoneNumber(fullNumber, country.value, ISO_country_code.value, phone_type.value)
    //console.log(phoneValidation.status)
    if (phoneValidation.status !== true) {
        //console.log("found an error " + phoneValidation.errorMessage)
        setFieldError('phone_number', phoneValidation.errorMessage)
        valid = false
    }
    if (valid) {
        /*
        Pull out the country and phone type ids to be stored
        */
        for (const [key, value] of Object.entries(countriesFull.value)) {
            //console.log(value.country + " " + country.value)
            if (value.country === country.value) {
                country_id.value = (value.id)
            }
        }
        for (const [key, value] of Object.entries(enquiryTypesFull.value)) {
            if (value.enquiry_type === enquiry_type.value) {
                enquiry_type_id.value = (value.id)
            }
        }
        for (const [key, value] of Object.entries(phone_types.value)) {
            if (value === phone_type.value) {
                phone_type_id.value = (key)
            }
        }
        formValues.first_name = first_name.value
        formValues.last_name = last_name.value
        formValues.email = email.value
        formValues.phone_number = phone_number.value
        formValues.country = country.value
        formValues.international_dialling_code = international_dialling_code.value
        formValues.phone_type = phone_type.value
        formValues.enquiry_type = enquiry_type.value
        formValues.country_id = country_id.value
        formValues.phone_type_id = phone_type_id.value
        formValues.enquiry_type_id = enquiry_type_id.value
    } else {
        //console.log("Header failed")
    }
    return {
        valid,
        formValues
    }


}

async function initialiseForm() {
    /*
    enquiry types
     */
    let i = 0
    try {
        enquiryTypesFull.value = await getEnquiryTypes()
        for (i = 0; i < enquiryTypesFull.value.length; i++) {
            enquiry_types.value.push(enquiryTypesFull.value[i].enquiry_type)
        }
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage.value.status)
        //if(errorMessage.value.status==='500'){
        //    console.log("caught it")
        //    await handleHttpError(errorMessage.value.status,errorMessage.value.title,errorMessage.value.description)
        //}
        //console.log(errorMessage)
        //console.log(errorMessage.value.title)
    }
    /*
    countries and dialling codes
     */
    try {
        countriesFull.value = await getCountries()
        for (i = 0; i < countriesFull.value.length; i++) {
            countries.value.push(countriesFull.value[i].country)
        }
    } catch (e) {
        //console.log(e)
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage)
        //console.log(errorMessage.value.title)
    }
    /*
    phone types
     */
    try {
        phone_types.value = await getPhoneTypes()
    } catch (e) {
        errorMessage.value = await errorMessageHandler(e)
        //console.log(errorMessage)
        //console.log(errorMessage.value.title)
    }

    isLoading.value = false
    return {
        countriesFull
    }
}

const validatePhoneNumber = (phoneNumber, country, ISOCountryCode, phoneType) => {
    let validationResult = {}
    //console.log(phoneNumber + " " + country + " " + ISOCountryCode + " " + phoneType)
    //console.log(ISOCountryCode)
    if (isSupportedCountry(ISOCountryCode)) {
        //console.log("supported")
        if (isValidPhoneNumber(phoneNumber)) {
            //console.log("valid")
            if (phoneType === "Mobile") {
                if (parseMax(phoneNumber).getType() === "MOBILE") {
                    //console.log(parseMax(phoneNumber).getType())
                    validationResult.status = true
                } else {
                    validationResult.status = false
                    validationResult.errorMessage = "The phone number does not appear to be a Mobile phone"
                }
            } else {
                validationResult.status = true
            }
        } else {
            validationResult.status = false
            validationResult.errorMessage = "The phone number does not appear to be valid"
        }
    } else {
        validationResult.status = true
        validationResult.warningMessage = "The country code " + country + " is not supported so we cannot validate the number"
    }
    //console.log(validationResult)
    return validationResult
}
</script>

<style scoped>

</style>