<template>
    <div class="golds-task">
        <div class="items" v-for="item in items" flex>
            <div class="item-left" flex-box="0" flex="main:center cross:center">
                <div class="left-text">
                    <p>20</p>
                    <p>金币</p>
                </div>
            </div>
            <div class="item-center" flex-box="1">
                <h3 class="main-text">每日登录签到</h3>
                <p class="sub-text">每日访问金疙瘩app或微信 每日登录签到</p>

            </div>
            <div class="item-right" flex-box="0" flex="main:center cross:center">
                <button class="btn-default btn-act" :class="{'disabled':item.disabled}">签到</button>
                <div class="press-text">12/20</div>
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
    import $device from '../tools/device';
    import {telNumber} from '../tools/config'
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
