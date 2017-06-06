import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Index = resolve => require(['../containers/Index'], resolve);
const Financial = resolve => require(['../containers/Financial'], resolve);
const MyAssets = resolve => require(['../containers/MyAssets'], resolve);
const Login = resolve => require(['../containers/Login'], resolve);
const Recharge = resolve => require(['../containers/Recharge'], resolve);
const Withdraw =resolve => require(['../containers/Withdraw'], resolve);
const ReserveList =resolve => require(['../containers/ReserveList'], resolve);
const ReserveDetail =resolve => require(['../containers/ReserveDetail'], resolve);
const Reward = resolve => require(['../containers/Reward'], resolve);
const MyCount = resolve => require(['../containers/MyCount'], resolve);

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
        path: '/my-assets',
        name: 'my-assets',
        meta: {
            title: '我的资产'
        },
        component: MyAssets,
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
    }, {
        path: '/recharge',
        name: 'recharge',
        meta: {
            title: '充值'
        },
        component: Recharge

    }
    , {
        path: '/withdraw',
        name: 'withdraw',
        meta: {
            title: '提现'
        },
        component: Withdraw

    },{
        path: '/reserve-list',
        name: 'reserve-list',
        meta: {
            title: '预约单管理'
        },
        component: ReserveList

    },{
        path: '/reserve-detail',
        name: 'reserve-detail',
        meta: {
            title: '预约单详情'
        },
        component: ReserveDetail

    }, {
        path: '/reward',
        name: 'reward',
        meta: {
            title: '我的奖励'
        },
        component: Reward

    }, {
        path: '/reward-detail',
        name: 'reward-detail',
        meta: {
            title: '奖励明细'
        },
        component: Reward

    }, {
        path: '/my-count',
        name: 'my-count',
        meta: {
            title: '我的银行卡'
        },
        component: MyCount

    },
     {
        path: '/invest-list',
        name: 'invest-list',
        meta: {
            title: '投资列表'
        },
        component: Index

    },
    {
        path: '/invest-detail',
        name: 'invest-detail',
        meta: {
            title: '投资详情'
        },
        component: Index

    },
    {
        path: '/invitation-reward-list',
        name: 'invitation-reward-list',
        meta: {
            title: '邀请奖励列表'
        },
        component: Index

    },
    {
        path: '/invitation-reward-detal',
        name: 'invitation-reward-detal',
        meta: {
            title: '邀请奖励详情'
        },
        component: Index

    },
    {
        path: '/account-detal',
        name: 'account-detal',
        meta: {
            title: '账户明细'
        },
        component: Index

    },
    {
        path: '/invitation-allowance',
        name: 'invitation-allowance',
        meta: {
            title: '邀请津贴'
        },
        component: Index

    },
    {
        path: '/invitation-allowance-list',
        name: 'invitation-allowance-list',
        meta: {
            title: '邀请津贴列表'
        },
        component: Index

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
