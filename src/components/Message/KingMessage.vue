<template>
    <div class="msg-box">
        <div class="msg-wrapper" @click.stop="wrapClose"></div>
        <div class="modal-body" >
            <div class="msg-header">
                {{options.title||'提示'}}
            </div>
            <div class="msg-body" v-html="options.msg"></div>
            <div class="msg-btns" flex="box:mean">
                <button class="btn-confirm" @click="okAction" flex-box="1">
                    {{options.confirmText||'确认'}}
                </button>
                <button flex-box="1" class="close" @click="cancelAction" v-if="options.showCancelButton" :class="{'disabled':timer}">
                    {{options.closeText||'取消'}}
                    <span v-if="timer">（{{timer}}）</span>
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    import './message.less';
    export default {
        name: 'message',
        props: ['options'],
        data(){
            return{
                timer: 3,
                close: false
            }
        },
        created(){
          this.timer = this.options.countDown;
          if(this.timer){
              this.countDownFn();
          }
        },
        methods: {
            okAction(result) {
                this.closeFn();
                this.$emit('confirmBack', result)
            },
            cancelAction(){
                if(this.timer){
                    return;
                }
                this.closeFn();
                this.$emit('cancelBack');
            },
            wrapClose(){
                this.closeFn();
                this.$emit('confirmBack','close');
            },
            closeFn(){
                this.close = true;
            },
            countDownFn(){
                let timeout;
                timeout = setInterval(()=>{
                    if(this.timer > 0){
                        this.timer--;
                        if(this.timer == 0){
                            clearTimeout(timeout);
                        }
                    }
                },1000);
            }
        }

    }
</script>
