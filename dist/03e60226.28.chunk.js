webpackJsonp([28],{115:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAYAAAASYli2AAAAAXNSR0IArs4c6QAAArtJREFUSA2dlclrFEEUh9M9fQjEBVwiBplNEfGiuB70FEHE6MGDDKKgB42gYBT06MU/QEEvIh7ihgg6yQTBi4qCF0/iYcDLbF4nCAqS4GR6/F7TNdTUVCfdU1Cper/33pdXS9cMDWmtXq+P12q1g5qUeOqojEajcYh5ib7QbrdP5PP578qXZHQlWGCdTqfIdD19i+u6c5VKZZ/4kjaXJR4jadZxnFGVzDzteV4J6H6lxR0pxhXgBkvCWCqVKoVbYXHbJbfZbN5iuXdtbirdLFtBpYdtfpvWPRRO+DaAO7YgtHnAhWw2+zHC35W7QFFY3jUGqTYlttF+YRcymcx7Q+8xe4Di4ZDOU+lD+nBPJAZV/mY4Q6XvTJ+y+4DiYPmnGKaBrlGBagT6B/0slb5Vmj5agRLA8o+Q/JLkjXpCOP/r+/65XC43a/qCi22KYlPBB4An6T8t/hGu23P+6WnTFwmUQCr42mq1jgP9YSZij6A/Zc8Lui9yyXoQSVkqeo22V9dlDnSRbZlkRc/EXrZCCZBGpXUejAmSPwWC9gfYMPpjuR0ix6pQ5ZfL5VW0N9hHlaaNS4CnYlWokoCNkrRJ2cboUe1qzxAjTb7n7cBKJO2wBHGL/Jtszb1YS+Z67AQij+82C6yDdp1DuS++FYEhbI7YrZJgNB/7hoKJb1ngCrB2CHsgINUi97Bare4iqEjPq2BtFNgVKnukacHUCuRO7WbzZc/SZgL2Ev2qDSaxfUtWMICJYX1Anq09iDM2GFfmH/0yV2NaEqNad8ns2QFAMwSOmcEhbBLYE9Nn2sGXIjA+fnnbbLAWl/ZSHJjAnfBqfGbe91NKZYvoF3nyX0hwnOby3s0T+M0MFhj9QhKYMIJT5jtdy496kT0cF1HBWOYrsQdqPE3rOOUv9AWuTs8rPBBQkqg0DXBiYACJ/wHnjSUTP46QfwAAAABJRU5ErkJggg=="},222:function(t,e){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=236)}({0:function(t,e){t.exports=function(t,e,i,o,r){var a,s=t=t||{},c=n(t.default);"object"!==c&&"function"!==c||(a=t,s=t.default);var l="function"==typeof s?s.options:s;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),o&&(l._scopeId=o);var d;if(r?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=d):i&&(d=i),d){var u=l.functional,f=u?l.render:l.beforeCreate;u?l.render=function(t,e){return d.call(e),f(t,e)}:l.beforeCreate=f?[].concat(f,d):[d]}return{esModule:a,exports:s,options:l}}},157:function(t,e,n){var i=n(0)(n(79),n(181),null,null,null);t.exports=i.exports},181:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mint-swipe-item"},[t._t("default")],2)},staticRenderFns:[]}},236:function(t,e,n){t.exports=n(43)},43:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),o=(n.n(i),n(157)),r=n.n(o);n.d(e,"default",function(){return r.a})},5:function(t,e){},79:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mt-swipe-item",mounted:function(){this.$parent&&this.$parent.swipeItemCreated(this)},destroyed:function(){this.$parent&&this.$parent.swipeItemDestroyed(this)}}}})},223:function(t,e,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=235)}({0:function(t,e){t.exports=function(t,e,n,o,r){var a,s=t=t||{},c=i(t.default);"object"!==c&&"function"!==c||(a=t,s=t.default);var l="function"==typeof s?s.options:s;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),o&&(l._scopeId=o);var d;if(r?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=d):n&&(d=n),d){var u=l.functional,f=u?l.render:l.beforeCreate;u?l.render=function(t,e){return d.call(e),f(t,e)}:l.beforeCreate=f?[].concat(f,d):[d]}return{esModule:a,exports:s,options:l}}},1:function(t,e){t.exports=n(2)},158:function(t,e,n){function i(t){n(99)}var o=n(0)(n(80),n(168),i,null,null);t.exports=o.exports},168:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mint-swipe"},[n("div",{ref:"wrap",staticClass:"mint-swipe-items-wrap"},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showIndicators,expression:"showIndicators"}],staticClass:"mint-swipe-indicators"},t._l(t.pages,function(e,i){return n("div",{staticClass:"mint-swipe-indicator",class:{"is-active":i===t.index}})}))])},staticRenderFns:[]}},2:function(t,e,n){"use strict";function i(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function o(t,e){if(t){for(var n=t.className,o=(e||"").split(" "),r=0,a=o.length;r<a;r++){var s=o[r];s&&(t.classList?t.classList.add(s):i(t,s)||(n+=" "+s))}t.classList||(t.className=n)}}function r(t,e){if(t&&e){for(var n=e.split(" "),o=" "+t.className+" ",r=0,a=n.length;r<a;r++){var s=n[r];s&&(t.classList?t.classList.remove(s):i(t,s)&&(o=o.replace(" "+s+" "," ")))}t.classList||(t.className=l(o))}}var a=n(1),s=n.n(a);n.d(e,"c",function(){return f}),e.a=o,e.b=r;var c=s.a.prototype.$isServer,l=(c||Number(document.documentMode),function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),d=function(){return!c&&document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),u=function(){return!c&&document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),f=function(t,e,n){d(t,e,function i(){n&&n.apply(this,arguments),u(t,e,i)})}},235:function(t,e,n){t.exports=n(44)},44:function(t,e,n){"use strict";var i=n(158),o=n.n(i);Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"default",function(){return o.a})},80:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2);e.default={name:"mt-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1,isDone:!1}},props:{speed:{type:Number,default:300},defaultIndex:{type:Number,default:0},auto:{type:Number,default:3e3},continuous:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1},stopPropagation:{type:Boolean,default:!1}},watch:{index:function(t){this.$emit("change",t)}},methods:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},translate:function(t,e,o,r){var a=arguments,s=this;if(o){this.animating=!0,t.style.webkitTransition="-webkit-transform "+o+"ms ease-in-out",setTimeout(function(){t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var c=!1,l=function(){c||(c=!0,s.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",r&&r.apply(s,a))};n.i(i.c)(t,"webkitTransitionEnd",l),setTimeout(l,o+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[],o=Math.floor(this.defaultIndex),r=o>=0&&o<t.length?o:0;this.index=r,t.forEach(function(t,o){e.push(t.$el),n.i(i.b)(t.$el,"is-active"),o===r&&n.i(i.a)(t.$el,"is-active")}),this.pages=e},doAnimate:function(t,e){var o=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var r,a,s,c,l,d=this.speed||300,u=this.index,f=this.pages,p=f.length;e?(r=e.prevPage,s=e.currentPage,a=e.nextPage,c=e.pageWidth,l=e.offsetLeft):(c=this.$el.clientWidth,s=f[u],r=f[u-1],a=f[u+1],this.continuous&&f.length>1&&(r||(r=f[f.length-1]),a||(a=f[0])),r&&(r.style.display="block",this.translate(r,-c)),a&&(a.style.display="block",this.translate(a,c)));var h,m=this.$children[u].$el;"prev"===t?(u>0&&(h=u-1),this.continuous&&0===u&&(h=p-1)):"next"===t&&(u<p-1&&(h=u+1),this.continuous&&u===p-1&&(h=0));var g=function(){if(void 0!==h){var t=o.$children[h].$el;n.i(i.b)(m,"is-active"),n.i(i.a)(t,"is-active"),o.index=h}o.isDone&&o.end(),r&&(r.style.display=""),a&&(a.style.display="")};setTimeout(function(){"next"===t?(o.isDone=!0,o.before(s),o.translate(s,-c,d,g),a&&o.translate(a,0,d)):"prev"===t?(o.isDone=!0,o.before(s),o.translate(s,c,d,g),r&&o.translate(r,0,d)):(o.isDone=!1,o.translate(s,0,d,g),void 0!==l?(r&&l>0&&o.translate(r,-1*c,d),a&&l<0&&o.translate(a,c,d)):(r&&o.translate(r,-1*c,d),a&&o.translate(a,c,d)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},before:function(){this.$emit("before",this.index)},end:function(){this.$emit("end",this.index)},doOnTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,i=t.touches[0];n.startTime=new Date,n.startLeft=i.pageX,n.startTop=i.pageY,n.startTopAbsolute=i.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var o=this.$children[this.index-1],r=this.$children[this.index],a=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(o||(o=this.$children[this.$children.length-1]),a||(a=this.$children[0])),n.prevPage=o?o.$el:null,n.dragPage=r?r.$el:null,n.nextPage=a?a.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},doOnTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var i=e.currentLeft-e.startLeft,o=e.currentTopAbsolute-e.startTopAbsolute,r=Math.abs(i),a=Math.abs(o);if(r<5||r>=5&&a>=1.73*r)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),i=Math.min(Math.max(1-e.pageWidth,i),e.pageWidth-1);var s=i<0?"next":"prev";e.prevPage&&"prev"===s&&this.translate(e.prevPage,i-e.pageWidth),this.translate(e.dragPage,i),e.nextPage&&"next"===s&&this.translate(e.nextPage,i+e.pageWidth)}},doOnTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,i=t.currentLeft-t.startLeft,o=t.currentTop-t.startTop,r=t.pageWidth,a=this.index,s=this.pages.length;if(e<300){var c=Math.abs(i)<5&&Math.abs(o)<5;(isNaN(i)||isNaN(o))&&(c=!0),c&&this.$children[this.index].$emit("tap")}e<300&&void 0===t.currentLeft||((e<300||Math.abs(i)>r/2)&&(n=i<0?"next":"prev"),this.continuous||(0===a&&"prev"===n||a===s-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:i,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}},initTimer:function(){var t=this;this.auto>0&&(this.timer=setInterval(function(){if(!t.continuous&&t.index>=t.pages.length-1)return t.clearTimer();t.dragging||t.animating||t.next()},this.auto))},clearTimer:function(){clearInterval(this.timer),this.timer=null}},destroyed:function(){this.timer&&this.clearTimer(),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},mounted:function(){var t=this;this.ready=!0,this.initTimer(),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.stopPropagation&&e.stopPropagation(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.doOnTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&(t.timer&&t.clearTimer(),t.doOnTouchMove(e))}),e.addEventListener("touchend",function(e){if(t.userScrolling)return t.dragging=!1,void(t.dragState={});t.dragging&&(t.initTimer(),t.doOnTouchEnd(e),t.dragging=!1)})}}},99:function(t,e){}})},261:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(397),o=(n.n(i),n(222)),r=n.n(o),a=n(398),s=(n.n(a),n(223)),c=n.n(s),l=n(2),d=n.n(l),u=n(17),f=n(366),p=(n.n(f),n(9));d.a.component(c.a.name,c.a),d.a.component(r.a.name,r.a),e.default={name:"index",data:function(){return{recommend:{},bannerList:[],mode:!0,isLogin:!1}},components:{},created:function(){var t=this;u.a.get("/getAccountBaofoo").then(function(e){200==e.code&&(t.isLogin=!0)}),this.mode="true"==window.localStorage.getItem("mode-index"),u.a.get("/management/getAdvertList").then(function(e){200==e.code&&(t.bannerList=e.data.advertList)}),u.a.get("/product/recommend",{productType:"FIXI"}).then(function(e){200==e.code&&(t.recommend=e.data)})},computed:n.i(p.mapState)(["accountTotalAssets","accountTotalInterests"]),watch:{accountTotalAssets:function(){var t=this;this.accountTotalAssets?this.isLogin=!0:u.a.get("/getAccountBaofoo").then(function(e){200==e.code&&(t.isLogin=!0)})}},methods:{pathTo:function(t,e){if(e)return window.location.href=t,!1;"/login"==t&&window.sessionStorage.setItem("logoutUrl",encodeURIComponent(window.location.href)),"/relation"!=t&&"/reward"!=t||window.sessionStorage.setItem("logoutIndex",encodeURIComponent(window.location.origin+t)),this.$router.push(t)},switchMode:function(){this.mode=!this.mode,window.localStorage.setItem("mode-index",this.mode)}},destroyed:function(){}}},299:function(t,e,n){e=t.exports=n(51)(void 0),e.push([t.i,"",""])},300:function(t,e,n){e=t.exports=n(51)(void 0),e.push([t.i,".mint-swipe,.mint-swipe-items-wrap{overflow:hidden;position:relative;height:100%}.mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none}.mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}.mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}",""])},319:function(t,e,n){e=t.exports=n(51)(void 0),e.push([t.i,".index{width:100%;height:100%;overflow:auto}.index .header{position:relative;width:100%;height:7.4rem}.index .header img{height:100%}.index .header .login-btn{position:absolute;background:#1d72c0;color:#fff;right:.8rem;top:.8rem;padding:.2rem .8rem;border-radius:3px}.index .body .section{background:#fff;margin-top:.5rem;padding:.7rem .8rem}.index .body .section .title{font-size:.8rem;color:#333;font-weight:700}.index .body .section .arrow{width:.5rem;height:.8rem;margin-left:.3rem}.index .body .section .unlog{text-align:center;padding:1.2rem 0}.index .body .section .unlog a{color:#1d72c0;text-decoration:none}.index .body .section .person-info{text-align:center}.index .body .section .person-info .title{font-size:.8rem;color:#1d72c0;font-weight:400}.index .body .section .person-info .info{padding:.5rem 0;font-size:1rem;color:#ff6500}.index .body .section .item .pro-title{padding:.5rem 0;font-size:.8rem}.index .body .section .item .item-title{font-size:.6rem;margin-top:.3rem}.index .body .section .item .info{font-size:1.2rem;color:#ff6d00}.index .nav-center{margin-top:.5rem;text-align:center;background:#fff;padding:.7rem .8rem}.index .nav-center p{padding:.5rem 0}.index .download,.index .nav-center p{color:#1d72c0;border:1px solid #1d72c0}.index .download{padding:.2rem 0;text-align:center;border-radius:3px;width:4.5rem;margin:.4rem auto}",""])},366:function(t,e,n){var i=n(319);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;n(52)(i,o);i.locals&&(t.exports=i.locals)},397:function(t,e,n){var i=n(299);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;n(52)(i,o);i.locals&&(t.exports=i.locals)},398:function(t,e,n){var i=n(300);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;n(52)(i,o);i.locals&&(t.exports=i.locals)},451:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index",attrs:{flex:"dir:top"}},[i("div",{staticClass:"header",attrs:{"flex-box":"0"}},[i("mt-swipe",{attrs:{auto:4e3}},t._l(t.bannerList,function(e,n){return i("mt-swipe-item",{key:n},[i("img",{attrs:{src:e.advertImage,alt:"index-bg"},on:{click:function(n){n.stopPropagation(),t.pathTo(e.advertLink,!0)}}})])})),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"login-btn",on:{click:function(e){e.stopPropagation(),t.pathTo("/login")}}},[t._v("登录")])],1),t._v(" "),i("div",{staticClass:"body",attrs:{"flex-box":"0"}},[i("div",{staticClass:"section",on:{click:function(e){e.stopPropagation(),t.pathTo("/person-center")}}},[i("div",{attrs:{flex:"cross:center"}},[i("p",{staticClass:"title",attrs:{"flex-box":"1"}},[t._v("个人中心")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}],attrs:{"flex-box":"0"}},[i("p",{directives:[{name:"show",rawName:"v-show",value:t.mode,expression:"mode"}],on:{click:function(e){e.stopPropagation(),t.switchMode(e)}}},[t._v("隐藏金额")]),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:!t.mode,expression:"!mode"}],on:{click:function(e){e.stopPropagation(),t.switchMode(e)}}},[t._v("显示金额")])]),t._v(" "),i("img",{staticClass:"arrow",attrs:{src:n(115),alt:"","flex-box":"0"}})]),t._v(" "),t.isLogin?i("div",{staticClass:"person-info",attrs:{flex:"box:mean"}},[i("div",[t.mode?i("p",{staticClass:"info"},[t._v(t._s(t._f("currencyFormat")(t.accountTotalAssets))+"元")]):i("p",{staticClass:"info"},[t._v("****元")]),t._v(" "),i("p",{staticClass:"title"},[t._v("总资产")])]),t._v(" "),i("div",{staticStyle:{"border-left":"1px solid #D8D8D8"}},[t.mode?i("p",{staticClass:"info"},[t._v(t._s(t._f("currencyFormat")(t.accountTotalInterests))+"元")]):i("p",{staticClass:"info"},[t._v("****元")]),t._v(" "),i("p",{staticClass:"title"},[t._v("累计收益")])])]):i("div",{staticClass:"unlog"},[t._v("\n                请"),i("a",{attrs:{href:"/login"}},[t._v("登录")]),t._v("后查看\n            ")])]),t._v(" "),i("div",{staticClass:"section",on:{click:function(e){e.stopPropagation(),t.pathTo("/financial")}}},[t._m(0),t._v(" "),i("div",{staticClass:"item"},[i("p",{staticClass:"pro-title"},[t._v(t._s(t.recommend.productName))]),t._v(" "),i("div",{attrs:{flex:""}},[i("div",{attrs:{"flex-box":"1"}},[i("p",{staticClass:"info"},[t._v(t._s(t.recommend.annualInterestRate))]),t._v(" "),i("p",{staticClass:"item-title"},[t._v("预期年化收益率")])]),t._v(" "),i("div",{staticStyle:{"text-align":"center","padding-right":"3rem"},attrs:{"flex-box":"1"}},[i("p",{staticClass:"info"},[t._v(t._s(t.recommend.productPeriod))]),t._v(" "),i("p",{staticClass:"item-title"},[t._v("期限")])])])])])]),t._v(" "),i("div",{staticClass:"nav",attrs:{"flex-box":"0"}},[i("div",{staticClass:"nav-center"},[i("div",{attrs:{flex:"box:mean"}},[i("p",{on:{click:function(e){e.stopPropagation(),t.pathTo("/relation")}}},[t._v("我的好友")]),t._v(" "),i("p",{staticStyle:{"border-left":"none"},on:{click:function(e){e.stopPropagation(),t.pathTo("/reward")}}},[t._v("我的奖励")])]),t._v(" "),i("div",{attrs:{flex:"box:mean"}},[i("p",{staticStyle:{"border-top":"none"},on:{click:function(e){e.stopPropagation(),t.pathTo("/planning")}}},[t._v("理财规划")]),t._v(" "),i("p",{staticStyle:{"border-top":"none","border-left":"none"},on:{click:function(e){e.stopPropagation(),t.pathTo("/land-about-us.html",!0)}}},[t._v("关于我们")])])]),t._v(" "),i("div",{staticClass:"download",on:{click:function(e){e.stopPropagation(),t.pathTo("/land-download.html",!0)}}},[t._v("下载app")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{flex:"cross:center"}},[i("p",{staticClass:"title",attrs:{"flex-box":"1"}},[t._v("理财")]),t._v(" "),i("img",{staticClass:"arrow",attrs:{src:n(115),alt:"","flex-box":"0"}})])}]}},70:function(t,e,n){var i=n(28)(n(261),n(451),null,null);t.exports=i.exports}});