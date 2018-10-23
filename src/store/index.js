import Vue from 'vue';
import Vuex from 'vuex';
import shop from './modules/shop';
import user from './modules/user';
import cars from './modules/cars';
import userCar from './modules/user-car';
import * as TYPES from './types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        imgsite: ''
    },
    getters:{
        isAuthenticated(state) {
            state.token = TYPES.getCookie('token');
            return state.token !== null;
        },
        imgsite: (state) => {
            return state.imgsite;
        },
    },
    mutations: {
        [TYPES.SET_TOKEN](state, payload) {
            state.token = payload;
        },
        [TYPES.SET_IMGSITE](state, payload) {
            state.imgsite = payload;
        },
    },
    modules: {
        shop,
        user,
        cars,
        userCar
    }
})