<template>
    <div class="personal-center">
        <div class="top">
            <div class="user-head">
                <img v-if="!investorMobile" src="../images/personal-center/user-head.png"/>
                <img src="../images/personal-center/user-default.png" v-else/>
            </div>
            <div class="user-mobile">
                <span v-if="investorMobile">{{investorMobile|mobileFormat}}</span>
                <span v-else> 请登录</span>
            </div>

        </div>
        <div class="center">
            <div class="items" flex="main:center">
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
            </div>
            <div class="items" flex="main:center">
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
                <div class="item" flex-box="1">
                    <span>我的资产</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/personal-center.less';
    export default {
        name: 'personal-center',
        data(){
            return {

            }
        },
        created(){
        },
        computed:  mapState([
            'investorMobile'
           ]),
        methods: {
        },
        destroyed(){

        }
    }
</script>
