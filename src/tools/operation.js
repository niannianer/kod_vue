/**
 * Created by hekk on 2017/5/28.
 */
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
import {baofooTestUrl} from './config';
export let submitRecharge = (params) => {
    let {userUuid, orderBillCode, amount, additionalInfo, returnUrl} = params;
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooTestUrl);
    form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name','merchant_id')
        .setAttribute('type','hidden').value('100000675');
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name','terminal_id')
        .setAttribute('type','hidden').value('100000701');
    form.appendChild(input);
    let xml = '<?xml version="1.0" encoding="UTF-8"?><custody_req><merchant_id>100000675</merchant_id><user_id>'+
        userUuid+'</user_id><order_id>'+orderBillCode+'</order_id><amount>'+amount+
        '</amount><fee>0</fee><fee_taken_on>1</fee_taken_on><additional_info>'+additionalInfo+
        '</additional_info><page_url>'+returnUrl+'</page_url><return_url>'+returnUrl+'</return_url></custody_req>';
    input = document.createElement('input');
    input.setAttribute('name','requestParams')
        .setAttribute('type','hidden').value('100000701');
    form.appendChild(input);

};
