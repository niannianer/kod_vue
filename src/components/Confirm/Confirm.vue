<template>

    <div class="confirm-warp">
        <div class="confirm-content" v-show="visible">
            <div class="confirm-title">{{title}}</div>
            <div class="confirm-main">{{content}}</div>
            <div flex="">
                <button class="confirm-btn-cancel" flex-box="1" @click.stop="btnAction(0)">{{cancelText}}</button>
                <button class="confirm-btn-ok" flex-box="1" @click.stop="btnAction(1)">{{okText}}</button>
            </div>
        </div>
    </div>


</template>

<script>
    import './confrim.less';
    export default {
        name: 'confrim',
        props: ['title', 'content', 'okText', 'cancelText'],
        data(){
            return {
                visible: false

            }
        },
        methods: {
            btnAction(result){
                this.visible = false;
                this.callback(result)
            }
        }

    }
</script>
