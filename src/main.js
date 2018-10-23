import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://wx.bjlxhqx.com/api/';
axios.defaults.headers = {'Content-type': 'application/x-www-form-urlencoded'};
axios.defaults.transformRequest = [function (data) {
    let body = '';
    for (const k in data) {
        if (k) {
            body += k + '=' + data[k] + '&';
        }
    }

    body = body.replace(/&$/g, '');
    return body;
}];

Vue.use(Vuelidate);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
