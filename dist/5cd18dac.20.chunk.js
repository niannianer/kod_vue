webpackJsonp([20],{134:function(t,e,o){var r=o(136);"string"==typeof r&&(r=[[t.i,r,""]]);var n={};n.transform=void 0;o(14)(r,n);r.locals&&(t.exports=r.locals)},135:function(t,e,o){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){function e(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,r){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=242)}({0:function(t,e){t.exports=function(t,e,o,n,s){var i,a=t=t||{},l=r(t.default);"object"!==l&&"function"!==l||(i=t,a=t.default);var c="function"==typeof a?a.options:a;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),n&&(c._scopeId=n);var p;if(s?(p=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=p):o&&(p=o),p){var d=c.functional,u=d?c.render:c.beforeCreate;d?c.render=function(t,e){return p.call(e),u(t,e)}:c.beforeCreate=u?[].concat(u,p):[p]}return{esModule:i,exports:a,options:c}}},1:function(t,e){t.exports=o(3)},101:function(t,e){},164:function(t,e,o){function r(t){o(101)}var n=o(0)(o(86),o(170),r,null,null);t.exports=n.exports},170:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"mint-toast-pop"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"mint-toast",class:t.customClass,style:{padding:""===t.iconClass?"10px":"20px"}},[""!==t.iconClass?o("i",{staticClass:"mint-toast-icon",class:t.iconClass}):t._e(),t._v(" "),o("span",{staticClass:"mint-toast-text",style:{"padding-top":""===t.iconClass?"0":"10px"}},[t._v(t._s(t.message))])])])},staticRenderFns:[]}},242:function(t,e,o){t.exports=o(50)},50:function(t,e,o){"use strict";var r=o(94);Object.defineProperty(e,"__esModule",{value:!0}),o.d(e,"default",function(){return r.a})},86:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var t=[];switch(this.position){case"top":t.push("is-placetop");break;case"bottom":t.push("is-placebottom");break;default:t.push("is-placemiddle")}return t.push(this.className),t.join(" ")}}}},94:function(t,e,o){"use strict";var r=o(1),n=o.n(r),s=n.a.extend(o(164)),i=[],a=function(){if(i.length>0){var t=i[0];return i.splice(0,1),t}return new s({el:document.createElement("div")})},l=function(t){t&&i.push(t)},c=function(t){t.target.parentNode&&t.target.parentNode.removeChild(t.target)};s.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",c),this.closed=!0,l(this)};var p=function(t){void 0===t&&(t={});var e=t.duration||3e3,o=a();return o.closed=!1,clearTimeout(o.timer),o.message="string"==typeof t?t:t.message,o.position=t.position||"middle",o.className=t.className||"",o.iconClass=t.iconClass||"",document.body.appendChild(o.$el),n.a.nextTick(function(){o.visible=!0,o.$el.removeEventListener("transitionend",c),~e&&(o.timer=setTimeout(function(){o.closed||o.close()},e))}),o};e.a=p}})},136:function(t,e,o){e=t.exports=o(13)(void 0),e.push([t.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},196:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAAAXNSR0IArs4c6QAAAlJJREFUSA2llrtrVUEQhz1BMNrYaKLEFNqLikUgjQQtBCEaBQM+QsRHVKJgYxcbizSptYv/goWChaIRFETw0VhIBBOTIgFBEUVRc/1+l7Nh7mTn3Bsc+NjZmd/s2XPvPk6xpkWr1WrbkO6HPtgBndABBSyWzNJOwaOiKKZp/8946Do4A6/A2x8C8zAH8r1NE7gGG1c9C4raYBQWwNtzAkdhfRoYvx2OwFPw9o3ATWhP+soW4U54Ad70lldBP3lo5EfgN3h7T2BfWKgEggH47ivL/pAvJr5VZOKDwRia2IjX1/skLsJSUHjHFqEZhlmjlT/sNLdN3rtjVqs374e/XlX2f9F2pwL8iUCn8ITRbaH/o0J7qq5FsBm+VAgfmEF70UW/koZQrtfo7yoYmP7qrjbEN6BqqzxOA9Keg6pFqNx5o39ifO9uIDCmCRzyGdefN/09xo/c3SYxZ/yce1ATWI3VWhC3oknDLGkC91MvaLtM/LXxI9dqbG1Of087oAO+BgtFYbsIe+hHu0Va5XrSk/CrFqGeqbukfgA124a6iOpG0ThENm50nYiibaiJHk7aNPBlgtEWm7RidCfgAySTf9JpbqWka/WMK1a77JM4BtFRfHpZWDpoN4lM/DjxnP0kOOj1DX0Eu+BlplqX0WiDONNBcwFyl9Eb4nszJStDCHUd6+ZbBG/PCOjSstexvhu0jqbA22cC12Htyic1iVCke/4svAVv+kU+leTe+B25S6ATL7SqY7WhiIF0IR2APtgO+iQTsgXQZ9kM6Oh+yCfZR9qm9g9FHIFEzCerbwAAAABJRU5ErkJggg=="},204:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAQCAYAAABz9a1kAAAAAXNSR0IArs4c6QAAAchJREFUSA21lc8rRFEUx2dQfmWytqAQC5QsGDakRGb8zkZsrGRhPQv/gCQ7FjQppUj+BBsLaSg/ShaTEiJZoEQM43PGvXXnzXijmXnf+rxz7jnnnnPfe/PD5VKKRqM1cA1BHXPSMmdFzauNm0PQD1reuGSWFwxp1oOwg9I+Ry4sPBif+EqT2nHImv0PYjM4hA/uwdQziyInDkHfQngyhu3h18nTuFLBb2xI+WLmHDrIvDFDuxdykBnYAi/kww2I5GBd2TwM/XpUX0z0FqbhFBYT5hAcBS15ZfUJRWkE6NMID7oxdsy2DQXV8GpseMH3225KkWT/sKXnmu0WiitAfkus+iIQhHLbBpYk9VWwAfKaTe2zkG9qcpFcUNUR7AQsq7U27zjr0AcFyboQL4YRkM/dB5g6MhaBZPtjMYraYBeGdBF+P4TBqk8Cx7ANq7ADZyA3YdUlgQHpiQ3ACbTqGf+2bOoELetj1vG/7BSJvFTDUhaoBu3KPmIroQGaoAXGQXQIIQjDGyyB6M7tdkd+3Qyv3NGsut1lsxWxUhUX02vJnatc7L/EzKXt0zAX5PXE/eyz9oBWtzmAYBl0mDFHfYZtgnxISzIZ9AMaW6Xf3mschQAAAABJRU5ErkJggg=="},283:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(134),n=(o.n(r),o(135)),s=o.n(n),i=o(15),a=o(284);o.n(a);e.default={name:"login",data:function(){return{username:"",password:"",showPassword:!1,passType:"password",imageCode:"",inputCode:""}},created:function(){},computed:{},methods:{checkPhone:function(){return this.username?!!/^1[3|4|5|7|8]\d{9}$/.test(this.username)||(s()("请输入正确的手机号码"),!1):(s()("请输入手机号码"),!1)},checkPassword:function(){var t=/^[a-zA-Z0-9]{6,20}$/;return this.password?t.test(this.password)?/^\d*$/.test(this.password)?(s()("请输入正确的登录密码（6~20位数字和字母）"),!1):!/^[a-zA-Z]*$/.test(this.password)||(s()("请输入正确的登录密码（6~20位数字和字母）"),!1):(s()("请输入正确的登录密码（6~20位数字和字母）"),!1):(s()("请输入密码"),!1)},login:function(){var t=this;if(this.checkPhone()&&this.checkPassword()){if(this.imageCode&&!this.inputCode)return s()("请输入图形验证码"),!1;var e=this.username,o=this.password,r=this.inputCode;i.a.post("/login",{investorMobile:e,userLoginPassword:o,imageCode:r}).then(function(e){if(1109==e.code)return s()("该手机号已被禁用，如有疑问请联系客服。"),!1;if(1103==e.code)return s()("该手机号未注册，快去注册吧！"),!1;if(1004==e.code)return s()(e.msg),t.imageCode=e.data.imageCode,!1;if(200==e.code){var o=window.sessionStorage.getItem("logoutUrl");return window.sessionStorage.removeItem("logoutUrl"),window.sessionStorage.removeItem("logoutIndex"),o=decodeURIComponent(o),o&&/http/.test(o)?window.location.replace(o):(t.$store.dispatch("getAccountBaofoo"),t.$store.dispatch("getBankInfo"),t.$store.dispatch("getPersonalCenterMsg"),t.$router.replace("/personal-center")),!1}s()(e.msg)})}}},mounted:function(){var t=window.innerHeight;this.$refs.login.style.height=t+"px"}}},284:function(t,e,o){var r=o(285);"string"==typeof r&&(r=[[t.i,r,""]]);var n={};n.transform=void 0;o(14)(r,n);r.locals&&(t.exports=r.locals)},285:function(t,e,o){e=t.exports=o(13)(void 0),e.push([t.i,".login{width:100%;min-height:100%;position:relative;background-image:url("+o(286)+");background-size:cover}.login .logo-warp{position:relative;padding-top:1.7rem;text-align:center}.login .logo-warp .logo{width:3.8rem;height:3.8rem}.login .title{margin-top:.6rem;font-size:1rem;color:#fff;text-align:center}.login .form{position:relative;margin-top:2rem}.login .form .label-warp{margin:1rem 1.5rem}.login .form .label-warp .code-warp{border:1px solid #fff;border-radius:4px;padding:.5rem;line-height:1.1rem;margin-right:1rem}.login .form .label-warp .code-warp .input{background:transparent;text-align:center;color:#fff}.login .form .label-warp .image-warp{width:4rem;text-align:center;font-size:.8rem;color:#fff}.login .form .input-warp,.login .form .label-warp .image-warp{border:1px solid #fff;border-radius:4px;padding:.5rem;line-height:1.1rem}.login .form .input-warp{margin:1rem 1.5rem}.login .form .input-warp .phone{height:1.1rem;width:.8rem;margin-right:.5rem}.login .form .input-warp .input{background:transparent;text-align:center;color:#fff}.login .form .input-warp .input-img{opacity:0}.login .form .input-warp .pass{width:1.5rem}.login .form .input-warp .pass .show-hide{width:.85rem}.login .btn-warp{margin:2rem 1.5rem;text-align:center}.login .btn-warp .btn-login{width:100%;height:2.2rem;box-shadow:none}.login .footer{position:absolute;width:100%;bottom:2rem}.login .footer .link{text-align:center;font-size:.65rem;color:#999}",""])},286:function(t,e,o){t.exports=o.p+"bg.995daf9c.png"},287:function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"login",staticClass:"login"},[t._m(0),t._v(" "),r("div",{staticClass:"title"},[t._v("金疙瘩")]),t._v(" "),r("div",{staticClass:"form"},[r("label",{attrs:{for:"username"}},[r("div",{staticClass:"input-warp",attrs:{flex:""}},[r("img",{staticClass:"phone",attrs:{"flex-box":"0",src:o(288)}}),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.username,expression:"username",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"tel","flex-box":"1",placeholder:"请输入手机号",id:"username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t._m(1)])]),t._v(" "),r("label",{attrs:{for:"password"}},[r("div",{staticClass:"input-warp",attrs:{flex:""}},[r("img",{staticClass:"phone",attrs:{"flex-box":"0",src:o(289)}}),t._v(" "),t.showPassword?r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text","flex-box":"1",id:"password",placeholder:"请输入密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"password",placeholder:"请输入密码","flex-box":"1",id:"password1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),r("div",{staticClass:"pass",attrs:{flex:"main:right cross:center"},on:{click:function(e){e.stopPropagation(),t.showPassword=!t.showPassword}}},[t.showPassword?r("img",{staticClass:"show-hide",attrs:{src:o(196)}}):r("img",{staticClass:"show-hide",attrs:{src:o(204)}})])])]),t._v(" "),t.imageCode?r("label",{staticClass:"label-warp",attrs:{for:"image-code",flex:""}},[r("div",{staticClass:"code-warp",attrs:{"flex-box":"1"}},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.inputCode,expression:"inputCode",modifiers:{trim:!0}}],staticClass:"input",attrs:{id:"image-code",placeholder:"请输入图形校验码"},domProps:{value:t.inputCode},on:{input:function(e){e.target.composing||(t.inputCode=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),r("div",{staticClass:"image-warp",attrs:{"flex-box":"0"}},[t._v("\n                "+t._s(t.imageCode)+"\n            ")])]):t._e()]),t._v(" "),r("div",{staticClass:"btn-warp"},[r("button",{staticClass:"btn-primary btn-login",on:{click:function(e){e.stopPropagation(),t.login(e)}}},[t._v("登  录")])]),t._v(" "),r("div",{staticClass:"footer",attrs:{flex:""}},[r("router-link",{staticClass:"link",attrs:{"flex-box":"1",to:{path:"/register"},replace:""}},[t._v("立即注册")]),t._v(" "),r("router-link",{staticClass:"link",attrs:{"flex-box":"1",to:{path:"/find-password"},replace:""}},[t._v("忘记密码")])],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"logo-warp"},[r("img",{staticClass:"logo",attrs:{src:o(290)}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{flex:"main:right cross:center"}},[r("img",{staticClass:"input-img",attrs:{src:o(196)}})])}]}},288:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAsCAMAAABFXPg2AAAAYFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////98JRy6AAAAH3RSTlMACg8XJVJTVFVXfYyNprDR0tXW19vw8/T19vf4+vz+F4keOAAAAJBJREFUOMvt1EkSgyAURdEXldh32GPI3/8uHQSpYH1YAXdEcSZMeEAxaWLTUgD5Rt42AUmBRugQa1AwEJE6P0ynMjynL6Z0NtyCrY0cOfLNHc+d4aOumOrDMH1t7tnwnRrKclDP/21bEyBZvdwDQO/lPQOy3eH/6dFL0yzOBUZnan7vtUmI0OzlwFv6RnMqcAFSUUssosz97wAAAABJRU5ErkJggg=="},289:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAqCAYAAACk2+sZAAAAAXNSR0IArs4c6QAAApFJREFUWAntlz2LFEEQhp07EQ1EPQ8RQUUQ1AsFzcRIUBS8yMTA7PAX+CMOjdUfYGDiZy4iyH0Z+QmuiLAqKngnGAjenevzLjPDzFjdds3KGmjBy1S/XVXvdG33zGy2JsF6vV5G2DFwHBwBO8A46IHP4BOYAffAnSzLvnMdzBA9BZ6AVOsSeL61Kskj4GKqmhF3HW6D+wZImjaKealrLmGqT3oVIvHnLHFtmppRYATiKThQm6gPPjDsAMXuB1tByF4xsY8N9yMU0OcRPh25+/fMabOVN4w/Cs6CJRCyk1FRTZJ5JZD9GF5HyDTmdgHtaMsumUlVkqyOkbkCd6gaZ/nEqBuWzVnxJUdGBpaNzFtl0G8ccheMfO2JmmlzVG0zg7VVIvcfGVyIWjAmtjS5pvBYMyAfPw/wFv3CINfRhdrDpCncHBc1lgsn4RqKLU+CaoSEEuoPFvJfeLD+ObL/Wqv1wNjGjV4AO8FGcAI07SHEuyYZGO+FP2jM3YBbAW/BtITv4xwFw7QHEtZdjA5TFa1VCeuDzWt6LN7Mkya5HvYW0GvQa1dJKDuEr2+zy94i3hV/ZGV7+Jr4Vl0honoOvwbbq3zM9x6nmaaoiuecvquTzSu8Gqkcm/slzdvqJSrsZoVfq5Votc7/GxB6rVbD+753xXqh30VofVEp928zThZVrnfFhd4Eq+6/8BGegHxWTKRe2wh/ofgYwv3zj7Be8PoJNqWKKs7bauXMF6Ia5P68fI+1EZ4zBGYNLkq1EbZEXGdYd9TmNx6nvfozXhq/s3Z0jSsnA453xZ2mqOrCLXJ5GdAwaevj3QzMyUVWdyYQIPFka9Pq5OKxQG+rY7Vcc/+mcNfVoz8T3FWrp8AwxaU19RPYr/Vv826OXQAAAABJRU5ErkJggg=="},290:function(t,e,o){t.exports=o.p+"logo.537c392a.png"},87:function(t,e,o){var r=o(34)(o(283),o(287),null,null);t.exports=r.exports}});