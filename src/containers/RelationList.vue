<template>
    <div v-cloak class="friend-list" flex-box="1" flex="dir:top">
        <div class="h-title" flex flex-box="0">
            <div class="title-phone" flex-box="1">手机号</div>
            <div class="title-date" flex-box="1">绑定日期</div>
        </div>
        <div class="lists">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="list-ul">
                    <li flex  v-for="(item,index) in data.list" :key="index">
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
    import {Loadmore,Toast} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'financial',
        data(){
            return {
                level:this.$route.query.level || 1,
                startRow:0,
                pageSize:20,
                autoFill:false,
                allLoaded:false,
                data:{
                    count:0,
                    list:[]
                }
            }
        },
        methods: {
            loadTop(){
                this.get(0,'top').then(()=>{
                    this.$refs.loadmore.onTopLoaded();
                    this.allLoaded = false;
                });
            },
            loadBottom(){
                if(this.data.list.length >= this.data.count){
                    this.allLoaded = true;
                    this.$refs.loadmore.onBottomLoaded();
                }else{
                    this.get(this.startRow,'bottom').then(()=>{
                        this.$refs.loadmore.onBottomLoaded();
                    });
                }
            },
            get(startRow,type){
                return $api.get('/relation/list',{level:this.level,startRow:startRow,pageSize:this.pageSize}).then(msg => {
                    if(msg.code == 200){
                        if(type == 'top'){
                            this.data = msg.data;
                        }else{
                            msg.data.list.map(el => {
                                this.list.push(el)
                            });
                        }

                    }else{
                        Toast(msg.msg);
                    }
                    return msg;
                });
            }
        },
        created(){
            $operation.setTitle(this.level+'度好友');
            this.get(0,'top');
        }
    }
</script>
