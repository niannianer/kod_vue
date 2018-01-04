# 金疙瘩软件著作权代码

### 代码入口  
```javascript
 // main.js 
import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';
import FastClick from 'fastclick';
import _ from 'lodash/core';
import store from './store';
import 'flex.css/dist/flex.css';
import './less/base.less';
_.forEach(filters, (fun, key) => {
    Vue.filter(key, fun);
});
window.shareUrl = window.location.href;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
store.dispatch('getAccountBaofoo');
store.dispatch('getBankInfo');
store.dispatch('getPersonalCenterMsg').then((resp) => {
    if (resp.code == 200) {
        //做过风险评估，调用同步盈米风险评估数据
        if (resp.data.user.investorRiskScore != 0) {
            store.dispatch('getRiskInfo');
        }
    }
});
store.dispatch('getAccountInfo');
store.dispatch('getPaymentInfo');

import {postHive} from './tools/api';

window.onload = () => {
    FastClick.attach(document.body);
    setTimeout(() => {
        postHive();
    }, 5000);
};


```

### 根模板
```html
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
```
```javascript
  export default {
        name: 'app'
    }
```
### 公共样式
```less

//
// rem.less
// --------------------------------------------------

// Vertical screen

//375屏幕为 20px，以此为基础计算出每一种宽度的字体大小
//375以下不变，375以上等比放大
@charset "UTF-8";
@baseWidth: 375px;
@baseFont: 20px;

html {
    font-size: @baseFont; //默认当做375px宽度的屏幕来处理
}

@bps:320px, 360px, 375px, 400px, 414px, 480px ;

.loop(@i: 1) when (@i <= length(@bps)) { //注意less数组是从1开始的
    @bp: extract(@bps, @i);
    @font: @bp/@baseWidth*@baseFont;
    @media only screen and (min-width: @bp) {
        html {
            font-size: @font !important;
        }
    }
    .loop((@i + 1));
}

;
.loop;

```
```less
// 
//
// Variables.less
// --------------------------------------------------
// Type
// --------------------------------------------------
@charset "UTF-8";
@font-family-default: "Hiragino Sans GB", "Microsoft YaHei", sans-serif;;
@font-weight: 500;

// colors--------------------------------------------------
// 主色
@color-text: #333; //主标题
@color-text-secondary: #666; // 内容
@color-text-gray:#999; // 副标题
@color-split: #d8d8d8; //分割线的颜色
@color-interest:#ff6d00; // 利率 ，理财周期，
@color-progress:#ff6500;//融资进度
@color-active:#1D72C0; //选中状态

// 背景颜色
@bg-body: #f3f3f3; // body背景颜色
@bg-primary:#0F5391; //主背景颜色
@bg-content: #fff; //内容区背景颜色
@bg-hot:#fa3d1f; //热招
@bg-raise:#7ed321;//  募集
@bg-sell-out:#dcdcdc;// 售罄
// --------------------------------------------------
@bg-button: #1D72C0; //btn 背景
@show-button:#61B3FF;

@app-color:#6E3018;
@app-progress:#F6D791;
@app-bg-color: linear-gradient(-1deg, #7C4F2B 0%, #8F6441 24%, #D8BD7E 70%, #EECE83 100%);
@app-border-bottom:linear-gradient(270deg, #FBD8C5, #97461A, #9D4F25, #FBD8C5, #97461A) 0 0 2 0;
@app-context:#EDD7A8;
@app-ticket-context:#FF6A37;
@app-red:#F61C1C;
@app-contact-us:#88ACFF;
@border-default-width: 1px;
@border-default-color: @color-split;
@border-default: @border-default-width solid @border-default-color;
@border-radius: 0.3rem;


//现金券
@bg-cash:#FF6A37;
@bg-rate:#50E3C2;
@bg-disable:#999;


```
```less
// base.less

@charset "UTF-8";
@import "rem";
@import "variables";

* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
    vertical-align: baseline;
}

img {
    border: 0 none;
    vertical-align: top;
    display: inline-block;
    width: 100%;
    height: auto;
}

button {
    outline: none;
    text-decoration: none;
    text-align: center;
    display: block;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background: none;
    padding: 0 .5rem;
    margin: 0;
    white-space: nowrap;
    position: relative;
    text-overflow: ellipsis;
    font-size: .7rem;
    font-family: inherit;
    cursor: pointer;
    border: none;
}

input, textarea {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    outline: none;
    border: none;
    resize: none;
    -webkit-appearance: none;

}

a {
    text-decoration: none;
}

input::-webkit-input-placeholder {
    color: @color-text-gray !important;
}

body {
    font-family: @font-family-default;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    min-width: 320px;
    max-width: 640px;
    background: @bg-body;
    color: @color-text-secondary;
    font-size: .7rem;
    text-size-adjust: 100% !important
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
}

.btn-primary {
    background: @bg-button;
    border-radius: 4px;
    color: #fff;
    &:disabled {
        color: #aaa;
    }
}

.btn-default {
    background-color: @bg-body;
    border-radius: 4px;
}

.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

[v-cloak] {
    display: none;
}

[flex], [flex-box] {
    overflow: hidden;
}

.mint-indicator-wrapper {
    z-index: 10;
}

/*hidden the spm span */
#cnzz_stat_icon_1263441830 {
    visibility: hidden;
}

.mint-msgbox-message {
    font-size: .7rem;
    line-height: 1.4rem !important;
}

.mint-msgbox-confirm {
    font-size: .8rem;
}

.customer-service {
    width: 3rem;
    height: 3rem;
    background-image: url("../images/customer-service.png");
    background-size: 2rem 2rem;
    background-position: center;
    background-repeat: no-repeat;
}


```
