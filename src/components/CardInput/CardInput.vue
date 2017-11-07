<template>

    <div class="card-input" flex="dir:top">
        <div flex-box="1"></div>
        <div class="body" flex-box="0">
            <div class="title">{{title}}
                <span class="close" @click.stop="close">×</span>
            </div>

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
                <div class="keyboad-bottom" flex-box="1" @click.stop="addPassword({val:'x'})">
                    <span>X</span>
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
    import './card-input.less';
    export default {
        name: 'card-input',
        props:['title'],
        data(){
            return {
                passwords: [],
                hintText: '',
                timer: null,
                disabled: true,
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
        },
        computed: {},
        methods: {
            addPassword(keyboad){
                this.passwords.push(keyboad.val);
                this.$emit('callBack', this.passwords.join(''));
            },
            deletePassword(){
                this.passwords.pop();
                this.$emit('callBack', this.passwords.join(''));
            },
            close(){
                this.$emit('close');
            }

        },
        destroyed(){

        }

    }
</script>
