<script setup>

import {useEnquiryStore} from "../../../stores/EnquiryStore.js"
import BaseCheckbox from "../../ui/BaseCheckbox.vue";
import {storeToRefs} from "pinia";

const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)
</script>
<template>
    <div class="overflow-hidden p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500">
        <div class="overflow-hidden p-4 bg-black rounded-md border-1">
            <dl class="gap-y-8">
                <div class="text-lg font-medium leading-6 text-teal-500">
                    {{ enquiry.enquiry_type.enquiry_type }} Enquiry Details
                </div>
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Enquiry</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.enquiry }}</dd>
                </div>
            </dl>
            <dl class="gap-x-4 gap-y-8 ">
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Business Name</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.business_name}}</dd>
                </div>
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Business URL</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.business_url}}</dd>
                </div>
            </dl>
            <p class="mt-8 text-md text-gray-300">
                Social media platforms being used today
            </p>
            <div class="grid md:grid-cols-4 sm:grid-cols-2">
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.google_chk"
                          :label="'Google Business'"
                          :model-value="Boolean(enquiry.google_chk)"
                          :name="'google_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.facebook_chk"
                          :label="'Facebook'"
                          :model-value="Boolean(enquiry.facebook_chk)"
                          :name="'facebook_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.you_tube_chk"
                          :label="'YouTube'"
                          :model-value="Boolean(enquiry.you_tube_chk)"
                          :name="'you_tube_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.twitter_chk"
                          :label="'Twitter'"
                          :model-value="Boolean(enquiry.twitter_chk)"
                          :name="'twitter_chk'"
                          :labelClass="'text-md text-gray-300'"
                          :labelDescriptionClass="'text-gray-400'"
                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
            </div>
            <div class="grid md:grid-cols-4 sm:grid-cols-2">
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.linked_in_chk"
                          :label="'LinkedIn'"
                          :model-value="Boolean(enquiry.linked_in_chk)"
                          :name="'linked_in_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.tik_tok_chk"
                          :label="'TikTok'"
                          :model-value="Boolean(enquiry.tik_tok_chk)"
                          :name="'tik_tok_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.snapchat_chk"
                          :label="'Snapchat'"
                          :model-value="Boolean(enquiry.snapchat_chk)"
                          :name="'snapchat_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.other_chk"
                          :label="'Other'"
                          :model-value="Boolean(enquiry.other_chk)"
                          :name="'other_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
            </div>
            <div
                  v-if="Boolean(enquiry.other_chk)===true"
            >

                <div class="mt-4 grid grid-cols-1 gap-y-2 sm:gap-x-8">
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Other Social Media</dt>
                        <dd class="mt-1 text-sm text-gray-300">{{ enquiry.other_social_media}}</dd>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>