<template>
    <div>
        <router-view :key="$route.fullPath"/>
        <CookieModal :isModalOpen="isModalOpen" @close="closeModal"/>
    </div>
</template>
<script setup>
/*
The :key="$route.fullPath option on the router-view ensures that the router
reloads pages whose base URL is the same but the query parameter is different
The default is not so /users/1 changing to /users/2 will not trigger a reload
normally. This option forces vue router to assess the whole URL in order to know#
when to reload
 */


import CookieModal from "./components/CookieModal.vue";

import {ref} from "vue";

const isModalOpen = ref(true);
const closeModal = () => {
    //console.log("here")
    isModalOpen.value = false
}
</script>


