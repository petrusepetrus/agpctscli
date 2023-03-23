<template>
    <component
          v-for="option in options"
          :key="option.value"
          :is="vertical ? 'div' : 'span'"
          :class="{
      'horizontal': !vertical
    }"
    >
        <BaseRadio
              :input-class="option.inputClass"
              :label="option.label"
              :label-class="option.labelClass"
              :label-description="option.labelDescription"
              :label-description-class="option.labelDescriptionClass"
              :value="option.value"
              :modelValue="modelValue"
              :name="name"
              @update:modelValue="$emit('update:modelValue', $event)"
        />
    </component>
</template>

<script>
import BaseRadio from "./BaseRadio.vue";
export default {
    name:"BaseRadioGroup",
    components:{
        BaseRadio,
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        vertical: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.horizontal {
    margin-right: 20px;
}
</style>