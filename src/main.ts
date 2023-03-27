import {createApp, watch} from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'

import router from "./router";
import axios from 'axios'
import './index.css'
import hasRole from './directives/HasRoleDirective.js';
import {useAuthStore} from "./stores/AuthStore.js";
import { VueReCaptcha } from "vue-recaptcha-v3"


axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN
axios.defaults.withCredentials = true

const app = createApp(App)

app.use(createPinia())
app.use(VueReCaptcha, {
    siteKey: "6Ld5f2wkAAAAABi23Ltoh7jdrEMdj5RiQyPl3C16",
    loaderOptions: {
        useRecaptchaNet: true,
        autoHideBadge: true
    }
})



//window.onload = () => {
//    if (shouldShowPopup()) {
//        const consent = confirm('Agree to the terms and conditions')
//        if (consent) {
//            saveToStorage()
//        }
//    }
//}
/*
See if we have any persisted auth credentials in local storage and if so
rehydrate the authStore
 */
const authStore = useAuthStore()


if (localStorage.getItem('authStore')) {
    const returnedState = JSON.parse(localStorage.getItem('authStore'))
    authStore.authenticated = returnedState.authenticated
    authStore.verified = returnedState.verified
    authStore.user = returnedState.user
    authStore.userRoles = returnedState.userRoles
    authStore.permissions = returnedState.userPermissions
}
/*
Subscribe to the authStore and watch for changes to the store state
If a change occurs, store the new state to local storage to rehydrate
the store when necessary
 */
authStore.$subscribe((mutation, state) => {
    localStorage.setItem('authStore', JSON.stringify(state))
}, {detached: true})

app.use(router)
app.directive('hasRole', hasRole);
app.mount('#app')
