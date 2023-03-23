<template>
    <div class="bg-black min-h-screen">
        <Navbar></Navbar>
        <div class=" grid mx-auto sm:grid-cols-1 md:grid-cols-5 sm:px-6  lg:px-8">
            <div class="col-span-1">
                <Sidebar/>
            </div>
            <div class="bg-black md:col-span-4 sm:col-span-1 px-4 sm:px-6 lg:px-2">
                <header class="px-4 sm:px-6 lg:px-2">
                    <div class="grid grid-cols-2 pt-2 sm:flex-wrap sm:items-center sm:justify-between mb-8">
                        <div class="sm:flex-auto">
                            <h1 class="text-teal-600 text-3xl  tracking-tight sm:text-4xl sm:tracking-tight">
                                Enquiries</h1>
                        </div>
                    </div>
                    <div class="bg-black grid lg:grid-cols-3 md:grid-cols-1 ">
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink shadow sm:rounded-lg p-2 col-span-1 ">
                            <h2 class="text-lg leading-6 font-medium text-teal-300">Filter on name</h2>
                            <div class="mt-2 mb-2 max-w-xl text-sm text-gray-400">
                                <p>Enter any consecutive sequence of letters to search the name for</p>
                            </div>
                            <label for="name-query" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <BaseInput
                                      id="name-query"
                                      v-model="enquirySearchName"
                                      name="name-query"
                                      :input-class="'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'"
                                      placeholder="Search name"
                                      type="search"
                                />
                            </div>
                        </div>
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink shadow sm:rounded-lg p-2 col-span-1">
                            <h2 class="text-lg leading-6 font-medium text-teal-300">Filter on enquiry type</h2>
                            <div class="mt-2 mb-2 max-w-xl text-sm text-gray-400">
                                <p>Select one or more enquiry types to search for or leave blank for all</p>
                            </div>
                            <div class="max-w-lg w-full lg:max-w-xs">
                                <div v-for="(enquiryType, enquiryTypeIndex) in enquiryTypes">
                                    <!-- :key="enquiryType.id"-->
                                    <BaseCheckbox
                                          v-model="enquiryTypeSelected[enquiryTypeIndex]"
                                          :label="enquiryType.enquiry_type"
                                          :checked="false"
                                          label-description=""
                                          :label-class="'text-md text-gray-300'"
                                          :label-description-class="'text-gray-400'"
                                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                    >
                                    </BaseCheckbox>
                                </div>
                            </div>
                        </div>
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink bg-white shadow sm:rounded-lg p-2 col-span-1">
                            <h2 class="text-lg leading-6 font-medium text-teal-300">Filter on enquiry status</h2>
                            <div class="mt-2 mb-2 max-w-xl text-sm text-gray-400">
                                <p>Select one or more enquiry statuses you are interested in or leave blank for
                                    all</p>
                            </div>
                            <div class="max-w-lg w-full lg:max-w-xs">
                                <div v-for="(enquiryStatus, enquiryStatusIndex) in enquiryStatuses">
                                    <!--:key="enquiryStatus.id"-->
                                    <BaseCheckbox
                                          v-model="enquiryStatusSelected[enquiryStatusIndex]"
                                          :label="enquiryStatus.enquiry_status"
                                          label-description=""
                                          :label-class="'text-md text-gray-300'"
                                          :label-description-class="'text-gray-400'"
                                          :input-class="'focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded'"
                                    >
                                    </BaseCheckbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <table class="bg-black min-w-full divide-y divide-gray-500">
                        <thead class="bg-black min-w-full">
                        <tr>
                            <th
                                  scope="col"
                                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6"
                            >
                                <div>
                                    Name
                                </div>

                            </th>
                            <th
                                  scope="col"
                                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-400 sm:table-cell">
                                <div>
                                    Phone
                                </div>
                                <div>
                                    Email
                                </div>

                            </th>
                            <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-400">
                                <div>
                                    Enquiry Status
                                </div>
                                <div>
                                    Enquiry Type
                                </div>
                            </th>
                            <th
                                  scope="col"
                                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                Enquiry
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Edit</span>
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Delete</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="enquiriesFound" class="divide-y divide-gray-200 bg-black">
                        <tr v-for="enquiry in enquiriesList" :key="enquiry.id">
                            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-200 sm:w-auto sm:max-w-none sm:pl-6">
                                {{ enquiry.name }}
                                <div class="px-3 text-sm text-gray-300  ">
                                    {{ enquiry.id }}
                                </div>
                                <div class="px-3 text-sm text-gray-300  ">
                                    {{formatDate(enquiry.created_at)}}
                                </div>
                            </td>
                            <td class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">
                                <div class="px-3">
                                    <a :href="`tel: ${enquiry.phone_number }`">{{ enquiry.phone_number }}</a>
                                </div>
                                <div class="px-3 text-sm text-gray-300  ">
                                    <a :href="`mailto: ${enquiry.email}`">{{ enquiry.email }}</a>
                                </div>
                            </td>
                            <td class="px-3 py-4 text-sm text-gray-300 sm:table-cell">
                                <div
                                      :class=getEnquiryStatus(enquiry.enquiry_status.enquiry_status)

                                      class="text-sm font-bold  ">
                                    {{ enquiry.enquiry_status.enquiry_status }}
                                </div>
                                <div class="text-sm text-gray-300  ">
                                    {{ enquiry.enquiry_type.enquiry_type }}
                                </div>
                            </td>
                            <td
                                  class="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell"
                            >
                                {{ enquiry.enquiry }}
                            </td>
                            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <router-link
                                      :class="'block px-4 py-2 text-sm text-teal-300 hover:text-teal-100'"
                                      :to="{name:'enquiry-review',params:{enquiryID:enquiry.id}}">
                                    View
                                    <span class="sr-only"></span>
                                </router-link>
                            </td>
                            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a v-on:click.prevent="deleteEnquiryFromList(enquiry.id)"
                                   href="#"
                                   class="text-teal-300 hover:text-teal-100"
                                >
                                    Delete
                                    <span class="sr-only"></span></a
                                >
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </main>
                <div v-if="enquiriesFound" class="col-span-1 md:col-span-4">
                    <BasePagination
                          :current_page="paginationData.current_page"
                          :last_page="paginationData.last_page"
                          :next_page_url="paginationData.next_page_url"
                          :path="paginationData.path"
                          :per_page="paginationData.per_page"
                          :prev_page_url="paginationData.prev_page_url"
                          :to="paginationData.to"
                          :from="paginationData.from"
                          :total="paginationData.total"
                          :links="paginationData.links"
                          @new-page="pageChange"
                    >
                    </BasePagination>
                </div>
                <BaseSpinner
                      v-if="flgIsLoading || flgIsDeleting"
                      :action="flgIsLoading ?'Loading - please wait' : 'Deleting - please wait'"
                      class="text-teal-300"
                >
                </BaseSpinner>
                <BaseErrorMessage
                      v-if="error.title"
                      :error-description=error.description
                      :error-title=error.title>
                </BaseErrorMessage>
                <BaseWarningMessage
                      v-if="warning.title"
                      :warning-title=warning.title
                      :warning-description=warning.description>
                </BaseWarningMessage>
            </div>
        </div>
    </div>
</template>

<script setup>
/* Overview
-------------------------------------------------------------------------------
EnquiriesList provides a list and search function showing the details for
selected Enquiries with the ability to perform basic CRUD
-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Imports
/*===============================================================================*/
/* Vue
/*-------------------------------------------------------------------------------*/
import {ref, reactive, watch, onBeforeMount} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import Sidebar from "../../components/layout/Sidebar.vue";
import BasePagination from "../../components/ui/BasePagination.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseCheckbox from "../../components/ui/BaseCheckbox.vue";
import BaseErrorMessage from "../../components/ui/BaseErrorMessage.vue";
import BaseWarningMessage from "../../components/ui/BaseWarningMessage.vue";
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
import Navbar from "../../components/layout/Navbar.vue"
import BaseInput from "../../components/ui/BaseInput.vue";
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../services/misc/useMiscService.js";
import {testIfPromise} from "../../utils/GeneralUtilities.js"
import moment from "moment";

/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Props
/*===============================================================================*/
const props = defineProps({
    enquiryComment: {},
    enquiryID: String
})
/*===============================================================================*/
/* Emits
/*===============================================================================*/
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
let enquiriesList = ref({})
let paginationData = reactive({})
let enquiryTypes = ref([])
let enquirySearchName = ref('')
let enquiryStatuses = ref([])
let enquiryTypeSelected = ref([])
let enquiryStatusSelected = ref([])
let enquiriesFound = ref(false)
let flgIsLoading=ref(false)
let flgIsDeleting = ref(false)
let error = reactive({})
let warning = reactive({})
let queryParams = reactive({
    pageNumber: 0,
    recordsPerPage: 5,
    nameQuery: "",
    enquiryTypeQuery: "",
    enquiryStatusQuery: "",
})

const {getEnquiries, getEnquiryTypes, getEnquiryStatuses, deleteEnquiry} = useMiscService()

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
onBeforeMount(async () => {
          /*
    retrieve the enquiry types and statuses for the search bar
     */
          await loadEnquiryTypes()
          await loadEnquiryStatuses()
          /*
    checkout the page number we are referring to
     */
          let stringToBeSearched = document.location.search
          let searchString = "page="
          queryParams.pageNumber = stringToBeSearched.substring(stringToBeSearched.search(searchString) + searchString.length, stringToBeSearched.length)
          /*
    get the enquiries corresponding to that page
     */
          await getEnquiriesList()
          if (enquiriesFound.value === false) {
              warning.title = "No enquiries found"
              warning.description = "No enquiries match your chosen criteria."
          } else {
              /*
        set up the page to be displayed
         */
              if (paginationData.path) {
                  try {
                      /*
                change the browser URL to reflect page number
                 */
                      await changePageURL(paginationData.current_page)
                  } catch (e) {
                      if (testIfPromise(e)) {
                          e.then((value) => {
                              /*
                    The error handler throws a promise.reject so we need to resolve the promise
                    to access the error information
                     */
                              error.title = value.title
                              error.description = value.description
                              //error.description=e
                          })
                      } else {
                          error.title = e
                      }
                  }
              }
              /*
        listen for back or forward button clicks in browser
         */
              window.addEventListener('popstate', popstateEventAction);
          }
      }
)

/*===============================================================================*/
/* Watchers
/*===============================================================================*/
watch(enquirySearchName, () => {
    /*
    Purpose:
        on a change in Name search field loads the enquiries list for that filter
     */
    queryParams.pageNumber = 1
    queryParams.nameQuery = enquirySearchName.value
    /*
    fetch the qualifying enquiries
     */
    getEnquiriesList()
})
/*-------------------------------------------------------------------------------*/
watch(enquiryTypeSelected.value, () => {
    /*
    Purpose:
        on a change in Enquiry Type search field loads the enquiries list for that filter
     */
    queryParams.pageNumber = 1
    queryParams.enquiryTypeQuery = ""
    let blnFirstParameterAdded = false
    /*
    construct the filter based on one or more Enquiry Types being selected
    */
    for (let i = 0; i < enquiryTypeSelected.value.length; i++) {
        if (enquiryTypeSelected.value[i]) {
            if (!blnFirstParameterAdded) {
                blnFirstParameterAdded = true
                queryParams.enquiryTypeQuery = enquiryTypes.value[i].enquiry_type
            } else {
                queryParams.enquiryTypeQuery = queryParams.enquiryTypeQuery + ',' + enquiryTypes.value[i].enquiry_type
            }
        }
    }
    /*
    fetch the qualifying enquiries
     */
    getEnquiriesList()
})
/*-------------------------------------------------------------------------------*/
watch(enquiryStatusSelected.value, () => {
    /*
    Purpose:
        on a change in Enquiry Status search field loads the enquiries list for that filter
     */
    queryParams.pageNumber = 1
    queryParams.enquiryStatusQuery = ""
    let blnFirstParameterAdded = false
    /*
    construct the filter based on one or more Enquiry Statuses being selected
    */
    for (let i = 0; i < enquiryStatusSelected.value.length; i++) {
        if (enquiryStatusSelected.value[i]) {
            if (!blnFirstParameterAdded) {
                blnFirstParameterAdded = true
                queryParams.enquiryStatusQuery = enquiryStatuses.value[i].enquiry_status
            } else {
                queryParams.enquiryStatusQuery = queryParams.enquiryStatusQuery + ',' + enquiryStatuses.value[i].enquiry_status
            }
        }
    }
    /*
    fetch the qualifying enquiries
     */
    getEnquiriesList()
})
/*===============================================================================*/
/* Functions
/*===============================================================================*/
const getEnquiriesList = async () => {
    /*
    Purpose:
        get the qualifying list of enquiries and set up the pagination information
        based on the response from the API
    Parms:
        Direct:
            None
        Indirect:
            queryParams
                object containing the constructed query based on the user
                filters selected
    */
    flgIsLoading.value = true
    enquiriesFound.value = false
    try {
        warning={}
        let response = await getEnquiries(queryParams)
        if (response.data.length === 0) {
            enquiriesFound.value = false
            warning.title="No enquiries were found."
            warning.description="No enquiries were found matching your criteria."
        } else {
            enquiriesFound.value = true
            warning.title = ""
            enquiriesList.value = response.data
            paginationData.current_page = response.current_page
            paginationData.last_page = response.last_page
            paginationData.next_page_url = response.next_page_url
            paginationData.path = response.path
            paginationData.per_page = response.per_page
            paginationData.prev_page_url = response.prev_page_url
            paginationData.from = response.from
            paginationData.to = response.to
            paginationData.total = response.total
            paginationData.links = response.links
        }
    } catch (e) {
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
                The error handler throws a promise.reject so we need to resolve the promise
                to access the error information
                 */
                error.title = value.title
                error.description = value.description
                //error.description=e
            })
        } else {
            error.title = e
        }
    }
    flgIsLoading.value = false
}
/*-------------------------------------------------------------------------------*/
const deleteEnquiryFromList = async (enquiryID) => {
    //console.log("deleteing " + enquiryID)
    flgIsDeleting.value = true
    try {
        let response = await deleteEnquiry(enquiryID)
        getEnquiriesList()
        if (enquiriesFound.value !== true && queryParams.pageNumber > 1) {
            queryParams.pageNumber = queryParams.pageNumber - 1
            getEnquiriesList()
            changePageURL(queryParams.pageNumber)
        } else {
            warning.title = "No enquiries found"
            warning.description = "No enquiries match your chosen criteria."
        }
    } catch (e) {
        if (testIfPromise(e)) {
            e.then((value) => {
                /*
                The error handler throws a promise.reject so we need to resolve the promise
                to access the error information
                 */
                error.title = value.title
                error.description = value.description
                //error.description=e
            })
        } else {
            error.title = e
        }
    }
    flgIsDeleting.value = false
}
/*-------------------------------------------------------------------------------*/
const pageChange = async (newPage) => {
    /*
    Purpose:
        reloads a new set of Enquiries based on a page change in the pagination component
        and then silently pushes the corresponding url entry into the windows history
        without triggering a reload of the page
    Parms:
        newPage
            the destination page Enquiries should be loaded for
    */
    queryParams.pageNumber = newPage
    await getEnquiriesList()
    if (paginationData.path) {
        try {
            changePageURL(newPage)
        } catch (e) {
            if (testIfPromise(e)) {
                e.then((value) => {
                    /*
                    The error handler throws a promise.reject so we need to resolve the promise
                    to access the error information
                     */
                    error.title = value.title
                    error.description = value.description
                    //error.description=e
                })
            } else {
                error.title = e
            }
        }
    }
}
/*-------------------------------------------------------------------------------*/
const changePageURL = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set('page', newPage);
    window.history.pushState({}, '', url);
}
/*-------------------------------------------------------------------------------*/
const popstateEventAction = (event) => {
    /*
        Purpose:
            listen for forward or back browser button clicks and reload the
            enquiries list for the relevant page number
        Parms:
            newPage
                the destination page Enquiries should be loaded for
        */
    if (event.state && event.state.replaced === false) {
        /*
        extract the page number we have been moved to and
        set the query page number to that page
         */
        let stringToBeSearched = document.location.search
        let searchString = "page="
        queryParams.pageNumber = stringToBeSearched.substring(stringToBeSearched.search(searchString) + searchString.length, stringToBeSearched.length)
        /*
        get the required Enquiries
         */
        getEnquiriesList()
    }
}
/*-------------------------------------------------------------------------------*/
const getEnquiryStatus = (enquiryStatus) => {
    /*
    Purpose:
        styles the text for the enquiry status based on its value
    Parms:
        enquiryStatus
            the Enquiry Status we are formatting for
    */
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

/*-------------------------------------------------------------------------------*/
async function loadEnquiryTypes() {
    /*
    Purpose:
        load the Enquiry Types that are available for the search bar
        functionality
    Parms:
        none
    */
    try {
        enquiryTypes.value = await getEnquiryTypes()
    } catch (e) {
        e.then((value) => {
            /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
            error.title = value.title
            error.description = value.description
            //error.description=e
        })
    }
}

/*-------------------------------------------------------------------------------*/
const loadEnquiryStatuses = async () => {
    /*
    Purpose:
        load the Enquiry Statuses that are available for the search bar
        functionality
    Parms:
        none
    */
    try {
        enquiryStatuses.value = await getEnquiryStatuses()
    } catch (e) {
        e.then((value) => {
            /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
            error.title = value.title
            error.description = value.description

            //error.description=e
        })
    }
}
const formatDate=(date)=>{
    return moment(String(date)).format('DD/MM/YY')
}
/*-------------------------------------------------------------------------------*/

</script>

<style scoped>

</style>