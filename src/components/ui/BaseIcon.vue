<template>
    <component
          v-if="icon"
          :is="getComponent"

    />
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
    components:{

    }
    /*import {
    RiBold,
    RiItalic,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiStrikethrough2,
    RiUnderline,
    RiSubscript2,
    RiSuperscript2,
    RiCodeView,
    RiArrowGoForwardLine,
    RiArrowGoBackLine,
    RiParagraph,
    RiListUnordered,
    RiListOrdered,
    RiCodeBoxLine,
    RiDoubleQuotesL,
    RiSeparator,
} from 'vue-remix-icons'
 */
    name: "BaseIcon",
    props: {
        icon: {
            type: String,
            default: '',
        },
        fill: {
            type: Boolean,
            default: true,
        }
    },
    computed:{
        getComponent(){
            let componentName="Ri" + ${icon} + ${fill?'fill':'line'}
            return defineAsyncComponent(()=>import(componentName from 'vue-remix-icons'))
        }
    }

}
</script>

<style scoped>

</style>