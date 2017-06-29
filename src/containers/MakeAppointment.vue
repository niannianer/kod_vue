<template>
    <div class="make-appointment">
        <div class="form">
            <div class="form-item" flex>
                <label class="label" for="name" flex-box="0">客户姓名</label>
                <input class="input" type="text" name="name" id="name" flex-box="1" v-model.trim="customerName"
                       autocomplete="off" placeholder="请输入姓名">
            </div>
            <div class="form-item" flex>
                <label class="label" for="idcard" flex-box="0">客户身份证号</label>
                <input class="input" type="tel" name="idcard" id="idcard" flex-box="1" v-model.trim="customerIdCardNo"
                       autocomplete="off" placeholder="请输入身份证号">
            </div>
            <div class="form-item" flex>
                <label class="label" for="phone" flex-box="0">客户手机号</label>
                <input class="input" type="tel" name="phone" id="phone" flex-box="1" v-model.trim="customerMobile"
                       autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="form-item" flex>
                <label class="label" for="yzm" flex-box="0">短信验证码</label>
                <input class="input" type="tel" name="yzm" id="yzm" flex-box="1"
                       v-model.trim="verifyCode"
                       autocomplete="off" placeholder="请输入验证码">
                <button flex-box="0" class="btn-default btn-code" @click.stop="getVerify"
                        v-if="verifyTimeLeft<=0">{{verifyText}}
                </button>
                <button flex-box="0" class="btn-code" v-else>{{verifyTimeLeft}}</button>
            </div>
            <div class="form-item" flex v-if="imageCode">
                <label class="label" for="imageCode" flex-box="0">校验码</label>
                <input class="input" type="text" name="imageCode" id="imageCode" flex-box="1"
                       v-model="inputCode"
                       autocomplete="off" placeholder="请输入校验码">
                <button flex-box="0" class="btn-default btn-code">{{imageCode}}</button>
            </div>
            <div class="form-item" flex>
                <label class="label" for="appoint-num" flex-box="0">预约金额</label>
                <input class="input" type="tel" name="appoint-num" id="appoint-num" flex-box="1"  v-model.trim="reservationAmount"
                       autocomplete="off" placeholder="请输入预约金额">
                <span flex-box="0">万元</span>
            </div>
            <div  class="form-item location" flex="box:mean cross:bottom" >
                <div>地址</div>
                <select name="location" id="province" @change="stateChange" v-model="state">
                    <option :value="item" v-for="(item,index) in provinceList" :key="item.code">{{item.state}}</option>
                </select>
                <span>省</span>
                <select name="location" id="city"  @change="areasChange" v-model="areas" >
                    <option :value="item" v-for="(item,index) in cityList" :key="item.code">{{item.city}}</option>
                </select>
                <span>市</span>
                <select name="location" id="country" @change="areaChange()" v-model="zone">
                    <option  :value="item" v-for="(item,index) in countryList" :key="item.code">{{item.area}}</option>
                </select>
                <span>区</span>
            </div>
        </div>
        <div class="bottom">
            <button class="btn" @click.stop="appointHandle">确认预约</button>
        </div>
    </div>
</template>

<script>
    import '../less/make-appointment.less'
    import {Toast} from 'mint-ui';
    import area from '../tools/area.js';
    import $api from '../tools/api';
    export default {
        name: 'make-appointment',
        data(){
            return {
                customerName:'',
                customerIdCardNo:'',
                customerMobile:'',
                customerRegionCode:'',
                reservationAmount:'',
                verifyCode:'',
                state:'',
                province:'',
                areas:'',
                cityList:'',
                city:'',
                countryList:'',
                country:'',
                zone:'',
                verifyTimeLeft:'',
                verifyText:'获取验证码',
                imageCode:'',
                inputCode:'',
                productUuid:''
            }
        },
        created(){
            this.productUuid = this.$route.query.productUuid;
        },
        computed: {
            provinceList(){
                return area;
            }
        },
        methods: {
            stateChange(){
                this.province = this.state.state;
                this.cityList = this.state.cities;
            },
            areasChange(){
                this.city = this.areas.city;
                this.countryList = this.areas.areas;
            },
            areaChange(){
                this.customerRegionCode = this.zone.code;
                this.country = this.zone.area;
            },
            getVerify(){
                if(!this.checkPhone()){
                    return false;
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let investorMobile = this.customerMobile;
                let imageCode = this.inputCode;
                let bussType = 3;
                this.verifyTimeLeft = 60;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.get('/sendVerifyCode', {investorMobile, imageCode, bussType})
                    .then(data => {
                        if (data.code == 200) {
                            return false;
                        }
                        else {
                            this.clearTimeCount();
                        }
                        if (data.code == 1001) {
                            Toast('验证码错发送失败!');
                            return false;
                        }
                        if (data.code == 1004) {
                            Toast('图片验证码错误!');
                            this.imageCode = data.data.imageCode;
                            return false;
                        }
                        Toast(data.msg);
                    })
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            checkPhone(){
                let regPhone =/^1[35678]\d{9}$/;
                if(!this.customerMobile){
                    Toast('请输入手机号！');
                    return false;
                }
                if(!regPhone.test(this.customerMobile)){
                    Toast('请输入正确的手机号！');
                    return false;
                }
                return true;
            },
            checkInputs(){
                let regName=/^([\u4e00-\u9fa5]){1,5}$/;
                if(!this.customerName){
                    Toast('请输入姓名！');
                    return false;
                }
                if(!regName.test(this.customerName)){
                    Toast('请输入正确的姓名！');
                    return false;
                }
                let regIdcard=/^(^[1-9]\d{7}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9]|[1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if(!this.customerIdCardNo){
                    Toast('请输入身份证号！');
                    return false;
                }
                if(!regIdcard.test(this.customerIdCardNo)){
                    Toast('请输入正确的身份证号！');
                    return false;
                }
                if(!this.reservationAmount){
                    Toast('请输入预约金额！');
                    return false;
                }
                if(isNaN(this.reservationAmount)||this.reservationAmount<=0){
                    Toast('请输入正确的金额数字！');
                    return false;
                }
                if(!(this.province&&this.city&&this.country)){
                    Toast('请输入地址！');
                    return false;
                }
                if(!this.verifyCode){
                    Toast('请输入短信验证码！');
                    return false;
                }
                return true;
            },
            appointHandle(){
                if(this.checkInputs()&&this.checkPhone()){
                    let {productUuid,customerName,customerMobile,verifyCode,customerIdCardNo,customerRegionCode } = this;
                    $api.post('/product/reserve',{
                        productUuid,
                        customerName,
                        customerMobile,
                        customerIdCardNo,
                        'customerAddress':this.province+this.city+this.country,
                        customerRegionCode,
                        verifyCode,
                        'bussType':3,
                        'reservationAmount':this.reservationAmount*10000
                    })
                        .then((msg)=>{
                            console.log(msg);
                            if(msg.code==200){
                                this.$router.push('/appoint-succ');
                            }else{
                                Toast(msg.msg);
                            }
                        });
                }
            }
        },
        destroyed(){

        }
    }
</script>
