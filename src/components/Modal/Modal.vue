<template>
    <div class="modal-warp">
        <div class="modal-body">
            <div class="header">开通托管账户</div>
            <div class="body">
                <div class="tip1">
                    <p>为了您的资金安全，</p>
                    <p>请先行到宝付支付开通托管账户。</p>
                </div>
                <p class="tip2">宝付支付</p>
                <div class="tip3" flex="dir:top cross:center">
                    <div flex style="overflow: visible">
                        <img src="../../images/modal/tip-logo1.png" alt="tip" style="margin-left:-.5rem">
                        <p>安全交易近10年</p>
                    </div>
                    <div flex>
                        <img src="../../images/modal/tip-logo2.png" alt="tip">
                        <p>央行许可支付牌照</p>
                    </div>
                </div>
                <div flex="main:center">
                    <p class="btn-confirm" @click.stop="okAction(1)">去开通</p>
                </div>
                <img src="../../images/modal/close.png" alt="close" class="close" @click.stop="okAction(0)">
            </div>
        </div>
    </div>


</template>

<script>
    import './modal.less';
    export default {
        name: 'modal',

        methods: {
            okAction(result){
                let oper = '';
                if (result) {
                    oper = '去开户';
                } else {
                    oper = '取消';
                }
                let event = ['_trackEvent', '开户弹窗', 'CLICK', '在开户弹窗中点击' + oper + '', '开户弹窗中-点击' + oper + ''];
                window._hmt.push(event);
                this.$emit('callBack', result)
            }
        }

    }
</script>
