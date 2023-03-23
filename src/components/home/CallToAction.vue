<template>
    <div class="relative bg-black">
        <div class="relative h-56 bg-black sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
            <img class="h-full w-full object-cover"
                 src="/images/website_design.jpg"
                 alt=""/>
            <div aria-hidden="true"
                 class="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"/>
        </div>
        <div class="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
            <div class="md:ml-auto md:w-1/2 md:pl-10">
                <h2 class="text-lg font-semibold text-gray-300">Want to find out more?</h2>
                <p class="mt-2 text-3xl font-bold block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5  sm:text-4xl">Contact me now</p>
                <p class="mt-3 text-lg text-gray-300">
                    Get in touch for a free, no obligation conversation about
                    your website and digital marketing needs.
                </p>
                <div class="mt-8">
                    <div class="inline-flex rounded-md shadow">
                        <button
                              class="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600
                                                        py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700
                                                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                            <router-link
                                  :active-class="'border-teal-300 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'"
                                  :class="'text-base font-medium text-white hover:text-gray-300'"
                                  to="contact-me"
                            >
                                Contact me now
                            </router-link>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>