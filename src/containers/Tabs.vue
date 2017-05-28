<template>
    <div class="tabs-warp" flex="dir:top">
        <router-view flex-box="1"></router-view>
        <div class="tabs" flex-box="0" flex="dir:left">
            <router-link class="tab" :to="{path:'/tabs/position'}" replace flex-box="1">职位</router-link>
            <router-link class="tab" :to="{path:'/tabs/interview'}" replace flex-box="1">面试</router-link>
            <router-link class="tab" :to="{path:'/tabs/message'}" replace flex-box="1">消息</router-link>
            <router-link class="tab" :to="{path:'/tabs/my'}" replace flex-box="1">我的</router-link>
        </div>
    </div>
</template>

<script>
    import '../less/tabs.less';
    export default {
        name: 'tabs'
    }
</script>
