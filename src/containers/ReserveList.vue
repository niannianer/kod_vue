<template>
    <div v-cloak class="reserve-list" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" :class="{'tab-active':tab==0}"  @click.stop="changeTab(0)">
                <div class="tab-item">待处理</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':tab==1}" @click.stop="changeTab(1)">
                <div class="tab-item">已处理</div>
            </div>
            <div flex-box="1" class="tab" :class="{'tab-active':tab==2}" @click.stop="changeTab(2)">
                <div class="tab-item">已取消</div>
            </div>
        </div>
        <div class="item-list" flex-box="1">
            <ul class="item" v-for="(item,index) in msg[tab]" :key="index">
                <li flex>
                    <div flex-box="0">预约单号：</div>
                    <div flex-box="0">{{item.orderNum}}</div>
                </li>
                <li flex>
                    <div flex-box="0">预约时间：</div>
                    <div flex-box="0">{{item.time}}</div>
                </li>
                <li flex>
                    <div flex-box="0">产品名称：</div>
                    <div flex-box="0" class="width">{{item.name}}</div>
                </li>
                <li flex>
                    <div flex-box="0">客户姓名：</div>
                    <div flex-box="0">{{item.userName}}</div>
                </li>
                <li flex>
                    <div flex-box="0">联系方式：</div>
                    <div flex-box="0">{{item.tel}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/reserve-list.less';
    export default {
        name: 'reserve-list',
        components: {
           
        },
        data(){
            return {
                tab: 0,
                msg:{
                    0:[
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '张三',
                            tel: '1871110000'
                        }
                    ],
                    1:[
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '李四',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '李四',
                            tel: '1871110000'
                        }
                    ],
                    2:[
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '王五',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '王五',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '王五',
                            tel: '1871110000'
                        },
                        {
                            orderNum: '0000000000000',
                            time: '2017-03-01 12:12',
                            name: '泰发中冀郑州八达威集团并购项目私募基金泰发中冀郑州八达威集团并购项目私募基金',
                            userName: '王五',
                            tel: '1871110000'
                        }
                    ]
                },
                lists:null
            };
        },
        computed: {
            count(){
                console.log('1111')
                return this.$store.state.count
            }
        },
        methods: {
            changeTab(tab){
                this.tab = tab;
                //this.$router.push('/index');
            }
        }
    }
</script>
