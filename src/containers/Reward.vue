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
            <router-link to="/home" class='invite-award section' flex>
                <p flex-box="1">邀请奖励</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </router-link>
            <router-link to='/dd' class='invite-award section' flex>
                <p flex-box="1">邀请津贴</p>
                <img flex-box="0" src="../images/arrow-right.png" alt="arrow">
            </router-link>
            <router-link to='ccc'class='invite-subsidy' flex>
                <div class='direct' flex-box="1">直接邀请津贴</div>
                <div class='indirect' flex-box="1">间接邀请津贴</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import '../less/reward.less';
    import $api from '../tools/api';
    export default {
        name: 'reward',
        data(){
            return {
               paidWithTax:'23',
               unpaid:'',
               paid:''
            }
        },
        created(){
            $api.get('/reward/sum')
                .then(msg => {
                    this.paidWithTax = msg.data.paidWithTax;
                    this.unpaid = msg.data.unpaid;
                    this.paid = msg.data.paid;
                    return msg
                })
        }
    }
</script>
