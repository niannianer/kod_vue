webpackJsonp([43],{277:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(17),n=i(19),o=i(361);i.n(o);e.default={name:"usable-financial",data:function(){return{lists:[],currentPage:0,pageSize:10,stop:!0}},created:function(){this.loadData()},computed:{},methods:{toDetail:function(t){this.$router.push({path:"/fixi-goods-detail",query:{productUuid:t}})},loadMore:function(){this.stop=!0,this.currentPage++,this.loadData()},loadData:function(){var t=this;a.a.get("/adaptProduct/list",{ccCode:this.$route.query.ccCode,startRow:this.currentPage*this.pageSize,pageSize:this.pageSize}).then(function(e){200==e.code&&(e.data.list.map(function(t){t.annualInterestRate=i.i(n.numMulti)(t.annualInterestRate,100)}),t.lists=e.data.list,t.lists.length<e.data.count?t.stop=!1:t.stop=!0)})}},destroyed:function(){}}},320:function(t,e,i){e=t.exports=i(51)(void 0),e.push([t.i,".usable-financial .body{padding:0 .8rem}.usable-financial .body .item{box-shadow:0 1px 3px 0 hsla(0,0%,71%,.5);background-color:#fff;padding:0 .8rem;margin-top:.5rem}.usable-financial .body .item .title{color:#323232;font-size:.8rem;line-height:.8rem;padding:.8rem 0}.usable-financial .body .item .info{padding-bottom:.8rem}",""])},361:function(t,e,i){var a=i(320);"string"==typeof a&&(a=[[t.i,a,""]]);var n={};n.transform=void 0;i(52)(a,n);a.locals&&(t.exports=a.locals)},413:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"usable-financial"},[i("div",{staticClass:"body"},[i("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"stop","infinite-scroll-distance":"10"}},t._l(t.lists,function(e,a){return i("li",{staticClass:"item",on:{click:function(i){i.stopPropagation(),t.toDetail(e.productUuid)}}},[i("p",{staticClass:"title"},[t._v(t._s(e.productAbbrName))]),t._v(" "),i("div",{staticClass:"info",attrs:{flex:""}},[i("p",{attrs:{"flex-box":"1"}},[t._v("预期年化收益率"+t._s(e.annualInterestRate)+"%")]),t._v(" "),i("p",{attrs:{"flex-box":"0"}},[t._v("期限"+t._s(e.productPeriod)+"天")])])])}))])])},staticRenderFns:[]}},99:function(t,e,i){var a=i(28)(i(277),i(413),null,null);t.exports=a.exports}});