<script setup lang="ts">
/**
 * ToDo
 * Create sections for Privacy links, etc in footer bar
 */
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
import {h, defineComponent} from "vue";
/*-------------------------------------------------------------------------------*/
/* Router
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
/* Components
/*-------------------------------------------------------------------------------*/

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
const footerNavigation = {
    solutions: [
        {name: 'Marketing', href: '#'},
        {name: 'Analytics', href: '#'},
        {name: 'Commerce', href: '#'},
        {name: 'Insights', href: '#'},
    ],
    support: [
        {name: 'Pricing', href: '#'},
        {name: 'Documentation', href: '#'},
        {name: 'Guides', href: '#'},
        {name: 'API Status', href: '#'},
    ],
    company: [
        {name: 'About', href: '/about-me'},

    ],
    legal: [
        {name: 'Privacy', href: '/data-usage-policy'},
    ],
    social: [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/AgapanthusConsulting',
            icon: defineComponent({
                render: () =>
                      h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
                          h('path', {
                              'fill-rule': 'evenodd',
                              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                              'clip-rule': 'evenodd',
                          }),
                      ]),
            }),
        },
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/in/peter-stone-3a58762',
            icon: defineComponent({
                render: () =>
                      h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
                          h('path', {
                              'fill-rule': 'nonzero',
                              d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 ' +
                                    '5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 ' +
                                    '0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 ' +
                                    '1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 ' +
                                    '0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                              'clip-rule': 'evenodd',
                          }),
                      ]),
            })
        },
    ],
}
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
    <footer class="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="border-t border-gray-400 py-8">
            <p class="text-base text-gray-400 xl:text-center">&copy; 2023 Agapanthus Consulting, All rights
                reserved.</p>
        </div>
    </footer>
</template>