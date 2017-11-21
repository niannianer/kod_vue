<template>
    <div flex="dir:top" class="relation">
        <div flex-box="1">
            <div class="total" flex="box:mean" v-if="userUuid">
                <div class="box">
                    <div>累积奖励（元）</div>
                    <div class="num">
                        <span class="big">{{rewardSum | currencyFormat}}</span>
                    </div>
                </div>
                <div class="box">
                    <div>累积好友（人）</div>
                    <div class="num">
                        <span class="big">{{totalCount}}</span>
                    </div>
                </div>
            </div>
            <div v-else @click.stop="pathTo('/land-share.html',true)">
                <img src="../images/relation/yao-bg.png" class="yao-img"/>
            </div>
            <div class="pattern seperate" flex="box:mean">
                <div @click.stop="pathTo('/land-share.html',true)">
                    <img src="../images/relation/yao.png" class="img"/>
                    <div>邀友得现金</div>
                </div>
                <div @click.stop="pathTo('/reward')">
                    <img src="../images/relation/jiang.png" class="img"/>
                    <div>查奖励</div>
                </div>
                <div @click.stop="pathTo('/land-rank.html',true)">
                    <img src="../images/relation/bang.png" class="img"/>
                    <div>理财排行榜</div>
                </div>
                <div>
                    <img src="../images/relation/quan.png" class="img"/>
                    <div>达人特权</div>
                </div>
            </div>
            <div class="b2 seperate">
                <div class="item title">我的好友</div>
                <div class="item bl" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list-gold')">
                    <img src="../images/relation/relation-1.png" alt="logo" flex-box="0" class="logo">
                    <p class="info" flex-box="1">金疙瘩好友</p>
                    <p class="num" flex-box="0">{{levelOneCount}}</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="item bl" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list?level=2')">
                    <img src="../images/relation/relation-2.png" alt="logo" flex-box="0" class="logo">
                    <p class="info" flex-box="1">银疙瘩好友</p>
                    <p class="num" flex-box="0">{{levelTwoCount}}</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="item" flex="cross:center" flex-box="0" @click.stop="pathTo('/relation-list?level=3')">
                    <img src="../images/relation/relation-3.png" alt="logo" flex-box="0" class="logo">
                    <p class="info" flex-box="1">铜疙瘩好友</p>
                    <p class="num" flex-box="0">{{levelThreeCount}}</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
            </div>
            <div class="privilege" v-if="availableUpgrade && investorType != 12">
                <div class="warp"></div>
                <div class="prv-modal">
                    <img src="../images/relation/open-privilege.png"/>
                    <button class="btn" @click.stop="openPrivilege">开启</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import md5 from 'md5';
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import '../less/relation.less';
    import $api from '../tools/api';
    import QRCode from 'qrcode';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import Toast from "../components/Toast/toast";
    Vue.use(QRCode)
    export default {
        name: 'relation',
        data() {
            return {
                levelOneCount: 0,
                levelTwoCount: 0,
                levelThreeCount: 0,
                totalCount: 0,
                codes: '',
                imgSrc: '',
                availableUpgrade: 0
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            this.relationCount();
            this.achievement();
            let event = ['_trackEvent', '我的好友', 'SHOW', '进入我的好友页面', '进入我的好友页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState(['investorMobile', 'userUuid','rewardSum','investorType']),
            total(){
                let total = Number(this.levelOneCount) + Number(this.levelTwoCount) + Number(this.levelThreeCount);
                if (!isNaN(total)) {
                    return total
                }
                return 0
            }

        },
        methods: {
            relationCount(){
                $api.get('/relation/count').then(data => {
                    if (data.code == 200) {
                        this.levelOneCount = data.data.levelOneCount;
                        this.levelTwoCount = data.data.levelTwoCount;
                        this.levelThreeCount = data.data.levelThreeCount || 0;
                        this.totalCount = this.levelOneCount + this.levelTwoCount + this.levelThreeCount;
                    }
                });
            },
            openPrivilege(){
                $api.post('/user/upgradeTalent/apply').then((resp) => {
                    if(resp.code == 200){
                        Toast('开启成功,用户身份升级为理财达人');
                        this.$store.commit('setPersonalCenterMsg',{
                            investorType: 12
                        });
                    }
                });
            },
            achievement(){
                $api.get('/user/achievement').then((resp) => {
                   if(resp.code == 200){
                        this.availableUpgrade = resp.data.availableUpgrade;
                   }
                });
            },
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
        destroyed(){

        }
    }
</script>





