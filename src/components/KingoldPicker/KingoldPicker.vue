<template>
    <div class="kingold-picker">
        <div class="shadow-warp"></div>
        <transition name="slide">
            <div class="picker-warp" v-show="visible">
                <div class="picker-header" flex="main:justify">
                    <span flex="0" @click.stop="cancel">取消</span>
                    <span flex="1" class="ellipsis">{{title}}</span>
                    <span flex="0" class="positive" @click.stop="ensure">确定</span>
                </div>
                <mt-picker :slots="array"
                           @change="onValuesChange" valueKey="name"></mt-picker>
            </div>
        </transition>


    </div>
</template>

<script>
    import Vue from 'vue';
    import {Picker} from 'mint-ui';
    Vue.component(Picker.name, Picker);
    import './kingold-picker.less';
    export default {
        name: 'kingold-picker',
        props: ['title', 'list','default-index','visible'],
        data(){
            return {
                result: {}
            }
        },
        created(){
        },
        computed: {
            array(){
                return [{
                    textAlign: 'center',
                    values: this.list,
                    defaultIndex:this.defaultIndex
                }]
            }
        },
        methods: {
            onValuesChange(picker, values){
                this.result = values[0];
            },
            cancel(){
                this.$emit('back', 0)
            },
            ensure(){
                this.$emit('back', this.result);
            }
        },
        destroyed(){

        }
    }
</script>
