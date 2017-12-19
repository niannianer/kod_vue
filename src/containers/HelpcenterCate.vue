<template>
    <div class="helpcenterCate">
        <div class="title">
            {{questions[cate].category}}相关问题
        </div>
        <div class="questions-list" flex-box="1">
            <div class="question-item" flex-box="1" v-for="(qitem,index) in questions[cate].qList" :key="index">
                <div flex="cross:center" v-if="questions[cate].openIndex != index" @click.sop="questions[cate].openIndex = index" >
                    <p flex-box="1" class="q">{{qitem.q}}</p>
                    <img src="../images/arraw-down.png" alt="arrow" flex-box="0" >
                </div>
                <div flex="cross:center" v-else  @click.sop="questions[cate].openIndex = -1">
                    <p flex-box="1" class="q">{{qitem.q}}</p>
                    <img src="../images/arraw-down.png" alt="arrow" flex-box="0"  class="collapse" >
                </div>
                <p class="a" v-show="questions[cate].openIndex == index">{{qitem.a}}</p>
            </div>
        </div>
        <div class="service">
            <div class="callnum" v-if="isApp" @click.stop="callService">400-640-3606</div>
            <a href="tel:400-640-3606" class="callnum" v-else>400-640-3606</a>
            <p class="tip">人工服务时间 工作日9：00-18：00</p>
        </div>
    </div>
</template>

<script>
    import $device from '../tools/device';
    import requestHybrid from '../tools/hybrid';
    import '../less/helpcenter-cate.less';
    import questions from '../tools/helpQA';
    export default {
        name: 'helpcenterCate',
        data(){
            return {
                questions:questions,
                isApp:false
            }
        },
        created(){
            this.addHive(1, 'help-center-cate');
            if ($device.kingold) {
                this.isApp = true;
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 0,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title:'帮助中心',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                })
            }
        },
        computed: {
            cate(){
                return this.$route.query.cate
            }
        },
        methods: {
            callService(){
                this.addHive(0, 'helpcenterCate_call_mobile');
                requestHybrid({
                    tagname: 'tel',
                    param: {
                        callService: '400-640-3606'// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    }
                })
            }
        },
        destroyed(){
            this.addHive(2, 'helpcenter-cate');
        }
    }
</script>
