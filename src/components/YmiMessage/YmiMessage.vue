<template>
    <div class="ymi-content">
        <div class="ymi-header">
            <img src="../../images/fund/prompt.png" class="img"/>
        </div>
        <div class="ymi-main">
            <div class="b6">您即将跳转到<span class="name">盈米财富</span></div>
            <div>进行基金交易操作</div>
        </div>
        <div class="ymi-com">
            盈米财富是证监会核准的第三方基金销售机构<br/>
            销售资格证书编号 000000378<br/>
            监管机构：中国证监会<br/>
            监管银行：中国平安银行<br/>
            官方网站：www.yingmi.cn<br/>
        </div>
        <div flex="dir:top cross:center" class="ymi-actions">
            <button class="btn-ok" @click.stop="okAction(1)">进入盈米财富</button>
            <span class="back" @click.stop="okAction(0)">返回</span>
        </div>
    </div>
</template>

<script>
    import './ymi-message.less';
    export default {
        name: 'ymi',
        props: [],
        data(){
            return {
                show: false
            }
        },
        methods: {
            okAction(result){
                this.$emit('callBack', result)
            }
        }

    }
</script>
