<template>
    <Navbar/>
    <div class="bg-black bg-black pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div class="mx-auto max-w-7xl lg:px-8">
            <div class=" mt-4 bg-white lg:mx-auto lg:grid grid-cols-2  lg:grid-flow-col-dense lg:grid-cols-2   ">
                <div class="px-8 col-span-1 bg-white my-8">
                    <div class="lg:order-first lg:row-span-2 mt-4">
                        <h1 class="text-4xl font-bold tracking-tight text-teal-800  sm:text-5xl">
                            I’m Peter and I live in Cheshire, where I run my web design business.
                        </h1>
                        <div class="mt-12 space-y-7 text-base text-gray-500 sm:text-xl lg:text-lg xl:text-xl">
                            <div class="">
                                I started my web design and development business, <span class="font-medium text-cyan-600">Agapanthus Consulting</span>,
                                in 2016 after spending a little over 30 years working in the IT Services industry, largely in and around large scale
                                business transformation programmes.
                                <div class="text-sm mt-2 text-teal-700 ">(If you're interested in
                                    finding
                                    out more about my earlier career then check out my
                                    <a
                                          href="https://www.linkedin.com/in/peter-stone-3a58762"
                                          target=”_blank”
                                          class="font-bold text-cyan-600 hover:text-cyan-400"
                                    >LinkedIn
                                    </a> profile for more information).
                                </div>
                                </div>
                            <p class="">
                                I now work predominantly with small businesses that are looking to
                                create an integrated digital footprint across
                                their website and digital marketing channels.
                            </p>
                            <p class="">
                                I love working with my clients. Each business is unique and trying to understand
                                what it does, where the client is trying to take it and the issues they
                                are wrestling with can be interesting, challenging and exciting.
                                </p>
                            <p>I enjoy trying to come up with innovative ways to use technology
                                as part of these transformations and helping clients get a consistent presentation of
                                their brand across their various marketing activities.
                            </p>
                            <p class="">
                                When I'm not working, I enjoy taking in the countryside around
                                the village where I live - particularly when a visit to a pub or cafe is involved! I enjoy
                                cycling and when I get the chance, sailing is also a firm favourite. And if the weather's not so good
                                then I enjoy reading, playing the guitar and cooking - though not necessarily all
                                at the same time!
                            </p>
                        </div>
                    </div>

                </div>
                <div class="px-24 col-span-1 pt-12  bg-gray-50 ">

                        <div class="">
                            <img
                                  src="/images/peter_1024x1276.jpg"
                                  alt=""
                                  sizes="(min-width: 256px) 32rem, 20rem"
                                  class="rounded-2xl  object-cover "
                            />
                        </div>

                    <div class="lg:pl-8 pt-12 flex">
                        <ul v-for="navLink in navLinks"
                            :key="navLink.name">

                            <span class="text-teal-500  float-left pr-4">
                                <a :href="navLink.href"
                                   target=”_blank”
                                class="pl-2">
                                       <component
                                             :is="navLink.icon"
                                                  class="h-6 float-left"
                                                  aria-hidden="true">

                                       </component>
                                    {{ navLink.name }}
                                </a>
                            </span>

                            <!--
                            <li>
                                <a
                                      href="mailto:peter.stone@agapanthus-consulting.com"
                                      icon={MailIcon}
                                      class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                                >
                                    peter.stone@agapanthus-consulting.com
                                </a>
                            </li>
                            -->

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footerbar/>
</template>

<script setup>

import Navbar from "../../components/layout/Navbar.vue";
import {defineComponent, h} from 'vue'
import Footerbar from "../../components/layout/Footerbar.vue";

const navLinks = [
    {
        name: 'FaceBook',
        href: 'https://www.facebook.com/AgapanthusConsulting',
        icon: defineComponent({
            render: () =>
                  h('svg', {fill: 'currentColor', viewBox: '0 0 22 22'}, [
                      h('path', {
                          'fill-rule': 'evenodd',
                          d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 ' +
                                '9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 ' +
                                '2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 ' +
                                '2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                          'clip-rule': 'evenodd',
                      }),
                  ]),
        })
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
]
</script>

<style scoped>

</style>