<template>
    <component
          :is="
            require(`vue-remix-icons/icons/ri-${icon}-${fill ? 'fill' : 'line'}.js`)
            .default
            "
          v-if="icon"
    />
</template>

<script>
export default {
    props: {
        icon: String,
        fill: Boolean,
    },
}
</script>

<style scoped>

</style>