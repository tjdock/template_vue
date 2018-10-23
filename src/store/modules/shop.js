import axios from 'axios';
import * as TYPES from '../types';

const state = {
    shops: [],
    shop: {},
    storeid: {storeid: -1}
};

const getters = {
    shops: (state) => {
        return state.shops;
    },
    shop: (state) => {
        return state.shop;
    },
    storeid: (state) => {
        return state.storeid;
    },
    imgsCount: (state) => {
        return state.shop.imgs ? state.shop.imgs.length : 0;
    }
};

const mutations = {
    [TYPES.SET_SHOPS](state, payload) {
        state.shops = payload;
    },
    // [TYPES.SET_IMGSITE](state, payload) {
    //     state.imgsite = payload;
    // },
    [TYPES.SET_SHOP](state, payload) {
        state.shop = payload;
    },
    [TYPES.SET_STOREID](state, payload) {
        state.storeid = payload;
    }
};

const actions = {
    getShops: ({commit}) => {
        axios.get('store/storeList.action')
            .then(res => {
                commit(TYPES.SET_SHOPS, res.data.stores);
                commit(TYPES.SET_IMGSITE, res.data.imgsite);
            });
    },
    getShop: ({commit}, payload) => {
        axios.get('store/storeinfo.action', {params: payload})
            .then(res => {
                commit(TYPES.SET_SHOP, res.data.store);
                commit(TYPES.SET_IMGSITE, res.data.imgsite);
                commit(TYPES.SET_STOREID, payload);
            });
    },
    resetStoreid: ({commit}) => {
        commit(TYPES.SET_STOREID, {storeid: -1});
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}