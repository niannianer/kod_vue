<template>
    <div class="index" flex="dir:top">
        <div class="header" flex-box="0">
            <mt-swipe :auto="4000" >
                <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
                    <img :src=item.advertImage alt="index-bg" @click.stop="pathTo(item.advertLink,true)">
                </mt-swipe-item>
            </mt-swipe>
            <span class="login-btn"  @click.stop="pathTo('/login')" v-show="!isLogin">登录</span>
        </div>
        <div class="body" flex-box="0">
            <div class="section" @click.stop="pathTo('/person-center')">
                <div flex="cross:center">
                    <p class="title" flex-box="1">个人中心</p>
                    <div v-show="isLogin" flex-box="0">
                        <p  v-show="mode" @click.stop="switchMode">隐藏金额</p>
                        <p  v-show="!mode" @click.stop="switchMode">显示金额</p>
                    </div>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="unlog" v-if="!isLogin">
                    请<a href="/login">登录</a>后查看
                </div>
                <div class="person-info" flex="box:mean" v-else>
                    <div>
                        <p class="info" v-if="mode">{{accountTotalAssets | currencyFormat}}元</p>
                        <p class="info" v-else="mode">****元</p>
                        <p class="title">总资产</p>
                    </div>
                    <div style="border-left:1px solid #D8D8D8">
                        <p class="info" v-if="mode">{{accountTotalInterests | currencyFormat}}元</p>
                        <p class="info" v-else="mode">****元</p>
                        <p class="title">累计收益</p>
                    </div>
                </div>
            </div>
            <div class="section" @click.stop="pathTo('/financial')">
                <div flex="cross:center">
                    <p class="title" flex-box="1">理财</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="item">
                    <p class="pro-title">{{recommend.productName}}</p>
                    <div flex>
                        <div flex-box="1">
                            <p class="info">{{recommend.annualInterestRate}}</p>
                            <p class="item-title">预期年化收益率</p>
                        </div>
                        <div flex-box="1" style="text-align: center;padding-right: 3rem;">
                            <p class="info">{{recommend.productPeriod}}</p>
                            <p class="item-title">期限</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav" flex-box="0">
            <div class="nav-center">
                <div flex="box:mean">
                    <p @click.stop="pathTo('/relation')">我的好友</p>
                    <p style="border-left:none" @click.stop="pathTo('/reward')">我的奖励</p>
                </div>
                <div flex="box:mean">
                    <p style="border-top:none" @click.stop="pathTo('/planning')">理财规划</p>
                    <p style="border-top:none;border-left:none" @click.stop="pathTo('/land-about-us.html',true)">关于我们</p>
                </div>
            </div>
            <div class="download" @click.stop="pathTo('/land-download.html',true)">下载app</div>
        </div>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import Vue from 'vue';
    import $api from '../tools/api';
    import '../less/index.less';
    import {mapState} from 'vuex';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: 'index',
        data(){
            return {
                recommend: {},
                bannerList:[],
                mode:true,
                isLogin:false
            }
        },
        components: {},
        created(){
            if(this.accountTotalAssets){
                this.isLogin = true;
            }else{
                $api.get('/getUserInfo')
                    .then(resp=>{
                        if(resp.code==200){
                            this.isLogin = true;
                        }
                    })
            }
            this.mode = window.localStorage.getItem('mode-index') == 'true' ? true : false;
            $api.get('/management/getAdvertList')
                .then(resp => {
                    if (resp.code == 200) {
                        this.bannerList = resp.data.advertList;
                    }
                })
            $api.get('/product/recommend', {
                productType: 'FIXI'
            })
                .then(resp => {
                    if (resp.code == 200) {
                        this.recommend = resp.data;
                    }
                });
        },
        computed: mapState(['accountTotalAssets','accountTotalInterests']),
        watch:{
            accountTotalAssets(){
                if(this.accountTotalAssets){
                  //  window.sessionStorage.removeItem('logoutUrl');
                    this.isLogin = true;
                }else{
                    $api.get('/getAccountBaofoo')
                        .then(resp=>{
                            if(resp.code==200){
                              //  window.sessionStorage.removeItem('logoutUrl');
                                this.isLogin = true;
                            }
                        })
                }
            }
        },
        methods: {
            pathTo(path,boolean){
                if(boolean){
                    window.location.href = path;
                    return false;
                }
                if(path=='/login'){/*banner部分登录按钮登录后回到首页*/
                    window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
                }
                if(path=='/relation'||path=='/reward'){
                    window.sessionStorage.setItem('logoutIndex', encodeURIComponent(window.location.origin+path));
                }
                this.$router.push(path);
            },
            switchMode(){
                this.mode = !this.mode
                window.localStorage.setItem('mode-index', this.mode);
            }
        },
        destroyed(){

        }
    }
</script>
