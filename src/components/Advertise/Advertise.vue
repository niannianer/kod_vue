<template>
    <div class="advertise" v-if="bannerList.length">
        <mt-swipe :auto="4000" >
            <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
                <img :src=item.advertImage alt="index-bg" @click.stop="pathTo(item.advertLink,true)" class="img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import Vue from 'vue';
    import $api from '../../tools/api';
    import './advertise.less';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: 'base',
        data(){
            return {
                bannerList:[],
            }
        },
        created(){
            $api.get('/management/getAdvertList')
                .then(resp => {
                    if (resp.code == 200) {
                        this.bannerList = resp.data.positionList;
                    }
                })
        },
        computed: {},
        methods: {
            pathTo(path){
                window.location.href = path;
            },
        },
        destroyed(){

        }
    }
</script>
