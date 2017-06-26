<template>
    <div class="register">
        <div class="form">
            <div class="form-item" flex>
                <label class="label" for="phone" flex-box="0">手机号</label>
                <input class="input" type="tel" name="phone"  id="phone" flex-box="1"
                       v-model.trim="investorMobile"
                       autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="form-item" flex>
                <label class="label" for="yzm" flex-box="0">验证码</label>
                <input class="input" type="tel" name="yzm"  id="yzm" flex-box="1"
                       v-model.trim="verifyCode"
                       autocomplete="off" placeholder="请输入验证码">
                <button flex-box="0" class="btn-default btn-code"></button>
            </div>

            <div class="form-item" flex>
                <label class="label" for="imageCode" flex-box="0">校验码</label>
                <input class="input" type="text" name="imageCode"  id="imageCode" flex-box="1"
                       v-model="inputCode"
                       autocomplete="off" placeholder="请输入校验码">
                <button flex-box="0" class="btn-default btn-code"></button>
            </div>

            <div class="form-item" flex>
                <label class="label" for="password" flex-box="0">设置密码</label>
                <input class="input" type="text" name="password"  id="password" flex-box="1"
                       v-model.trim="userLoginPassword"
                       autocomplete="off" placeholder="请设置6-20位数字或字母密码">
            </div>

            <div class="form-item" flex>
                <label class="label" for="invitation" flex-box="0">邀请人</label>
                <input class="input" type="tel" name="invitation"  id="invitation" flex-box="1"
                       v-model.trim="inviterPhone"
                       autocomplete="off" placeholder="请输入邀请人手机号（非必填）">
            </div>

        </div>
        <div class="agreement">
            <span class="box"></span>
            <span>我已阅读并同意<a href="/registration-service-agreement.html">《中冀金服注册协议及用户协议》</a></span>
        </div>
    </div>
</template>
<script>
    import '../less/register.less';
    export default{
        name:'register',
        data(){
            return {
                investorMobile:'',
                verifyCode:'',
                userLoginPassword:'',
                inviterPhone:'',
                inputCode:'',
                imageCode:''
            }
        }
    }
</script>
