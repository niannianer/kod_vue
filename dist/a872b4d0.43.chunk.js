webpackJsonp([43],{114:function(t,n,e){var i=e(39)(e(300),e(486),null,null);t.exports=i.exports},300:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(407);e.n(i);n.default={name:"base",data:function(){return{}},created:function(){},computed:{},methods:{getPage:function(t){"house"==t?this.$router.push("/house-one"):this.$router.push("/pension-one")},pathTo:function(t,n){if(n)return window.location.href=t,!1;this.$router.push(t)}},destroyed:function(){}}},356:function(t,n,e){n=t.exports=e(19)(void 0),n.push([t.i,".planning{position:relative;width:100%;height:100%;background-color:#46585b}.planning .img img{width:100%;height:auto}.planning .nav{background:#fff;box-shadow:inset 0 2px 1px 0 rgba(0,0,0,.2);text-align:center;padding:.3rem 0}.planning .nav img{width:1.3rem}",""])},407:function(t,n,e){var i=e(356);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;e(20)(i,o);i.locals&&(t.exports=i.locals)},458:function(t,n,e){t.exports=e.p+"planning-1.3ebe0d2d.png"},459:function(t,n,e){t.exports=e.p+"planning-2.1b37ae85.png"},460:function(t,n,e){t.exports=e.p+"planning-3.327bd129.png"},486:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"planning",attrs:{flex:"dir:top"}},[i("div",{staticStyle:{overflow:"auto"},attrs:{flex:"dir:top","flex-box":"1"}},[t._m(0),t._v(" "),i("div",{staticClass:"img",attrs:{"flex-box":"0"},on:{click:function(n){n.stopPropagation(),t.getPage("pension")}}},[i("img",{attrs:{src:e(459)}})]),t._v(" "),i("div",{staticClass:"img",attrs:{"flex-box":"0"},on:{click:function(n){n.stopPropagation(),t.getPage("house")}}},[i("img",{attrs:{src:e(460)}})])])])},staticRenderFns:[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"img",attrs:{"flex-box":"1"}},[i("img",{attrs:{src:e(458)}})])}]}}});