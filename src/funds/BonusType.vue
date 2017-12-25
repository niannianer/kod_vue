<template>
    <div flex="dir:top" class="bonus-type">
        <div flex-box="1">
            <div class="type-item" @click="dividendMethod = item.dividendMethod"
                 v-for="(item,index) in typeList" @key="index"
                 :class="{'active':item.dividendMethod == dividendMethod}">
                <div class="name">{{item.name}}</div>
                <div>{{item.desc}}</div>
            </div>
        </div>
        <button class="btn" @click.stop="confirmSet">确认修改</button>
        <king-message v-if="showMessage" @confirmBack="confirms" @cancelBack="cancel"
                      :options="msgOption"></king-message>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import KingMessage from '../components/Message/KingMessage.vue';
    import '../less/fund/bonus-type.less';
    import successImg from '../images/fund/submit-success.png';

    export default {
        name: 'base',
        data() {
            return {
                dividendMethod: 0,
                fundCode: '',
                showMessage: false,
                msgOption: {},
                type: 'confirm',
                typeList: [{
                    name: '现金分红',
                    desc: '分红所得资金转入银行卡',
                    dividendMethod: 1
                }, {
                    name: '红利资金再投',
                    desc: '分红所得资金直接用于购买该基金，将分红转为持有基金份额',
                    dividendMethod: 0
                }]
            }
        },
        components: {KingMessage},
        created() {
            this.dividendMethod = this.$route.query.bonus || 0;
            this.fundCode = this.$route.query.fundCode || 0;
            this.addHive(1, 'fundsBonusType',1048);
            let event = ['_trackEvent', '修改分红方式', 'SHOW', '进入修改分红方式页面', '进入修改分红方式页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState(['userUuid']),
        },
        methods: {
            confirmSet(){
                this.addHive(0, 'fundsBonusType_btn_confirm',104801);
                let event = ['_trackEvent', '修改分红方式', 'SHOW', '修改分红方式-确认修改', '修改分红方式-确认修改'];
                window._hmt.push(event);
                this.showMessage = true;
                this.type = 'confirm';
                this.msgOption = {
                    hideTitle: true,
                    msg: `<div class="bonus-msg">确认修改分红方式为<br/>${this.dividendMethod == 1 ? '现金分红' : '红利资金再投'}？</div>`,
                    showCancelButton: true
                }
            },
            confirms() {
                this.showMessage = false;
                if (this.type == 'confirm') {
                    this.addHive(0, 'fundsBonusType_modal_confirm',104891);
                    let event = ['_trackEvent', '修改分红方式', 'CLICK', '修改分红方式-弹窗-确认', '修改分红方式-弹窗-确认'];
                    window._hmt.push(event);
                    this.setDividendMethod();
                } else if (this.type == 'success') {
                    this.addHive(0, 'fundsBonusType_modal_confirmSucc',104891);
                    let event = ['_trackEvent', '修改分红方式', 'CLICK', '修改分红方式-弹窗-修改成功确认', '修改分红方式-弹窗-修改成功确认'];
                    window._hmt.push(event);
                    this.$router.back();
                } else {
                    this.addHive(0, 'fundsBonusType_modal_confirmFail',104891);
                    let event = ['_trackEvent', '修改分红方式', 'CLICK', '修改分红方式-弹窗-修改失败确认', '修改分红方式-弹窗-修改失败确认'];
                    window._hmt.push(event);
                    this.$router.back();
                }
            },
            cancel(){
                this.addHive(0, 'fundsBonusType_modal_cancel',104891);
                let event = ['_trackEvent', '修改分红方式', 'CLICK', '修改分红方式-弹窗-取消', '修改分红方式-弹窗-取消'];
                window._hmt.push(event);
                this.showMessage = false
            },
            setDividendMethod(){
                let {dividendMethod, fundCode, userUuid} = this;
                $api.post('/fund/purch/setDividendMethod', {
                    dividendMethod,
                    fundCode,
                    userUuid
                }, '正在等待确认').then((resp) => {
                    this.showMessage = true;
                    if (resp.code == 200) {
                        this.msgOption = {
                            title: '提交成功',
                            msg: `<img src="${successImg}" style="width: 1.6rem;"/>`,
                            confirmText: '确定'
                        };
                        this.type = 'success';
                        return false;
                    }
                    this.type = 'fail';
                    this.msgOption = {
                        title: '提交失败',
                        msg: resp.msg,
                        confirmText: '确定'
                    };
                });
            }
        },
        mounted() {
        },
        destroyed() {
            this.addHive(1, 'fundsBonusType',1048);
        }
    }
</script>
