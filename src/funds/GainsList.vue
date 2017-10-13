<template>
    <div class="gains-list">
        <div class="header">
            <div class="check-list" flex="box:mean">
                <div class="check-item" :class="{'active':checkActive==0}" @click.stop="checkActive=0">
                    全部
                </div>
                <div class="check-item" :class="{'active':checkActive==1}" @click.stop="checkActive=1">
                    股票型
                </div>
                <div class="check-item" :class="{'active':checkActive==2}" @click.stop="checkActive=2">
                    债券型
                </div>
                <div class="check-item" :class="{'active':checkActive==3}" @click.stop="checkActive=3">
                    混合型
                </div>
                <div class="check-item" :class="{'active':checkActive==4}" @click.stop="checkActive=4">
                    货币型
                </div>
                <div class="check-item" :class="{'active':checkActive==5}" @click.stop="checkActive=5">
                    QDII
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title-list" flex>
                <div class="bg-content fund-name" flex-box="0">
                    <div class="title-item">
                        基金名称
                    </div>
                    <div class="item-info" flex="cross:center main:center">
                        循环元素1
                    </div><!--内容溢出怎么办？-->
                </div>
                <div class="overflow" flex>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            单位净值
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            日涨幅
                        </div>
                        <div class="item-info red f8" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            周涨幅
                        </div>
                        <div class="item-info red f8" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            月涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            季涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            近一年涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            今年涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/gains-list.less';
    export default {
        name: 'gains-list',
        data(){
            return {
                checkActive: 0
            }
        },
        created(){
            $api.get('/fund/account/bank/list')
                .then(resp => {
                    console.log(resp)
                })
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
