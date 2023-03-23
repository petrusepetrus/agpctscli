<template>
    <div class="flex justify-between">
    <label
          v-if="label"
          :for="uuid"
          :class="[labelClass,{ 'sr-only': !showLabel }]"
    >
        {{ label }}
        <span v-if="required" class="text_sm text-red-500">*</span>
    </label>

        <span v-if="characterLimit>0" id="message-max" :class="charLimitClass">{{characterCount}} of maximum {{characterLimit}} characters</span>
    </div>
    <div class="mt-1">
        <textarea
              v-bind="{
            ...$attrs,
            onInput:updateValue
             }"
              :id="uuid"
              :class="[inputClass,{ error }]"
              :maxlength="characterLimit"
              :rows="rows"
              :value="modelValue"
              :required="required"
              :disabled="disabled"
              :placeholder="placeholder"
              :autocomplete="autocomplete"
              :aria-describedby="error ? `${uuid}-error` : null"
              :aria-invalid="error ? true : false"
        ></textarea>

        <BaseInputErrorMessage
              v-if="error"
              :id="`${uuid}-error`"
        >
            {{ error }}
        </BaseInputErrorMessage>
    </div>
</template>

<script>
import SetupFormComponent from "../../utils/SetupFormComponent";
import UniqueID from "../../utils/UniqueID";
import {ExclamationCircleIcon} from '@heroicons/vue/24/solid'
import BaseInputErrorMessage from "./BaseInputErrorMessage.vue";

export default {
    name: "BaseInput",
    inheritAttrs: false,
    components: {
        BaseInputErrorMessage,
        ExclamationCircleIcon,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        rows: {
            type: Number,
            default: 4,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        placeholder: {
            type: String,
            default: null,
        },
        autocomplete: {
            type: String,
            default: null,
        },
        characterCount:{
            type:Number,
            default:0,
        },
        characterLimit:{
            type:Number,
            default:0,
        },
        labelClass:{
            type:String,
            default:"block text-sm font-medium text-gray-700"
        },
        charLimitClass:{
            type:String,
            default:"text-sm text-gray-500"
        },
        inputClass:{
            type:String,
            default:"appearance-none block w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 md:text-md text-sm"
        }
    },
    setup(props, context) {
        const {updateValue} = SetupFormComponent(props, context)
        const uuid = UniqueID().getID()

        return {
            updateValue,
            uuid

        }
    }
};
</script>
