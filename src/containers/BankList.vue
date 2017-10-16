<template>
    <div class="bank-list" flex="dir:top">
        <div class="bank-item" v-for="item in baofoo" flex="cross:center" v-if="bank=='baofoo'">
            <div flex-box="0" class="bank">
                <img class="img" :src="imgUrls[item.bankCode]"/>
            </div>
            <div flex-box="1">
                <p class="main">{{item.bankName}}</p>
                <p class="sub">
                    限额： 单笔{{item.singleLimit}}，单日{{item.perdayLimit}}
                </p>
            </div>

        </div>
        <div class="bank-item" v-for="item in yingmi"
             @click.stop="setBank(item)"
             flex="cross:center" v-if="bank=='yingmi'">
            <div flex-box="0" class="bank">
                <img class="img" src="../images/bank/icbc.png"/>
            </div>
            <div flex-box="1">
                <p class="main">{{item.name}}</p>
                <p class="sub">
                    限额： 单笔{{item.maxRapidPayAmountPerTxn}}，单日{{item.maxRapidPayAmountPerDay}}
                </p>
            </div>

        </div>

    </div>
</template>

<script>
    import '../less/bank-list.less';
    import $api from '../tools/api';
    import * as imgUrls from '../tools/bank';
    export default {
        name: 'bank-list',
        data(){
            return {
                yingmi: [],
                baofoo: [],
                imgUrls,
                bank: 'baofoo',
            };
        },
        created(){
            this.getYingmi();
            this.getBaofoo();
            if (this.$route.query.yingmi) {
                this.bank = 'yingmi';
            }
        },
        methods: {
            getYingmi(){
                if (window.sessionStorage.getItem('yingmi-list')) {
                    this.yingmi = JSON.parse(window.sessionStorage.getItem('yingmi-list'));
                    return false;
                }
                $api.get('/fund/account/bank/list')
                    .then(res => {
                        if (res.code == 200) {
                            this.yingmi = res.data.list;
                            window.sessionStorage.setItem('yingmi-list', JSON.stringify(res.data.list||''))
                        }
                    });
            },
            getBaofoo(){
                if (window.sessionStorage.getItem('baofoo-list')) {
                    this.baofoo = JSON.parse(window.sessionStorage.getItem('baofoo-list'));
                    return false;
                }
                $api.get('/getBankList')
                    .then(res => {
                        if (res.code == 200) {
                            this.baofoo = res.data;
                            window.sessionStorage.setItem('baofoo-list', JSON.stringify(res.data.bankList||''))
                        }
                    });
            },
            setBank(item){
                window.sessionStorage.setItem('bank-info', JSON.stringify(item));
                this.$router.back();
            }
        }
    }
</script>
