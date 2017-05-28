<template>
    <div flex="dir:top" flex-box="1">
        <input v-model="newname" @keyup="changeName()">
        <div>interview {{username}}</div>
    </div>
</template>

<script>
    export default {
        name: 'interview',
        data(){
            return {
                newname: '',
                timer: null
            }
        },
        created(){


        },
        computed: {
            username(){
                return this.$store.state.username
            }
        },
        methods: {
            changeName(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    let newname = this.newname;
                    if (!newname) {
                        return false;
                    }
                    this.$store.dispatch('changeName', newname)
                }, 2000);
            }
        }
    }
</script>
