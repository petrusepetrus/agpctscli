import {createRouter, createWebHistory} from "vue-router"
import {useAuthStore} from "../stores/AuthStore";
import {storeToRefs} from 'pinia'
import {hasRole} from "../utils/RolesAndPermissions.js";


const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/public/Home.vue"),
        alias:'/home'
    },
    {
        path: "/about-me",
        name: "about-me",
        component: () => import("../views/public/AboutMe.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/Login.vue"),
    },
    //{
    //    path: "/register",
    //    name: "register",
    //    component: () => import("../views/auth/Register.vue"),
    //},

    {
        path: "/invite-registration",
        name: "invite-registration",
        component: () => import("../views/auth/RegisterByInvitation.vue"),
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("../views/auth/ForgotPassword.vue"),
    },
    {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("../views/auth/ResetPassword.vue"),
    },
    {
        path: "/verify-email",
        name: "verify-email",
        component: () => import("../views/auth/VerifyEmail.vue"),
    },
    {
        path: "/user-dashboard",
        name: "user-dashboard",
        beforeEnter: [authenticationGuard],
        component: () => import("../views/user/UserDashboard.vue"),
    },
    {
        path: "/user-profile/:userID",
        name: "user-profile",
        component: () => import("../views/user/UserProfile.vue"),
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            const {authenticated} = storeToRefs(authStore)

            if (authenticated.value === true) {
                if ((Number(authStore.user.id) === Number(to.params.userID)) || (hasRole(['admin', 'super admin']))) {
                    //console.log("valid")
                    next()
                } else {
                    //console.log("invalid")
                    action401(to,from,next)
                }
            } else {
                //console.log("invalid")
                action401(to,from,next)
            }
        },
        props: true
    },
    {
        path: "/users",
        name: "users",
        beforeEnter: [authenticationGuard, adminGuard],
        component: () => import("../views/user/UsersList.vue")
    },
    {
        path: "/admin-dashboard",
        name: "admin-dashboard",
        beforeEnter: [authenticationGuard, adminGuard],
        component: () => import("../views/admin/AdminDashboard.vue")
    },
    {
        path: "/contact-me",
        name: "contact-me",
        component: () => import("../views/enquiry/EnquiryForm.vue")
    },
    {
        path: "/enquiry-confirmation",
        name: "enquiry-confirmation",
        component: () => import("../components/enquiry/entry/EnquiryConfirmation.vue")
    },
    {
        path: "/enquiry-review/:enquiryID",
        name: "enquiry-review",
        beforeEnter: [authenticationGuard, adminGuard],
        component: () => import("../views/enquiry/EnquiryReview.vue")
    },
    {
        path: "/enquiries",
        name: "enquiries",
        beforeEnter: [authenticationGuard, adminGuard],
        component: () => import("../views/enquiry/EnquiriesList.vue")
    },
    {
        path: "/data-usage-policy",
        name: "data-usage-policy",
        component: () => import("../views/public/DataUsagePolicy.vue")
    },
    {
        path: "/error/:errorCode/:errorTitle/:errorDescription",
        name: "httperror",
        component: () => import("../components/layout/HttpError.vue"),
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: "error",
        component: () => import("../components/layout/HttpError.vue"),
        props: {
            errorCode: 404,
            errorTitle: 'Page missing or undefined',
            errorDescription: 'There is no such page on this site.'
        }
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0};
        }
    },
})

function authenticationGuard(to, from, next) {
    const authStore = useAuthStore()
    const {authenticated} = storeToRefs(authStore)
    if (authenticated.value === true) {
        //console.log("authenticated - heading for " + to.fullPath)
        //console.log(to)
        next()
    } else {
        //console.log("routing to 401")
        action401(to,from,next)
    }
}

function adminGuard(to, from, next) {
    if (hasRole(['admin', 'super admin'])) {
        //console.log("admin or super admin - heading for " + to.fullPath)
        next()
    } else {
        //console.log("failed admin or super admin test")
        action401(to,from,next)
    }
}

function action401(to,from,next){
    next({
        name: 'httperror',
        params: {
            errorCode: 401,
            errorTitle: 'Not authorised',
            errorDescription: 'You are either not authorised for this function or your login credentials have expired. ' +
                'If you believe you should have access to this page then please log in again and retry. ' +
                'If that still fails then please request access via your designated contact.'
        }
    })
}

export default router