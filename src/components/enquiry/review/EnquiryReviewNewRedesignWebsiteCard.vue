<template>
    <div class="overflow-hidden p-4 bg-black rounded-md border-1 shadow-inner shadow-gray-500">
        <div class="overflow-hidden p-4 bg-black rounded-md border-1 ">
            <dl class="gap-y-8">
                <h2 class="text-lg font-medium leading-6 text-teal-500">
                    {{ enquiry.enquiry_type.enquiry_type }} Enquiry Details
                </h2>
                <div class="mt-4">
                    <dt class="text-sm font-medium text-gray-400">Enquiry</dt>
                    <dd class="mt-1 text-sm text-gray-300">{{ enquiry.enquiry }}</dd>
                </div>
            </dl>
            <dl class="gap-x-4 gap-y-8 ">
                <div class="mt-10">
                    <dt class="text-sm font-medium text-gray-400">Features</dt>
                    <div class=" py-3  grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 flex flex-auto gap-y-8">
                        <div class="grid grid-cols-1">
                            <div class="grid md:grid-cols-4 sm:grid-cols-2">
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.marketing_chk"
                                          :label="'Marketing'"
                                          :label-description="'Having a shop window for marketing your goods or services.'"
                                          :model-value="Boolean(enquiry.marketing_chk)"
                                          :name="'marketing_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.ecommerce_chk"
                                          :label="'Ecommerce'"
                                          :label-description="'Selling goods or services directly from the site.'"
                                          :model-value="Boolean(enquiry.ecommerce_chk)"
                                          :name="'ecommerce_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.blog_chk"
                                          :label="'Blog'"
                                          :label-description="'Blogging as a content marketing strategy to acquire leads via organic traffic and social shares.'"
                                          :model-value="Boolean(enquiry.blog_chk)"
                                          :name="'blog_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.portfolio_chk"
                                          :label="'Portfolio'"
                                          :label-description="'Consolidating and displaying examples of your creative work.'"
                                          :model-value="Boolean(enquiry.portfolio_chk)"
                                          :name="'portfolio_chk'"
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
                                          v-model="enquiry.membership_chk"
                                          :label="'Membership'"
                                          :label-description="'Registered users can access exclusive content as part of building customer loyalty.'"
                                          :model-value="Boolean(enquiry.membership_chk)"
                                          :name="'membership_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.personal_chk"
                                          :label="'Personal'"
                                          :label-description="'A website focused on building a personal brand.'"
                                          :model-value="Boolean(enquiry.personal_chk)"
                                          :name="'personal_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                                <div class="mt-4 mx-2 col-span-1">
                                    <BaseCheckbox
                                          v-model="enquiry.nonprofit_chk"
                                          :label="'Non Profit'"
                                          :label-description="'A website for a charity or other non-profit organisation.'"
                                          :model-value="Boolean(enquiry.nonprofit_chk)"
                                          :name="'nonprofit_chk'"
                                          :labelClass="'text-md text-gray-300'"
                                          :labelDescriptionClass="'text-gray-400'"
                                          :inputClass="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                          :disabled="true"
                                    >
                                    </BaseCheckbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dl>

        </div>
    </div>
</template>

<script setup>

import {useEnquiryStore} from "../../../stores/EnquiryStore.js"
import BaseCheckbox from "../../ui/BaseCheckbox.vue";
import {storeToRefs} from "pinia";


const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)
</script>

<style scoped>

</style>