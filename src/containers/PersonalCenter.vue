<template>
    <div class="personal-center">
        <div class="top">
            <div class="user-head">
                <img v-if="!investorMobile" src="../images/personal-center/user-head.png"/>
                <img src="../images/personal-center/user-default.png" v-else/>
            </div>
            <div class="user-mobile">
                <span v-if="investorMobile">{{investorMobile | mobileFormat}}</span>
                <span v-else @click.stop="login"> 请登录</span>
            </div>

        </div>
        <div class="center">
            <div class="items" flex="main:center">
                <div class="item" flex-box="1" @click.stop="getPath('/my-assets')">
                    <img src="../images/personal-center/my-assets.png"/>
                    <span>我的资产</span>
                </div>
                <div class="item" flex-box="1" @click.stop="getPath('/reward')">
                    <img src="../images/personal-center/my-reward.png"/>
                    <span>我的奖励</span>
                </div>
                <div class="item" flex-box="1" @click.stop="getPath('/invest-list')">
                    <img src="../images/personal-center/my-invest.png"/>
                    <span>我的投资</span>
                </div>
            </div>
            <div class="items" flex="main:center">
                <div class="item" flex-box="1" @click.stop="getPath('/reserve-list')">
                    <img src="../images/personal-center/record-manage.png"/>
                    <span>预约管理</span>
                </div>
                <div class="item" flex-box="1" @click.stop="getPath('/relation')">
                    <img src="../images/personal-center/my-friend.png"/>
                    <span>我的好友</span>
                </div>
                <div class="item" flex-box="1" @click="getLink('/land-about-us.html')">
                    <img src="../images/personal-center/about-us.png"/>
                    <span>关于我们</span>
                </div>
            </div>
        </div>
        <div class="cantact-us">
            联系我们：{{telNumber}}
        </div>
        <div class="footer">
            <button v-if="investorMobile" class="btn-default logout" @click="logout">退出登录</button>
            <button class="btn-primary login" v-else @click.stop="login">立即登录</button>


        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import {telNumber} from '../tools/config';
    import $api from '../tools/api';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import '../less/personal-center.less';
    const logo = require('../images/share-icon.png');
    export default {
        name: 'personal-center',
        data(){
            return {
                telNumber
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }

        },
        computed: mapState([
            'investorMobile'
        ]),
        methods: {
            login(){
                this.$router.replace('/login');
            },
            logout(){
                $api.post('/logout')
                    .then(data => {
                        if (data.code == 200) {
                            this.$router.replace('/login');
                        } else {
                            Toast('退出登录失败');
                        }

                    })
            },
            getPath(path){
                this.$router.push(path);
            },
            getLink(path){
                window.location.href = path;
            },
            getShare(){
                wx.getShare({
                    title:'金疙瘩——个人中心'
                });
            }
        },
        destroyed(){

        }
    }
</script>
