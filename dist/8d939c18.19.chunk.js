webpackJsonp([19],{109:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(386),o=t(395),r=t(34),a=r(i.a,o.a,null,null,null);n.default=a.exports},137:function(e,n,t){e.exports=t.p+"share-icon.44e035ec.png"},138:function(e,n,t){"use strict";var i=t(139),o=t.n(i),r=t(15),a=t(7),s=t(137),c=function(e){o.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},d=function(e){var n={url:window.location.href};a.a.ios&&(n.url=window.shareUrl);var t={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:s,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};r.a.get("/wechat/shareInfo",n).then(function(e){200==e.code&&(c(e.data.shareInfo),o.a.ready(function(){u(t),l(t)}))})},u=function(e,n){o.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})},l=function(e,n){o.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})};n.a={wx:o.a,config:c,getShare:d}},139:function(e,n){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}!function(n,i){e.exports=function(e,n){function i(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,r(t),function(e){c(n,e,i)}):l(n,i)}function o(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){i&&i.trigger&&i.trigger(e),c(n,e,t)}):i?l(n,i):l(n,t)}function r(e){return e=e||{},e.appId=P.appId,e.verifyAppId=P.appId,e.verifySignType="sha1",e.verifyTimestamp=P.timestamp+"",e.verifyNonceStr=P.nonceStr,e.verifySignature=P.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=d(e,i),n.errMsg=i),t=t||{},t._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",P.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function d(e,n){var t=e,i=x[t];i&&(t=i);var o="ok";if(n){var r=n.indexOf(":");o=n.substring(r+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==t&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=t+":"+o}function u(e){if(e){for(var n=0,t=e.length;t>n;++n){var i=e[n],o=v[i];o&&(e[n]=o)}return e}}function l(e,n){if(!(!P.debug||n&&n.isInnerInvoke)){var t=x[e];t&&(e=t),n&&n._complete&&delete n._complete}}function f(e){if(!(w||k||P.debug||"6.0.2">O||E.systemType<0)){var n=new Image;E.appId=P.appId,E.initTime=M.initEndTime-M.initStartTime,E.preVerifyTime=M.preVerifyEndTime-M.preVerifyStartTime,B.getNetworkType({isInnerInvoke:!0,success:function(e){E.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+E.version+"&o="+E.isPreVerifyOk+"&s="+E.systemType+"&c="+E.clientVersion+"&a="+E.appId+"&n="+E.networkType+"&i="+E.initTime+"&p="+E.preVerifyTime+"&u="+E.url;n.src=t}})}}function p(){return(new Date).getTime()}function m(n){I&&(e.WeixinJSBridge?n():y.addEventListener&&y.addEventListener("WeixinJSBridgeReady",n,!1))}function h(){B.invoke||(B.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,r(t),i)},B.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var g,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},x=function(){var e={};for(var n in v)e[v[n]]=n;return e}(),y=e.document,_=y.title,b=navigator.userAgent.toLowerCase(),S=navigator.platform.toLowerCase(),w=!(!S.match("mac")&&!S.match("win")),k=-1!=b.indexOf("wxdebugger"),I=-1!=b.indexOf("micromessenger"),T=-1!=b.indexOf("android"),C=-1!=b.indexOf("iphone")||-1!=b.indexOf("ipad"),O=function(){var e=b.match(/micromessenger\/(\d+\.\d+\.\d+)/)||b.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),M={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},E={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:C?1:T?2:-1,clientVersion:O,url:encodeURIComponent(location.href)},P={},N={_completes:[]},L={state:0,data:{}};m(function(){M.initEndTime=p()});var V=!1,R=[],B=(g={config:function(e){P=e,l("config",e);var n=!1!==P.check;m(function(){if(n)i(v.config,{verifyJsApiList:u(P.jsApiList)},function(){N._complete=function(e){M.preVerifyEndTime=p(),L.state=1,L.data=e},N.success=function(e){E.isPreVerifyOk=0},N.fail=function(e){N._fail?N._fail(e):L.state=-1};var e=N._completes;return e.push(function(){f()}),N.complete=function(n){for(var t=0,i=e.length;i>t;++t)e[t]();N._completes=[]},N}()),M.preVerifyStartTime=p();else{L.state=1;for(var e=N._completes,t=0,o=e.length;o>t;++t)e[t]();N._completes=[]}}),P.beta&&h()},ready:function(e){0!=L.state?e():(N._completes.push(e),!I&&P.debug&&e())},error:function(e){"6.0.2">O||(-1==L.state?e(L.data):N._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var t in n){var i=x[t];i&&(n[i]=n[t],delete n[t])}return e};i("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(T){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=n(e)},e}())},onMenuShareTimeline:function(e){o(v.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||_,desc:e.title||_,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(v.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||_,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(v.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(v.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(v.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(T){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},getLocation:function(e){},previewImage:function(e){i(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===V?(V=!0,i("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(V=!1,R.length>0){var n=R.shift();wx.getLocalImgData(n)}},e}())):R.push(e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),o=n.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},t(g,"getLocation",function(e){e=e||{},i(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),t(g,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),t(g,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),t(g,"closeWindow",function(e){e=e||{},i("closeWindow",{},e)}),t(g,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),t(g,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),t(g,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),t(g,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),t(g,"scanQRCode",function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(C){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e}())}),t(g,"openAddress",function(e){i(v.openAddress,{},function(){return e._complete=function(e){e=s(e)},e}())}),t(g,"openProductSpecificView",function(e){i(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),t(g,"addCard",function(e){for(var n=e.cardList,t=[],o=0,r=n.length;r>o;++o){var a=n[o],s={card_id:a.cardId,card_ext:a.cardExt};t.push(s)}i(v.addCard,{card_list:t},function(){return e._complete=function(e){var n=e.card_list;if(n){n=JSON.parse(n);for(var t=0,i=n.length;i>t;++t){var o=n[t];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e}())}),t(g,"chooseCard",function(e){i("chooseCard",{app_id:P.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),t(g,"openCard",function(e){for(var n=e.cardList,t=[],o=0,r=n.length;r>o;++o){var a=n[o],s={card_id:a.cardId,code:a.code};t.push(s)}i(v.openCard,{card_list:t},e)}),t(g,"consumeAndShareCard",function(e){i(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),t(g,"chooseWXPay",function(e){i(v.chooseWXPay,a(e),e)}),t(g,"openEnterpriseRedPacket",function(e){i(v.openEnterpriseRedPacket,a(e),e)}),t(g,"startSearchBeacons",function(e){i(v.startSearchBeacons,{ticket:e.ticket},e)}),t(g,"stopSearchBeacons",function(e){i(v.stopSearchBeacons,{},e)}),t(g,"onSearchBeacons",function(e){o(v.onSearchBeacons,e)}),t(g,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),g),A=1,W={};return y.addEventListener("error",function(e){if(!T){var n=e.target,t=n.tagName,i=n.src;if("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=A++,n["wx-id"]=o),W[o])return;W[o]=!0,wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}}}},!0),y.addEventListener("load",function(e){if(!T){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(W[i]=!1)}}},!0),n&&(e.wx=e.jWeixin=B),B}}(n)}(window)},161:function(e,n,t){"use strict";t.d(n,"c",function(){return d}),t.d(n,"d",function(){return u}),t.d(n,"e",function(){return l}),t.d(n,"b",function(){return f});var i="成都市、杭州市、武汉市、南京市、重庆市、西安市、长沙市、青岛市、沈阳市、大连市、厦门市、苏州市、宁波市、无锡市",o="福州市、合肥市、郑州市、哈尔滨市、佛山市、济南市、东莞市、昆明市、太原市、南昌市、南宁市、温州市、石家庄市、长春市、泉州市、\n贵阳市、常州市、珠海市、金华市、烟台市、海口市、惠州市、乌鲁木齐市、徐州市、潍坊市、洛阳市、南通市、嘉兴市、扬州市、汕头市",r=[{name:"北京",value:5766,zip:"010"},{name:"上海",value:6689,zip:"021"},{name:"广州",value:5374,zip:"020"},{name:"深圳",value:6284,zip:"0755"},{name:"天津",value:3870,zip:"022"}],a=[{name:"北京",value:3355},{name:"上海",value:3746},{name:"广州",value:3200},{name:"深圳",value:3615},{name:"天津",value:2525}],s=[{name:"北京",value:1.4},{name:"上海",value:2},{name:"广州",value:2.7},{name:"深圳",value:2.3},{name:"天津",value:2.1}],c=[{name:"北京",value:2151719},{name:"上海",value:1518384},{name:"广州",value:1507958},{name:"深圳",value:2851128},{name:"天津",value:942983}],d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!e)return 3113;for(var n in r)if(e.indexOf(r[n].name)>-1)return r[n].value;return i.indexOf(e)>-1?4004:o.indexOf(e)>-1?3702:3113},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!e)return 1868;for(var n in a)if(e.indexOf(a[n].name)>-1)return a[n].value;return i.indexOf(e)>-1?2442:o.indexOf(e)>-1?2184:1868},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!e)return 2.1;for(var n in s)if(e.indexOf(s[n].name)>-1)return s[n].value;return i.indexOf(e)>-1?1.9:o.indexOf(e)>-1?2:2.1},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!e)return 610575;for(var n in c)if(e.indexOf(c[n].name)>-1)return c[n].value;return i.indexOf(e)>-1?796509:o.indexOf(e)>-1?762466:610575};n.a={gradeOne:i,gradeTwo:o,gradeHot:"北京、上海、广州、深圳、天津",hotD:r}},386:function(e,n,t){"use strict";var i=t(387),o=(t.n(i),t(389)),r=t.n(o),a=t(390),s=(t.n(a),t(392)),c=t.n(s),d=t(3),u=t.n(d),l=t(393),f=(t.n(l),t(15)),p=t(161),m=t(138),h=t(7),g=t(17);u.a.component(c.a.name,c.a),u.a.component(r.a.name,r.a),n.a={data:function(){return{cityName:"北京",hotD:p.a.hotD,activeBtn:"010",citys:[]}},created:function(){var e=this;h.a.isWeixin&&this.getShare(),f.a.getNode("/assets/getCities").then(function(n){e.citys=n.data})},computed:{cityCopy:function(){var e={};return this.citys.map(function(n){var t=n.pinyin[0];e[t]?e[t].push(n):e[t]=[n]}),e}},mounted:function(){this.$refs.mintList.currentHeight=this.$refs.content.clientHeight-20;var e="养老理财规划";"house-one"==this.$route.name&&(e="住房理财规划"),h.a.kingold&&Object(g.a)({tagname:"title",param:{backtype:2,backAndRefresh:1,title:e,backstr:"退出理财规划将不会保存，确认退出？",keyboard_mode:0}})},methods:{getShare:function(){m.a.getShare({title:"快看我的理财规划，原来我可以这么有钱！",desc:"金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？"})},clickHandle:function(e){this.activeBtn=e.zip,this.cityName=e.name},nextHandle:function(){-1===this.cityName.indexOf("市")&&(this.cityName=this.cityName+"市"),window.sessionStorage.setItem("cityName",this.cityName),"house-one"==this.$route.name?this.$router.push("/house-two"):this.$router.push("/pension-two")}}}},387:function(e,n,t){var i=t(388);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;t(14)(i,o);i.locals&&(e.exports=i.locals)},388:function(e,n,t){n=e.exports=t(13)(void 0),n.push([e.i,".mint-indexsection{padding:0;margin:0}.mint-indexsection-index{margin:0;padding:10px;background-color:#fafafa}.mint-indexsection-index+ul{padding:0}",""])},389:function(e,n){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=220)}({0:function(e,n){e.exports=function(e,n,i,o,r){var a,s=e=e||{},c=t(e.default);"object"!==c&&"function"!==c||(a=e,s=e.default);var d="function"==typeof s?s.options:s;n&&(d.render=n.render,d.staticRenderFns=n.staticRenderFns),o&&(d._scopeId=o);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},d._ssrRegister=u):i&&(u=i),u){var l=d.functional,f=l?d.render:d.beforeCreate;l?d.render=function(e,n){return u.call(n),f(e,n)}:d.beforeCreate=f?[].concat(f,u):[u]}return{esModule:a,exports:s,options:d}}},140:function(e,n,t){function i(e){t(98)}var o=t(0)(t(62),t(167),i,null,null);e.exports=o.exports},167:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("li",{staticClass:"mint-indexsection"},[t("p",{staticClass:"mint-indexsection-index"},[e._v(e._s(e.index))]),e._v(" "),t("ul",[e._t("default")],2)])},staticRenderFns:[]}},220:function(e,n,t){e.exports=t(28)},28:function(e,n,t){"use strict";var i=t(140),o=t.n(i);Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"default",function(){return o.a})},62:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"mt-index-section",props:{index:{type:String,required:!0}},mounted:function(){this.$parent.sections.push(this)},beforeDestroy:function(){var e=this.$parent.sections.indexOf(this);e>-1&&this.$parent.sections.splice(e,1)}}},98:function(e,n){}})},390:function(e,n,t){var i=t(391);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;t(14)(i,o);i.locals&&(e.exports=i.locals)},391:function(e,n,t){n=e.exports=t(13)(void 0),n.push([e.i,".mint-indexlist{width:100%;position:relative;overflow:hidden}.mint-indexlist-content{margin:0;padding:0;overflow:auto}.mint-indexlist-nav{position:absolute;top:0;bottom:0;right:0;background-color:#fff;border-left:1px solid #ddd;text-align:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.mint-indexlist-nav,.mint-indexlist-navlist{margin:0;max-height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mint-indexlist-navlist{padding:0;list-style:none}.mint-indexlist-navitem{padding:2px 6px;font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none}.mint-indexlist-indicator{position:absolute;width:50px;height:50px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;line-height:50px;background-color:rgba(0,0,0,.7);border-radius:5px;color:#fff;font-size:22px}",""])},392:function(e,n){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=219)}({0:function(e,n){e.exports=function(e,n,i,o,r){var a,s=e=e||{},c=t(e.default);"object"!==c&&"function"!==c||(a=e,s=e.default);var d="function"==typeof s?s.options:s;n&&(d.render=n.render,d.staticRenderFns=n.staticRenderFns),o&&(d._scopeId=o);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},d._ssrRegister=u):i&&(u=i),u){var l=d.functional,f=l?d.render:d.beforeCreate;l?d.render=function(e,n){return u.call(n),f(e,n)}:d.beforeCreate=f?[].concat(f,u):[u]}return{esModule:a,exports:s,options:d}}},139:function(e,n,t){function i(e){t(97)}var o=t(0)(t(61),t(166),i,null,null);e.exports=o.exports},166:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"mint-indexlist"},[t("ul",{ref:"content",staticClass:"mint-indexlist-content",style:{height:e.currentHeight+"px","margin-right":e.navWidth+"px"}},[e._t("default")],2),e._v(" "),t("div",{ref:"nav",staticClass:"mint-indexlist-nav",on:{touchstart:e.handleTouchStart}},[t("ul",{staticClass:"mint-indexlist-navlist"},e._l(e.sections,function(n){return t("li",{staticClass:"mint-indexlist-navitem"},[e._v(e._s(n.index))])}))]),e._v(" "),e.showIndicator?t("div",{directives:[{name:"show",rawName:"v-show",value:e.moving,expression:"moving"}],staticClass:"mint-indexlist-indicator"},[e._v(e._s(e.currentIndicator))]):e._e()])},staticRenderFns:[]}},219:function(e,n,t){e.exports=t(27)},27:function(e,n,t){"use strict";var i=t(139),o=t.n(i);Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"default",function(){return o.a})},61:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"mt-index-list",props:{height:Number,showIndicator:{type:Boolean,default:!0}},data:function(){return{sections:[],navWidth:0,indicatorTime:null,moving:!1,firstSection:null,currentIndicator:"",currentHeight:this.height,navOffsetX:0}},watch:{sections:function(){this.init()},height:function(e){e&&(this.currentHeight=e)}},methods:{init:function(){var e=this;this.$nextTick(function(){e.navWidth=e.$refs.nav.clientWidth});var n=this.$refs.content.getElementsByTagName("li");n.length>0&&(this.firstSection=n[0])},handleTouchStart:function(e){"LI"===e.target.tagName&&(this.navOffsetX=e.changedTouches[0].clientX,this.scrollList(e.changedTouches[0].clientY),this.indicatorTime&&clearTimeout(this.indicatorTime),this.moving=!0,window.addEventListener("touchmove",this.handleTouchMove),window.addEventListener("touchend",this.handleTouchEnd))},handleTouchMove:function(e){e.preventDefault(),this.scrollList(e.changedTouches[0].clientY)},handleTouchEnd:function(){var e=this;this.indicatorTime=setTimeout(function(){e.moving=!1,e.currentIndicator=""},500),window.removeEventListener("touchmove",this.handleTouchMove),window.removeEventListener("touchend",this.handleTouchEnd)},scrollList:function(e){var n=document.elementFromPoint(this.navOffsetX,e);if(n&&n.classList.contains("mint-indexlist-navitem")){this.currentIndicator=n.innerText;var t,i=this.sections.filter(function(e){return e.index===n.innerText});i.length>0&&(t=i[0].$el,this.$refs.content.scrollTop=t.getBoundingClientRect().top-this.firstSection.getBoundingClientRect().top)}}},mounted:function(){this.currentHeight||(this.currentHeight=document.documentElement.clientHeight-this.$refs.content.getBoundingClientRect().top),this.init()}}},97:function(e,n){}})},393:function(e,n,t){var i=t(394);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;t(14)(i,o);i.locals&&(e.exports=i.locals)},394:function(e,n,t){n=e.exports=t(13)(void 0),n.push([e.i,'.pension-one{width:100%;height:100%;background-color:#fff}.pension-one .body{padding:0 .8rem}.pension-one .body .title{color:#6e3018;padding:.3rem 0}.pension-one .body .content{border:2px solid red;position:relative;-o-border-image:linear-gradient(#97461a,#ecc2ac,#8a472e,#a47864,#efdbcd) 30 30;border-image:-webkit-gradient(linear,left top,left bottom,from(#97461a),color-stop(#ecc2ac),color-stop(#8a472e),color-stop(#a47864),to(#efdbcd)) 30 30;border-image:linear-gradient(#97461a,#ecc2ac,#8a472e,#a47864,#efdbcd) 30 30}.pension-one .body .content .section{padding:0 .8rem .8rem}.pension-one .body .content .section .hot-city p{padding:.3rem 2.2rem;border:1px solid #d8bdad;margin:.25rem .5rem;border-radius:5px;float:left}.pension-one .body .content .section .hot-city .active{border-color:#6e3018;color:#6e3018}.pension-one .body .content .section .hot-city:after{clear:both;content:".";display:block;width:0;height:0;visibility:hidden}.pension-one .body .content .mint-indexlist{position:static}.pension-one .body .content .mint-indexlist .mint-indexsection .mint-indexsection-index{padding:0 .5rem;font-size:.8rem;color:#6e3018}.pension-one .body .content .mint-indexlist .mint-indexsection ul{padding:0 .8rem}.pension-one .body .content .mint-indexlist .mint-indexsection ul .item{color:#333;font-size:.8rem;padding:.6rem 0;list-style:none;border-bottom:1px solid #d8d8d8}.pension-one .body .content .mint-indexlist .mint-indexlist-nav,.pension-one .body .content .mint-indexlist .mint-indexsection ul .item:last-child{border:none}.pension-one .body .content .mint-indexlist .mint-indexlist-navitem{padding:0 .5rem 0 0}.pension-one .body .tip{color:#999;line-height:.9rem;padding:.6rem 0}.pension-one .body .tip span{color:#6e3018;font-size:.9rem}.pension-one .footer div{background-image:linear-gradient(-1deg,#7c4f2b,#8f6441 24%,#d8bd7e 70%,#eece83);text-align:center;font-size:1rem;color:#fff;padding:.45rem 0}.pension-one .footer .prev{margin-right:.15rem;border-radius:0 5px 0 0}.pension-one .footer .next{border-radius:5px 0 0 0}',""])},395:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"pension-one",attrs:{flex:"dir:top"}},[t("div",{staticClass:"body",attrs:{"flex-box":"1",flex:"dir:top"}},[t("div",{staticClass:"title",attrs:{"flex-box":"0"}},[e._v("\n            选择您所在的城市\n        ")]),e._v(" "),t("div",{ref:"content",staticClass:"content",attrs:{"flex-box":"1"}},[t("mt-index-list",{ref:"mintList"},[t("div",{staticClass:"section"},[t("div",{staticClass:"title"},[e._v("热门")]),e._v(" "),t("div",{staticClass:"hot-city"},e._l(this.hotD,function(n,i){return t("p",{key:i,class:{active:n.zip==e.activeBtn},on:{click:function(t){e.clickHandle(n)}}},[e._v(e._s(n.name))])}))]),e._v(" "),e._l(e.cityCopy,function(n,i){return t("mt-index-section",{key:i,attrs:{index:i}},e._l(n,function(n,i){return t("li",{key:i,staticClass:"item",on:{click:function(t){e.clickHandle(n)}}},[e._v("\n                        "+e._s(n.name)+"\n                    ")])}))})],2)],1),e._v(" "),t("div",{staticClass:"tip"},[e._v("当前选择："),t("span",[e._v(e._s(this.cityName))])])]),e._v(" "),t("div",{staticClass:"footer",attrs:{"flex-box":"0",flex:""}},[t("div",{staticClass:"prev",attrs:{"flex-box":"1"},on:{click:function(n){n.stopPropagation(),e.$router.back()}}},[e._v("上一步")]),e._v(" "),t("div",{staticClass:"next",attrs:{"flex-box":"1"},on:{click:function(n){n.stopPropagation(),e.nextHandle(n)}}},[e._v("下一步")])])])},o=[],r={render:i,staticRenderFns:o};n.a=r}});