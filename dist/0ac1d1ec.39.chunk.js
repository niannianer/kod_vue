webpackJsonp([39],{100:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(344),o=i(347),r=i(34),a=r(n.a,o.a,null,null,null);e.default=a.exports},140:function(t,e,i){var n=i(141);"string"==typeof n&&(n=[[t.i,n,""]]);var o={};o.transform=void 0;i(14)(n,o);n.locals&&(t.exports=n.locals)},141:function(t,e,i){e=t.exports=i(13)(void 0),e.push([t.i,"",""])},142:function(t,e,i){t.exports=function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=222)}({1:function(t,e){t.exports=i(3)},222:function(t,e,i){t.exports=i(30)},30:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(5),o=(i.n(n),i(88));i.d(e,"default",function(){return o.a})},5:function(t,e){},87:function(t,e,i){"use strict";var n=i(1),o=i.n(n),r="@@InfiniteScroll",a=function(t,e){var i,n,o,r,a,s=function(){t.apply(r,a),n=i};return function(){if(r=this,a=arguments,i=Date.now(),o&&(clearTimeout(o),o=null),n){var t=e-(i-n);t<0?s():o=setTimeout(function(){s()},t)}else s()}},s=function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},l=o.a.prototype.$isServer?{}:document.defaultView.getComputedStyle,c=function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var i=l(e).overflowY;if("scroll"===i||"auto"===i)return e;e=e.parentNode}return window},d=function(t){return t===window?document.documentElement.clientHeight:t.clientHeight},u=function(t){return t===window?s(window):t.getBoundingClientRect().top+s(window)},p=function(t){for(var e=t.parentNode;e;){if("HTML"===e.tagName)return!0;if(11===e.nodeType)return!1;e=e.parentNode}return!1},f=function(){if(!this.binded){this.binded=!0;var t=this,e=t.el;t.scrollEventTarget=c(e),t.scrollListener=a(m.bind(t),200),t.scrollEventTarget.addEventListener("scroll",t.scrollListener);var i=e.getAttribute("infinite-scroll-disabled"),n=!1;i&&(this.vm.$watch(i,function(e){t.disabled=e,!e&&t.immediateCheck&&m.call(t)}),n=Boolean(t.vm[i])),t.disabled=n;var o=e.getAttribute("infinite-scroll-distance"),r=0;o&&(r=Number(t.vm[o]||o),isNaN(r)&&(r=0)),t.distance=r;var s=e.getAttribute("infinite-scroll-immediate-check"),l=!0;s&&(l=Boolean(t.vm[s])),t.immediateCheck=l,l&&m.call(t);var d=e.getAttribute("infinite-scroll-listen-for-event");d&&t.vm.$on(d,function(){m.call(t)})}},m=function(t){var e=this.scrollEventTarget,i=this.el,n=this.distance;if(!0===t||!this.disabled){var o=s(e),r=o+d(e),a=!1;if(e===i)a=e.scrollHeight-r<=n;else{a=r+n>=u(i)-u(e)+i.offsetHeight+o}a&&this.expression&&this.expression()}};e.a={bind:function(t,e,i){t[r]={el:t,vm:i.context,expression:e.value};var n=arguments,o=function(){t[r].vm.$nextTick(function(){p(t)&&f.call(t[r],n),t[r].bindTryCount=0;!function e(){t[r].bindTryCount>10||(t[r].bindTryCount++,p(t)?f.call(t[r],n):setTimeout(e,50))}()})};if(t[r].vm._isMounted)return void o();t[r].vm.$on("hook:mounted",o)},unbind:function(t){t[r]&&t[r].scrollEventTarget&&t[r].scrollEventTarget.removeEventListener("scroll",t[r].scrollListener)}}},88:function(t,e,i){"use strict";var n=i(87),o=i(5),r=(i.n(o),i(1)),a=i.n(r),s=function(t){t.directive("InfiniteScroll",n.a)};!a.a.prototype.$isServer&&window.Vue&&(window.infiniteScroll=n.a,a.a.use(s)),n.a.install=s,e.a=n.a}})},147:function(t,e,i){var n=i(148);"string"==typeof n&&(n=[[t.i,n,""]]);var o={};o.transform=void 0;i(14)(n,o);n.locals&&(t.exports=n.locals)},148:function(t,e,i){e=t.exports=i(13)(void 0),e.push([t.i,'.mint-spinner-fading-circle{position:relative}.mint-spinner-fading-circle-circle{width:100%;height:100%;top:0;left:0;position:absolute}.mint-spinner-fading-circle-circle:before{content:" ";display:block;margin:0 auto;width:15%;height:15%;border-radius:100%;-webkit-animation:mint-fading-circle 1.2s infinite ease-in-out both;animation:mint-fading-circle 1.2s infinite ease-in-out both}.mint-spinner-fading-circle-circle.is-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.mint-spinner-fading-circle-circle.is-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.mint-spinner-fading-circle-circle.is-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.mint-spinner-fading-circle-circle.is-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.mint-spinner-fading-circle-circle.is-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.mint-spinner-fading-circle-circle.is-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.mint-spinner-fading-circle-circle.is-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.mint-spinner-fading-circle-circle.is-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.mint-spinner-fading-circle-circle.is-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.mint-spinner-fading-circle-circle.is-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.mint-spinner-fading-circle-circle.is-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.mint-spinner-fading-circle-circle.is-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.mint-spinner-fading-circle-circle.is-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.mint-spinner-fading-circle-circle.is-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.mint-spinner-fading-circle-circle.is-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.mint-spinner-fading-circle-circle.is-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.mint-spinner-fading-circle-circle.is-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.mint-spinner-fading-circle-circle.is-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.mint-spinner-fading-circle-circle.is-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.mint-spinner-fading-circle-circle.is-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.mint-spinner-fading-circle-circle.is-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.mint-spinner-fading-circle-circle.is-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes mint-fading-circle{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes mint-fading-circle{0%,39%,to{opacity:0}40%{opacity:1}}.mint-loadmore{overflow:hidden}.mint-loadmore-content.is-dropped{-webkit-transition:.2s;transition:.2s}.mint-loadmore-bottom,.mint-loadmore-top{text-align:center;height:50px;line-height:50px}.mint-loadmore-top{margin-top:-50px}.mint-loadmore-bottom{margin-bottom:-50px}.mint-loadmore-spinner{display:inline-block;margin-right:5px;vertical-align:middle}.mint-loadmore-text{vertical-align:middle}',""])},149:function(t,e){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=224)}({0:function(t,e){t.exports=function(t,e,n,o,r){var a,s=t=t||{},l=i(t.default);"object"!==l&&"function"!==l||(a=t,s=t.default);var c="function"==typeof s?s.options:s;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),o&&(c._scopeId=o);var d;if(r?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=d):n&&(d=n),d){var u=c.functional,p=u?c.render:c.beforeCreate;u?c.render=function(t,e){return d.call(e),p(t,e)}:c.beforeCreate=p?[].concat(p,d):[d]}return{esModule:a,exports:s,options:c}}},10:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{spinnerColor:function(){return this.color||this.$parent.color||"#ccc"},spinnerSize:function(){return(this.size||this.$parent.size||28)+"px"}},props:{size:Number,color:String}}},11:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(6),o=i.n(n);e.default={name:"fading-circle",mixins:[o.a],created:function(){if(!this.$isServer){this.styleNode=document.createElement("style");var t=".circle-color-"+this._uid+" > div::before { background-color: "+this.spinnerColor+"; }";this.styleNode.type="text/css",this.styleNode.rel="stylesheet",this.styleNode.title="fading circle style",document.getElementsByTagName("head")[0].appendChild(this.styleNode),this.styleNode.appendChild(document.createTextNode(t))}},destroyed:function(){this.styleNode&&this.styleNode.parentNode.removeChild(this.styleNode)}}},124:function(t,e){},14:function(t,e){},142:function(t,e,i){function n(t){i(124)}var o=i(0)(i(64),i(194),n,null,null);t.exports=o.exports},15:function(t,e,i){function n(t){i(14)}var o=i(0)(i(11),i(16),n,null,null);t.exports=o.exports},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:["mint-spinner-fading-circle circle-color-"+t._uid],style:{width:t.spinnerSize,height:t.spinnerSize}},t._l(12,function(t){return i("div",{staticClass:"mint-spinner-fading-circle-circle",class:["is-circle"+(t+1)]})}))},staticRenderFns:[]}},194:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mint-loadmore"},[i("div",{staticClass:"mint-loadmore-content",class:{"is-dropped":t.topDropped||t.bottomDropped},style:{transform:"translate3d(0, "+t.translate+"px, 0)"}},[t._t("top",[t.topMethod?i("div",{staticClass:"mint-loadmore-top"},["loading"===t.topStatus?i("spinner",{staticClass:"mint-loadmore-spinner",attrs:{size:20,type:"fading-circle"}}):t._e(),t._v(" "),i("span",{staticClass:"mint-loadmore-text"},[t._v(t._s(t.topText))])],1):t._e()]),t._v(" "),t._t("default"),t._v(" "),t._t("bottom",[t.bottomMethod?i("div",{staticClass:"mint-loadmore-bottom"},["loading"===t.bottomStatus?i("spinner",{staticClass:"mint-loadmore-spinner",attrs:{size:20,type:"fading-circle"}}):t._e(),t._v(" "),i("span",{staticClass:"mint-loadmore-text"},[t._v(t._s(t.bottomText))])],1):t._e()])],2)])},staticRenderFns:[]}},224:function(t,e,i){t.exports=i(32)},32:function(t,e,i){"use strict";var n=i(142),o=i.n(n);Object.defineProperty(e,"__esModule",{value:!0}),i.d(e,"default",function(){return o.a})},6:function(t,e,i){var n=i(0)(i(10),null,null,null,null);t.exports=n.exports},64:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(15),o=i.n(n);e.default={name:"mt-loadmore",components:{spinner:o.a},props:{maxDistance:{type:Number,default:0},autoFill:{type:Boolean,default:!0},distanceIndex:{type:Number,default:2},topPullText:{type:String,default:"下拉刷新"},topDropText:{type:String,default:"释放更新"},topLoadingText:{type:String,default:"加载中..."},topDistance:{type:Number,default:70},topMethod:{type:Function},bottomPullText:{type:String,default:"上拉刷新"},bottomDropText:{type:String,default:"释放更新"},bottomLoadingText:{type:String,default:"加载中..."},bottomDistance:{type:Number,default:70},bottomMethod:{type:Function},bottomAllLoaded:{type:Boolean,default:!1}},data:function(){return{translate:0,scrollEventTarget:null,containerFilled:!1,topText:"",topDropped:!1,bottomText:"",bottomDropped:!1,bottomReached:!1,direction:"",startY:0,startScrollTop:0,currentY:0,topStatus:"",bottomStatus:""}},watch:{topStatus:function(t){switch(this.$emit("top-status-change",t),t){case"pull":this.topText=this.topPullText;break;case"drop":this.topText=this.topDropText;break;case"loading":this.topText=this.topLoadingText}},bottomStatus:function(t){switch(this.$emit("bottom-status-change",t),t){case"pull":this.bottomText=this.bottomPullText;break;case"drop":this.bottomText=this.bottomDropText;break;case"loading":this.bottomText=this.bottomLoadingText}}},methods:{onTopLoaded:function(){var t=this;this.translate=0,setTimeout(function(){t.topStatus="pull"},200)},onBottomLoaded:function(){var t=this;this.bottomStatus="pull",this.bottomDropped=!1,this.$nextTick(function(){t.scrollEventTarget===window?document.body.scrollTop+=50:t.scrollEventTarget.scrollTop+=50,t.translate=0}),this.bottomAllLoaded||this.containerFilled||this.fillContainer()},getScrollEventTarget:function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var i=document.defaultView.getComputedStyle(e).overflowY;if("scroll"===i||"auto"===i)return e;e=e.parentNode}return window},getScrollTop:function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},bindTouchEvents:function(){this.$el.addEventListener("touchstart",this.handleTouchStart),this.$el.addEventListener("touchmove",this.handleTouchMove),this.$el.addEventListener("touchend",this.handleTouchEnd)},init:function(){this.topStatus="pull",this.bottomStatus="pull",this.topText=this.topPullText,this.scrollEventTarget=this.getScrollEventTarget(this.$el),"function"==typeof this.bottomMethod&&(this.fillContainer(),this.bindTouchEvents()),"function"==typeof this.topMethod&&this.bindTouchEvents()},fillContainer:function(){var t=this;this.autoFill&&this.$nextTick(function(){t.scrollEventTarget===window?t.containerFilled=t.$el.getBoundingClientRect().bottom>=document.documentElement.getBoundingClientRect().bottom:t.containerFilled=t.$el.getBoundingClientRect().bottom>=t.scrollEventTarget.getBoundingClientRect().bottom,t.containerFilled||(t.bottomStatus="loading",t.bottomMethod())})},checkBottomReached:function(){return this.scrollEventTarget===window?document.body.scrollTop+document.documentElement.clientHeight>=document.body.scrollHeight:this.$el.getBoundingClientRect().bottom<=this.scrollEventTarget.getBoundingClientRect().bottom+1},handleTouchStart:function(t){this.startY=t.touches[0].clientY,this.startScrollTop=this.getScrollTop(this.scrollEventTarget),this.bottomReached=!1,"loading"!==this.topStatus&&(this.topStatus="pull",this.topDropped=!1),"loading"!==this.bottomStatus&&(this.bottomStatus="pull",this.bottomDropped=!1)},handleTouchMove:function(t){if(!(this.startY<this.$el.getBoundingClientRect().top&&this.startY>this.$el.getBoundingClientRect().bottom)){this.currentY=t.touches[0].clientY;var e=(this.currentY-this.startY)/this.distanceIndex;this.direction=e>0?"down":"up","function"==typeof this.topMethod&&"down"===this.direction&&0===this.getScrollTop(this.scrollEventTarget)&&"loading"!==this.topStatus&&(t.preventDefault(),t.stopPropagation(),this.maxDistance>0?this.translate=e<=this.maxDistance?e-this.startScrollTop:this.translate:this.translate=e-this.startScrollTop,this.translate<0&&(this.translate=0),this.topStatus=this.translate>=this.topDistance?"drop":"pull"),"up"===this.direction&&(this.bottomReached=this.bottomReached||this.checkBottomReached()),"function"==typeof this.bottomMethod&&"up"===this.direction&&this.bottomReached&&"loading"!==this.bottomStatus&&!this.bottomAllLoaded&&(t.preventDefault(),t.stopPropagation(),this.maxDistance>0?this.translate=Math.abs(e)<=this.maxDistance?this.getScrollTop(this.scrollEventTarget)-this.startScrollTop+e:this.translate:this.translate=this.getScrollTop(this.scrollEventTarget)-this.startScrollTop+e,this.translate>0&&(this.translate=0),this.bottomStatus=-this.translate>=this.bottomDistance?"drop":"pull"),this.$emit("translate-change",this.translate)}},handleTouchEnd:function(){"down"===this.direction&&0===this.getScrollTop(this.scrollEventTarget)&&this.translate>0&&(this.topDropped=!0,"drop"===this.topStatus?(this.translate="50",this.topStatus="loading",this.topMethod()):(this.translate="0",this.topStatus="pull")),"up"===this.direction&&this.bottomReached&&this.translate<0&&(this.bottomDropped=!0,this.bottomReached=!1,"drop"===this.bottomStatus?(this.translate="-50",this.bottomStatus="loading",this.bottomMethod()):(this.translate="0",this.bottomStatus="pull")),this.$emit("translate-change",this.translate),this.direction=""}},mounted:function(){this.init()}}}})},344:function(t,e,i){"use strict";var n=i(140),o=(i.n(n),i(142)),r=i.n(o),a=i(147),s=(i.n(a),i(149)),l=i.n(s),c=i(7),d=i(3),u=i.n(d),p=i(345),f=(i.n(p),i(15)),m=i(17);u.a.component(l.a.name,l.a),u.a.use(r.a),e.a={name:"reward",data:function(){return{lists:[],isActive:!0,tabMenu:"FIXI",autoFill:!1,currentPage:0,pageSize:10,loading:!0,titleRate:"(年化)",isApp:!1}},created:function(){this.loadData(),c.a.kingold&&(this.isApp=!0,Object(m.a)({tagname:"title",param:{backtype:0,backAndRefresh:1,title:"奖励细则",keyboard_mode:0}}))},methods:{loadTop:function(){var t=this;this.lists=[],this.currentPage=0,this.loadData().then(function(){t.$refs.loadmore.onTopLoaded()})},rewardTab:function(t){this.isActive="FIXI"==t,this.tabMenu=t,this.titleRate="FIXI"==this.tabMenu?"(年化)":"",this.lists=[],this.currentPage=0,this.loadData()},loadData:function(){var t=this;return f.a.get("/product/reward/list",{productType:this.tabMenu,startRow:this.currentPage*this.pageSize,pageSize:this.pageSize}).then(function(e){return 200==e.code&&(t.lists=t.lists.concat(e.data.rewardList),e.data.rewardList.length<t.pageSize?t.loading=!0:t.loading=!1),e})},loadMore:function(){this.loading=!0,this.currentPage++,this.loadData()}}}},345:function(t,e,i){var n=i(346);"string"==typeof n&&(n=[[t.i,n,""]]);var o={};o.transform=void 0;i(14)(n,o);n.locals&&(t.exports=n.locals)},346:function(t,e,i){e=t.exports=i(13)(void 0),e.push([t.i,".reward-detail{width:100%;height:100%}.reward-detail .bl{border-bottom:1px solid #d8d8d8}.reward-detail .header{font-size:.7rem;line-height:.7rem}.reward-detail .header ul{margin:.6rem auto}.reward-detail .header ul li{padding:.45rem 1.4rem;border:1px solid #1d72c0;color:#1d72c0}.reward-detail .header ul li.app{border:1px solid #6e3018;color:#6e3018}.reward-detail .header ul .left{border-radius:5px 0 0 5px}.reward-detail .header ul .right{border-radius:0 5px 5px 0}.reward-detail .header ul .active{background-color:#1d72c0;color:#fff}.reward-detail .header ul .active.app{background-color:#6e3018;color:#fff}.reward-detail .header .title{padding:.9rem 0;background-color:#fff;text-align:center}.reward-detail .body{position:absolute;top:5.5rem;bottom:0;width:100%}.reward-detail .body .item{padding:.45rem 0;background-color:#fff;text-align:center}.reward-detail .body .item .product-name{color:#1d72c0}.reward-detail .body .item .product-name.app{color:#6e3018}.reward-detail .body .item li{padding:.35rem 0}",""])},347:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"reward-detail"},[i("div",{staticClass:"header",attrs:{flex:"dir:top"}},[i("div",{staticClass:"tab bl",attrs:{"flex-box":"1",flex:""}},[i("ul",{attrs:{flex:""}},[i("li",{class:{left:!0,active:t.isActive,app:t.isApp},attrs:{"flex-box":"1"},on:{click:function(e){t.rewardTab("FIXI")}}},[t._v("\n                    定期理财\n                ")]),t._v(" "),i("li",{class:{right:!0,active:!t.isActive,app:t.isApp},attrs:{"flex-box":"1"},on:{click:function(e){t.rewardTab("PRIF")}}},[t._v("\n                    高端理财\n                ")])])]),t._v(" "),i("div",{staticClass:"title bl",attrs:{flex:"box:mean","flex-box":"0"}},[i("p",[t._v("产品名称")]),t._v(" "),i("p",[t._v("投资金额（元）")]),t._v(" "),i("p",[t._v("奖励比例"+t._s(this.titleRate))])])]),t._v(" "),i("div",{staticClass:"body"},[i("div",{staticStyle:{height:"100%",overflow:"auto"}},[i("mt-loadmore",{ref:"loadmore",attrs:{"top-method":t.loadTop,"auto-fill":t.autoFill}},[i("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},t._l(t.lists,function(e,n){return i("li",{key:n,staticClass:"item bl",attrs:{flex:"box:mean"}},[i("p",{staticClass:"product-name",class:{app:t.isApp},attrs:{flex:"dir:top main:center"}},[t._v(t._s(e.productAbbrName))]),t._v(" "),i("ul",{attrs:{flex:"dir:top main:center"}},t._l(e.productAward,function(e,n){return i("li",{key:n},[t._v("\n                                "+t._s(e.range)+"\n                            ")])})),t._v(" "),i("ul",{attrs:{flex:"dir:top main:center"}},t._l(e.productAward,function(e,n){return i("li",{key:n},[t._v("\n                                "+t._s(e.rate)+"\n                            ")])}))])}))])],1)])])},o=[],r={render:n,staticRenderFns:o};e.a=r}});