/**
 * Created by DELL on 2017/6/6.
 */
import _ from 'lodash/core';
let add0 =(input)=>{
    if(!input){
        return '00';
    }
    input =input +'00';
    return input.substring(0,2);
};
export let currencyFormat = (input) => {
    if (!input) {
        return '0.00';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + add0(ouputs[1]);
};

export let currencyInput = (input) => {
    if (!input) {
        return '';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + add0(ouputs[1]);
};
export let transactionTime =(input)=>{
    if(!input){
        return '';
    }
    let output = input.replace(/-/g,'.').replace(/:/g,'.');
    return output.substr(5,11);
};
export let idCardFormat =(input)=>{
    if(!input){
        return '';
    }
    return input.substr(0,2) +'***********'+input.substr(-2);
};
export let mobileFormat=(input)=>{
    if(!input){
        return '';
    }
    return input.substr(0,4) +'***'+input.substr(-4);
};
export let bankCardNoFormat=(input)=>{
    if(!input){
        return '';
    }
    return input.substr(0,4)+' '+input.substr(4,4) +'****'+input.substr(-4);
};
export let timeFormat = (input) => {
    if (!input) {
        return '';
    }
    let newDate = new Date();
    newDate.setTime(input);
    let y = newDate.getFullYear();
    let m = newDate.getMonth()+1;
    let d = newDate.getDate();
    let h = newDate.getHours();
    let f = newDate.getMinutes();
    let s = newDate.getSeconds();
    let setTime = (t)=>{
        if(t<10){
            return '0' + t;
        }
        return t ;
    }
    let ouputs = (y+'-'+setTime(m)+'-'+setTime(d)+' '+setTime(h)+':'+setTime(f)+':'+setTime(s));
    return ouputs;
};
export let periodType = (input) => {
    if (!input) {
        return '';
    }
    input = input.toLowerCase();
    let ouputs = '';
    switch(input){
        case 'y' :
            ouputs = '年';
        break;
        case 'm' :
            ouputs = '月';
        break;
        case 'w' :
            ouputs = '周';
        break;
        case 'd' :
            ouputs = '日';
        break;
    }
    return ouputs;
};

