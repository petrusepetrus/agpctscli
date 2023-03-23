<template>
    <div class="overflow-hidden p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500">
        <div class="p-2 bg-black shadow sm:rounded-lg px-4 py-5 sm:px-6 grid md:grid-cols-2 sm:grid-cols-1 flex flex-auto gap-y-8 gap-x-8">
            <dl class="gap-y-8">
                <h2 class="text-lg font-medium leading-6 text-teal-500">
                    {{ enquiry.enquiry_type.enquiry_type }} Enquiry Details
                </h2>
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Enquiry</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.enquiry }}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup>

import {useEnquiryStore} from "../../../stores/EnquiryStore.js"
import {storeToRefs} from "pinia";

const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)
</script>

<style scoped>

</style>