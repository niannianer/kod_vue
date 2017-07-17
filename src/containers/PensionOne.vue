<template>
    <div class="pension-one" flex="dir:top">
        <div class="body" flex-box="1" flex="dir:top">
            <div class="title" flex-box="0">
                选择您所在的城市
            </div>
            <div class="content" flex-box="1" ref="content">
                <mt-index-list ref="mintList">
                    <div class="section">
                        <div class="title">热门</div>
                        <div class="hot-city">
                            <p v-for="(item,index) in this.hotD" :key="index" @click="clickHandle(item)"
                               :class="{active:item.zip==activeBtn}">{{item.name}}</p>
                        </div>
                    </div>
                    <mt-index-section :index="index" v-for="(city,index) in cityCopy" :key="index">
                        <li class="item" v-for="(item,index) in city" @click="clickHandle(item)" :key="index">
                            {{item.name}}
                        </li>
                    </mt-index-section>
                </mt-index-list>
            </div>
            <div class="tip">当前选择：<span>{{this.cityName}}</span></div>
        </div>
        <div class="footer" flex-box="0" flex>
            <div flex-box="1" class="prev" @click.stop="$router.back()">上一步</div>
            <div flex-box="1" class="next" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import "../less/pension-one.less";
    import $api from '../tools/api';
    import cityGrade from "../tools/city-grade";
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import {IndexList, IndexSection, Toast} from 'mint-ui';
    Vue.component(IndexList.name, IndexList);
    Vue.component(IndexSection.name, IndexSection);
    import requestHybrid from '../tools/hybrid';
    export default{
        data(){
            return {
                cityName: '北京',
                hotD: cityGrade.hotD,
                activeBtn: '010',
                citys: []
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            $api.getNode('/assets/getCities')
                .then(data => {
                    this.citys = data.data;
                });
        },
        computed: {
            cityCopy(){
                let obj = {};
                this.citys.map(city => {
                    let letter = city.pinyin[0];
                    if (obj[letter]) {
                        obj[letter].push(city);
                    } else {
                        obj[letter] = [city]
                    }
                });
                return obj;
            }
        },
        mounted(){
            this.$refs.mintList.currentHeight = this.$refs.content.clientHeight - 20;
            let title = '养老理财规划';
            if (this.$route.name == 'house-one') {
                title = '住房理财规划';

            }
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
                    title,
                    backstr: '退出理财规划将不会保存，确认退出？',
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            });
        },
        methods: {
            getShare(){
                wx.getShare({
                    title:'快看我的理财规划，原来我可以这么有钱！',
                    desc:'金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？'
                });
            },
            clickHandle(item){
                this.activeBtn = item.zip;
                this.cityName = item.name;
            },
            nextHandle(){
                window.sessionStorage.setItem("cityName", this.cityName);
                if (this.$route.name == 'house-one') {
                    this.$router.push('/house-two');
                } else {
                    this.$router.push('/pension-two');
                }

            }
        }
    }
</script>
