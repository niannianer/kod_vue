<template>
    <div class="pension-two" flex="dir:top">
        <div class="content" flex-box="1">
            <div class="box">
                <div class="top">
                    <div class="title" flex-box='1'>请选择您的性别</div>
                    <div flex='main:left' class="sex">
                        <div class="man" flex-box="1" :class="{'checked':gender==2}" @click.stop=' toggle(2)'></div>
                        <div class="woman" flex-box="1" :class="{'checked':gender==1}" @click.stop=' toggle(1)'></div>
                    </div>
                </div>
                <div class="box-shadows"></div>
            </div>
            <div class="middel">
                <p>请选择您的年龄</p>
            </div>
            <div class="age ">
                <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="visibleItemCount">
                </mt-picker>
            </div>
            <div class="check">
                <p>当前选择：<span class="sex">{{genderString}},</span><span class='age'>{{age}}岁</span></p>
            </div>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
            <div class="left" flex-box="1" @click.stop="$router.back()">上一步</div>
            <div class="right" flex-box="1" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '../less/pension-two.less';
    import {Picker} from 'mint-ui';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    Vue.component(Picker.name, Picker);
    import $api from '../tools/api';
    import requestHybrid from '../tools/hybrid';
    export default {
        name: 'pension-two',
        methods: {
            getShare(){
                wx.getShare({
                    title: '快看我的理财规划，原来我可以这么有钱！',
                    desc: '金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？'
                });
            },
            onValuesChange(picker) {
                this.age = picker.getValues()[0] || 30;
            },
            toggle(num){
                this.gender = num
            },
            pickerInit(n, m){
                let arr1 = [];
                for (let i = n; i < m; i++) {
                    arr1.push(i);
                }
                this.slots[0].values = arr1;
                setTimeout(() => {
                    this.slots[0].defaultIndex = 12;
                }, 10);
            },
            nextHandle(){
                window.sessionStorage.setItem('age', this.age);
                window.sessionStorage.setItem('gender', this.gender);
                this.$router.push('/pension-three')
            },
        },
        data() {
            return {
                show: true,
                age: 30,
                gender: 2,
                visibleItemCount: 5,
                height: '',
                slots: [
                    {

                        flex: 1,
                        values: [],
                        textAlign: 'center',
                        defaultIndex: 0,
                    }
                ],
            }
        },
        computed: {
            genderString(){
                return this.gender == 1 ? '女' : '男';
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            this.pickerInit(18, 100);
        },
        mounted(){
            if ($device.kingold) {
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
