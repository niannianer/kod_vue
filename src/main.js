import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'flex.css/dist/flex.css';
import './less/base.less';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
router.beforeEach((to, from, next) => {
    console.log(12345);
    next();
});
router.afterEach((to, from) => {
    console.log(54321);
})
