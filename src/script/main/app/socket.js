/**
 * Created by Administrator on 2015/5/15.
 */
require.config({
  baseUrl: '../',
  shim: {
    underscore: {
      exports: '_'
    },
    jsbn2: {
      deps: [
        'jsbn'
      ],
      exports: 'BigInteger'
    },
    base64: {
      deps: [
        'underscore'
      ],
      exports: 'hex2b64',
      init: function (){
return {
  encode: function(msg){
    if(msg instanceof BigInteger){
      msg =  _.reduce(msg.toByteArray(), function(memo, value){
        var _val = (value < 0 ? value + 256 : value).toString(16);
        return memo + (_val.length < 2 ? '0' + _val : '' + _val);
      }, '');
      console.log('msg: ', msg);
    }
    return hex2b64(msg);
  },
  decode: b64tohex
}
}
    },
    md5: {
      deps: [
        'core'
      ],
      exports: 'CryptoJS.MD5',
      init: function (){
return function(msg){
  return CryptoJS.MD5(msg).toString();
}
}
    },
    aes: {
      deps: [
        'core',
        'enc-base64',
        'evpkdf',
        'cipher-core',
        'mode-ecb',
        'md5'
      ],
      exports: 'CryptoJS.AES',
      init: function (){
return {
  encrypt: function(msg, key){
    return CryptoJS.AES.encrypt(msg, key, {mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString();
  },
  decrypt: function(msg, key){
    console.log('decrypt1');
    return CryptoJS.AES.decrypt(msg, key, {mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
  }
}
}
    }
  },
  paths: {
    core: '../../lib/cryptojslib/components/core',
    aes: '../../lib/cryptojslib/components/aes',
    md5: '../../lib/cryptojslib/components/md5',
    'cipher-core': '../../lib/cryptojslib/components/cipher-core',
    evpkdf: '../../lib/cryptojslib/components/evpkdf',
    'enc-base64': '../../lib/cryptojslib/components/enc-base64',
    'mode-ecb': '../../lib/cryptojslib/components/mode-ecb',
    jsbn: '../../lib/jsbn/jsbn',
    jsbn2: '../../lib/jsbn/jsbn2',
    base64: '../../lib/jsbn/base64',
    react: '../../lib/react/react',
    require: '../../lib/require/build/require.min',
    requirejs: '../../lib/requirejs/require',
    underscore: '../../lib/underscore/underscore',
    eventEmitter: '../../lib/eventEmitter/EventEmitter',
    lodash: '../../lib/lodash/lodash'
  },
  packages: [

  ]
});

require(['../crypto/Hellman3', 'base64', 'md5', 'aes', 'jsbn2', '../Authentication/authentication'], function(Hellman, base64, md5, aes, bigInt, authentication){
  console.log('[base64] ', base64);
  var hellman = new Hellman3();
  var pbk = hellman.getPublicKey();
  var packet = {
    "HSK": {
      "pbk": pbk
    }
  }
  console.log('[packet] ', JSON.stringify(packet));

//  var r_pbk_encoded = "IcWkRfDuGbcNajaInhvUVc11LBesRC47PgEcPvw8IGVRdFJgg6rk21cDhirEHDytrAxEzbK8SCkOZg+vI4sZKvNeSFuBfeqo7PRwc6an+LkCArTY3D9HIj/hkEVLLRUIJWiE0I5PIJGlPrOTiO+giiVscgphNhqqcMyKWfCKFMc=";
//  var r_pbk = base64.decode(r_pbk_encoded);
////
//  var sk = hellman.getEncryptKey(r_pbk);
////
//  console.log('md5: ', sk);




//  console.log(base64.decode('ANibPHcJZqNYTsn9lI6aEg0zodYpoVvQYLI6WpqGuPwDLwTatgE7toTDAnN50dFUZSiv2UzIUWnsA1fqiWK09RySZtDsreVHrrxSH9x8Zmdtf/4rHHuYh0Qh7xHwcRefgIi0tPE3DJPzUA0FX6uKXkQUeD2UY04/B6imyWK+B3Jq'));


//  var encoded = base64.encode(sk);
////
//  console.log('base64:', encoded);
//
//  var str = sk.toString(16);
//  if(str.length & 1 == 1){
//    str = '0' + str;
//  }
//
//  console.log('base64.addPrefix: ', base64.encode('00' + str));
////
//  var md5ed = md5(encoded);
////
//  console.log('md5: ', md5ed);



//  test();
//  testEncrypt();


  function testEncrypt(){

    var _key = CryptoJS.enc.Utf8.parse("6a981b79469c741be9f89e9423a38850");
    var message = 'mPbdNDkWETcw8CY4p7QslnUz7FNrz3ODMHTbeOwskVRRSoC66SC8J8OIFbOk74CT';

    var decrypted = aes.decrypt(message, _key);

    console.log('decrypted: ', decrypted);
    console.log('decrypted-msg', decrypted.toString(CryptoJS.enc.Utf8));

  }

  var encrypt_key = '';

  connect();

  function test() {

    console.log('aes', aes);

    var key = "fe07d3264432515f54eda47f29a292cf";

    var auth = {
      "msuid": '20937936',
      "token": 'MloA-T5qlot78J9KdalBG5xggVNEKk8yOLxyU85FL607v9CM_pZDABaHypTioWJUE4PvUvreJXUNIGOpWDxyzciPxHQoJtCasKUkrcckr5KDNCIRnqRJU5wRvT-BNheriotAFtGaVEa9-YEBwcb6BRAJFAoqTrlKMKiUJGqwquY',
      "zip": 1,
      "v": "1.0",
      "ver": 4.0,
      "dev": "1",
      "devn": 'Sony Xperia Z - 4.2.2 - API 17 - 1080x1920_b0c56658-4c96-419d-aaba-68cc2ceb750d'
    };

    var encrypted = aes.encrypt(JSON.stringify(auth), key);

    console.log('encrypt ', encrypted.toString());

    var decrypted = aes.decrypt(encrypted, key);

    console.log('decrypt ', decrypted)//.toString(CryptoJS.enc.Utf8));
  }

  function connect() {

    var socket = new WebSocket("ws://192.168.0.110:8080/liao");
    socket.onclose = function () {
      console.log(event);
      console.log("Connection closed.");
    };
    socket.onerror = function (evt) {
      console.log(event);
    };
    socket.onmessage = function (event) {
      console.group(event);

      var data = (event.data).replace(/[\r\n]/gm, '');

      console.log('data: ', data);

      if(encrypt_key){
        console.log('encrypte_key: ', encrypt_key);
        data = aes.decrypt(data, encrypt_key);
      }

      try{
        var packet = JSON.parse(data);
      }
      catch(e){
        console.log('end');
      }


      if ("HSK" in packet) {
        var pbk = packet['HSK']['pbk'];

//        console.log('pbk: ', pbk);

        pbk = base64.decode(pbk);

//        console.log('pbk: ', pbk);

        var _key = hellman.getEncryptKey(pbk);

        console.log('key: ', _key);

        encrypt_key = CryptoJS.enc.Utf8.parse(_key);

        console.log('key: ', encrypt_key);

//        key = CryptoJS.enc.Utf8.parse(key);

        var auth = {
          "AUTH": {
            "msuid": '20937936',
            "token": 'MloA-T5qlot78J9KdalBG5xggVNEKk8yOLxyU85FL607v9CM_pZDABaHypTioWJUE4PvUvreJXUNIGOpWDxyzciPxHQoJtCasKUkrcckr5KDNCIRnqRJU5wRvT-BNheriotAFtGaVEa9-YEBwcb6BRAJFAoqTrlKMKiUJGqwquY',
            "zip": 1,
            "v": "1.0",
            "ver": 4.0,
            "dev": "1",
            "devn": 'Sony Xperia Z - 4.2.2 - API 17 - 1080x1920_b0c56658-4c96-419d-aaba-68cc2ceb750d'
          }
        };

        var enc = aes.encrypt(JSON.stringify(auth), encrypt_key);

        console.log('enc ', enc);

//        var dec = aes.decrypt(enc, encrypt_key);
//
//        console.log('dec ', dec);

        socket.send(enc);

      }
      else{

        var auth_data = packet['AUTH'];

        console.log(auth_data);

        if(!auth_data){
          return;
        }

        var result = +(auth_data.r);
        var msuid = auth_data.msuid;

        if(result == 0){

          if(authentication.validateSequence(auth_data.msqsid)){

            console.log('[msqsid] ', auth_data.msqsid);

            var a_data = JSON.stringify({

              msuid: msuid,
              msqid: authentication.getSequenceKey()

            });

            console.log(a_data);

            var enc_auth = aes.encrypt(a_data, encrypt_key);

            console.log(enc_auth);

            socket.send(enc_auth);
          }

        }

      }

      console.groupEnd();
    };
    socket.onopen = function (event) {
      console.log('Connect');
      console.log(event);
      socket.send(JSON.stringify(packet));
    };

  }

});