<template>
    <div class="assessment-result">
        <div class="content">
            <div class="title">您的风险测评结果是</div>
            <div class="img-warp">
                <img :src="typeUrl"/>
            </div>
            <div class="type-text">{{investorRiskTypeDesc}}投资者</div>
            <div class="sub-text">{{typeDesc(investorRiskType,isMinRiskLevel)}}</div>
            <div style="text-align: center">
                <span v-if="investorRiskType == 1&&isMinRiskLevel">您仅适合</span>
                <span v-else>您适合</span>
                <span>【{{investorRiskProductDesc}}】的产品和服务</span>
            </div>
        </div>
        <div class="re-submit">
            <button class="btn-default btn-done" @click.stop="done" :class="{'app':isApp}" v-show="isNewApp">完成测评</button>
            <button class="btn-default btn-submit" @click.stop="reSubmit" :class="{'app':isApp}">重新测评</button>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import $device from '../tools/device';
    import wx from '../tools/wx';
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
                isApp: false,

            }
        },
        created(){
            this.addHive(1, 'assessment-result');
            if ($device.isWeixin) {
                this.getShare();
            }
            if ($device.kingold) {
                this.isApp = true;
            }
            if (this.$route.query.from == 'app') {
                this.isApp = true;
            }
        },
        computed: {
            ...mapState([
                'investorRiskType',
                'investorRiskTypeDesc',
                'isMinRiskLevel',
                'investorRiskProductDesc'
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
            isNewApp(){
                return $device.kingoldVersion > '1.0.3' || (!$device.kingold);
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title: '金疙瘩——风险测评'
                });
            },
            reSubmit(){
                this.addHive(0, 'assessmentResult_btn_test');
                if (this.isApp) {
                    this.$router.replace({
                        path: '/risk-assessment/app',
                        query: {
                            retest: 1
                        }
                    });
                } else {
                    this.$router.replace({
                        path: '/risk-assessment/wechat',
                        query: {
                            retest: 1
                        }
                    });
                }

            },
            done(){
                this.addHive(0, 'assessmentResult_btn_complete');
                if (this.isApp) {
                    requestHybrid({
                        tagname: 'back',
                        param: {
                            done: 0,// "完成测评",
                            backAndRefresh: 1,
                        }
                    });
                } else {
                    this.$router.back();
                }
            },
            typeDesc(investorRiskType,isMinRiskLevel){
                let output = '';
                if(isMinRiskLevel&&investorRiskType==1){
                    output = '保护本金不受损蚀和保持资产的流动性是您的首要目标。对投资的态度是希望投资收益极度稳定，对风险的容忍程度极低。'
                    return output;
                }
                switch (investorRiskType) {
                    case 1:
                        output = '保护本金不受损蚀和保持资产的流动性是您的首要目标。对投资的态度是希望投资收益极度稳定，不愿用高风险来换取收益，通常不太在意资金是否有较大增值，通常不愿意承受投资波动。'
                        break;
                    case 2:
                        output = '稳定是您的重要考虑因素，希望投资在保证本金安全的基础上能有一些增值收入。希望投资有一定的收益，但常常因回避风险而最终不会采取任何行动。'
                        break;
                    case 3:
                        output = '渴望有较高的投资收益，但又不愿承受较大的风险；可以承受一定的投资波动，但是希望自己的投资风险小于市场的整体风险，因此希望投资收益长期、稳步地增长。对风险有清醒的认识，通常不会采取激进的办法去达到目标，追求缓慢但稳定地进步。'
                        break;
                    case 4:
                        output = '专注于投资的长期增值，常常会为提高投资收益而采取一些行动，并愿意为此承受较大的风险。能够冒风险去追求目标，但是通常也不会忘记风险防范。'
                        break;
                    case 5:
                        output = '高度追求资金的增值，愿意接受可能年年出现的大幅波动，以换取资金高成长的可能性。为了最大限度地获得资金增值，常常将大部分资金投入风险较高的品种。愿意承受失败的风险。'
                        break;
                }
                return output;
            }
        },
        destroyed(){
            this.addHive(2, 'assessment-result');
        }
    }
</script>
