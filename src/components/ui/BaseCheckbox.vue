<template>
    <div class="relative flex items-start">
        <div class="flex items-center h-5">
            <input
                  v-bind="{
            ...$attrs,
            onInput:updateValue
             }"
                  :id="id"
                  :class="inputClass"
                  type="checkbox"
                  :name="name"
                  :checked="modelValue"
                  :disabled="disabled?true:null"
                  @change="$emit('update:modelValue', $event.target.checked)"
            />
        </div>
        <div class="ml-3 text-sm">
            <label
                  v-if="label"
                  :class="labelClass">{{ label }}</label>
            <span v-if="required" class="text_sm text-red-500">*</span>
            <p
                  v-if="labelDescription"
                  :class="labelDescriptionClass">{{ labelDescription }}</p>
        </div>
    </div>
    <BaseInputErrorMessage
          v-if="error"
          :id="`${uuid}-error`"
    >
        {{ error }}
    </BaseInputErrorMessage>


</template>

<script>
import BaseInputErrorMessage from "./BaseInputErrorMessage.vue";
import UniqueID from "../../utils/UniqueID.js";
import SetupFormComponent from "../../utils/SetupFormComponent.js";

export default {
    name: "BaseCheckbox",
    components: {
        BaseInputErrorMessage
    },
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        labelDescription: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        id: {
            type: [Number, String],
            default: ""
        },
        error: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        labelClass: {
            type: String,
            default: "font-medium text-gray-700"
        },
        labelDescriptionClass: {
            type: String,
            default: "text-gray-500"
        },
        inputClass: {
            type: String,
            default: "h-4 w-4 focus:ring-teal-500 focus:border-teal-500 rounded"
        }
    },
    emits: ['update:modelValue'],
    setup(props, context) {
        const {updateValue} = SetupFormComponent(props, context)
        const uuid = UniqueID().getID()
        return {
            uuid,
            updateValue
        }
    }
}
</script>