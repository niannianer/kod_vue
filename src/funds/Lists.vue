<template>
    <div class="fund-lists">
        <div class="banner">
            <img :src="banner"/>
            <div class="text">把握“基”会 精选基金任你选</div>
        </div>
        <div flex="box:mean main:justify cross:center" class="fund-link">
            <div @click.stop="toPage('/funds/hot-list')">
                <img src="../images/fund/my-fund/fund-hot.png" class="img"/>
                <div class="link-name">今日热销</div>
            </div>
            <div @click.stop="toPage('/funds/gains-list')">
                <img src="../images/fund/my-fund/fund-increase.png" class="img"/>
                <div class="link-name">涨幅榜</div>
            </div>
            <div @click.stop="toPage('/planning')">
                <img src="../images/fund/my-fund/fund-plan.png" class="img"/>
                <div class="link-name">理财规划</div>
            </div>
        </div>
        <div class="list">
            <div class="header">
                热销基金
            </div>
            <div class="fund-card" flex v-for="(item, index) in hotList" key="index" @click.stop="toDetail(item.fundCode, item.fundType)">
                <div class="card-left" flex-box="0">
                    <div class="number">{{item.rate|translatePate}}</div>
                    <div class="text">{{item.rateText}}</div>
                </div>
                <div class="card-right"  flex-box="1" flex="dir:top">
                    <div flex-box="1" class="title">
                        <div class="fund-name">{{item.fundAbbrName}}</div>
                        <div class="num">{{item.fundCode}}</div>
                    </div>
                    <div flex-box="0" class="tag-list">
                        <span class="tag">{{item.fundType|fundType}}</span>
                        <span class="tag">{{item.riskLevelFundIsoc|riskLevelFundIsoc}}</span>
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
    import banner from '../images/index-bg.png';
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
            this.addHive(1, 'fundsList',1054);
            let event = ['_trackEvent', '基金列表', 'SHOW', '进入基金列表页面', '进入基金列表页面'];
            window._hmt.push(event);
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
                                    v.rate = v.oneYearReturn;
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
                let oper = '';
                let oper2='';
                let oper3 = ''
                if(path=='/funds/hot-list'){
                    oper='fundsHotList';
                    oper2 = '基金热销榜';
                    oper3 = 105401
                }
                if(path=='/funds/gains-list'){
                    oper='fundsGainsList';
                    oper2 = '基金涨幅榜';
                    oper3 = 105402
                }
                if(path=='/planning'){
                    oper='planning';
                    oper2 = '理财规划';
                    oper3 = 105403
                }
                this.addHive(0, 'fundsList_link_'+oper,oper3);
                this.addHive(2, 'fundsList_to_'+oper,1054);
                let event = ['_trackEvent', '基金列表', 'CLICK', '基金列表-点击'+oper2, '基金列表-点击'+oper2];
                window._hmt.push(event);
                window.sessionStorage.setItem('fund-detail',1);
                this.$router.push({
                    path: path
                })
            },
            toDetail(code, type){
                this.addHive(0, 'fundsList_item_fundsDetail',105404);
                this.addHive(2, 'fundsList_to_fundsDetail',1054);
                let event = ['_trackEvent', '基金列表', 'CLICK', '基金列表-点击详情', '基金列表-点击详情'];
                window._hmt.push(event);
                window.sessionStorage.setItem('fund-detail',1);
                this.$router.push({
                    path: '/funds/detail',
                    query:{
                        code,
                        type
                    }
                })
            }
        },
        mounted(){
        },
        destroyed(){
            this.addHive(2, 'fundsList',1054);
        }
    }
</script>
