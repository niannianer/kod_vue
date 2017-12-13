<template>
    <div class="auth-result">
        <div class="waiting" v-if="isLoad">
            <img src="../images/loadding.png" alt="loading" class="wait-rotate">
            <p>请耐心等待授权结果</p>
        </div>
        <div class="erro" v-else="isLoad">
            <div class='x-mark'>
                <div class='left'></div>
                <div class='right'></div>
            </div>
            <p class='fail-title'>授权结果接收失败</p>
            <p>由于网络原因，宝付授权结果接收失败，请点击按钮重新接收，或直接重新授权。</p>
            <button @click.stop="reSend">重新接收</button>
            <button @click.stop="reAuth">重新授权</button>
        </div>
    </div>
</template>

<script>
    import '../less/auth-result.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import {submitAuthorization} from '../tools/operation';
    export default {
        name: 'auth-result',
        data(){
            return {
                isLoad:true
            }
        },
        created(){
            this.addHive(1, 'auth-result');
            let time = 1;
            this.getStatus();
            const _this = this;
            var timer = setInterval(function(){
                time++;
                if(time>=3){
                    clearInterval(timer);
                    _this.getStatus();
                    _this.isLoad = false;
                }else{
                    _this.getStatus();
                }
            },3000)
        },
        computed: mapState(['userId']),
        methods: {
            getStatus(){
                $api.get('/getUserVerifyStatus')
                    .then((msg)=>{
                        if(msg.code==200){
                            if(msg.data >= 2) {
                                this.$router.replace('/bind-bank-card');
                            }
                        }
                    })
            },
            reSend(){
                this.addHive(0, 'authResult_reSend');
                this.isLoad = true;
                this.getStatus(true);
                setTimeout(()=>{
                    this.isLoad = false;
                },1000)
            },
            reAuth(){
                this.addHive(0, 'authResult_reAuth');
                submitAuthorization(this.userId);
            }
        },
        destroyed(){
            this.addHive(2, 'auth-result');
        }
    }
</script>
