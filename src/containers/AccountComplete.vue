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
    import '../less/account-complete.less';
    export default {
        name: 'base',
        data(){
            return {}
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {
            complete(){
                this.$router.push('/personal-center');
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
