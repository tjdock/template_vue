import axios from 'axios';
import * as TYPES from '../types';
import router from '../../router';

const state = {
    realname: null
};

const getters = {
    realname(state) {
        state.realname = TYPES.getCookie('realname');
        return state.realname;
    }
};

const mutations = {
    [TYPES.SET_USER](state, payload) {

        state.realname = payload.realname;
        //state.token = payload.token;

        let Days = payload.expires_in * 1000;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days);
        document.cookie = "token=" + payload.token + ";expires=" + exp.toUTCString();

        // 设置用户名
        document.cookie = "realname=" + payload.realname + ";";
    },
    [TYPES.LOGOUT](state) {
        TYPES.delCookie('token');
        TYPES.delCookie('realname');

        state.token = null;
        state.realname = null;
    }
};

const actions = {
    signinUser: ({commit, state, rootState}, payload) => {
        axios.post('userlogin/login.action', payload)
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    commit(TYPES.SET_USER, res.data);
                    commit(TYPES.SET_TOKEN, res.data.token);

                    router.replace('/user/my-cars');
                }
            })
    },
    logout: ({commit}) => {
        commit(TYPES.LOGOUT);

        router.replace('/user/login');
    },
    findPasswordCode: ({commit}, payload) => {
        axios.post('valicode/forgetpwd.action', payload)
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    console.log(res.data);
                }
            })
    },
    findPassword: ({commit}, payload) => {
        axios.post('userlogin/forgetpwd.action', payload)
            .then(res => {
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    alert('修改成功');
                }
            })
    },
    editPassword: ({commit}, payload) => {
        axios.post('user/base_modpwd.action', payload,
            {
                headers: {token: state.token}
            })
            .then(res => {
                console.log(res);
                if (res.data.success != 1) {
                    alert(res.data.errorMsg);
                } else {
                    alert('修改成功');
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


