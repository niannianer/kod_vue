webpackJsonp([52],{101:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e(348),a=e(351),l=e(34),o=l(i.a,a.a,null,null,null);s.default=o.exports},348:function(t,s,e){"use strict";var i=e(349),a=(e.n(i),e(15));e(35);s.a={name:"invest-detail",data:function(){return{lists:[],status:this.$route.query.status,expectProfitTitle:""}},created:function(){var t=this;this.expectProfitTitle=1==this.status?"预期收益":"实际收益",a.a.get("/investment/detail",{orderBillCode:this.$route.query.orderBillCode}).then(function(s){return 200==s.code&&(t.lists=s.data),s});var s=["_trackEvent","我的投资详情","SHOW","进入我的投资详情页面","进入我的投资详情页面"];window._hmt.push(s)},methods:{linkpdf:function(){var t=this.lists.subcontractFilepath;t=t.replace(/^http\.*:/,"https:"),window.location.href="/pdf/web/viewer.html?src="+encodeURIComponent(t)+"&name="+encodeURIComponent("认购相关协议")}}}},349:function(t,s,e){var i=e(350);"string"==typeof i&&(i=[[t.i,i,""]]);var a={};a.transform=void 0;e(14)(i,a);i.locals&&(t.exports=i.locals)},350:function(t,s,e){s=t.exports=e(13)(void 0),s.push([t.i,".invest-detail{width:100%;height:100%}.invest-detail .body{font-size:.7rem;color:#666}.invest-detail .body .items{background-color:#fff;padding:0 .8rem}.invest-detail .body .items p{padding:.55rem 0}.invest-detail .body .items .bl{border-bottom:1px solid #dedede}.invest-detail .body .items .product-name{margin-left:.5rem;text-align:right}",""])},351:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"invest-detail",attrs:{flex:"dir:top","flex-box":"1"}},[e("div",{staticClass:"body",attrs:{"flex-box":"1"}},[e("div",{staticClass:"items",attrs:{"flex-box":"0",flex:"dir:top"}},[e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("订单号")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.orderBillCode))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("购买时间")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.payedTime))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:"box:first"}},[e("p",[t._v("产品名称")]),t._v(" "),e("p",{staticClass:"product-name"},[t._v(t._s(this.lists.productAbbrName))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("购买金额")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(t._f("currencyInput")(this.lists.orderAmount))+"元")])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("预期年化收益率")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.productAnnualInterestRate))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v(t._s(t.expectProfitTitle))]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.expectedProfitAmount))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("产品期限")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.productPeriod))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("起息日")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.productInterestDate))])]),t._v(" "),e("div",{staticClass:"bl",attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("到期日")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.productExpiringDate))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1==this.status,expression:"this.status==1"}],attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("预期收款日")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.productPaymentDate))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:2==this.status,expression:"this.status==2"}],attrs:{"flex-box":"1",flex:""}},[e("p",{attrs:{"flex-box":"1"}},[t._v("兑付日")]),t._v(" "),e("p",{attrs:{"flex-box":"0"}},[t._v(t._s(this.lists.cashDate))])])]),t._v(" "),this.lists.subcontractFilepath?e("div",[e("span",{staticStyle:{color:"#1D72C0",display:"block",padding:".5rem 0 0 .8rem"},on:{click:function(s){s.stopPropagation(),t.linkpdf(s)}}},[t._v("《认购相关协议》")])]):t._e()])])},a=[],l={render:i,staticRenderFns:a};s.a=l}});