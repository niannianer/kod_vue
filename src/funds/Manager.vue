<template>
    <div class="manager">
        <div class="item" v-for="(item,index) in list">
            <p class="title">{{item.name}}</p>
            <p class="content" v-html="item.description"></p>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/manager.less';
    export default {
        name: 'manager',
        data(){
            return {
                list:[]
            }
        },
        created(){
            $api.get('/fund/info/manager', {
                fundCode: this.$route.query.code
            })
                .then(resp=>{
                    if(resp.code==200){
                        this.list = resp.data.list;
                    }
                })
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
