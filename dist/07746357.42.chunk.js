webpackJsonp([42],{121:function(t,e,n){var i=n(32)(n(484),n(487),null,null);t.exports=i.exports},131:function(t,e,n){var i=n(133);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;n(77)(i,o);i.locals&&(t.exports=i.locals)},132:function(t,e,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=242)}({0:function(t,e){t.exports=function(t,e,n,o,a){var r,s=t=t||{},c=i(t.default);"object"!==c&&"function"!==c||(r=t,s=t.default);var u="function"==typeof s?s.options:s;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns),o&&(u._scopeId=o);var d;if(a?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=d):n&&(d=n),d){var l=u.functional,p=l?u.render:u.beforeCreate;l?u.render=function(t,e){return d.call(e),p(t,e)}:u.beforeCreate=p?[].concat(p,d):[d]}return{esModule:r,exports:s,options:u}}},1:function(t,e){t.exports=n(3)},101:function(t,e){},164:function(t,e,n){function i(t){n(101)}var o=n(0)(n(86),n(170),i,null,null);t.exports=o.exports},170:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mint-toast-pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"mint-toast",class:t.customClass,style:{padding:""===t.iconClass?"10px":"20px"}},[""!==t.iconClass?n("i",{staticClass:"mint-toast-icon",class:t.iconClass}):t._e(),t._v(" "),n("span",{staticClass:"mint-toast-text",style:{"padding-top":""===t.iconClass?"0":"10px"}},[t._v(t._s(t.message))])])])},staticRenderFns:[]}},242:function(t,e,n){t.exports=n(50)},50:function(t,e,n){"use strict";var i=n(94);Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"default",function(){return i.a})},86:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var t=[];switch(this.position){case"top":t.push("is-placetop");break;case"bottom":t.push("is-placebottom");break;default:t.push("is-placemiddle")}return t.push(this.className),t.join(" ")}}}},94:function(t,e,n){"use strict";var i=n(1),o=n.n(i),a=o.a.extend(n(164)),r=[],s=function(){if(r.length>0){var t=r[0];return r.splice(0,1),t}return new a({el:document.createElement("div")})},c=function(t){t&&r.push(t)},u=function(t){t.target.parentNode&&t.target.parentNode.removeChild(t.target)};a.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",u),this.closed=!0,c(this)};var d=function(t){void 0===t&&(t={});var e=t.duration||3e3,n=s();return n.closed=!1,clearTimeout(n.timer),n.message="string"==typeof t?t:t.message,n.position=t.position||"middle",n.className=t.className||"",n.iconClass=t.iconClass||"",document.body.appendChild(n.$el),o.a.nextTick(function(){n.visible=!0,n.$el.removeEventListener("transitionend",u),~e&&(n.timer=setTimeout(function(){n.closed||n.close()},e))}),n};e.a=d}})},133:function(t,e,n){e=t.exports=n(76)(void 0),e.push([t.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},223:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=function(t){if(/^(^[1-9]\d{7}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9]|[1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(t)){if(18==t.length){for(var e=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),n=new Array(1,0,10,9,8,7,6,5,4,3,2),i=0,o=0;o<17;o++)i+=t.substring(o,o+1)*e[o];var a=i%11,r=t.substring(17);return 2==a?"X"==r||"x"==r:r==n[a]}return!0}return!1},o=function(t){return!!/^([\u4e00-\u9fa5\·]{2,20})$/.test(t)},a=function(t){return!!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(t)},r={valiIdCard:i,valiRealName:o};e.b=r},484:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(131),o=(n.n(i),n(132)),a=n.n(o),r=n(485),s=(n.n(r),n(13)),c=n(14),u=n(223),d=n(8);e.default={name:"authentication",data:function(){return{userName:"",userIdCardNumber:"",popup:!1,btnActive:!0,loading:!1,smsCode:"",btnText:"获取验证码",nextClick:!0,flag:!0}},created:function(){var t=["_trackEvent","实名认证","SHOW","进入实名认证页面","进入实名认证页面"];window._hmt.push(t)},computed:Object(c.mapState)(["investorMobile","userId"]),methods:{btnAction:function(){var t=this;if(this.nextClick){this.nextClick=!1,setTimeout(function(){t.nextClick=!0},2e3);var e=this.userName,n=this.userIdCardNumber;if(!u.b.valiRealName(e))return void a()("请输入真实姓名");if(!u.b.valiIdCard(n))return void a()("请输入正确身份证号");var i=["_trackEvent","实名认证","CLICK","实名认证页面-点击下一步","实名认证页面-点击下一步"];window._hmt.push(i),this.getAccount()}},getAccount:function(){var t=this,e=this.userName,n=this.userIdCardNumber,i=this.smsCode,o={userName:e,userIdCardNumber:n};if(this.popup&&(o={userName:e,userIdCardNumber:n,smsCode:i}),this.loading)return!1;this.loading=!0,s.a.post("/openAccount",o).then(function(e){if(200==e.code)a()("身份认证成功！"),t.popup=!1,setTimeout(function(){t.loading=!1,Object(d.g)(t.userId)},3e3);else if(8003==e.code){t.loading=!1,t.popup=!0,t.smsCode="",t.btnText="获取验证码",t.btnActive=!0;var n=["_trackEvent","实名认证","SHOW","实名认证监测到已在其他商户开户","实名认证监测到已在其他商户开户"];window._hmt.push(n),t.transmit()}else a()(e.msg)})},transmit:function(){var t=this;this.btnActive&&(s.a.get("/sendBaofooAuthSMS",{type:2}).then(function(e){200!=e.code&&(a()(e.msg),t.btnText="获取验证码",t.btnActive=!0,t.flag=!1)}),this.send(120))},sure:function(){this.smsCode.length>=4?this.getAccount():a()("请输入正确验证码！")},curse:function(){this.popup=!1,this.nextClick=!0},send:function(t){var e=this;this.flag=!0,this.btnActive=!1;!function n(){if(e.flag)if(t<=1)e.btnText="重新获取",e.btnActive=!0;else{t--,e.btnText="("+t+"s)";var i=setTimeout(n,1e3)}else clearTimeout(i)}()}}}},485:function(t,e,n){var i=n(486);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;n(77)(i,o);i.locals&&(t.exports=i.locals)},486:function(t,e,n){e=t.exports=n(76)(void 0),e.push([t.i,'.authentication{position:relative;width:100%;height:100%}.authentication .authentication-lint{line-height:1em;padding:.6rem .8rem}.authentication .authentication-input{background-color:#fff;padding-left:.8rem;margin-bottom:2.95rem}.authentication .authentication-input dd,.authentication .authentication-input dt{line-height:2.2rem;height:2.2rem}.authentication .authentication-input dd input,.authentication .authentication-input dt input{font-size:.8rem;color:#666!important;padding:0}.authentication .authentication-input dd input::-webkit-input-placeholder,.authentication .authentication-input dt input::-webkit-input-placeholder{font-size:.7rem;color:#999}.authentication .authentication-input dd{border-bottom:1px solid #d8d8d8}.authentication .authentication-input span{display:block;font-size:.8rem}.authentication .authentication-input .span-left{width:4.5rem}.authentication .authentication-input .span-right{font-size:0}.authentication .authentication-btn button{color:#1d72c0;height:2.1rem;width:15.85rem;border:1px solid #1d72c0;margin:0 auto}.authentication .authentication-text{padding-top:.35rem;padding-left:2.5rem;font-size:.5rem;line-height:2em;color:#1d72c0;position:relative}.authentication .authentication-text:after{content:"!";display:block;width:.75rem;height:.75rem;border-radius:50%;background-color:#1d72c0;position:absolute;left:1.5rem;top:.55rem;text-align:center;line-height:.75rem;color:#fff;font-size:.5rem}.authentication .authentication-win{position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,.3);z-index:999;left:0;top:0}.authentication .authentication-win .win-box{width:15.75rem;height:11.3rem;background-color:#fff;border-radius:.8rem;margin:2rem auto 0}.authentication .authentication-win .win-box .win-content{padding:1rem 1.35rem 0;color:#333}.authentication .authentication-win .win-box .win-content .hint1{font-size:.65rem;line-height:1.15rem}.authentication .authentication-win .win-box .win-content .hint2{font-size:.6rem;margin-top:1.45rem;line-height:1em;height:.6rem}.authentication .authentication-win .win-box .win-content dl{padding-top:.6rem}.authentication .authentication-win .win-box .win-content dl dt input{width:7.15rem;height:1.7rem;border:1px solid #969696;border-radius:.25rem;text-align:center;font-size:.7rem}.authentication .authentication-win .win-box .win-content dl dd button{background-color:#999;width:5.1rem;height:1.7rem;color:#fff;font-size:.6rem}.authentication .authentication-win .win-box .win-content dl dd .active{background-color:#1d72c0}.authentication .authentication-win .win-box .win-btn{border-top:1px solid #d8d8d8}.authentication .authentication-win .win-box .win-btn button{padding:.7rem 0;font-size:.8rem;line-height:1em;border-radius:0;color:#666}.authentication .authentication-win .win-box .win-btn button.sure{color:#1d72c0;border-left:1px solid #d8d8d8}',""])},487:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"authentication",attrs:{"flex-box":"1"}},[n("div",{staticClass:"authentication-lint"},[t._v("为保护您账号安全，请进行实名认证")]),t._v(" "),n("dl",{staticClass:"authentication-input"},[n("dd",{attrs:{flex:""}},[n("span",{staticClass:"span-left"},[t._v("真实姓名")]),t._v(" "),n("div",{staticClass:"span-right",attrs:{flex:"cross:center"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{type:"text",placeholder:"请输入您的真实姓名"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}})])]),t._v(" "),n("dd",{attrs:{flex:""}},[n("span",{staticClass:"span-left"},[t._v("身份证号")]),t._v(" "),n("div",{staticClass:"span-right",attrs:{flex:"cross:center"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.userIdCardNumber,expression:"userIdCardNumber"}],attrs:{type:"text",placeholder:"请输入您的身份证号码"},domProps:{value:t.userIdCardNumber},on:{input:function(e){e.target.composing||(t.userIdCardNumber=e.target.value)}}})])])]),t._v(" "),n("div",{staticClass:"authentication-bottom"},[n("div",{staticClass:"authentication-btn"},[n("button",{on:{click:function(e){e.stopPropagation(),t.btnAction(e)}}},[t._v("下一步")])]),t._v(" "),t._m(0)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.popup,expression:"popup"}],staticClass:"authentication-win"},[n("div",{staticClass:"win-box",attrs:{flex:"dir:top"}},[n("div",{staticClass:"win-content",attrs:{"flex-box":"1"}},[n("p",{staticClass:"hint1"},[t._v("监测到您在其他商户已开通宝付账户，请完成短信验证，确保是您本人操作。")]),t._v(" "),n("p",{staticClass:"hint2"},[n("span",[t._v("短信验证码已发送到"+t._s(t._f("mobileFormat")(t.investorMobile)))])]),t._v(" "),n("dl",{attrs:{flex:"",flex:"main:justify"}},[n("dt",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.smsCode,expression:"smsCode"}],attrs:{type:"text",placeholder:"请输入验证码",maxlength:"6"},domProps:{value:t.smsCode},on:{input:function(e){e.target.composing||(t.smsCode=e.target.value)}}})]),t._v(" "),n("dd",[n("button",{class:{active:t.btnActive},on:{click:function(e){e.stopPropagation(),t.transmit(e)}}},[t._v(t._s(t.btnText))])])])]),t._v(" "),n("div",{staticClass:"win-btn",attrs:{"flex-box":"0",flex:""}},[n("button",{attrs:{"flex-box":"1"},on:{click:function(e){e.stopPropagation(),t.curse(e)}}},[t._v("取消")]),t._v(" "),n("button",{staticClass:"sure",attrs:{"flex-box":"1",disabled:t.loading},on:{click:function(e){e.stopPropagation(),t.sure(e)}}},[t._v("确定")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"authentication-text"},[n("p",[t._v("仅支持大陆身份证；")]),t._v(" "),n("p",[t._v("请输入您的本人身份信息，确保信息真实有效，所有资料将会保密;")]),t._v(" "),n("p",[t._v("实名认证通过后，身份信息不可更改；")]),t._v(" "),n("p",[t._v("未满18周岁用户暂无法实名认证。")])])}]}}});