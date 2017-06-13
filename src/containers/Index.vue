<template>
    <div  style="height: 100%">
        <div flex-box="0">
            <input v-model="newname" @keyup="changeName()">
            <div>index {{username}}</div>

            <button class="btn-primary">toast</button>
            <button class="btn-primary" >alert</button>
        </div>
        <div style="height: 400px">
            <div style="height: 100%;overflow: auto">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="infinite-scroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="70">
                        <li v-for="item in 70" style="line-height: 30px">{{ item }}</li>
                        <p v-show="loading&&hasMore" class="loading">加载更多...</p>
                    </ul>
                </mt-loadmore>
            </div>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Confirm from '../components/Confirm';
    import Toast from '../components/Toast';
    import Alert from '../components/Alert';
    import {Loadmore,InfiniteScroll } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default {
        name: 'index',
        data(){
            return {
                newname: '',
                timer: null,
                sheetVisible: false,
                allLoaded:false,
                actions: [{
                    name: 'name1',
                    method: () => {
                    }
                }, {
                    name: 'name2',
                    method: () => {
                    }
                }]
            }
        },
        created(){


        },
        computed: {
            username(){
                return this.$store.state.username
            }
        },
        methods: {
            changeName(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    let newname = this.newname;
                    if (!newname) {
                        return false;
                    }
                    this.$store.dispatch('changeName', newname)
                }, 2000);
            },
            loadTop(){
                this.$refs.loadmore.onTopLoaded();
                this.allLoaded = false;
            },loadBottom(){
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            loadMore(){
                console.log('loading');
                this.loading = true;
                this.getAccountTransactionList('loadMore');
            }

        },
        destroyed(){
            this.alertInstance && this.alertInstance.close();
            this.confrimInstance && this.confrimInstance.close();
        }
    }
</script>
