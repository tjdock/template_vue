import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from './store'

Vue.use(Router);

export default new Router({
    routes: [
        {path: "/", name: "home", component: Home},
        {
            path: "/shop",
            component: () => import(/* webpackChunkName: "shop" */ './views/shop/ShopList.vue'),
            children: [
                {path: '', component: () => import(/* webpackChunkName: "shop" */ './views/shop/ShopStart.vue')},
                {path: ':id', component: () => import(/* webpackChunkName: "shop" */ './views/shop/ShopDetail.vue')},
            ]
        },
        {
            path: "/user/login",
            name: "login",
            component: () => import(/* webpackChunkName: "user" */ './views/user/Login.vue')
        },
        {
            path: "/user/signup",
            name: "signup",
            component: () => import(/* webpackChunkName: "user" */ './views/user/Signup.vue')
        },
        {
            path: "/user/find-password",
            name: "find-password",
            component: () => import(/* webpackChunkName: "user" */ './views/user/FindPassword.vue')
        },
        {
            path: "/user/edit-password",
            name: "edit-password",
            component: () => import(/* webpackChunkName: "user" */ './views/user/EditPassword.vue'),
            beforeEnter: (to, from, next) => {
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next('/user/login');
                }
            }
        },
        {
            path: "/user/my-cars",
            name: "my-cars",
            component: () => import(/* webpackChunkName: "user" */ './views/user/MyCars.vue'),
            beforeEnter: (to, from, next) => {
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next('/user/login');
                }
            }
        },
        {
            path: "/user/add-cars",
            name: "add-cars",
            component: () => import(/* webpackChunkName: "user" */ './views/user/AddCar.vue'),
            beforeEnter: (to, from, next) => {
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next('/user/login');
                }
            }
        },
        {path: '*', redirect: '/'}
    ],
    //mode: 'history'
});
