webpackJsonp([17],{108:function(e,t,n){var i=n(110);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(13)(i,o);i.locals&&(e.exports=i.locals)},109:function(e,t,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=242)}({0:function(e,t){e.exports=function(e,t,n,o,r){var a,s=e=e||{},c=i(e.default);"object"!==c&&"function"!==c||(a=e,s=e.default);var d="function"==typeof s?s.options:s;t&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns),o&&(d._scopeId=o);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},d._ssrRegister=u):n&&(u=n),u){var l=d.functional,p=l?d.render:d.beforeCreate;l?d.render=function(e,t){return u.call(t),p(e,t)}:d.beforeCreate=p?[].concat(p,u):[u]}return{esModule:a,exports:s,options:d}}},1:function(e,t){e.exports=n(2)},101:function(e,t){},164:function(e,t,n){function i(e){n(101)}var o=n(0)(n(86),n(170),i,null,null);e.exports=o.exports},170:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mint-toast-pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"mint-toast",class:e.customClass,style:{padding:""===e.iconClass?"10px":"20px"}},[""!==e.iconClass?n("i",{staticClass:"mint-toast-icon",class:e.iconClass}):e._e(),e._v(" "),n("span",{staticClass:"mint-toast-text",style:{"padding-top":""===e.iconClass?"0":"10px"}},[e._v(e._s(e.message))])])])},staticRenderFns:[]}},242:function(e,t,n){e.exports=n(50)},50:function(e,t,n){"use strict";var i=n(94);Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return i.a})},86:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var e=[];switch(this.position){case"top":e.push("is-placetop");break;case"bottom":e.push("is-placebottom");break;default:e.push("is-placemiddle")}return e.push(this.className),e.join(" ")}}}},94:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r=o.a.extend(n(164)),a=[],s=function(){if(a.length>0){var e=a[0];return a.splice(0,1),e}return new r({el:document.createElement("div")})},c=function(e){e&&a.push(e)},d=function(e){e.target.parentNode&&e.target.parentNode.removeChild(e.target)};r.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",d),this.closed=!0,c(this)};var u=function(e){void 0===e&&(e={});var t=e.duration||3e3,n=s();return n.closed=!1,clearTimeout(n.timer),n.message="string"==typeof e?e:e.message,n.position=e.position||"middle",n.className=e.className||"",n.iconClass=e.iconClass||"",document.body.appendChild(n.$el),o.a.nextTick(function(){n.visible=!0,n.$el.removeEventListener("transitionend",d),~t&&(n.timer=setTimeout(function(){n.closed||n.close()},t))}),n};t.a=u}})},110:function(e,t,n){t=e.exports=n(12)(void 0),t.push([e.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},111:function(e,t,n){e.exports=n.p+"share-icon.cfed3b76.png"},112:function(e,t,n){"use strict";var i=n(113),o=n.n(i),r=n(14),a=n(6),s=n(111),c=function(e){o.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},d=function(e){var t={url:window.location.href};a.a.ios&&(t.url=window.shareUrl);var n={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:s,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};r.a.get("/wechat/shareInfo",t).then(function(e){200==e.code&&(c(e.data.shareInfo),o.a.ready(function(){u(n),l(n)}))})},u=function(e,t){o.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})},l=function(e,t){o.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})};t.a={wx:o.a,config:c,getShare:d}},113:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(t,i){e.exports=function(e,t){function i(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,r(n),function(e){c(t,e,i)}):l(t,i)}function o(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){i&&i.trigger&&i.trigger(e),c(t,e,n)}):i?l(t,i):l(t,n)}function r(e){return e=e||{},e.appId=O.appId,e.verifyAppId=O.appId,e.verifySignType="sha1",e.verifyTimestamp=O.timestamp+"",e.verifyNonceStr=O.nonceStr,e.verifySignature=O.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var i=t.errMsg;i||(i=t.err_msg,delete t.err_msg,i=d(e,i),t.errMsg=i),n=n||{},n._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",O.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function d(e,t){var n=e,i=_[n];i&&(n=i);var o="ok";if(t){var r=t.indexOf(":");o=t.substring(r+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==n&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return t=n+":"+o}function u(e){if(e){for(var t=0,n=e.length;n>t;++t){var i=e[t],o=v[i];o&&(e[t]=o)}return e}}function l(e,t){if(!(!O.debug||t&&t.isInnerInvoke)){var n=_[e];n&&(e=n),t&&t._complete&&delete t._complete}}function p(e){if(!(S||b||O.debug||"6.0.2">M||L.systemType<0)){var t=new Image;L.appId=O.appId,L.initTime=E.initEndTime-E.initStartTime,L.preVerifyTime=E.preVerifyEndTime-E.preVerifyStartTime,R.getNetworkType({isInnerInvoke:!0,success:function(e){L.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+L.version+"&o="+L.isPreVerifyOk+"&s="+L.systemType+"&c="+L.clientVersion+"&a="+L.appId+"&n="+L.networkType+"&i="+L.initTime+"&p="+L.preVerifyTime+"&u="+L.url;t.src=n}})}}function f(){return(new Date).getTime()}function m(t){I&&(e.WeixinJSBridge?t():k.addEventListener&&k.addEventListener("WeixinJSBridgeReady",t,!1))}function g(){R.invoke||(R.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,r(n),i)},R.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}if(!e.jWeixin){var h,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},_=function(){var e={};for(var t in v)e[v[t]]=t;return e}(),k=e.document,w=k.title,y=navigator.userAgent.toLowerCase(),x=navigator.platform.toLowerCase(),S=!(!x.match("mac")&&!x.match("win")),b=-1!=y.indexOf("wxdebugger"),I=-1!=y.indexOf("micromessenger"),C=-1!=y.indexOf("android"),T=-1!=y.indexOf("iphone")||-1!=y.indexOf("ipad"),M=function(){var e=y.match(/micromessenger\/(\d+\.\d+\.\d+)/)||y.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),E={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},L={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:T?1:C?2:-1,clientVersion:M,url:encodeURIComponent(location.href)},O={},V={_completes:[]},P={state:0,data:{}};m(function(){E.initEndTime=f()});var N=!1,A=[],R=(h={config:function(e){O=e,l("config",e);var t=!1!==O.check;m(function(){if(t)i(v.config,{verifyJsApiList:u(O.jsApiList)},function(){V._complete=function(e){E.preVerifyEndTime=f(),P.state=1,P.data=e},V.success=function(e){L.isPreVerifyOk=0},V.fail=function(e){V._fail?V._fail(e):P.state=-1};var e=V._completes;return e.push(function(){p()}),V.complete=function(t){for(var n=0,i=e.length;i>n;++n)e[n]();V._completes=[]},V}()),E.preVerifyStartTime=f();else{P.state=1;for(var e=V._completes,n=0,o=e.length;o>n;++n)e[n]();V._completes=[]}}),O.beta&&g()},ready:function(e){0!=P.state?e():(V._completes.push(e),!I&&O.debug&&e())},error:function(e){"6.0.2">M||(-1==P.state?e(P.data):V._fail=e)},checkJsApi:function(e){var t=function(e){var t=e.checkResult;for(var n in t){var i=_[n];i&&(t[i]=t[n],delete t[n])}return e};i("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(C){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){o(v.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||w,desc:e.title||w,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(v.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||w,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(v.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(v.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(v.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(C){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},getLocation:function(e){},previewImage:function(e){i(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===N?(N=!0,i("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(N=!1,A.length>0){var t=A.shift();wx.getLocalImgData(t)}},e}())):A.push(e)},getNetworkType:function(e){var t=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var i=t.indexOf(":"),o=t.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},n(h,"getLocation",function(e){e=e||{},i(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),n(h,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),n(h,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),n(h,"closeWindow",function(e){e=e||{},i("closeWindow",{},e)}),n(h,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),n(h,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),n(h,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),n(h,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),n(h,"scanQRCode",function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(T){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e}())}),n(h,"openAddress",function(e){i(v.openAddress,{},function(){return e._complete=function(e){e=s(e)},e}())}),n(h,"openProductSpecificView",function(e){i(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),n(h,"addCard",function(e){for(var t=e.cardList,n=[],o=0,r=t.length;r>o;++o){var a=t[o],s={card_id:a.cardId,card_ext:a.cardExt};n.push(s)}i(v.addCard,{card_list:n},function(){return e._complete=function(e){var t=e.card_list;if(t){t=JSON.parse(t);for(var n=0,i=t.length;i>n;++n){var o=t[n];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=t,delete e.card_list}},e}())}),n(h,"chooseCard",function(e){i("chooseCard",{app_id:O.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),n(h,"openCard",function(e){for(var t=e.cardList,n=[],o=0,r=t.length;r>o;++o){var a=t[o],s={card_id:a.cardId,code:a.code};n.push(s)}i(v.openCard,{card_list:n},e)}),n(h,"consumeAndShareCard",function(e){i(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),n(h,"chooseWXPay",function(e){i(v.chooseWXPay,a(e),e)}),n(h,"openEnterpriseRedPacket",function(e){i(v.openEnterpriseRedPacket,a(e),e)}),n(h,"startSearchBeacons",function(e){i(v.startSearchBeacons,{ticket:e.ticket},e)}),n(h,"stopSearchBeacons",function(e){i(v.stopSearchBeacons,{},e)}),n(h,"onSearchBeacons",function(e){o(v.onSearchBeacons,e)}),n(h,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),h),B=1,W={};return k.addEventListener("error",function(e){if(!C){var t=e.target,n=t.tagName,i=t.src;if("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=t["wx-id"];if(o||(o=B++,t["wx-id"]=o),W[o])return;W[o]=!0,wx.getLocalImgData({localId:i,success:function(e){t.src=e.localData}})}}}},!0),k.addEventListener("load",function(e){if(!C){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var i=t["wx-id"];i&&(W[i]=!1)}}},!0),t&&(e.wx=e.jWeixin=R),R}}(t)}(window)},292:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(108),o=(n.n(i),n(109)),r=n.n(o),a=n(293),s=(n.n(a),n(7)),c=n(112),d=n(15),u=n(14),l=n(6),p=n(16);t.default={name:"ticket-aug",data:function(){return{show:!1,isGetTicket:!1,isApp:!1,isShared:!1}},created:function(){var e=this;if(this.getInfo(),"wx"==this.$route.query.from){window.sessionStorage.removeItem("ticket-aug");var t=["_trackEvent","红包雨活动页","SHOW","在菜单栏点击活动标题","打开站内活动"];window._hmt.push(t)}if(window.sessionStorage.getItem("ticket-aug")){this.isShared=!0;var n=["_trackEvent","红包雨活动页","SHOW","从分享链接进入站外活动页","进入站外活动页"];window._hmt.push(n)}if(l.a.kingold)return this.isApp=!0,Object(p.a)({tagname:"title",param:{backtype:0,backAndRefresh:1,title:"送你一场红包雨",keyboard_mode:0}}),!1;u.a.get("/cashCoupon/list",{couponType:1,startRow:0,pageSize:1}).then(function(t){200==t.code&&t.data.couponCount&&(e.isGetTicket=!0)})},computed:Object(d.mapState)(["userVerifyStatus"]),methods:{getInfo:function(){var e=this;u.a.get("/getUserInfo").then(function(t){200==t.code?(e.userLoginName=t.data.userLoginName,l.a.isWeixin&&e.getShare()):401==t.code&&l.a.isWeixin&&(window.sessionStorage.setItem("logoutUrl",encodeURIComponent(window.location.href)),window.location.href="/login")})},getShare:function(){c.a.getShare({title:"金疙瘩喊你回家领红包啦！",desc:"不多不少，50刚好~",link:window.location.origin+"/land-ticket-aug-register.html?inviter="+this.userLoginName})},goStep:function(){var e=[];if(e=this.isShared?["_trackEvent","红包雨活动页","CLICK","在站外活动页点击我要领红包","站外领红包"]:["_trackEvent","红包雨活动页","CLICK","在站内活动页点击我要领红包","站内领红包"],window._hmt.push(e),this.isGetTicket)return r()("您已经领取活动现金券，投资可以直接使用~"),!1;switch(this.userVerifyStatus){case 0:e=["_trackEvent","红包雨活动页","CLICK","从活动页进入实名认证","活动实名"],window._hmt.push(e),this.$router.push("/authentication");break;case 1:e=["_trackEvent","红包雨活动页","CLICK","从活动页进入授权页面","活动授权"],window._hmt.push(e),Object(s.g)(this.$store.state.userId);break;case 2:e=["_trackEvent","红包雨活动页","CLICK","从活动页进入绑卡页面","活动绑卡"],window._hmt.push(e),this.$router.push("/bind-bank-card");break;case 3:e=["_trackEvent","红包雨活动页","CLICK","从活动页进入设置交易密码页面","活动设置交易密码"],window._hmt.push(e),this.$router.push("/set-pay-password");break;case 9:r()("您已经完成实名绑卡，敬请期待下期活动~")}},share:function(){if(this.show)this.show=!1;else{this.show=!0;var e=[];this.isShared?e=["_trackEvent","红包雨活动页","CLICK","在站外活动页点击通知好友领红包","站外分享"]:(e=["_trackEvent","红包雨活动页","CLICK","在站内活动页点击通知好友领红包","站内分享"],window._hmt.push(e)),window._hmt.push(e)}}},destroyed:function(){}}},293:function(e,t,n){var i=n(294);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(13)(i,o);i.locals&&(e.exports=i.locals)},294:function(e,t,n){t=e.exports=n(12)(void 0),t.push([e.i,".ticket-aug{width:100%;height:100%;background-image:linear-gradient(180deg,#ff6f50,#a00101)}.ticket-aug .body{text-align:center;padding-bottom:1rem}.ticket-aug .body .duration{color:#fff}.ticket-aug .body .ticket{width:17.15rem}.ticket-aug .body .content{color:#fff;font-size:.6rem;padding:0 2rem}.ticket-aug .body .content .title{font-size:.8rem;margin:.5rem 0}.ticket-aug .body .content .detail{text-align:left}.ticket-aug .body .tip{margin-top:.8rem;color:#710100}.ticket-aug .qrcode{text-align:center;margin:.8rem auto}.ticket-aug .qrcode p{color:#fff;font-size:.6rem}.ticket-aug .qrcode img{margin-top:.8rem;width:4.5rem}.ticket-aug .bottom{text-align:center;background:#ffd04f;color:#fff}.ticket-aug .bottom p{padding:.5rem 0;font-size:1rem}.ticket-aug .slide-fade-enter-active,.ticket-aug .slide-fade-enter-to,.ticket-aug .slide-fade-leave-active{transition:all .3s ease}.ticket-aug .slide-fade-enter,.ticket-aug .slide-fade-leave-active,.ticket-aug .slide-fade-leave-to{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.ticket-aug .mask{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);z-index:1000}.ticket-aug .mask div{position:absolute;color:#000;background:url("+n(295)+") no-repeat;background-size:contain;width:70%;height:30%;top:5px;right:0;text-align:center;padding-top:31%}",""])},295:function(e,t,n){e.exports=n.p+"share.5004bd23.png"},296:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ticket-aug",attrs:{flex:"dir:top"}},[i("div",{staticClass:"wrap",staticStyle:{overflow:"auto"},attrs:{"flex-box":"1"}},[e._m(0),e._v(" "),i("div",{staticClass:"body"},[i("p",{staticClass:"duration"},[e._v("活动时间：8月29日-8月31日")]),e._v(" "),i("img",{staticClass:"ticket",attrs:{src:n(297),alt:"ticket"}}),e._v(" "),e._m(1),e._v(" "),e.isShared?i("div",{staticClass:"qrcode",attrs:{"flex-box":"0"}},[i("p",[e._v("长按识别二维码，进入金疙瘩使用红包")]),e._v(" "),i("img",{attrs:{src:n(298),alt:"qr-code"}})]):e._e(),e._v(" "),i("p",{staticClass:"tip"},[e._v("理财有风险，投资需谨慎")])])]),e._v(" "),e.isApp?e._e():i("div",{staticClass:"bottom",attrs:{"flex-box":"0",flex:"box:mean"}},[i("p",{on:{click:function(t){t.stopPropagation(),e.share(t)}}},[e._v("邀请好友领红包")]),e._v(" "),i("p",{staticStyle:{"border-left":"1px solid #fff"},on:{click:function(t){t.stopPropagation(),e.goStep(t)}}},[e._v("我要领红包")])]),e._v(" "),i("transition",{attrs:{name:"slide-fade",appear:""}},[e.show?i("div",{staticClass:"mask",on:{click:function(t){t.stopPropagation(),e.share()}}},[i("div",[e._v("\n                分享给好友，一起赚钱\n            ")])]):e._e()])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"header"},[i("img",{attrs:{src:n(299),alt:"ticket-aug-bg"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("p",{staticClass:"title"},[e._v("活动规则：")]),e._v(" "),n("div",{staticClass:"detail"},[n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("1、")]),e._v(" "),n("p",[e._v("活动仅限新注册及注册未绑卡用户参加，完成绑卡操作后红包自动发放至用户平台账户中，已绑卡用户无法参加活动；")])]),e._v(" "),n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("2、")]),e._v(" "),n("p",[e._v("红包数量有限，发完即止；")])]),e._v(" "),n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("3、")]),e._v(" "),n("p",[e._v("红包仅限购买平台90天期产品；")])]),e._v(" "),n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("4、")]),e._v(" "),n("p",[e._v("活动时间2017年8月29日-2017年8月31日，红包仅限活动期间投资使用；")])]),e._v(" "),n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("5、")]),e._v(" "),n("p",[e._v("平台已代扣代缴相关税费；")])]),e._v(" "),n("div",{attrs:{flex:""}},[n("p",{attrs:{"flex-box":"0"}},[e._v("6、")]),e._v(" "),n("p",[e._v("金疙瘩保留对本活动在法律范围内的最终解释权。")])])])])}]}},297:function(e,t,n){e.exports=n.p+"ticket.6bfedd73.png"},298:function(e,t,n){e.exports=n.p+"qr-code.9901f005.png"},299:function(e,t,n){e.exports=n.p+"ticket-aug-bg.1463ce1b.jpg"},70:function(e,t,n){var i=n(25)(n(292),n(296),null,null);e.exports=i.exports}});