<template>
    <div class="advertise" v-if="pictureUrl">
        <img :src=pictureUrl @click.stop="pathTo(skipLinkUrl)" class="img">
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';
    import Vue from 'vue';
    import $api from '../../tools/api';
    import EventBus from '../../tools/event-bus';
    import './advertise.less';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: 'base',
        data(){
            return {
                pictureUrl:'',
                skipLinkUrl:'',
                skipLinkTitle:''
            }
        },
        props: ['pagetype'],
        created(){
            $api.get('/management/getAdvertList')
                .then(resp => {
                    if (resp.code == 200) {
                        if (resp.data.positionList && resp.data.positionList.length) {
                            resp.data.positionList.map(item => {
                                if (item.pageType == this.pagetype) {
                                    this.pictureUrl = item.pictureUrl;
                                    this.skipLinkUrl = item.skipLinkUrl;
                                    this.skipLinkTitle = item.skipLinkTitle;
                                    EventBus.$emit('advertise',this.pictureUrl);
                                }
                            })
                        }

                    }
                })
        },
        computed: {},
        methods: {
            pathTo(path){
                if(!path){
                    return false;
                }
                if(this.skipLinkTitle){
                    window.location.href = path+'?skiplinktitle='+encodeURIComponent(this.skipLinkTitle);
                }else{
                    window.location.href = path;
                }
            },
        },
        destroyed(){

        }
    }
</script>
