/**
 * Created by DELL on 2017/7/5.
 */
const CryptoJS = require('crypto-js/core');
/*import AES from 'crypto-js/aes';
 import Utf8 from 'crypto-js/enc-utf8';
 import Hex from 'crypto-js/enc-hex';
 import Base64 from 'crypto-js/enc-base64';
 import ZeroPadding from 'crypto-js/pad-zeropadding';
 import CBC from 'crypto-js/mode-ecb';
 import Latin1 from 'crypto-js/enc-latin1';
 */
const AES =require('crypto-js/aes');
const Utf8 =require('crypto-js/enc-utf8') ;
const Hex =require('crypto-js/enc-hex');
const Base64 =require('crypto-js/enc-base64');
const ZeroPadding =require('crypto-js/pad-zeropadding') ;
const Latin1 =require('crypto-js/enc-latin1');
/*
 * kingoldKey md5
 * kingoldIV  md5
 * */

/*
 * encrypt key 5ca26975e267ae3c0c0fa1547d6bf5b6b1002f72328e8e520366cc4fceb009dbf109eab04571636ad876d077af2e4d0c
 *
 * encrypt iv 7fd3c660915c626188a51601d423e4f8601a89378f11a7256f4e7f9f25a111af
 */

let preKey = 'abcdefgf43f799324a27fbdf95f67fae0bc55b3abcdefg';
let preIV ='abcdefgKingoldChannelIVabcdefg';

let key  =Utf8.parse('8f804d544f44b49ed9e93901bd5dcdcb');
let iv   = Utf8.parse('bcaa4bc0075f0a07');

let encrypted = AES.encrypt(preKey,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:ZeroPadding});
let encryptedStr = encrypted.ciphertext.toString();

let encryptedHexStr = Hex.parse(encryptedStr);
let encryptedBase64Str = Base64.stringify(encryptedHexStr);

console.log(encryptedStr);


var decrypted =AES.decrypt(encryptedBase64Str,key,{iv:iv,padding:ZeroPadding});
console.log(decrypted.toString(Latin1));
process.exit(0);


