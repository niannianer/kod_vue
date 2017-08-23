<template>
    <div class="index" flex="dir:top">
        <div class="header" flex-box="0">
            <img src="../images/index-bg.png" alt="index-bg">
            <span class="login-btn">登录</span>
        </div>
        <div class="body" flex-box="0">
            <div class="section">
                <div flex="cross:center">
                    <p class="title" flex-box="1">个人中心</p>
                    <p flex-box="0">隐藏金额</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="unlog">
                    请<a href="/login">登录</a>后查看
                </div>
                <div class="person-info" flex="box:mean">
                    <div>
                        <p class="info">0.00元</p>
                        <p class="title">总资产</p>
                    </div>
                    <div style="border-left:1px solid #D8D8D8">
                        <p class="info">0.00元</p>
                        <p class="title">累计收益</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <div flex="cross:center">
                    <p class="title" flex-box="1">理财</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="arrow">
                </div>
                <div class="item">
                   <p class="pro-title">河北加银行盈月度理财A</p>
                    <div flex>
                        <div flex-box="1">
                            <p class="info">9.15%</p>
                            <p class="item-title">预期年化收益率</p>
                        </div>
                        <div flex-box="1" style="text-align: center;padding-right: 3rem;">
                            <p class="info">12个月</p>
                            <p class="item-title">期限</p>
                        </div>
                        <div flex-box="0" class="progress" >
                            <cicle-progress :width-size="50" :progress="69"></cicle-progress>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav" flex-box="0">
            <div class="nav-center">
                <div flex="box:mean">
                    <p>我的好友</p>
                    <p style="border-left:none">我的奖励</p>
                </div>
                <div flex="box:mean">
                    <p style="border-top:none">理财规划</p>
                    <p style="border-top:none;border-left:none">关于我们</p>
                </div>
            </div>
            <div class="download">下载app</div>
        </div>
    </div>
</template>

<script>
    import CicleProgress from '../components/CicleProgress/CicleProgress';
    import '../less/index.less'
    export default {
        name: 'index',
        data(){
            return {}
        },
        components:{
            CicleProgress
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
