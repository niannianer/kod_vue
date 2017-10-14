<template>
    <div class="account-complete">
        <div class="complete-icon">
            <img class="icon" src="../images/complete-icon.png"/>
        </div>
        <div class="complete-text">
            恭喜您，第三方托管账户已开通成功！
        </div>
        <div class="complete">
            <button class="btn-primary btn-complete" @click.stop="complete">完成</button>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/account-complete.less';
    export default {
        name: 'base',
        data(){
            return {}
        },
        components: {},
        created(){
        },
        computed: {
            ...mapState(
                ['investorRiskScore']
            )
        },
        methods: {
            complete(){
                //从基金详情页点击“申购”
                if(this.$route.query.from == 'detail'){
                    //没有录入适当性管理信息，跳适当性录入信息页面
                    if(this.investorRiskScore == 0){
                        this.$router.replace({
                            path: '/funds/info',
                            query:{
                                from:'detail'
                            }
                        });
                    }else{
                        //完成录入适当性管理信息，跳基金详情页
                        this.$router.back();
                    }
                    return false;
                }
                this.$router.push('/personal-center');
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
