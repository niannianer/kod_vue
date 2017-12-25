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
            <ul class="item" v-for="(item,index) in every.reservationList" :key="index" >
                <li flex>
                    <div flex-box="0">预约单号：</div>
                    <div flex-box="0" class="width">{{item.reservationBillCode}}</div>
                </li>
                <li flex>
                    <div flex-box="0">预约时间：</div>
                    <div flex-box="0" class="width">{{item.reservationTime}}</div>
                </li>
                <li flex>
                    <div flex-box="0">产品名称：</div>
                    <div flex-box="0" class="width">{{item.reservationProductName}}</div>
                </li>
                <li flex>
                    <div flex-box="0">客户姓名：</div>
                    <div flex-box="0" class="width">{{item.customerName}}</div>
                </li>
                <li flex>
                    <div flex-box="0">客户联系方式：</div>
                    <div flex-box="0" class="width">{{item.customerMobile}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/reserve-list.less';
    import $api from '../tools/api';
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
        created(){
            this.addHive(1, 'reserveProfessionalList',1038);
            let event = ['_trackEvent', '专职理财师预约单管理', 'SHOW', '进入专职理财师预约单管理页面','进入专职理财师预约单管理页面'];
            window._hmt.push(event);
        },
        methods: {
            changeTab(tab){
                this.addHive(0, 'reserveProfessionalList_tab_checkTab',103801);
                let event = ['_trackEvent', '专职理财师预约单管理', 'CLICK', '专职理财师预约单管理-点击tab','专职理财师预约单管理-点击tab'];
                window._hmt.push(event);
                this.status = tab;
            },
            //分页未做
            git(status){
                $api.get('/reservation/professional/list',{status:status}).then(msg => {
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
