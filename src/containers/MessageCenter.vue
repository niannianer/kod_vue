<template>
    <div class="message-center" flex="dir:top">
        <div class="header" flex="box:mean" flex-box="0">
            <p class="tab" flex="main:center cross:center" v-for="(item,index) in tabList"
               :class="{'active':tabId == item.id}" @click.stop="checkTab(item.id)">{{item.name}}</p>
            <!--  <p class="tab" flex="main:center cross:center">媒体报道</p>-->
        </div>
        <div v-infinite-scroll="loadMore" class="content"  flex-box="1" infinite-scroll-disabled="loading"
             infinite-scroll-distance="10" >
            <div v-if="!msgList.length" class="no-content">暂无内容</div>
            <div v-else class="item" v-for="(item,index) in msgList">
                <div flex="cross:center" class="item-content">
                    <img :src="item.coverImageUrl" alt="" class="img" flex-box="0">
                    <div>
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
    import {InfiniteScroll,Indicator} from 'mint-ui';
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
                loading:true,
                pageSize:10,
                hasUnread:1,
                msgCode:3
            }
        },
        components: {},
        created(){
            this.getTab();
        },
        computed: {},
        methods: {
            getTab(){
                $api.get('/management/columnList')
                    .then(resp => {
                        if (resp.code == 200) {
                            this.tabList = resp.data.list;
                            if(this.tabList.length){
                                this.tabId = this.tabList[0].id;
                                this.checkTab(this.tabId);
                            }
                        }
                    })
            },
            checkTab(num){
                this.tabId = num;
                this.currentPage = 0;
                this.msgList = [];
                Indicator.open();
                this.getList();
            },
            getList(){
                $api.get('/management/articleList', {
                    columnId: this.tabId,
                    startRow: this.currentPage*this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            Indicator.close();
                            if(this.hasUnread){
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
                window.location.href = '/land-message.html?id='+id;
            },
            delUnread(){
                let {msgCode} = this;
                $api.post('/user/destroy/unread', {msgCode})
                    .then(resp => {
                        if (resp.code == 200) {
                            this.hasUnread = 0;
                        }
                    })
            },
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
