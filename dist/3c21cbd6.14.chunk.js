webpackJsonp([14],{127:function(e,t,s){var i=s(34)(s(501),s(502),null,null);e.exports=i.exports},134:function(e,t,s){var i=s(136);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;s(14)(i,o);i.locals&&(e.exports=i.locals)},135:function(e,t,s){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function t(i){if(s[i])return s[i].exports;var o=s[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var s={};return t.m=e,t.c=s,t.i=function(e){return e},t.d=function(e,s,i){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=242)}({0:function(e,t){e.exports=function(e,t,s,o,a){var r,n=e=e||{},d=i(e.default);"object"!==d&&"function"!==d||(r=e,n=e.default);var l="function"==typeof n?n.options:n;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),o&&(l._scopeId=o);var c;if(a?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=c):s&&(c=s),c){var p=l.functional,v=p?l.render:l.beforeCreate;p?l.render=function(e,t){return c.call(t),v(e,t)}:l.beforeCreate=v?[].concat(v,c):[c]}return{esModule:r,exports:n,options:l}}},1:function(e,t){e.exports=s(3)},101:function(e,t){},164:function(e,t,s){function i(e){s(101)}var o=s(0)(s(86),s(170),i,null,null);e.exports=o.exports},170:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition",{attrs:{name:"mint-toast-pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"mint-toast",class:e.customClass,style:{padding:""===e.iconClass?"10px":"20px"}},[""!==e.iconClass?s("i",{staticClass:"mint-toast-icon",class:e.iconClass}):e._e(),e._v(" "),s("span",{staticClass:"mint-toast-text",style:{"padding-top":""===e.iconClass?"0":"10px"}},[e._v(e._s(e.message))])])])},staticRenderFns:[]}},242:function(e,t,s){e.exports=s(50)},50:function(e,t,s){"use strict";var i=s(94);Object.defineProperty(t,"__esModule",{value:!0}),s.d(t,"default",function(){return i.a})},86:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var e=[];switch(this.position){case"top":e.push("is-placetop");break;case"bottom":e.push("is-placebottom");break;default:e.push("is-placemiddle")}return e.push(this.className),e.join(" ")}}}},94:function(e,t,s){"use strict";var i=s(1),o=s.n(i),a=o.a.extend(s(164)),r=[],n=function(){if(r.length>0){var e=r[0];return r.splice(0,1),e}return new a({el:document.createElement("div")})},d=function(e){e&&r.push(e)},l=function(e){e.target.parentNode&&e.target.parentNode.removeChild(e.target)};a.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",l),this.closed=!0,d(this)};var c=function(e){void 0===e&&(e={});var t=e.duration||3e3,s=n();return s.closed=!1,clearTimeout(s.timer),s.message="string"==typeof e?e:e.message,s.position=e.position||"middle",s.className=e.className||"",s.iconClass=e.iconClass||"",document.body.appendChild(s.$el),o.a.nextTick(function(){s.visible=!0,s.$el.removeEventListener("transitionend",l),~t&&(s.timer=setTimeout(function(){s.closed||s.close()},t))}),s};t.a=c}})},136:function(e,t,s){t=e.exports=s(13)(void 0),t.push([e.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},151:function(e,t,s){"use strict";var i=s(3),o=s.n(i),a=new o.a;t.a=a},159:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAkCAYAAADLsGk3AAAAAXNSR0IArs4c6QAAA2BJREFUWAntmduLElEcx4/3G4GWpRQsRARWLARhsBC1rVb71j/Q/9A/0VN/SA+91GuUFVQISiRh6PZUPUSlu4Gblq46fX82J442njlndFyDHRjO7Xf7zLl6ZOzgWa4v4Jk1nEgksrK3t3fPMIw12PLOas9Cv+fxeD6g/mE8Hr/TbDZ3LWTYTCChUOhUv99/CsMrVsZdqPsEqFvw+WLStmMQQJyGwWcweGLSqMvlnXA4fK7dbn8R/fjEgmo+GAxmBoPBc8gfV9WZo1wEvk8Oh8P7ok3tHgHEWRii4ZQSDS04P4jFYsdardYO96s1OQGxavbEfkJQ7L5Op5PhEJQqgwQCgfOAoDlxVDSwj/lDom8lEEBcwJgsQPGIqCzLY3WRNUvbnOjaggDiIiCewPNhqXehkQKpVCqsWCyyZDIptMizJEs6pKsLIwXx+/1rgHgM93F5COOt2BwZxjDLZrOsUCgowRAEyZIO6ZKNuTyAuOTz+Vp4DSdvKpUyqtUq4jFGKZWn2dGR5TYQ3w1bUAitQ+EHV3KaqgSoImPl3xYEAjkotq2UndTJApW12fmSgqDxOgz8tDOi224VsFWdjt2pIGZP/NIxpiMrBl6r1Qx6VebPNB8ykHfTlOZVTzAcgCAoT3VO7E+CSJdf21VhiQREkNuIq+tWbHyfyGQyrF6vj17Kq+4zWnGhuzbRzf/3ZOfEgLkGmI6TcWulI05y2iDFOSFrs7Il1k3OER7/WAqhDSjNvJeoBKoiIwLwvBIIUUHwCpR2uaJuqhOgjiyPQxnEhHF83iqXy1r7RDqd/ns2K5VKtkvyJIi4ao0NLyrgcuEljtN0OGv90yipoCM4rokYYFgul2O4wpFI/2lqNBosn8+PdKLRqPYxXunXj/mb5BFcKh/nCQZdYgtgJaCiC5lNfGiKafRIe4QL4QKu5PV68yh/53V2qVMIsutEVwmEjAPmNWByyG5TeQmeseGuDEKBA+YNVo0NZO0HvbukA8yjLdGFFggp9nq9t4C5iuw30dAi85gfD8Q7LfKtNNmtgsQd1xnzoi5t1e5i3bZ5ZfpV9KHdI1wZPVPDWr6O8mdet4D0I3rjJu59xyDIr2MQUu52u1uAuQzjRRSHVOfCQ38rvMd7N5FIrGLJfeWCjwOTc/8CvwGWVFj13iWwNgAAAABJRU5ErkJggg=="},234:function(e,t,s){"use strict";var i=s(235),o=s.n(i);t.a=o.a},235:function(e,t,s){var i=s(34)(s(236),s(239),null,null);e.exports=i.exports},236:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(151),o=s(237);s.n(o);t.default={name:"Keyboard",props:["title"],data:function(){return{passwords:[],keyboads:[{val:1,sub:0},{val:2,sub:"ABC"},{val:3,sub:"DEF"},{val:4,sub:"GHI"},{val:5,sub:"JKL"},{val:6,sub:"MNO"},{val:7,sub:"PQRS"},{val:8,sub:"TUV"},{val:9,sub:"WXYZ"}]}},created:function(){var e=this;i.a.$on("clearInput",function(){e.passwords=[],e.$emit("callBack","")}),i.a.$on("clearInputOnly",function(){e.passwords=[],e.$emit("callBack","only")})},methods:{addPassword:function(e){var t=e.val;0==e&&(t=0),this.passwords.length<6&&this.passwords.push(t),this.$emit("callBack",this.passwords.join("").substr(0,6))},deletePassword:function(){this.passwords.pop(),this.$emit("callBack",this.passwords)}},events:{clear:function(){}}}},237:function(e,t,s){var i=s(238);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;s(14)(i,o);i.locals&&(e.exports=i.locals)},238:function(e,t,s){t=e.exports=s(13)(void 0),t.push([e.i,".keyboad-body{border-top:1px solid #efefef;background-color:#fff}.keyboad-body .keyboad-list{position:relative}.keyboad-body .keyboad-list .keyboad-bottom{height:2.5rem;line-height:2.5rem;background-color:#fff;text-align:center;border-right:1px solid #bbb}.keyboad-body .keyboad-list .keyboad-bottom:active{background-color:#d1d5db}.keyboad-body .keyboad-list .keyboad-bottom:last-child{border-right:none;background-image:url("+s(159)+");background-position:50%;background-size:22px 16px;background-repeat:no-repeat}.keyboad-body .keyboad-list .keyboad-bottom span{display:block;width:5rem;margin:auto;text-align:center;color:#030303;font-size:1.45rem}.keyboad-body .keyboad-list .keyboad-bottom:first-child,.keyboad-body .keyboad-list .keyboad-bottom:last-child{background-color:#d1d5db}.keyboad-body .keyboad-list .keyboad-item{padding-bottom:.3rem;border-bottom:1px solid #bbb;border-right:1px solid #bbb}.keyboad-body .keyboad-list .keyboad-item .hidden{visibility:hidden}.keyboad-body .keyboad-list .keyboad-item:last-child{border-right:none}.keyboad-body .keyboad-list .keyboad-item:active{background-color:#d1d5db}.keyboad-body .keyboad-list .keyboad-item .val{margin:auto;display:block;width:5rem;text-align:center;color:#030303;font-size:1.45rem;line-height:1.75rem}.keyboad-body .keyboad-list .keyboad-item .sub{margin:auto;display:block;width:5rem;text-align:center;color:#030303;font-size:.55rem;line-height:.65rem}",""])},239:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"keyboad-body",attrs:{"flex-box":"0"}},[s("div",{staticClass:"keyboad-list",attrs:{flex:"dir:left"}},e._l(e.keyboads.slice(0,3),function(t,i){return s("div",{key:i,staticClass:"keyboad-item",attrs:{"flex-box":"1"},on:{click:function(s){s.stopPropagation(),e.addPassword(t)}}},[s("span",{staticClass:"val"},[e._v(e._s(t.val))]),e._v(" "),s("span",{staticClass:"sub",class:{hidden:0==i}},[e._v(e._s(t.sub))])])})),e._v(" "),s("div",{staticClass:"keyboad-list",attrs:{flex:"dir:left"}},e._l(e.keyboads.slice(3,6),function(t,i){return s("div",{key:i,staticClass:"keyboad-item",attrs:{"flex-box":"1"},on:{click:function(s){s.stopPropagation(),e.addPassword(t)}}},[s("span",{staticClass:"val"},[e._v(e._s(t.val))]),e._v(" "),s("span",{staticClass:"sub"},[e._v(e._s(t.sub))])])})),e._v(" "),s("div",{staticClass:"keyboad-list",attrs:{flex:"dir:left"}},e._l(e.keyboads.slice(6,9),function(t,i){return s("div",{key:i,staticClass:"keyboad-item",attrs:{"flex-box":"1"},on:{click:function(s){s.stopPropagation(),e.addPassword(t)}}},[s("span",{staticClass:"val"},[e._v(e._s(t.val))]),e._v(" "),s("span",{staticClass:"sub"},[e._v(e._s(t.sub))])])})),e._v(" "),s("div",{staticClass:"keyboad-list",attrs:{flex:"dir:left"}},[e._m(0),e._v(" "),s("div",{staticClass:"keyboad-bottom",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.addPassword(0)}}},[s("span",[e._v("0")])]),e._v(" "),s("div",{staticClass:"keyboad-bottom",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.deletePassword(t)}}},[s("span")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"keyboad-bottom",attrs:{"flex-box":"1"}},[s("span")])}]}},240:function(e,t,s){var i=s(241);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;s(14)(i,o);i.locals&&(e.exports=i.locals)},241:function(e,t,s){t=e.exports=s(13)(void 0),t.push([e.i,'.set-pay-password{position:relative;width:100%;height:100%;background-color:#fff;text-align:center}.set-pay-password .password-header{padding-top:2.8rem;overflow-y:auto}.set-pay-password .password-header .psw-img{height:3.85rem}.set-pay-password .password-header .psw-img img{width:3.25rem}.set-pay-password .password-header .psw-title{line-height:.8rem;margin:1rem 0}.set-pay-password .password-header .psw-input ul li{width:2.1rem;height:2.4rem;border:1px solid #1d72c0;margin-right:1px;position:relative}.set-pay-password .password-header .psw-input ul li:last-child{margin:0}.set-pay-password .password-header .psw-input ul .active:after{content:"";display:block;width:.7rem;height:.7rem;background-color:#000;border-radius:50%;position:absolute;left:50%;top:50%;margin:-.35rem 0 0 -.35rem}.set-pay-password .password-header .psw-input .error-hint{margin-top:1rem}.set-pay-password .password-header .psw-btn{margin-top:2.5rem;text-align:center}.set-pay-password .password-header .psw-btn button{width:12.85rem;height:2rem;border-radius:.2rem;font-size:.8rem;color:#fff;line-height:16px;background:#dbdbdb}.set-pay-password .password-header .psw-btn .active{background:#1d72c0}.reset-pay-password{height:100%;width:100%;text-align:center}.reset-pay-password .reset-verify .verify-title{padding:1rem 0;background-color:#fff;margin-bottom:.5rem}.reset-pay-password .reset-verify .verify-title span{color:#1d72c0}.reset-pay-password .reset-verify .verify-content{padding:.6rem 1.5rem;background-color:#fff}.reset-pay-password .reset-verify .verify-card .verify-content dd,.reset-pay-password .reset-verify .verify-card .verify-content dt{text-align:left;width:50%;line-height:.9rem}.reset-pay-password .reset-verify .verify-card .verify-content dt{border-right:1px solid #d8d8d8}.reset-pay-password .reset-verify .verify-card .verify-content dd{padding-left:.6rem}.reset-pay-password .reset-verify .verify-code .verify-title{line-height:1em}.reset-pay-password .reset-verify .verify-code .verify-title p:last-child{margin-top:.6rem;height:.9rem}.reset-pay-password .reset-verify .verify-code .verify-title span{font-size:.9rem;line-height:1em}.reset-pay-password .reset-verify .verify-code .verify-box{padding-left:1.5rem;background-color:#fff}.reset-pay-password .reset-verify .verify-code .verify-content{padding:.6rem 0}.reset-pay-password .reset-verify .verify-code .verify-content ul{width:15.5rem}.reset-pay-password .reset-verify .verify-code .verify-content ul li{line-height:.9rem;font-size:.6rem}.reset-pay-password .reset-verify .verify-code .verify-content ul li:first-child{width:5.6rem;text-align:left}.reset-pay-password .reset-verify .verify-code .verify-content ul li:nth-child(2){border-left:1px solid #d8d8d8;border-right:1px solid #d8d8d8}.reset-pay-password .reset-verify .verify-code .verify-content ul li:nth-child(2) input{text-align:center;width:6rem}.reset-pay-password .reset-verify .verify-code .verify-content ul li:last-child{text-align:right;width:3.6rem}.reset-pay-password .reset-verify .verify-code .verify-content ul li:last-child .active{color:#1d72c0}.reset-pay-password .reset-verify .verify-code .verify-content ul li:last-child a{width:3rem;height:.9rem;background-color:#d8d8d8;text-align:center}.reset-pay-password .reset-verify .verify-code .verify-border{border-bottom:1px solid #d8d8d8}.reset-pay-password .reset-btn{overflow:visible;margin-top:2.5rem}.reset-pay-password .reset-btn button{border-radius:.2rem;font-size:.8rem;color:#fff;line-height:1em;width:15.75rem;height:2rem;background:#dbdbdb;box-shadow:0 0 .25rem #dbdbdb}.reset-pay-password .reset-btn .active{background:#1d72c0;box-shadow:0 0 .25rem #1d72c0}',""])},242:function(e,t,s){e.exports=s.p+"set-pay-psw.51520abb.png"},501:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(134),o=(s.n(i),s(135)),a=s.n(o),r=s(15),n=s(16),d=s(151),l=s(234),c=s(240);s.n(c);t.default={name:"withdraw",data:function(){return{idCardTail:"",verifyCode:"",imageCode:"",receiveCode:"",setPassword:!1,verifyCard:!0,nextActive:!1,spanActive:!0,spanText:"获取验证码",imgcodeShow:!1,flag:!0,pTitle:"请设置金疙瘩交易密码，用于交易验证",password:"",storagePassword:"",pShow:!1,btnActive:!1,btnShow:!1}},components:{Keyboard:l.a},computed:Object(n.mapState)(["investorMobile","investorRealName"]),methods:{sendCode:function(){this.spanActive&&this.getCode()},getCode:function(){var e=this;r.a.get("/sendVerifyCode",{investorMobile:this.investorMobile,imageCode:this.imageCode,bussType:2}).then(function(t){200==t.code?e.imgcodeShow=!1:1004==t.code&&(a()(t.msg),e.imgcodeShow=!0,e.receiveCode=t.data.imageCode,e.flag=!1)}),this.send(60)},send:function(e){var t=this;this.spanActive=!1,this.flag=!0;!function s(){if(t.flag)if(e<=1)t.spanText="重新获取",t.spanActive=!0;else{e--,t.spanText="已发送"+e+"s";var i=setTimeout(s,1e3)}else clearTimeout(i),t.spanText="重新获取",t.spanActive=!0}()},next:function(){var e=this;this.verifyCard?this.idCardTail.length>=4&&r.a.post("/checkIdCard",{idCardTail:this.idCardTail}).then(function(t){200==t.code?(e.verifyCard=!1,e.getCode(60)):a()(t.msg)}):this.verifyCode.length>=6&&r.a.post("/checkVerifyCode",{verifyCode:this.verifyCode,investorMobile:this.investorMobile,bussType:2}).then(function(t){200==t.code?e.setPassword=!0:a()(t.msg)})},callBack:function(e){var t=this;if("only"==e)return void(this.password="");this.pShow=!1,this.password=e,this.storagePassword.length>2?(this.pTitle="请再次填写以确认",e.length>=6?this.btnActive=!0:this.btnActive=!1):(this.btnShow=!1,e.length>=6&&(this.storagePassword=e,setTimeout(function(){d.a.$emit("clearInput"),t.btnShow=!0},300)))},submit:function(){var e=this;if(this.btnActive){var t=this.password,s=this.storagePassword,i=this.idCardTail,o=this.verifyCode,n=this.investorMobile;t==s?r.a.post("/resetPayPassword",{idCardTail:i,userPayPassword:t,investorMobile:n,verifyCode:o}).then(function(t){200==t.code?(a()("重置交易密码成功"),setTimeout(function(){e.$router.go(-1)},3e3)):a()(t.msg)}):(this.storagePassword="",this.pShow=!0,this.btnShow=!1,this.pTitle="请设置金疙瘩交易密码，用于交易验证",d.a.$emit("clearInputOnly"))}}}}},502:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reset-pay-password",attrs:{flex:"dir:top"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.setPassword,expression:"!setPassword"}],staticClass:"reset-verify"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.verifyCard,expression:"verifyCard"}],staticClass:"verify-card"},[s("div",{staticClass:"verify-title"},[e._v("输入"),s("span",[e._v(e._s(e.investorRealName.replace(/.(?=.)/g,"*")))]),e._v("的身份证号后四位以验证身份")]),e._v(" "),s("div",{staticClass:"verify-content"},[s("dl",{attrs:{flex:""}},[s("dt",[e._v("请输入身份证号后四位")]),e._v(" "),s("dd",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.idCardTail,expression:"idCardTail"}],attrs:{type:"text",maxlength:"4",placeholder:"请输入身份证号后四位"},domProps:{value:e.idCardTail},on:{input:function(t){t.target.composing||(e.idCardTail=t.target.value)}}})])])]),e._v(" "),s("div",{staticClass:"reset-btn",attrs:{flex:"main:center"}},[s("button",{class:{active:e.idCardTail.length>=4},on:{click:function(t){t.stopPropagation(),e.next(t)}}},[e._v("下一步")])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.verifyCard,expression:"!verifyCard"}],staticClass:"verify-code"},[s("div",{staticClass:"verify-title"},[s("p",[e._v("短信验证码已发送到您的注册手机")]),e._v(" "),s("p",[s("span",[e._v(e._s(e._f("mobileFormat")(e.investorMobile)))])])]),e._v(" "),s("div",{staticClass:"verify-box"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.imgcodeShow,expression:"imgcodeShow"}],staticClass:"verify-content verify-border"},[s("ul",{attrs:{flex:"main:justify"}},[s("li",[e._v("请输入校验码")]),e._v(" "),s("li",{attrs:{flex:"1"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.imageCode,expression:"imageCode"}],attrs:{type:"text",placeholder:"4位验证码",maxlength:"4"},domProps:{value:e.imageCode},on:{input:function(t){t.target.composing||(e.imageCode=t.target.value)}}})]),e._v(" "),s("li",{attrs:{flex:"main:right"}},[s("a",[e._v(e._s(e.receiveCode))])])])]),e._v(" "),s("div",{staticClass:"verify-content"},[s("ul",{attrs:{flex:"main:justify"}},[s("li",[e._v("请输入短信验证码")]),e._v(" "),s("li",{attrs:{flex:"1"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.verifyCode,expression:"verifyCode"}],attrs:{type:"tel",placeholder:"6位数字验证码",maxlength:"6"},domProps:{value:e.verifyCode},on:{input:function(t){t.target.composing||(e.verifyCode=t.target.value)}}})]),e._v(" "),s("li",[s("span",{class:{active:e.spanActive},on:{click:function(t){t.stopPropagation(),e.sendCode(t)}}},[e._v(e._s(e.spanText))])])])])]),e._v(" "),s("div",{staticClass:"reset-btn",attrs:{flex:"main:center"}},[s("button",{class:{active:e.verifyCode.length>=6},on:{click:function(t){t.stopPropagation(),e.next(t)}}},[e._v("下一步")])])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.setPassword,expression:"setPassword"}],staticClass:"set-pay-password",attrs:{flex:"dir:top"}},[s("div",{staticClass:"password-header",attrs:{"flex-box":"1"}},[e._m(0),e._v(" "),s("p",{staticClass:"psw-title"},[e._v(e._s(e.pTitle))]),e._v(" "),s("div",{staticClass:"psw-input"},[s("ul",{attrs:{flex:"main:center"}},e._l(6,function(t){return s("li",{class:{active:t<=e.password.length}})})),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:e.pShow,expression:"pShow"}],staticClass:"error-hint"},[e._v("两次输入不一致！")])]),e._v(" "),s("div",{staticClass:"psw-btn",attrs:{flex:"main:center"}},[s("button",{directives:[{name:"show",rawName:"v-show",value:e.btnShow,expression:"btnShow"}],class:{active:e.btnActive},on:{click:function(t){t.stopPropagation(),e.submit(t)}}},[e._v("完成")])])]),e._v(" "),s("keyboard",{attrs:{title:"键盘","flex-box":"0"},on:{callBack:e.callBack}})],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"psw-img"},[i("img",{attrs:{src:s(242),alt:""}})])}]}}});