<template>
    <div class="appoint-succ">
        <div class="header">
            <img src="../images/purchase/pay-success.png" alt="succ">
            <p>恭喜您，预约成功</p>
        </div>
        <div class="body">
            <p class="tip1">我们专业理财顾问会在24小时之内与您联系</p>
            <p class="tip2">请前往个人中心完成实名认证，银行卡绑定和风险测评，以保障邀请奖励顺利发放。</p>
            <div class="btn" @click.stop="backHandle">返回</div>
        </div>
    </div>
</template>

<script>
    import '../less/appoint-succ.less'
    export default {
        name: 'appoint-succ',
        data(){
            return {}
        },
        created(){
            this.addHive(1, 'appoint-succ');
        },
        computed: {},
        methods: {
            backHandle(){
                this.$router.push({
                    path:'/financial',
                    query:{
                        'tab':'PRIF'
                    }
                })
            }
        },
        destroyed(){
            this.addHive(2, 'appoint-succ');
        }
    }
</script>
