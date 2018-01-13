/**
 * Created by DELL on 2017/9/19.
 */
import store from '../store';
import {logout, setTitle} from '../tools/operation';
let beforeEach = ((to, from, next) => {

})

const Gold = () => import('../containers/Gold');
const Index = () => import('../golds/Index');

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
                path: 'index',
                name: 'index',
                component: Index,
                meta: {
                    title: '我的金币空间',
                    withoutLogin: true
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
