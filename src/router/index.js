import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import Index from '../containers/Index';
import Financial from '../containers/Financial';
import MyAssets from '../containers/MyAssets';
import Login from '../containers/Login';
import Recharge from '../containers/Recharge';
import Withdraw from '../containers/Withdraw';
import ReserveList from '../containers/ReserveList';
import ReserveDetail from '../containers/ReserveDetail';
import ReserveProfessionalList from '../containers/ReserveProfessionalList';
import Reward from '../containers/Reward';
import MyCount from '../containers/MyCount';
import InvitationRewardDetal from '../containers/InvitationRewardDetal';
import InvestList from '../containers/InvestList';
import RewardDetail from '../containers/RewardDetail';
import InvestDetail from '../containers/InvestDetail';
import InvitationRewardList from '../containers/InvitationRewardList';
import InvitationAllowanceList from '../containers/InvitationAllowanceList';
import InvestSucc from '../containers/InvestSucc';
import AccountDetail from '../containers/AccountDetail';
import PensionTwo from '../containers/PensionTwo';
import PensionThree from '../containers/PensionThree';
import PensionFour from '../containers/PensionFour';
import PensionOne from '../containers/PensionOne';
import PensionFive from '../containers/PensionFive';
import PersonalCenter from '../containers/PersonalCenter';
import ProductSubscription from '../containers/ProductSubscription'
import RiskAssessment from '../containers/RiskAssessment';
import AssessmentResult from '../containers/AssessmentResult';
import RelationList from '../containers/RelationList';
import Relation from '../containers/Relation';
import HouseTwo from '../containers/HouseTwo';
import HouseThree from '../containers/HouseThree';
import Planning from '../containers/Planning'
import GoodsDetailPRIF from '../containers/GoodsDetailPRIF'
const HouseOne = PensionOne;

import Register from '../containers/Register';
import FindPassword from '../containers/FindPassword';
import FixiGoodsDetail from '../containers/FixiGoodsDetail';
import {setTitle} from '../tools/operation';
let beforeEach = ((to, from, next) => {
    let {meta} = to;
    if (meta.withoutLogin) {
        next();
    } else {
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
            store.dispatch('getBankInfo');
            store.dispatch('getUserInfo');
        }
    }
})
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
            title: '理财',
            withoutLogin: true
        },
        component: Financial
    }, {
        path: '/fixi-goods-detail',
        name: 'fixi-goods-detail',
        meta: {
            title: '理财详情',
            withoutLogin: true
        },
        component: FixiGoodsDetail
    }, {
        path: '/my-assets',
        name: 'my-assets',
        meta: {
            title: '我的资产'
        },
        component: MyAssets
    }, {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            withoutLogin: true
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
    }, {
        path: '/reserve-list',
        name: 'reserve-list',
        meta: {
            title: '预约单管理',
            keepAlive: true
        },
        component: ReserveList
    }, {
        path: '/reserve-detail',
        name: 'reserve-detail',
        meta: {
            title: '预约单详情'
        },
        component: ReserveDetail
    }, {
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
        path: '/planning',
        name: 'planning',
        meta: {
            title: '综合投资规划',
            withoutLogin: true
        },
        component: Planning
    },
    {
        path: '/pension-one',
        name: 'pension-one',
        meta: {
            title: '养老理财规划',
            withoutLogin: true
        },
        component: PensionOne
    },
    {
        path: '/pension-two',
        name: 'pension-two',
        meta: {
            title: '养老理财规划',
            withoutLogin: true,
            keepAlive: true

        },
        component: PensionTwo
    }, {
        path: '/pension-three',
        name: 'pension-three',
        meta: {
            title: '养老理财规划',
            withoutLogin: true,
        },
        component: PensionThree
    },
    {
        path: '/pension-four',
        name: 'pension-four',
        meta: {
            title: '养老理财规划',
            withoutLogin: true
        },
        component: PensionFour
    },
    {
        path: '/pension-five',
        name: 'pension-five',
        meta: {
            title: '养老理财规划',
            withoutLogin: true
        },
        component: PensionFive
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
            title: '住房理财规划',
            withoutLogin: true
        },
        component: HouseOne
    },
    {
        path: '/product-subscription',
        name: 'product-subscription',
        meta: {
            title: '认购信息确认'
        },
        component: ProductSubscription
    },
    {
        path: '/invest-succ',
        name: 'invest-succ',
        meta: {
            title: '购买成功'
        },
        component: InvestSucc
    },
    {
        path: '/house-two',
        name: 'house-two',
        meta: {
            title: '住房理财规划',
            withoutLogin: true
        },
        component: HouseTwo,
    },
    {
        path: '/house-three',
        name: 'house-three',
        meta: {
            title: '住房理财规划',
            withoutLogin: true
        },
        component: HouseThree
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
            title: '个人中心',
            withoutLogin: true
        }
    },
    {
        path: '/risk-assessment/:type',
        name: 'risk-assessment',
        component: RiskAssessment,
        beforeEnter:(to, from, next)=>{
            if (store.state.investorRiskScore) {
                if(to.query.retest){
                    next();
                }else {
                    next({
                        path:'/assessment-result'
                    });
                }

            }else {
                store.dispatch('getUserInfo')
                    .then(data=>{
                        if(data.code!=200){
                            logout();
                            return false;
                        }
                        if(data.data.investorRiskScore>0){
                            if(to.query.retest){
                                next();
                            }else {
                                next({
                                    path:'/assessment-result'
                                });
                            }
                        }else {
                            next();
                        }

                    })
            }
        },
        meta: {
            title: '风险测评'
        }
    }, {
        path: '/assessment-result',
        name: 'assessment-result',
        component: AssessmentResult,
        meta: {
            title: '测评结果'
        }
    },
    {
        path: '/relation-list',
        name: 'relation-list',
        component: RelationList,
        meta: {
            title: '1度好友'
        }
    },
    {
        path:'/relation',
        name:'relation',
        component: Relation,
        meta:{
            title:'我的好友'
        }
    },
    {
        path:'/register',
        name:'register',
        component: Register,
        meta:{
            title:'注册',
            withoutLogin: true
        }
    },
    {
        path:'/find-password',
        name:'find-password',
        component: FindPassword,
        meta:{
            title:'找回密码',
            withoutLogin: true
        }
    },
    {
        path:'/goods-detail-prif',
        name:'goods-detail-prif',
        component: GoodsDetailPRIF,
        meta:{
            title:'项目详情',
            withoutLogin: true
        }
    }
];

routes.map(route => {
    route.beforeEnter = (to, from, next)=>{
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if (!route.meta.withoutLogin) {
          return  beforeEach(to, from, next);
        }else {
            next();
        }
    };
});
routes.push({
    path: '*',
    redirect: '/personal-center'
});
export default new Router({
    mode: 'history',
    routes
})
