<template>
    <div class="my-picker">
        <div class="shadow-warp"></div>
        <div class="picker-warp">
            <div class="picker-header" flex="main:justify">
                <span flex="0">取消</span>
                <span flex="1">{{pickerTitle}}</span>
                <span flex="0">确定</span>
            </div>
            <mt-picker :slots="dataList" @change="onValuesChange" :valueKey="name"></mt-picker>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { Picker } from 'mint-ui';
    Vue.component(Picker.name, Picker);
    import 'my-picker.less';
    export default {
        name: 'my-picker',
        props:['pickerTitle','dataList'],
        data(){
            return {
            }
        },
        created(){
        },
        computed: {
        },
        methods: {
            onValuesChange(){

            }
        },
        destroyed(){

        }
    }
</script>
