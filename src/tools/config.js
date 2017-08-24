/**
 * Created by DELL on 2017/6/5.
 */
let protocol = window.location.protocol;
export const telNumber = '400-640-3606';
/*dev*/
export const devUrl = 'http://10.10.10.69:6620';
export const baofooDevtUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
export const baofooCallUrlDev = `${protocol}//notify-test.zj-hf.cn`;
export const nodeDevApi = `${protocol}//market-test.zj-hf.cn`;

/*test*/
export const testUrl = `${protocol}//weixin-test.zj-hf.cn`;
export const baofooTestUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
export const baofooCallUrlTest = `${protocol}//notify-test.zj-hf.cn`;
export const nodeTestApi = `${protocol}//market-test.zj-hf.cn`;

/*production */
export const productionUrl = `${protocol}//zj-weixin.zj-hf.cn`;
export const baofooProductUrl = 'https://pm.baofoo.com/custody/';
export const baofooCallUrlProduct = `${protocol}//callme.zj-hf.cn`;
export const nodeProductionApi = `${protocol}//market.zj-hf.cn`;


let encrypt = false;
/*dev env*/
let apiUrl = 'http://10.10.10.69:6620';
let baofooUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
let baofooCallUrl = `${protocol}//notify-test.zj-hf.cn`;
let apiNode = `${protocol}//market-test.zj-hf.cn`;
let merchant_id = '100000675';
let terminal_id = '100000701';
/*test env*/
if (process.env.kingold == 'test') {
    apiUrl = `${protocol}//weixin-test.zj-hf.cn`;
    baofooUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//notify-test.zj-hf.cn`;
    apiNode = `${protocol}//market-test.zj-hf.cn`;
}
/*stage env*/
if (process.env.kingold == 'stage') {
    apiUrl = `${protocol}//zj-weixin.zj-hf.cn`;
    baofooUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//pre-callme.zj-hf.cn`;
    apiNode = `${protocol}//market.zj-hf.cn`;
    merchant_id = '1172380';
    terminal_id = '34865';
    encrypt = true;
}
/*prod env*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//zj-weixin.zj-hf.cn`;
    baofooUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//callme.zj-hf.cn`;
    apiNode = `${protocol}//market.zj-hf.cn`
    merchant_id = '1177929';
    terminal_id = '35265';
    encrypt = true;
}
export default {
    apiUrl,
    baofooUrl,
    baofooCallUrl,
    apiNode,
    merchant_id,
    terminal_id
}
/*
 * kingold key & IV
 * */
/* key 和 iv 密文*/
export const encryptKey = 'ba2b93d1b6388f6254cc0f8d8809b83b89e07ec61625f8c367204610d1b2c8ecd0f79d74c90001fe760dd45936acca92';
export const encryptIV = '6e77a9e968003d35f170387c7eac7f8f06cc811436531481243f81db67b8a0da';
export let doEncrypt = encrypt;
