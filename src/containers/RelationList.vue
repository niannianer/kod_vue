<template>
    <div v-cloak class="friend-list" flex-box="1" flex="dir:top">
        <div class="h-title" flex flex-box="0">
            <div class="title-phone" flex-box="1">手机号</div>
            <div class="title-date" flex-box="1">绑定日期</div>
        </div>
        <div class="lists" flex-box="1">
            <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
                <ul class="list-ul" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
                    infinite-scroll-distance="10">
                    <li flex v-for="(item,index) in data.list" :key="index">
                        <div flex-box="1">{{item.investorMobile}}</div>
                        <div flex-box="1">{{item.registerTime}}</div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import '../less/relation-list.less';
    import Vue from 'vue';
    import $api from '../tools/api';
    import $operation from '../tools/operation';
    import {Loadmore, InfiniteScroll, Toast} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default {
        name: 'relation-list',
        data(){
            return {
                level: this.$route.query.level || 1,
                pageSize: 20,
                autoFill: false,
                allLoaded: false,
                data: {
                    count: 0,
                    list: []
                }
            }
        },
        computed:{
            title(){
                return this.level==2? '银疙瘩好友':'铜疙瘩好友'
            }
        },
        methods: {
            loadTop(){
                this.get('top').then(() => {
                    this.$refs.loadmore.onTopLoaded();
                    this.allLoaded = false;
                });
            },
            loadMore(){
                this.addHive(0,'relationList_scroll_loading',103401);
                if ((this.data.list.length >= this.data.count) && (this.data.count != 0)) {
                    this.allLoaded = true;
                } else {
                    this.get('bottom');
                }
            },
            get(type){
                let startRow = 0;
                if (type == 'bottom') {
                    startRow = this.data.list.length;
                }
                return $api.get('/relation/list', {
                    level: this.level,
                    startRow: startRow,
                    pageSize: this.pageSize
                }).then(msg => {
                    if (msg.code == 200) {
                        if (type == 'top') {
                            this.data = msg.data;
                        } else {
                            msg.data.list.map(el => {
                                this.data.list.push(el)
                            });
                            this.data.count = msg.data.count;
                        }
                    } else {
                        Toast(msg.msg);
                    }
                    return msg;
                });
            }
        },
        created(){
            this.addHive(1, 'relationList'+this.level,1034);
            let event = ['_trackEvent', '我的'+this.title, 'SHOW', '进入'+this.title+'页面','进入'+this.title+'页面'];
            window._hmt.push(event);
            $operation.setTitle(this.title);
        }
    }
</script>
