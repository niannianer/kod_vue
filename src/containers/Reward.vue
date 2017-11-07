<template>
    <div flex="dir:top" flex-box="1" class="reward">
        <div class="header" flex-box="0">
            <p class="right" @click.stop="$router.push('/reward-detail')">奖励细则</p>
            <ul flex class="ul">
                <li flex-box="1">
                    <p class='tile'>待结算（税前）</p>
                    <p class='info'>{{unpaid}}元</p>
                </li>
                <li flex-box="1">
                    <p class='tile'>已结算（税后）</p>
                    <p class='info'>{{paidWithTax}}元</p>
                </li>
            </ul>
        </div>
        <div class="body" flex-box="1">
            <div class='invite-award section' flex @click.stop="rewardList">
                <p flex-box="1">邀请奖励</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </div>
            <div @click="allowance(2)" class='invite-award section' flex>
                <p flex-box="1">邀请津贴</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </div>
            <div class='invite-subsidy' flex>
                <p @click="allowance(2)" class="direct" flex-box="1">直接邀请津贴</p>
                <p @click="allowance(3)" class='indirect' flex-box="1">间接邀请津贴</p>
            </div>
            <advertise></advertise>
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
                paidWithTax: '',
                unpaid: '',
                paid: ''
            }
        },
        computed: mapState(['userUuid']),
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
            getSum(){
                $api.get('/reward/sum', {
                    'userUuid': this.userUuid
                })
                    .then(msg => {
                        if (msg.code == 200) {
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
