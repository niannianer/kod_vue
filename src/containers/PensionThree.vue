<template>
    <div v-cloak class="pension-three" flex-box="1" flex="dir:top" ref="body" >
        <div class="salary" flex-box="1" flex="dir:top">
            <div class="title" >请输入您的税后工资（月）</div>
            <div class="content" flex="main:left"><div class="num" ><input type="tel" v-model="wagesAfterTax" maxlength="6" ></div><span>元</span></div>
        </div>
        <div flex-box="0" class="check">
            <p >当前选择：
                <span>{{wagesAfterTax}}元</span>
            </p>
        </div>
        <div class="bottom" flex-box="0" flex="main:justify">
            <div class="left" flex-box="1" @click.stop="$router.back()" >上一步</div>
            <div class="left" flex-box="1" @click.stop="nextHandle">下一步</div>
        </div>
    </div>
</template>

<script>
    import '../less/pension-three.less';
    import {getValueD} from "../tools/city-grade"
    export default {
        name: 'pension-three',
        data(){
            return{
                wagesAfterTax:'',
                Height:''
            }
        },
        computed:{
            gender(){
                return window.sessionStorage.getItem('gender')==1?'女':'男';
            },
            age(){
                return window.sessionStorage.getItem('age');
            }
        },
        methods:{
            nextHandle(){
                window.sessionStorage.setItem('wagesAfterTax',this.wagesAfterTax);
                this.$router.push('/pension-four');
            },
            myKeyup(){

            }
        },
        created(){
            this.wagesAfterTax =getValueD(window.sessionStorage.getItem('cityName'));
            console.log(this.$refs.body.clientHeight());
            this.
            console.log(document.documentElement.clientHeight);
        }
    }
</script>
