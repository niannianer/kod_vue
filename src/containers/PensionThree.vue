<template>
    <div class="pension-three" flex-box="1" flex="dir:top" ref='divh' v-bind:style="{height:height+'px'}">
        <div class="salary" flex-box="1" flex="dir:top">
            <div class="title" >请输入您的税后工资（月）</div>
            <div class="content" flex="dir:left">
                <div class="num" flex-box="1">
                    <input type="tel" v-model="wagesAfterTax" maxlength="6"  @blur.stop="checkwagesAfterTax">
                </div>
                <span flex-box="1">元</span>
            </div>
        </div>
        <div flex-box="0" class="check">
            <p >当前选择：
                <span  v-if="wagesAfterTax">{{wagesAfterTax}}元</span>
            </p>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
            <div class="left" flex-box="1" @click.stop="$router.back()" >上一步</div>
            <div class="right" flex-box="1" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
 </template>
<script>
    import Vue from 'vue';
    import {Toast} from 'mint-ui'
    import '../less/pension-three.less';
    import {getValueD} from "../tools/city-grade";
    import requestHybrid from '../tools/hybrid';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    export default {
        name: 'pension-three',
        data(){
            return{
                wagesAfterTax:'',
                height:'',
            }
        },
        computed:{
        },
        methods:{
            getShare(){
                wx.getShare({
                    title:'快看我的理财规划，原来我可以这么有钱！',
                    desc:'金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？'
                });
            },
            nextHandle(){
                window.sessionStorage.setItem('wagesAfterTax',this.wagesAfterTax);
                if(this.checkwagesAfterTax()){
                    this.$router.push('/pension-four');
                }
               else {
                    Toast('请输入正确工资');
                }
            },
            checkwagesAfterTax(){
                if (!this.wagesAfterTax) {
                    Toast('请输入工资');
                    return false;
                }
                let reg = /^\d{1,6}$/;
                if (!reg.test(this.wagesAfterTax)) {
                    Toast('请输入正确工资');
                    return false;
                }
                return true;
            },
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            this.wagesAfterTax =getValueD(window.sessionStorage.getItem('cityName'));
        },
        mounted(){
            this.height = this.$refs.divh.offsetHeight;
            if($device.kingold){
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title: '养老理财规划',
                        backstr: '退出理财规划将不会保存，确认退出？',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                });
            }
        }
    }
</script>
