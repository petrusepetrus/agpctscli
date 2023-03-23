<template>
    <div class="bg-black pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div class="mx-auto max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8 md:grid md:grid-cols-1">
                <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                    <div class="lg:py-24">
                        <h1
                              class="text-6xl block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                            Agapanthus Consulting
                        </h1>
                        <h2 class="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                            <span class="block">A better way to</span>
                            <span class="block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">build your website</span>
                        </h2>
                        <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                            Specialising in websites for small businesses, Agapanthus Consulting offers a
                            friendly, professional web design and development service.
                        </p>
                        <div class="mt-10 sm:mt-12">
                            <div class="sm:flex">
                                <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                                    Want to find out more? Looking for a quote?
                                </p>
                                <div class="mt-3 sm:mt-0 sm:ml-3">
                                    <button type="submit"
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
                <div class="mt-12 md:-mb-2 sm:-mb-48 lg:relative lg:m-0">
                    <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                        <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 md:h-full lg:w-auto lg:max-w-none"
                             src="/images/website_design.jpg" alt=""/>
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