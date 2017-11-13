<template>
    <div class="advertise" v-if="pictureUrl">
        <img :src=item.pictureUrl alt="index-bg" @click.stop="pathTo(skipLinkUrl)" class="img">
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';
    import Vue from 'vue';
    import $api from '../../tools/api';
    import './advertise.less';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: 'base',
        data(){
            return {
                pictureUrl:'',
                skipLinkUrl:''
            }
        },
        props: ['pagetype'],
        created(){
            $api.get('/management/getAdvertList')
                .then(resp => {
                    if (resp.code == 200) {
                        console.log(this.pagetype);
                        if (resp.data.positionList && resp.data.positionList.length) {
                            resp.data.positionList.map(item => {
                                if (item.pageType == this.pageType) {
                                    this.pictureUrl = item.pictureUrl;
                                    this.skipLinkUrl = item.skipLinkUrl;
                                }
                            })
                        }

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
