<template>
    <div class="redeem" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="header">
                <p class="title">{{fundAbbrName}}{{fundCode}}</p>
                <p class="tip f8">可赎回份额(份){{share}}</p>
            </div>
            <div class="content seperate">
                <div class="item bl" flex="cross:center">
                    <div flex-box="1" flex>
                        <p class="f8 item-title" flex-box="0">赎回份额</p>
                        <input type="number" placeholder="请输入赎回份额"
                               @keyup="updateShare"
                               v-model="redShare"
                               flex-box="0" class="input f8">
                        <p class="f8" flex-box="0">份</p>
                    </div>
                    <div flex-box="0">
                        <p class="btn f6" @click.stop="redAll">赎回全部</p>
                    </div>
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title" flex-box="0">赎回总值</p>
                    <p><span class="blue span">{{redAssets}}</span>元</p>
                    <p>（不包含手续费）</p>
                </div>
            </div>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title" flex-box="0">赎回到卡</p>
                    <p class="blue">{{name}}({{paymentNo.substr(-4)}})</p>
                </div>
            </div>
            <p class="f6 tip-bottom">预计赎回时间：3个交易日</p>
            <p class="f6 tip-bottom">具体时间以基金公司及银行确认时间为准</p>
        </div>
        <div class="footer">
            <div class="server">
                基金销售服务由<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">盈米财富</a>提供
            </div>
            <div class="quali">
                基金销售资格证号：000000378<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">详情</a>
            </div>
        </div>
        <div class="bottom" flex-box="0">
            <button class="btn btn-share"
                    @click.stop="redem"
                    :disabled="nagtive">赎回
            </button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/fund/redeem.less';
    import $api from '../tools/api';
    import {Toast, MessageBox} from 'mint-ui';
    export default {
        name: 'redeem',
        data(){
            return {
                share: 0,//持有份额
                redShare: '',// 赎回份额
                redAssets: 0,//赎回资产
                timer: null, //键盘事件延时器
                fundAbbrName: '',
                fundCode: ''
            }
        },
        created(){
            this.addHive(1, 'fundsRedeem');
            let event = ['_trackEvent', '基金赎回', 'SHOW', '进入基金赎回页面', '进入基金赎回页面'];
            window._hmt.push(event);
            this.getShares();
            this.fundCode = this.$route.query.code;
            this.fundAbbrName = this.$route.query.name;
        },
        computed: {
            nagtive(){
                return this.redShare <= 0;
            },
            ...mapState([
                'name',
                'paymentNo'
               ]),
        },
        methods: {
            /*可赎回份额*/
            getShares(){
                let fundCode = this.$route.query.code;
                return $api.get('/fund/redemption/available/share', {fundCode})
                    .then(res => {
                        if (res.code == 200) {
                            this.share = res.data;
                        }
                    });
            },
            /*赎回资产*/
            getAssets(){
                let fundCode = this.$route.query.code;
                let redShare = this.redShare;
                if (!redShare) {
                    this.redAssets = 0;
                    return false;
                }
                return $api.get('/fund/redemption/share/asset', {fundCode, redShare})
                    .then(res => {
                        if (res.code == 200) {
                            this.redAssets = res.data;
                        }
                    });
            },
            updateShare(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.getAssets();
                }, 250);
            },
            redAll(){
                this.addHive(0, 'fundsRedeem_btn_redeemAll');
                let event = ['_trackEvent', '基金赎回', 'CLICK', '基金赎回-点击全部赎回', '基金赎回-点击全部赎回'];
                window._hmt.push(event);
                this.redShare = this.share;
                this.getAssets();
            },
            /*赎回*/
            redem(){
                this.addHive(0, 'fundsRedeem_btn_submit');
                let event = ['_trackEvent', '基金赎回', 'CLICK', '基金赎回-点击赎回', '基金赎回-点击赎回'];
                window._hmt.push(event);
                let fundCode = this.$route.query.code;
                let share = this.redShare;
                return $api.post('/fund/redemption', {fundCode, share})
                    .then(res => {
                        if (res.code == 200) {
                            //expectReceivedDate orderId 2017101800007696
                            this.addHive(2, 'fundsRedeem_to_redeemRsult');
                            this.$router.push({
                                path:'/funds/redeem-result',
                                query:{
                                    s:share,
                                    d:res.data.expectReceivedDate
                                }
                            })
                          /*  Toast('赎回成功');
                            setTimeout(() => {
                                this.$router.back();
                            }, 1000);*/
                            return false;
                        }
                        MessageBox.alert(res.msg, '提示')
                            .then(() => {
                                this.getShares();
                                this.redShare = '';
                                this.redAssets = 0;
                            });
                    })
            }
        },
        destroyed(){
            this.addHive(2, 'fundsRedeem');
        }
    }
</script>
