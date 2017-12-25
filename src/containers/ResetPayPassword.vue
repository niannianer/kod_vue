<template>
    <div class="reset-pay-password" flex="dir:top">
        <div class="reset-verify" v-show="!setPassword">
            <div class="verify-card" v-show="verifyCard">
                <div class="verify-title">输入<span>{{investorRealName.replace(/.(?=.)/g, '*')}}</span>的身份证号后四位以验证身份</div>
                <div class="verify-content">
                    <dl flex>
                        <dt>请输入身份证号后四位</dt>
                        <dd><input type="text" maxlength="4" placeholder="请输入身份证号后四位" v-model="idCardTail"></dd>
                    </dl>
                </div>
                <div class="reset-btn" flex="main:center">
                    <button :class="{active:idCardTail.length>=4}" @click.stop="next" >下一步</button>
                </div>
            </div>
            <div class="verify-code" v-show="!verifyCard">
                <div class="verify-title">
                    <p>短信验证码已发送到您的注册手机</p>
                    <p><span>{{investorMobile | mobileFormat}}</span></p>
                </div>
                <div class="verify-box">
                    <div class="verify-content verify-border" v-show="imgcodeShow">
                        <ul flex="main:justify">
                            <li>请输入校验码</li>
                            <li flex="1"><input type="text" placeholder="4位验证码" maxlength="4" v-model="imageCode"></li>
                            <li flex="main:right"><a>{{receiveCode}}</a></li>
                        </ul>
                    </div>
                    <div class="verify-content">
                        <ul flex="main:justify">
                            <li>请输入短信验证码</li>
                            <li flex="1"><input type="tel" placeholder="6位数字验证码" maxlength="6" v-model="verifyCode"></li>
                            <li><span :class="{active:spanActive}" @click.stop="sendCode">{{spanText}}</span></li>
                        </ul>
                    </div>
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
                imageCode:'',
                receiveCode:'',
                setPassword:false,
                verifyCard:true,
                nextActive:false,
                spanActive:true,
                spanText:'获取验证码',
                //mobileShow:false,
                imgcodeShow:false,
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
        created(){
            this.addHive(1, 'resetPayPassword',1039);
            let event = ['_trackEvent', '重置交易密码', 'SHOW', '进入重置交易密码页面','进入重置交易密码页面'];
            window._hmt.push(event);
        },
        methods: {
            sendCode(){
                this.addHive(0, 'resetPayPassword_btn_getVerifyCode',103901);
                let event = ['_trackEvent', '重置交易密码', 'CLICK', '重置交易密码-获取验证码','重置交易密码-获取验证码'];
                window._hmt.push(event);
                if(this.spanActive){
                    this.getCode()
                }
            },
            getCode(){
                $api.post('/sendVerifyCode',{investorMobile:this.investorMobile,imageCode:this.imageCode,bussType:2}).then(msg=>{
                    if(msg.code == 200){
                        //隐藏图形验证
                        this.imgcodeShow = false;
                    }else if(msg.code == 1004){
                        Toast(msg.msg);
                        this.imgcodeShow = true;
                        this.receiveCode = msg.data.imageCode;
                        this.flag = false;
                    }
                });
                this.send(60)
            },
            //下发验证码
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
                        this.spanText = '重新获取';
                        this.spanActive = true;
                    }
                };
                recursion();
            },
            next(){
                if(this.verifyCard){
                    this.addHive(0, 'resetPayPassword_btn_checkIdCard',103902);
                    let event = ['_trackEvent', '重置交易密码', 'CLICK', '重置交易密码-点击下一步校验身份证','重置交易密码-点击下一步校验身份证'];
                    window._hmt.push(event);
                    if(this.idCardTail.length >= 4){
                        $api.post('/checkIdCard',{idCardTail:this.idCardTail}).then(msg=>{
                            if(msg.code == 200){
                                this.verifyCard = false;
                                this.getCode(60);
                            }else{
                                Toast(msg.msg);
                            }
                        });
                    }
                }else{
                    this.addHive(0, 'resetPayPassword_btn_checkVerifyCode',103903);
                    let event = ['_trackEvent', '重置交易密码', 'CLICK', '重置交易密码-点击下一步校验验证码','重置交易密码-点击下一步校验验证码'];
                    window._hmt.push(event);
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
                this.addHive(0, 'resetPayPassword_btn_submit',103904);
                let event = ['_trackEvent', '重置交易密码', 'CLICK', '重置交易密码-点击设置交易密码','重置交易密码-点击设置交易密码'];
                window._hmt.push(event);
                if(!this.btnActive){return}
                let {password,storagePassword,idCardTail,verifyCode,investorMobile} = this;
                if(password == storagePassword){
                    $api.post('/resetPayPassword',{idCardTail:idCardTail,userPayPassword:password,investorMobile:investorMobile,verifyCode:verifyCode}).then(msg=>{
                        if(msg.code == 200){
                            Toast('重置交易密码成功');
                            this.addHive(2, 'resetPayPassword_to_lastPage',1039);
                            setTimeout(()=>{
                                this.$router.go(-1);
                            },3000);
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
        }
    }
</script>
