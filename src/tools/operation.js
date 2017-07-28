/**
 * Created by hekk on 2017/5/28.
 */
//设置页面标题
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '金疙瘩';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};


import $api from './api';

import  * as config from './config';
let baofooUrl = config.baofooDevtUrl;
let baofooCallUrl = config.baofooCallUrlDev;
let serverUrl = config.devUrl;
let merchant_id = '100000675';
let terminal_id = '100000701';
if (process.env.kingold == 'test') {
    baofooUrl = config.baofooTestUrl;
    serverUrl = config.testUrl;
    baofooCallUrl = config.baofooCallUrlTest;
    merchant_id = '100000675';
    terminal_id = '100000701';
}
if (process.env.kingold == 'production') {
    baofooUrl = config.baofooProductUrl;
    serverUrl = config.productionUrl;
    baofooCallUrl = config.baofooCallUrlProduct;
    merchant_id = '1177929';
    terminal_id = '35265';
}

// baofoo 充值
export let submitRecharge = (params) => {
    let {userId, orderBillCode, amount, returnUrl} = params;
    let backUrl = window.sessionStorage.getItem('backUrl');
    if (!backUrl) {
        backUrl = window.location.origin + '/my-assets?t=' + new Date().getTime();
    }
    let pageUrl = `${baofooCallUrl}/baofoo/h5/notification/recharge?backUrl=${backUrl}`;
    let backUrlParams = window.sessionStorage.getItem('backUrlParams');
    $api.post('/baofoo/rechargeParam', {
        amount,
        userId,
        orderId: orderBillCode,
        returnUrl,
        pageUrl,
        feeTakenOn: 1,
        fee: 0
    }).then(resp => {
        if (resp.code == 200) {
            merchant_id = resp.data.merchantId || merchant_id;
            terminal_id = resp.data.terminalId || terminal_id;
            let xml = resp.data.requestParams;
            let sign = resp.data.sign;
            let form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', baofooUrl + 'cerPayRecharge.do');
            form.setAttribute('name', 'baofoo');
            let input = document.createElement('input');
            input.setAttribute('name', 'merchant_id');
            input.setAttribute('type', 'hidden');
            input.value = merchant_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'terminal_id');
            input.setAttribute('type', 'hidden');
            input.value = terminal_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'requestParams');
            input.setAttribute('type', 'hidden');
            input.value = xml;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'sign');
            input.setAttribute('type', 'hidden');
            input.value = sign;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    })


};
//
export let submitAuthorization = (pUserId) => {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooUrl + 'inAccredit.do');
    //form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name', 'merchant_id');
    input.setAttribute('type', 'hidden');
    input.value = merchant_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'terminal_id');
    input.setAttribute('type', 'hidden');
    input.value = terminal_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'user_id');
    input.setAttribute('type', 'hidden');
    input.value = pUserId;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'service_url');
    input.setAttribute('type', 'hidden');
    input.value = baofooCallUrl + '/baofoo/notification/auth';
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'page_url');
    input.setAttribute('type', 'hidden');
    input.value = baofooCallUrl + '/baofoo/h5/notification/auth';
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

};

// 输入框校验,提现和充值
export let currencyInputValidate = (input) => {
    if (!input) {
        return '';
    }
    let t = input.toString();
    if (t[0] == '0' || t[0] == '.') {
        return '';
    }
    if (isNaN(input)) {
        return ''
    }
    return t.replace(/\.\d{3,}/, (match) => {
        return match.substring(0, 3);
    })
};
import requestHybrid from './hybrid';
import $device from './device';
export let logout = () => {
    window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
    window.location.replace('/login');
    if ($device.kingold) {
        requestHybrid({
            tagname: 'forward',
            param: {
                target: 'login',
                targetUrl: window.location.origin + '/login'
            }
        });
    }
};
let $operation = {
    setTitle
}
export default $operation;
export let remainTime = (end, now) => {
    let remainTime = (end - now) / 1000;
    if (isNaN(remainTime)) {
        return ''
    }
    if (remainTime < 0) {
        return '1分过期'
    }
    let day = Math.floor(remainTime / 3600 / 24);
    if (day > 0) {
        return day + '天过期'
    }
    let hours = Math.floor(remainTime / 60 / 60);
    if (hours > 0) {
        return  hours + '时过期'
    }
    let minutes = Math.floor(remainTime / 60);
    if ((remainTime / 60) < 1) {
        return '1分过期'
    }
    if (minutes > 0) {
        return  minutes + '分过期'
    }
    return ''
}

