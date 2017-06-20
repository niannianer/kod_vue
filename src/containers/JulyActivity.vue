<template>
    <div class="july-activity" flex="dir:top">
        <div class="brand" flex-box="1">
            <img src="../images/july-activity/head.png" alt="">
        </div>
        <div class="getPhone" flex-box="1" flex="dir:top">
            <input type="text" flex-box="1" class="price" placeholder="预测价格             示例3333.33">
            <input type="tel" flex-box="1" class="phone" placeholder="请输入兑奖手机号">
            <button flex-box="1">提交</button>
        </div>
    </div>
</template>
<script>
    import '../less/july-activity.less';
    export default {
        name:'july-activity',
        data(){

        }
    }
</script>
