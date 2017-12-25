<template>
    <div class="planning" flex="dir:top">
       <div flex="dir:top" flex-box="1" style="overflow: auto;">
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
            this.addHive(1,'planning',1029);
        },
        computed: {
        },
        methods: {
            getPage(type){
                if(type=='house'){
                    this.addHive(0,'planning_link_house',102901);
                    this.$router.push('/house-one');
                }else {
                    this.addHive(0,'planning_link_pension',102902);
                    this.$router.push('/pension-one');
                }
            },
            pathTo(path,boolean){
                if(boolean){
                    window.location.href = path;
                    return false;
                }
                this.$router.push(path);
            },
        },
        destroyed(){
            this.addHive(2,'planning',1029);
        }
    }
</script>
