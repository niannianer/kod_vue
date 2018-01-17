<template>
    <div class="golds-rules">
        <div class="items" v-for="item in rules" flex="dir:top">
            <div class="q-text" flex>
                <div class="type">Q</div>
                <div>金币用来做什么？</div>
            </div>
            <div class="a-text" flex>
                <div class="type">A</div>
                <div>金币可以在礼券中心兑换商品</div>
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
                rules: [{}, {}]
            }
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {
            makeCall(){
                if ($device.kingold) {
                    requestHybrid({
                        tagname: 'tel',
                        param: {
                            callService: telNumber
                        }
                    })
                    return false
                }
                if ($device.mobile) {
                    window.open('tel:' + telNumber.replace(/-/g, ''));
                }
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
