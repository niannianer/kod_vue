webpackJsonp([47],{120:function(e,t,s){var r=s(34)(s(472),s(475),null,null);e.exports=r.exports},161:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAAAXNSR0IArs4c6QAAAs9JREFUSA3tlU1oE1EQx5NsIqSEklrTQ3oxqbZQkAppkiYEyamotx6i5KAoiC34AYqCeMpND148epBeBKneGhQpFir1I5u0XoSKFAUvjSAlYCOFxmz9Tckr65q0q+1NHwwzbz7+M2923luH419fTtWAaDR62zCMox6PJ1soFN4r/W7yWCzWS46J9fX16fn5+WuC7VIJUJ5AHqjVapOJRGKv0u8WT6fTfpLnyXPY6XRKro21WQDKWw3dgbW1tccEuBv7HbNMJqNVq9VHJO8VMLjK5dAU+tLS0tvu7u597GNQiE50oXui7DvhbW1td0maFQwOeo/25xTeZgdE4fP5ruDwXGQCxgYHBy+IvJMFxihYlwQD7BklK8zNIVSKVCrVsbq6qrM/SMAP6FipVNooSvnY5SRPk3AKfw/0UdO0eLFYXDbH/1aAGAnsI7CA6Icqbrc7ruv6otjsrkgk0kPxOjid8G8kT4CxYI3/5RMo49zc3AfkkwTW4R31ej0vU6zs2/F4PN6Oz6QkhxtQtllywWlagBgYlCkArooM71tZWZmQaZb9ViuXy7ko+CE+/Q2/6xzoaauYLQHL5bLOzQgSHIF6KpWKH92zVmCi57rdoeDTItPBcQ5yQ+RWq2UHVABgFwF60dhf5sU8r2xWju2s6hq2l6FQaMzqY903HUKrE09oJ69YEfAwthoFDdPWGbMfQ5diPw3tgT5z96Ozs7NfzT7NZFsFSCCD1c+3fUMR7RSwDMW4np/ENjQ0tJ+Hq4gYgKpQkta/g2+7bBcgSFzP4xSQR5RPt8D1THi9XoMBfc3+EGRQ2AjdmUS2tbYcQisCT/NiMBj8jn4YClDMAP+NEeQjDd+bnPx+Q7bF/qgDCpHvPY58Ru2Fc/IHnPyUWWdH3vYWNAMJh8OjJHxlshUCgcA50962+FcdEPRkMtlF++UXq7lcrgwD+cV21v+Opg78BF/pGcQ4Dlt0AAAAAElFTkSuQmCC"},232:function(e,t,s){"use strict";t.a=[{category:"常见问题",qList:[{q:"如何绑定银行卡",a:"当您进行账户充值或者购买产品操作时，如果未开通支付账户并绑定银行卡，系统会自动提示您进行开户绑卡。首先进行实名认证，需输入姓名和身份证号。之后进行银行卡绑定，需输入：姓名、身份证号、银行卡号、银行预留手机号，进行绑定。"},{q:"如何解绑银行卡",a:"如遇到绑卡失败，可联系客服寻求帮助。"},{q:"何时发布产品",a:"平台上的产品是不定期发布的，是根据市场需要来决定的，请您多加关注。"},{q:"如何购买产品",a:"您可通过【理财】页面，选择定期理财中的相应产品，点击下方的立即投资，进行产品的购买。"},{q:"忘记登录密码怎么办",a:"在登录页面，点击忘记密码，即可重新设置。"}],openIndex:-1},{category:"充值提现",qList:[{q:"如何进行充值",a:"在App上或微信端，点击【我的】界面选择充值进行操作。如果尚未开户，会提示先开户绑卡。"},{q:"充值收费吗",a:"用户充值的手续费由平台垫付，用户无需支付任何充值手续费。"},{q:"充值多久能到账",a:"充值成功后，资金会立刻显示在余额中。如果没有显示，请联系客服为您核查。"},{q:"如何进行提现",a:"在App上或微信端，点击【我的】界面进行提现操作。"},{q:"提现收费吗",a:"每个月的前三笔提现手续费由平台承担，第四笔及之后的提现按照每笔2元收取。"},{q:"提现多久能到账",a:"提交提现申请后的T+1个工作日内到账（周末、节假日顺延）。"}],openIndex:-1},{category:"账户管理",qList:[{q:"如何查看收益",a:"您可以通过App或者微信，在【我的】界面上可以查看总资产及累计收益。"},{q:"交易密码忘了怎么办？",a:"您可以通过App或者微信，在【我的】界面，点击右上方设置按钮，进入设置界面，修改交易密码。"},{q:"如何查看流水",a:"您可以通过App或者微信，在【我的】界面上点击总资产进入账户页面，点击明细，即可查看所有交易流水。"},{q:"支持绑定多张银行卡吗",a:"平台实行同卡进出原则，为保障您的投资安全，仅支持绑定一张银行卡。"}],openIndex:-1}]},472:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(7),o=s(232),i=s(17),n=s(473);s.n(n);t.default={name:"base",data:function(){return{questions:o.a,isApp:!1}},created:function(){r.a.kingold&&(this.isApp=!0,Object(i.a)({tagname:"title",param:{backtype:1,backAndRefresh:1,title:"帮助中心",keyboard_mode:0}}))},computed:{},methods:{pathTo:function(e){this.$router.push({path:"/helpcenter-cate",query:{cate:e}})},fedback:function(){this.$router.push("/feedback")},callService:function(){Object(i.a)({tagname:"tel",param:{callService:"400-640-3606"}})}},destroyed:function(){}}},473:function(e,t,s){var r=s(474);"string"==typeof r&&(r=[[e.i,r,""]]);var o={};o.transform=void 0;s(14)(r,o);r.locals&&(e.exports=r.locals)},474:function(e,t,s){t=e.exports=s(13)(void 0),t.push([e.i,".helpcenter{width:100%;height:100%}.helpcenter .list{background:#fff;border-bottom:1px solid #d8d8d8}.helpcenter .list .category{width:5.5rem;text-align:center;font-size:.8rem;color:#333}.helpcenter .list .more{color:#88acff;line-height:1rem}.helpcenter .list .more p{margin-top:.1rem}.helpcenter .list .more span{font-size:1rem;font-weight:700}.helpcenter .list .questions-list{border-left:1px solid #d8d8d8}.helpcenter .list .questions-list .question-item{border-bottom:1px solid #d8d8d8;padding:.7rem .8rem}.helpcenter .list .questions-list .question-item img{width:.8rem;height:.55rem}.helpcenter .list .questions-list .question-item .collapse{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.helpcenter .list .questions-list .question-item:last-child{border-bottom:none}.helpcenter .list .questions-list .question-item .q{color:#333}.helpcenter .list .questions-list .question-item .a{padding-top:.4rem}.helpcenter .fedback,.helpcenter .service{background:#fff;text-align:center;font-size:.8rem;padding:.7rem 0;color:#333;margin-top:.5rem;border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8}.helpcenter .fedback img,.helpcenter .service img{width:.8rem;height:.55rem;-webkit-transform:rotate(270deg);transform:rotate(270deg)}.helpcenter .service{margin-bottom:2rem}.helpcenter .service .callnum{color:#88acff;font-size:1rem;text-decoration:none}.helpcenter .service .tip{font-size:.6rem;color:#666}",""])},475:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"helpcenter"},[e._l(e.questions,function(t,o){return r("div",{key:o,staticClass:"list",attrs:{flex:"cross:stretch"}},[r("div",{attrs:{flex:"cross:center","flex-box":"0"},on:{click:function(t){t.stopPropagation(),e.pathTo(o)}}},[r("div",{attrs:{flex:"dir:top"}},[r("p",{staticClass:"category"},[e._v(e._s(t.category))]),e._v(" "),e._m(0,!0)])]),e._v(" "),r("div",{staticClass:"questions-list",attrs:{"flex-box":"1"}},e._l(t.qList,function(o,i){return r("div",{key:i,staticClass:"question-item",attrs:{"flex-box":"1"}},[t.openIndex!=i?r("div",{attrs:{flex:"cross:center"},on:{click:function(s){if(!("button"in s)&&e._k(s.keyCode,"sop"))return null;t.openIndex=i}}},[r("p",{staticClass:"q",attrs:{"flex-box":"1"}},[e._v(e._s(o.q))]),e._v(" "),r("img",{attrs:{src:s(161),alt:"arrow","flex-box":"0"}})]):r("div",{attrs:{flex:"cross:center"},on:{click:function(s){if(!("button"in s)&&e._k(s.keyCode,"sop"))return null;t.openIndex=-1}}},[r("p",{staticClass:"q",attrs:{"flex-box":"1"}},[e._v(e._s(o.q))]),e._v(" "),r("img",{staticClass:"collapse",attrs:{src:s(161),alt:"arrow","flex-box":"0"}})]),e._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:t.openIndex==i,expression:"item.openIndex == index"}],staticClass:"a"},[e._v(e._s(o.a))])])}))])}),e._v(" "),r("div",{staticClass:"fedback",attrs:{flex:"cross:center"},on:{click:function(t){t.stopPropagation(),e.fedback(t)}}},[r("p",{attrs:{"flex-box":"1"}},[e._v("反馈其他问题、建议")]),e._v(" "),r("img",{attrs:{src:s(161),alt:"arrow","flex-box":"0"}})]),e._v(" "),r("div",{staticClass:"service"},[e.isApp?r("div",{staticClass:"callnum",on:{click:function(t){t.stopPropagation(),e.callService(t)}}},[e._v("400-640-3606")]):r("a",{staticClass:"callnum",attrs:{href:"tel:400-640-3606"}},[e._v("400-640-3606")]),e._v(" "),r("p",{staticClass:"tip"},[e._v("人工服务时间 工作日9：00-18：00")])])],2)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"more",attrs:{flex:"main:center"}},[s("p",[e._v("更多")]),s("span",[e._v(">")])])}]}}});