<template>

    <div class="invest-input" flex="dir:top">
        <div flex-box="1"></div>
        <div class="body" flex-box="0">
            <div class="title">{{title}}
                <span class="close" @click.stop="close">×</span>
            </div>
            <div class="account-text">账户余额</div>
        </div>

        <div class="keyboad-body" flex-box="0">
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(0,3)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(3,6)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(6,9)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div class="keyboad-bottom" flex-box="1">
                    <span></span>
                </div>
                <div class="keyboad-bottom" flex-box="1">
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
    import './invest-input.less';
    export default {
        name: 'invest-input',
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
