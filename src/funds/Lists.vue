<template>
    <div class="fund-lists">
        <div class="banner">
            <img :src="banner"/>
            <div class="text">把握“基”会 精选基金任你选</div>
        </div>
        <div flex="box:mean main:justify cross:center" class="fund-link">
            <div @click.stop="toPage('funds/hot-list')">
                <img src="../images/fund/my-fund/fund-hot.png" class="img"/>
                <div class="link-name">今日热销</div>
            </div>
            <div @click.stop="toPage('funds/gains-list')">
                <img src="../images/fund/my-fund/fund-increase.png" class="img"/>
                <div class="link-name">涨幅榜</div>
            </div>
            <div @click.stop="toPage('funds/hot-list')">
                <img src="../images/fund/my-fund/fund-plan.png" class="img"/>
                <div class="link-name">理财规划</div>
            </div>
        </div>
        <div class="list">
            <div class="header">
                热销基金
            </div>
            <div class="fund-card" flex v-for="(item, index) in hotList" key="index" @click.stop="toDetail(item.fundCode)">
                <div class="card-left" flex-box="0">
                    <div class="number">{{item.rate|translatePate}}</div>
                    <div class="text">{{item.rateText}}</div>
                </div>
                <div class="card-right"  flex-box="1" flex="dir:top">
                    <div flex-box="1" class="title">{{item.fundAbbrName}}<span class="num">{{item.fundCode}}</span></div>
                    <div flex-box="0" class="tag-list">
                        <span class="tag">{{item.fundType|fundType}}</span>
                        <span class="tag">{{item.riskLevel|riskLevel}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="server">
                基金销售服务由<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">盈米财富</a>提供
            </div>
            <div class="quali">
                基金销售资格证号：000000378<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">详情</a>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/lists.less';
    import banner from '../images/fund/my-fund/fund-default.png';
    export default {
        name: 'base',
        data(){
            return {
                hotList: [],
                banner
            }
        },
        components: {},
        created(){
            this.hostList();
        },
        computed: {},
        methods: {
            hostList(){
                $api.get('/fund/info/host/list', {
                    startRow: 0,
                    pageSize: 3
                }).then((resp) => {
                    if (resp.code == 200) {
                        this.hotList = resp.data.list;
                        this.hotList.map((v)=>{
                            if(v.fundType == 4){
                                v.rate = v.yearlyRoe;
                                v.rateText = '七日年化';
                            }else{
                                if(v.oneYearReturn){
                                    v.rate = v.yearlyRoe;
                                    v.rateText = '近一年涨幅';
                                }else{
                                    v.rate = v.thisYearReturn;
                                    v.rateText = '今年以来涨幅';
                                }
                            }
                        })
                    }
                });
            },
            toPage(path){
                window.sessionStorage.setItem('fund-detail',1);
                this.$router.push({
                    path: path
                })
            },
            toDetail(fundCode){
                window.sessionStorage.setItem('fund-detail',1);
                this.$router.push({
                    path: '/funds/detail',
                    query:{
                        code: fundCode
                    }
                })
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
