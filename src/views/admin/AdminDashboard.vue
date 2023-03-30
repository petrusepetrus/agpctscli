<script setup lang="ts">
import Sidebar from "../../components/layout/Sidebar.vue";
import Navbar from "../../components/layout/Navbar.vue";
</script>
<template>
    <div>
        <Navbar></Navbar>
        <div class="min-h-screen bg-black">
            <div class="mx-auto sm:px-6  lg:px-8 lg:grid lg:grid-cols-6 lg:gap-8">
                <Sidebar/>
                <div class="lg:block lg:col-span-3 xl:col-span-2">


                    <!--
                      This example requires Tailwind CSS v2.0+

                      This example requires some changes to your config:

                      ```
                      // tailwind.config.js
                      const colors = require('tailwindcss/colors')

                      module.exports = {
                        // ...
                        theme: {
                          extend: {
                            colors: {
                              rose: colors.rose,
                            },
                          },
                        },
                        plugins: [
                          // ...
                          require('@tailwindcss/forms'),
                        ],
                      }
                      ```
                    -->
                    <!--
                      This example requires updating your template:

                      ```
                      <html class="h-full bg-gray-100">
                      <body class="h-full">
                      ```
                    -->
                    <div class="min-h-full">
                        <!--
                          When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars

                          Menu open: "fixed inset-0 z-40 overflow-y-auto", Menu closed: ""
                        -->


                        <main class="lg:col-span-9 xl:col-span-6 text-white">
                            <h1>Admin</h1>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>