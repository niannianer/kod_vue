<template>
    <div v-cloak class="reserve-list" flex-box="1" flex="dir:top" @touchmove="lock">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" :class="{'tab-active':status==1}"  @click.stop="changeTab(1)">
                <div class="tab-item">预约中</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':status==2}" @click.stop="changeTab(2)">
                <div class="tab-item">已完成</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':status==3}" @click.stop="changeTab(3)">
                <div class="tab-item">已取消</div>
            </div>
        </div>
        <div class="item-list" flex-box="1" v-show="status == 1">
            <mt-loadmore :top-method="loadTopA" :bottom-method="loadBottomA" :bottom-all-loaded="allLoadedA" ref="loadmoreA" :auto-fill="autoFill">
                <div>
                    <ul class="item" v-for="(item,index) in pending.reservationList" :key="index" @click.stop="link(item.productReservationUuid)">
                        <li flex>
                            <div flex-box="0">客户姓名：</div>
                            <div flex-box="0" class="width">{{item.customerName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">产品名称：</div>
                            <div flex-box="0" class="width">{{item.reservationProductName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">预约时间：</div>
                            <div flex-box="0" class="width">{{item.reservationTime}}</div>
                        </li>
                    </ul>
                </div>
            </mt-loadmore>
        </div>
        <div class="item-list" flex-box="1" v-show="status == 2">
            <mt-loadmore :top-method="loadTopB" :bottom-method="loadBottomB" :bottom-all-loaded="allLoadedB" ref="loadmoreB" :auto-fill="autoFill">
                <div>
                    <ul class="item" v-for="(item,index) in processed.reservationList" :key="index" @click.stop="link(item.productReservationUuid)">
                        <li flex>
                            <div flex-box="0">客户姓名：</div>
                            <div flex-box="0" class="width">{{item.customerName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">产品名称：</div>
                            <div flex-box="0" class="width">{{item.reservationProductName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">预约时间：</div>
                            <div flex-box="0" class="width">{{item.reservationTime}}</div>
                        </li>
                    </ul>
                </div>
            </mt-loadmore>
        </div>
        <div class="item-list" flex-box="1" v-show="status == 3">
            <mt-loadmore :top-method="loadTopC" :bottom-method="loadBottomC" :bottom-all-loaded="allLoadedC" ref="loadmoreC" :auto-fill="autoFill">
                <div>
                    <ul class="item" v-for="(item,index) in canceled.reservationList" :key="index" @click.stop="link(item.productReservationUuid)">
                        <li flex>
                            <div flex-box="0">客户姓名：</div>
                            <div flex-box="0" class="width">{{item.customerName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">产品名称：</div>
                            <div flex-box="0" class="width">{{item.reservationProductName}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">预约时间：</div>
                            <div flex-box="0" class="width">{{item.reservationTime}}</div>
                        </li>
                    </ul>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '../less/reserve-list.less';
    import $api from '../tools/api';
    import { Toast,Loadmore} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'reserve-list',
        data(){
            return {
                option:['pending','processed','canceled'],
                status:1,
                tab: 1,
                autoFill:false,
                allLoadedA:false,
                allLoadedB:false,
                allLoadedC:false,
                startRow1:0,
                startRow2:0,
                startRow3:0,
                pageSize:20,
                pending:{
                    reservationCount:0,
                    reservationList:[]
                },
                processed:{
                    reservationCount:0,
                    reservationList:[]
                },
                canceled:{
                    reservationCount:0,
                    reservationList:[]
                },
                isRefreshing:false
            }
        },
        methods: {
            changeTab(tab){
                this.status = tab;
            },
            link(uid){
                if(this.isRefreshing){
                    return false;
                }
                this.$router.push('/reserve-detail?productReservationUuid='+uid);
            },
            get(status,type){
                let startRow = 0;
                if(type == 'bottom'){
                    if(status == 1){
                        startRow = this.pending.reservationList.length;
                    }else if(status == 2){
                        startRow = this.processed.reservationList.length;
                    }else if(status == 3){
                        startRow = this.canceled.reservationList.length;
                    }
                }
                return $api.get('/reservation/list',{status:status,startRow:startRow,pageSize:this.pageSize}).then(msg => {
                    if(msg.code == 200){
                       switch(status){
                            case 1 :
                                if(type == 'bottom'){
                                    msg.data.reservationList.map(el => {
                                        this.pending.reservationList.push(el);
                                    });
                                }else{
                                    this.pending = msg.data;
                                }
                            break;
                            case 2 :
                                if(type == 'bottom'){
                                    msg.data.reservationList.map(el => {
                                        this.processed.reservationList.push(el);
                                    });
                                }else{
                                    this.processed = msg.data;
                                }
                            break;
                            case 3 :
                                if(type == 'bottom'){
                                    msg.data.reservationList.map(el => {
                                        this.canceled.reservationList.push(el);
                                    });
                                }else{
                                    this.canceled = msg.data;
                                }
                            break;
                        }
                    }else{
                        Toast(msg.msg);
                    }
                    return msg;
                });
            },
            loadTopA(){
                this.lock();
                this.get(1,0,'top').then(()=>{
                    this.$refs.loadmoreA.onTopLoaded();
                    this.allLoadedA = false;
                });
            },
            loadTopB(){
                this.lock();
                this.get(2,0,'top').then(()=>{
                    this.$refs.loadmoreB.onTopLoaded();
                    this.allLoadedB = false;
                });
                
            },
            loadTopC(){
                this.lock();
                this.get(3,0,'top').then(()=>{
                    this.$refs.loadmoreC.onTopLoaded();
                    this.allLoadedC = false;
                });
                
            },
            loadBottomA(){
                this.lock();
                if(this.pending.reservationList.length >= this.pending.reservationCount){
                    this.allLoadedA = true;
                    this.$refs.loadmoreA.onBottomLoaded();
                }else{
                    this.get(1,'bottom').then(()=>{
                        this.$refs.loadmoreA.onBottomLoaded();
                    });
                }
            },
            loadBottomB(){
                this.lock();
                if(this.processed.reservationList.length >= this.processed.reservationCount){
                    this.allLoadedB = true;
                    this.$refs.loadmoreB.onBottomLoaded();
                }else{
                    this.get(2,'bottom').then(()=>{
                        this.$refs.loadmoreB.onBottomLoaded();
                    });
                }
            },
            loadBottomC(){
                this.lock();
                if(this.canceled.reservationList.length >= this.canceled.reservationCount){
                    this.allLoadedC = true;
                    this.$refs.loadmoreC.onBottomLoaded();
                }else{
                    this.get(3,'bottom').then(()=>{
                        this.$refs.loadmoreC.onBottomLoaded();
                    });
                }
            },
            lock(){
                this.isRefreshing=true;
                setTimeout(()=>{
                    this.isRefreshing =false;
                },2000);
            }
        },
        mounted(){
            this.get(1,'top');
            this.get(2,'top');
            this.get(3,'top');
        }
    }
</script>
