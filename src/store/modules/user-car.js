import * as TYPES from "../types";
import axios from "axios/index";

const state = {
    myCars: []
};

const getters = {
    myCars() {
        return state.myCars;
    }
};

const mutations = {
    [TYPES.SET_MY_CARS](state, payload) {
        state.myCars = payload;
    }
};

const actions = {
    getMyCars: ({commit, rootState}, payload) => {
        axios.post('user/car_carList.action', payload,
            {
                headers: {token: rootState.token}
            })
            .then(res => {

                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    commit(TYPES.SET_MY_CARS, res.data.cars);
                    commit(TYPES.SET_IMGSITE, res.data.imgsite);
                }
            })
    },
    setMyCarDefault: ({commit, rootState}, payload) => {
        axios.post('user/car_defaultCar.action', payload,
            {
                headers: {token: rootState.token}
            })
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    console.log(res);
                }
            })
    },
    deleteMyCar: ({commit, rootState, dispatch}, payload) => {
        axios.post('user/car_deleteCar.action', payload,
            {
                headers: {token: rootState.token}
            })
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    dispatch('getMyCars');
                }
            })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}