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
                if(path=='/land-share.html'){
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击一起赚','我的好友-一起赚-点击'];
                    window._hmt.push(event);
                }
                if(path=='/reward'){
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击我的奖励', '我的好友-我的奖励-点击'];
                    window._hmt.push(event);
                }
                if(path=='/relation-list-gold'){
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击金疙瘩', '我的好友-金疙瘩-点击'];
                    window._hmt.push(event);
                }
                if(path==' /relation-list?level=2'){
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击银疙瘩', '我的好友-银疙瘩-点击'];
                    window._hmt.push(event);
                }
                if(path==' /relation-list?level=3'){
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击铜疙瘩', '我的好友-铜疙瘩-点击'];
                    window._hmt.push(event);
                }
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





