/**
 * Created by hekk on 2017/5/28.
 */
import Promise from 'promise-polyfill';
import axios from 'axios';


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}
import {encryptFun, decryptFun} from './crypto';
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
let get = (path, data = {}) => {
    data.callSystemID = '1003';
    data.t = new Date().getTime();
    let url = `${serverUrl + path}`;
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
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
import  {logout} from './operation';
let post = (path, data = {}) => {
    data.callSystemID = '1003';
    let url = `${serverUrl + path}`;
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
const $api = {
    get,
    post,
    getNode,
    postNode,
    serverUrl
};
export default $api;
