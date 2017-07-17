<template>
    <div class="usable-financial">
        <div class="body">
            <div class="item" v-for="(item,index) in lists" @click.stop="toDetail(item.productUuid)">
                <p class="title">{{item.productAbbrName}}</p>
                <div flex class="info">
                    <p flex-box="1">预期年化收益率{{item.annualInterestRate}}%</p>
                    <p flex-box="0">期限{{item.productPeriod}}天</p>
                </div>
            </div>
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
                lists:[]
            }
        },
        created(){
            $api.get('/adaptProduct/list',{
                ccCode:this.$route.query.ccCode
            })
                .then(resp=>{
                    if(resp.code==200){
                        this.lists = resp.data.list;
                    }
                })
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
            }
        },
        destroyed(){

        }
    }
</script>
