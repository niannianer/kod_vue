webpackJsonp([16],{103:function(e,t,n){var i=n(32)(n(362),n(369),null,null);e.exports=i.exports},133:function(e,t,n){e.exports=n.p+"share-icon.cfed3b76.png"},134:function(e,t,n){"use strict";var i=n(135),o=n.n(i),r=n(13),a=n(7),s=n(133),c=function(e){o.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},l=function(e){var t={url:window.location.href};a.a.ios&&(t.url=window.shareUrl);var n={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:s,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};r.a.get("/wechat/shareInfo",t).then(function(e){200==e.code&&(c(e.data.shareInfo),o.a.ready(function(){u(n),d(n)}))})},u=function(e,t){o.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})},d=function(e,t){o.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})};t.a={wx:o.a,config:c,getShare:l}},135:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(t,i){e.exports=function(e,t){function i(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,r(n),function(e){c(t,e,i)}):d(t,i)}function o(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){i&&i.trigger&&i.trigger(e),c(t,e,n)}):i?d(t,i):d(t,n)}function r(e){return e=e||{},e.appId=A.appId,e.verifyAppId=A.appId,e.verifySignType="sha1",e.verifyTimestamp=A.timestamp+"",e.verifyNonceStr=A.nonceStr,e.verifySignature=A.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var i=t.errMsg;i||(i=t.err_msg,delete t.err_msg,i=l(e,i),t.errMsg=i),n=n||{},n._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",A.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function l(e,t){var n=e,i=x[n];i&&(n=i);var o="ok";if(t){var r=t.indexOf(":");o=t.substring(r+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==n&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return t=n+":"+o}function u(e){if(e){for(var t=0,n=e.length;n>t;++t){var i=e[t],o=v[i];o&&(e[t]=o)}return e}}function d(e,t){if(!(!A.debug||t&&t.isInnerInvoke)){var n=x[e];n&&(e=n),t&&t._complete&&delete t._complete}}function p(e){if(!(_||S||A.debug||"6.0.2">E||M.systemType<0)){var t=new Image;M.appId=A.appId,M.initTime=V.initEndTime-V.initStartTime,M.preVerifyTime=V.preVerifyEndTime-V.preVerifyStartTime,R.getNetworkType({isInnerInvoke:!0,success:function(e){M.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+M.version+"&o="+M.isPreVerifyOk+"&s="+M.systemType+"&c="+M.clientVersion+"&a="+M.appId+"&n="+M.networkType+"&i="+M.initTime+"&p="+M.preVerifyTime+"&u="+M.url;t.src=n}})}}function f(){return(new Date).getTime()}function m(t){I&&(e.WeixinJSBridge?t():b.addEventListener&&b.addEventListener("WeixinJSBridgeReady",t,!1))}function g(){R.invoke||(R.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,r(n),i)},R.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}if(!e.jWeixin){var h,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},x=function(){var e={};for(var t in v)e[v[t]]=t;return e}(),b=e.document,k=b.title,w=navigator.userAgent.toLowerCase(),y=navigator.platform.toLowerCase(),_=!(!y.match("mac")&&!y.match("win")),S=-1!=w.indexOf("wxdebugger"),I=-1!=w.indexOf("micromessenger"),C=-1!=w.indexOf("android"),T=-1!=w.indexOf("iphone")||-1!=w.indexOf("ipad"),E=function(){var e=w.match(/micromessenger\/(\d+\.\d+\.\d+)/)||w.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),V={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},M={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:T?1:C?2:-1,clientVersion:E,url:encodeURIComponent(location.href)},A={},L={_completes:[]},N={state:0,data:{}};m(function(){V.initEndTime=f()});var O=!1,P=[],R=(h={config:function(e){A=e,d("config",e);var t=!1!==A.check;m(function(){if(t)i(v.config,{verifyJsApiList:u(A.jsApiList)},function(){L._complete=function(e){V.preVerifyEndTime=f(),N.state=1,N.data=e},L.success=function(e){M.isPreVerifyOk=0},L.fail=function(e){L._fail?L._fail(e):N.state=-1};var e=L._completes;return e.push(function(){p()}),L.complete=function(t){for(var n=0,i=e.length;i>n;++n)e[n]();L._completes=[]},L}()),V.preVerifyStartTime=f();else{N.state=1;for(var e=L._completes,n=0,o=e.length;o>n;++n)e[n]();L._completes=[]}}),A.beta&&g()},ready:function(e){0!=N.state?e():(L._completes.push(e),!I&&A.debug&&e())},error:function(e){"6.0.2">E||(-1==N.state?e(N.data):L._fail=e)},checkJsApi:function(e){var t=function(e){var t=e.checkResult;for(var n in t){var i=x[n];i&&(t[i]=t[n],delete t[n])}return e};i("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(C){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){o(v.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||k,desc:e.title||k,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(v.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||k,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(v.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||k,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(v.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||k,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(v.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||k,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(C){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},getLocation:function(e){},previewImage:function(e){i(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===O?(O=!0,i("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(O=!1,P.length>0){var t=P.shift();wx.getLocalImgData(t)}},e}())):P.push(e)},getNetworkType:function(e){var t=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var i=t.indexOf(":"),o=t.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},n(h,"getLocation",function(e){e=e||{},i(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),n(h,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),n(h,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),n(h,"closeWindow",function(e){e=e||{},i("closeWindow",{},e)}),n(h,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),n(h,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),n(h,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),n(h,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),n(h,"scanQRCode",function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(T){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e}())}),n(h,"openAddress",function(e){i(v.openAddress,{},function(){return e._complete=function(e){e=s(e)},e}())}),n(h,"openProductSpecificView",function(e){i(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),n(h,"addCard",function(e){for(var t=e.cardList,n=[],o=0,r=t.length;r>o;++o){var a=t[o],s={card_id:a.cardId,card_ext:a.cardExt};n.push(s)}i(v.addCard,{card_list:n},function(){return e._complete=function(e){var t=e.card_list;if(t){t=JSON.parse(t);for(var n=0,i=t.length;i>n;++n){var o=t[n];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=t,delete e.card_list}},e}())}),n(h,"chooseCard",function(e){i("chooseCard",{app_id:A.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),n(h,"openCard",function(e){for(var t=e.cardList,n=[],o=0,r=t.length;r>o;++o){var a=t[o],s={card_id:a.cardId,code:a.code};n.push(s)}i(v.openCard,{card_list:n},e)}),n(h,"consumeAndShareCard",function(e){i(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),n(h,"chooseWXPay",function(e){i(v.chooseWXPay,a(e),e)}),n(h,"openEnterpriseRedPacket",function(e){i(v.openEnterpriseRedPacket,a(e),e)}),n(h,"startSearchBeacons",function(e){i(v.startSearchBeacons,{ticket:e.ticket},e)}),n(h,"stopSearchBeacons",function(e){i(v.stopSearchBeacons,{},e)}),n(h,"onSearchBeacons",function(e){o(v.onSearchBeacons,e)}),n(h,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),h),$=1,B={};return b.addEventListener("error",function(e){if(!C){var t=e.target,n=t.tagName,i=t.src;if("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=t["wx-id"];if(o||(o=$++,t["wx-id"]=o),B[o])return;B[o]=!0,wx.getLocalImgData({localId:i,success:function(e){t.src=e.localData}})}}}},!0),b.addEventListener("load",function(e){if(!C){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var i=t["wx-id"];i&&(B[i]=!1)}}},!0),t&&(e.wx=e.jWeixin=R),R}}(t)}(window)},188:function(e,t,n){var i=n(189);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(76)(i,o);i.locals&&(e.exports=i.locals)},189:function(e,t,n){t=e.exports=n(75)(void 0),t.push([e.i,'.picker{overflow:hidden}.picker-toolbar{height:40px}.picker-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0;text-align:right;font-size:24px;position:relative}.picker-center-highlight{box-sizing:border-box;position:absolute;left:0;width:100%;top:50%;margin-top:-18px;pointer-events:none}.picker-center-highlight:after,.picker-center-highlight:before{content:"";position:absolute;height:1px;width:100%;background-color:#eaeaea;display:block;z-index:15;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.picker-center-highlight:before{left:0;top:0;bottom:auto;right:auto}.picker-center-highlight:after{left:0;bottom:0;right:auto;top:auto}.picker-slot{font-size:18px;overflow:hidden;position:relative;max-height:100%}.picker-slot.picker-slot-left{text-align:left}.picker-slot.picker-slot-center{text-align:center}.picker-slot.picker-slot-right{text-align:right}.picker-slot.picker-slot-divider{color:#000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.picker-slot-wrapper{-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;-webkit-backface-visibility:hidden;backface-visibility:hidden}.picker-slot-wrapper.dragging,.picker-slot-wrapper.dragging .picker-item{-webkit-transition-duration:0s;transition-duration:0s}.picker-item{height:36px;line-height:36px;padding:0 10px;white-space:nowrap;position:relative;overflow:hidden;text-overflow:ellipsis;color:#707274;left:0;top:0;width:100%;box-sizing:border-box;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-backface-visibility:hidden;backface-visibility:hidden}.picker-slot-absolute .picker-item{position:absolute}.picker-item.picker-item-far{pointer-events:none}.picker-item.picker-selected{color:#000;-webkit-transform:translateZ(0) rotateX(0);transform:translateZ(0) rotateX(0)}.picker-3d .picker-items{overflow:hidden;-webkit-perspective:700px;perspective:700px}.picker-3d .picker-item,.picker-3d .picker-slot,.picker-3d .picker-slot-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.picker-3d .picker-slot{overflow:visible}.picker-3d .picker-item{-webkit-transform-origin:center center;transform-origin:center center;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}',""])},190:function(e,t,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=228)}({0:function(e,t){e.exports=function(e,t,n,o,r){var a,s=e=e||{},c=i(e.default);"object"!==c&&"function"!==c||(a=e,s=e.default);var l="function"==typeof s?s.options:s;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),o&&(l._scopeId=o);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=u):n&&(u=n),u){var d=l.functional,p=d?l.render:l.beforeCreate;d?l.render=function(e,t){return u.call(t),p(e,t)}:l.beforeCreate=p?[].concat(p,u):[u]}return{esModule:a,exports:s,options:l}}},1:function(e,t){e.exports=n(3)},129:function(e,t){},146:function(e,t,n){function i(e){n(96)}var o=n(0)(n(68),n(165),i,null,null);e.exports=o.exports},147:function(e,t,n){function i(e){n(129)}var o=n(0)(n(69),n(199),i,null,null);e.exports=o.exports},165:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"picker-slot",class:e.classNames,style:e.flexStyle},[e.divider?e._e():n("div",{ref:"wrapper",staticClass:"picker-slot-wrapper",class:{dragging:e.dragging},style:{height:e.contentHeight+"px"}},e._l(e.mutatingValues,function(t){return n("div",{staticClass:"picker-item",class:{"picker-selected":t===e.currentValue},style:{height:e.itemHeight+"px",lineHeight:e.itemHeight+"px"}},[e._v("\n      "+e._s("object"===(void 0===t?"undefined":i(t))&&t[e.valueKey]?t[e.valueKey]:t)+"\n    ")])})),e._v(" "),e.divider?n("div",[e._v(e._s(e.content))]):e._e()])},staticRenderFns:[]}},199:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"picker",class:{"picker-3d":e.rotateEffect}},[e.showToolbar?n("div",{staticClass:"picker-toolbar"},[e._t("default")],2):e._e(),e._v(" "),n("div",{staticClass:"picker-items"},[e._l(e.slots,function(t){return n("picker-slot",{attrs:{valueKey:e.valueKey,values:t.values||[],"text-align":t.textAlign||"center","visible-item-count":e.visibleItemCount,"class-name":t.className,flex:t.flex,"rotate-effect":e.rotateEffect,divider:t.divider,content:t.content,itemHeight:e.itemHeight,"default-index":t.defaultIndex},model:{value:e.values[t.valueIndex],callback:function(n){var i=e.values,o=t.valueIndex;Array.isArray(i)?i.splice(o,1,n):e.values[t.valueIndex]=n},expression:"values[slot.valueIndex]"}})}),e._v(" "),n("div",{staticClass:"picker-center-highlight",style:{height:e.itemHeight+"px",marginTop:-e.itemHeight/2+"px"}})],2)])},staticRenderFns:[]}},2:function(e,t,n){"use strict";function i(e,t){if(!e||!t)return!1;if(-1!==t.indexOf(" "))throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function o(e,t){if(e){for(var n=e.className,o=(t||"").split(" "),r=0,a=o.length;r<a;r++){var s=o[r];s&&(e.classList?e.classList.add(s):i(e,s)||(n+=" "+s))}e.classList||(e.className=n)}}function r(e,t){if(e&&t){for(var n=t.split(" "),o=" "+e.className+" ",r=0,a=n.length;r<a;r++){var s=n[r];s&&(e.classList?e.classList.remove(s):i(e,s)&&(o=o.replace(" "+s+" "," ")))}e.classList||(e.className=l(o))}}var a=n(1),s=n.n(a);n.d(t,"c",function(){return p}),t.a=o,t.b=r;var c=s.a.prototype.$isServer,l=(c||Number(document.documentMode),function(e){return(e||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),u=function(){return!c&&document.addEventListener?function(e,t,n){e&&t&&n&&e.addEventListener(t,n,!1)}:function(e,t,n){e&&t&&n&&e.attachEvent("on"+t,n)}}(),d=function(){return!c&&document.removeEventListener?function(e,t,n){e&&t&&e.removeEventListener(t,n,!1)}:function(e,t,n){e&&t&&e.detachEvent("on"+t,n)}}(),p=function(e,t,n){u(e,t,function i(){n&&n.apply(this,arguments),d(e,t,i)})}},207:function(e,t){e.exports=n(191)},228:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";var i=n(147),o=n.n(i);Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return o.a})},68:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(91),o=n(92),r=n(2),a=n(95),s=n(1);n.n(s).a.prototype.$isServer||n(207);var c=function(e,t){if(e){var n=o.a.transformProperty;e.style[n]=e.style[n].replace(/rotateX\(.+?deg\)/gi,"")+" rotateX("+t+"deg)"}},l={3:-45,5:-20,7:-15};t.default={name:"picker-slot",props:{values:{type:Array,default:function(){return[]}},value:{},visibleItemCount:{type:Number,default:5},valueKey:String,rotateEffect:{type:Boolean,default:!1},divider:{type:Boolean,default:!1},textAlign:{type:String,default:"center"},flex:{},className:{},content:{},itemHeight:{type:Number,default:36},defaultIndex:{type:Number,default:0,require:!1}},data:function(){return{currentValue:this.value,mutatingValues:this.values,dragging:!1,animationFrameId:null}},mixins:[a.a],computed:{flexStyle:function(){return{flex:this.flex,"-webkit-box-flex":this.flex,"-moz-box-flex":this.flex,"-ms-flex":this.flex}},classNames:function(){var e="picker-slot-",t=[];this.rotateEffect&&t.push(e+"absolute");var n=this.textAlign||"center";return t.push(e+n),this.divider&&t.push(e+"divider"),this.className&&t.push(this.className),t.join(" ")},contentHeight:function(){return this.itemHeight*this.visibleItemCount},valueIndex:function(){return this.mutatingValues.indexOf(this.currentValue)},dragRange:function(){var e=this.mutatingValues,t=this.visibleItemCount,n=this.itemHeight;return[-n*(e.length-Math.ceil(t/2)),n*Math.floor(t/2)]}},methods:{value2Translate:function(e){var t=this.mutatingValues,n=t.indexOf(e),i=Math.floor(this.visibleItemCount/2),o=this.itemHeight;if(-1!==n)return(n-i)*-o},translate2Value:function(e){var t=this.itemHeight;e=Math.round(e/t)*t;var n=-(e-Math.floor(this.visibleItemCount/2)*t)/t;return this.mutatingValues[n]},updateRotate:function(e,t){var i=this;if(!this.divider){var a=this.dragRange,s=this.$refs.wrapper;t||(t=s.querySelectorAll(".picker-item")),void 0===e&&(e=o.a.getElementTranslate(s).top);var u=Math.ceil(this.visibleItemCount/2),d=l[this.visibleItemCount]||-20;[].forEach.call(t,function(t,o){var s=o*i.itemHeight,l=a[1]-e,p=s-l,f=p/i.itemHeight,m=d*f;m>180&&(m=180),m<-180&&(m=-180),c(t,m),Math.abs(f)>u?n.i(r.a)(t,"picker-item-far"):n.i(r.b)(t,"picker-item-far")})}},planUpdateRotate:function(){var e=this,t=this.$refs.wrapper;cancelAnimationFrame(this.animationFrameId),this.animationFrameId=requestAnimationFrame(function(){e.updateRotate()}),n.i(r.c)(t,o.a.transitionEndProperty,function(){cancelAnimationFrame(e.animationFrameId),e.animationFrameId=null})},initEvents:function(){var e,t,r,a=this,s=this.$refs.wrapper,c={};n.i(i.a)(s,{start:function(e){cancelAnimationFrame(a.animationFrameId),a.animationFrameId=null,c={range:a.dragRange,start:new Date,startLeft:e.pageX,startTop:e.pageY,startTranslateTop:o.a.getElementTranslate(s).top},r=s.querySelectorAll(".picker-item")},drag:function(n){a.dragging=!0,c.left=n.pageX,c.top=n.pageY;var i=c.top-c.startTop,l=c.startTranslateTop+i;o.a.translateElement(s,null,l),e=l-t||l,t=l,a.rotateEffect&&a.updateRotate(t,r)},end:function(){if(a.dragging){a.dragging=!1;var t,n=o.a.getElementTranslate(s).top,i=new Date-c.start;i<300&&(t=n+7*e);var r=c.range;a.$nextTick(function(){var e,i=a.itemHeight;e=t?Math.round(t/i)*i:Math.round(n/i)*i,e=Math.max(Math.min(e,r[1]),r[0]),o.a.translateElement(s,null,e),a.currentValue=a.translate2Value(e),a.rotateEffect&&a.planUpdateRotate()})}c={}}})},doOnValueChange:function(){var e=this.currentValue,t=this.$refs.wrapper;o.a.translateElement(t,null,this.value2Translate(e))},doOnValuesChange:function(){var e=this,t=this.$el,n=t.querySelectorAll(".picker-item");[].forEach.call(n,function(t,n){o.a.translateElement(t,null,e.itemHeight*n)}),this.rotateEffect&&this.planUpdateRotate()}},mounted:function(){this.ready=!0,this.$emit("input",this.currentValue),this.divider||(this.initEvents(),this.doOnValueChange()),this.rotateEffect&&this.doOnValuesChange()},watch:{values:function(e){this.mutatingValues=e},mutatingValues:function(e){var t=this;-1===this.valueIndex&&(this.currentValue=(e||[])[0]),this.rotateEffect&&this.$nextTick(function(){t.doOnValuesChange()})},currentValue:function(e){this.doOnValueChange(),this.rotateEffect&&this.planUpdateRotate(),this.$emit("input",e),this.dispatch("picker","slotValueChange",this)},defaultIndex:function(e){void 0!==this.mutatingValues[e]&&this.mutatingValues.length>=e+1&&(this.currentValue=this.mutatingValues[e])}}}},69:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"mt-picker",componentName:"picker",props:{slots:{type:Array},showToolbar:{type:Boolean,default:!1},visibleItemCount:{type:Number,default:5},valueKey:String,rotateEffect:{type:Boolean,default:!1},itemHeight:{type:Number,default:36}},created:function(){var e=this;this.$on("slotValueChange",this.slotValueChange);var t=[],n=0;(this.slots||[]).forEach(function(i){i.divider||(i.valueIndex=n++,t[i.valueIndex]=(i.values||[])[i.defaultIndex||0],e.slotValueChange())})},methods:{slotValueChange:function(){this.$emit("change",this,this.values)},getSlot:function(e){var t,n=this.slots||[],i=0,o=this.$children.filter(function(e){return"picker-slot"===e.$options.name});return n.forEach(function(n,r){n.divider||(e===i&&(t=o[r]),i++)}),t},getSlotValue:function(e){var t=this.getSlot(e);return t?t.value:null},setSlotValue:function(e,t){var n=this.getSlot(e);n&&(n.currentValue=t)},getSlotValues:function(e){var t=this.getSlot(e);return t?t.mutatingValues:null},setSlotValues:function(e,t){var n=this.getSlot(e);n&&(n.mutatingValues=t)},getValues:function(){return this.values},setValues:function(e){var t=this,n=this.slotCount;if(e=e||[],n!==e.length)throw new Error("values length is not equal slot count.");e.forEach(function(e,n){t.setSlotValue(n,e)})}},computed:{values:function(){var e=this.slots||[],t=[];return e.forEach(function(e){e.divider||t.push(e.value)}),t},slotCount:function(){var e=this.slots||[],t=0;return e.forEach(function(e){e.divider||t++}),t}},components:{PickerSlot:n(146)}}},91:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r=!1,a=!o.a.prototype.$isServer&&"ontouchstart"in window;t.a=function(e,t){var n=function(e){t.drag&&t.drag(a?e.changedTouches[0]||e.touches[0]:e)},i=function e(i){a||(document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",e)),document.onselectstart=null,document.ondragstart=null,r=!1,t.end&&t.end(a?i.changedTouches[0]||i.touches[0]:i)};e.addEventListener(a?"touchstart":"mousedown",function(e){r||(document.onselectstart=function(){return!1},document.ondragstart=function(){return!1},a||(document.addEventListener("mousemove",n),document.addEventListener("mouseup",i)),r=!0,t.start&&(e.preventDefault(),t.start(a?e.changedTouches[0]||e.touches[0]:e)))}),a&&(e.addEventListener("touchmove",n),e.addEventListener("touchend",i),e.addEventListener("touchcancel",i))}},92:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r={};if(!o.a.prototype.$isServer){var a,s=document.documentElement.style,c=!1;window.opera&&"[object Opera]"===Object.prototype.toString.call(opera)?a="presto":"MozAppearance"in s?a="gecko":"WebkitAppearance"in s?a="webkit":"string"==typeof navigator.cpuClass&&(a="trident");var l={trident:"-ms-",gecko:"-moz-",webkit:"-webkit-",presto:"-o-"}[a],u={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[a],d=document.createElement("div"),p=u+"Perspective",f=u+"Transform",m=l+"transform",g=u+"Transition",h=l+"transition",v=u.toLowerCase()+"TransitionEnd";void 0!==d.style[p]&&(c=!0);var x=function(e){var t={left:0,top:0};if(null===e||null===e.style)return t;var n=e.style[f],i=/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/gi.exec(n);return i&&(t.left=+i[1],t.top=+i[3]),t},b=function(e,t,n){if((null!==t||null!==n)&&null!==e&&void 0!==e&&null!==e.style&&(e.style[f]||0!==t||0!==n)){if(null===t||null===n){var i=x(e);null===t&&(t=i.left),null===n&&(n=i.top)}k(e),e.style[f]+=c?" translate("+(t?t+"px":"0px")+","+(n?n+"px":"0px")+") translateZ(0px)":" translate("+(t?t+"px":"0px")+","+(n?n+"px":"0px")+")"}},k=function(e){if(null!==e&&null!==e.style){var t=e.style[f];t&&(t=t.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g,""),e.style[f]=t)}};r={transformProperty:f,transformStyleName:m,transitionProperty:g,transitionStyleName:h,transitionEndProperty:v,getElementTranslate:x,translateElement:b,cancelTranslateElement:k}}t.a=r},95:function(e,t,n){"use strict";function i(e,t,n){this.$children.forEach(function(o){o.$options.componentName===e?o.$emit.apply(o,[t].concat(n)):i.apply(o,[e,t].concat(n))})}t.a={methods:{dispatch:function(e,t,n){for(var i=this.$parent,o=i.$options.componentName;i&&(!o||o!==e);)(i=i.$parent)&&(o=i.$options.componentName);i&&i.$emit.apply(i,[t].concat(n))},broadcast:function(e,t,n){i.call(this,e,t,n)}}}},96:function(e,t){}})},191:function(e,t){!function(e){for(var t=0,n=["webkit","moz"],i=e.requestAnimationFrame,o=e.cancelAnimationFrame,r=n.length;--r>=0&&!i;)i=e[n[r]+"RequestAnimationFrame"],o=e[n[r]+"CancelAnimationFrame"];i&&o||(i=function(e){var n=+new Date,i=Math.max(t+16,n);return setTimeout(function(){e(t=i)},i-n)},o=clearTimeout),e.requestAnimationFrame=i,e.cancelAnimationFrame=o}(window)},362:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(188),o=(n.n(i),n(190)),r=n.n(o),a=n(3),s=n.n(a),c=n(363),l=(n.n(c),n(134)),u=n(7),d=(n(13),n(15));s.a.component(r.a.name,r.a),t.default={name:"pension-two",methods:{getShare:function(){l.a.getShare({title:"快看我的理财规划，原来我可以这么有钱！",desc:"金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？"})},onValuesChange:function(e){this.age=e.getValues()[0]||30},toggle:function(e){this.gender=e},pickerInit:function(e,t){for(var n=this,i=[],o=e;o<t;o++)i.push(o);this.slots[0].values=i,setTimeout(function(){n.slots[0].defaultIndex=12},10)},nextHandle:function(){window.sessionStorage.setItem("age",this.age),window.sessionStorage.setItem("gender",this.gender),this.$router.push("/pension-three")}},data:function(){return{show:!0,age:30,gender:2,visibleItemCount:5,height:"",slots:[{flex:1,values:[],textAlign:"center",defaultIndex:0}]}},computed:{genderString:function(){return 1==this.gender?"女":"男"}},created:function(){u.a.isWeixin&&this.getShare(),this.pickerInit(18,100)},mounted:function(){u.a.kingold&&Object(d.a)({tagname:"title",param:{backtype:2,backAndRefresh:1,title:"养老理财规划",backstr:"退出理财规划将不会保存，确认退出？",keyboard_mode:0}})}}},363:function(e,t,n){var i=n(364);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(76)(i,o);i.locals&&(e.exports=i.locals)},364:function(e,t,n){t=e.exports=n(75)(void 0),t.push([e.i,".pension-two{position:relative;width:100%;height:100%;overflow:auto}.pension-two .content{overflow-y:auto}.pension-two .content .box{width:100%;position:relative;bottom:.9rem}.pension-two .content .box .top{padding-top:3.1rem;position:relative;z-index:7}.pension-two .content .box .top .title{margin-top:1.1rem;font-size:.7rem;text-align:center;color:#fff;background:-webkit-linear-gradient(top,#fde7b3,#c7a371);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-transform:uppercase}.pension-two .content .box .top .sex{padding:2.03rem 1.88rem 3.3rem}.pension-two .content .box .top .sex div{width:4.76rem;height:3.52rem;z-index:9;text-align:center}.pension-two .content .box .top .sex .man.checked{background:url("+n(365)+") no-repeat 50%;background-size:4.75rem}.pension-two .content .box .top .sex .woman.checked{background:url("+n(366)+") no-repeat 50%;background-size:4.7rem}.pension-two .content .box .top .sex .man{background:url("+n(367)+") no-repeat 50%;background-size:4.75rem}.pension-two .content .box .top .sex .woman{background:url("+n(368)+") no-repeat 50%;background-size:4.7rem}.pension-two .content .box .box-shadows{border-radius:50%;width:32rem;height:16rem;background-color:#4e4e4e;box-shadow:0 2px 4px 0 rgba(91,91,91,.5);position:absolute;bottom:0;left:50%;margin-left:-16rem;z-index:6}.pension-two .content .middel{font-size:.7rem;text-align:center}.pension-two .content .age{width:13.5rem;margin:1rem auto 0;overflow-y:auto}.pension-two .content .age .picker{width:13.5rem;height:182px;border-image-width:1px;border-style:solid;border-image:linear-gradient(#d8bd7e,#8f6441 70%,#7c4f2b) 1 1;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,.5)}.pension-two .content .age .picker .picker-item.picker-selected{font-size:1.3rem;color:#7d502c;text-shadow:0 1px 1px rgba(0,0,0,.5)}.pension-two .content .age .picker .picker-item{font-size:.9rem;color:#c7a265;transition-duration:.5s}.pension-two .content .check{margin:.85rem auto 1.4rem;width:13.5rem}.pension-two .content .check span{font-size:.9rem;color:#7d502c}.pension-two .bottom div{height:2.3rem;text-align:center;color:#fff;font-size:1rem;line-height:2.3rem;width:9.3rem;background-image:linear-gradient(-1deg,#7c4f2b,#8f6441 24%,#d8bd7e 70%,#eece83)}.pension-two .bottom .left{margin-right:.15rem}",""])},365:function(e,t,n){e.exports=n.p+"boy1@2x.8488902c.png"},366:function(e,t,n){e.exports=n.p+"girl1@2x.f6ee31e3.png"},367:function(e,t,n){e.exports=n.p+"boy@2x.154e54d8.png"},368:function(e,t,n){e.exports=n.p+"girl@2x.fc221c42.png"},369:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pension-two",attrs:{flex:"",flex:"dir:top"}},[n("div",{staticClass:"content",attrs:{"flex-box":"1"}},[n("div",{staticClass:"box"},[n("div",{staticClass:"top"},[n("div",{staticClass:"title",attrs:{"flex-box":"1"}},[e._v("请选择您的性别")]),e._v(" "),n("div",{staticClass:"sex",attrs:{flex:"main:left"}},[n("div",{staticClass:"man",class:{checked:2==e.gender},attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(2)}}}),e._v(" "),n("div",{staticClass:"woman",class:{checked:1==e.gender},attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(1)}}})])]),e._v(" "),n("div",{staticClass:"box-shadows"})]),e._v(" "),e._m(0),e._v(" "),n("div",{staticClass:"age "},[n("mt-picker",{attrs:{slots:e.slots,visibleItemCount:e.visibleItemCount},on:{change:e.onValuesChange}})],1),e._v(" "),n("div",{staticClass:"check"},[n("p",[e._v("当前选择："),n("span",{staticClass:"sex"},[e._v(e._s(e.genderString)+",")]),n("span",{staticClass:"age"},[e._v(e._s(e.age)+"岁")])])])]),e._v(" "),n("div",{staticClass:"bottom",attrs:{"flex-box":"0",flex:"main:justify"}},[n("div",{staticClass:"left",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.$router.back()}}},[e._v("上一步")]),e._v(" "),n("div",{staticClass:"right",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.nextHandle(t)}}},[e._v("下一步")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"middel"},[n("p",[e._v("请选择您的年龄")])])}]}}});