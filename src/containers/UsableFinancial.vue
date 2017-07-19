<template>
    <div class="usable-financial">
        <div class="body">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stop"
                infinite-scroll-distance="10">
                <li class="item" v-for="(item,index) in lists" @click.stop="toDetail(item.productUuid)">
                    <p class="title">{{item.productAbbrName}}</p>
                    <div flex class="info">
                        <p flex-box="1">预期年化收益率{{item.annualInterestRate*100}}%</p>
                        <p flex-box="0">期限{{item.productPeriod}}天</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/usable-financial.less';
    export default {
        name: 'usable-financial',
        data(){
            return {
                lists:[],
                currentPage:0,
                pageSize:10,
                stop:true
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            toDetail(productUuid){
                this.$router.push({
                    path:'/fixi-goods-detail',
                    query:{
                        productUuid
                    }
                })
            },
            loadMore(){
                this.stop = true;
                this.currentPage++;
                this.loadData();
            },
            loadData(){
                $api.get('/adaptProduct/list',{
                    ccCode:this.$route.query.ccCode,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp=>{
                        if(resp.code==200){
                            this.lists = resp.data.list;
                            if (this.lists.length < resp.data.count) {
                                this.stop = false;
                            } else {
                                this.stop = true;
                            }
                        }
                    })
            }
        },
        destroyed(){

        }
    }
</script>
