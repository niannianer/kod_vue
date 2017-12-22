/**
 * Created by hekk on 2017/5/28.
 */
import Promise from 'promise-polyfill';
import axios from 'axios';
import Vue from 'vue';
import {Indicator} from 'mint-ui'


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}
// aes encrypt
import {encryptFun, decryptFun} from './crypto';
// opreation
import {getDeviceID, getAuthKey} from './operation';
import  {logout, addHive} from './operation';


import 'whatwg-fetch';
import {local, session} from './store';
import $device from './device';
import config, {doEncrypt} from './config';
let serverUrl = config.apiUrl;
let nodeUrl = config.apiNode;
let query = data => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((data[key])));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((JSON.stringify(data[key]))));
            }
        }
    }
    return str.join('&');
};
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encryptFun(encodeURIComponent(key)) + '=' + encodeURIComponent(encryptFun(data[key])));
            } else {
                str.push(encryptFun(encodeURIComponent(key)) + '=' + encodeURIComponent(encryptFun(JSON.stringify(data[key]))));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}, source = {}) => {
    data.t = new Date().getTime();
    data.deviceID = getDeviceID();
    data.callSystemID = '1003';
    let search = query(data);
    let url = `${path}?${search}`;
    let key = getAuthKey(url); // md5(url+'slat')
    let value = encryptFun(key + 'slat');
    url = `${serverUrl + url}&auth=${value}`;

    return axios({
        url,
        method: 'get',
        cancelToken: source.token || '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        if (doEncrypt) {
            data = JSON.parse(decryptFun(data));
        }
        console.log(url);
        console.log(data);
        return data;

    }).catch(err => {
        console.error('error,--->', err);
        return {};
    });
};
let getNode = (path, data = {}) => {
    data.t = new Date().getTime();
    data.callSystemID = '1003';
    let url = `${nodeUrl + path}`;
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
        withCredentials: false
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    })
};
let post = (path, data = {}, indicator = '') => {
    data.callSystemID = '1003';
    let url = `${serverUrl + path}`;
    Indicator.open(indicator);
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        data: doEncrypt ? $query(data) : query(data)
    }).then(response => {
        Indicator.close();
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        if (doEncrypt) {
            data = JSON.parse(decryptFun(data));
        }
        if (data.code == 401) {
            logout();
        }
        console.log(url);
        console.log(data);
        return data;
    }).catch(err => {
        Indicator.close();
        console.error('error,--->', err);
    });
};
let postNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`;
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: false,
        data: query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    });
};

export let postHive = () => {
    let url = config.logUrl;
    if (session.getItem('hiveSend')) {
        return false;
    }
    let hives = local.getItem('post_hives');
    if (!hives) {
        return false;
    }
    let body = hives.join('|');
    let data = [{
        headers: {
            v_app: '0.0.0',  //app版本
            channel: local.getItem('registerChannelCode') || 'H5_weixin', //渠道
            imei: 'imei', //imei
            d_uuid: getDeviceID(), //app/h5生成的设备编号
            os: window.navigator.platform, //操作系统
            device: $device.os + '-' + $device.osVersion, //设备类型
            reso: window.innerWidth + '*' + window.innerHeight //分辨率
        },
        body: body
    }];
    session.setItem('hiveSend', true);
    local.removeItem('hives');
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'text/plain'
        },
        data: JSON.stringify(data)
    })
};
// 收集用户行为，存放在storage里
Vue.prototype.addHive = addHive;
const $api = {
    get,
    post,
    getNode,
    postNode,
    serverUrl
};
export default $api;
