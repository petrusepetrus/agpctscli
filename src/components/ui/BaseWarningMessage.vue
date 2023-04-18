<template>
    <div class="rounded-md bg-black border-2 border-amber-300 p-4" aria-live="assertive">
        <div class="flex">
            <div class="flex-shrink-0">
                <ExclamationCircleIcon class="h-5 w-5 text-amber-400" aria-hidden="true"/>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-amber-400">{{ warningTitle }}</h3>
                <div class="mt-2 text-sm text-amber-300">
                    <ul role="list" class="list-disc pl-5 space-y-1">
                        {{ warningDescription }}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ExclamationCircleIcon} from "@heroicons/vue/24/solid";

export default {
    components: {
        ExclamationCircleIcon
    },
    props: {
        warningTitle: {
            type: [String, Number],
            required: true,
            default: 'Warning'
        },
        warningDescription: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>
