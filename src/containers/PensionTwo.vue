<template>
	<div v-cloak class="pension-two" flex-box="1" flex="dir:top">
        <div class="content" flex flex-box="1" flex="dir:top" >
            <div class="box" flex-box='1'>
              <div class="top" flex-box='1'>
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
            <div class="age " flex-box='1' flex="'box:first dir:top">
                <mt-picker :slots="slots" @change="onValuesChange"  flex-box="2" >
                </mt-picker>
            </div>
        </div>
        <div flex-box="0.5" class="check">
            <p >当前选择：<span class="sex">{{genderString}},</span><span class='age'>{{age}}岁</span></p>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
        	<div class="left" flex-box="1" @click.stop="$router.back()" >上一步</div>
        	<div class="left" flex-box="1" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
</template>
<script>
	import Vue from 'vue';
    import '../less/pension-two.less';
    import { Picker } from 'mint-ui';
	Vue.component(Picker.name, Picker);
    import $api from '../tools/api';
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
           }
        },
        data() {
            return {
                show:true,
                age:'',
                gender:1,
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
            this.pickerInit(18,100)
        }
    }
</script>
