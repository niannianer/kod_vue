<template>
    <div class="risk-assessment">
        <div class="content">
            <div class="qu-order" :class="{'app':isApp}">
              <span>
                    {{quIndex + 1}}/{{quLen}}
              </span>
            </div>
            <div class="title">{{title}}</div>

            <div class="qu-title">{{quIndex + 1}}、{{question}}</div>
            <div class="qu-item" :class="{'active':index==currentIndex,'app':isApp}"
                 @click.stop="selectItem(item,index)"
                 v-for="(item,index) in answers" :key="index">
                {{item.title}}
            </div>
            <div class="last-item" :class="{'app':isApp}" v-if="quIndex" @click.stop="getLast()">上一题</div>
        </div>
        <div class="submit" v-if="showSubmit">
            <button class="btn-primary btn-submit" :class="{'app':isApp}"
                    @click.stop="updateUserInfo"
                    :disabled="disabled">提交
            </button>
        </div>
    </div>
</template>
<script>

    import questions from '../tools/questions';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import wx from '../tools/wx';
    import requestHybrid from '../tools/hybrid';
    import _ from 'lodash/core';
    import '../less/risk-assessment.less';
    let timer = null;
    let quLen = questions.length;
    export default {
        name: 'risk-assessment',
        data(){
            return {
                title: '',
                question: '',
                quIndex: 0,
                quLen: questions.length,
                currentIndex: 99,
                isApp: false,
                answers: [],
                scores: [],
                options:[]
            }
        },
        created(){
            this.addHive(1, 'riskAssessment',1043);
            let event = ['_trackEvent', '风险测评', 'SHOW', '进入风险测评页面', '进入风险测评页面'];
            window._hmt.push(event);
            if ($device.isWeixin) {
                this.getShare();
            }
            this.setIndex(0);
            console.log(this.$route.name);
            if ($device.kingold) {
                this.isApp = true;
            }
            if (this.$route.path.indexOf('app') > -1) {
                this.isApp = true;
            }
        },
        computed: {
            showSubmit(){
                return (this.scores.length >= quLen - 1);
            },
            disabled(){
                return this.currentIndex == 99
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title:'金疙瘩——风险测评'
                });
            },
            setIndex(){
                let qu = questions[this.quIndex];
                this.title = qu.title;
                this.question = qu.question;
                this.answers = qu.answers;
            },
            getLast(){
                this.addHive(0, 'riskAssessment_btn_lastItem',104301);
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-上一题', '风险测评页面-上一题'];
                window._hmt.push(event);
                if (quLen == this.scores.length) {
                    this.scores.pop();
                    this.options.pop();
                }
                this.quIndex--;
                this.setIndex();
                this.scores.pop();
                this.options.pop();
                this.currentIndex = 99;
            },
            selectItem(item, index){
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-选择答案', '风险测评页面-选择答案'];
                window._hmt.push(event);
                this.currentIndex = index;
                if (quLen == this.scores.length) {
                    this.scores.pop();
                    this.options.pop();
                    this.scores.push(item.score);
                    this.options.push(index+1);
                    return false;
                }
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.scores.push(item.score);
                    this.options.push(index+1);
                    if (quLen > this.scores.length) {
                        this.currentIndex = 99;
                    }
                    if (quLen == this.scores.length) {
                        return false;
                    }
                    this.quIndex++;
                    this.setIndex();
                }, 500)
            },
            updateUserInfo(){
                this.addHive(0, 'riskAssessment_btn_submitResult',104302);
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-提交结果', '风险测评页面-提交结果'];
                window._hmt.push(event);
                let investorRiskScore = 0;
                this.scores.map(score => {
                    investorRiskScore += score;
                })
                let investorRiskVersion = 2;/*风险测评第二版（10道题）*/
                let investorRiskAnswer = this.options.join('$$');


                $api.post('/updateUserInfo', {
                    investorRiskScore,
                    investorRiskVersion,
                    investorRiskAnswer
                }).then(data => {
                    if (data.code == 200) {
                        console.log(12);
                        this.$store.dispatch('getUserInfo');
                        this.$store.dispatch('getRiskInfo');
                        // return;
                        if (this.isApp) {
                            this.$router.replace({
                                path: '/assessment-result',
                                query: {
                                    from: 'app'
                                }
                            })
                        } else {
                            this.addHive(2, 'riskAssessment_to_assessmentResult',1043);
                            this.$router.replace('/assessment-result');
                        }

                    } else {
                        Toast('提交失败,稍后再试');
                    }
                });
            }
        },
        mounted(){
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
                    title: '风险测评',
                    backstr: '本次风险测评还未完成，退出后将不保存当前进度，确定退出？',
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            });
        },
        destroyed(){

        }
    }
</script>
