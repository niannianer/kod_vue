<template>
    <div flex="dir:top" flex-box="1" class="my-count">
        <div class="count-body">
            <p class="title">真实信息</p>
            <div class="info">
                <div class="item1" flex>
                    <div class="item-left" flex-box="1">真实姓名</div>
                    <div class="item-right" flex-box="0">
                    *阳
                    </div>
                </div>
                <div class="item2" flex>
                    <div class="item-left" flex-box="1">证件号码</div>
                    <div class="item-right" flex-box="0">
                    120********90
                    </div>
                </div>
            </div>
            <p>银行卡信息</p>
            <div class="bank">
                <div class="bank-name">
                    <img src="../images/bank/ecitic.png" class="bank-logo"/>
                    <span class="name">中信银行</span>
                    <div class = "bank-info">6221 6600 ＊＊＊＊ 1148</div>
                </div>
            </div>
            <div class="tel-info">
               如需换卡，请联系客服：<span class="span">{{telNumber}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import  '../less/my-count.less';

    export default {
        name: 'my-count',
        data(){
            return {
                telNumber
            }
        },
        created(){
            $api.get('/getAccountBaofoo')
                .then(data => {
                    console.log(data);
                    return data

                })

        }
    }
</script>
