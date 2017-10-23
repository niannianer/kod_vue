<template>
    <div class="bonus-type">
        <div class="type-item" @click="setType(item)" v-for="(item,index) in typeList" @key="index" :class="{'active':item.code == active}">
            <div class="name">{{item.name}}</div>
            <div>{{item.desc}}</div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/bonus-type.less';
    export default {
        name: 'base',
        data(){
            return {
                active: '1',
                typeList: [{
                    name: '现金分红',
                    desc: '分红所得资金转入银行卡',
                    code: '1'
                },{
                    name: '红利资金再投',
                    desc: '分红所得资金直接用于购买该基金，将分红转为持有基金份额',
                    code: '2'
                }]
            }
        },
        components: {},
        created(){
            this.active = this.$route.query.type || '1';
        },
        computed: {},
        methods: {
            setType(item){
                this.active = item.code;
                this.$router.replace({
                    path: '/funds/my-fund',
                    query: {
                        select: this.active
                    }
                });
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
