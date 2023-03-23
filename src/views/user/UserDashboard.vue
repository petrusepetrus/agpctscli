<template>
    <div>
        <Navbar></Navbar>
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome to the user dashboard</p>
        </div>
    </div>


</template>

<script setup>
import useAuthService from "../../services/useAuthService.js";
const {callUserAPI} = useAuthService()

import {useAuthStore} from "../../stores/AuthStore";
import {storeToRefs} from "pinia";
import UserList from "./UsersList.vue";
import Navbar from "../../components/layout/Navbar.vue";

const authStore = useAuthStore()
const {user,authenticated,verified} = storeToRefs(authStore)

let response= callUserAPI()
try{
    ////console.log(response.data)
    //user.value =response.data
    //authenticated.value = true
    //verified.value = !!response.data.email_verified_at;
}catch(e){

}



</script>

<style scoped>

</style>