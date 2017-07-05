<template>
	<!--<div v-cloak class="pension-two" flex-box="1" flex="dir:top" >-->
	<div v-cloak class="pension-two"  flex  flex="dir:top">
        <div class="content" flex-box="1">
            <div class="box" >
                <div class="top" >
                  <div class="title" flex-box = '1'>请选择您的性别</div>
                  <div  flex = 'main:left' class="sex">
                      <div class="man" flex-box="1"  :class = "{'checked':gender==2}" @click.stop=' toggle(2)'></div>
                      <div class="woman" flex-box="1" :class = "{'checked':gender==1}"  @click.stop=' toggle(1)'></div>
                  </div>
                </div>
                <div class="box-shadows"></div>
            </div>
            <div class="middel" >
  				<p>请选择您的年龄</p>
            </div>
            <div class="age " >
                <mt-picker :slots="slots" @change="onValuesChange"  :visibleItemCount="visibleItemCount" >
                </mt-picker>
            </div>
            <div  class="check">
                <p >当前选择：<span class="sex">{{genderString}},</span><span class='age'>{{age}}岁</span></p>
            </div>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
        	<div class="left" flex-box="1"  @click.stop="$router.back()">上一步</div>
        	<div class="right" flex-box="1" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
</template>
<script>
	import Vue from 'vue';
    import '../less/pension-two.less';
    import { Picker } from 'mint-ui';
	Vue.component(Picker.name, Picker);
    import $api from '../tools/api';
    import requestHybrid from '../tools/hybrid';
    export default {
        name: 'pension-two',
        methods: {
            onValuesChange(picker) {
                this.age = picker.getValues()[0];
            },
           toggle(num){
                this.gender = num
           },
           pickerInit(n,m){
              let arr1 =[];
               for(let i = n;i < m; i++){
                   arr1.push(i);
               }
             this.slots[0].values =  arr1;
           },
           nextHandle(){
               window.sessionStorage.setItem('age',this.age);
               window.sessionStorage.setItem('gender',this.gender);
               this.$router.push('/pension-three')
           },
        },
        data() {
            return {
                show:true,
                age:'',
                gender:2,
                visibleItemCount:5,
                height:'',
                slots: [
                    {

                        flex: 1,
                        values: [],
                        textAlign: 'center',
                        defaultIndex:12,
                    }
                ],
            }
        },
        computed:{
            genderString(){
                return this.gender == 1?'女':'男';
            }
        },
        created(){
            this.pickerInit(18,100);
        },
        mounted(){
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
                    title: '养老规划',
                    backstr: '您真的要退出么？',
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            });
        }
    }
</script>
