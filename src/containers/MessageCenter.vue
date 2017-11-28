<template>
    <div class="message-center" flex="dir:top">
        <div class="header" flex="box:mean" flex-box="0">
            <p class="tab" flex="main:center cross:center" v-for="(item,index) in tabList"
               :class="{'active':tabId == item.id}" @click.stop="checkTab(item.id)">{{item.name}}</p>
        </div>
        <div v-infinite-scroll="loadMore" class="content" flex-box="1" infinite-scroll-disabled="loading"
             infinite-scroll-distance="10" ref="scroll">
            <div v-if="!msgList.length" class="no-content">暂无内容</div>
            <div v-else class="item" v-for="(item,index) in msgList">
                <div flex="cross:center" class="item-content">
                    <img :src="item.coverImageUrl||defaultImg" alt="" class="img" flex-box="0" @error="imgError(index)">
                    <div flex-box="1">
                        <p class="title">
                            {{item.title}}
                        </p>
                        <p class="desc">
                            {{item.subtitle}}
                        </p>
                    </div>
                </div>
                <div flex class="item-bottom">
                    <p flex-box="0">
                        {{item.createTime | timeFormat}}
                    </p>
                    <p flex-box="1" class="detail" @click.stop="msgDetail(item.id)">
                        查看详情
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const defaultImg = require('../images/msg-logo.png');
    import {InfiniteScroll, Indicator} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/message-center.less';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    export default {
        name: 'message-center',
        data(){
            return {
                tabList: [],
                tabId: 1,
                currentPage: 0,
                msgList: [],
                loading: true,
                pageSize: 10,
                hasUnread: 1,
                msgCode: 3,
                scrollTop:0,
                defaultImg
            }
        },
        components: {},
        created(){
            if (window.sessionStorage.getItem('message')) {/*详情页返回时重现离开时位置*/
                let {currentPage, hasUnread, msgList, tabId, tabList,scrollTop,loading} = JSON.parse(window.sessionStorage.getItem('message'));
                this.currentPage = currentPage;
                this.hasUnread = hasUnread;
                this.msgList = msgList;
                this.tabId = tabId;
                this.tabList = tabList;
                this.loading = loading;
                if(scrollTop){
                    this.$nextTick(() => {
                        let dom = document.querySelector('.content');
                        dom.scrollTop = scrollTop;
                    });
                }
                window.sessionStorage.removeItem('message')
                return false;
            }
            this.getTab();

        },
        computed: {},
        methods: {
            getTab(){/*获取栏目列表*/
                $api.get('/management/columnList')
                    .then(resp => {
                        if (resp.code == 200) {
                            this.tabList = resp.data.list;
                            if (this.tabList.length) {
                                if (this.$route.query&&this.$route.query.tab) {
                                    this.tabId = this.$route.query.tab;
                                    Indicator.open();
                                    this.getList();
                                    return false;
                                }
                                this.tabId = this.tabList[0].id;
                                this.checkTab(this.tabId);
                            }
                        }
                    })
            },
            checkTab(num){
                this.tabId = num;
                this.currentPage = 0;
                this.$router.replace('/message-center?tab=' + this.tabId);
                this.msgList = [];
                Indicator.open();
                this.getList();
            },
            getList(){/*获取文章列表*/
                $api.get('/management/articleList', {
                    columnId: this.tabId,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            Indicator.close();
                            if (this.hasUnread) {
                                this.delUnread();
                            }
                            this.msgList = this.msgList.concat(resp.data.list);
                            if (resp.data.list.length < this.pageSize) {
                                this.loading = true;
                            } else {
                                this.loading = false;
                            }
                        }
                        console.log(resp)
                    })
            },
            loadMore(){
                this.loading = true;
                this.currentPage++;
                this.getList();
            },
            msgDetail(id){
                this.scrollTop = this.$refs.scroll.scrollTop;
                window.sessionStorage.setItem('message', JSON.stringify(this.$data));
                window.location.href = '/land-message.html?id=' + id;
            },
            delUnread(){/*删除未读  msgCode 3：文章*/
                let {msgCode} = this;
                $api.post('/user/destroy/unread', {msgCode})
                    .then(resp => {
                        if (resp.code == 200) {
                            this.hasUnread = 0;
                        }
                    })
            },
            imgError(index){/*图片加载失败时替换为默认金疙瘩logo图*/
                this.msgList[index].coverImageUrl = this.defaultImg;
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
