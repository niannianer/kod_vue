<template>
    <div class="login">
        <input v-model="username">
        <input v-model="password">
        <div> {{username}}</div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import _ from 'lodash/core';
    export default {
        name: 'login',
        data(){
            return {
                username: 'myname',
                password: ''
            }
        },
        created(){
            console.log(_.clone($api));
            $api.post('/login', {
                investorMobile: '13936663194',
                userLoginPassword: '123456'
            });

        },
        computed: {},
        methods: {}
    }
</script>
