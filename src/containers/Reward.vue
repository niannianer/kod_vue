<template>
    <div flex="dir:top" flex-box="1" class="reward">
        <div class="header" flex-box="0">
            <div class="header-info">
                <p class="right" @click.stop="$router.push('/reward-detail')">奖励细则</p>
                <ul flex class="ul">
                    <li flex-box="1">
                        <p class='tile'>待结算（税前）</p>
                        <p class='info'>
                            <span class="num">{{unpaid}}</span>
                            元
                        </p>
                    </li>
                    <li flex-box="1">
                        <p class='tile'>已结算（税后）</p>
                        <p class='info'>
                            <span class="num">{{paidWithTax}}</span>
                            元
                        </p>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="body" flex-box="1">
            <div class='bind-mind' flex @click.stop="rewardList" v-if="userVerifyStatus < 3">
                <p flex-box="1">
                    <img src="../images/reward/horn.png" class="icon"/>
                    实名绑卡后才可以领取奖励！
                </p>
                <div flex-box="0">
                    <span class="text">去绑卡</span>
                    <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                </div>
            </div>
            <div class="section">
                <div class='item border' flex @click.stop="rewardList">
                    <p flex-box="1">邀请奖励</p>
                    <div flex-box="0" >
                        <span class="text">{{datas.inviterReward}}</span>
                        <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                    </div>
                </div>
                <div @click="allowance(2)" class='item' flex>
                    <p flex-box="1">邀请津贴</p>
                    <div flex-box="0">
                        <span class="text">{{datas.inviterAllowance}}</span>
                        <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                    </div>
                </div>
                <div class='invite-subsidy' flex>
                    <p @click="allowance(2)" class="direct" flex-box="1">直接邀请津贴</p>
                    <p @click="allowance(3)" class='indirect' flex-box="1">间接邀请津贴</p>
                </div>
            </div>
            <div class="section">
                <div @click="toMaster" class='item' flex>
                    <p flex-box="1">达人奖励</p>
                    <div flex-box="0">
                        <span class="text">{{datas.masterReward}}</span>
                        <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                    </div>
                </div>
            </div>
            <!--<advertise :pagetype="'WDJL'"></advertise>-->
        </div>

    </div>
</template>

<script>
    import Advertise from '../components/Advertise';
    import {mapState} from 'vuex';
    import '../less/reward.less';
    import $api from '../tools/api';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    export default {
        name: 'reward',
        data(){
            return {
                datas: {},
                paidWithTax: '',
                unpaid: '',
                paid: ''
            }
        },
        computed: mapState(['userUuid','userVerifyStatus']),
        components:{
            Advertise
        },
        methods: {
            allowance(num){
                let oper = '';
                if (num == 2) {
                    oper = '直接';
                }
                else {
                    oper = '间接';
                }
                this.$router.push({
                    path: '/invitation-allowance-list',
                    query: {
                        rewardType: num
                    }
                });
                let event = ['_trackEvent', '我的奖励', 'CLICK', '在我的奖励页面点击' + oper + '邀请津贴', '我的奖励页面-点击' + oper + '邀请津贴'];
                window._hmt.push(event);

            },
            toMaster(){
                this.$router.push({
                    path: '/master-list'
                });
            },
            getSum(){
                $api.get('/reward/sum', {
                    'userUuid': this.userUuid
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            this.datas = msg.data;
                            this.paidWithTax = msg.data.paidWithTax;
                            this.unpaid = msg.data.unpaid;
                            this.paid = msg.data.paid;
                        }
                        return msg
                    })
            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——我的奖励'
                });
            },
            rewardList(){
                let event = ['_trackEvent', '我的奖励', 'CLICK', '在我的奖励页面点击邀请奖励', '我的奖励页面-点击邀请奖励'];
                window._hmt.push(event);
                this.$router.push('/invitation-reward-list');
            }
        },
        watch: {
            userUuid(){
                if (this.userUuid) {
                    this.getSum();
                }
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            if (this.userUuid) {
                this.getSum();
            }
            let event = ['_trackEvent', '我的奖励', 'SHOW', '进入我的奖励页面', '进入我的奖励页面'];
            window._hmt.push(event);
        }
    }
</script>
