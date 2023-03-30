<script setup lang="ts">
import {
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon,
    DevicePhoneMobileIcon, ServerIcon, ShieldCheckIcon,
    UserGroupIcon
} from "@heroicons/vue/24/outline/index.js";
const features = [
    {
        name: 'Business Led',
        description: 'Focusing on what you are trying to do as a business.',
        icon: BuildingOfficeIcon,
    },
    {
        name: 'Integrated',
        description: 'Consistent branding & messaging across your digital and non-digital channels.',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: 'SEO',
        description: "Reach the target audience you are interested in with content they'll love.",
        icon: UserGroupIcon,
    },
    {
        name: 'Responsive',
        description: 'Whether it is being viewed on a PC, tablet or phone, your website will always look great.',
        icon: DevicePhoneMobileIcon,
    },
    {
        name: 'Flexible',
        description:
              "WordPress or bespoke build, we'll find the right platform for your business needs.",
        icon: ServerIcon,
    },
    {
        name: 'Secure',
        description:
              "Secure, robust websites to support your eCommerce and business transactional data",
        icon: ShieldCheckIcon,
    },
]
</script>
<template>
    <div class="relative bg-white py-16 sm:py-24 lg:py-16">
        <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-lg font-semibold text-cyan-600">Go to market</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need
                to create your digital footprint</p>
            <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                A business driven design and development process that puts you, your services and your customers at the
                centre of
                the conversation.
            </p>

            <div class="mt-12">
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
                    <div v-for="feature in features" :key="feature.name" class="pt-6 ">
                        <div class="flow-root rounded-lg bg-gray-50 px-6 pb-8 shadow-md">
                            <div class="-mt-6 h-40">
                                <div classs="">
                                    <span class="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 p-3 shadow-lg">
                                      <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true"/>
                                    </span>
                                </div>
                                <h3 class="mt-4 text-lg font-medium tracking-tight text-gray-900">
                                    {{ feature.name }}</h3>
                                <p class="mt-5 text-base text-gray-500">{{ feature.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>