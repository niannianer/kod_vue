import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Index = resolve => require(['../containers/Index'], resolve);
const Financial = resolve => require(['../containers/Financial'], resolve);
const My = resolve => require(['../containers/My'], resolve);
const Login = resolve => require(['../containers/Login'], resolve);
let routes = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: Index
    }, {
        path: '/financial',
        name: 'financial',
        meta: {
            title: '理财'
        },

        component: Financial
    }, {
        path: '/my',
        name: 'my',
        meta: {
            title: '我的'
        },
        component: My,
        beforeEnter: (to, from, next) => {
            // ...
            console.log('my');
            next();
        }
    }, {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: Login,
    }
];
routes.push({
    path: '*',
    redirect: '/financial'
});
export default new Router({
    mode: 'history',
    routes
})
