/**
 * Created by DELL on 2017/6/6.
 */
export let currencyFormat = (input) => {
    if (!input) {
        return '0.00';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g,'$1,') + '.' + (ouputs[1] || '00');
};
