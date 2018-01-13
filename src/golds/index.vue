<template>
    <div class="gold-index">
        <div class="header card">
            <button class="gold-btn">金币任务</button>
            <div class="gold-item" flex="box:mean">
                <div class="item">
                    <div flex-box="1" class="tt-msg">
                        <div class="msg">100可收</div>
                    </div>
                    <div flex-box="0">
                        <img src="../images/gold/gold.png" class="gold-img"/>
                        <div>每日签到</div>
                    </div>
                </div>
                <div class="item bt-1">
                    <div flex-box="1" class="tt-msg">
                        <div class="msg">100可收</div>
                    </div>
                    <div flex-box="0">
                        <img src="../images/gold/gold.png" class="gold-img"/>
                        <div>投资</div>
                    </div>
                </div>
                <div class="item bt-2" >
                    <div flex-box="1" class="tt-msg">
                        <div class="msg">100可收</div>
                    </div>
                    <div flex-box="0">
                        <img src="../images/gold/gold.png" class="gold-img"/>
                        <div>好友注册</div>
                    </div>
                </div>
                <div class="item">
                    <div flex-box="1" class="tt-msg">
                    </div>
                    <div flex-box="0">
                        <img src="../images/gold/gold.png" class="gold-img"/>
                        <div>好友投资</div>
                    </div>
                </div>
            </div>
            <div class="pig-wrap" flex="dir:top">
                <img src="../images/gold/pig.png" class="pig-img"/>
                <div class="link"><a router-link="">金币明细</a></div>
            </div>
        </div>
        <div class="advant card">
            <advertise :pagetype="'WDHYY'"></advertise>
        </div>
        <div class="fir-trend card">
            <div class="title">好友动态</div>
            <div class="trend-list">
                <div flex class="item">
                    <div flex-box="1">
                        <span class="name">金葵花</span>
                        偷走2金币
                    </div>
                    <div flex-box="0" class="time">12-23</div>
                </div>
                <div flex class="item">
                    <div flex-box="1">
                        <span class="name">金葵花</span>
                        偷走2金币
                    </div>
                    <div flex-box="0" class="time">12-23</div>
                </div>
            </div>
            <div class="footer">
                <span>查看更多</span>
            </div>
        </div>
        <div class="sort card">
            <div class="title">收取排行榜</div>
            <div class="trend-list">
                <div flex="cross:center" class="item">
                    <div flex-box="1" flex="cross:center">
                        <div class="num-img"><img src="../images/gold/num-1.png"/></div>
                        <div class="head-img">
                            <img src=""/>
                            <div class="daren">
                                <div class="inner">达人</div>
                            </div>
                        </div>
                        <div>金葵花</div>
                    </div>
                    <div flex-box="0" class="time">
                        12000
                    </div>
                    <div class="point-msg">1:00</div>
                </div>
                <div flex="cross:center" class="item">
                    <div flex-box="1" flex="cross:center">
                        <div class="num-img"><img src="../images/gold/num-2.png" class="num-img"/></div>
                        <div class="head-img">
                            <img src=""/>
                            <div class="daren">
                                <div class="inner">达人</div>
                            </div>
                        </div>
                        <div>金葵花</div>
                    </div>
                    <div flex-box="0" class="time">
                        12000
                    </div>
                    <div class="point-msg"><img src="../images/gold/hand.png" class="hand-img"/></div>
                </div>
                <div flex="cross:center" class="item">
                    <div flex-box="1" flex="cross:center">
                        <div class="num-img"><img src="../images/gold/num-3.png" class="num-img"/></div>
                        <div class="head-img">
                            <img src=""/>
                            <div class="daren">
                                <div class="inner">达人</div>
                            </div>
                        </div>
                        <div>金葵花</div>
                    </div>
                    <div flex-box="0" class="time">
                        <button class="yao-btn">邀请</button>
                    </div>
                </div>
            </div>
            <div class="footer">
                <span>查看更多</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/gold/index.less';
    import Advertise from '../components/Advertise';
    export default {
        name: 'gold-index',
        data(){
            return {

            }
        },
        created(){
        },
        components:{
            Advertise
        },
        computed: {
        },
        methods: {
        },
        destroyed(){

        }
    }
</script>
