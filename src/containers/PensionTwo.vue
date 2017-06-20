<template>
	<div v-cloak class="pension-two" flex-box="1" flex="dir:top">
        <div class="content" flex flex-box="1" flex="dir:top" v-show="show">
            <div class="box" flex-box='1'>
              <div class="top" flex-box='1'>
                  <div class="title" flex-box = '1'>请选择您的性别</div>
                  <div  flex = 'main:left' class="sex">
                      <div class="man" flex-box="1"  :class = "{'checked':sex==1}" @click.stop=' toggle(1)'></div>
                      <div class="woman" flex-box="1" :class = "{'checked':sex==2}"  @click.stop=' toggle(2)'></div>
                  </div>
            </div>
             	<div class="box-shadows"></div>
            </div>
            <div class="middel" >
  				<p>请选择您的年龄</p>
            </div>
            <div class="age " flex-box='1' flex="'box:first dir:top">
                <mt-picker :slots="slots" @change="onValuesChange" v-model="value" flex-box="2" >
                </mt-picker>
            </div>
        </div>
        <div class="salary" flex-box="1">
            <div class="title">请输入您的税后工资（月）</div>
            <div class="content"><input type="text"><span>元</span></div>
        </div>
        <div flex-box="0.5" class="check">
            <p >当前选择：<span v-show="sex == 1" class='sex'>男，</span><span v-show="sex == 2" class='sex'>女，</span><span class='age'>{{value}}岁</span></p>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
        	<div class="left" flex-box="1" @click.stop="$router.push('/pension-one')" >上一步</div>
        	<div class="left" flex-box="1" @click.stop="$router.push('/pnsion-three')">下一步</div>
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
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
                return this.value = picker.getValues()[0];
            },
           toggle(sex){
                this.sex = sex
           }
        },
//默认为30岁，显示5条，中间的为选中
        data() {
            return {
                show:true,
                value:'',
                sex:1,
                slots: [
                    {
                        flex: 1,
                        values: ['18','19','20','21','22','23','24','25','26'],
                        textAlign: 'center',
                        defaultIndex:3,
                    }
                ],
            }
            },
    }
</script>
