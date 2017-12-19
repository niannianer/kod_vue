<template>
    <div class="bulletin">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li class="item bl" v-for="(item,index) in lists" :key="index" @click.stop="openPDF(item)">
                <div class="content">
                    {{item.title}}
                </div>
                <div class="time">
                    {{item.announceDate|timeFormater('yyyy-MM-dd')}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll,Toast} from 'mint-ui';
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
            this.addHive(1, 'fundsBulletin');
            let event = ['_trackEvent', '基金公告', 'SHOW', '进入基金公告页面', '进入基金公告页面'];
            window._hmt.push(event);
            this.loadData();
        },
        computed: {},
        methods: {
            loadData(){
                return $api.get('/fund/info/announcement', {
                    fundCode: this.$route.query.code,
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
            openPDF(item){
                this.addHive(0, 'fundsBulletin_item_openPdf');
                let event = ['_trackEvent', '基金公告', 'CLICK', '基金公告-点击详情', '基金公告-点击详情'];
                window._hmt.push(event);
                $api.get('/fund/info/noticeFileUri',{
                    ymUri:item.url
                })
                    .then(resp=>{
                        if(resp.code==200){
                            let pdfUrl = resp.data;
                            let pdfName = item.title;
                            pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                            window.location.href = '/pdf/web/viewer.html?src='
                                + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
                        }else{
                            Toast('暂时无法查看');
                        }
                        console.log(resp);
                    })
            },
        },
        destroyed(){
            this.addHive(2, 'fundsBulletin');
        }
    }
</script>
