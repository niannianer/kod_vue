<template>
    <div class="bulletin">
        <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li class="item bl" v-for="(item,index) in lists" :key="index" @click.stop="openPDF(item)">
                    <div class="content">
                        {{item.title}}
                    </div>
                    <div class="time">
                        {{dateFormat(item.announceDate)}}
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import $api from '../tools/api';
    import '../less/fund/bulletin.less';
    export default {
        name: 'bulletin',
        data(){
            return {
                lists: [],
                autoFill: false,
                currentPage: 0,
                pageSize: 10,
                loading: true,
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            loadTop(){
                this.lists = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            loadData(){
                return $api.get('/fund/info/announcement', {
                    fundCode:this.$route.query.code,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            this.lists = this.lists.concat(msg.data.list);
                            if (msg.data.list.length < this.pageSize) {
                                this.loading = true;
                            } else {
                                this.loading = false;
                            }
                        }
                        return msg
                    })
            },
            loadMore(){
                this.loading = true;
                this.currentPage++;
                this.loadData();
            },
            dateFormat(timestamp){
               let date = new Date(timestamp);
               let y = date.getFullYear();
               let m = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):''+(date.getMonth()+1);
               let d = date.getDate()<10?'0'+date.getDate():''+date.getDate();
               return y+'-'+m+'-'+d;
            },
            openPDF(item){
                if (item.url) {
                    let pdfUrl = item.url;
                    let pdfName = item.title;
                    pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                    window.location.href = '/pdf/web/viewer.html?src='
                        + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
                }
            },
        },
        destroyed(){

        }
    }
</script>
