webpackJsonp([21],{104:function(e,n,t){e.exports=t.p+"share-icon.cfed3b76.png"},105:function(e,n,t){"use strict";var i=t(106),r=t.n(i),o=t(12),s=t(6),a=t(104),c=function(e){r.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},d=function(e){var n={url:window.location.href};s.a.ios&&(n.url=window.shareUrl);var t={title:e.title||"金疙瘩——中高端理财产品聚集地",link:window.location.href,imgUrl:a,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};o.a.get("/wechat/shareInfo",n).then(function(e){200==e.code&&(c(e.data.shareInfo),r.a.ready(function(){u(t),l(t)}))})},u=function(e,n){r.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})},l=function(e,n){r.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})};n.a={wx:r.a,config:c,getShare:d}},106:function(e,n){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}!function(n,i){e.exports=function(e,n){function i(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(t),function(e){c(n,e,i)}):l(n,i)}function r(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){i&&i.trigger&&i.trigger(e),c(n,e,t)}):i?l(n,i):l(n,t)}function o(e){return e=e||{},e.appId=V.appId,e.verifyAppId=V.appId,e.verifySignType="sha1",e.verifyTimestamp=V.timestamp+"",e.verifyNonceStr=V.nonceStr,e.verifySignature=V.signature,e}function s(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function a(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=d(e,i),n.errMsg=i),t=t||{},t._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",V.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var r=i.indexOf(":");switch(i.substring(r+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function d(e,n){var t=e,i=y[t];i&&(t=i);var r="ok";if(n){var o=n.indexOf(":");r=n.substring(o+1),"confirm"==r&&(r="ok"),"failed"==r&&(r="fail"),-1!=r.indexOf("failed_")&&(r=r.substring(7)),-1!=r.indexOf("fail_")&&(r=r.substring(5)),r=r.replace(/_/g," "),r=r.toLowerCase(),("access denied"==r||"no permission to execute"==r)&&(r="permission denied"),"config"==t&&"function not exist"==r&&(r="ok"),""==r&&(r="fail")}return n=t+":"+r}function u(e){if(e){for(var n=0,t=e.length;t>n;++n){var i=e[n],r=v[i];r&&(e[n]=r)}return e}}function l(e,n){if(!(!V.debug||n&&n.isInnerInvoke)){var t=y[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function p(e){if(!(k||T||V.debug||"6.0.2">C||R.systemType<0)){var n=new Image;R.appId=V.appId,R.initTime=A.initEndTime-A.initStartTime,R.preVerifyTime=A.preVerifyEndTime-A.preVerifyStartTime,E.getNetworkType({isInnerInvoke:!0,success:function(e){R.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+R.version+"&o="+R.isPreVerifyOk+"&s="+R.systemType+"&c="+R.clientVersion+"&a="+R.appId+"&n="+R.networkType+"&i="+R.initTime+"&p="+R.preVerifyTime+"&u="+R.url;n.src=t}})}}function f(){return(new Date).getTime()}function m(n){x&&(e.WeixinJSBridge?n():S.addEventListener&&S.addEventListener("WeixinJSBridgeReady",n,!1))}function g(){E.invoke||(E.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(t),i)},E.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var h,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},y=function(){var e={};for(var n in v)e[v[n]]=n;return e}(),S=e.document,_=S.title,w=navigator.userAgent.toLowerCase(),I=navigator.platform.toLowerCase(),k=!(!I.match("mac")&&!I.match("win")),T=-1!=w.indexOf("wxdebugger"),x=-1!=w.indexOf("micromessenger"),b=-1!=w.indexOf("android"),M=-1!=w.indexOf("iphone")||-1!=w.indexOf("ipad"),C=function(){var e=w.match(/micromessenger\/(\d+\.\d+\.\d+)/)||w.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),A={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},R={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:M?1:b?2:-1,clientVersion:C,url:encodeURIComponent(location.href)},V={},P={_completes:[]},O={state:0,data:{}};m(function(){A.initEndTime=f()});var L=!1,B=[],E=(h={config:function(e){V=e,l("config",e);var n=!1!==V.check;m(function(){if(n)i(v.config,{verifyJsApiList:u(V.jsApiList)},function(){P._complete=function(e){A.preVerifyEndTime=f(),O.state=1,O.data=e},P.success=function(e){R.isPreVerifyOk=0},P.fail=function(e){P._fail?P._fail(e):O.state=-1};var e=P._completes;return e.push(function(){p()}),P.complete=function(n){for(var t=0,i=e.length;i>t;++t)e[t]();P._completes=[]},P}()),A.preVerifyStartTime=f();else{O.state=1;for(var e=P._completes,t=0,r=e.length;r>t;++t)e[t]();P._completes=[]}}),V.beta&&g()},ready:function(e){0!=O.state?e():(P._completes.push(e),!x&&V.debug&&e())},error:function(e){"6.0.2">C||(-1==O.state?e(O.data):P._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var t in n){var i=y[t];i&&(n[i]=n[t],delete n[t])}return e};i("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(b){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=n(e)},e}())},onMenuShareTimeline:function(e){r(v.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||_,desc:e.title||_,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){r(v.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||_,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){r(v.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){r(v.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){r(v.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){r("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){r("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(b){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},getLocation:function(e){},previewImage:function(e){i(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===L?(L=!0,i("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(L=!1,B.length>0){var n=B.shift();wx.getLocalImgData(n)}},e}())):B.push(e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),r=n.substring(i+1);switch(r){case"wifi":case"edge":case"wwan":e.networkType=r;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},t(h,"getLocation",function(e){e=e||{},i(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),t(h,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),t(h,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),t(h,"closeWindow",function(e){e=e||{},i("closeWindow",{},e)}),t(h,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),t(h,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),t(h,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),t(h,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),t(h,"scanQRCode",function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(M){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e}())}),t(h,"openAddress",function(e){i(v.openAddress,{},function(){return e._complete=function(e){e=a(e)},e}())}),t(h,"openProductSpecificView",function(e){i(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),t(h,"addCard",function(e){for(var n=e.cardList,t=[],r=0,o=n.length;o>r;++r){var s=n[r],a={card_id:s.cardId,card_ext:s.cardExt};t.push(a)}i(v.addCard,{card_list:t},function(){return e._complete=function(e){var n=e.card_list;if(n){n=JSON.parse(n);for(var t=0,i=n.length;i>t;++t){var r=n[t];r.cardId=r.card_id,r.cardExt=r.card_ext,r.isSuccess=!!r.is_succ,delete r.card_id,delete r.card_ext,delete r.is_succ}e.cardList=n,delete e.card_list}},e}())}),t(h,"chooseCard",function(e){i("chooseCard",{app_id:V.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),t(h,"openCard",function(e){for(var n=e.cardList,t=[],r=0,o=n.length;o>r;++r){var s=n[r],a={card_id:s.cardId,code:s.code};t.push(a)}i(v.openCard,{card_list:t},e)}),t(h,"consumeAndShareCard",function(e){i(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),t(h,"chooseWXPay",function(e){i(v.chooseWXPay,s(e),e)}),t(h,"openEnterpriseRedPacket",function(e){i(v.openEnterpriseRedPacket,s(e),e)}),t(h,"startSearchBeacons",function(e){i(v.startSearchBeacons,{ticket:e.ticket},e)}),t(h,"stopSearchBeacons",function(e){i(v.stopSearchBeacons,{},e)}),t(h,"onSearchBeacons",function(e){r(v.onSearchBeacons,e)}),t(h,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),h),N=1,W={};return S.addEventListener("error",function(e){if(!b){var n=e.target,t=n.tagName,i=n.src;if("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var r=n["wx-id"];if(r||(r=N++,n["wx-id"]=r),W[r])return;W[r]=!0,wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}}}},!0),S.addEventListener("load",function(e){if(!b){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(W[i]=!1)}}},!0),n&&(e.wx=e.jWeixin=E),E}}(n)}(window)},365:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(13),r=t(6),o=t(105),s=(t(14),t(366)),a=(t.n(s),t(368)),c=t.n(a),d=t(369),u=t.n(d),l=t(370),p=t.n(l),f=t(371),m=t.n(f),g=t(372),h=t.n(g),v=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};n.default={name:"assessment-result",data:function(){return{isApp:!1}},created:function(){r.a.isWeixin&&this.getShare(),r.a.kingold&&(this.isApp=!0),"app"==this.$route.query.from&&(this.isApp=!0)},computed:v({},Object(i.mapState)(["investorRiskType","investorRiskTypeDesc"]),{typeUrl:function(){return this.investorRiskType?1==this.investorRiskType?h.a:2==this.investorRiskType?m.a:3==this.investorRiskType?u.a:p.a:c.a},typeText:function(){return this.investorRiskType?1==this.investorRiskType?"稳健型":2==this.investorRiskType?"平衡型":3==this.investorRiskType?"成长型":"进取型":"保守型"},typeAblity:function(){return this.investorRiskType?1==this.investorRiskType?"较弱":2==this.investorRiskType?"中等":3==this.investorRiskType?"较强":"强":"弱"}}),methods:{getShare:function(){o.a.getShare({title:"金疙瘩——风险测评"})},reSubmit:function(){this.isApp?this.$router.replace({path:"/risk-assessment/app",query:{retest:1}}):this.$router.replace({path:"/risk-assessment/wechat",query:{retest:1}})}},destroyed:function(){}}},366:function(e,n,t){var i=t(367);"string"==typeof i&&(i=[[e.i,i,""]]);var r={};r.transform=void 0;t(52)(i,r);i.locals&&(e.exports=i.locals)},367:function(e,n,t){n=e.exports=t(51)(void 0),n.push([e.i,".assessment-result{position:relative;width:100%;height:100%}.assessment-result .content{position:relative;overflow:hidden;margin:.8rem;padding:1rem .75rem;background-color:#fff;border-radius:.3rem}.assessment-result .content .title{text-align:center;color:#333;font-size:.9rem}.assessment-result .content .img-warp{text-align:center;margin:1.5rem auto 1rem}.assessment-result .content .img-warp img{height:3rem;width:auto;margin:auto}.assessment-result .content .type-text{color:#333;text-align:center;font-size:1.2rem}.assessment-result .content .sub-text{padding:.5rem 0 1rem;color:#333;font-size:.8rem;text-align:center}.assessment-result .re-submit{text-align:center;margin-top:2rem}.assessment-result .re-submit .btn-submit{height:2rem;color:#fff;width:15rem;margin:auto;border:1px solid #1d72c0;color:#1d73c2}",""])},368:function(e,n,t){e.exports=t.p+"banshou.6579e5c6.png"},369:function(e,n,t){e.exports=t.p+"chengzhang.812f39eb.png"},370:function(e,n,t){e.exports=t.p+"jinqu.5493200a.png"},371:function(e,n,t){e.exports=t.p+"pinghen.c968c135.png"},372:function(e,n,t){e.exports=t.p+"wenjian.30d1a2fd.png"},373:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"assessment-result"},[t("div",{staticClass:"content"},[t("div",{staticClass:"title"},[e._v("您的风险评测结果是")]),e._v(" "),t("div",{staticClass:"img-warp"},[t("img",{attrs:{src:e.typeUrl}})]),e._v(" "),t("div",{staticClass:"type-text"},[e._v(e._s(e.typeText))]),e._v(" "),t("div",{staticClass:"sub-text"},[e._v("您的风险承受能力"+e._s(e.typeAblity))])]),e._v(" "),t("div",{staticClass:"re-submit"},[t("button",{staticClass:"btn-default btn-submit",on:{click:function(n){n.stopPropagation(),e.reSubmit(n)}}},[e._v("重新测评")])])])},staticRenderFns:[]}},86:function(e,n,t){var i=t(23)(t(365),t(373),null,null);e.exports=i.exports}});