<template>
    <div class="relation-list-gold">
        <div class="header">
            <div class="tabs" flex flex-box="0">
                <div flex-box="1" class="tab" >
                    <div class="tab-item active" >全部</div>
                </div>
                <div flex-box="1" class="tab" >
                    <div class="tab-item" >未投资</div>
                </div>
                <div flex-box="1" class="tab" >
                    <div class="tab-item" >已投资</div>
                </div>
            </div>
            <div flex-box="1" flex>
                <ul flex>
                    <li :class="{'left':true,'active':true}" flex-box="1" >
                        按绑定时间排序
                    </li>
                    <li :class="{'right':true,'active':false}" flex-box="1" >
                        按贡献奖励排序
                    </li>
                </ul>
            </div>
        </div>
        <div class="body">
            <div class="list-item" flex>
                <div class="user-logo" flex-box="0">
                    <img src="../images/personal-center/user-default.png" alt="avatar" class="avatar">
                    <p class="name">张三</p>
                </div>
                <div flex-box="1">
                    <p class="relation-phone">18611115678</p>
                    <div flex class="relation-detail">
                        <p flex-box="1">绑定日期</p>
                        <p flex-box="1">2017-01-08</p>
                    </div>
                    <div flex class="relation-detail">
                        <p flex-box="1">贡献奖励</p>
                        <p flex-box="1">10000.00元</p>
                    </div>
                </div>
                <div class="verify-status">已绑卡</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/relation-list-gold.less';
    let wwb = 'ttt';
    console.log(wwb)
    export default {
        name: 'relation-list-gold',
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
