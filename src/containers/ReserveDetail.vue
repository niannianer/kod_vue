<template>
    <div v-cloak class="reserve-detail" flex-box="1" flex="dir:top">
        <div class="detail">
            <ul class="detail-ul">
                <li flex>
                    <div>客户保护期剩余：</div>
                    <div>20天</div>
                </li>
                <li flex>
                    <div>预约单号：</div>
                    <div>200222022101</div>
                </li>
                <li flex>
                    <div>预约时间：</div>
                    <div>2017-03-01 12:00</div>
                </li>
                <li flex>
                    <div>完成时间：</div>
                    <div>2017-03-20 12:00</div>
                </li>
                <li flex>
                    <div>认购金额：</div>
                    <div>100万元</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>客户姓名：</div>
                    <div>张三</div>
                </li>
                <li flex>
                    <div>联系电话：</div>
                    <div>18612345687</div>
                </li>
                <li flex>
                    <div>身份证号：</div>
                    <div>21****************79</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>产品名称：</div>
                    <div class="width">泰发中冀郑州八达威集团并购项目私募基金</div>
                </li>
                <li flex>
                    <div>业绩基准：</div>
                    <div>9.78%</div>
                </li>
                <li flex>
                    <div>产品期限：</div>
                    <div>6个月</div>
                </li>
            </ul>
            <span class="icon cancel">
                <i></i>
            </span>
        </div>
        <div class="more"><a href="javascript:;">查看产品详情</a></div>
    </div>
</template>

<script>
    import '../less/reserve-detail.less';
    export default {
        name: 'reserve-detail',
        components: {},
        data(){
            return {}
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
