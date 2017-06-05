<template>

    <div class="alert-warp">
            <div class="alert-content" v-show="visible">
                <div class="alert-title">{{title}}</div>
                <div class="alert-main">{{content}}</div>
                <div flex="">
                    <button class="alert-btn-ok" flex-box="1" @click.stop="okAction">{{okText}}</button>
                </div>
            </div>
    </div>


</template>

<script>
    import './alert.less';
    export default {
        name: 'alert',
        props: ['title', 'content', 'okText'],
        data(){
            return {
                visible: false

            }
        },
        methods: {
            okAction(){
                this.visible = false;
                this.callback(1)
            }
        }

    }
</script>
