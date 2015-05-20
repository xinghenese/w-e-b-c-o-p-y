/**
 * Created by Administrator on 2015/5/20.
 */
define(['core', 'enc-base64', 'evpkdf', 'cipher-core', 'mode-ecb', 'md5', 'aes'], function(){

  return {
    encrypt: function(msg, key){
      return CryptoJS.AES.encrypt(msg, key, {mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString();
    },
    decrypt: function(msg, key){
      console.log('decrypt1');
      return CryptoJS.AES.decrypt(msg, key, {mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
    }
  }

});