webpackJsonp([40],{108:function(t,e,o){var i=o(110);"string"==typeof i&&(i=[[t.i,i,""]]);var n={};n.transform=void 0;o(13)(i,n);i.locals&&(t.exports=i.locals)},109:function(t,e,o){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,i){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=242)}({0:function(t,e){t.exports=function(t,e,o,n,r){var a,s=t=t||{},c=i(t.default);"object"!==c&&"function"!==c||(a=t,s=t.default);var l="function"==typeof s?s.options:s;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),n&&(l._scopeId=n);var u;if(r?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=u):o&&(u=o),u){var m=l.functional,d=m?l.render:l.beforeCreate;m?l.render=function(t,e){return u.call(e),d(t,e)}:l.beforeCreate=d?[].concat(d,u):[u]}return{esModule:a,exports:s,options:l}}},1:function(t,e){t.exports=o(2)},101:function(t,e){},164:function(t,e,o){function i(t){o(101)}var n=o(0)(o(86),o(170),i,null,null);t.exports=n.exports},170:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"mint-toast-pop"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"mint-toast",class:t.customClass,style:{padding:""===t.iconClass?"10px":"20px"}},[""!==t.iconClass?o("i",{staticClass:"mint-toast-icon",class:t.iconClass}):t._e(),t._v(" "),o("span",{staticClass:"mint-toast-text",style:{"padding-top":""===t.iconClass?"0":"10px"}},[t._v(t._s(t.message))])])])},staticRenderFns:[]}},242:function(t,e,o){t.exports=o(50)},50:function(t,e,o){"use strict";var i=o(94);Object.defineProperty(e,"__esModule",{value:!0}),o.d(e,"default",function(){return i.a})},86:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var t=[];switch(this.position){case"top":t.push("is-placetop");break;case"bottom":t.push("is-placebottom");break;default:t.push("is-placemiddle")}return t.push(this.className),t.join(" ")}}}},94:function(t,e,o){"use strict";var i=o(1),n=o.n(i),r=n.a.extend(o(164)),a=[],s=function(){if(a.length>0){var t=a[0];return a.splice(0,1),t}return new r({el:document.createElement("div")})},c=function(t){t&&a.push(t)},l=function(t){t.target.parentNode&&t.target.parentNode.removeChild(t.target)};r.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",l),this.closed=!0,c(this)};var u=function(t){void 0===t&&(t={});var e=t.duration||3e3,o=s();return o.closed=!1,clearTimeout(o.timer),o.message="string"==typeof t?t:t.message,o.position=t.position||"middle",o.className=t.className||"",o.iconClass=t.iconClass||"",document.body.appendChild(o.$el),n.a.nextTick(function(){o.visible=!0,o.$el.removeEventListener("transitionend",l),~e&&(o.timer=setTimeout(function(){o.closed||o.close()},e))}),o};e.a=u}})},110:function(t,e,o){e=t.exports=o(12)(void 0),e.push([t.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},252:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(108),n=(o.n(i),o(109)),r=o.n(n),a=o(253),s=(o.n(a),o(14)),c=0;e.default={name:"make-appointment",data:function(){return{customerName:"",customerIdCardNo:"",customerMobile:"",customerRegionCode:"",reservationAmount:"",verifyCode:"",state:"",province:"",areas:"",cityList:"",city:"",countryList:"",country:"",zone:"",verifyTimeLeft:"",verifyText:"获取验证码",imageCode:"",inputCode:"",productUuid:"",provinceList:""}},created:function(){var t=this;this.productUuid=this.$route.query.productUuid,s.a.getNode("/assets/getArea").then(function(e){t.provinceList=e.data})},computed:{},methods:{stateChange:function(){this.province=this.state.state,this.cityList=this.state.cities},areasChange:function(){this.city=this.areas.city,this.countryList=this.areas.areas},areaChange:function(){this.customerRegionCode=this.zone.code,this.country=this.zone.area},getVerify:function(){var t=this;if(!this.checkPhone())return!1;if(this.imageCode&&!this.inputCode)return r()("请输入图形验证码"),!1;var e=this.customerMobile,o=this.inputCode;this.verifyTimeLeft=59,c=59,this.timeCount(),this.verifyText="重新发送",s.a.get("/sendVerifyCode",{investorMobile:e,imageCode:o,bussType:3}).then(function(e){return 200!=e.code&&(t.clearTimeCount(),1001==e.code?(r()("验证码错发送失败!"),!1):1004==e.code?(t.imageCode?(r()("图片验证码错误!"),t.imageCode=e.data.imageCode):(r()("请输入图形验证码"),t.imageCode=e.data.imageCode),!1):void r()(e.msg))})},clearTimeCount:function(){this.verifyTimeLeft=0,this.timer&&clearTimeout(this.timer)},timeCount:function(){var t=this;this.timer=setTimeout(function(){c--,t.$refs.timeLeft.innerHTML=c,c>=1?t.timeCount():t.$nextTick(function(){t.verifyTimeLeft=0})},1e3)},checkPhone:function(){var t=/^1[35678]\d{9}$/;return this.customerMobile?!!t.test(this.customerMobile)||(r()("请输入正确的手机号！"),!1):(r()("请输入手机号！"),!1)},checkInputs:function(){var t=/^([\u4e00-\u9fa5]){1,5}$/;if(!this.customerName)return r()("请输入姓名！"),!1;if(!t.test(this.customerName))return r()("请输入正确的姓名！"),!1;var e=/^(^[1-9]\d{7}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9]|[1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;return this.customerIdCardNo?e.test(this.customerIdCardNo)?this.reservationAmount?isNaN(this.reservationAmount)||this.reservationAmount<=0?(r()("请输入正确的金额数字！"),!1):this.province&&this.city&&this.country?!!this.verifyCode||(r()("请输入短信验证码！"),!1):(r()("请输入地址！"),!1):(r()("请输入预约金额！"),!1):(r()("请输入正确的身份证号！"),!1):(r()("请输入身份证号！"),!1)},appointHandle:function(){var t=this;if(this.checkInputs()&&this.checkPhone()){var e=this.productUuid,o=this.customerName,i=this.customerMobile,n=this.verifyCode,a=this.customerIdCardNo,c=this.customerRegionCode;s.a.post("/product/reserve",{productUuid:e,customerName:o,customerMobile:i,customerIdCardNo:a,customerAddress:this.province+this.city+this.country,customerRegionCode:c,verifyCode:n,bussType:3,reservationAmount:1e4*this.reservationAmount}).then(function(e){var o=["_trackEvent","添加预约客户","CLICK","私募产品确认预约信息页面点击确认预约","私募产品确认预约"];window._hmt.push(o),200==e.code?t.$router.push("/appoint-succ"):r()(e.msg)})}}},destroyed:function(){}}},253:function(t,e,o){var i=o(254);"string"==typeof i&&(i=[[t.i,i,""]]);var n={};n.transform=void 0;o(13)(i,n);i.locals&&(t.exports=i.locals)},254:function(t,e,o){e=t.exports=o(12)(void 0),e.push([t.i,".make-appointment{background-color:#fff;width:100%;height:100%;padding:0 1.5rem}.make-appointment .form{position:relative;padding-top:1rem}.make-appointment .form .form-item{position:relative;line-height:1.1rem;margin-top:1rem}.make-appointment .form .form-item .label{width:4.8rem;margin-right:.5rem;font-size:.8rem;color:#666}.make-appointment .form .form-item .input{background:transparent;font-size:.7rem;border-bottom:1px solid #d8d8d8;padding-left:.5rem}.make-appointment .form .form-item .btn-code{width:4.6rem;margin-left:.5rem;background:#b7b7b7;color:#fff;height:1.5rem}.make-appointment .form .form-item .btn-default{background:#1d72c0}.make-appointment .form .location{font-size:.8rem}.make-appointment .form .location span{text-align:center}.make-appointment .form .location select{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:4px;background:url("+o(255)+") no-repeat scroll 100% transparent;background-size:.5rem;height:1.25rem}.make-appointment .bottom{margin-top:2.75rem}.make-appointment .bottom .btn{background:#1d72c0;box-shadow:0 1px 6px 0 #61b3ff;border-radius:3px;color:#fff;padding:.6rem 6rem;font-size:.8rem;line-height:.8rem;margin:0 auto}",""])},255:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAAAXNSR0IArs4c6QAAAfdJREFUSA3VVT1rwlAUzYe6WVexe7ZOigidu7RLf0I3xbSULkIHQXApDpVa/Bq79Q/Uobsg6lDo5tRJFNpB7BSD6bnh5fESE9MKhfbB492ce+7hvpt7E0n6dyufzx/TDktc2UaoVCoxy7LqtMnext0qNJ1OLxGs0WZ2oJYc5CkWi0nTNCfwxxlnGYlEtFarNfOLCcwIIjeCCMXGGeanI/lmVCgUsuv1eoAIr99SFCXX6XSGXrWNjFBYGfveR4RibR9xvEKqF5jP52cg6l5ceN7v9Xpv4/H4RcDcqZdKpfhisZhAKCmSvLYsy7NEIqHVarWl43NdDSLlMBEKJA5xHRE6+V11XddWq9UrsK2NJwQb0Wj0oNlsUotIPCO82voPRCg2xmLI/oOL1wgT/oQihk65eAe8vV632z0hjNcIc3SFZ0MkhtgGi7FpvCFHo9FHJpPZA3oYImC7kc1tu91+dLg8IwLQZFVqNscZdLKGrIp+nhGB/X7fSKfT7zBPRZKPfd5oNFyDy4vtkFFwGdM/wJl1MPFENkNMfw6nJeKuq5GDCNgXMF1EFmT7vCLk2xAikL43ID+QLS7C/L5FxPEVIoeqqtc4+HSTzTBybyxXsUUv2uEThTeBHTG8jGyeRY5oB2ZEpFQqdYeDpnvCbIJ3W9/9Qe6m/ptRX3MgtfB8MzmDAAAAAElFTkSuQmCC"},256:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"make-appointment"},[o("div",{staticClass:"form"},[o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"name","flex-box":"0"}},[t._v("客户姓名")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.customerName,expression:"customerName",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text",name:"name",id:"name","flex-box":"1",autocomplete:"off",placeholder:"请输入姓名"},domProps:{value:t.customerName},on:{input:function(e){e.target.composing||(t.customerName=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"idcard","flex-box":"0"}},[t._v("客户身份证号")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.customerIdCardNo,expression:"customerIdCardNo",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"tel",name:"idcard",id:"idcard","flex-box":"1",autocomplete:"off",placeholder:"请输入身份证号"},domProps:{value:t.customerIdCardNo},on:{input:function(e){e.target.composing||(t.customerIdCardNo=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"phone","flex-box":"0"}},[t._v("客户手机号")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.customerMobile,expression:"customerMobile",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"tel",name:"phone",id:"phone","flex-box":"1",autocomplete:"off",placeholder:"请输入手机号"},domProps:{value:t.customerMobile},on:{input:function(e){e.target.composing||(t.customerMobile=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t.imageCode?o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"imageCode","flex-box":"0"}},[t._v("校验码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.inputCode,expression:"inputCode"}],staticClass:"input",attrs:{type:"text",name:"imageCode",id:"imageCode","flex-box":"1",autocomplete:"off",placeholder:"请输入校验码"},domProps:{value:t.inputCode},on:{input:function(e){e.target.composing||(t.inputCode=e.target.value)}}}),t._v(" "),o("button",{staticClass:"btn-default btn-code",attrs:{"flex-box":"0"}},[t._v(t._s(t.imageCode))])]):t._e(),t._v(" "),o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"yzm","flex-box":"0"}},[t._v("短信验证码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.verifyCode,expression:"verifyCode",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"tel",name:"yzm",id:"yzm","flex-box":"1",autocomplete:"off",placeholder:"请输入验证码"},domProps:{value:t.verifyCode},on:{input:function(e){e.target.composing||(t.verifyCode=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t.verifyTimeLeft<=1?o("button",{staticClass:"btn-default btn-code",attrs:{"flex-box":"0"},on:{click:function(e){e.stopPropagation(),t.getVerify(e)}}},[t._v(t._s(t.verifyText)+"\n            ")]):o("button",{staticClass:"btn-code",attrs:{"flex-box":"0"}},[o("span",{ref:"timeLeft"},[t._v(" 59")])])]),t._v(" "),o("div",{staticClass:"form-item",attrs:{flex:""}},[o("label",{staticClass:"label",attrs:{for:"appoint-num","flex-box":"0"}},[t._v("预约金额")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.reservationAmount,expression:"reservationAmount",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"tel",name:"appoint-num",id:"appoint-num","flex-box":"1",autocomplete:"off",placeholder:"请输入预约金额"},domProps:{value:t.reservationAmount},on:{input:function(e){e.target.composing||(t.reservationAmount=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),o("span",{attrs:{"flex-box":"0"}},[t._v("万元")])]),t._v(" "),o("div",{staticClass:"form-item location",attrs:{flex:"box:mean cross:bottom"}},[o("div",[t._v("地址")]),t._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.state,expression:"state"}],attrs:{name:"location",id:"province"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.state=e.target.multiple?o:o[0]},t.stateChange]}},t._l(t.provinceList,function(e,i){return o("option",{key:e.code,domProps:{value:e}},[t._v(t._s(e.state))])})),t._v(" "),o("span",[t._v("省")]),t._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.areas,expression:"areas"}],attrs:{name:"location",id:"city"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.areas=e.target.multiple?o:o[0]},t.areasChange]}},t._l(t.cityList,function(e,i){return o("option",{key:e.code,domProps:{value:e}},[t._v(t._s(e.city))])})),t._v(" "),o("span",[t._v("市")]),t._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.zone,expression:"zone"}],attrs:{name:"location",id:"country"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.zone=e.target.multiple?o:o[0]},function(e){t.areaChange()}]}},t._l(t.countryList,function(e,i){return o("option",{key:e.code,domProps:{value:e}},[t._v(t._s(e.area))])})),t._v(" "),o("span",[t._v("区")])])]),t._v(" "),o("div",{staticClass:"bottom"},[o("button",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),t.appointHandle(e)}}},[t._v("确认预约")])])])},staticRenderFns:[]}},61:function(t,e,o){var i=o(25)(o(252),o(256),null,null);t.exports=i.exports}});