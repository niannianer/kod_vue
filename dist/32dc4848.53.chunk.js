webpackJsonp([53],{125:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(497),s=e(500),l=e(34),r=l(n.a,s.a,null,null,null);i.default=r.exports},497:function(t,i,e){"use strict";var n=e(498);e.n(n);i.a={name:"bank-list",data:function(){return{list:[["工商银行","农业银行","中国银行"],["建设银行","民生银行","交通银行"],["光大银行","广发银行","兴业银行"],["平安银行","浦发银行","上海银行"],["邮储银行","中信银行","招商银行"],["华夏银行","",""]]}},methods:{}}},498:function(t,i,e){var n=e(499);"string"==typeof n&&(n=[[t.i,n,""]]);var s={};s.transform=void 0;e(14)(n,s);n.locals&&(t.exports=n.locals)},499:function(t,i,e){i=t.exports=e(13)(void 0),i.push([t.i,".bank-list{position:relative;width:100%;height:100%}.bank-list .bank-box{padding-top:1rem}.bank-list .bank-box .list{width:15rem;margin:0 auto}.bank-list .bank-box .list li{border-right:1px solid #999;border-bottom:1px solid #999;width:5rem;height:2.4rem;line-height:2.4rem;text-align:center;font-size:.8rem}.bank-list .bank-box .list li.top{border-top:1px solid #999}.bank-list .bank-box .list li.left{border-left:1px solid #999}",""])},500:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"bank-list",attrs:{"flex-box":"1",flex:"dir:top"}},[e("div",{staticClass:"bank-box"},t._l(t.list,function(i,n){return e("ul",{key:n,staticClass:"list",attrs:{flex:""}},t._l(i,function(i,s){return e("li",{key:s,class:{top:0==n,left:0==s}},[t._v(t._s(i))])}))}))])},s=[],l={render:n,staticRenderFns:s};i.a=l}});