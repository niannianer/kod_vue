webpackJsonp([34],{106:function(e,t,n){var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function t(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=242)}({0:function(e,t){e.exports=function(e,t,n,i,o){var a,r=e=e||{},c=s(e.default);"object"!==c&&"function"!==c||(a=e,r=e.default);var l="function"==typeof r?r.options:r;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),i&&(l._scopeId=i);var d;if(o?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=d):n&&(d=n),d){var u=l.functional,p=u?l.render:l.beforeCreate;u?l.render=function(e,t){return d.call(t),p(e,t)}:l.beforeCreate=p?[].concat(p,d):[d]}return{esModule:a,exports:r,options:l}}},1:function(e,t){e.exports=n(2)},101:function(e,t){},164:function(e,t,n){function s(e){n(101)}var i=n(0)(n(86),n(170),s,null,null);e.exports=i.exports},170:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mint-toast-pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"mint-toast",class:e.customClass,style:{padding:""===e.iconClass?"10px":"20px"}},[""!==e.iconClass?n("i",{staticClass:"mint-toast-icon",class:e.iconClass}):e._e(),e._v(" "),n("span",{staticClass:"mint-toast-text",style:{"padding-top":""===e.iconClass?"0":"10px"}},[e._v(e._s(e.message))])])])},staticRenderFns:[]}},242:function(e,t,n){e.exports=n(50)},50:function(e,t,n){"use strict";var s=n(94);Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return s.a})},86:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var e=[];switch(this.position){case"top":e.push("is-placetop");break;case"bottom":e.push("is-placebottom");break;default:e.push("is-placemiddle")}return e.push(this.className),e.join(" ")}}}},94:function(e,t,n){"use strict";var s=n(1),i=n.n(s),o=i.a.extend(n(164)),a=[],r=function(){if(a.length>0){var e=a[0];return a.splice(0,1),e}return new o({el:document.createElement("div")})},c=function(e){e&&a.push(e)},l=function(e){e.target.parentNode&&e.target.parentNode.removeChild(e.target)};o.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",l),this.closed=!0,c(this)};var d=function(e){void 0===e&&(e={});var t=e.duration||3e3,n=r();return n.closed=!1,clearTimeout(n.timer),n.message="string"==typeof e?e:e.message,n.position=e.position||"middle",n.className=e.className||"",n.iconClass=e.iconClass||"",document.body.appendChild(n.$el),i.a.nextTick(function(){n.visible=!0,n.$el.removeEventListener("transitionend",l),~t&&(n.timer=setTimeout(function(){n.closed||n.close()},t))}),n};t.a=d}})},107:function(e,t,n){var s=n(108);"string"==typeof s&&(s=[[e.i,s,""]]);var i={};i.transform=void 0;n(52)(s,i);s.locals&&(e.exports=s.locals)},108:function(e,t,n){t=e.exports=n(51)(void 0),t.push([e.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},109:function(e,t,n){e.exports=n.p+"share-icon.cfed3b76.png"},110:function(e,t,n){"use strict";var s=n(111),i=n.n(s),o=n(17),a=n(8),r=n(109),c=function(e){i.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},l=function(e){var t={url:window.location.href};a.a.ios&&(t.url=window.shareUrl);var n={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:r,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};o.a.get("/wechat/shareInfo",t).then(function(e){200==e.code&&(c(e.data.shareInfo),i.a.ready(function(){d(n),u(n)}))})},d=function(e,t){i.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})},u=function(e,t){i.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})};t.a={wx:i.a,config:c,getShare:l}},111:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(t,s){e.exports=function(e,t){function s(t,n,s){e.WeixinJSBridge?WeixinJSBridge.invoke(t,o(n),function(e){c(t,e,s)}):u(t,s)}function i(t,n,s){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){s&&s.trigger&&s.trigger(e),c(t,e,n)}):s?u(t,s):u(t,n)}function o(e){return e=e||{},e.appId=z.appId,e.verifyAppId=z.appId,e.verifySignType="sha1",e.verifyTimestamp=z.timestamp+"",e.verifyNonceStr=z.nonceStr,e.verifySignature=z.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function r(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var s=t.errMsg;s||(s=t.err_msg,delete t.err_msg,s=l(e,s),t.errMsg=s),n=n||{},n._complete&&(n._complete(t),delete n._complete),s=t.errMsg||"",z.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var i=s.indexOf(":");switch(s.substring(i+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function l(e,t){var n=e,s=g[n];s&&(n=s);var i="ok";if(t){var o=t.indexOf(":");i=t.substring(o+1),"confirm"==i&&(i="ok"),"failed"==i&&(i="fail"),-1!=i.indexOf("failed_")&&(i=i.substring(7)),-1!=i.indexOf("fail_")&&(i=i.substring(5)),i=i.replace(/_/g," "),i=i.toLowerCase(),("access denied"==i||"no permission to execute"==i)&&(i="permission denied"),"config"==n&&"function not exist"==i&&(i="ok"),""==i&&(i="fail")}return t=n+":"+i}function d(e){if(e){for(var t=0,n=e.length;n>t;++t){var s=e[t],i=x[s];i&&(e[t]=i)}return e}}function u(e,t){if(!(!z.debug||t&&t.isInnerInvoke)){var n=g[e];n&&(e=n),t&&t._complete&&delete t._complete}}function p(e){if(!(S||w||z.debug||"6.0.2">I||T.systemType<0)){var t=new Image;T.appId=z.appId,T.initTime=A.initEndTime-A.initStartTime,T.preVerifyTime=A.preVerifyEndTime-A.preVerifyStartTime,O.getNetworkType({isInnerInvoke:!0,success:function(e){T.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+T.version+"&o="+T.isPreVerifyOk+"&s="+T.systemType+"&c="+T.clientVersion+"&a="+T.appId+"&n="+T.networkType+"&i="+T.initTime+"&p="+T.preVerifyTime+"&u="+T.url;t.src=n}})}}function f(){return(new Date).getTime()}function m(t){k&&(e.WeixinJSBridge?t():b.addEventListener&&b.addEventListener("WeixinJSBridgeReady",t,!1))}function v(){O.invoke||(O.invoke=function(t,n,s){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,o(n),s)},O.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}if(!e.jWeixin){var _,x={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},g=function(){var e={};for(var t in x)e[x[t]]=t;return e}(),b=e.document,h=b.title,y=navigator.userAgent.toLowerCase(),M=navigator.platform.toLowerCase(),S=!(!M.match("mac")&&!M.match("win")),w=-1!=y.indexOf("wxdebugger"),k=-1!=y.indexOf("micromessenger"),N=-1!=y.indexOf("android"),C=-1!=y.indexOf("iphone")||-1!=y.indexOf("ipad"),I=function(){var e=y.match(/micromessenger\/(\d+\.\d+\.\d+)/)||y.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),A={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},T={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:C?1:N?2:-1,clientVersion:I,url:encodeURIComponent(location.href)},z={},P={_completes:[]},D={state:0,data:{}};m(function(){A.initEndTime=f()});var V=!1,Q=[],O=(_={config:function(e){z=e,u("config",e);var t=!1!==z.check;m(function(){if(t)s(x.config,{verifyJsApiList:d(z.jsApiList)},function(){P._complete=function(e){A.preVerifyEndTime=f(),D.state=1,D.data=e},P.success=function(e){T.isPreVerifyOk=0},P.fail=function(e){P._fail?P._fail(e):D.state=-1};var e=P._completes;return e.push(function(){p()}),P.complete=function(t){for(var n=0,s=e.length;s>n;++n)e[n]();P._completes=[]},P}()),A.preVerifyStartTime=f();else{D.state=1;for(var e=P._completes,n=0,i=e.length;i>n;++n)e[n]();P._completes=[]}}),z.beta&&v()},ready:function(e){0!=D.state?e():(P._completes.push(e),!k&&z.debug&&e())},error:function(e){"6.0.2">I||(-1==D.state?e(D.data):P._fail=e)},checkJsApi:function(e){var t=function(e){var t=e.checkResult;for(var n in t){var s=g[n];s&&(t[s]=t[n],delete t[n])}return e};s("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(N){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){i(x.onMenuShareTimeline,{complete:function(){s("shareTimeline",{title:e.title||h,desc:e.title||h,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(x.onMenuShareAppMessage,{complete:function(){s("sendAppMessage",{title:e.title||h,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(x.onMenuShareQQ,{complete:function(){s("shareQQ",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(x.onMenuShareWeibo,{complete:function(){s("shareWeiboApp",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(x.onMenuShareQZone,{complete:function(){s("shareQZone",{title:e.title||h,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){s("startRecord",{},e)},stopRecord:function(e){s("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){s("playVoice",{localId:e.localId},e)},pauseVoice:function(e){s("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){s("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){s("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){s("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){s("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){s("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(N){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},getLocation:function(e){},previewImage:function(e){s(x.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){s("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){s("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===V?(V=!0,s("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(V=!1,Q.length>0){var t=Q.shift();wx.getLocalImgData(t)}},e}())):Q.push(e)},getNetworkType:function(e){var t=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var s=t.indexOf(":"),i=t.substring(s+1);switch(i){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}}return e};s("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){s("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},n(_,"getLocation",function(e){e=e||{},s(x.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),n(_,"hideOptionMenu",function(e){s("hideOptionMenu",{},e)}),n(_,"showOptionMenu",function(e){s("showOptionMenu",{},e)}),n(_,"closeWindow",function(e){e=e||{},s("closeWindow",{},e)}),n(_,"hideMenuItems",function(e){s("hideMenuItems",{menuList:e.menuList},e)}),n(_,"showMenuItems",function(e){s("showMenuItems",{menuList:e.menuList},e)}),n(_,"hideAllNonBaseMenuItem",function(e){s("hideAllNonBaseMenuItem",{},e)}),n(_,"showAllNonBaseMenuItem",function(e){s("showAllNonBaseMenuItem",{},e)}),n(_,"scanQRCode",function(e){e=e||{},s("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(C){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e}())}),n(_,"openAddress",function(e){s(x.openAddress,{},function(){return e._complete=function(e){e=r(e)},e}())}),n(_,"openProductSpecificView",function(e){s(x.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),n(_,"addCard",function(e){for(var t=e.cardList,n=[],i=0,o=t.length;o>i;++i){var a=t[i],r={card_id:a.cardId,card_ext:a.cardExt};n.push(r)}s(x.addCard,{card_list:n},function(){return e._complete=function(e){var t=e.card_list;if(t){t=JSON.parse(t);for(var n=0,s=t.length;s>n;++n){var i=t[n];i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ}e.cardList=t,delete e.card_list}},e}())}),n(_,"chooseCard",function(e){s("chooseCard",{app_id:z.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),n(_,"openCard",function(e){for(var t=e.cardList,n=[],i=0,o=t.length;o>i;++i){var a=t[i],r={card_id:a.cardId,code:a.code};n.push(r)}s(x.openCard,{card_list:n},e)}),n(_,"consumeAndShareCard",function(e){s(x.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),n(_,"chooseWXPay",function(e){s(x.chooseWXPay,a(e),e)}),n(_,"openEnterpriseRedPacket",function(e){s(x.openEnterpriseRedPacket,a(e),e)}),n(_,"startSearchBeacons",function(e){s(x.startSearchBeacons,{ticket:e.ticket},e)}),n(_,"stopSearchBeacons",function(e){s(x.stopSearchBeacons,{},e)}),n(_,"onSearchBeacons",function(e){i(x.onSearchBeacons,e)}),n(_,"openEnterpriseChat",function(e){s("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),_),E=1,L={};return b.addEventListener("error",function(e){if(!N){var t=e.target,n=t.tagName,s=t.src;if("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){if(-1!=s.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var i=t["wx-id"];if(i||(i=E++,t["wx-id"]=i),L[i])return;L[i]=!0,wx.getLocalImgData({localId:s,success:function(e){t.src=e.localData}})}}}},!0),b.addEventListener("load",function(e){if(!N){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var s=t["wx-id"];s&&(L[s]=!1)}}},!0),t&&(e.wx=e.jWeixin=O),O}}(t)}(window)},259:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(107),i=(n.n(s),n(106)),o=n.n(i),a=n(110),r=n(365),c=(n.n(r),n(17)),l=n(11),d=n(8),u=n(109);t.default={name:"goods-detail-prif",data:function(){return{lists:{},tab1:!1,tab2:!1,tab3:!1,tab4:!1,telNumber:l.e,message:""}},created:function(){this.productUuid=this.$route.query.productUuid,this.getDetail(),d.a.isWeixin&&this.getShare();var e=["_trackEvent","高端理财详情","SHOW","进入高端理财详情页","进入高端理财详情页"];window._hmt.push(e)},computed:{},methods:{getDetail:function(){var e=this,t={productUuid:this.productUuid,productType:"PRIF"};c.a.get("/product/getDetail",t).then(function(t){e.lists=t.data,2==t.data.productStatusCode?e.message="立即预约":1==t.data.productStatusCode?e.message="预热中":e.message=t.data.productStatus})},toggle:function(e){var t="收起",n="";1==e?(this.tab1=!this.tab1,n="投资范围",this.tab1&&(t="打开")):2==e?(this.tab2=!this.tab2,n="风控措施",this.tab2&&(t="打开")):3==e?(this.tab3=!this.tab3,n="产品亮点",this.tab3&&(t="打开")):4==e&&(this.tab4=!this.tab4,n="产品附件",this.tab4&&(t="打开"));var s=["_trackEvent","私募产品详情","CLICK","在私募产品详情页"+t+n,"私募产品详情页-"+t+n];window._hmt.push(s)},link:function(e,t){if("预热中"==e)o()("产品在预热中，请稍后再尝试预约");else if("立即预约"==e){this.$router.push({path:"/make-appointment",query:{productUuid:t}});var n=["_trackEvent","私募产品详情","CLICK","私募产品详情页-点击立即预约","私募产品详情页-点击立即预约"];window._hmt.push(n)}},linkpdf:function(e){if(e.attachmentLink){var t=e.attachmentLink,n=e.attachmentName;t=t.replace(/^http\.*:/,"https:");var s=["_trackEvent","私募产品详情","CLICK","在私募产品详情页点击产品附件","私募产品详情页-点击产品附件"];window._hmt.push(s),window.location.href="/pdf/web/viewer.html?src="+encodeURIComponent(t)+"&name="+encodeURIComponent(n)}},getShare:function(){var e=this;c.a.get("/wechat/shareInfo",{url:window.location.href}).then(function(t){200==t.code&&e.setShare(t.data.shareInfo)})},setShare:function(e){a.a.config(e);var t={title:"金疙瘩——中高端理财产品聚集地",link:window.location.href,imgUrl:u,desc:"汇聚中冀独家优质资产，专业理财师团队贴心服务，智能化的定制理财解决方案。"};a.a.wx.ready(function(){a.a.onMenuShareTimeline(t),a.a.onMenuShareAppMessage(t)})},hotline:function(){var e=["_trackEvent","私募产品详情","CLICK","私募产品详情页-点击咨询热线","私募产品详情页-点击咨询热线"];window._hmt.push(e)}},destroyed:function(){}}},318:function(e,t,n){t=e.exports=n(51)(void 0),t.push([e.i,'.goods-detail-prif{height:100%;width:100%}.goods-detail-prif a{text-decoration:none}.goods-detail-prif .body{overflow-y:auto}.goods-detail-prif .body .title{overflow:hidden;background:#fff;padding:.8rem;color:#333}.goods-detail-prif .body .title h2{padding-bottom:.8rem;text-align:center;font-weight:400;font-size:.8rem;border-bottom:1px solid #979797}.goods-detail-prif .body .item{position:relative;padding:0 .8rem .8rem;background:#fff;margin-bottom:.4rem}.goods-detail-prif .body .item .title{color:#666}.goods-detail-prif .body .item .title:before{content:"";position:absolute;width:.3rem;height:.8rem;left:.8rem;background:#1d72c0;background-size:cover}.goods-detail-prif .body .item .title i{display:block;width:.7rem;height:.65rem;position:relative;top:0;right:0;background-image:url('+n(415)+");background-size:cover;transition:-webkit-transform .25s ease;transition:transform .25s ease;transition:transform .25s ease,-webkit-transform .25s ease}.goods-detail-prif .body .item ul li{padding:.3rem 0;font-size:.6rem}.goods-detail-prif .body .item .first li{font-size:.7rem}.goods-detail-prif .body .item .change i{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.goods-detail-prif .body .item .content{padding-bottom:.8rem}.goods-detail-prif .body .open{border-bottom:1px solid #d8d8d8;margin-bottom:0;padding-bottom:0}.goods-detail-prif .buttom{height:2.45rem;color:#fff}.goods-detail-prif .buttom .hotline{line-height:2.45rem;background:#f5a623;text-align:center;color:#fff;font-size:.7rem}.goods-detail-prif .buttom .btn{background:#fa3d1f;text-align:center;line-height:2.45rem}.goods-detail-prif .buttom .disabled{line-height:2.45rem;background:#ccc;color:#000}",""])},365:function(e,t,n){var s=n(318);"string"==typeof s&&(s=[[e.i,s,""]]);var i={};i.transform=void 0;n(52)(s,i);s.locals&&(e.exports=s.locals)},415:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABEVBMVEUAAACAgIBVVVVAQEAzMzNVVVVJSUlAQEA3NzdAQEA8PDw5OTk2NjY9PT06Ojo1NTU6Ojo1NTU3Nzc2NjY0NDQzMzM3Nzc1NTU3NzczMzM1NTU0NDQ1NTUzMzM0NDQzMzM0NDQ1NTU1NTU1NTU1NTU0NDQzMzMzMzM1NTUzMzMzMzMzMzM0NDQzMzM0NDQ0NDQzMzM0NDQzMzM0NDQzMzM0NDQ0NDQ0NDQzMzM0NDQ0NDQzMzM0NDQ0NDQ0NDQzMzM0NDQzMzM0NDQzMzMzMzMzMzM0NDQ0NDQzMzMzMzM0NDQ0NDQzMzM0NDQzMzM0NDQzMzMzMzM0NDQzMzMzMzMzMzM0NDQ0NDQzMzMzMzMzMzOMei09AAAAWnRSTlMAAgMEBQYHDA4QERITFRYYHyIlJicoKisuPD9AQ0ZKS09hZWZqa25ydHiHi42RkpSWmZqen6Oxtbm6vL2/wMHDxMjP0NLV2Nna293e4OLq7O7v8fP5+vv8/f7FnzBtAAAAzklEQVQYGe3BZzdCAQDH4b+GSlGZZSbZOyP7ojIKEZHf9/8gGvd06g7HW+f0POr7u438hByN3W6qqcxjWA5C9zyrKQ3nXtl4TiGjll3Yk80O7KvNewbLsliCC59MQw98zqrHTI1SRB3jb7yOqku8QnVSXea+uAupI1ikPq8eK3DikWkgB6uyyMK2TFtwICvfJaTVsgiGXzaRErVpNSQ/eBqWg6kqlbgUe+E9IUcLdYrBQIHvlFysQe4Y1uXqkIYjufNfw82gfjFyZUT17/wAyu0jN2lSNf0AAAAASUVORK5CYII="},492:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"goods-detail-prif",attrs:{flex:"dir:top"}},[n("div",{staticClass:"body",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title",attrs:{"flex-box":"1"}},[n("h2",[e._v(e._s(e.lists.productAbbrName))])]),e._v(" "),n("div",{staticClass:"item ",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title"},[e._v("业绩比较基准")]),e._v(" "),e.lists.productBenchmark?n("ul",{staticClass:"first",attrs:{flex:"dir:top"}},[e._m(0),e._v(" "),e._l(e.lists.productBenchmark,function(t){return n("li",{attrs:{flex:" box:mean"}},[n("span",{attrs:{"flex-box":"2"}},[e._v(e._s(t.range))]),e._v(" "),n("span",{attrs:{"flex-box":"1"}},[e._v(e._s(t.rate))])])})],2):e._e()]),e._v(" "),n("div",{staticClass:"item",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title"},[e._v("基本要素")]),e._v(" "),n("ul",[e.lists.productName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品全称")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productName))])]):e._e(),e._v(" "),e.lists.productType?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品类型")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v("契约型私募基金")])]):e._e(),e._v(" "),e.lists.productScale?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品规模")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productScale)+"(人民币)")])]):e._e(),e._v(" "),e.lists.productPeriod?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品期限")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productPeriod))])]):e._e(),e._v(" "),e.lists.productMinInvestmentValue?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("起投金额")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productMinInvestmentValue))])]):e._e(),e._v(" "),e.lists.productIssuerShortName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("发行机构")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productIssuerShortName))])]):e._e(),e._v(" "),e.lists.productManager?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品管理人")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productManager))])]):e._e(),e._v(" "),e.lists.productManageType?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("管理类型")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productManageType))])]):e._e(),e._v(" "),e.lists.productStructureType?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("结构类型")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productStructureType))])]):e._e(),e._v(" "),e.lists.productDuration?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("存续期限")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productDuration))])]):e._e(),e._v(" "),e.lists.productCustodian?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("产品托管人")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productCustodian))])]):e._e(),e._v(" "),e.lists.productCustomer?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("募集对象")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productCustomer))])]):e._e(),e._v(" "),e.lists.productInterestType?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("付息方式")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productInterestType))])]):e._e(),e._v(" "),e.lists.extraPerformanceRemuneration?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("超额收益")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.extraPerformanceRemuneration))])]):e._e(),e._v(" "),e.lists.exitMode?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("退出方式")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.exitMode))])]):e._e()])]),e._v(" "),e.lists.productApplyFee||e.lists.productPurchaseFee||e.lists.productManagerFee||e.lists.productCustodianFee||e.lists.productServiceFee||e.lists.productCloseDate||e.lists.productOpenDate?n("div",{staticClass:"item",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title"},[e._v("认购信息")]),e._v(" "),n("ul",[e.lists.productApplyFee?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("申购费")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productApplyFee))])]):e._e(),e._v(" "),e.lists.productPurchaseFee?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("认购费")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productPurchaseFee))])]):e._e(),e._v(" "),e.lists.productManagerFee?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("管理费")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productManagerFee))])]):e._e(),e._v(" "),e.lists.productCustodianFee?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("托管费")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productCustodianFee))])]):e._e(),e._v(" "),e.lists.productServiceFee?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("外包服务费")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productServiceFee))])]):e._e(),e._v(" "),e.lists.productCloseDate?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("封闭期")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productCloseDate))])]):e._e(),e._v(" "),e.lists.productOpenDate?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("开放日")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.productOpenDate))])]):e._e()])]):e._e(),e._v(" "),e.lists.bankAccountName||e.lists.bankAccountNo||e.lists.bankBrachName||e.lists.bankLargeNo?n("div",{staticClass:"item",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title"},[e._v("募集账户")]),e._v(" "),n("ul",[e.lists.bankAccountName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("账户名称")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.bankAccountName))])]):e._e(),e._v(" "),e.lists.bankAccountNo?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("募集账号")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.bankAccountNo))])]):e._e(),e._v(" "),e.lists.bankBrachName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("开户银行")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.bankBrachName))])]):e._e(),e._v(" "),e.lists.bankLargeNo?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("大额行号")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.bankLargeNo))])]):e._e()])]):e._e(),e._v(" "),e.lists.custodianAccountName||e.lists.custodianAccountNo||e.lists.custodianBrachName||e.lists.custodianLargeNo?n("div",{staticClass:"item",attrs:{"flex-box":"1"}},[n("div",{staticClass:"title"},[e._v("托管账户")]),e._v(" "),n("ul",[e.lists.custodianAccountName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("账户名称")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.custodianAccountName))])]):e._e(),e._v(" "),e.lists.custodianAccountNo?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("募集账号")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.custodianAccountNo))])]):e._e(),e._v(" "),e.lists.custodianBrachName?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("开户银行")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.custodianBrachName))])]):e._e(),e._v(" "),e.lists.custodianLargeNo?n("li",{attrs:{flex:"box:mean"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("大额行号")]),e._v(" "),n("span",{attrs:{"flex-box":"3"}},[e._v(e._s(e.lists.custodianLargeNo))])]):e._e()])]):e._e(),e._v(" "),e.lists.productInvestField?n("div",{staticClass:"item open ",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(1)}}},[n("div",{staticClass:"title",class:{change:1==e.tab1},attrs:{flex:"main:justify"}},[n("span",[e._v("投资范围")]),n("i")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.tab1,expression:"tab1"}],staticClass:"content",domProps:{innerHTML:e._s(e.lists.productInvestField)}})]):e._e(),e._v(" "),e.lists.productRiskTreatment?n("div",{staticClass:"item open",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(2)}}},[n("div",{staticClass:"title",class:{change:1==e.tab2},attrs:{flex:"main:justify"}},[n("span",[e._v("风控措施")]),n("i")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.tab2,expression:"tab2"}],staticClass:"content",domProps:{innerHTML:e._s(e.lists.productRiskTreatment)}})]):e._e(),e._v(" "),e.lists.productInformation?n("div",{staticClass:"item open",attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(3)}}},[n("div",{staticClass:"title",class:{change:1==e.tab3},attrs:{flex:"main:justify"}},[n("span",[e._v("产品亮点")]),n("i")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.tab3,expression:"tab3"}],staticClass:"content",domProps:{innerHTML:e._s(e.lists.productInformation[0].inforValue)}})]):e._e(),e._v(" "),e.lists.productAttachment&&e.lists.productAttachment.length>0?n("div",{staticClass:"item open",staticStyle:{"border-bottom":"none"},attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.toggle(4)}}},[n("div",{staticClass:"title",class:{change:1==e.tab4},attrs:{flex:"main:justify"},on:{click:function(t){t.stopPropagation(),e.toggle(4)}}},[n("span",[e._v("产品附件")]),n("i")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.tab4,expression:"tab4"}],staticClass:"content"},e._l(e.lists.productAttachment,function(t,s){return n("span",{key:s,staticStyle:{color:"#1D72C0",display:"block",padding:".3rem 0"},on:{click:function(n){n.stopPropagation(),e.linkpdf(t)}}},[e._v(e._s(t.attachmentName))])}))]):e._e(),e._v(" "),n("div",{staticStyle:{margin:".5rem"}})]),e._v(" "),n("div",{staticClass:"buttom",attrs:{"flex-box":"0",flex:"box:mean"}},[n("a",{staticClass:"hotline",attrs:{"flex-box":"1",href:"tel:4006403606"},on:{click:function(t){t.stopPropagation(),e.hotline(t)}}},[e._v("咨询热线")]),e._v(" "),n("div",{staticClass:"btn",class:{disabled:"立即预约"!=e.message&&"预热中"!=e.message},attrs:{"flex-box":"1"},on:{click:function(t){t.stopPropagation(),e.link(e.message,e.lists.productUuid)}}},[e._v(e._s(e.message)+"\n        ")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{attrs:{flex:"dir:left","flex-box":"1"}},[n("span",{attrs:{"flex-box":"1"}},[e._v("投资金额")]),e._v(" "),n("span",{staticStyle:{"margin-left":"4.5rem"},attrs:{"flex-box":"1"}},[e._v("业绩比较基准")])])}]}},65:function(e,t,n){var s=n(28)(n(259),n(492),null,null);e.exports=s.exports}});