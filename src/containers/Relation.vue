<template>
    <div flex="dir:top" flex-box="1" class="relation">
        <div class="body">
            <div class="number"><span>{{total}}</span>人</div>
            <div class="title">我的好友</div>
        </div>
        <div class="item" flex flex-box="0" @click.stop="pathTo(1)">
            <div flex-box='1' class="left">金疙瘩好友</div>
            <div flex-box='0' class="right">{{levelOneCount}}人</div>
        </div>
        <div class="item" flex flex-box="0" @click.stop="pathTo(2)">
            <div flex-box='1' class="left">银疙瘩好友</div>
            <div flex-box='0' class="right">{{levelTwoCount}}人</div>
        </div>
        <div class="item" flex flex-box="0" @click.stop="pathTo(3)">
            <div flex-box='1' class="left">铜疙瘩好友</div>
            <div flex-box='0' class="right">{{levelThreeCount}}人</div>
        </div>
        <div class="code-info" flex="dir:top">
            <div flex-box='1' style="overflow: visible">我的专属二维码</div>
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
                levelOneCount: 0,
                levelTwoCount: 0,
                levelThreeCount: 0,
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
                let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击邀请好友', '我的好友页面-点击邀请好友'];
                window._hmt.push(event);
                window.location.href = '/land-share.html';
            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——我的好友'
                });
            },
            pathTo(num){
                let oper = '';
                switch (num) {
                    case 1:
                        oper = '金疙瘩';
                        break;
                    case 2:
                        oper = '银疙瘩';
                        break;
                    case 3:
                        oper = '铜疙瘩';
                        break;
                }
                let event = ['_trackEvent', '我的好友', 'CLICK', '在我的好友页面点击' + oper + '好友', '我的好友页面-点击' + oper + '好友'];
                window._hmt.push(event);
                if(num ==1){
                    this.$router.push('/relation-list-gold')
                    return false;
                }
                this.$router.push({
                    path: '/relation-list',
                    query: {
                        level: num
                    }
                })

            }

        },
        computed: {
            ...mapState(['investorMobile']),
            total(){
                let total = Number(this.levelOneCount) + Number(this.levelTwoCount) + Number(this.levelThreeCount);
                if (!isNaN(total)) {
                    return total
                }
                return 0
            }

        },
        mounted(){
            if (this.investorMobile) {
                this.useqrcode();
            } else {
                this.$store.dispatch('getUserInfo')
                    .then(() => {
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
                    this.levelThreeCount = data.data.levelThreeCount || 0;
                }
            })
            let event = ['_trackEvent', '我的好友', 'SHOW', '进入我的好友页面', '进入我的好友页面'];
            window._hmt.push(event);
        }
    }
</script>





