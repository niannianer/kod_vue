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
 * encrypt key 6318cceeee91c45a7647faf7089623b32ac8e6bcb85b35dbaa5a5b1ef5baa2d12e7aa5c224012fadd7fd02866fd95626
 *
 * encrypt iv 00df13f4e31ded1854bbd9d23985f95e5f50e6e91711900221f8ab3be6bc6a35
 */

let preKey = 'abcdefg4f93b315fc816dd59bcdf49aa352bd35abcdefg';
let preIV ='abcdefgrwK0QuLoxRUozEnLabcdefg';

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


