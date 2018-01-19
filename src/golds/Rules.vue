<template>
    <div class="golds-rules">
        <div class="items" v-for="item in rules" flex="dir:top">
            <div class="q-text" flex>
                <div class="type">Q</div>
                <div v-html="item.qus"></div>
            </div>
            <div class="a-text" flex>
                <div class="type">A</div>
                <div v-html="item.ans">金币可以在礼券中心兑换商品</div>
            </div>
        </div>
    </div>
</template>

<script>
    import requestHybrid from '../tools/hybrid';
    import $device from '../tools/device';
    import {telNumber} from '../tools/config'
    export default {
        name: 'golds-rules',
        data(){
            return {
                rules: [{
                    qus: '金币有什么用途？',
                    ans: '金币可以用来在金币商城兑换礼品，礼品会不定期更换，具体请以金币商城规则为准。'
                },{
                    qus: '金币如何产生？',
                    ans: '完成金币任务后，可以获得相应数量的金币。\n' +
                    '具体任务请查看<span @click.stop="toTask">任务列表</span>'
                },{
                    qus: '金币如何收取？',
                    ans: '金币产生后，需要等待一定时间后，点击金币进行收取，未及时收取的金币可能被好友偷走。'
                },{
                    qus: '金币收取等待时间？',
                    ans: '金币产生后，需要等待一定时间后才可以收取，点击金币，页面会提示用户还有多久才可以收取，请以页面显示为准。\n' +
                    '当同一类型任务产生的金币有多笔在等待收取时间内时，页面仅显示距离可收取状态最近一笔的剩余时间'
                },{
                    qus: '如何偷金币？',
                    ans: '点击排行榜中的好友头像或名字进入好友的小金库。当好友当前有可收金币时，点击好友的金币便可以进行偷取。偷取金额随机。'
                },{
                    qus: '偷金币有哪些限制？',
                    ans: '同一个好友的金币，偷取后两个小时之后才能再次进行偷取。\n' +
                    '每个用户每天偷金币的总次数最多为20次。'
                }]
            }
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {
            toTask(path){
                this.$router.push({
                    path: path
                })
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
<style lang="less" scoped="">
    .golds-rules {
        position: relative;
        .items {
            background-color: #fff;
            padding: .7rem;
            margin-bottom: .5rem;
            line-height: 1.1rem;
            .type{
                font-size: .9rem;
                color: #333;
                margin-right: .5rem;
            }
            .q-text {
                font-size: .9rem;
                color: #333;
                margin-bottom: .5rem;
            }
        }
    }
</style>
