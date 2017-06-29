<template>
    <div class="bind-bank-card" flex-box="1" >
        <div class="bind-head">
            <dl flex class="person">
                <dt>持卡人</dt>
                <dd>{{investorRealName}}</dd>
            </dl>
            <dl flex class="bank-card">
                <dt v-html="html"></dt>
                <dd>
                    <input  type="tel" placeholder="请输入银行卡号" @input="change" @propertychange="change" v-model="bankCard" maxlength="24">
                </dd>
            </dl>
        </div>
        <div class="bind-box">
            <div class="bind-lint" flex="main:justify">
                <div class="lint-l">
                    <span v-show="bankHint">单笔限额{{singleLimit}}元，每日限额{{perdayLimit}}元</span>
                </div>
                <div class="lint-l">
                    <router-link to="/bank-list">支持绑卡的银行</router-link>
                </div>
            </div>
            <dl class="bind-mobile" flex>
                <dt>银行预留手机号</dt>
                <dd><input type="tel" placeholder="请输入银行预留手机号" maxlength="14" v-model="bankUserPhone"></dd>
            </dl>
            <p class="p-lint"><span v-show="pShow">验证码已发送到注册手机{{investorMobile | mobileFormat}}</span></p>
            <ul flex="main:justify">
                <li class="ul-l">验证码</li>
                <li class="ul-c" flex-box="1"><input type="text" placeholder="输入验证码" maxlength="8" v-model="verifyCode"></li>
                <li class="ul-r"><button :class="{'active':btnActive}" @click.stop="transmit">{{btnText}}</button></li>
            </ul>
        </div>
        <div class="bind-foot">
            <div class="p-agreement" flex>
                <span class="icon" @click.stop="agreement = !agreement" :class="{active:agreement}"></span>
                <span>我已阅读并同意<router-link to="/index">《支付服务协议》</router-link></span>
            </div>
            <div class="bind-btn" flex="main:center">
                <button :class="{active:agreement}" @click.stop="submit">完成</button>
            </div>
            <div class="deatil">
                <p>为了您的账户资金安全，只能单个绑定实名认证用户本人的银行卡，所有资金交易必须在您本人名下银行卡中划转；</p>
                <p>银行卡预留手机号相关问题，请联系开户行寻求帮助。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/bind-bank-card.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import {checkPhone} from '../tools/fun';
    import {Toast} from 'mint-ui';
    let imgNames = ['abchina', 'bankcomm', 'bankofshanghai',
        'boc', 'ccb', 'cebbank', 'cgbchina', 'cib', 'cmbc',
        'cmbchina', 'ecitic', 'hxb', 'icbc', 'pingan', 'psbc', 'spdb'];
    let imgUrls = {};
    imgNames.map(url => {
        imgUrls[url] = require(`../images/bank/${url}.png`)
    });
    export default {
        name: 'bind-bank-card',
        data(){
            return {
                bankUserPhone:'',//预留手机号
                verifyCode:'',//验证码
                bankHint:false,
                bankCard:'',
                html:'储蓄卡卡号',
                bankName:'',
                singleLimit:'',
                perdayLimit:'',
                btnActive:true,
                btnText:'',
                flag:true,
                pShow:false,
                agreement:false,
                imgUrls
            };
        },
        computed:
            mapState([
                'investorMobile',
                'investorRealName',
                'userId'
                ]
            ),
        methods: {
            change(){
                this.bankCard = this.bankCard.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
                let card = this.bankCard.replace(/[^\d]/g,'');
                if(card.length < 6){
                    this.html = '储蓄卡卡号';
                    this.bankHint = false;
                }else if(card.length == 6){
                    $api.get('/getBankInfo',{bankNo:card}).then(msg=>{
                        if(msg.code == 200){
                            this.bankHint = true;
                            this.singleLimit = msg.data.single_limit;
                            this.perdayLimit = msg.data.perday_limit;
                            if(msg.data.bank_code && msg.data.bank_name)
                                this.html = `<span class="bank-inner" style="background-image:url(${this.imgUrls[msg.data.bank_code]})">${msg.data.bank_name}</span>`;
                        }else{
                            Toast(msg.msg)
                        }
                    });
                }
            },
            //下发验证码
            send(time){
                this.flag = true;
                this.btnActive = false;
                let recursion = () =>{
                    if(this.flag){
                        if(time <= 1){
                            this.btnText = '重新获取';
                            this.btnActive = true;
                        }else{
                            time --;
                            this.btnText = '已发送'+time+'s';
                            var timer = setTimeout(recursion,1000);
                        }
                    }else{
                        clearTimeout(timer);
                    }
                };
                recursion();
            },
            transmit(){
                if(this.btnActive){
                    $api.get('/sendBaofooAuthSMS',{type:1}).then(msg=>{
                        if(msg.code == 200){
                            //显示提示
                            this.pShow = true;
                        }else{
                            Toast(msg.msg);
                            this.btnText = '重新获取';
                            this.btnActive = true;
                            this.flag = false;
                        }
                    });
                    //下发验证码
                    this.send(120);
                }
            },
            submit(){
                let {investorRealName,bankCard,bankUserPhone,verifyCode} = this;
                let bankUserCardNo = bankCard.replace(/[^\d]/g,'');
                if(bankUserCardNo.length < 6){
                    Toast('请输入正确银行卡号')
                    return 
                }
                if(!checkPhone(bankUserPhone)){
                    Toast('手机号输入有误')
                    return
                }
                if(verifyCode.length < 4){
                    Toast('请输入正确验证码')
                    return
                }
                this.$router.push('/set-pay-password')
                $api.post('/bindBankCard',{userName:investorRealName,bankUserCardNo:bankUserCardNo,bankUserPhone:bankUserPhone,verifyCode:verifyCode}).then(msg=>{
                    if(msg.code == 200){
                        Toast('绑卡成功');
                        setTimeout(()=>{
                            this.$router.push('/set-pay-password')
                        },3000)
                    }else{
                        Toast(msg.msg);
                    }
                });
            }
        },
        created(){
            this.transmit()
        }
    }
</script>
