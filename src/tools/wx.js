/**
 * Created by DELL on 2017/6/23.
 */
import wx from 'weixin-js-sdk';
let config = (share) => {
    wx.config({
        debug: false,
        appId: share.app_id,
        timestamp: parseInt(share.js_timestamp),
        nonceStr: share.js_nonce_str,
        signature: share.js_signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
};
let onMenuShareTimeline = (content, $fn) => {
    wx.onMenuShareTimeline({
        title: content.title,
        link: content.link,
        imgUrl: content.imgUrl,
        trigger: function (res) {

        },
        success: function (res) {
            $fn();
        },
        cancel: function (res) {

        },
        fail: function (res) {

        }
    });
};
let onMenuShareAppMessage = (content, $fn) => {
    wx.onMenuShareAppMessage({
        title: content.title,
        desc: content.desc,
        link: content.link,
        imgUrl: content.imgUrl,
        trigger: function (res) {

        },
        success: function (res) {
            $fn();
        },
        cancel: function (res) {

        },
        fail: function (res) {

        }
    });
};
export  default {
    wx,
    config,
    onMenuShareTimeline,
    onMenuShareAppMessage
}
