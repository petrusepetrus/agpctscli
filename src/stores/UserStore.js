import {defineStore} from "pinia";

export const useUserStore = defineStore('UserStore', {
    state() {
        return {
            verified: false,
            user:{},
            userRoles:{},
            userPermissions:{},
            userAddresses: {},
            userPhones:{},
            userTypes:{},
            notificationPreferences:{},
            userNotificationTopics:{}
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUserAddresses(state) {
            return state.userAddresses
        },
        getUserPhones(state) {
            return state.userPhones
        },
        getUserAddressByID: (state) => {
            return userAddressId => state.userAddresses.find((userAddress) => userAddress.id === userAddressId)
        },
    },
    actions: {}
})