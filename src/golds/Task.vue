<template>
    <div class="golds-task">
        <div class="items" v-for="item in items" flex>
            <div class="item-left" flex-box="0" flex="main:center cross:center">
                <div class="left-text">
                    <p v-if="isMaster">{{item.coinTaskDrAmount}}</p>
                    <p v-else>{{item.coinTaskAmount}}</p>
                    <p>金币</p>
                </div>
            </div>
            <div class="item-center" flex-box="1">
                <h3 class="main-text">{{item.coinTaskName}}</h3>
                <p class="sub-text">{{item.coinTaskMark}}</p>

            </div>
            <div class="item-right" flex-box="0" flex="main:center cross:center">
                <button v-if="item.disabled" class="btn-default btn-act disabled">已完成</button>
                <button class="btn-default btn-act" @click.stop="makeTask(item)" v-else>{{item.mcName}}</button>
                <div class="press-text">{{item.coinTaskCompleteNum}}/{{item.coinTaskLimit}}</div>
            </div>
        </div>
        <div class="text-info">
            <p>金币规则解释权归金疙瘩所有</p>
            <p>如有疑问请咨询客服<span class="tel" @click.stop="makeCall">{{telNumber}}</span></p>
        </div>


    </div>
</template>

<script>
    import requestHybrid from '../tools/hybrid';
    import{mapState} from 'vuex';
    import $device from '../tools/device';
    import {telNumber} from '../tools/config';
    import $api from '../tools/api';
    import {Toast} from 'mint-ui';
    export default {
        name: 'golds-task',
        data(){
            return {
                telNumber,
                items: [{}, {}]
            }
        },
        components: {},
        created(){
            this.getTasks();
        },
        computed: {
            ...mapState(['investorType']),
            isMaster(){
                return this.investorType == 12;
            }
        },
        methods: {
            // 任务列表
            getTasks(){
                return $api.get('/coin/getMarketCampaignList')
                    .then(res => {
                        if (res.code == 200) {
                            //
                            ( res.data.list || []).map(item => {
                                item.disabled = item.coinTaskCompleteNum >= item.coinTaskLimit;
                            })
                            this.items = res.data.list || [];
                        }
                    })
            },
            // params: 任务类型
            // 做任务
            makeTask(item){
                switch (item.applyScene) {
                    case 8:
                        //邀请好友-> 跳转邀请有礼
                        window.location.href = '/land-share.html';
                        break;
                    case 10:
                        // 签到

                        this.checkIn();
                        break;
                    case 13:
                        //金疙瘩好友投资 -> 跳转邀请有礼
                        window.location.href = '/land-share.html';
                        break;
                    case 14:
                        //自己投资 ->跳转理财列表
                        this.$router.push('/financial')
                        break;
                    default:
                        //-> 跳转邀请有礼
                        window.location.href = '/land-share.html';
                }

            },
            // 打电话
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
            },
            checkIn(){
                Toast('checkIn')
                return $api.post('/checkIn/create')
                    .then(res => {
                        if (res.code == 200) {
                            //
                            Toast('签到成功');
                            this.getTasks();
                            return false
                        }
                        Toast(res.msg);
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
    .golds-task {
        position: relative;
        .items {
            background-color: #fff;
            margin-top: .5rem;
            padding-right: .8rem;
            &:first-child {
                margin-top: 0;
            }
            .item-left {
                background-image: linear-gradient(41deg, #FAD961 0%, #F76B1C 100%);
                height: 5.2rem;
                width: 4.8rem;
                .left-text {
                    text-align: center;
                    line-height: 1.2rem;
                    font-size: 1rem;
                    color: #fff;
                }
            }
            .item-center {
                padding: .5rem .4rem;
                .main-text {
                    font-size: 1rem;
                    color: #333;
                    line-height: 1.6rem;
                }
                .sub-text {
                    font-size: .6rem;
                    color: #666;
                    line-height: 1.2rem;
                }
            }
            .item-right {
                position: relative;
                width: 4.4rem;
                padding-top: .8rem;
                .btn-act {
                    width: 4.4rem;
                    height: 1.6rem;
                    padding: 0;
                    font-size: .65rem;
                    color: #4E4E4E;
                    border-radius: 5rem;
                    background-image: linear-gradient(-180deg, #E7C77F 0%, #FFECBE 20%, #F0D38D 36%, #936843 100%);
                    &.disabled {
                        background: #9E9E9E;
                        color: #fff;
                    }
                }
                .press-text {
                    position: absolute;
                    left: 0;
                    top: .8rem;
                    font-size: .7rem;
                    color: #F4AD44;
                    text-align: center;
                    width: 100%;

                }
            }
        }
        .text-info {
            margin-top: .5rem;
            line-height: 1.2rem;
            color: #666;
            font-size: .6rem;
            text-align: center;
            .tel {
                color: #F4AD44;
            }
        }
    }
</style>
