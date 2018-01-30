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
});

const Gold = () => import('../containers/Gold');
const Index = () => import('../golds/Index');
const othersIndex = () => import('../golds/othersIndex');
const Task = () => import('../golds/Task');
const CollectList = () => import('../golds/CollectList');
const ActivityList = () => import('../golds/ActivityList');
const GoldDetail = () => import('../golds/GoldDetail');
const Rules = () => import('../golds/Rules');
const ReceiveRank = () => import('../golds/ReceiveRank')

let goldRoutes = [
    {
        path: '/golds',
        name: 'golds',
        redirect: '/golds/index',
        meta: {
            title: '金币'
        },
        component: Gold,
        children: [
            {
                path: 'others-index',
                name: 'others-index',
                component: othersIndex,
                meta: {
                    title: '好友的小金库'
                }
            },
            {
                path: 'index',
                name: 'index',
                component: Index,
                meta: {
                    title: '我的小金库'
                }
            }, {
                path: 'task',
                name: 'task',
                component: Task,
                meta: {
                    title: '任务列表'
                }
            }, {
                path: 'collect-list',
                name: 'collect-list',
                component: CollectList,
                meta: {
                    title: '收取排行榜'
                }
            }, {
                path: 'activity-list',
                name: 'activity-list',
                component: ActivityList,
                meta: {
                    title: '好友动态'
                }
            }, {
                path: 'gold-detail',
                name: 'gold-detail',
                component: GoldDetail,
                meta: {
                    title: '金币明细'
                }
            }, {
                path: 'rules',
                name: 'rules',
                component: Rules,
                meta: {
                    title: '金币规则'
                }
            }, {
                path: 'receive-rank',
                name: 'receive-rank',
                component: ReceiveRank,
                meta: {
                    title: '收取排好榜'
                }
            }]
    }
];

goldRoutes[0].children.map(route => {
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
export  default goldRoutes;
