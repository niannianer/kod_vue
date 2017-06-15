<template>
    <div v-cloak class="friend-list" flex-box="1" flex="dir:top">
        <div class="h-title" flex flex-box="0">
            <div class="title-phone" flex-box="1">手机号</div>
            <div class="title-date" flex-box="1">绑定日期</div>
        </div>
        <div class="lists">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="list-ul">
                    <li flex  v-for="(item,index) in list" :key="index">
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
    import {Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'financial',
        data(){
            return {
                level:this.$route.query.level || 1,
                startRow:1,
                pageSize:20,
                autoFill:false,
                allLoaded:false,
                list:[]
            }
        },
        methods: {
            loadTop(){
                this.get(0,'top');
                this.$refs.loadmore.onTopLoaded();
                this.allLoaded = false;
            },loadBottom(){
                this.startRow ++;
                this.get(this.startRow,'bottom');
                this.$refs.loadmore.onBottomLoaded();
            },
            get(startRow,type){
                $api.get('/relation/list',{level:this.level,startRow:startRow,pageSize:this.pageSize}).then(msg => {
                    if(msg.code == 200){
                        if(type == 'top'){
                            this.list = msg.data.list;
                        }else{
                            msg.data.list.map(el => {
                                this.list.push(el)
                            });
                            if(this.list.length >= msg.data.count){
                                this.allLoaded = true;
                            }
                        }
                        
                    }
                });
            }
        },
        created(){
            $operation.setTitle(this.level+'度好友');
            this.get(this.startRow,'top');
        }
    }
</script>
