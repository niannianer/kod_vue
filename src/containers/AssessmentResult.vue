<template>
    <div class="assessment-result">
        <div class="content">
            <div class="title">您的风险评测结果是</div>
            <div class="img-warp">
                <img :src="typeUrl"/>
            </div>
            <div class="type-text">{{data[investorRiskType].type}}</div>
            <div class="sub-text">{{data[investorRiskType].desc}}</div>
            <div style="text-align: center">
                <span v-if="investorRiskType == 5">您仅适合</span>
                <span v-else>您适合</span>
                <span>【{{data[investorRiskType].recommend}}】的产品和服务</span>
            </div>
        </div>
        <div class="re-submit">
            <button class="btn-default btn-done" @click.stop="done" :class="{'app':isApp}" v-if="isNewApp">完成测评</button>
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
                data: [
                    {
                        type: '保守型投资者',
                        desc: '保护本金不受损蚀和保持资产的流动性是您的首要目标。对投资的态度是希望投资收益极度稳定，不愿用高风险来换取收益，通常不太在意资金是否有较大增值，通常不愿意承受投资波动。',
                        recommend: '低风险'
                    },
                    {
                        type: '谨慎型投资者',
                        desc: '稳定是您的重要考虑因素，希望投资在保证本金安全的基础上能有一些增值收入。希望投资有一定的收益，但常常因回避风险而最终不会采取任何行动。',
                        recommend: '低风险、中低风险'
                    },
                    {
                        type: '稳健型投资者',
                        desc: '渴望有较高的投资收益，但又不愿承受较大的风险；可以承受一定的投资波动，但是希望自己的投资风险小于市场的整体风险，因此希望投资收益长期、稳步地增长。对风险有清醒的认识，通常不会采取激进的办法去达到目标，追求缓慢但稳定地进步。',
                        recommend: '低风险、中低风险、中等风险'
                    },
                    {
                        type: '积极型投资者',
                        desc: '专注于投资的长期增值，常常会为提高投资收益而采取一些行动，并愿意为此承受较大的风险。能够冒风险去追求目标，但是通常也不会忘记风险防范。',
                        recommend: '低风险、中低风险、中等风险、中高风险'
                    },
                    {
                        type: '激进型投资者',
                        desc: '高度追求资金的增值，愿意接受可能年年出现的大幅波动，以换取资金高成长的可能性。为了最大限度地获得资金增值，常常将大部分资金投入风险较高的品种。愿意承受失败的风险。',
                        recommend: '低风险、中低风险、中等风险、中高风险、高风险'
                    },
                    {
                        type: '最低风险承受能力的投资者',
                        desc: '保护本金不受损蚀和保持资产的流动性是您的首要目标。对投资的态度是希望投资收益极度稳定，对风险的容忍程度极低。',
                        recommend: '低风险'
                    },

                ]
            }
        },
        created(){
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
            isNewApp(){
                return $device.kingoldVersion>'1.0.3';
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title: '金疙瘩——风险测评'
                });
            },
            reSubmit(){
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
                if (this.isApp) {
                    requestHybrid({
                        tagname: 'back',
                        param: {
                            done: 0// "完成测评",
                        }
                    });
                } else {
                    this.$router.back();
                }
            }
        },
        destroyed(){
        }
    }
</script>
