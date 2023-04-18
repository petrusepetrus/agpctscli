<template>
    <div class="rounded-md bg-black border-2 border-red-500 p-4" aria-live="assertive">
            <div class="flex">
                <div class="flex-shrink-0">
                    <XCircleIcon class="h-5 w-5 text-red-300" aria-hidden="true"/>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-300">{{ errorTitle}}</h3>
                    <div class="mt-2 text-sm text-red-200">
                        <ul role="list" class="list-disc pl-5 space-y-1">
                            {{errorDescription}}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import {XCircleIcon} from "@heroicons/vue/24/solid";

export default {
    components: {
        XCircleIcon
    },
    props:{
        errorTitle: {
            type: String,
            default: "Error detected",
        },
        errorDescription: {
            type: String,
            default: "An unspecified error has occurred. Please contact support.",
        },
    }
}
</script>
