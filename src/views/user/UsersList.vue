<script setup lang="ts">
/* Overview
-------------------------------------------------------------------------------
UserList provides a list and search function showing the user details for
selected users with the ability to perform basic CRUD
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
import BaseButton from "../../components/ui/BaseButton.vue";
import Sidebar from "../../components/layout/Sidebar.vue";
import BasePagination from "../../components/ui/BasePagination.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseCheckbox from "../../components/ui/BaseCheckbox.vue";
import BaseErrorMessage from "../../components/ui/BaseErrorMessage.vue";
import BaseWarningMessage from "../../components/ui/BaseWarningMessage.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import {CheckCircleIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/solid'
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useMiscService from "../../services/useMiscService.js";
import useUserService from "../../services/useUserService.js";
import {testIfPromise} from "../../utils/GeneralUtilities.js"
import Navbar from "../../components/layout/Navbar.vue";

/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
/*===============================================================================*/
/* Props
/*===============================================================================*/
/*===============================================================================*/
/* Emits
/*===============================================================================*/
/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
let usersList = ref({})
let paginationData = reactive({
    current_page :"",
    last_page :"",
    next_page_url :"",
    path :"",
    per_page :"",
    prev_page_url :"",
    from :"",
    to :"",
    total :"",
    links :"",
})
let userTypes = ref([])
let userSearchName = ref('')
let userTypeStatuses = ref([])
let userTypeSelected = ref([])
let userTypeStatusSelected = ref([])
let usersFound = ref(false)
let flgIsLoading = ref(false)
let flgIsDeleting = ref(false)
let errorMessage = reactive({
    title:"",
    description:"",
})
let warningMessage = reactive({
    title:"",
    description:"",
})
let queryParams = reactive({
    pageNumber: 1,
    recordsPerPage: 5,
    nameQuery: "",
    userTypeQuery: "",
    userTypeStatusQuery:"",
})

const {getUsers, getUserTypes, getUserTypeStatuses} = useUserService()

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/
onBeforeMount(async () => {
          flgIsLoading.value = true
          /*
    Fetch the user types and statuses for the search bar
     */
          await loadUserTypes()
          await loadUserTypeStatuses()
          /*
checkout the page number we are referring to
*/
          //console.log(window.location)
          let stringToBeSearched = window.location.search
          //console.log(stringToBeSearched)
          let searchString = "page="
          queryParams.pageNumber = Number(stringToBeSearched.substring(stringToBeSearched.search(searchString) + searchString.length, stringToBeSearched.length))
          //console.log(queryParams.pageNumber)
          if (queryParams.pageNumber === 0) {
              queryParams.pageNumber = 1
              changePageURL(1)
          }
          await getUsersList()
          //console.log(paginationData.path)
          if (usersFound.value === false) {
              warningMessage.title = "No users found"
              warningMessage.description = "No users match your chosen criteria."
          } else {
              if (paginationData.path) {
                  try {
                      /*
                change the browser URL to reflect page number
                */
                      //await changePageURL(paginationData.current_page)
                  } catch (e) {
                      if (testIfPromise(e)) {
                          e.then((value) => {
                              /*
                        The error handler throws a promise.reject so we need to resolve the promise
                        to access the error information
                         */
                              errorMessage.title = value.title
                              errorMessage.description = value.description
                              //errorMessage.description=e
                          })
                      } else {
                          errorMessage.title = e
                      }
                  }
              }
              flgIsLoading.value = false
              ////console.log(userTypes)
              window.addEventListener('popstate', popstateEventAction);
          }
      }
)
/*===============================================================================*/
/* Watchers
/*===============================================================================*/
watch(userSearchName, () => {
    queryParams.pageNumber = 1
    queryParams.nameQuery = userSearchName.value
    getUsersList()
})
/*-------------------------------------------------------------------------------*/
watch(userTypeSelected.value, () => {
    queryParams.pageNumber = 1
    queryParams.userTypeQuery = ""
    let blnFirstParameterAdded = false
    for (let i = 0; i < userTypeSelected.value.length; i++) {
        if (userTypeSelected.value[i]) {
            if (!blnFirstParameterAdded) {
                blnFirstParameterAdded = true
                queryParams.userTypeQuery = userTypes.value[i].user_type
            } else {
                queryParams.userTypeQuery = queryParams.userTypeQuery + ',' + userTypes.value[i].user_type
            }
        }
    }
    getUsersList()
})
/*-------------------------------------------------------------------------------*/
watch(userTypeStatusSelected.value, () => {
    queryParams.pageNumber = 1
    queryParams.userTypeStatusQuery = ""
    let blnFirstParameterAdded = false
    for (let i = 0; i < userTypeStatusSelected.value.length; i++) {
        if (userTypeStatusSelected.value[i]) {
            if (!blnFirstParameterAdded) {
                blnFirstParameterAdded = true
                queryParams.userTypeStatusQuery = userTypeStatuses.value[i].user_type_status
            } else {
                queryParams.userTypeStatusQuery = queryParams.userTypeStatusQuery + ',' + userTypeStatuses.value[i].user_type_status
            }
        }
    }
    getUsersList()
})
/*===============================================================================*/
/* Functions
/*===============================================================================*/
const getUsersList = async () => {
    flgIsLoading.value = true
    usersFound.value = false
    try {
        warningMessage.title=""
        warningMessage.description=""
        let response = await getUsers(queryParams)
        if (response.data.length === 0) {
            usersFound.value = false
            warningMessage.title="No users were found."
            warningMessage.description="No users were found matching your criteria."
        } else {
            usersFound.value = true
            warningMessage.title = ""
            usersList.value = response.data
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
                errorMessage.title = value.title
                errorMessage.description = value.description
                //errorMessage.description=e
            })
        } else {
            errorMessage.title = e
        }
    }
    flgIsLoading.value = false
}
/*-------------------------------------------------------------------------------*/
const pageChange = async (newPage) => {
    queryParams.pageNumber = newPage
    await getUsersList()
    console.log(paginationData.path)
    if (paginationData.path) {
        try {
            //changePageURL(newPage)
        } catch (e) {
            if (testIfPromise(e)) {
                e.then((value) => {
                    /*
                    The errorMessage handler throws a promise.reject so we need to resolve the promise
                    to access the error information
                     */
                    errorMessage.title = value.title
                    errorMessage.description = value.description
                    //errorMessage.description=e
                })
            } else {
                errorMessage.title = e
            }
        }
    }
}
/*-------------------------------------------------------------------------------*/
const changePageURL = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set('page', newPage);
    //console.log(url)
    window.history.pushState({}, '', url);
}

const popstateEventAction = (event) => {
    /*
    Purpose:
        listen for forward or back browser button clicks and reload the
        users list for the relevant page number
    Parms:
        newPage
            the destination page users should be loaded for
    */
    if (event.state && event.state.replaced === false) {
        let stringToBeSearched = document.location.search
        let searchString = "page="
        let pageNumber = Number(stringToBeSearched.substring(stringToBeSearched.search(searchString) + searchString.length, stringToBeSearched.length))
        queryParams.pageNumber = pageNumber
        getUsersList()
    }

}
const getUserTypeStatus = (userTypeStatus) => {
    switch (userTypeStatus) {
        case 'Active':
            return "h-4 w-4 text-green-400"
        case 'Inactive':
            return "h-4 w-4 text-red-400"
        default:
    }
}

const addUser = () => {
    //console.log("adding user")
    //router.push({name: 'user-profile', params: {userID: 'new'}})
}

async function loadUserTypes() {
    try {
        userTypes.value = await getUserTypes()
    } catch (e) {
        //console.log("error found")
        e.then((value) => {
            /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
            //console.log(value)
            errorMessage.title = value.title
            errorMessage.description = value.description
            //errorMessage.description=e
        })
    }
}

const loadUserTypeStatuses = async () => {
    try {
        userTypeStatuses.value = await getUserTypeStatuses()
    } catch (e) {
        e.then((value) => {
            /*
            The error handler throws a promise.reject so we need to resolve the promise
            to access the error information
             */
            errorMessage.title = value.title
            errorMessage.description = value.description
            //errorMessage.description=e
        })
    }
}

</script>
<template>
    <div class="bg-black min-h-screen">
        <Navbar></Navbar>
        <div class=" grid mx-auto sm:grid-cols-2 md:grid-cols-5 sm:px-6  lg:px-8">
            <div class="col-span-1">
                <Sidebar/>
            </div>
            <div class="bg-black md:col-span-4 sm:col-span-1 px-4 sm:px-6 lg:px-2">
                <header class="px-4 sm:px-6 lg:px-2">
                    <div class="py-4 sm:flex-auto">
                        <h1 class="text-teal-600 text-3xl  tracking-tight sm:text-4xl sm:tracking-tight">Users</h1>
                    </div>
                    <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 pt-2 mb-2">
                        <div class="col-span-1 lg:col-start-8 md:col-start-3 mt-6 sm:mt-0 ">
                            <BaseButton
                                  class="text-sm py-4"
                                  title="Add New User"
                                  @click="addUser"
                            />
                        </div>
                    </div>
                    <div class="bg-black grid lg:grid-cols-3 md:grid-cols-1">
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink shadow sm:rounded-lg p-2">
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
                                      v-model="userSearchName"
                                      name="name-query"
                                      :input-class="'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'"
                                      placeholder="Search name"
                                      type="search"
                                />
                            </div>
                        </div>
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink shadow sm:rounded-lg p-2">
                            <h2 class="text-lg leading-6 font-medium text-teal-300">Filter on role</h2>
                            <div class="mt-2 mb-2 max-w-xl text-sm text-gray-400">
                                <p>Select one or more roles to search for or leave blank for all</p>
                            </div>
                            <div class="max-w-lg w-full lg:max-w-xs">
                                <div v-for="(userType,userTypeIndex) in userTypes">
                                    <BaseCheckbox
                                          v-model="userTypeSelected[userTypeIndex]"
                                          :label="userType.user_type"
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
                        <div class="bg-black max-w-lg  lg:max-w-xs shrink shadow sm:rounded-lg p-2">
                            <h2 class="text-lg leading-6 font-medium text-teal-300">Filter on role status</h2>
                            <div class="mt-2 mb-2 max-w-xl text-sm text-gray-400">
                                <p>Select one or more role statuses you are interested in or leave blank for
                                    all</p>
                            </div>
                            <div class="max-w-lg w-full lg:max-w-xs">
                                <div v-for="(userTypeStatus,userTypeStatusIndex) in userTypeStatuses">
                                    <BaseCheckbox
                                          v-model="userTypeStatusSelected[userTypeStatusIndex]"
                                          :label="userTypeStatus.user_type_status"
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
                                Name
                            </th>
                            <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-400 lg:table-cell">
                                <div>
                                    Email
                                </div>
                                <div>
                                    Phone
                                </div>
                            </th>
                            <th
                                  scope="col"
                                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-400">
                                Roles
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Edit</span>
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Delete</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="usersFound" class="divide-y divide-gray-200 bg-black">
                        <tr v-for="user in usersList" :key="user.email">
                            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-200 sm:w-auto sm:max-w-none sm:pl-6">
                                {{ user.name }}
                            </td>

                            <td class="px-3 py-4 text-sm text-gray-200 sm:table-cell">
                                <div class="text-left">
                                    <a :href="`mailto: ${user.email}`">{{ user.email }}</a>
                                </div>
                                <div v-for="phone in user.phones">
                                    <div v-if="phone.pivot.preferred_contact_number!==0" class="float-right w-1/6">
                                        <CheckCircleIcon class="h-4 w-4 text-green-400"/>
                                    </div>
                                    <div class="float-left w-5/6">
                                        <a :href="`tel: ${ phone.phone_number }`">{{ phone.phone_number }}</a>
                                    </div>

                                </div>
                            </td>
                            <td class="hidden px-3 py-4 text-sm text-gray-200 sm:table-cell">
                                <div v-for="userType in user.user_user_type">
                                    <div class="text-gray-200">
                                        {{ userType.user_type.user_type }}
                                    </div>
                                    <div
                                          class="text-gray-200"
                                          :class=getUserTypeStatus(userType.user_type_status.user_type_status)>
                                        {{ userType.user_type_status.user_type_status }}
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <router-link
                                      :class="'block px-4 py-2 text-sm text-teal-300 hover:text-teal-100'"
                                      :to="{name:'user-profile',params:{userID:user.id}}">
                                    Edit
                                    <span class="sr-only">, {{ user.name }}</span>
                                </router-link>
                            </td>
                            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                      href="#"
                                      class="text-teal-300 hover:text-teal-100"
                                >
                                    Delete<span class="sr-only">, {{ user.name }}</span></a
                                >
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </main>
                <div v-if="usersFound" class="col-span-1 md:col-span-4">
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
                          @newPage="pageChange"
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
                      v-if="errorMessage.title"
                      :error-description=errorMessage.description
                      :error-title=errorMessage.title>
                </BaseErrorMessage>
                <BaseWarningMessage
                      v-if="warningMessage.title"
                      :warning-title=warningMessage.title
                      :warning-description=warningMessage.description>
                </BaseWarningMessage>
            </div>
        </div>
    </div>
</template>