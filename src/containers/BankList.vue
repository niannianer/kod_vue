<template>
    <div class="bank-list" flex-box="1" flex="dir:top">
        <div class="bank-box">
            <ul flex class="list" v-for="(item,index) in list" :key="index">
                <li v-for="(n,i) in item" :class="{'top':index == 0,left:i == 0}" :key="i">{{n}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/bank-list.less';
    export default {
        name: 'bank-list',
        data(){
            return {
                list:[
                    ['工商银行','农业银行','中国银行'],
                    ['建设银行','民生银行','交通银行'],
                    ['光大银行','广发银行','兴业银行'],
                    ['平安银行','浦发银行','上海银行'],
                    ['邮储银行','中信银行','招商银行'],
                    ['华夏银行','','']
                ]
            };
        },
        methods: {
            
        }
    }
</script>
