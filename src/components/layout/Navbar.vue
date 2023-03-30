<script setup lang="ts">
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

/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/
import {useRouter} from "vue-router";
/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Menu,
    MenuItems,
    MenuButton,
    MenuItem,
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/vue'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/
import useAuthService from "../../services/useAuthService.js";
/*-------------------------------------------------------------------------------*/
/* Stores
/*-------------------------------------------------------------------------------*/
import {storeToRefs} from 'pinia'
import {useAuthStore} from "../../stores/AuthStore.js";
/*-------------------------------------------------------------------------------*/
/* Validation
/*-------------------------------------------------------------------------------*/

/*===============================================================================*/
/* Props
/*===============================================================================*/

/*===============================================================================*/
/* Variable Declaration and Initialisation
/*===============================================================================*/
const authStore = useAuthStore()
const {user, authenticated, verified, userRoles} = storeToRefs(authStore)
const router = useRouter()
const navigation = [
    {
        name: 'Home',
        href: '/',
        authenticated: false,
        roles: [
            'public'
        ]
    },
    {
        name: 'About Me',
        href: '/about-me',
        authenticated: false,
        roles: [
            'public'
        ]
    },
    {
        name: 'Contact Me Now',
        href: '/contact-me',
        authenticated: false,
        roles: [
            'public'
        ]
    },
    {
        name: 'Enquiries',
        href: '/enquiries',
        authenticated: true,
        roles: [
            'super admin',
            'admin'

        ]
    },
    {
        name: 'Users',
        href: '/users',
        authenticated: true,
        roles: [
            'super admin',
            'admin'

        ]
    },
]
/*===============================================================================*/
/* Emits
/*===============================================================================*/

/*===============================================================================*/
/* Watches
/*===============================================================================*/

/*===============================================================================*/
/* Lifecycle Hooks
/*===============================================================================*/

/*===============================================================================*/
/* Functions
/*===============================================================================*/
const {logout} = useAuthService()
const logUserOut = async () => {
    /*
    ----------------------------------------------------------------------------
    log active user out of system when requested
    ----------------------------------------------------------------------------
     */
    try {
        await logout()
        await router.push({name: 'home'})
    } catch (e) {
        //console.log(e)
    }

}

const checkRoles = (permittedRoles) => {
    /*
    ----------------------------------------------------------------------------
        Inspect the navigation items and determine if, based on the user roles,
        whether it should be displayed for that particular user.
    ----------------------------------------------------------------------------
    */
    //console.log(userRoles.value)
    for (let x = 0; x < permittedRoles.length; x++) {
        //console.log(permittedRoles)
        //console.log(permittedRoles[x])
        let permittedRoleName = permittedRoles[x]
        //console.log(permittedRoleName)
        for (let i = 0; i < userRoles.value.length; i++) {
            //console.log(userRoles.value[i].name + " " + permittedRoleName)
            if (userRoles.value[i].name === permittedRoleName || permittedRoleName === "Public") {
                //console.log("found it")
                return true
            } else {
                //console.log("missed it")
            }
        }
    }
    //console.log("nope")
    return false
}
</script>
<template>
    <Disclosure v-slot="{ open }" as="nav" class="bg-black shadow">
        <div class="bg-black pt-6">
            <nav class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Global">
                <div class="flex flex-1 items-center">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                              class="inline-flex items-center justify-center ml-1 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                        </DisclosureButton>
                    </div>
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center">
                            <a href="/home">
                                <span class="sr-only">Agapanthus Consulting</span>
                                <img class="hidden lg:block mx-auto h-12 w-auto w-12 rounded-full border-gray-400 border-solid border-2 hover:border-teal-600 "
                                     src="/images/agcplogotrsp150x150.png"
                                     alt="Agapanthus Consulting"
                                />
                            </a>
                        </div>
                        <div v-for="item in navigation"
                             :key="item.name"
                        >
                            <div v-if="!item.authenticated || (item.authenticated && checkRoles(item.roles))"
                                 class="hidden space-x-8 md:ml-10 md:flex block rounded-md px-3 py-2 text-base font-medium text-gray-900 ">
                                <router-link
                                      :active-class="'border-teal-300 text-teal-500 inline-flex items-center border-b-2 text-sm font-medium'"
                                      :class="'text-base font-medium text-white hover:text-gray-300'"
                                      :to="item.href"
                                >
                                    {{ item.name }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                      v-if="authenticated"
                      type="button"
                      class="">
                    <span class="sr-only">View notifications</span>
                    <BellIcon
                          class="h-8 w-8 text-teal-500 rounded-full border-gray-400 border-solid border-2 hover:border-teal-600"
                          aria-hidden="true"/>
                </button>
                <Menu as="div" class="ml-3 relative">
                    <div v-if="authenticated">
                        <MenuButton
                              class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300">
                            <span class="sr-only">Open user menu</span>
                            <img
                                  class="h-8 w-8 rounded-full border-gray-400 border-solid border-2 hover:border-teal-600"
                                  src="/images/peter_256x319.jpg"
                                  :alt="user.name"
                            />
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                              class="origin-right-bottom absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-black
                                    ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div v-if="authenticated" class="absolute z-10 bg_white">
                                <MenuItem
                                      v-if="authenticated && verified"
                                      v-slot="{ active }">
                                    <router-link
                                          :class="[active ? 'bg-gray-600' : 'bg-gray-500', 'block px-4 py-2 text-sm text-gray-300']"
                                          :to="{name:'user-profile',params:{userID:user.id}}"
                                    >
                                        Your Profile
                                    </router-link>
                                </MenuItem>
                                <MenuItem
                                      v-if="authenticated && !verified"
                                      v-slot="{ active }"
                                >
                                    <router-link
                                          v-if="!verified && authenticated"
                                          :class="[active ? 'bg-gray-600' : 'bg-gray-500', 'block px-4 py-2 text-sm text-gray-300']"
                                          to="/verify-email"
                                    >
                                        Verify Email
                                    </router-link>
                                </MenuItem>
                                <MenuItem
                                      v-slot="{ active }"
                                >
                                    <a
                                          href="#"
                                          :class="[active ? 'bg-gray-600' : 'bg-gray-500', 'block px-4 py-2 text-sm text-gray-300']"
                                          @click.prevent="logUserOut"
                                    >
                                        Sign out
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
                <div class="hidden md:flex md:items-center md:space-x-6">
                    <div v-if="!authenticated">
                        <router-link
                              :class="'text-base font-medium text-white hover:text-gray-300'"
                              to="/login">Sign in
                        </router-link>
                    </div>
                    <div v-else
                         class='block px-4 py-2 text-base font-medium text-white hover:text-gray-300'>Hi
                        {{ user.first_name }}
                    </div>

                </div>
            </nav>
        </div>
        <DisclosurePanel class="sm:hidden">
            <div class="pt-2 pb-4 space-y-1">
                <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
                <div v-for="item in navigation"
                     :key="item.name"

                >
                    <div v-if="!item.authenticated || (item.authenticated && checkRoles(item.roles))"
                         class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 "
                    >
                        <router-link
                              :active-class="'border-teal-300 text-gray-200 inline-flex items-center  px-1 pt-1 border-b-2 text-sm font-medium'"
                              :class="'border-transparent text-gray-500  ' +
                           'hover:border-gray-300 hover:text-gray-700 hover:bg-yellow-400' +
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'"
                              :to="item.href"
                        >
                            {{ item.name }}
                        </router-link>
                    </div>
                </div>
                <div
                      v-if="!authenticated"
                      class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100">
                    <router-link
                          :active-class="'border-teal-300 text-gray-900 inline-flex items-center  px-1 pt-1 border-b-2 text-sm font-medium'"
                          :class="'border-transparent text-gray-500  ' +
                           'hover:border-gray-300 hover:text-yellow-700 hover:bg-yellow-100' +
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'"
                          to="/login">Sign in
                    </router-link>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>