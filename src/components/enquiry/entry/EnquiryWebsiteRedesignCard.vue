<script setup lang="ts">
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
import {FieldContext, useField, useForm} from 'vee-validate'
import {object, string} from 'yup'
/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */
/* refs */

/*
character size limits and counts for textareas
 */
const enquiryCharCount = ref(0)
const enquiryCharLimit = ref(512)

let formValues = {
    marketing_chk: false,
    ecommerce_chk: false,
    blog_chk: false,
    portfolio_chk: false,
    membership_chk: false,
    personal_chk: false,
    nonprofit_chk: false,
    enquiry: "",
    business_url: "",
    business_name: "",
}

/* vee-validate schema */
const validationSchema = object({
    business_name: string().required('Please enter the business or enterprise name'),
    business_url: string().required('Please enter the business or enterprise URL'),
    enquiry: string().required('Please enter your enquiry details.'),
})
const {validate, errors} = useForm({
    validationSchema
})
let {value: business_name}:FieldContext<string> = useField('business_name')
let {value: business_url}:FieldContext<string> = useField('business_url')
let {value: enquiry}:FieldContext<string> = useField('enquiry')
let {value: marketing_chk}:FieldContext<boolean> = useField('marketing_chk')
let {value: ecommerce_chk}:FieldContext<boolean> = useField('ecommerce_chk')
let {value: blog_chk}:FieldContext<boolean> = useField('blog_chk')
let {value: portfolio_chk}:FieldContext<boolean> = useField('portfolio_chk')
let {value: membership_chk}:FieldContext<boolean> = useField('membership_chk')
let {value: personal_chk}:FieldContext<boolean> = useField('personal_chk')
let {value: nonprofit_chk}:FieldContext<boolean> = useField('nonprofit_chk')
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
        formValues.business_name = business_name.value
        formValues.business_url = business_url.value
        formValues.marketing_chk = marketing_chk.value
        formValues.ecommerce_chk = ecommerce_chk.value
        formValues.blog_chk = blog_chk.value
        formValues.portfolio_chk = portfolio_chk.value
        formValues.membership_chk = membership_chk.value
        formValues.personal_chk = personal_chk.value
        formValues.nonprofit_chk = nonprofit_chk.value
        formValues.enquiry = enquiry.value
        //console.log(formValues)
    } else {
        //console.log("New site failed")
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
        <div class="mt-2">
            <div class="sm:flex-auto">
                <h3 class="text-lg font-medium text-teal-600">Website Redesign</h3>
            </div>
        </div>
        <p class="mt-8 text-md text-gray-300">
            Which website are you looking to redesign?
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
        <p class="mt-4 text-md text-gray-300">
            Which of the following features do you think would be needed in your redesigned website?
        </p>
        <p class="text-sm text-gray-300">
            (Select all that apply)
        </p>
        <div class="grid md:grid-cols-4 sm:grid-cols-2">
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="marketing_chk"
                      :label="'Marketing'"
                      :label-description="'Having a shop window for marketing your goods or services.'"
                      :model-value="marketing_chk"
                      :name="'marketing_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="ecommerce_chk"
                      :label="'Ecommerce'"
                      :label-description="'Selling goods or services directly from the site.'"
                      :model-value="ecommerce_chk"
                      :name="'ecommerce_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="blog_chk"
                      :label="'Blog'"
                      :label-description="'Blogging as a content marketing strategy to acquire leads via organic traffic and social shares.'"
                      :model-value="blog_chk"
                      :name="'blog_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4  mx-2 col-span-1">
                <BaseCheckbox
                      v-model="membership_chk"
                      :label="'Membership'"
                      :label-description="'Registered users can access exclusive content as part of building customer loyalty.'"
                      :model-value="membership_chk"
                      :name="'membership_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
        </div>
        <div class="grid md:grid-cols-4 sm:grid-cols-2">
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="portfolio_chk"
                      :label="'Portfolio'"
                      :label-description="'Consolidating and displaying examples of your creative work.'"
                      :model-value="portfolio_chk"
                      :name="'portfolio_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4  mx-2 col-span-1">
                <BaseCheckbox
                      v-model="personal_chk"
                      :label="'Personal'"
                      :label-description="'A website focused on building a personal brand.'"
                      :model-value="personal_chk"
                      :name="'personal_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="nonprofit_chk"
                      :label="'Non Profit'"
                      :label-description="'A website for a charity or other non-profit organisation.'"
                      :model-value="nonprofit_chk"
                      :name="'nonprofit_chk'"
                      :labelClass="'text-md text-gray-300'"
                      :labelDescriptionClass="'text-gray-400'"
                      :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
        </div>
        <div class="mt-8">
            <BaseTextarea
                  v-model="enquiry"
                  label="How can we help?"
                  name="enquiry"
                  placeholder="Please describe briefly what you would like the website to do?"
                  :required="true"
                  :rows="8"
                  :character-limit="enquiryCharLimit"
                  :character-count="enquiryCharCount"
                  :error="errors.enquiry"
                  :label-class="'block text-md text-gray-300'"
                  :char-limit-class="'text-sm text-gray-300'"
            >
            </BaseTextarea>
        </div>
    </form>
</template>