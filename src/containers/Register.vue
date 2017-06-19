<template>
    <div class="register" flex="'dir:top">
        <div class="body" flex-box="1">
            <div class="tel" flex>
                <label for="phone" flex-box="1">手机号</label>
                <input type="tel" name=""  id="phone" flex-box="1" autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="JYM" flex>
                <label for="imageCode" flex-box="1">校验码</label>
                <div class="right" lflex-box="1">
                    <input type="tel" name=""  id="imageCode" flex-box="1" autocomplete="off" placeholder="请输入校验码">
                    <input type="button" class="getCode" flex-box="1">
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import '../less/register.less';
    export default{
        name:'register',
    }
</script>
