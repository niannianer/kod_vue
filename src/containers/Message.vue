<template>
    <div flex="dir:top" flex-box="1">

        <div> message {{msg}}</div>
        <button @click="increment(5)">increment</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'message',
        data(){
            return {
                msg: '1234567'
            }
        },
        created(){
            setTimeout(() => {
                this.msg = 'dshjfgdhjsgh';
            }, 4000);
        },
        methods: {
            ...mapActions(['increment'])
        }
    }
</script>
