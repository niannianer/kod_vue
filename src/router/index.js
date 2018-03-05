import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)

const Index = () => import('../containers/Index');
const Financial = () => import('../containers/Financial');
const Login = () => import('../containers/Login');
const PersonalCenter = () => import('../containers/PersonalCenter');
const Register = () => import('../containers/Register');


import {setTitle} from '../tools/operation';
let beforeEach = ((to, from, next) => {
    if (store.state.userId) {
        next()
    } else {
        store.dispatch('getAccountBaofoo')
            .then(data => {
                if (data.code == '401') {
                    logout();
                } else {
                    next()
                }
            });
    }
})
let routes = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '金疙瘩',
            withoutLogin: true

        },
        component: Index
    }, {
        path: '/financial',
        name: 'financial',
        meta: {
            title: '理财',
            withoutLogin: true
        },
        component: Financial
    },
     {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            withoutLogin: true
        },
        component: Login,
    },
    {
        path: '/pension-share',
        name: 'pension-share',
        meta: {
            title: '金疙瘩-懂你，懂理顾，更懂理财'
        },
        component: Index
    },
    {
        path: '/house-share',
        name: 'house-share',
        meta: {
            title: '金疙瘩-懂你，懂理顾，更懂理财'
        },
        component: Index
    },
    {
        path: '/personal-center',
        name: 'personal-center',
        component: PersonalCenter,
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册',
            withoutLogin: true
        }
    }
];
import $device from '../tools/device';
import requestHybrid from '../tools/hybrid';
routes.map(route => {
    if (route.beforeEnter) {
        return false;
    }
    route.beforeEnter = (to, from, next) => {
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if ($device.kingold && title) {
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 1,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 0,
                    title,
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            })
        }

        if (!route.meta.withoutLogin) {
            return beforeEach(to, from, next);
        } else {
            next();
        }
    };
});
import fundRoutes from './fund';
routes = routes.concat(fundRoutes);
routes.push({
    path: '*',
    redirect: '/personal-center'
});
export default new Router({
    mode: 'history',
    routes
})
