<template>
<div class="modal-warp">
    <div class="modal-body">
        <div class="modal-content">
            <div class="modal-logos" flex>
                <div class="logo" flex-box="1">
                    <img src="../../images/logo.png"/>
                    <div class="logo-title">金疙瘩</div>
                </div>
                <div class="logo" flex-box="1">
                    <img src="../../images/logo.png"/>
                    <div class="logo-title">金疙瘩</div>
                </div>
            </div>
            <div class="modal-main">为保障您的资金安全请先开通第三方托管账户</div>
            <div flex="" class="btn-groups">
                <button class="modal-btn-ok" flex-box="1" @click.stop="okAction">取消</button>
                <button class="modal-btn-ok" flex-box="1" @click.stop="okAction">去开户</button>
            </div>
        </div>
    </div>
</div>



</template>

<script>
    import './modal.less';
    export default {
        name: 'modal',

        methods: {
            okAction(){
                this.callback(1)
            }
        }

    }
</script>
