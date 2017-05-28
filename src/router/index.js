import Vue from 'vue'
import Router from 'vue-router'
import Tabs from '../containers/Tabs';

Vue.use(Router)
const Position = resolve => require(['../containers/Position'], resolve);
const Interview = resolve => require(['../containers/Interview'], resolve);
const Message = resolve => require(['../containers/Message'], resolve);
const My = resolve => require(['../containers/My'], resolve);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/tabs',
            name: 'tabs',
            component: Tabs,
            children: [{
                path: 'position',
                name: 'position',
                component: Position
            }, {
                path: 'interview',
                name: 'interview',
                component: Interview
            }, {
                path: 'message',
                name: 'message',
                component: Message
            }, {
                path: 'my',
                name: 'my',
                component: My,
                beforeEnter: (to, from, next) => {
                    // ...
                    console.log('my');
                    next();
                }
            }]
        }, {
            path: '*',
            redirect: '/tabs/position'
        }
    ]
})
