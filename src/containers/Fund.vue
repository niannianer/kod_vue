<template>
    <div class="funds">
        <div class="banner">
            <img :src="bannerDefault"/>
            <div class="text">把握“基”会 精选基金任你选</div>
        </div>
        <div flex="box:mean main:justify cross:center" class="fund-link">
            <div>
                <img src="../images/fund/my-fund/fund-hot.png" class="img"/>
                <div class="link-name">今日热销</div>
            </div>
            <div>
                <img src="../images/fund/my-fund/fund-increase.png" class="img"/>
                <div class="link-name">涨幅榜</div>
            </div>
            <div>
                <img src="../images/fund/my-fund/fund-plan.png" class="img"/>
                <div class="link-name">理财规划</div>
            </div>
        </div>
        <router-view></router-view>
        <div class="footer">
            <div class="server">
                基金销售服务由<span class="link">盈米财富</span>提供
            </div>
            <div class="quali">
                基金销售资格证号：000000378<span class="link">详情</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/funds.less'
    import bannerDefault from '../images/fund/my-fund/fund-default.png';
    export default {
        name: 'base',
        data(){
            return {
                bannerDefault,
                noBanner: false,
                bannerList: [],
                newsList: [],
                currentPage: 0,
                pageSize: 3,
                product: {}
            }
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {},
        mounted(){
        },
        destroyed(){

        }
    }
</script>
