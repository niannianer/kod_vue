<template>
    <div flex="dir:top" flex-box="1" class="relation">
        <div class="body">
            <div class="number"><span>{{ Number(levelOneCount) + Number(levelTwoCount)+Number(levelThreeCount)}}</span>人</div>
            <div class="title">我的好友</div>
        </div>
        <div class="item" flex @click.stop="$router.push('/relation-list?level=1')">
            <div flex-box='1' class="left">金疙瘩好友</div>
            <div flex-box='0' class="right">{{levelOneCount}}人</div>
        </div>
        <div class="item" flex @click.stop="$router.push('/relation-list?level=2')">
            <div flex-box='1' class="left">银疙瘩好友</div>
            <div flex-box='0' class="right">{{levelTwoCount}}人</div>
        </div>
        <div class="item" flex @click.stop="$router.push('/relation-list?level=3')">
            <div flex-box='1' class="left">铜疙瘩好友</div>
            <div flex-box='0' class="right">{{levelThreeCount}}人</div>
        </div>
        <div class="code-info" flex="dir:top">
            <div flex-box='1'>我的专属二维码</div>
            <div id="code" flex-box='1'>
                <canvas id="canvas" flex-box='1' style="display: none"></canvas>
                <img :src="imgSrc" alt="">
            </div>
        </div>
        <div class="btn" @click.stop="link()">
            <button>邀请好友</button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import '../less/relation.less';
    import $api from '../tools/api';
    import QRCode from 'qrcode';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    Vue.use(QRCode)
    export default {
        name: 'relation',
        data() {
            return {
                levelOneCount: '',
                levelTwoCount: '',
                levelThreeCount:'',
                codes: '',
                imgSrc: ''
            }
        },
        methods: {
            useqrcode(){
                const canvas = document.getElementById('canvas');
                const url = window.location.origin + '/land-register.html?inviter=' + this.investorMobile;
                QRCode.toCanvas(canvas, url, (error) => {
                    if (error) console.log(error)
//                    console.log(state.investorMobile);
                    this.imgSrc = canvas.toDataURL("image/png");
                });

            },
            link(){
                window.location.href = '/land-share.html';
            },
            getShare(){
                wx.getShare({
                    title:'金疙瘩——我的好友'
                });
            }

        },
        computed: {
            ...mapState(['investorMobile'])

        },
        mounted(){
            if(this.investorMobile){
                this.useqrcode();
            }else {
                this.$store.dispatch('getUserInfo')
                    .then(()=>{
                        this.useqrcode();
                    })
            }

        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            $api.get('/relation/count').then(data => {
                if (data.code == 200) {
                    this.levelOneCount = data.data.levelOneCount;
                    this.levelTwoCount = data.data.levelTwoCount;
                    this.levelThreeCount = data.data.levelThreeCount;
                }
            })
        }
    }
</script>





