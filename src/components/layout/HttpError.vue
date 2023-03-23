<template>
    <!--
      This example requires updating your template:

      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
    <div class="min-h-screen bg-black px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div class="mx-auto max-w-max">
            <main class="sm:flex">
                <p class="text-4xl font-bold tracking-tight text-teal-600 sm:text-5xl">{{ props.errorCode }}</p>
                <div class="sm:border-l sm:border-gray-200 sm:pl-6">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-300 sm:text-5xl">{{ props.errorTitle }}</h1>
                    <p class="mt-1 text-base text-gray-300">{{ props.errorDescription }}</p>
                    </div>
                <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                    <router-link
                          to="/"
                       :class="'inline-flex items-center rounded-md border' +
                        'border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium ' +
                        'text-white shadow-sm hover:bg-cyan-700 ' +
                        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'"
                    >
                        Go back home
                    </router-link>
                    <a
                          href="mailto:support@agapanthus-consulting.com?subject=Error on website"
                          class="inline-flex items-center rounded-md border border-transparent bg-cyan-100
                          px-4 py-2 text-sm font-medium text-teal-700 hover:bg-cyan-200
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Contact support
                    </a>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue'
const props =  defineProps({
    errorCode:{
        type:String,
        default:"XXX"
    },
    errorTitle:{
        type:String,
        default:"Unknown error."
    },
    errorDescription:{
        type:String,
        default:"An unknown error has occurred."
    }
})
</script>

<style scoped>

</style>