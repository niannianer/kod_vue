/**
 * Created by DELL on 2017/9/19.
 */
import store from '../store';
import {logout, setTitle} from '../tools/operation';
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

const Fund = () => import('../containers/Fund');
const Bulletin = () => import('../funds/Bulletin');
const Detail = () => import('../funds/Detail');
const DetailApp = () => import('../funds/DetailApp');
const GainsList = () => import('../funds/GainsList');
const HotList = () => import('../funds/HotList');
const Info = () => import('../funds/Info');
const Lists = () => import('../funds/Lists');
const Manager = () => import('../funds/Manager');
const MyFund = () => import('../funds/MyFund');
const OpenCount = () => import('../funds/OpenCount');
const PositionAnalysis = () => import('../funds/PositionAnalysis');
const Purchase = () => import('../funds/Purchase');
const Redeem = () => import('../funds/Redeem');
const RelatedRate = () => import('../funds/RelatedRate');
const PurchaseResult = () => import('../funds/PurchaseResult');
let fundRoutes = [
    {
        path: '/funds',
        name: 'funds',
        redirect: '/funds/lists',
        meta: {
            title: '基金'
        },
        component: Fund,
        children: [
            {
                path: 'bulletin',
                name: 'bulletin',
                component: Bulletin,
                meta: {
                    title: '基金公告',
                    withoutLogin: true
                }
            }, {
                path: 'detail',
                name: 'detail',
                component: Detail,
                meta: {
                    title: '基金详情',
                    withoutLogin: true
                }
            },{
                path: 'detail-app',
                name: 'detail-app',
                component: DetailApp,
                meta: {
                    title: '基金详情',
                    withoutLogin: true
                }
            },
            {
                path: 'gains-list',
                name: 'gains-list',
                component: GainsList,
                meta: {
                    title: '基金涨幅榜',
                    withoutLogin: true
                }
            }, {
                path: 'hot-list',
                name: 'hot-list',
                component: HotList,
                meta: {
                    title: '基金热销榜',
                    withoutLogin: true
                }
            }, {
                path: 'info',
                name: 'info',
                component: Info,
                meta: {
                    title: '文本标签', /*找产品确认*/
                    withoutLogin: true
                }
            }, {
                path: 'lists',
                name: 'lists',
                component: Lists,
                meta: {
                    title: '基金列表',
                    withoutLogin: true
                }
            }, {
                path: 'manager',
                name: 'manager',
                component: Manager,
                meta: {
                    title: '基金经理',
                    withoutLogin: true
                }
            }, {
                path: 'my-fund',
                name: 'my-fund',
                component: MyFund,
                meta: {
                    title: '我的基金'
                }
            }, {
                path: 'open-count',
                name: 'open-count',
                component: OpenCount,
                meta: {
                    title: '基金开户',
                    withoutLogin: true
                }
            }, {
                path: 'position-analysis',
                name: 'position-analysis',
                component: PositionAnalysis,
                meta: {
                    title: '持仓分析'
                }
            }, {
                path: 'purchase',
                name: 'purchase',
                component: Purchase,
                meta: {
                    title: '申购'
                }
            }, {
                path: 'redeem',
                name: 'redeem',
                component: Redeem,
                meta: {
                    title: '赎回',
                    withoutLogin: true
                }
            }, {
                path: 'related-rate',
                name: 'related-rate',
                component: RelatedRate,
                meta: {
                    title: '相关费率'
                }
            },{
                path: 'purchase-result',
                name: 'purchase-result',
                component: PurchaseResult,
                meta: {
                    title: '申购'
                }
            },]
    }
];

fundRoutes[0].children.map(route => {
    route.beforeEnter = (to, from, next) => {
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if (!route.meta.withoutLogin) {
            return beforeEach(to, from, next);
        } else {
            next();
        }
    };
})
export  default fundRoutes;
