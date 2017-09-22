<template>
    <div class="my-fund">
        <div class="header">
            <div flex="box:justify cross:center">
                <div>
                    <p class="border">积极型</p>
                </div>
                <p class="f9">昨日收益（元）</p>
                <div>
                    <p class="border">用户信息</p>
                </div>
            </div>
            <p class="date">07-25</p>
            <p class="rate">-2.23</p>
            <div flex="box:mean" class="info-box">
                <div>
                    <p>总市值（元)</p>
                    <p class="data">513.12</p>
                </div>
                <div>
                    <p>累计盈亏（元）</p>
                    <p class="data">513.12</p>
                </div>
                <div>
                    <p>在途资金（元）</p>
                    <p class="data">513.12</p>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title-box" flex>
<p></p>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/my-fund.less';
    export default {
        name: 'my-fund',
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
