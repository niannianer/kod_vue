<template>
    <div flex="dir:top" flex-box="1">
        my -assest
    </div>
</template>

<script>
    import $api from '../tools/api';
    export default {
        name: 'my-assets',
        data(){
          return {}
        },
        created(){
          $api.get('/getUserInfo')
        }
    }
</script>
