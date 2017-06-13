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
const ReserveProfessionalList =resolve => require(['../containers/ReserveProfessionalList'], resolve);
const Reward = resolve => require(['../containers/Reward'], resolve);
const MyCount = resolve => require(['../containers/MyCount'], resolve);
const InvitationRewardDetal = resolve => require(['../containers/InvitationRewardDetal'], resolve);
const InvestList = resolve => require(['../containers/InvestList'], resolve);
const RewardDetail = resolve => require(['../containers/RewardDetail'], resolve);
const InvestDetail = resolve => require(['../containers/InvestDetail'], resolve);
const InvitationRewardList = resolve => require(['../containers/InvitationRewardList'], resolve);
const InvitationAllowanceList = resolve => require(['../containers/InvitationAllowanceList'], resolve);
const AccountDetail = resolve => require(['../containers/AccountDetail'], resolve);
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

    },{
        path: '/reserve-professional-list',
        name: 'reserve-professional-list',
        meta: {
            title: '专职理财师预约单管理'
        },
        component: ReserveProfessionalList

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
            title: '奖励细则'
        },
        component: RewardDetail

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
            //投资列表
            title: '定期理财列表',
            keepAlive: true
        },
        component: InvestList
    },
    {
        path: '/invest-detail',
        name: 'invest-detail',
        meta: {
            title: '投资详情'
        },
        component: InvestDetail

    },
    {
        path: '/invitation-reward-list',
        name: 'invitation-reward-list',
        meta: {
            title: '邀请奖励列表'
        },
        component: InvitationRewardList

    },
    {
        path: '/invitation-reward-detal',
        name: 'invitation-reward-detal',
        meta: {
            title: '邀请奖励详情'
        },
        component: InvitationRewardDetal

    },
    {
        path: '/account-detail',
        name: 'account-detail',
        meta: {
            title: '账户明细'
        },
        component: AccountDetail

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
        component: InvitationAllowanceList

    },
    {
        path: '/pension-one',
        name: 'pension-one',
        meta: {
            title: '养老理财规划'
        },
        component: Index

    },
    {
        path: '/pension-two',
        name: 'pension-two',
        meta: {
            title: '养老理财规划'
        },
        component: Index

    }, {
        path: '/pension-three',
        name: 'pension-three',
        meta: {
            title: '养老理财规划'
        },
        component: Index

    },
    {
        path: '/pension-four',
        name: 'pension-four',
        meta: {
            title: '养老理财规划'
        },
        component: Index

    },
    {
        path: '/pension-five',
        name: 'pension-five',
        meta: {
            title: '养老理财规划'
        },
        component: Index
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
        path: '/house-one',
        name: 'house-one',
        meta: {
            title: '住房理财规划'
        },
        component: Index
    },
    {
        path: '/house-two',
        name: 'house-two',
        meta: {
            title: '住房理财规划'
        },
        component: Index
    },
    {
        path: '/house-three',
        name: 'house-three',
        meta: {
            title: '住房理财规划'
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
