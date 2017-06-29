<template>
    <div class="reset-pay-password" flex="dir:top">
        <div class="reset-verify" v-show="!setPassword">
            <div class="verify-card" v-show="verifyCard">
                <div class="verify-title">输入<span>{{investorRealName.replace(/.(?=.)/g, '*')}}</span>的身份证号后四位以验证身份</div>
                <div class="verify-content">
                    <dl flex>
                        <dt>请输入身份证号后四位</dt>
                        <dd><input type="tel" maxlength="4" placeholder="请输入身份证号后四位" v-model="idCardTail"></dd>
                    </dl>
                </div>
                <div class="reset-btn" flex="main:center">
                    <button :class="{active:idCardTail.length>=4}" @click.stop="next" >下一步</button>
                </div>
            </div>
            <div class="verify-code" v-show="!verifyCard">
                <div class="verify-title">
                    <p>短信验证码已发送到您的注册手机</p>
                    <p><span v-show="mobileShow">{{investorMobile | mobileFormat}}</span></p>
                </div>
                <div class="verify-content">
                    <ul flex="main:justify">
                        <li>请输入短信验证码</li>
                        <li flex="1"><input type="tel" placeholder="6位数字验证码" maxlength="6" v-model="verifyCode"></li>
                        <li><span :class="{active:spanActive}" @click.stop="sendCode">{{spanText}}</span></li>
                    </ul>
                </div>
                <div class="reset-btn" flex="main:center">
                    <button :class="{active:verifyCode.length>=6}" @click.stop="next" >下一步</button>
                </div>
            </div>
        </div>
        <div class="set-pay-password" flex="dir:top" v-show="setPassword">
            <div class="password-header" flex-box="1">
                <div class="psw-img">
                    <img src="../images/set-pay-psw.png" alt="">
                </div>
                <p class="psw-title">{{pTitle}}</p>
                <div class="psw-input">
                    <ul flex="main:center">
                        <li v-for=" n in 6" :class="{active:n<=password.length}"></li>
                    </ul>
                    <p class="error-hint" v-show="pShow">两次输入不一致！</p>
                </div>
                <div class="psw-btn" flex="main:center">
                    <button :class="{'active':btnActive}" v-show="btnShow" @click.stop="submit">完成</button>
                </div>
            </div>
            <keyboard title="键盘" flex-box="0" @callBack="callBack"></keyboard>
        </div>
    </div>
</template>
<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import EventBus from  '../tools/event-bus';
    import {Toast} from 'mint-ui';
    import Keyboard from '../components/Keyboard';
    import '../less/set-pay-password.less';
    export default {
        name: 'withdraw',
        data(){
            return {
                idCardTail:'',
                verifyCode:'',
                setPassword:false,
                verifyCard:true,
                nextActive:false,
                spanActive:true,
                spanText:'获取验证码',
                mobileShow:false,
                flag:true,

                //设置交易密码
                pTitle:'请设置金疙瘩交易密码，用于交易验证',//
                password:'',
                storagePassword:'',
                pShow:false,
                btnActive:false,
                btnShow:false,
                
            }
        },
        components: {
            Keyboard
        },
        computed: mapState([
            'investorMobile',
            'investorRealName']
        ),
        methods: {
            sendCode(){
                if(this.spanActive){
                    $api.get('/sendVerifyCode',{investorMobile:this.investorMobile,imageCode:this.imageCode,bussType:2}).then(msg=>{
                        if(msg.code == 200){
                            //显示提示
                            this.mobileShow = true;
                        }else if(msg.code == 1004){
                            Toast(msg.msg);
                        }
                        else{
                            Toast(msg.msg);
                            this.spanText = '重新获取';
                            this.spanActive = true;
                            this.flag = false;
                        }
                    });
                    this.send(60)
                }
            },//下发验证码
            send(time){
                this.spanActive = false;
                this.flag = true;
                let recursion = () =>{
                    if(this.flag){
                        if(time <= 1){
                            this.spanText = '重新获取';
                            this.spanActive = true;
                        }else{
                            time --;
                            this.spanText = '已发送'+time+'s';
                            var timer = setTimeout(recursion,1000);
                        }
                    }else{
                        clearTimeout(timer);
                    }
                };
                recursion();
            },
            next(){
                if(this.verifyCard){
                    if(this.idCardTail.length >= 4){
                        $api.post('/checkIdCard',{idCardTail:this.idCardTail}).then(msg=>{
                            if(msg.code == 200){
                                this.verifyCard = false;
                                this.send(60);
                            }else{
                                Toast(msg.msg);
                            }
                        });
                    }
                }else{
                    if(this.verifyCode.length >= 6){
                        $api.post('/checkVerifyCode',{verifyCode:this.verifyCode,investorMobile:this.investorMobile,bussType:2}).then(msg=>{
                            if(msg.code == 200){
                                this.setPassword = true;
                            }else{
                                Toast(msg.msg);
                            }
                        });
                    }
                }
            },
            callBack(password){
                if(password == 'only'){
                    this.password = '';
                    return
                }
                this.pShow = false;
                this.password = password;
                if(this.storagePassword.length>2){
                    this.pTitle = '请再次填写以确认';
                    if(password.length>=6){
                        this.btnActive = true;
                    }else{
                        this.btnActive = false;
                    }
                }else{
                    this.btnShow = false;
                    if(password.length>=6){
                        this.storagePassword = password;
                        setTimeout(()=>{
                            EventBus.$emit('clearInput');
                            this.btnShow = true;
                        },300);
                    }
                }
            },
            submit(){
                if(!this.btnActive){return}
                let {password,storagePassword} = this;
                if(password == storagePassword){
                    $api.post('/initPayPassword',{userPayPassword:password}).then(msg=>{
                        if(msg.code == 200){
                            Toast('您已成功开通托管账户，可进行投资');
                            this.$router.push('/my-assets');
                        }else{
                            Toast(msg.msg);
                        }
                    });
                }else{
                    this.storagePassword = '';
                    this.pShow = true;
                    this.btnShow = false;
                    this.pTitle = '请设置金疙瘩交易密码，用于交易验证';
                    EventBus.$emit('clearInputOnly');
                }
            }
        },
        destroyed(){
            /*Indicator.close();
            MessageBox.close();*/
        }
    }
</script>
