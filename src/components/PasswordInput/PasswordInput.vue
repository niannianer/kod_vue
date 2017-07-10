<template>

    <div class="password-input" flex="dir:top">
        <div class="input-content" flex-box="1" flex="main:center cross:center">
            <div class="input-body">
                <div class="title">
                    请输入交易密码
                    <span class="close" @click.stop="close">×</span>
                </div>
                <div class="props-info">{{title}}</div>
                <div class="password-list" flex>
                    <div flex-box="1" v-for=" n in 6" class="password" :class="{active:n<=passwords.length}">
                        ●
                    </div>
                </div>

                <div class="forgot-password">
                    <a class="link" href="/reset-pay-password">忘记交易密码？</a>
                </div>
            </div>

        </div>
        <div class="keyboad-body" flex-box="0">
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(0,3)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                    <span class="sub" :class="{'hidden':index==0}">{{keyboad.sub}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(3,6)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                    <span class="sub">{{keyboad.sub}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(6,9)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                    <span class="sub">{{keyboad.sub}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div class="keyboad-bottom" flex-box="1">
                    <span></span>
                </div>
                <div class="keyboad-bottom" flex-box="1" @click.stop="addPassword({val:0})">
                    <span>0</span>
                </div>
                <div class="keyboad-bottom" flex-box="1" @click.stop="deletePassword">
                    <span></span>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import EventBus from  '../../tools/event-bus';
    import './password-input.less';
    export default {
        name: 'password-input',
        props: ['title'],
        data(){
            return {
                passwords: [],
                keyboads: [
                    {
                        val: 1,
                        sub: 0
                    },
                    {
                        val: 2,
                        sub: 'ABC'
                    },
                    {
                        val: 3,
                        sub: 'DEF'
                    },
                    {
                        val: 4,
                        sub: 'GHI'
                    },
                    {
                        val: 5,
                        sub: 'JKL'
                    },
                    {
                        val: 6,
                        sub: 'MNO'
                    },
                    {
                        val: 7,
                        sub: 'PQRS'
                    },
                    {
                        val: 8,
                        sub: 'TUV'
                    },
                    {
                        val: 9,
                        sub: 'WXYZ'
                    }
                ]

            }
        },
        created(){
            EventBus.$on('clearInput', () => {
                this.passwords = [];
            });
        },
        methods: {
            addPassword(keyboad){
                if (this.passwords.length < 6) {
                    this.passwords.push(keyboad.val)
                }
               /* else {
                    return false;
                }*/
                if (this.passwords.length >= 6) {
                    this.$emit('callBack', this.passwords.join('').substr(0, 6));
                }
            },
            deletePassword(){
                this.passwords.pop();
            },
            close(){
                this.$emit('close');
            }
        },
        events: {
            clear(){
                console.log('clear');
            }
        }

    }
</script>
