<template>
    <div flex="dir:top" flex-box="1" class="reward">
        <div class="header" flex-box="0">
            <ul>
                <li class='sum'>
                    <p class='tile'>累计奖励</p>
                    <p class='info'>{{paid}}元</p>
                </li>
            </ul>
            <ul flex>
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
            <router-link to="/invitation-reward-list" class='invite-award section' flex>
                <p flex-box="1">邀请奖励</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </router-link>
            <router-link to='/invitation-allowance-list' class='invite-award section' flex>
                <p flex-box="1">邀请津贴</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </router-link>
            <div class='invite-subsidy' flex>
                <p @click ="allowance(2)" class="direct" flex-box="1">直接邀请津贴</p>
                <p @click="allowance(3)" class='indirect' flex-box="1">间接邀请津贴</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/reward.less';
    import $api from '../tools/api';
    export default {
        name: 'reward',
        data(){
            return {
               paidWithTax:'',
               unpaid:'',
               paid:''
            }
        },
        computed: mapState(['userUuid']),
        methods:{
            allowance(num){
                this.$router.push("/invitation-allowance-list?rewardType="+num+"");
            }
        },
        watch: {
            userUuid(){
                if (this.userUuid) {
                    $api.get('/reward/sum',{
                        'userUuid':this.userUuid
                    })
                        .then(msg => {
                            if(msg.code == 200){
                                this.paidWithTax = msg.data.paidWithTax;
                                this.unpaid = msg.data.unpaid;
                                this.paid = msg.data.paid;
                            }
                            return msg
                        })
                }
            }
        }
    }
</script>
