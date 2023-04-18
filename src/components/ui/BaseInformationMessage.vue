<template>
    <div class="rounded-md bg-black p-4" aria-live="assertive">
        <div class="flex">
            <div class="flex-shrink-0">
                <CheckCircleIcon class="h-5 w-5 text-green-300" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-green-300">{{ title }}</h3>
                <div class="mt-2 text-sm text-green-400">
                    <ul role="list" class="list-disc pl-5 space-y-1">
                        {{description}}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {CheckCircleIcon} from "@heroicons/vue/24/solid";

export default {
    components: {
        CheckCircleIcon
    },
    props: {
        title: {
            type: [String, Number],
            default:'Success'
        },
        description: {
            type: String,
            default: "",
        },
    }
}
</script>
