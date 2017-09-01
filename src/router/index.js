import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)

const AuthResult = () => import('../containers/AuthResult');
const AppointSucc = () => import('../containers/AppointSucc');
const ExperienceFund = () => import('../containers/ExperienceFund');
const Index = () => import('../containers/Index');
const Financial = () => import('../containers/Financial');
const MyAssets = () => import('../containers/MyAssets');
const MakeAppointment = () => import('../containers/MakeAppointment');
const Login = () => import('../containers/Login');
const Recharge = () => import('../containers/Recharge');
const Withdraw = () => import('../containers/Withdraw');
const ReserveList = () => import('../containers/ReserveList');
const ReserveDetail = () => import('../containers/ReserveDetail');
const ReserveProfessionalList = () => import('../containers/ReserveProfessionalList');
const Reward = () => import('../containers/Reward');
const TicketList = () => import('../containers/TicketList');
const TicketAug = () => import('../containers/TicketAug');
const UsableFinancial = () => import('../containers/UsableFinancial');
const MyCount = () => import('../containers/MyCount');
const InvitationRewardDetal = () => import('../containers/InvitationRewardDetal');
const InvestList = () => import('../containers/InvestList');
const RewardDetail = () => import('../containers/RewardDetail');
const InvestDetail = () => import('../containers/InvestDetail');
const InvitationRewardList = () => import('../containers/InvitationRewardList');
const InvitationAllowanceList = () => import('../containers/InvitationAllowanceList');
const InvestSucc = () => import('../containers/InvestSucc');
const AccountDetail = () => import('../containers/AccountDetail');
const PensionTwo = () => import('../containers/PensionTwo');
const PensionThree = () => import('../containers/PensionThree');
const PensionFour = () => import('../containers/PensionFour');
const PensionOne = () => import('../containers/PensionOne');
const PensionFive = () => import('../containers/PensionFive');
const PersonalCenter = () => import('../containers/PersonalCenter');
const ProductSubscription = () => import('../containers/ProductSubscription');
const RiskAssessment = () => import('../containers/RiskAssessment');
const AssessmentResult = () => import('../containers/AssessmentResult');
const RelationList = () => import('../containers/RelationList');
const Relation = () => import('../containers/Relation');
const RelationListGold = () => import('../containers/RelationListGold');
const HouseTwo = () => import('../containers/HouseTwo');
const HouseThree = () => import('../containers/HouseThree');
const Helpcenter = () => import('../containers/Helpcenter');
const HelpcenterCate = () => import('../containers/HelpcenterCate');
const Planning = () => import('../containers/Planning');
const Authentication = () => import('../containers/Authentication');
const BindBankCard = () => import('../containers/BindBankCard');
const BankList = () => import('../containers/BankList');
const SetPayPassword = () => import('../containers/SetPayPassword');
const ResetPayPassword = () => import('../containers/ResetPayPassword');
const GoodsDetailPRIF = () => import('../containers/GoodsDetailPRIF');
const Register = () => import('../containers/Register');
const FindPassword = () => import('../containers/FindPassword');
const FixiGoodsDetail = () => import('../containers/FixiGoodsDetail');
const Feedback = () => import('../containers/Feedback');


const HouseOne = PensionOne;

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
        }
    }
})
let routes = [
    {
        path: '/appoint-succ',
        name: 'appoint-succ',
        meta: {
            title: '预约成功'
        },
        component: AppointSucc
    },
    {
        path: '/auth-result',
        name: 'auth-result',
        meta: {
            title: '宝付授权结果查询'
        },
        component: AuthResult
    },
    {
        path: '/experience-fund',
        name: 'experience-fund',
        meta: {
            title: '我的体验金'
        },
        component: ExperienceFund
    },
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
    }, {
        path: '/fixi-goods-detail',
        name: 'fixi-goods-detail',
        meta: {
            title: '产品详情',
            withoutLogin: true
        },
        component: FixiGoodsDetail
    },{
        path: '/feedback',
        name: 'feedback',
        meta: {
            title: '帮助中心',
        },
        component: Feedback
    },
    {
        path: '/my-assets',
        name: 'my-assets',
        meta: {
            title: '我的资产'
        },
        component: MyAssets
    }, {
        path: '/make-appointment',
        name: 'make-appointment',
        meta: {
            title: '添加预约客户',
            withoutLogin: true
        },
        component: MakeAppointment
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
        path: '/ticket-list',
        name: 'ticket-list',
        meta: {
            title: '我的优惠券'
        },
        component: TicketList
    }, {
        path: '/ticket-aug',
        name: 'ticket-aug',
        meta: {
            title: '送你一场红包雨'
        },
        component: TicketAug
    },
    {
        path: '/usable-financial',
        name: 'usable-financial',
        meta: {
            title: '可用产品'
        },
        component: UsableFinancial
    },
    {
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
        path: '/helpcenter',
        name: 'helpcenter',
        meta: {
            title: '帮助中心'
        },
        component: Helpcenter
    },
    {
        path: '/helpcenter-cate',
        name: 'helpcenter-cate',
        meta: {
            title: '帮助中心'
        },
        component: HelpcenterCate
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
        path: '/risk-assessment/:type',
        name: 'risk-assessment',
        component: RiskAssessment,
        beforeEnter: (to, from, next) => {
            let {meta} = to;
            let {title} = meta;
            setTitle(title);
            if (store.state.investorRiskScore) {
                if (to.query.retest) {
                    next();
                } else {
                    next({
                        path: '/assessment-result'
                    });
                }

            } else {
                store.dispatch('getUserInfo')
                    .then(data => {
                        if (data.code == 401) {
                            logout();
                            return false;
                        }
                        console.log('investorRiskScore---->', data.data.investorRiskScore)
                        if (data.data.investorRiskScore > 0) {
                            if (to.query.retest) {
                                next();
                            } else {
                                next({
                                    path: '/assessment-result'
                                });
                            }
                        } else {
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
        path: '/relation-list-gold',
        name: 'relation-list-gold',
        component: RelationListGold,
        meta: {
            title: '金疙瘩好友'
        }
    },
    {
        path: '/relation',
        name: 'relation',
        component: Relation,
        meta: {
            title: '我的好友'
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
    },
    {
        path: '/authentication',
        name: 'authentication',
        component: Authentication,
        meta: {
            title: '实名认证'
        }
    },
    {
        path: '/bind-bank-card',
        name: 'bind-bank-card',
        component: BindBankCard,
        meta: {
            title: '绑定银行卡',
            keepAlive: true,
        }
    },
    {
        path: '/bank-list',
        name: 'bank-list',
        component: BankList,
        meta: {
            title: '支持绑定的银行卡'
        }
    },
    {
        path: '/set-pay-password',
        name: 'set-pay-password',
        component: SetPayPassword,
        meta: {
            title: '设置交易密码'
        }
    },
    {
        path: '/reset-pay-password',
        name: 'reset-pay-password',
        component: ResetPayPassword,
        meta: {
            title: '重置交易密码'
        }
    },
    {
        path: '/find-password',
        name: 'find-password',
        component: FindPassword,
        meta: {
            title: '找回密码',
            withoutLogin: true
        }
    },
    {
        path: '/goods-detail-prif',
        name: 'goods-detail-prif',
        component: GoodsDetailPRIF,
        meta: {
            title: '产品详情',
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
        if ($device.kingold) {
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 1,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
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
routes.push({
    path: '*',
    redirect: '/personal-center'
});
export default new Router({
    mode: 'history',
    routes
})
