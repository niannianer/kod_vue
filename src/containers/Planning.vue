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
        <div class="nav" flex-box="0" flex="box:mean">
            <div @click.stop="pathTo('/index')">
                <img src="../images/nav/index.png" alt="index">
                <p>首页</p>
            </div>
            <div @click.stop="pathTo('/financial')">
                <img src="../images/nav/financial.png" alt="financial">
                <p>理财</p>
            </div>
            <div @click.stop="pathTo('/person-center')">
                <img src="../images/nav/person-center.png" alt="person-center">
                <p>个人中心</p>
            </div>
            <div @click.stop="pathTo('/land-download.html',true)">
                <img src="../images/nav/download.png" alt="download">
                <p>下载app</p>
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

        }
    }
</script>
