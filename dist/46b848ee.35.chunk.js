webpackJsonp([35],{100:function(e,t,n){var i=n(28)(n(291),n(487),null,null);e.exports=i.exports},106:function(e,t,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=242)}({0:function(e,t){e.exports=function(e,t,n,o,s){var r,a=e=e||{},c=i(e.default);"object"!==c&&"function"!==c||(r=e,a=e.default);var l="function"==typeof a?a.options:a;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),o&&(l._scopeId=o);var d;if(s?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=d):n&&(d=n),d){var u=l.functional,p=u?l.render:l.beforeCreate;u?l.render=function(e,t){return d.call(t),p(e,t)}:l.beforeCreate=p?[].concat(p,d):[d]}return{esModule:r,exports:a,options:l}}},1:function(e,t){e.exports=n(2)},101:function(e,t){},164:function(e,t,n){function i(e){n(101)}var o=n(0)(n(86),n(170),i,null,null);e.exports=o.exports},170:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mint-toast-pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"mint-toast",class:e.customClass,style:{padding:""===e.iconClass?"10px":"20px"}},[""!==e.iconClass?n("i",{staticClass:"mint-toast-icon",class:e.iconClass}):e._e(),e._v(" "),n("span",{staticClass:"mint-toast-text",style:{"padding-top":""===e.iconClass?"0":"10px"}},[e._v(e._s(e.message))])])])},staticRenderFns:[]}},242:function(e,t,n){e.exports=n(50)},50:function(e,t,n){"use strict";var i=n(94);Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return i.a})},86:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function(){return{visible:!1}},computed:{customClass:function(){var e=[];switch(this.position){case"top":e.push("is-placetop");break;case"bottom":e.push("is-placebottom");break;default:e.push("is-placemiddle")}return e.push(this.className),e.join(" ")}}}},94:function(e,t,n){"use strict";var i=n(1),o=n.n(i),s=o.a.extend(n(164)),r=[],a=function(){if(r.length>0){var e=r[0];return r.splice(0,1),e}return new s({el:document.createElement("div")})},c=function(e){e&&r.push(e)},l=function(e){e.target.parentNode&&e.target.parentNode.removeChild(e.target)};s.prototype.close=function(){this.visible=!1,this.$el.addEventListener("transitionend",l),this.closed=!0,c(this)};var d=function(e){void 0===e&&(e={});var t=e.duration||3e3,n=a();return n.closed=!1,clearTimeout(n.timer),n.message="string"==typeof e?e:e.message,n.position=e.position||"middle",n.className=e.className||"",n.iconClass=e.iconClass||"",document.body.appendChild(n.$el),o.a.nextTick(function(){n.visible=!0,n.$el.removeEventListener("transitionend",l),~t&&(n.timer=setTimeout(function(){n.closed||n.close()},t))}),n};t.a=d}})},107:function(e,t,n){var i=n(108);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(52)(i,o);i.locals&&(e.exports=i.locals)},108:function(e,t,n){t=e.exports=n(51)(void 0),t.push([e.i,".mint-toast{position:fixed;max-width:80%;border-radius:5px;background:rgba(0,0,0,.7);color:#fff;box-sizing:border-box;text-align:center;z-index:1000;-webkit-transition:opacity .3s linear;transition:opacity .3s linear}.mint-toast.is-placebottom{bottom:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast.is-placemiddle{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.mint-toast.is-placetop{top:50px;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.mint-toast-icon{display:block;text-align:center;font-size:56px}.mint-toast-text{font-size:14px;display:block;text-align:center}.mint-toast-pop-enter,.mint-toast-pop-leave-active{opacity:0}",""])},109:function(e,t,n){e.exports=n.p+"share-icon.cfed3b76.png"},110:function(e,t,n){"use strict";var i=n(111),o=n.n(i),s=n(17),r=n(8),a=n(109),c=function(e){o.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},l=function(e){var t={url:window.location.href};r.a.ios&&(t.url=window.shareUrl);var n={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:a,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};s.a.get("/wechat/shareInfo",t).then(function(e){200==e.code&&(c(e.data.shareInfo),o.a.ready(function(){d(n),u(n)}))})},d=function(e,t){o.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})},u=function(e,t){o.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){t()},cancel:function(e){},fail:function(e){}})};t.a={wx:o.a,config:c,getShare:l}},111:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(t,i){e.exports=function(e,t){function i(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,s(n),function(e){c(t,e,i)}):u(t,i)}function o(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){i&&i.trigger&&i.trigger(e),c(t,e,n)}):i?u(t,i):u(t,n)}function s(e){return e=e||{},e.appId=E.appId,e.verifyAppId=E.appId,e.verifySignType="sha1",e.verifyTimestamp=E.timestamp+"",e.verifyNonceStr=E.nonceStr,e.verifySignature=E.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function a(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var i=t.errMsg;i||(i=t.err_msg,delete t.err_msg,i=l(e,i),t.errMsg=i),n=n||{},n._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",E.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function l(e,t){var n=e,i=_[n];i&&(n=i);var o="ok";if(t){var s=t.indexOf(":");o=t.substring(s+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==n&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return t=n+":"+o}function d(e){if(e){for(var t=0,n=e.length;n>t;++t){var i=e[t],o=v[i];o&&(e[t]=o)}return e}}function u(e,t){if(!(!E.debug||t&&t.isInnerInvoke)){var n=_[e];n&&(e=n),t&&t._complete&&delete t._complete}}function p(e){if(!(w||k||E.debug||"6.0.2">A||q.systemType<0)){var t=new Image;q.appId=E.appId,q.initTime=M.initEndTime-M.initStartTime,q.preVerifyTime=M.preVerifyEndTime-M.preVerifyStartTime,L.getNetworkType({isInnerInvoke:!0,success:function(e){q.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+q.version+"&o="+q.isPreVerifyOk+"&s="+q.systemType+"&c="+q.clientVersion+"&a="+q.appId+"&n="+q.networkType+"&i="+q.initTime+"&p="+q.preVerifyTime+"&u="+q.url;t.src=n}})}}function f(){return(new Date).getTime()}function m(t){I&&(e.WeixinJSBridge?t():b.addEventListener&&b.addEventListener("WeixinJSBridgeReady",t,!1))}function g(){L.invoke||(L.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,s(n),i)},L.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}if(!e.jWeixin){var h,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},_=function(){var e={};for(var t in v)e[v[t]]=t;return e}(),b=e.document,y=b.title,x=navigator.userAgent.toLowerCase(),S=navigator.platform.toLowerCase(),w=!(!S.match("mac")&&!S.match("win")),k=-1!=x.indexOf("wxdebugger"),I=-1!=x.indexOf("micromessenger"),C=-1!=x.indexOf("android"),T=-1!=x.indexOf("iphone")||-1!=x.indexOf("ipad"),A=function(){var e=x.match(/micromessenger\/(\d+\.\d+\.\d+)/)||x.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),M={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},q={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:T?1:C?2:-1,clientVersion:A,url:encodeURIComponent(location.href)},E={},P={_completes:[]},V={state:0,data:{}};m(function(){M.initEndTime=f()});var B=!1,O=[],L=(h={config:function(e){E=e,u("config",e);var t=!1!==E.check;m(function(){if(t)i(v.config,{verifyJsApiList:d(E.jsApiList)},function(){P._complete=function(e){M.preVerifyEndTime=f(),V.state=1,V.data=e},P.success=function(e){q.isPreVerifyOk=0},P.fail=function(e){P._fail?P._fail(e):V.state=-1};var e=P._completes;return e.push(function(){p()}),P.complete=function(t){for(var n=0,i=e.length;i>n;++n)e[n]();P._completes=[]},P}()),M.preVerifyStartTime=f();else{V.state=1;for(var e=P._completes,n=0,o=e.length;o>n;++n)e[n]();P._completes=[]}}),E.beta&&g()},ready:function(e){0!=V.state?e():(P._completes.push(e),!I&&E.debug&&e())},error:function(e){"6.0.2">A||(-1==V.state?e(V.data):P._fail=e)},checkJsApi:function(e){var t=function(e){var t=e.checkResult;for(var n in t){var i=_[n];i&&(t[i]=t[n],delete t[n])}return e};i("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(C){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){o(v.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||y,desc:e.title||y,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(v.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||y,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(v.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(v.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(v.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(C){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},getLocation:function(e){},previewImage:function(e){i(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===B?(B=!0,i("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(B=!1,O.length>0){var t=O.shift();wx.getLocalImgData(t)}},e}())):O.push(e)},getNetworkType:function(e){var t=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var i=t.indexOf(":"),o=t.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},n(h,"getLocation",function(e){e=e||{},i(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),n(h,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),n(h,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),n(h,"closeWindow",function(e){e=e||{},i("closeWindow",{},e)}),n(h,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),n(h,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),n(h,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),n(h,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),n(h,"scanQRCode",function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(T){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e}())}),n(h,"openAddress",function(e){i(v.openAddress,{},function(){return e._complete=function(e){e=a(e)},e}())}),n(h,"openProductSpecificView",function(e){i(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),n(h,"addCard",function(e){for(var t=e.cardList,n=[],o=0,s=t.length;s>o;++o){var r=t[o],a={card_id:r.cardId,card_ext:r.cardExt};n.push(a)}i(v.addCard,{card_list:n},function(){return e._complete=function(e){var t=e.card_list;if(t){t=JSON.parse(t);for(var n=0,i=t.length;i>n;++n){var o=t[n];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=t,delete e.card_list}},e}())}),n(h,"chooseCard",function(e){i("chooseCard",{app_id:E.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),n(h,"openCard",function(e){for(var t=e.cardList,n=[],o=0,s=t.length;s>o;++o){var r=t[o],a={card_id:r.cardId,code:r.code};n.push(a)}i(v.openCard,{card_list:n},e)}),n(h,"consumeAndShareCard",function(e){i(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),n(h,"chooseWXPay",function(e){i(v.chooseWXPay,r(e),e)}),n(h,"openEnterpriseRedPacket",function(e){i(v.openEnterpriseRedPacket,r(e),e)}),n(h,"startSearchBeacons",function(e){i(v.startSearchBeacons,{ticket:e.ticket},e)}),n(h,"stopSearchBeacons",function(e){i(v.stopSearchBeacons,{},e)}),n(h,"onSearchBeacons",function(e){o(v.onSearchBeacons,e)}),n(h,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),h),N=1,R={};return b.addEventListener("error",function(e){if(!C){var t=e.target,n=t.tagName,i=t.src;if("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=t["wx-id"];if(o||(o=N++,t["wx-id"]=o),R[o])return;R[o]=!0,wx.getLocalImgData({localId:i,success:function(e){t.src=e.localData}})}}}},!0),b.addEventListener("load",function(e){if(!C){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var i=t["wx-id"];i&&(R[i]=!1)}}},!0),t&&(e.wx=e.jWeixin=L),L}}(t)}(window)},219:function(e,t,n){"use strict";t.a=[{question:"您的主要收入来自于：",title:"收入来源",answers:[{title:"A．无固定收入",score:0},{title:"B．工资、劳务报酬",score:1},{title:"C．生产经营所得",score:2},{title:"D．利息、股息、转让证券等金融性资产收入",score:3},{title:"E．出租、出售房地产等非金融性资产收入",score:4}]},{question:"在您每年的家庭可支配收入中，可用于金融投资（储蓄、存款除外）的比例为：",title:"财务状况",answers:[{title:"A．10%以下",score:1},{title:"B．10%－30%",score:2},{title:"C．30%－50%",score:3},{title:"D．50%－70%",score:4},{title:"E．70%以上",score:5}]},{question:"您是否有尚未结清的数额较大的债务，如有，最大一笔债务的性质是：",title:"债务情况",answers:[{title:"A．有，住房或汽车按揭贷款等长期债务",score:1},{title:"B．有，信用卡欠款 等短期信用债务",score:2},{title:"C．有，亲朋之间借款",score:3},{title:"D．没有债务",score:4}]},{question:"您的投资目标是什么？",title:"投资目的",answers:[{title:"A．保险计划或将资产妥善地传承给下一代",score:1},{title:"B．子女教育或保证养老",score:2},{title:"C．购置符合自己身份的房、车",score:3},{title:"D．维持高品质的生活",score:4},{title:"E．创造更多的财富",score:5}]},{question:"针对此次可供投资的资金，您的投资期限是多久？",title:"投资期限",answers:[{title:"A．一年及一年以内%以上",score:1},{title:"B．一年以上三年以内",score:2},{title:"C．三年以上五年以内",score:3},{title:"D．五年以上十年以内",score:4},{title:"E．十年以上",score:5}]},{question:"您的投资经验可以被概括为：",title:"投资经验",answers:[{title:"A．没经验：只有银行活期账户或定期存款",score:1},{title:"B．经验尚浅：仅购买过货币基金、银行理财等产品",score:2},{title:"C．一般：购买过债券型、混合型基金",score:3},{title:"D．丰富：有自己的专业投资判断，自主投资股票及股票型、基金等产品",score:4},{title:"E．非常丰富：参与过期权、期货等高风险产品的交易",score:5}]},{question:"您可以重点投资于哪些种类的投资品种？ ",title:"投资品种",answers:[{title:"A．货币市场基金",score:1},{title:"B．债券、债券基金等固定收益类投资品种",score:2},{title:"C．股票、混合型基金、股票型基金等权益类投资品种",score:3},{title:"D. 期货、期权等金融衍生品",score:4},{title:"E. 其他产品或者服务",score:5}]},{question:"以下哪项描述最符合您的投资态度？",title:"风险偏好",answers:[{title:"A．厌恶风险，不希望本金损失，希望获得稳定回报",score:0},{title:"B．保守投资，不希望本金损失，愿意承担一定幅度的收益波动",score:1},{title:"C．寻求资金的较高收益和成长性，愿意为此承担有限本金损失",score:2},{title:"D．希望赚取高回报，愿意为此承担较大本金损失",score:3}]},{question:"您认为自己在短期和长期能承受的最大投资损失是多少？",title:"短期及长期风险承受能力",answers:[{title:"A.不能承受任何损失",score:0},{title:"B．3个月亏损3%以内，3年亏损10%以内",score:1},{title:"C．3个月亏损10%以内，3年亏损20%以内",score:2},{title:"D. 3个月亏损15%以内，3年亏损30%以内",score:3},{title:"E. 3个月亏损20%以上，3年亏损50%以上",score:4}]},{question:"您的个人征信记录中是否包含信用卡、贷款等逾期缴纳记录？",title:"征信状况",answers:[{title:"A．没有",score:3},{title:"B．有过逾期记录，但已还清，征信记录已不展示",score:2},{title:"C．有过逾期记录，但已还清，但征信记录仍展示",score:1},{title:"D．目前仍有逾期记录，仍未还清",score:0}]}]},291:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(107),o=(n.n(i),n(106)),s=n.n(o),r=n(219),a=n(17),c=n(8),l=n(110),d=n(18),u=n(1),p=(n.n(u),n(390)),f=(n.n(p),null),m=r.a.length;t.default={name:"risk-assessment",data:function(){return{title:"",question:"",quIndex:0,quLen:r.a.length,currentIndex:99,isApp:!1,answers:[],scores:[]}},created:function(){c.a.isWeixin&&this.getShare(),this.setIndex(0),c.a.kingold&&(this.isApp=!0),this.$route.path.indexOf("app")>-1&&(this.isApp=!0)},computed:{showSubmit:function(){return this.scores.length>=m-1},disabled:function(){return 99==this.currentIndex}},methods:{getShare:function(){l.a.getShare({title:"金疙瘩——风险测评"})},setIndex:function(){var e=r.a[this.quIndex];this.title=e.title,this.question=e.question,this.answers=e.answers},getLast:function(){m==this.scores.length&&this.scores.pop(),this.quIndex--,this.setIndex(),this.scores.pop(),this.currentIndex=99},selectItem:function(e,t){var n=this;if(this.currentIndex=t,m==this.scores.length)return this.scores.pop(),this.scores.push(e.score),!1;f&&clearTimeout(f),f=setTimeout(function(){if(n.scores.push(e.score),m>n.scores.length&&(n.currentIndex=99),m==n.scores.length)return!1;n.quIndex++,n.setIndex()},1e3)},updateUserInfo:function(){var e=this,t=0;this.scores.map(function(e){t+=e});var n=this.scores.join("$$");a.a.post("/updateUserInfo",{investorRiskScore:t,investorRiskVersion:2,investorRiskAnswer:n}).then(function(t){200==t.code?(e.$store.dispatch("getUserInfo"),e.isApp?e.$router.replace({path:"/assessment-result",query:{from:"app"}}):e.$router.replace("/assessment-result")):s()("提交失败,稍后再试")})}},mounted:function(){n.i(d.a)({tagname:"title",param:{backtype:2,backAndRefresh:1,title:"风险测评",backstr:"本次风险测评还未完成，退出后将不保存当前进度，确定退出？",keyboard_mode:0}})},destroyed:function(){}}},343:function(e,t,n){t=e.exports=n(51)(void 0),t.push([e.i,".risk-assessment{position:relative;width:100%;height:100%}.risk-assessment .content{position:relative;overflow:hidden;margin:.8rem;padding:1rem .75rem;background-color:#fff;border-radius:.3rem}.risk-assessment .content .qu-order{position:absolute;right:-1.5rem;top:-1.5rem;width:4rem;height:4rem;background-color:#1d72c0;border-radius:50%}.risk-assessment .content .qu-order.app{background-color:#eece83}.risk-assessment .content .qu-order.app span{color:#7c4f2b}.risk-assessment .content .qu-order span{position:absolute;color:#fff;top:2rem;left:.45rem}.risk-assessment .content .title{text-align:center;color:#333;font-size:.9rem}.risk-assessment .content .qu-title{color:#333;font-size:.8rem;padding:.8rem 0}.risk-assessment .content .qu-item{border:1px solid #d8d8d8;border-radius:5rem;color:#333;font-size:.7rem;padding:.5rem 1rem;margin-bottom:.5rem}.risk-assessment .content .qu-item.active{background-color:#1d72c0;border:1px solid #1d72c0;color:#fff}.risk-assessment .content .qu-item.active.app{background-color:#fff;color:#333;border:1px solid #7c4f2b}.risk-assessment .content .last-item{background:#6e3018;border-radius:4px;margin:1rem auto;color:#fff;font-size:.7rem;padding:.4rem 0;width:4rem;text-align:center}.risk-assessment .submit{text-align:center;margin-top:2rem}.risk-assessment .submit .btn-submit{height:2rem;color:#fff;width:15rem;margin:auto}.risk-assessment .submit .btn-submit:disabled{color:#999;background-image:linear-gradient(-1deg,#b1b1b1,#b7b7b7 24%,#e9e9e9 70%,#eeeded)!important}.risk-assessment .submit .btn-submit.app{box-shadow:none;background-image:linear-gradient(-1deg,#7c4f2b,#8f6441 24%,#d8bd7e 70%,#eece83)}",""])},390:function(e,t,n){var i=n(343);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(52)(i,o);i.locals&&(e.exports=i.locals)},487:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"risk-assessment"},[n("div",{staticClass:"content"},[n("div",{staticClass:"qu-order",class:{app:e.isApp}},[n("span",[e._v("\n                "+e._s(e.quIndex+1)+"/"+e._s(e.quLen)+"\n          ")])]),e._v(" "),n("div",{staticClass:"title"},[e._v(e._s(e.title))]),e._v(" "),n("div",{staticClass:"qu-title"},[e._v(e._s(e.quIndex+1)+"、"+e._s(e.question))]),e._v(" "),e._l(e.answers,function(t,i){return n("div",{key:i,staticClass:"qu-item",class:{active:i==e.currentIndex,app:e.isApp},on:{click:function(n){n.stopPropagation(),e.selectItem(t,i)}}},[e._v("\n            "+e._s(t.title)+"\n        ")])}),e._v(" "),e.quIndex?n("div",{staticClass:"last-item",on:{click:function(t){t.stopPropagation(),e.getLast()}}},[e._v("上一题")]):e._e()],2),e._v(" "),e.showSubmit?n("div",{staticClass:"submit"},[n("button",{staticClass:"btn-primary btn-submit",class:{app:e.isApp},attrs:{disabled:e.disabled},on:{click:function(t){t.stopPropagation(),e.updateUserInfo(t)}}},[e._v("提交\n        ")])]):e._e()])},staticRenderFns:[]}}});