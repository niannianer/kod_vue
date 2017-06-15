import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';
import FastClick from 'fastclick';
import _ from 'lodash/core';

import store from './store';
import {setTitle} from './tools/operation';
import 'flex.css/dist/flex.css';
import './less/base.less';


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
_.forEach(filters, (fun, key) => {
    Vue.filter(key, fun);
});
import {Toast} from 'mint-ui';
router.afterEach((to, from) => {
    console.log(from)
    let {meta} = to;
    let {title} = meta;
    setTitle(title);
    if(!from.name){
        store.dispatch('getAccountBaofoo')
            .then(data=>{
                Toast(JSON.stringify(data));
            });
        store.dispatch('getBankInfo');
        store.dispatch('getUserInfo');
    }

});
store.dispatch('getAccountBaofoo');
store.dispatch('getBankInfo');
store.dispatch('getUserInfo');
window.onload = () => {
    FastClick.attach(document.body);
}
