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

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon,QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
/*-------------------------------------------------------------------------------*/
/* Services and Utilities
/*-------------------------------------------------------------------------------*/

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
/* Variable Declaration and Initialisation
/*===============================================================================*/
const navigation = [
    { name: 'Dashboard', icon: HomeIcon, current: true, href: '#' },
    {
        name: 'Enquiries',
        icon: QuestionMarkCircleIcon,
        current: false,
        children: [
            { name: 'Overview', href: '/enquiries' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
    },
    {
        name: 'Users',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Overview', href: '/users' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
    },
    {
        name: 'Projects',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Overview', href: '#' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
    },
    {
        name: 'Calendar',
        icon: CalendarIcon,
        current: false,
        children: [
            { name: 'Overview', href: '#' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
    },
    {
        name: 'Documents',
        icon: InboxIcon,
        current: false,
        children: [
            { name: 'Overview', href: '#' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
    },
    {
        name: 'Reports',
        icon: ChartBarIcon,
        current: false,
        children: [
            { name: 'Overview', href: '#' },
            { name: 'Members', href: '#' },
            { name: 'Calendar', href: '#' },
            { name: 'Settings', href: '#' },
        ],
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

</script>
<template>
    <div class="flex flex-grow flex-col overflow-y-auto bg-black pt-5 pb-4">
        <div class="flex flex-grow flex-col bg-black">
            <nav class="flex-1 space-y-1 bg-black px-2" aria-label="Sidebar">
                <template v-for="item in navigation" :key="item.name">
                    <div v-if="!item.children">
                        <router-link to="item.href">{{item.name}}</router-link>
                        <!--
                        <a href="#" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
                            <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                            {{ item.name }}
                        </a>
                        -->
                    </div>
                    <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
                        <DisclosureButton
                              :class="[item.current ? 'bg-black-100 text-gray-300' : 'bg-black text-gray-300 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500']">
                            <component :is="item.icon" class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            <span class="flex-1">{{ item.name }}</span>
                            <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                        </DisclosureButton>
                        <DisclosurePanel class="space-y-1">
                            <DisclosureButton
                                  v-for="subItem in item.children" :key="subItem.name" as="a"
                                  :href="subItem.href"
                                  class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-900">{{ subItem.name }}</DisclosureButton>
                        </DisclosurePanel>
                    </Disclosure>
                </template>
            </nav>
        </div>
    </div>
</template>