<template>
    <form
          novalidate class="bg-black col-span-2 mt-2">
        <div class="mt-2">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-medium text-teal-600">Website Maintenance</h3>
            </div>
        </div>
        <p class="mt-8 text-md text-gray-300">
            Which business are you looking for maintenance for?
        </p>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-x-8">
            <div class="lg:col-span-2 md:col-span-1 sm:col-span-3">
                <BaseInput
                      v-model="business_name"
                      type="string"
                      :required="true"
                      placeholder="The business name being promoted?"
                      autocomplete="business name"
                      label="Business Name"
                      name="business_name"
                      :error="errors.business_name"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>

            <div class="lg:col-span-2 md:col-span-1 sm:col-span-3">
                <BaseInput
                      v-model="business_url"
                      type="string"
                      :required="true"
                      placeholder="The URL for the existing website?"
                      autocomplete="business URL"
                      label="Business URL"
                      name="business_url"
                      :error="errors.business_url"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
        </div>
        <p class="mt-12 text-md text-gray-300">
            What type of maintenance offering do you think would be of most interest to you?
        </p>

        <div class="grid md:grid-cols-4 sm:grid-cols-2">
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="bare_bones_chk"
                      :label="'Bare bones maintenance'"
                      :label-description="'Minimal maintenance to keep website live. Any project work charged on a time and materials basis.'"
                      :model-value="bare_bones_chk"
                      :name="'bare_bones_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="maintenance_plus_chk"
                      :label="'Maintenance plus'"
                      :label-description="'Maintain software to current versions with in-built monthly allowance for one day of project work at discounted man hour rate'"
                      :model-value="maintenance_plus_chk"
                      :name="'maintenance_plus_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
        </div>
        <div class="mt-4">
            <BaseTextarea
                  v-model="enquiry"
                  label="Maintenance Requirement"
                  name="enquiry"
                  placeholder="What do you want your maintenance contract to cover?"
                  :required="true"
                  :rows="8"
                  :character-limit="enquiryCharLimit"
                  :character-count="enquiryCharCount"
                  :error="errors.enquiry"
                  :label-class="'block text-md text-gray-300'"
            >
            </BaseTextarea>
        </div>

        <div class="mt-6 col-span-2 ">

        </div>
    </form>


</template>

<script setup>
/* 
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import {ref, watch} from 'vue'
/* Components */
import BaseTextarea from "../../ui/BaseTextarea.vue";
import BaseCheckbox from "../../ui/BaseCheckbox.vue";
import BaseInput from "../../ui/BaseInput.vue";
/* Validation */
import {useField, useForm} from 'vee-validate'
import {object, string} from 'yup'
/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */
/* refs */
const bare_bones_chk = ref(false)
const maintenance_plus_chk = ref(false)

const enquiryCharLimit = ref(512)
const enquiryCharCount = ref(0)


let formValues = {}

/* vee-validate schema */
const validationSchema = object({
    business_name: string().required('Please enter the business or enterprise name'),
    business_url: string().required('Please enter the business or enterprise URL'),
    enquiry: string().required('Please provide some indication of the scope of maintenance required?'),
})
const {validate, errors} = useForm({
    validationSchema
})
let {value: business_name} = useField('business_name')
let {value: business_url} = useField('business_url')
let {value: enquiry} = useField('enquiry')

/*
explicitly expose the vaildateForm function so that it can be called by the parent component
 */
defineExpose({
    validateForm,
})
watch(enquiry, () => {
    enquiryCharCount.value = enquiry.value.length
})

/*
-------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
async function validateForm() {

    const {valid} = await validate()
    //console.dir(valid)
    //console.dir(errors)
    if (valid) {
        formValues.bare_bones_chk = bare_bones_chk.value
        formValues.maintenance_plus_chk = maintenance_plus_chk.value
        formValues.business_name = business_name.value
        formValues.business_url = business_url.value
        formValues.enquiry = enquiry.value
    }else{
        //console.log("Maintenance failed")
    }
    return {
        valid,
        formValues
    }
}
</script>

<style scoped>

</style>