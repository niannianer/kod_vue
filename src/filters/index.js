/**
 * Created by DELL on 2017/6/6.
 */

export let currencyFormat = (input) => {
    if (!input) {
        return '0.00';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + (ouputs[1] || '00');
};

export let currencyInput = (input) => {
    if (!input) {
        return '';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + (ouputs[1] || '00');
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

