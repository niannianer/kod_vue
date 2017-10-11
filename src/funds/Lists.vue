<template>
    <div class="fund-lists">
        <div class="header">
            热销基金
        </div>
        <div class="fund-card" flex v-for="(item, index) in hotList" key="index">
            <div class="card-left" flex-box="0">
                <div class="number">{{item.rate|translatePate}}</div>
                <div class="text">{{item.rateText}}</div>
            </div>
            <div class="card-right"  flex-box="1" flex="dir:top">
                <div flex-box="1" class="title">{{item.fundAbbrName}}<span class="num">{{item.fundCode}}</span></div>
                <div flex-box="0">
                    <span class="tag">反弹好</span>
                    <span class="tag">回撤小</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/funds.less'
    export default {
        name: 'base',
        data(){
            return {
                hotList: []
            }
        },
        components: {},
        created(){
            this.hostList();
        },
        computed: {},
        methods: {
            hostList(){
                $api.get('/fund/info/host/list').then((resp) => {
                    if (resp.code == 200) {
                        this.hotList = resp.data.list.slice(0, 3);
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
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
