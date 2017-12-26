<template>
    <div flex="dir:top" class="relation">
        <div flex-box="1">
            <div class="total" flex="box:mean" v-if="userUuid && rewardSum != 0.00">
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
                    <div>我的奖励</div>
                </div>
                <div @click.stop="pathTo('/land-rank.html',true)">
                    <img src="../images/relation/bang.png" class="img"/>
                    <div>理财排行榜</div>
                </div>
                <div @click.stop="pathTo('/land-financial-master.html',true)">
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
            <div class="privilege" v-if="availableUpgrade && investorType != 12 && showPri">
                <div class="warp" @click.stop="closeModal"></div>
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
                availableUpgrade: 0,
                showPri: true
            }
        },
        created(){
            this.addHive(1, 'relation',1033);
            if ($device.isWeixin) {
                this.getShare();
            }
            this.relationCount();
            this.achievement();
            let event = ['_trackEvent', '我的好友', 'SHOW', '进入我的好友页面', '进入我的好友页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState(['investorMobile', 'userUuid', 'rewardSum', 'investorType']),
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
            closeModal(){
                this.showPri = false;
                this.addHive(0, 'relation_btn_closePribilegeModal',103301);
                let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面关闭达人弹窗', '我的好友-关闭弹窗-点击'];
                window._hmt.push(event);
            },
            openPrivilege(){
                this.addHive(0, 'relation_btn_openPribilege',103302);
                let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击开启达人', '我的好友-开启达人-点击'];
                window._hmt.push(event);
                $api.post('/user/upgradeTalent/apply').then((resp) => {
                    if (resp.code == 200) {
                        Toast('开启成功,用户身份升级为理财达人');
                        this.$store.commit('setPersonalCenterMsg', {
                            investorType: 12
                        });
                    }
                });
            },
            achievement(){
                $api.get('/user/achievement').then((resp) => {
                    if (resp.code == 200) {
                        this.availableUpgrade = resp.data.availableUpgrade;
                    }
                });
            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——我的好友'
                });
            },
            pathTo(path, boolean){
                let oper = path.replace('/', '');
                this.addHive(0, 'relation_link_' + oper,103303);
                this.addHive(2, 'relation_to_' + oper,1033);
                if (path == '/land-share.html') {
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击一起赚', '我的好友-一起赚-点击'];
                    window._hmt.push(event);
                }
                if (path == '/reward') {
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击我的奖励', '我的好友-我的奖励-点击'];
                    window._hmt.push(event);
                }
                if (path == '/relation-list-gold') {
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击金疙瘩', '我的好友-金疙瘩-点击'];
                    window._hmt.push(event);
                }
                if (path == ' /relation-list?level=2') {
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击银疙瘩', '我的好友-银疙瘩-点击'];
                    window._hmt.push(event);
                }
                if (path == ' /relation-list?level=3') {
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击铜疙瘩', '我的好友-铜疙瘩-点击'];
                    window._hmt.push(event);
                }
                if (boolean) {
                    window.location.href = path;
                    let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击' + oper, '我的好友-' + oper + '-点击'];
                    window._hmt.push(event);
                    return false;
                }
                this.$router.push(path)
            }
        },
        mounted(){
        },
        destroyed(){
            this.addHive(2, 'relation',1033)
        }
    }
</script>





