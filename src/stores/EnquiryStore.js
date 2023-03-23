import {defineStore} from "pinia";

const useEnquiryStore = defineStore('EnquiryStore', {
    state() {
        return {
            enquiry:{},
        }
    },
    getters: {
    },
    actions: {}
})
export {useEnquiryStore}