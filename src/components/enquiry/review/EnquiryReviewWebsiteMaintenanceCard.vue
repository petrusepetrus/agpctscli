<script setup lang="ts">
import BaseCheckbox from "../../ui/BaseCheckbox.vue";
import {useEnquiryStore} from "../../../stores/EnquiryStore.js"
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
                    <dt class="text-sm font-medium text-gray-400">Maintenance Required</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.enquiry }}</dd>
                </div>
            </dl>
            <dl class="gap-x-4 gap-y-8 ">
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Business Name</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.business_name }}</dd>
                </div>
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Business URL</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.business_url }}</dd>
                </div>
            </dl>
            <p class="mt-4 text-sm font-medium text-gray-400">
                Maintenance Required
            </p>
            <div class="grid md:grid-cols-4 sm:grid-cols-1">
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.bare_bones_chk"
                          :label="'Bare Bones'"
                          :label-description="'Minimal maintenance to keep website live. Any project work charged on a time and materials basis.'"
                          :model-value="Boolean(enquiry.bare_bones_chk)"
                          :name="'bare_bones_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
                <div class="mt-4 mx-2 col-span-1">
                    <BaseCheckbox
                          v-model="enquiry.maintenance_plus_chk"
                          :label="'Maintenance Plus'"
                          :label-description="'Maintain software to current versions with in-built monthly allowance for one day of project work at discounted man hour rate'"
                          :model-value="Boolean(enquiry.maintenance_plus_chk)"
                          :name="'maintenance_plus_chk'"
                          :label-class="'text-md text-gray-300'"
                          :label-description-class="'text-gray-400'"
                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                          :disabled="true"
                    >
                    </BaseCheckbox>
                </div>
            </div>
        </div>
    </div>
</template>