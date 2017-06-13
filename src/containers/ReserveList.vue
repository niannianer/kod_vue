<template>
    <div v-cloak class="reserve-list" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" :class="{'tab-active':status==1}"  @click.stop="changeTab(1)">
                <div class="tab-item">待处理</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':status==2}" @click.stop="changeTab(2)">
                <div class="tab-item">已处理</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':status==3}" @click.stop="changeTab(3)">
                <div class="tab-item">已取消</div>
            </div>
        </div>
        <div class="item-list" flex-box="1" v-show="num == option[status-1]" v-for="(every,num) in data" :key="num">
            <ul class="item" v-for="(item,index) in every.reservationList" :key="index" @click.stop="$router.push('/reserve-detail?productReservationUuid='+item.productReservationUuid)">  
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
    </div>
</template>
<script>
    import '../less/reserve-list.less';
    import $api from '../tools/api';
    import { Toast} from 'mint-ui';
    export default {
        name: 'reserve-list',
        data(){
            return {
                option:['pending','processed','canceled'],
                status:1,
                tab: 1,
                data:{
                    pending:{},
                    processed:{},
                    canceled:{}
                } 
            }
        },
        methods: {
            changeTab(tab){
                this.status = tab;
            },
            //分页未做
            git(status){
                $api.get('/reservation/list',{status:status}).then(msg => {
                    if(msg.code == 200){
                        switch(status){
                            case 1 :
                                this.data.pending = msg.data;
                            break;
                            case 2 :
                                this.data.processed = msg.data;
                            break;
                            case 3 :
                                this.data.canceled = msg.data;
                            break;
                        }
                    }else{
                        Toast(msg.msg);
                    }
                })
            }
        },
        mounted(){
            this.git(1)
            this.git(2)
            this.git(3)
        }
    }
</script>
