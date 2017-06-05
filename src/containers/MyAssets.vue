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
              .then(data=>{
                  console.log(data);
                  return data

              })
              .then(data=>{
                  console.log("--->",data);
              })
        }
    }
</script>
