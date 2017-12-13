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
        <advertise :pagetype="'KHCG'"></advertise>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/account-complete.less';
    import Advertise from '../components/Advertise';
    import {refreshApp} from '../tools/operation';
    export default {
        name: 'account-complete',
        data(){
            return {}
        },
        components: {
            Advertise
        },
        created(){
            this.addHive(1, 'account-complete');
            refreshApp();
        },
        computed: {
            ...mapState(
                ['investorRiskScore']
            )
        },
        methods: {
            complete(){
                this.addHive(0, 'accountComplete_btn_complete');

                if (window.sessionStorage.getItem('noviceUrl')) {
                    window.location.href = decodeURIComponent(window.sessionStorage.getItem('noviceUrl'));
                    return false;
                }
                if (window.sessionStorage.getItem('detail')) {
                    this.$router.back();
                } else {
                    this.$router.push('/financial');
                }
            }
        },
        mounted(){
        },
        destroyed(){
            this.addHive(2, 'account-complete');
        }
    }
</script>
