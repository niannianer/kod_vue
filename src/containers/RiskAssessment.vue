<template>
    <div class="risk-assessment">
        <div class="content">
            <div class="title">{{title}}</div>

            <div class="qu-title">{{quIndex + 1}}、{{question}}</div>
            <div class="qu-item" :class="{'active':index==currentIndex}"
                 @click.stop="selectItem(item,index)"
                 v-for="(item,index) in answers" :key="index">
                {{item.title}}
            </div>
            <div class="last-item" v-if="quIndex" @click.stop="getLast()">上一题</div>
        </div>
        <div class="submit" v-if="showSubmit">
            <button class="btn-primary btn-submit"
                    @click.stop="updateUserInfo"
                    :disabled="disabled">提交
            </button>
        </div>
    </div>
</template>
<script>
    import questions from '../tools/questions';
    import $api from '../tools/api';
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
                answers: [],
                scores: []
            }
        },
        created(){
            this.setIndex(0);
        },
        computed: {
            showSubmit(){
                return (this.quIndex + 1 == quLen);
            },
            disabled(){
                return this.currentIndex == 99
            }
        },
        methods: {
            setIndex(){
                let qu = questions[this.quIndex];
                this.title = qu.title;
                this.question = qu.question;
                this.answers = qu.answers;
            },
            getLast(){
                this.quIndex--;
                this.setIndex();
                this.scores.pop();
            },
            selectItem(item, index){
                this.currentIndex = index;
                if (quLen == this.quIndex + 1) {
                    return false;
                }
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.quIndex++;
                    this.setIndex();
                    this.scores.push(item.score);
                    this.currentIndex = 99;
                }, 2000)
            },
            updateUserInfo(){
                let investorRiskScore = 0;
                this.scores.map(score => {
                    investorRiskScore += score;
                })

                $api.post('/updateUserInfo', {investorRiskScore})
                    .then(data => {
                        if (data.code == 200) {
                            console.log(12);
                        }
                    });
            }
        },
        destroyed(){

        }
    }
</script>
