<template>
    <div class="assessment-result">
        <div class="content">
            <div class="title">您的风险评测结果是</div>
            <div class="img-warp">
                <img :src="typeUrl"/>
            </div>
            <div class="type-text">{{typeText}}</div>
            <div class="sub-text">您的风险承受能力{{typeAblity}}</div>
        </div>

        <div class="re-submit">
            <button class="btn-default btn-submit" @click.stop="reSubmit">重新测评</button>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import $device from '../tools/device';
    import requestHybrid from '../tools/hybrid';
    import '../less/assessment-result.less';
    import baoshou from '../images/assessment-result/banshou.png';
    import chengzhang from '../images/assessment-result/chengzhang.png';
    import jinqu from '../images/assessment-result/jinqu.png';
    import pinghen from '../images/assessment-result/pinghen.png';
    import wenjian from '../images/assessment-result/wenjian.png';
    export default {
        name: 'assessment-result',
        data(){
            return {
                isApp: false
            }
        },
        created(){
            if($device.kingold){
                this.isApp = true;
            }
            if (this.$route.query.from=='app') {
                this.isApp = true;
            }
        },
        computed: {
            ...mapState([
                'investorRiskType',
                'investorRiskTypeDesc'
            ]),
            typeUrl(){
                if (!this.investorRiskType) {
                    return baoshou;
                }
                if (this.investorRiskType == 1) {
                    return wenjian;
                }
                if (this.investorRiskType == 2) {
                    return pinghen;
                }
                if (this.investorRiskType == 3) {
                    return chengzhang;
                }
                return jinqu;
            },
            typeText(){
                if (!this.investorRiskType) {
                    return '保守型';
                }
                if (this.investorRiskType == 1) {
                    return '稳健型';
                }
                if (this.investorRiskType == 2) {
                    return '平衡型';
                }
                if (this.investorRiskType == 3) {
                    return '成长型';
                }
                return '进取型';
            },
            typeAblity(){
                if (!this.investorRiskType) {
                    return '弱';
                }
                if (this.investorRiskType == 1) {
                    return '较弱';
                }
                if (this.investorRiskType == 2) {
                    return '中等';
                }
                if (this.investorRiskType == 3) {
                    return '较强';
                }
                return '强';
            }
        },
        methods: {
            reSubmit(){
                if(this.isApp){
                    this.$router.replace({
                        path:'/risk-assessment/app',
                        query:{
                            retest:1
                        }
                    });
                }else {
                    this.$router.replace({
                        path:'/risk-assessment/wechat',
                        query:{
                            retest:1
                        }
                    });
                }

            }
        },
        destroyed(){
        }
    }
</script>
