webpackJsonp([64],{101:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(581),i=s(584),a=s(34),n=a(r.a,i.a,null,null,null);e.default=n.exports},482:function(t,e,s){t.exports=s.p+"submit-sucess.820686d6.png"},581:function(t,e,s){"use strict";var r=(s(17),s(582));s.n(r);e.a={name:"bulletin",data:function(){return{orderId:"",tradeShare:"",timer:"",orderConfirmDate:""}},created:function(){this.tradeShare=this.$route.query.s,this.orderConfirmDate=this.$route.query.d},computed:{},methods:{getStatus:function(){this.orderId},pathTo:function(t){this.$router.push(t)}},destroyed:function(){clearTimeout(this.timer)}}},582:function(t,e,s){var r=s(583);"string"==typeof r&&(r=[[t.i,r,""]]);var i={};i.transform=void 0;s(5)(r,i);r.locals&&(t.exports=r.locals)},583:function(t,e,s){e=t.exports=s(4)(void 0),e.push([t.i,".redeem-result .header{text-align:center;padding:1rem 0}.redeem-result .header .img{width:3rem;height:3rem}.redeem-result .header .status-text{font-size:.8rem;margin-top:.4rem}.redeem-result .content{background:#fff;padding:.8rem 1rem}.redeem-result .success .status-text{color:#1d72c0}.redeem-result .success .content{color:#333}.redeem-result .success .content .item{height:2.7rem}.redeem-result .success .content .orange{color:#ff6500;margin-top:.2rem}.redeem-result .success .content .left{width:1.5rem;margin-right:.4rem}.redeem-result .success .content .left .spot{border-radius:50%;background:#1d72c0;width:1.5rem;height:1.5rem;text-align:center;line-height:1.5rem;color:#fff}.redeem-result .success .content .left .line{width:2px;height:1.5rem;background:#1d72c0;margin:0 auto}.redeem-result .success .content .left.last .line,.redeem-result .success .content .left.last .spot{background:#d1d1d1}.redeem-result .success .buttom{background:#1d72c0;color:#fff;height:2.5rem;line-height:2.5rem;width:100%;position:fixed;bottom:0;left:0;border-radius:0;font-size:.9rem}",""])},584:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"redeem-result"},[s("div",{staticClass:"success"},[t._m(0),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"item",attrs:{flex:""}},[t._m(1),t._v(" "),s("div",{staticClass:"right",attrs:{"flex-box":"1"}},[t._v("\n                    赎回已提交\n                    "),s("div",{staticClass:"orange"},[t._v(t._s(t.tradeShare)+"份")])])]),t._v(" "),s("div",{staticClass:"item",attrs:{flex:"cross:bottom"}},[t._m(2),t._v(" "),s("div",{staticClass:"right",attrs:{"flex-box":"1"}},[t._v("\n                    等待基金公司确认\n                    "),s("div",{staticClass:"orange"},[t._v("预计到账日期："+t._s(t.orderConfirmDate))])])])]),t._v(" "),s("button",{staticClass:"buttom",on:{click:function(e){e.stopPropagation(),t.pathTo("/funds/my-fund")}}},[t._v("查看我的账户")])])])},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header"},[r("img",{staticClass:"img",attrs:{src:s(482)}}),t._v(" "),r("div",{staticClass:"status-text"},[t._v("提交成功")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"left",attrs:{"flex-box":"0"}},[s("div",{staticClass:"spot"},[t._v("1")]),t._v(" "),s("div",{staticClass:"line"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"left last",attrs:{"flex-box":"0"}},[s("div",{staticClass:"line"}),t._v(" "),s("div",{staticClass:"spot"},[t._v("2")])])}],a={render:r,staticRenderFns:i};e.a=a}});