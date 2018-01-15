<template>
    <div class="gold-detail">
        <div class="header" flex="main:center cross:center">
            5000
            <span class="gold"><img src="../images/gold/gold.png"/></span>
        </div>
        <div class="detail-list">
            <div flex="cross:center" class="item">
                <div flex-box="1" flex="dir:top">
                    <div class="name" flex-box="1">
                        领金币-场景名称
                    </div>
                    <div class="time" flex-box="0">
                        2017-11-29 17:08
                    </div>
                </div>
                <div flex-box="0" class="add-num" v-if="true">
                    +12000金币
                </div>
                <div flex-box="0" class="reduce-num" v-else>
                    -12000金币
                </div>
            </div>
            <div flex="cross:center" class="item">
                <div flex-box="1" flex="dir:top">
                    <div class="name" flex-box="1">
                        领金币-场景名称
                    </div>
                    <div class="time" flex-box="0">
                        2017-11-29 17:08
                    </div>
                </div>
                <div flex-box="0" class="add-num" v-if="true">
                    +12000金币
                </div>
                <div flex-box="0" class="reduce-num" v-else>
                    -12000金币
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/gold/gold-detail.less';
    export default {
        name: 'collect-list',
        data(){
            return {
                startRow: 0,
                pageSize: 20,
                loading: true,
                collectList: []
            }
        },
        created(){
            this.getList();
        },
        components:{
        },
        computed: {
        },
        methods: {
            loadMore(){
                this.loading = true;
                this.startRow += this.pageSize;
                this.getList();
            },
            getList(){
                $api.get('/coinTransaction/list',{
                    startRow: this.startRow,
                    pageSize: this.pageSize
                }).then(resp => {
                    if(resp.code == 200){
                        resp.data.list.map(val => {
                            val.name = val.nickName ? val.nickName : val.username ? val.username : val.mobile;
                        });
                        this.collectList = this.collectList.concat(resp.data.list || []);
                        if (resp.data.count <= this.collectList.length) {
                            this.loading = true;
                        } else {
                            this.loading = false;
                        }
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
