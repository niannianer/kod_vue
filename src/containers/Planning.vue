<template>
    <div class="planning" flex="dir:top">
        <div class="img" flex-box="1">
            <img src="../images/planning/planning-1.png"/>
        </div>
        <div class="img" flex-box="0" @click.stop="getPage('pension')">
            <img src="../images/planning/planning-2.png"/>
        </div>
        <div class="img" flex-box="0" @click.stop="getPage('house')">
            <img src="../images/planning/planning-3.png"/>
        </div>


    </div>
</template>

<script>
    import '../less/planning.less';
    export default {
        name: 'base',
        data(){
            return {

            }
        },
        created(){
        },
        computed: {
        },
        methods: {
            getPage(type){
                if(type=='house'){
                    this.$router.push('/house-one');
                }else {
                    this.$router.push('/pension-one');
                }
            }
        },
        destroyed(){

        }
    }
</script>
