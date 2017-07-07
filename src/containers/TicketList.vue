<template>
    <div class="ticket-list">
        <div class="header" flex="dir:top">
            <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li :class="{'left':true,'active':isActive}" flex-box="1" @click="ticketTab('cash')">
                        现金券
                    </li>
                    <li :class="{'right':true,'active':!isActive}" flex-box="1" @click="ticketTab('rate')">
                        加息券
                    </li>
                </ul>
            </div>
        </div>
        <div class="body">
            <div class="item" flex>
                <div class="item-l" :class="{'rate':!isActive,'disabled':false}" flex>
                    <div flex-box="1" flex="dir:top cross:center">
                        <div flex-box="1" class="title" flex="cross:center">
                            <p>现金券</p>
                        </div>
                        <p flex-box="1" class="info">￥50</p>
                    </div>
                </div>
                <div class="item-r">
                    <p>满1000元可用</p>
                    <p>仅限90天及以上定期产品使用</p>
                    <div flex class="expired-time">
                        <p flex-box="1">还有5分钟过期</p>
                        <p flex-box="0" class="btn" :class="{'disabled':false}">去使用</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/ticket-list.less';
    export default {
        name: 'ticket-list',
        data(){
            return {
                isActive:true
            }
        },
        created(){
        },
        computed: {},
        methods: {
            ticketTab(string){
                this.isActive = 'cash' == string ? true : false;
            },
        },
        destroyed(){

        }
    }
</script>
