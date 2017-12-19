<template>
    <div flex="dir:top" flex-box="1" class="reward">
        <div class="header" flex-box="0">
            <div class="header-info">
                <div class="right" @click.stop="$router.push('/reward-list')">奖励细则</div>
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
            <div class='bind-mind' flex @click.stop="toPath('bind')" v-if="userVerifyStatus < 3 && (unpaid != 0.00 || paidWithTax != 0.00)">
                <p flex-box="1">
                    <span><img src="../images/reward/horn.png" class="icon"/></span>
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
                <!--<div class='invite-subsidy' flex>
                    <p @click="allowance(2)" class="direct" flex-box="1">直接邀请津贴</p>
                    <p @click="allowance(3)" class='indirect' flex-box="1">间接邀请津贴</p>
                </div>-->
            </div>
            <div class="section">
                <div @click.stop="toPath('/master-list')" class='item' flex>
                    <p flex-box="1">达人奖励</p>
                    <div flex-box="0">
                        <span class="text">{{datas.masterReward}}</span>
                        <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                    </div>
                </div>
            </div>
            <advertise :pagetype="'WDJL'"></advertise>
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
        computed: mapState(['userUuid','userVerifyStatus','userVerifyStatusDesc']),
        created(){
            this.addHive(1, 'reward');
            if ($device.isWeixin) {
                this.getShare();
            }
            if (this.userUuid) {
                this.getSum();
            }
            let event = ['_trackEvent', '我的奖励', 'SHOW', '进入我的奖励页面', '进入我的奖励页面'];
            window._hmt.push(event);
        },
        components:{
            Advertise
        },
        methods: {
            allowance(num){

                let oper = '';
                let oper2 = ''
                if (num == 2) {
                    oper = '直接';
                    oper2 = 'gold'
                }
                else {
                    oper = '间接';
                    oper2 = 'sliver'
                }
                this.addHive(0, 'reward_link_allowance'+oper2);
                this.addHive(2, 'reward_to_allowance'+oper2);
                this.$router.push({
                    path: '/invitation-allowance-list',
                    query: {
                        rewardType: num
                    }
                });
                let event = ['_trackEvent', '我的奖励', 'CLICK', '在我的奖励页面点击' + oper + '邀请津贴', '我的奖励页面-点击' + oper + '邀请津贴'];
                window._hmt.push(event);

            },
            toPath(path){
                if(path =='bind'){
                    this.addHive(0, 'reward_btn_openCount');
                    let event = ['_trackEvent', '我的奖励', 'CLICK', '我的奖励-开户', '我的奖励-开户'];
                    window._hmt.push(event);
                    if(this.userVerifyStatus <= 1){
                        this.addHive(2, 'reward_to_authentication');
                        path = '/authentication'
                    }else if(this.userVerifyStatus == 2){
                        this.addHive(2, 'reward_to_bindBankCard');
                        path = '/bind-bank-card'
                    }else if(this.userVerifyStatus == 3){
                        this.addHive(2, 'reward_to_setPayPass');
                        path = '/set-pay-password'
                    }
                }
                else{
                    let oper = path.replace('/','');
                    this.addHive(0, 'reward_link_'+oper);
                    this.addHive(2, 'reward_to_'+oper);
                    let event = ['_trackEvent', '我的奖励', 'CLICK', '我的奖励-'+oper, '我的奖励-'+oper];
                    window._hmt.push(event);
                }
                this.$router.push({
                    path: path
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
                this.addHive(0, 'reward_link_rewardList');
                this.addHive(2, 'reward_to_rewardList');
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
        }
    }
</script>
