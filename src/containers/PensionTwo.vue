<template>
	<div v-cloak class="pension-two" flex-box="1" flex="dir:top">
        <div class="content" flex flex-box="1" flex="dir:top">
           <!-- <div class="top" flex-box='1'>
           		<div class="title" flex-box = '1'>请选择您的性别</div>
           		<ul flex="main:left">
	                <li flex-box="1" class="checked">
	                    <span>男</span>
	                </li>
	                <li flex-box="1" >
	                   <span>女</span>
	                </li>
            	</ul>
            </div> -->
            <div class="box" flex-box='1'>
              <div class="top" flex-box='1'>
              <div class="title" flex-box = '1'>请选择您的性别</div>
              <ul flex="main:left">
                  <li flex-box="1" class="checked">
                      <span>男</span>
                  </li>
                  <li flex-box="1" >
                     <span>女</span>
                  </li>
              </ul>
            </div>
             	<div class="box-shadows"></div>
            </div>
            <div class="middel" flex flex-box='1'>
  				<p>请选择您的年龄</p>
            </div>
            <div class="age" flex-box='1'>
                <mt-picker :slots="slots" @change="onValuesChange">
                </mt-picker>
                <slot>当前选择：<span class='sex'></span><span class='age'></span></slot>
            </div>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
        	<div class="left" flex-box="1" >上一步</div>
        	<div class="left" flex-box="1">下一步</div>
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
            picker.setSlotValue(2, values[0]);
          }
        }
    },
    data() {
        return {
          slots: [
            {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot3',
              textAlign: 'left'
            }
          ],
          showToolbar:true
        };
      }
    };
</script>