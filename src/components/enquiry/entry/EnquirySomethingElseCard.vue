<script setup lang="ts">
/* 
-------------------------------------------------------------------------------
Imports
-----------------------------------------------------------------------------*/
/* Vue  */
import {ref,watch} from 'vue'
/* Components */
import BaseTextarea from "../../ui/BaseTextarea.vue";
/* Validation */
import {FieldContext, useField, useForm} from 'vee-validate'
import {object, string} from 'yup'

/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */
/* refs */
const enquiryCharLimit=ref(255)
const enquiryCharCount=ref(0)

let formValues={
    enquiry : "",
}
/* vee-validate schema */
const validationSchema = object({
    enquiry: string().required('Please state what your enquiry is about.'),
})
const {validate, errors} = useForm({
    validationSchema
})
let {value: enquiry}:FieldContext<string> = useField('enquiry')
/*
explicitly expose the vaildateForm function so that it can be called by the parent component
 */
defineExpose({
    validateForm,
})
watch(enquiry,()=>{
    enquiryCharCount.value=enquiry.value.length
})
/*
-------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------*/
async function validateForm() {

    const {valid} = await validate()
    //console.dir(valid)
    //console.dir(errors)
    if(valid){
        formValues.enquiry=enquiry.value
    }else{
        //console.log("Something Else failed")
    }
    return {
        valid,
        formValues
    }
}
</script>
<template>
    <form
          novalidate class="bg-black col-span-2 mt-2">
        <div class="mt-2  ">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-medium text-teal-600">Something Else</h3>
            </div>
        </div>
        <p class="mt-8 text-md text-gray-300">
            Please enter your enquiry below.
        </p>

        <div class="mt-4">
            <BaseTextarea
                  v-model="enquiry"
                  label="Enquiry"
                  name="enquiry"
                  placeholder="How can we help?"
                  :required="true"
                  :rows="4"
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