/**
 * Created by Administrator on 2015/5/14.
 */
define(['jsbn2', 'base64', 'md5'], function(BigInteger, base64, md5){

  var PRIME = "f488fd584e49dbcd20b49de49107366b336c380d451d0f7c88b31c7c5b2d8ef6f3c923c043f0a55b188d8ebb558cb85d38d334fd7c175743a31d186cde33212cb52aff3ce1b1294018118d7c84a70a72d686c40319c807297aca950cd9969fabd00a509b0246d3083d66a45d419f9c7cbd894b221926baaba25ec355e92f78c7";
  var BASE = "2";

  var Hellman = function(){

    var p = new BigInteger(PRIME, 16, true);
    var g = new BigInteger(BASE, 16, true);

    var privateKey = "6c8d06a30131282a50e67f0da618ee00c9da747b027ff6df53d906548cf8c79d3255c357d38a3efdca6ab6d750";
    var priv = new BigInteger(privateKey, 16, true);

    console.log('[PRIME] ', p.toString(10));
    console.log('[PRIME] ', p.toString(16));
    console.log('[priv] ', priv.toString(10));
    console.log('[priv] ', priv.toString(16));

    this.getPublicKey = function(){
      var pub = g.modPow(priv, p);
      console.log('local-pub: ', pub.toString(16));
      return base64.encode(pub);
    };

    this.getShared = function(pub){
      if(pub instanceof BigInteger){
        return pub.modPow(priv, p);
      }
    };

    this.getEncryptKey = function(pub){

      console.log('[remote-pub] ', pub);

      var wrap = new BigInteger(pub, 16, true);
      var secretKey = this.getShared(wrap);

      console.log('[secretKey] ', secretKey.toString(16));

      var b64 = base64.encode(secretKey);

      console.log('[shareKey_encoded] ', b64);

      var str = secretKey.toString(16);
      if(str.length & 1 == 1){
        str = '0' + str;
      }

      console.log('[shareKey_encoded.addPrefix] ', base64.encode('00' + str));

      return md5(b64);
    }

  };

  return Hellman;




});