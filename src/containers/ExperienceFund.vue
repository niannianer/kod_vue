<template>
    <div class="experience-fund">
        <div class="header">
            <ul>
                <li class='sum'>
                    <p class='info'>{{totalExperience}}</p>
                    <p class='title'>体验金总额（元）</p>
                </li>
            </ul>
            <ul flex >
                <li class="detail" flex-box="1">
                    <p class='info'>{{experienceProfit}}</p>
                    <p class='title'>已收收益（元）</p>
                </li>
                <li class="detail" flex-box="1">
                    <p class='info'>{{notRecieveExperience}}</p>
                    <p class='title'>待领取体验金（元）</p>
                </li>
                <li class="detail" flex-box="1">
                    <p class='info'>{{notExpireProfit}}</p>
                    <p class='title'>待收收益（元）</p>
                </li>
            </ul>
        </div>
        <div class="body">
            <div class="section seperate">
                <p class="tip">体验金领取、计息后会自动转入您的账户余额</p>
            </div>
            <ul class="section seperate experience-list"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stopLoad"
                infinite-scroll-distance="10">
                <li class="item" v-for="(item,index) in experienceList " :key="index" flex="dir:top">
                    <div class="item-body" flex-box="1">
                        <div class="bl" flex>
                            <div flex-box="1" class="title">{{item.experienceName}}</div>
                            <div flex-box="0" class="period">{{item.rateDays}}天</div>
                        </div>
                        <div flex class="item-detail">
                            <div flex-box="1">
                                <p class="info">{{item.experienceAmount}}</p>
                                <p>金额</p>
                            </div>
                            <div flex-box="1">
                                <p class="info">{{item.annualInterestRate}}</p>
                                <p>年化收益率</p>
                            </div>
                            <div flex-box="1">
                                <p class="info">{{item.expectProfit}}</p>
                                <p>预期收益</p>
                            </div>
                        </div>
                        <div>
                            <p class="item-tip" v-if="item.experienceStatus ==0">投资{{item.conditionProductPeriod}}天及以上定期理财累计{{item.conditionProductAmount}}可领取</p>
                            <p class="item-tip" v-else="item.experienceStatus ==0">条件达成</p>
                        </div>
                    </div>
                    <button flex-box="1" v-if="item.experienceStatus ==0" @click.stop="">
                        去投资
                    </button>
                    <button  flex-box="1" v-else-if="item.experienceStatus ==1" @click.stop="">
                        领取体验金
                    </button>
                    <button class="disabled" flex-box="1" v-else-if="item.experienceStatus ==2">
                        已领取
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/experience-fund.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import {InfiniteScroll} from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default {
        name: 'experience-fund',
        data(){
            return {
                experienceList:[],
                stopLoad:true,
                pageSize:10,
                currentPage:0
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            ...mapState(['experienceProfit', 'notExpireProfit', 'notRecieveExperience','totalExperience'])
        },
        methods: {
            loadData(){
                $api.get('/experience/list',{
                    startRow:this.pageSize*this.currentPage,
                    pageSize:this.pageSize
                })
                    .then((resp)=>{
                        if(resp.code == 200){
                            this.experienceList = this.experienceList.concat(resp.data.experienceList);
                            console.log(resp.data.count,this.experienceList.length)
                            if (resp.data.count > this.experienceList.length) {
                                this.stopLoad = false;
                            } else {
                                this.stopLoad = true;
                            }
                        }
                    })
            },
            loadMore(){
                this.stopLoad = true;
                this.currentPage++;
                this.loadData();
            }
        },
        destroyed(){

        }
    }
</script>
