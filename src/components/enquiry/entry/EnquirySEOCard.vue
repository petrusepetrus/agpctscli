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
/* Services */

/*
-------------------------------------------------------------------------------
Variable definitions
------------------------------------------------------------------------------ */
/* refs */
let formValues = {
    business_name : "",
    business_url : "",
    google_chk : false,
    you_tube_chk : false,
    facebook_chk : false,
    twitter_chk : false,
    tik_tok_chk : false,
    linked_in_chk : false,
    snapchat_chk : false,
    other_chk : false,
    other_social_media:"",
    enquiry : "",
}

const enquiryCharCount = ref(0)
const enquiryCharLimit = ref(512)

/* vee-validate schema */
const validationSchema = object({
    business_name: string().required('Please enter the business or organisation name'),
    business_url: string().required('Please enter the business or organisation URL'),
    enquiry: string().required('Please enter your enquiry'),
    other_social_media: string().when("other_chk", {
        is: true,
        then: string().required("Please enter the other marketing platform(s) being used"),
    }),


})
const {validate, errors, values} = useForm({
    validationSchema
})
let {value: business_name}: FieldContext<string> = useField('business_name')
let {value: business_url}: FieldContext<string> = useField('business_url')
let {value: enquiry}: FieldContext<string> = useField('enquiry')
let {value: google_chk}: FieldContext<boolean> = useField('google_chk')
let {value: you_tube_chk}: FieldContext<boolean> = useField('you_tube_chk')
let {value: facebook_chk}: FieldContext<boolean> = useField('facebook_chk')
let {value: twitter_chk}: FieldContext<boolean> = useField('twitter_chk')
let {value: tik_tok_chk}: FieldContext<boolean> = useField('tik_tok_chk')
let {value: linked_in_chk}: FieldContext<boolean> = useField('linked_in_chk')
let {value: snapchat_chk}: FieldContext<boolean> = useField('snapchat_chk')
let {value: other_chk}: FieldContext<boolean> = useField('other_chk')
let {value: other_social_media}: FieldContext<string> = useField('other_social_media')

/*
explicitly expose the vaildateForm function so that it can be called by the parent component
 */
defineExpose({
    validateForm,
    formValues
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
        //console.log("yes")

        formValues.business_name = business_name.value
        formValues.business_url = business_url.value
        formValues.google_chk = google_chk.value
        formValues.you_tube_chk = you_tube_chk.value
        formValues.facebook_chk = facebook_chk.value
        formValues.twitter_chk = twitter_chk.value
        formValues.tik_tok_chk = tik_tok_chk.value
        formValues.linked_in_chk = linked_in_chk.value
        formValues.snapchat_chk = snapchat_chk.value
        formValues.other_chk = other_chk.value
        formValues.other_social_media=other_social_media.value
        formValues.enquiry = enquiry.value

    } else {
        console.log("SEO failed")
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
                <h3 class="text-lg font-medium text-teal-600">Search Engine Optimisation and Digital Marketing</h3>
            </div>
        </div>
        <p class="mt-8 text-md text-gray-300">
            Which business or organisation are we looking to improve the marketing of?
        </p>
        <div class="mt-6 grid md:grid-cols-2 sm:grid-cols-1 gap-y-6 sm:gap-x-8">
            <div class="col-span-2  sm:col-span-1">
                <BaseInput
                      v-model="business_name"
                      type="string"
                      :required="true"
                      placeholder="The business or organisation name?"
                      autocomplete="business name"
                      label="Business Name"
                      name="business_name"
                      :error="errors.business_name"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>

            <div class="col-span-2  sm:col-span-1">
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
        <p class="mt-8 text-md text-gray-300">
            Which of the following business and social media platforms do you already market your business through
            today?
        </p>
        <p class="text-sm text-gray-300">
            (Select all that apply)
        </p>
        <div class="grid md:grid-cols-4 sm:grid-cols-2">
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="google_chk"
                      :label="'Google Business'"
                      :model-value="Boolean(google_chk)"
                      :name="'google_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="facebook_chk"
                      :label="'Facebook'"
                      :model-value="Boolean(facebook_chk)"
                      :name="'facebook_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="you_tube_chk"
                      :label="'YouTube'"
                      :model-value="Boolean(you_tube_chk)"
                      :name="'you_tube_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="twitter_chk"
                      :label="'Twitter'"
                      :model-value="Boolean(twitter_chk)"
                      :name="'twitter_chk'"
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
                      v-model="linked_in_chk"
                      :label="'LinkedIn'"
                      :model-value="Boolean(linked_in_chk)"
                      :name="'linked_in_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="tik_tok_chk"
                      :label="'TikTok'"
                      :model-value="tik_tok_chk"
                      :name="'tik_tok_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="snapchat_chk"
                      :label="'Snapchat'"
                      :model-value="Boolean(snapchat_chk)"
                      :name="'snapchat_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
            <div class="mt-4 mx-2 col-span-1">
                <BaseCheckbox
                      v-model="other_chk"
                      :label="'Other'"
                      :model-value="Boolean(other_chk)"
                      :name="'other_chk'"
                      :label-class="'text-md text-gray-300'"
                      :label-description-class="'text-gray-400'"
                      :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                >
                </BaseCheckbox>
            </div>
        </div>
        <div
              v-if="other_chk===true"
        >

            <div class="mt-4 grid grid-cols-1 gap-y-2 sm:gap-x-8">
                <BaseInput

                      v-model="other_social_media"
                      type="string"
                      placeholder="The other marketing platform(s) being used?"
                      autocomplete="other platform"
                      label=" Which other marketing platforms are you using?"
                      name="other_social_media"
                      :required="true"
                      :error="errors.other_social_media"
                      :label-class="'block text-md text-gray-300'"
                >
                </BaseInput>
            </div>
        </div>
        <div class="mt-8">
            <BaseTextarea
                  v-model="enquiry"
                  label="Enquiry"
                  name="enquiry"
                  placeholder="How can we help?"
                  :required="true"
                  :rows="8"
                  :character-limit="enquiryCharLimit"
                  :character-count="enquiryCharCount"
                  :error="errors.enquiry"
                  :label-class="'block text-md text-gray-300'"
                  :char-limit-class="'text-sm text-gray-400'"
            >
            </BaseTextarea>
        </div>
        <div class="mt-6 col-span-2 ">

        </div>
    </form>
</template>