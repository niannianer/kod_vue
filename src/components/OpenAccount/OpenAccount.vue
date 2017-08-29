<template>
    <div class="account-warp">
        <div class="account-content">
            <div class="account-head">
                <div class="account-logo" flex="">
                    <dl>
                        <dt><img src="../../images/logo.png" alt=""></dt>
                        <dd>金疙瘩</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../images/logo.png" alt=""></dt>
                        <dd>金疙瘩</dd>
                    </dl>
                </div>
                <div class="account-text">为保障您的资金安全请先开通第三方托管账户</div>
            </div>
            <div flex="" class="account-btn">
                <button class="account-btn-cancel" flex-box="1" @click.stop="btnAction(0)">取消</button>
                <button class="account-btn-ok" flex-box="1" @click.stop="btnAction(1)">去开户</button>
            </div>
        </div>
    </div>


</template>

<script>
    import './open-account.less';
    export default {
        name: 'open-account',
        data(){
            return {
                //visible: false

            }
        },
        methods: {
            btnAction(result){
                let oper = '';
                if(result){
                    oper = '去开户';
                }else{
                    oper = '取消';
                }
                let event = ['_trackEvent', '开户弹窗', 'CLICK', '在开户弹窗中点击'+oper+'', '开户弹窗中-点击'+oper+''];
                window._hmt.push(event);
                this.callback(result)
            }
        }

    }
</script>
