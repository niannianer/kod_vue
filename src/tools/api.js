/**
 * Created by hekk on 2017/5/28.
 */
import Promise from 'promise-polyfill';


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}
import {encryptFun, decryptFun} from './crypto';

import 'whatwg-fetch';
import store from '../store';
import {
    doEncrypt,
    devUrl,
    testUrl,
    productionUrl,
    nodeTestApi,
    nodeProductionApi
} from './config';
let serverUrl = devUrl;
let nodeUrl = nodeTestApi;
if (process.env.kingold == 'test') {
    serverUrl = testUrl;
}
if (process.env.kingold == 'production') {
    serverUrl = productionUrl;
    nodeUrl = nodeProductionApi;
}
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
    let credentials = 'include';
    let url = `${serverUrl + path}?${query(data)}`;
    return fetch(url, {
        method: 'get',
        credentials,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if (response.status == 200) {
            if (doEncrypt) {
                return response.text();
            } else {
                return response.json();
            }

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
    url = `${url}?${query(data)}`;
    return fetch(url, {
        method: 'get',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if (response.status == 200) {
            return response.json();
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
    let credentials = 'include';
    return fetch(url, {
        method: 'post',
        credentials,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: doEncrypt ? $query(data) : query(data)
    }).then(response => {
        if (response.status == 200) {
            if (doEncrypt) {
                return response.text()
            } else {
                return response.json();
            }

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
            store.dispatch('getAccountBaofoo');
            store.dispatch('getBankInfo');
            store.dispatch('getUserInfo');
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
    return fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.json()
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
