<script setup lang="ts">
import BaseCheckbox from "../../ui/BaseCheckbox.vue";
import {onBeforeMount, ref} from 'vue'
import {useEnquiryStore} from "../../../stores/enquiryStore.js";
import moment from "moment";
import {storeToRefs} from "pinia";


let dataLoaded = ref(false)
const userFound = ref(false)


const enquiryStore = useEnquiryStore()
const {enquiry} = storeToRefs(enquiryStore)
//console.log(enquiry)

if (enquiryStore.enquiry.user !== null) {
    userFound.value = true
}

const getEnquiryStatus = (enquiryStatus) => {
    switch (enquiryStatus) {
        case 'New':
            return "text-red-500"
        case 'Reviewed':
            return "text-amber-500"
        case 'Responded':
            return "text-green-500"
        case 'Invited':
            return 'text-blue-500'
        default:
    }
}

const getUserTypeStatus = (enquiryStatus) => {
    switch (enquiryStatus) {
        case 'Inactive':
            return "text-red-500"
        case 'Active':
            return "text-green-500"
        default:
    }
}
const formatDate = (dateToFormat) => {
    return moment(dateToFormat).format('DD/MM/YYYY h:mm a');
}

onBeforeMount(async () => {

    //const enquiryStore = useEnquiryStore()
    ////console.log(enquiryStore)
    //const {enquiry} = storeToRefs(enquiryStore.enquiry)
    dataLoaded.value = true

})
</script>
<template>
    <div v-if="dataLoaded===true"
         class="overflow-hidden bg-black rounded-md border-1 shadow-inner shadow-gray-500">
        <div class="px-4 py-5 sm:px-6">
            <h1 class="text-3xl leading-tight text-teal-500">Enquiry {{ enquiry.id }}</h1>
        </div>
        <div class="px-4 py-5 sm:px-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 flex flex-auto gap-y-8 gap-x-8">
            <dl class="p-2 bg-black shadow sm:rounded-lg">
                <h2 class="px-2 text-lg font-medium leading-6 text-teal-500">Summary</h2>
                <div class="px-4">
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Enquiry Status</dt>
                        <dd
                              class="mt-1 text-sm font-bold"
                              :class="getEnquiryStatus(enquiry.enquiry_status.enquiry_status)"
                        >
                            {{ enquiry.enquiry_status.enquiry_status }}
                        </dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Created At</dt>
                        <dd class="mt-1 text-sm text-gray-300">{{
                                formatDate(enquiry.created_at)
                            }}
                        </dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Subject</dt>
                        <dd class="mt-1 text-sm text-gray-300">{{ enquiry.enquiry_type.enquiry_type }}</dd>
                    </div>
                    <div v-if="enquiry.enquiry_type.enquiry_type==='Instructor Courses and Workshops'"
                         class="mt-4">
                        <dt class="text-sm font-medium text-gray-600">Course Enquired About</dt>
                        <dd class="mt-1 text-sm font-bold text-blue-600">{{ enquiry.course_profile }}</dd>
                    </div>
                </div>

            </dl>
            <dl class="p-2 bg-black shadow sm:rounded-lg">
                <h2 class="px-2 text-lg font-medium leading-6 text-teal-500">
                    Contact Details
                </h2>
                <div class="px-4">
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Full Name</dt>
                        <dd class="mt-1 text-sm text-gray-300">{{ enquiry.name }}</dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Phone</dt>
                        <dd class="mt-1 text-sm text-gray-300">
                            {{ enquiry.phone_number }}
                        </dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Email Address</dt>
                        <dd class="mt-1 text-sm text-gray-300">
                            {{ enquiry.email }}
                        </dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Mailing List</dt>
                        <dd class="mt-1">
                            <BaseCheckbox
                                  v-model="enquiry.mailing_list"
                                  :label="'Mailing List'"
                                  :model-value="Boolean(enquiry.mailing_list)"
                                  :checked="Boolean(enquiry.mailing_list)"
                                  :name="'mailing_list'"
                                  :disabled="true"
                                  :label-class="'text-gray-300'"
                                  :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                            >
                            </BaseCheckbox>
                        </dd>
                    </div>
                </div>
            </dl>
            <dl v-if="userFound" class="p-2 bg-black shadow sm:rounded-lg">
                <h2 class="px-2 text-lg font-medium leading-6 text-teal-500">
                    User Details
                </h2>
                <div  class="px-4">
                    <div v-if="enquiry.user.user_user_type.length>0"  class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">User Type</dt>
                        <table v-for="userType in enquiry.user.user_user_type" class="table-fixed">
                            <tr>
                                <td class="mt-1 text-sm text-gray-300 pr-8">{{ userType.user_type.user_type }}</td>
                                <td class="mt-1 text-sm text-gray-300" :class="getUserTypeStatus(userType.user_type_status.user_type_status)">{{userType.user_type_status.user_type_status}}</td>
                            </tr>
                        </table>
                    </div>
                    <div   class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Roles</dt>
                        <table v-for="role in enquiry.user.roles" class="table-fixed">
                            <tr>
                                <td class="mt-1 text-sm text-gray-300">{{ role.name }}</td>
                                <td class="mt-1 text-sm text-gray-300">{{ formatDate(role.created_at) }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Created At</dt>
                        <dd class="mt-1 text-sm text-gray-300">
                            {{ formatDate(enquiry.user.created_at) }}
                        </dd>
                    </div>
                    <div class="mt-4">
                        <dt class="text-sm font-medium text-gray-400">Verified At</dt>
                        <dd class="mt-1 text-sm text-gray-300">
                            {{ formatDate(enquiry.user.email_verified_at) }}
                        </dd>
                    </div>
                </div>
            </dl>
        </div>
    </div>
</template>
