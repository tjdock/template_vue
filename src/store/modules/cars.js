import axios from 'axios';
import * as TYPES from '../types';

const state = {
    brands: [],
    keyOfBrand: '',
    carVehicle: [],
    keyOfVehicle: '',
    carDisplacement: [],
    keyOfDisplacement: '',
    carYear: [],
    keyOfYear: '',
    carStyle: [],
    keyOfStyle: ''
};

const getters = {
    brands() {
        let temp = [];
        state.brands.forEach(item => {
            item.list.forEach(brand => {
                temp.push(brand);
            })
        });
        return temp.filter(item => {
            return item.brandname.match(state.keyOfBrand)
        });
    },
    keyOfBrand() {
        return state.keyOfBrand;
    },
    carVehicle() {
        let temp = [];
        state.carVehicle.forEach(item => {
            item.list.forEach(vehicle => {
                temp.push(vehicle);
            })
        });
        return temp.filter(item => {
            return item.vehiclename.match(state.keyOfVehicle);
        });
    },
    carDisplacement() {
        return state.carDisplacement.filter(item => {
            return item.engine_capacity.match(state.keyOfDisplacement);
        });
    },
    carYear() {
        return state.carYear.filter(item => {
            return item.productYear.toString().match(state.keyOfYear);
        });
    },
    carStyle() {
        return state.carStyle.filter(item => {
            return item.carstyle.match(state.keyOfStyle);
        });
    }
};

const mutations = {
    [TYPES.SET_BRANDS](state, payload) {
        state.brands = payload;
    },
    [TYPES.SET_KEY_BRANDS](state, payload) {
        state.keyOfBrand = payload;
    },
    [TYPES.SET_CAR_VEHICLE](state, payload) {
        state.carVehicle = payload;
    },
    [TYPES.SET_KEY_VEHICLE](state, payload) {
        state.keyOfVehicle = payload;
    },
    [TYPES.SET_CAR_DISPLACEMENT](state, payload) {
        state.carDisplacement = payload;
    },
    [TYPES.SET_KEY_DISPLACEMENT](state, payload) {
        state.keyOfDisplacement = payload;
    },
    [TYPES.SET_CAR_YEAR](state, payload) {
        state.carYear = payload;
    },
    [TYPES.SET_KEY_YEAR](state, payload) {
        state.keyOfYear = payload;
    },
    [TYPES.SET_CAR_STYLE](state, payload) {
        state.carStyle = payload;
    },
    [TYPES.SET_KEY_STYLE](state, payload) {
        state.keyOfStyle = payload;
    }
};

const actions = {
    getBrands: ({commit}) => {
        axios.get('car/car_getCarBrands.action')
            .then(res => {
                commit(TYPES.SET_BRANDS, res.data.carBrands);
                commit(TYPES.SET_IMGSITE, res.data.imgsite);
            })
    },
    setKeyOfBrand: ({commit}, payload) => {
        commit(TYPES.SET_KEY_BRANDS, payload);
    },
    getVehicle: ({commit}, payload) => {
        axios.post('car/car_getCarVehicle.action', payload)
            .then(res => {
                console.log(res);
                commit(TYPES.SET_CAR_VEHICLE, res.data.carVehicle);

                commit(TYPES.SET_CAR_DISPLACEMENT, []);
                commit(TYPES.SET_CAR_YEAR, []);
                commit(TYPES.SET_CAR_STYLE, []);
            })
    },
    setKeyOfVehicle: ({commit}, payload) => {
        commit(TYPES.SET_KEY_VEHICLE, payload);
    },
    getDisplacement: ({commit}, payload) => {
        axios.post('car/car_getPailiang.action', payload)
            .then(res => {
                commit(TYPES.SET_CAR_DISPLACEMENT, res.data.paiLiang);

                commit(TYPES.SET_CAR_YEAR, []);
                commit(TYPES.SET_CAR_STYLE, []);
            })

    },
    setKeyOfDisplacement: ({commit}, payload) => {
        commit(TYPES.SET_KEY_DISPLACEMENT, payload);
    },
    getYear: ({commit}, payload) => {
        axios.post('car/car_getProductYear.action', payload)
            .then(res => {
                commit(TYPES.SET_CAR_YEAR, res.data.year);

                commit(TYPES.SET_CAR_STYLE, []);
            })

    },
    setKeyOfYear: ({commit}, payload) => {
        commit(TYPES.SET_KEY_YEAR, payload);
    },
    getStyle: ({commit}, payload) => {
        axios.post('car/car_getCarStyle.action', payload)
            .then(res => {
                commit(TYPES.SET_CAR_STYLE, res.data.carStyle);
            })
    },
    setKeyOfStyle: ({commit}, payload) => {
        commit(TYPES.SET_KEY_STYLE, payload);
    },
    addCar: ({commit, rootState}, payload) => {
        axios.post('user/car_addCar.action', payload,
            {
                headers: {token: rootState.token}
            })
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    alert('添加成功');
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