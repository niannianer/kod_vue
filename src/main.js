import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';
import FastClick from 'fastclick';
import _ from 'lodash/core';
import store from './store';
import 'flex.css/dist/flex.css';
import './less/base.less';
_.forEach(filters, (fun, key) => {
    Vue.filter(key, fun);
});
window.shareUrl = window.location.href;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
store.dispatch('getAccountBaofoo');
store.dispatch('getBankInfo');
store.dispatch('getUserInfo');
store.dispatch('getExperienceSum');
window.onload = () => {
    FastClick.attach(document.body);
};
