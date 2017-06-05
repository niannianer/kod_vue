<template>
    <div flex="dir:top" flex-box="1">
        <input v-model="newname" @keyup="changeName()">
        <div>index {{username}}</div>

        <button class="btn-primary" @click="toastFun">toast</button>
        <button class="btn-primary" @click="alertFun">alert</button>
        <button class="btn-primary" @click="confirmFun">confirm</button>
    </div>
</template>

<script>
    import Confirm from '../components/Confirm';
    import Toast from '../components/Toast';
    import Alert from '../components/Alert';
    export default {
        name: 'index',
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
            },
            toastFun(){
                Toast({
                    message: '1234567890'
                })
            },
            alertFun(){
                this.alertInstance = Alert({
                    title: 'alert',
                    content: 'content-alert',
                    callback: (result) => {
                        console.log('callback', result)
                    }
                })
            },
            confirmFun(){
                this.confrimInstance = Confirm({
                    title: 'title',
                    content: 'content',
                    callback: (result) => {
                        console.log('callback', result)
                    }
                })
            }

        },
        destroyed(){
            this.alertInstance && this.alertInstance.close();
            this.confrimInstance && this.confrimInstance.close();
        }
    }
</script>
