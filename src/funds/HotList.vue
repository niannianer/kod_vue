<template>
    <div class="hot-list">
        <div class="item">
            <div class="title-part" flex="cross:center">
                <p flex-box="0" class="tip">免费率</p>
                <p flex-box="1">膨化添利宝货币市场基金</p>
                <p flex-box="0">001666</p>
            </div>
            <div class="info-part" flex="box:mean">
                <div class="info-box">
                    <p class="orange f9">4.68%</p>
                    <p class="info-title">七日年化率</p>
                </div>
                <div class="info-box">
                    <p class="f9">0.01</p>
                    <p class="info-title">起投金额</p>
                </div>
                <div class="info-box">
                    <p class="f9">货币型</p>
                    <p class="info-title">基金类型</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/hot-list.less';
    export default {
        name: 'hot-list',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
