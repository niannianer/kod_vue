<template>
    <div flex="dir:top" flex-box="1" class="reward-detail">
        <div class="header" flex-box="0">
            <ul>
                <li>定期理财</li>
                <li>高端理财</li>
            </ul>
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
               paidWithTax:'',
               unpaid:'',
               paid:''
            }
        },
        created(){
            $api.get('/reward/sum')
                .then(msg => {
                    if(msg.code != 401){
                        this.paidWithTax = msg.data.paidWithTax;
                        this.unpaid = msg.data.unpaid;
                        this.paid = msg.data.paid;
                    }
                    return msg
                })
        }
    }
</script>
