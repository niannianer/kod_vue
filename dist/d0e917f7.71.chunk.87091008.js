webpackJsonp([71],{549:function(t,e,n){"use strict";var a=n(17),i=n(550);n.n(i);e.a={name:"manager",data:function(){return{list:[]}},created:function(){var t=this;a.a.get("/fund/info/manager",{fundCode:this.$route.query.code}).then(function(e){200==e.code&&(t.list=e.data.list)})},computed:{},methods:{},destroyed:function(){}}},550:function(t,e,n){var a=n(551);"string"==typeof a&&(a=[[t.i,a,""]]);var i={};i.transform=void 0;n(5)(a,i);a.locals&&(t.exports=a.locals)},551:function(t,e,n){e=t.exports=n(4)(void 0),e.push([t.i,".manager{width:100%;height:100%;background:#fff;color:#000}.manager .item{padding:1rem .8rem}.manager .item .content{padding-top:.5rem;line-height:1.2rem}",""])},552:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"manager"},t._l(t.list,function(e,a){return n("div",{staticClass:"item"},[n("p",{staticClass:"title"},[t._v(t._s(e.name))]),t._v(" "),n("p",{staticClass:"content",domProps:{innerHTML:t._s(e.description)}})])}))},i=[],r={render:a,staticRenderFns:i};e.a=r},94:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(549),i=n(552),r=n(34),s=r(a.a,i.a,null,null,null);e.default=s.exports}});