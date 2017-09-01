<template>
    <div class="helpcenter">
        <div flex="cross:stretch" class="list" v-for="(item,index) in questions" :key="index">
            <div flex="cross:center" @click.stop="pathTo(index)" flex-box="0">
                <div flex="dir:top">
                    <p class="category">{{item.category}}</p>
                    <div class="more" flex="main:center">
                        <p>更多</p><span>&gt</span>
                       <!-- <img src="../images/arrow-right.png" alt="more">-->
                    </div>
                </div>
            </div>
            <div class="questions-list" flex-box="1">
                <div class="question-item" flex-box="1" v-for="(qitem,index) in item.qList" :key="index">
                    <div flex="cross:center" v-if="item.openIndex != index" @click.sop="item.openIndex = index" >
                        <p flex-box="1" class="q">{{qitem.q}}</p>
                        <img src="../images/arraw-down.png" alt="arrow" flex-box="0" >
                    </div>
                    <div flex="cross:center" v-else  @click.sop="item.openIndex = -1">
                        <p flex-box="1" class="q">{{qitem.q}}</p>
                        <img src="../images/arraw-down.png" alt="arrow" flex-box="0"  class="collapse" >
                    </div>
                    <p class="a" v-show="item.openIndex == index">{{qitem.a}}</p>
                </div>
            </div>
        </div>
        <div class="fedback" flex="cross:center" @click.stop="fedback">
            <p flex-box="1">反馈其他问题、建议</p>
            <img src="../images/arraw-down.png" alt="arrow" flex-box="0">
        </div>
        <div class="service">
            <a href="tel:400-640-3606" class="callnum">400-640-3606</a>
            <p class="tip">人工服务时间 工作日9：00-18：00</p>
        </div>
    </div>
</template>

<script>
    import $device from '../tools/device';
    import questions from '../tools/helpQA';
    import requestHybrid from '../tools/hybrid';
    import '../less/helpcenter.less';
    export default {
        name: 'base',
        data(){
            return {
                questions: questions
            }
        },
        created(){
            if ($device.kingold) {
                this.isApp = true;
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 0,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title:'',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                })
            }
        },
        computed: {},
        methods: {
            pathTo(num){
                this.$router.push({
                    path:'/helpcenter-cate',
                    query:{
                        cate:num
                    }
                })
            },
            fedback(){
                this.$router.push('/feedback');
            }
        },
        destroyed(){
        }
    }
</script>
