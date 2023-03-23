<template>
    <label v-if="label"
           :for="uuid"
           :class="[labelClass, { 'sr-only': !showLabel }]"
           >
           <!--class="block text-sm font-medium text-gray-700"!-->
        {{ label }}
        <span v-if="required" class="text_sm text-red-500">*</span>
    </label>
    <select
          class="field mt-1 shadow-sm focus:ring-indigo-500 placeholder-gray-400 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          v-bind="{
      ...$attrs,
            onChange: ($event) => {
          $emit('update:modelValue',
          $event.target.value)
      }
    }"
          :id="uuid"
          :value="modelValue"
          :aria-describedby="error ? `${uuid}-error` : null"
          :aria-invalid="error ? true : false"
          :class="[inputClass,{ error }]"
          :required="required"
          :disabled="disabled"
    >
        <option v-if="promptOption!==''"
                :value="null"
        >--{{promptOption}}--</option>
        <option
              v-for="option in options"
              :key="option"
              :value="option"
              :selected="option === modelValue"
        >{{ option }}
        </option>
    </select>
    <BaseInputErrorMessage
          v-if="error"
          :id="`${uuid}-error`"
    >
        {{ error }}
    </BaseInputErrorMessage>

</template>

<script>
import UniqueID from "../../utils/UniqueID.js";
import BaseInputErrorMessage from "./BaseInputErrorMessage.vue";

export default {
    name: "BaseSelect",
    components: {
        BaseInputErrorMessage
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Object,
            required: true
        },
        error: {
            type: String,
            default: ''
        },
        required:{
            type:Boolean,
            default:false,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        labelClass:{
            type:String,
            default:"block text-sm font-medium text-red-700"
        },
        inputClass:{
            type:String,
            default:"appearance-none block w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 md:text-md text-sm"
        },
        promptOption:{
            type:String,
            default:''
        }
    },
    setup(props, context) {

        const uuid = UniqueID().getID()
        return {
            uuid
        }
    }
}
</script>