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
const Lists = () => import('../funds/Lists');
const MyFund = () => import('../funds/MyFund');
let fundRoutes = [
    {
        path: '/funds',
        name: 'funds',
        redirect: '/funds/lists',
        meta: {
            title: '基金'
        },
        component: Fund,
        children: [{
            path: 'lists',
            name: 'lists',
            component: Lists,
            meta: {
                title: '基金列表',
                withoutLogin: true
            }
        },
            {
                path: 'my-fund',
                name: 'my-fund',
                component: MyFund,
                meta: {
                    title: '我的基金',
                    withoutLogin: true
                }
            }]
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
