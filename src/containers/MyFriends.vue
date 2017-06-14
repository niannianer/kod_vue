<template>
    <div flex="dir:top" flex-box="1" class="my-friends">
        <div class="body">
            <div class="number"><span>{{ Number(levelOneCount)+ Number(levelTwoCount)}}</span>人</div>
            <div class="title">我的好友</div>
        </div>
        <div class="item" flex @click.stop="FriendsListOne">
            <div flex-box='1' class="left">1度好友</div>
            <div flex-box='0' class="right">{{levelOneCount}}人</div>
        </div>
        <div class="item" flex @click.stop="FriendsListTwo">
            <div flex-box='1' class="left">2度好友</div>
            <div flex-box='0' class="right">{{levelTwoCount}}人</div>
        </div>
        <div class="code-info" flex="dir:top">
            <div flex-box='1'>我的专属二维码</div>
            <div class="code" flex-box='1'><img src="../images/code.png" ></div>
        </div>
        <div class="btn" @click.stop="$router.push('/share.html')">
            <button>邀请好友</button>
        </div>
    </div>
</template>
<script>
    import '../less/my-friends.less';
    import $api from '../tools/api';
    export default {
        name:'my-friends',
        data() {
            return {
                levelOneCount:'',
                levelTwoCount:''
          }
        },
        methods:{
           link(rewardBillCode){
                window.location.href='/friends-list?rewardBillCode='+rewardBillCode;
            }
        },
        created(){
            $api.get('/relation/count').then(data => {
                if(data.code == 200){
                    this.levelOneCount = data.data.levelOneCount;
                    this.levelTwoCount = data.data.levelTwoCount;
                }
           })
        }
    }
</script>
