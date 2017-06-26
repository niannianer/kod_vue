<template>
    <div class="pension-one" flex="dir:top">
        <div class="body" flex-box="1" flex="dir:top">
            <div class="title" flex-box="0">
                选择您所在的城市
            </div>
            <div class="content" flex-box="1" ref="content">
                <mt-index-list :height="height" ref="mintList">
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
    import citys from "../tools/citys";
    import cityGrade from "../tools/city-grade"
    import {IndexList, IndexSection,Toast} from 'mint-ui';
    Vue.component(IndexList.name, IndexList);
    Vue.component(IndexSection.name, IndexSection);
    export default{
        data(){
            return {
                cityName: '北京',
                hotD: cityGrade.hotD,
                activeBtn: '010'
            }
        },
        watch:{
          height(){
              console.log(this.height+'sss')
          }
        },
        computed: {
            height(){
                console.log(this.$refs)
            },
            cityCopy(){
                let obj = {};
                citys.map(city => {
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
            this.$refs.mintList.currentHeight = this.$refs.content.clientHeight-20;
        },
        methods: {
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
