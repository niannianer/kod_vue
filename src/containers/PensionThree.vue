<template>
    <div v-cloak class="pension-three" flex-box="1" flex="dir:top">
        <div class="salary" flex-box="1" flex="dir:top">
            <div class="title" >请输入您的税后工资（月）</div>
            <div class="content" flex="main:left"><div class="num" ><input type="text"></div><span>元</span></div>
        </div>
        <div flex-box="0" class="check">
            <p >当前选择：<span v-show="sex == 1" class='sex'>男，</span><span v-show="sex == 2" class='sex'>女，</span><span class='age'>10岁</span></p>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
            <div class="left" flex-box="1" @click.stop="$router.push('/pension-two')" >上一步</div>
            <div class="left" flex-box="1" @click.stop="$router.push('/pnsion-four')">下一步</div>
        </div>
    </div>
</template>

<script>
    import '../less/pension-three.less';
    export default {
        name: 'pension-three',
        data(){

        }
    }
</script>
