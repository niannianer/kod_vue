webpackJsonp([32],{137:function(e,n,i){e.exports=i.p+"share-icon.44e035ec.png"},138:function(e,n,i){"use strict";var t=i(139),r=i.n(t),a=i(15),o=i(7),s=i(137),c=function(e){r.a.config({debug:!1,appId:e.app_id,timestamp:parseInt(e.js_timestamp),nonceStr:e.js_nonce_str,signature:e.js_signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},d=function(e){var n={url:window.location.href};o.a.ios&&(n.url=window.shareUrl);var i={title:e.title||"金疙瘩——中高端理财产品聚集地",link:e.link||window.location.href,imgUrl:s,desc:e.desc||"中冀投资旗下智能化定制理财服务平台，专业可信赖。"};a.a.get("/wechat/shareInfo",n).then(function(e){200==e.code&&(c(e.data.shareInfo),r.a.ready(function(){u(i),l(i)}))})},u=function(e,n){r.a.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})},l=function(e,n){r.a.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(e){},success:function(e){n()},cancel:function(e){},fail:function(e){}})};n.a={wx:r.a,config:c,getShare:d}},139:function(e,n){function i(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}!function(n,t){e.exports=function(e,n){function t(n,i,t){e.WeixinJSBridge?WeixinJSBridge.invoke(n,a(i),function(e){c(n,e,t)}):l(n,t)}function r(n,i,t){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){t&&t.trigger&&t.trigger(e),c(n,e,i)}):t?l(n,t):l(n,i)}function a(e){return e=e||{},e.appId=U.appId,e.verifyAppId=U.appId,e.verifySignType="sha1",e.verifyTimestamp=U.timestamp+"",e.verifyNonceStr=U.nonceStr,e.verifySignature=U.signature,e}function o(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function c(e,n,i){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var t=n.errMsg;t||(t=n.err_msg,delete n.err_msg,t=d(e,t),n.errMsg=t),i=i||{},i._complete&&(i._complete(n),delete i._complete),t=n.errMsg||"",U.debug&&!i.isInnerInvoke&&alert(JSON.stringify(n));var r=t.indexOf(":");switch(t.substring(r+1)){case"ok":i.success&&i.success(n);break;case"cancel":i.cancel&&i.cancel(n);break;default:i.fail&&i.fail(n)}i.complete&&i.complete(n)}function d(e,n){var i=e,t=w[i];t&&(i=t);var r="ok";if(n){var a=n.indexOf(":");r=n.substring(a+1),"confirm"==r&&(r="ok"),"failed"==r&&(r="fail"),-1!=r.indexOf("failed_")&&(r=r.substring(7)),-1!=r.indexOf("fail_")&&(r=r.substring(5)),r=r.replace(/_/g," "),r=r.toLowerCase(),("access denied"==r||"no permission to execute"==r)&&(r="permission denied"),"config"==i&&"function not exist"==r&&(r="ok"),""==r&&(r="fail")}return n=i+":"+r}function u(e){if(e){for(var n=0,i=e.length;i>n;++n){var t=e[n],r=v[t];r&&(e[n]=r)}return e}}function l(e,n){if(!(!U.debug||n&&n.isInnerInvoke)){var i=w[e];i&&(e=i),n&&n._complete&&delete n._complete}}function f(e){if(!(B||I||U.debug||"6.0.2">E||M.systemType<0)){var n=new Image;M.appId=U.appId,M.initTime=T.initEndTime-T.initStartTime,M.preVerifyTime=T.preVerifyEndTime-T.preVerifyStartTime,J.getNetworkType({isInnerInvoke:!0,success:function(e){M.networkType=e.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+M.version+"&o="+M.isPreVerifyOk+"&s="+M.systemType+"&c="+M.clientVersion+"&a="+M.appId+"&n="+M.networkType+"&i="+M.initTime+"&p="+M.preVerifyTime+"&u="+M.url;n.src=i}})}}function p(){return(new Date).getTime()}function g(n){k&&(e.WeixinJSBridge?n():A.addEventListener&&A.addEventListener("WeixinJSBridgeReady",n,!1))}function m(){J.invoke||(J.invoke=function(n,i,t){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,a(i),t)},J.on=function(n,i){e.WeixinJSBridge&&WeixinJSBridge.on(n,i)})}if(!e.jWeixin){var h,v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},w=function(){var e={};for(var n in v)e[v[n]]=n;return e}(),A=e.document,C=A.title,S=navigator.userAgent.toLowerCase(),b=navigator.platform.toLowerCase(),B=!(!b.match("mac")&&!b.match("win")),I=-1!=S.indexOf("wxdebugger"),k=-1!=S.indexOf("micromessenger"),y=-1!=S.indexOf("android"),x=-1!=S.indexOf("iphone")||-1!=S.indexOf("ipad"),E=function(){var e=S.match(/micromessenger\/(\d+\.\d+\.\d+)/)||S.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),T={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},M={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:x?1:y?2:-1,clientVersion:E,url:encodeURIComponent(location.href)},U={},L={_completes:[]},N={state:0,data:{}};g(function(){T.initEndTime=p()});var Q=!1,V=[],J=(h={config:function(e){U=e,l("config",e);var n=!1!==U.check;g(function(){if(n)t(v.config,{verifyJsApiList:u(U.jsApiList)},function(){L._complete=function(e){T.preVerifyEndTime=p(),N.state=1,N.data=e},L.success=function(e){M.isPreVerifyOk=0},L.fail=function(e){L._fail?L._fail(e):N.state=-1};var e=L._completes;return e.push(function(){f()}),L.complete=function(n){for(var i=0,t=e.length;t>i;++i)e[i]();L._completes=[]},L}()),T.preVerifyStartTime=p();else{N.state=1;for(var e=L._completes,i=0,r=e.length;r>i;++i)e[i]();L._completes=[]}}),U.beta&&m()},ready:function(e){0!=N.state?e():(L._completes.push(e),!k&&U.debug&&e())},error:function(e){"6.0.2">E||(-1==N.state?e(N.data):L._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var i in n){var t=w[i];t&&(n[t]=n[i],delete n[i])}return e};t("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(y){var i=e.checkResult;i&&(e.checkResult=JSON.parse(i))}e=n(e)},e}())},onMenuShareTimeline:function(e){r(v.onMenuShareTimeline,{complete:function(){t("shareTimeline",{title:e.title||C,desc:e.title||C,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){r(v.onMenuShareAppMessage,{complete:function(){t("sendAppMessage",{title:e.title||C,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){r(v.onMenuShareQQ,{complete:function(){t("shareQQ",{title:e.title||C,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){r(v.onMenuShareWeibo,{complete:function(){t("shareWeiboApp",{title:e.title||C,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){r(v.onMenuShareQZone,{complete:function(){t("shareQZone",{title:e.title||C,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){t("startRecord",{},e)},stopRecord:function(e){t("stopRecord",{},e)},onVoiceRecordEnd:function(e){r("onVoiceRecordEnd",e)},playVoice:function(e){t("playVoice",{localId:e.localId},e)},pauseVoice:function(e){t("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){t("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){r("onVoicePlayEnd",e)},uploadVoice:function(e){t("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){t("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){t("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){t("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(y){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},getLocation:function(e){},previewImage:function(e){t(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){t("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){t("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===Q?(Q=!0,t("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(Q=!1,V.length>0){var n=V.shift();wx.getLocalImgData(n)}},e}())):V.push(e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var t=n.indexOf(":"),r=n.substring(t+1);switch(r){case"wifi":case"edge":case"wwan":e.networkType=r;break;default:e.errMsg="getNetworkType:fail"}}return e};t("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){t("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},i(h,"getLocation",function(e){e=e||{},t(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())}),i(h,"hideOptionMenu",function(e){t("hideOptionMenu",{},e)}),i(h,"showOptionMenu",function(e){t("showOptionMenu",{},e)}),i(h,"closeWindow",function(e){e=e||{},t("closeWindow",{},e)}),i(h,"hideMenuItems",function(e){t("hideMenuItems",{menuList:e.menuList},e)}),i(h,"showMenuItems",function(e){t("showMenuItems",{menuList:e.menuList},e)}),i(h,"hideAllNonBaseMenuItem",function(e){t("hideAllNonBaseMenuItem",{},e)}),i(h,"showAllNonBaseMenuItem",function(e){t("showAllNonBaseMenuItem",{},e)}),i(h,"scanQRCode",function(e){e=e||{},t("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(x){var n=e.resultStr;if(n){var i=JSON.parse(n);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e}())}),i(h,"openAddress",function(e){t(v.openAddress,{},function(){return e._complete=function(e){e=s(e)},e}())}),i(h,"openProductSpecificView",function(e){t(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),i(h,"addCard",function(e){for(var n=e.cardList,i=[],r=0,a=n.length;a>r;++r){var o=n[r],s={card_id:o.cardId,card_ext:o.cardExt};i.push(s)}t(v.addCard,{card_list:i},function(){return e._complete=function(e){var n=e.card_list;if(n){n=JSON.parse(n);for(var i=0,t=n.length;t>i;++i){var r=n[i];r.cardId=r.card_id,r.cardExt=r.card_ext,r.isSuccess=!!r.is_succ,delete r.card_id,delete r.card_ext,delete r.is_succ}e.cardList=n,delete e.card_list}},e}())}),i(h,"chooseCard",function(e){t("chooseCard",{app_id:U.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())}),i(h,"openCard",function(e){for(var n=e.cardList,i=[],r=0,a=n.length;a>r;++r){var o=n[r],s={card_id:o.cardId,code:o.code};i.push(s)}t(v.openCard,{card_list:i},e)}),i(h,"consumeAndShareCard",function(e){t(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),i(h,"chooseWXPay",function(e){t(v.chooseWXPay,o(e),e)}),i(h,"openEnterpriseRedPacket",function(e){t(v.openEnterpriseRedPacket,o(e),e)}),i(h,"startSearchBeacons",function(e){t(v.startSearchBeacons,{ticket:e.ticket},e)}),i(h,"stopSearchBeacons",function(e){t(v.stopSearchBeacons,{},e)}),i(h,"onSearchBeacons",function(e){r(v.onSearchBeacons,e)}),i(h,"openEnterpriseChat",function(e){t("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),h),R=1,W={};return A.addEventListener("error",function(e){if(!y){var n=e.target,i=n.tagName,t=n.src;if("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){if(-1!=t.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var r=n["wx-id"];if(r||(r=R++,n["wx-id"]=r),W[r])return;W[r]=!0,wx.getLocalImgData({localId:t,success:function(e){n.src=e.localData}})}}}},!0),A.addEventListener("load",function(e){if(!y){var n=e.target,i=n.tagName;if(n.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var t=n["wx-id"];t&&(W[t]=!1)}}},!0),n&&(e.wx=e.jWeixin=J),J}}(n)}(window)},143:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAYAAAASYli2AAAAAXNSR0IArs4c6QAAArtJREFUSA2dlclrFEEUh9M9fQjEBVwiBplNEfGiuB70FEHE6MGDDKKgB42gYBT06MU/QEEvIh7ihgg6yQTBi4qCF0/iYcDLbF4nCAqS4GR6/F7TNdTUVCfdU1Cper/33pdXS9cMDWmtXq+P12q1g5qUeOqojEajcYh5ib7QbrdP5PP578qXZHQlWGCdTqfIdD19i+u6c5VKZZ/4kjaXJR4jadZxnFGVzDzteV4J6H6lxR0pxhXgBkvCWCqVKoVbYXHbJbfZbN5iuXdtbirdLFtBpYdtfpvWPRRO+DaAO7YgtHnAhWw2+zHC35W7QFFY3jUGqTYlttF+YRcymcx7Q+8xe4Di4ZDOU+lD+nBPJAZV/mY4Q6XvTJ+y+4DiYPmnGKaBrlGBagT6B/0slb5Vmj5agRLA8o+Q/JLkjXpCOP/r+/65XC43a/qCi22KYlPBB4An6T8t/hGu23P+6WnTFwmUQCr42mq1jgP9YSZij6A/Zc8Lui9yyXoQSVkqeo22V9dlDnSRbZlkRc/EXrZCCZBGpXUejAmSPwWC9gfYMPpjuR0ix6pQ5ZfL5VW0N9hHlaaNS4CnYlWokoCNkrRJ2cboUe1qzxAjTb7n7cBKJO2wBHGL/Jtszb1YS+Z67AQij+82C6yDdp1DuS++FYEhbI7YrZJgNB/7hoKJb1ngCrB2CHsgINUi97Bare4iqEjPq2BtFNgVKnukacHUCuRO7WbzZc/SZgL2Ev2qDSaxfUtWMICJYX1Anq09iDM2GFfmH/0yV2NaEqNad8ns2QFAMwSOmcEhbBLYE9Nn2sGXIjA+fnnbbLAWl/ZSHJjAnfBqfGbe91NKZYvoF3nyX0hwnOby3s0T+M0MFhj9QhKYMIJT5jtdy496kT0cF1HBWOYrsQdqPE3rOOUv9AWuTs8rPBBQkqg0DXBiYACJ/wHnjSUTP46QfwAAAABJRU5ErkJggg=="},310:function(e,n,i){"use strict";var t=i(16),r=i(311),a=(i.n(r),i(15)),o=i(138),s=i(7);n.a={name:"reward",data:function(){return{paidWithTax:"",unpaid:"",paid:""}},computed:Object(t.mapState)(["userUuid"]),methods:{allowance:function(e){var n="";n=2==e?"直接":"间接",this.$router.push({path:"/invitation-allowance-list",query:{rewardType:e}});var i=["_trackEvent","我的奖励","CLICK","在我的奖励页面点击"+n+"邀请津贴","我的奖励页面-点击"+n+"邀请津贴"];window._hmt.push(i)},getSum:function(){var e=this;a.a.get("/reward/sum",{userUuid:this.userUuid}).then(function(n){return 200==n.code&&(e.paidWithTax=n.data.paidWithTax,e.unpaid=n.data.unpaid,e.paid=n.data.paid),n})},getShare:function(){o.a.getShare({title:"金疙瘩——我的奖励"})},rewardList:function(){var e=["_trackEvent","我的奖励","CLICK","在我的奖励页面点击邀请奖励","我的奖励页面-点击邀请奖励"];window._hmt.push(e),this.$router.push("/invitation-reward-list")}},watch:{userUuid:function(){this.userUuid&&this.getSum()}},created:function(){s.a.isWeixin&&this.getShare(),this.userUuid&&this.getSum();var e=["_trackEvent","我的奖励","SHOW","进入我的奖励页面","进入我的奖励页面"];window._hmt.push(e)}}},311:function(e,n,i){var t=i(312);"string"==typeof t&&(t=[[e.i,t,""]]);var r={};r.transform=void 0;i(14)(t,r);t.locals&&(e.exports=t.locals)},312:function(e,n,i){n=e.exports=i(13)(void 0),n.push([e.i,".reward{width:100%;height:100%}.reward .header{background:url("+i(313)+");background-size:100% 100%;padding:.45rem 0 3.55rem}.reward .header .right{text-align:right;color:#fff;margin-right:.8rem}.reward .header .ul{padding-top:3rem}.reward .header ul{color:#fff;text-align:center}.reward .header ul li .title{font-size:.7rem;line-height:.7rem}.reward .header ul li .info{font-size:1.3rem;line-height:1.3rem;padding:.5rem}.reward .body .section{margin-top:.5rem;font-size:.8rem;background:#fff;padding:.7rem .8rem}.reward .body .section img{width:.5rem;height:.8rem}.reward .body .invite-subsidy{font-size:14px;color:#fff;text-align:center;background:#fff;padding:.1rem .9rem .7rem}.reward .body .invite-subsidy p{margin:0 .35rem;padding:1.15rem .75rem;background-size:100% 100%}.reward .body .invite-subsidy .direct{background-image:url("+i(314)+")}.reward .body .invite-subsidy .indirect{background-image:url("+i(315)+")}.reward .footer{border:1px solid red}.reward a{text-decoration:none;color:#666}",""])},313:function(e,n,i){e.exports=i.p+"reward-bg.d5d89a8b.jpg"},314:function(e,n){e.exports="data:image/png;base64,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"},315:function(e,n,i){e.exports=i.p+"indirect-bg.4b7cd30d.png"},316:function(e,n,i){"use strict";var t=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"reward",attrs:{flex:"dir:top","flex-box":"1"}},[t("div",{staticClass:"header",attrs:{"flex-box":"0"}},[t("p",{staticClass:"right",on:{click:function(n){n.stopPropagation(),e.$router.push("/reward-detail")}}},[e._v("奖励细则")]),e._v(" "),t("ul",{staticClass:"ul",attrs:{flex:""}},[t("li",{attrs:{"flex-box":"1"}},[t("p",{staticClass:"tile"},[e._v("待结算（税前）")]),e._v(" "),t("p",{staticClass:"info"},[e._v(e._s(e.unpaid)+"元")])]),e._v(" "),t("li",{attrs:{"flex-box":"1"}},[t("p",{staticClass:"tile"},[e._v("已结算（税后）")]),e._v(" "),t("p",{staticClass:"info"},[e._v(e._s(e.paidWithTax)+"元")])])])]),e._v(" "),t("div",{staticClass:"body",attrs:{"flex-box":"1"}},[t("div",{staticClass:"invite-award section",attrs:{flex:""},on:{click:function(n){n.stopPropagation(),e.rewardList(n)}}},[t("p",{attrs:{"flex-box":"1"}},[e._v("邀请奖励")]),e._v(" "),t("img",{attrs:{"flex-box":"0",src:i(143),alt:"arrow"}})]),e._v(" "),t("div",{staticClass:"invite-award section",attrs:{flex:""},on:{click:function(n){e.allowance(2)}}},[t("p",{attrs:{"flex-box":"1"}},[e._v("邀请津贴")]),e._v(" "),t("img",{attrs:{"flex-box":"0",src:i(143),alt:"arrow"}})]),e._v(" "),t("div",{staticClass:"invite-subsidy",attrs:{flex:""}},[t("p",{staticClass:"direct",attrs:{"flex-box":"1"},on:{click:function(n){e.allowance(2)}}},[e._v("直接邀请津贴")]),e._v(" "),t("p",{staticClass:"indirect",attrs:{"flex-box":"1"},on:{click:function(n){e.allowance(3)}}},[e._v("间接邀请津贴")])])])])},r=[],a={render:t,staticRenderFns:r};n.a=a},93:function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=i(310),r=i(316),a=i(34),o=a(t.a,r.a,null,null,null);n.default=o.exports}});