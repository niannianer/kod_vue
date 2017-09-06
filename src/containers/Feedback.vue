<template>
    <div class="feedback">
        <div class="body">
            <p class="title">亲爱的用户：</p>
            <p class="tip">为了更好的提升产品体验与服务，我们诚恳的希望您可能为我们提出宝贵的建议和意见。</p>
            <p class="text-tip">欢迎写下您的意见、建议~</p>
            <div class="text-box" flex="main:center">
                <textarea name="feedback" id="" cols="30" rows="10"
                          maxlength="1000"
                          class="textarea" v-model.trim="context"
                          @input="total"></textarea>
            </div>
            <div flex="main:center">
                <p class="btn-confirm" :class="{'disable':isDisable}" @click.stop="submit">提交</p>
            </div>
        </div>
    </div>
</template>

<script>
    import $device from '../tools/device';
    import requestHybrid from '../tools/hybrid';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import '../less/feedback.less';
    import {Indicator, Toast} from 'mint-ui';
    export default {
        name: 'feedback',
        data(){
            return {
                context: '',
                isDisable: true
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
                        title: '帮助中心',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                })
            }
        },
        computed: mapState([
            'investorRealName',
            'investorMobile'
        ]),
        methods: {
            total(){
                if (this.context.length > 1000) {
                    this.context = this.context.substr(0, 1000);
                }
                this.isDisable = !this.context.length
            },
            submit(){
                if (!this.isDisable) {
                    Indicator.open('提交中。。。');
                    let content = encodeURIComponent(this.context);
                    if(!content.length){
                        Indicator.close();
                        this.context = content;
                        this.total();
                        return false
                    }
                    // Toast(content);
                    $api.post('/feedback/create', {
                        userRealName: this.investorRealName,
                        userMobile: this.investorMobile,
                        feedbackType: 1, /*1反馈2投诉*/
                        content
                    })
                        .then(resp => {
                            Indicator.close();
                            if (resp.code == 200) {
                                Toast('您的反馈已成功提交');
                                setTimeout(() => {
                                    this.$router.back(-1);
                                }, 2000);
                            } else {
                                  Toast(resp.msg)
                            }
                        })
                }
            },
            filterEmoji(text)
            {
                let reg = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
                return text.replace(reg, '');
            }
        },
        destroyed()
        {

        }
    }
</script>
