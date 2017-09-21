<template>
    <div flex="dir:top" class="relation">
        <div flex-box="1">
            <div class="item bl seperate" flex="cross:center" flex-box="0"
                 @click.stop="pathTo('/land-share.html',true)">
                <img src="../images/relation/share.png" alt="logo" flex-box="0" class="logo">
                <p class="info" flex-box="1">一起赚</p>
                <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
            </div>
            <div class="item" flex="cross:center" flex-box="0" @click.stop="pathTo('/reward')">
                <img src="../images/relation/reward.png" alt="logo" flex-box="0" class="logo">
                <p class="info" flex-box="1">我的奖励</p>
                <p class="info" flex-box="0">{{rewardSum | currencyFormat}}</p>
                <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
            </div>
            <div class="item seperate bl" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list-gold')">
                <img src="../images/relation/relation-1.png" alt="logo" flex-box="0" class="logo">
                <p class="info" flex-box="1">金疙瘩好友</p>
                <p class="info" flex-box="0">{{levelOneCount}}</p>
                <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
            </div>
            <div class="item bl" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list?level=2')">
                <img src="../images/relation/relation-2.png" alt="logo" flex-box="0" class="logo">
                <p class="info" flex-box="1">银疙瘩好友</p>
                <p class="info" flex-box="0">{{levelTwoCount}}</p>
                <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
            </div>
            <div class="item" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list?level=3')">
                <img src="../images/relation/relation-3.png" alt="logo" flex-box="0" class="logo">
                <p class="info" flex-box="1">铜疙瘩好友</p>
                <p class="info" flex-box="0">{{levelThreeCount}}</p>
                <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
            </div>
            <div class="cantact-us">
                <a :href="'tel:'+telNumber">
                    联系我们：{{telNumber}}
                </a>
            </div>
        </div>
        <div class="nav" flex-box="0" flex="box:mean">
            <div @click.stop="pathTo('/index')">
                <img src="../images/nav/index.png" alt="index">
                <p>首页</p>
            </div>
            <div @click.stop="pathTo('/financial')">
                <img src="../images/nav/financial.png" alt="financial">
                <p>理财</p>
            </div>
            <div>
                <img src="../images/nav/relation-act.png" alt="relation">
                <p class="blue">好友</p>
            </div>
            <div @click.stop="pathTo('/personal-center')">
                <img src="../images/nav/person-center.png" alt="personal-center">
                <p>我的</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {telNumber} from '../tools/config';
    import md5 from 'md5';
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import '../less/relation.less';
    import $api from '../tools/api';
    import QRCode from 'qrcode';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    Vue.use(QRCode)
    export default {
        name: 'relation',
        data() {
            return {
                telNumber,
                levelOneCount: 0,
                levelTwoCount: 0,
                levelThreeCount: 0,
                codes: '',
                imgSrc: ''
            }
        },
        methods: {
            useqrcode(){
                const canvas = document.getElementById('canvas');
                const signcode = md5('null' + this.userUuid + this.investorMobile + 'signCode')
                const url = window.location.origin + '/land-register-relation.html?o=null&u=' + this.userUuid + '&n=' + this.investorMobile + '&m=' + signcode
                QRCode.toCanvas(canvas, url, (error) => {
                    if (error) console.log(error)
//                    console.log(state.investorMobile);
                    this.imgSrc = canvas.toDataURL("image/png");
                });

            },
            link(){
                let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击邀请好友', '我的好友页面-点击邀请好友'];
                window._hmt.push(event);
                window.location.href = '/land-share-relation.html';
            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——我的好友'
                });
            },
            pathTo(path,boolean){
                /*  let oper = '';
                 switch (num) {
                 case 1:
                 oper = '金疙瘩';
                 break;
                 case 2:
                 oper = '银疙瘩';
                 break;
                 case 3:
                 oper = '铜疙瘩';
                 break;
                 }
                 let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击' + oper + '好友', '我的好友页面-点击' + oper + '好友'];
                 window._hmt.push(event);
                 if (num == 1) {
                 this.$router.push('/relation-list-gold')
                 return false;
                 }*/
                if(boolean){
                    window.location.href=path;
                    return false;
                }
                this.$router.push(path)

            }

        },
        computed: {
            ...mapState(['investorMobile', 'userUuid','rewardSum']),
            total(){
                let total = Number(this.levelOneCount) + Number(this.levelTwoCount) + Number(this.levelThreeCount);
                if (!isNaN(total)) {
                    return total
                }
                return 0
            }

        },
        mounted(){
            /*       if (this.investorMobile) {
             this.useqrcode();
             } else {
             this.$store.dispatch('getUserInfo')
             .then(() => {
             this.useqrcode();
             })
             }*/

        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            $api.get('/relation/count').then(data => {
                if (data.code == 200) {
                    this.levelOneCount = data.data.levelOneCount;
                    this.levelTwoCount = data.data.levelTwoCount;
                    this.levelThreeCount = data.data.levelThreeCount || 0;
                }
            })
            let event = ['_trackEvent', '我的好友', 'SHOW', '进入我的好友页面', '进入我的好友页面'];
            window._hmt.push(event);
        }
    }
</script>





