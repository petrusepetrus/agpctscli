<template>
    <div v-if="openModal">
        <div class="grid place-items-center">
            <div
                  class="fixed bottom-0 z-10 transform overflow-hidden rounded-lg
                    bg-gradient-to-r from-teal-600 to-cyan-600 px-8 pt-5 pb-4 text-left shadow-xl transition-all
                    max-w-3xl"
                  ref="trapRef"
                  role="dialog"
            >
                <div class="grid grid-cols-12">
                    <div class="md:col-span-1  md:h-8 md:w-8 sm:h-6 sm:w-6 items-center rounded-full bg-white  sm:col-span-3 ">
                        <ExclamationCircleIcon class="md:h-8 md:w-8 sm:h-4 sm:w-4 align-middle text-red-600"
                                               aria-hidden="true"/>
                    </div>
                    <h3 class="md:col-span-10 col-span-8 md:text-left text-center text-lg font-medium text-white">Cookie
                        Consent</h3>
                </div>
                <div>
                    <div>

                    </div>
                    <div class="mt-2">
                    <span class="text-sm text-white"
                    >
                        This website uses cookies to improve your customer experience
                        (please refer to our
                        <router-link
                              to="/data-usage-policy"
                              :active-class="'border-gray-900 text-gray-900 inline-flex items-center border-b-2 border-t-0 text-sm font-medium'"
                              class="border-gray-300 border-b-2 text-sm text-white hover:text-gray-900"
                        > Data Usage Policy</router-link> for more
                        information). To use the site please accept either Essential or All cookies.
                    </span>
                    </div>
                </div>
                <form
                      novalidate class="mt-2">
                    <div class="mt-5 sm:mt-4 sm:flex ">
                        <BaseRadioGroup
                              v-model="cookieOptionSelected"
                              name="cookieOptionGroup"
                              :model-value="cookieOptionSelected"
                              :options="cookieOptions"
                              :vertical="true"
                        ></BaseRadioGroup>
                        <BaseButton
                              @click.prevent="acceptCookies"
                              title="Accept Cookies"
                              input-class="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-500 hover:to-gray-300
                                w-32 inline-flex w-full justify-center rounded-md border md:mt-0  sm:mt-32 m-2"
                        >
                            Submit form
                        </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
/* Overview
-------------------------------------------------------------------------------
UserReview enables the management of a selected Enquiry
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {ref, watch} from 'vue'

/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import BaseButton from "./ui/BaseButton.vue"
import BaseRadioGroup from "./ui/BaseRadioGroup.vue"
import {ExclamationCircleIcon} from "@heroicons/vue/24/solid"
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useFocusTrap from "../composables/useFocusTrap.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Emits
/*===============================================================================*/
const emit = defineEmits([
      'close'
]);
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
/*-------------------------------------------------------------------------------*/
/* Classes
/*-------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* Provides a wrapper for managing setting our consent in cookie storage
/* rather than local or session storage
/*----------------------------------------------------------------------------- */
const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
              .split(';')
              .map(cookie => cookie.split('='))
              .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

let cookieOptionSelected = ref('all')   /* pre-select 'all' in the radio group  */
let openModal=ref(false)                /* leave modal closed initially         */
/* options for the radio group */
let cookieOptions = ref([
    {
        'inputClass':'focus:ring-teal-900 h-4 w-4 text-teal-900 border-teal-900 rounded',
        'label':'Essential',
        'labelClass':'text-md text-white',
        'labelDescription':'Just the cookies needed to use the site',
        'labelDescriptionClass':'text-gray-300',
        'value':'minimal',
    },
    {
        'inputClass':'focus:ring-teal-900 h-4 w-4 text-teal-900 border-teal-900 rounded',
        'label':'All',
        'labelClass':'text-md text-white',
        'labelDescription':'Recommended for the best user experience',
        'labelDescriptionClass':'text-gray-300',
        'value':'all',
        'modelValue':'all',
    },
])
const {trapRef} = useFocusTrap();

const storageType = cookieStorage           /* set the storage type - can be localStorage, sessionStorage or cookieStorage  */
const consentPropertyName = 'agpc_consent'  /* name tag for the consent property                                            */
/* check whether there is already a consent property stored and either open or leave closed the modal   */
openModal.value=!storageType.getItem(consentPropertyName)

/*===============================================================================*/
/* Functions
/*===============================================================================*/
/* the consent button has been clicked so
    set the consent property to true
    close the modal
    turn of the focus trap so the site can be accessed
*/
const acceptCookies = () => {
    storageType.setItem(consentPropertyName, true);
    openModal.value=false
    emit('close')
}
/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
/*===============================================================================*/
/* Watches
/*===============================================================================*/
watch(cookieOptionSelected,(value, oldValue)=>{
          //console.log(value + " " + oldValue)
      }
)

</script>