<template>
    <div class="login">
        <input v-model="username" style="height: 30px">
        <input v-model="password" style="height: 30px">
        <div> {{username}}</div>
        <button class="btn-primary" @click.stop="login">login</button>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import _ from 'lodash/core';
    export default {
        name: 'login',
        data(){
            return {
                username: '13381078657',
                password: '123456'
            }
        },
        created(){
            console.log(_.clone($api));


        },
        computed: {},
        methods: {
            login(){
                let investorMobile = this.username;
                let userLoginPassword = this.password
                $api.post('/login', {
                    investorMobile,
                    userLoginPassword
                });
            }

        }
    }
</script>
