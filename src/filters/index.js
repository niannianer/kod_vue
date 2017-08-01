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
export let currencyFormatInterger = (input) => {
    return Math.floor(input).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};
export let currencyInput = (input) => {
    if (!input) {
        return '';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + add0(ouputs[1]);
};
export let currencyInputNo = (input) => {
    if (!input) {
        return '0';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
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
    }else if(input.length == 18){
        return input.substr(0,2) +'**************'+input.substr(-2);
    }
    return input.substr(0,2) +'***********'+input.substr(-2);
};
export let mobileFormat=(input)=>{
    if(!input){
        return '';
    }
    return input.substr(0,3) +'****'+input.substr(-4);
};
export let bankCardNoFormat=(input)=>{
     if(!input){
        return '';
    }else{
        let reg = /^\d{4}(\d+)\d{4}$/;
        let res = reg.exec(input);
        let endStar = input.replace(reg, ($1, $2)=>{
            let len = $2.length;
            let star = '';
            for (let i = 0; i < len; i++) {
                star = star.concat('*')
            }
            return star;
        });
        let str1 = input.replace(res[1], endStar);
        return str1.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    }

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
export let translatePate = (input) => {
    if (!input) {
        return '0.00%';
    }
    let inp = Number(input);
    function accMul(arg1,arg2){
        let m=0,s1=arg1.toString(),s2=arg2.toString();
        if(s1.split(".")[1]){
            m+=s1.split(".")[1].length
        }
        if(s2.split(".")[1]){
            m+=s2.split(".")[1].length
        }
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    }
    let out = parseInt(accMul(inp,10000))/100;
    let xsd= out.toString().split(".");
    if(xsd.length==1){
        out = out.toString()+".00";
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            out = out.toString()+"0";
        }
    }
    return out+'%'
};
export let translatePateInt = (input) => {
    if (!input) {
        return '0%';
    }
    let inp = Number(input);
    let out = (inp*100).toFixed(0)
    return out+'%'
};

export let textToHtml =(input)=>{
    if (!input) {
        return '';
    }
    return input.replace(/\n/g,'<br>');
};

export let numAdd =(num1,num2)=>{
    let baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    let result = this.numMulti(num1, baseNum) + this.numMulti(num2, baseNum);
    return result / baseNum;
};
export let numMulti =(num1,num2)=>{
    let baseNum = 0;
    if (num1.toString().split(".")[1]) {
        baseNum += num1.toString().split(".")[1].length;
    }
    if (num2.toString().split(".")[1]) {
        baseNum += num2.toString().split(".")[1].length;
    }
    return Number(num1.toString().replace(".", ""))
        * Number(num2.toString().replace(".", ""))
        / Math.pow(10, baseNum)
};

