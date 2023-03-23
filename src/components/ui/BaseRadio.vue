<template>
    <div class="relative flex items-start">
        <div class="flex items-center h-5">
    <input
          type="radio"
          :checked="modelValue === value"
          :value="value"
          :class="inputClass"
          v-bind="$attrs"
          @change="$emit('update:modelValue', value)"
    />
        </div>
    <div class="ml-3 text-sm">
        <label
              v-if="label"
              :class="labelClass">{{ label }}</label>

        <p
              v-if="labelDescription"
              :class="labelDescriptionClass">{{ labelDescription }}</p>

        </div>
    </div>
</template>

<script>
export default {
    name:"BaseRadio",
    props: {
        label: {
            type: String,
            default: ''
        },
        labelClass:{
            type:String,
            default:"font-medium text-gray-700"
        },
        labelDescription: {
            type: String,
            default: ''
        },
        labelDescriptionClass:{
            type:String,
            default:"text-gray-500"
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        inputClass: {
            type: String,
            default: "h-4 w-4 focus:ring-teal-500 focus:border-teal-500 rounded"
        },
        value: {
            type: [String, Number],
            required: true
        }
    }
}
</script>