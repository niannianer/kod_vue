webpackJsonp([43],{453:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(454);e.n(i);n.default={name:"base",data:function(){return{}},created:function(){},computed:{},methods:{getPage:function(t){"house"==t?this.$router.push("/house-one"):this.$router.push("/pension-one")},pathTo:function(t,n){if(n)return window.location.href=t,!1;this.$router.push(t)}},destroyed:function(){}}},454:function(t,n,e){var i=e(455);"string"==typeof i&&(i=[[t.i,i,""]]);var o={};o.transform=void 0;e(13)(i,o);i.locals&&(t.exports=i.locals)},455:function(t,n,e){n=t.exports=e(12)(void 0),n.push([t.i,".planning{position:relative;width:100%;height:100%;background-color:#46585b}.planning .img img{width:100%;height:auto}.planning .nav{background:#fff;box-shadow:inset 0 2px 1px 0 rgba(0,0,0,.2);text-align:center;padding:.3rem 0}.planning .nav img{width:1.3rem}",""])},456:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"planning",attrs:{flex:"dir:top"}},[i("div",{staticStyle:{overflow:"auto"},attrs:{flex:"dir:top","flex-box":"1"}},[t._m(0),t._v(" "),i("div",{staticClass:"img",attrs:{"flex-box":"0"},on:{click:function(n){n.stopPropagation(),t.getPage("pension")}}},[i("img",{attrs:{src:e(457)}})]),t._v(" "),i("div",{staticClass:"img",attrs:{"flex-box":"0"},on:{click:function(n){n.stopPropagation(),t.getPage("house")}}},[i("img",{attrs:{src:e(458)}})])])])},staticRenderFns:[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"img",attrs:{"flex-box":"1"}},[i("img",{attrs:{src:e(459)}})])}]}},457:function(t,n,e){t.exports=e.p+"planning-2.1b37ae85.png"},458:function(t,n,e){t.exports=e.p+"planning-3.327bd129.png"},459:function(t,n,e){t.exports=e.p+"planning-1.3ebe0d2d.png"},97:function(t,n,e){var i=e(25)(e(453),e(456),null,null);t.exports=i.exports}});