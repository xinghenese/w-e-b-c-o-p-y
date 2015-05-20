/**
 * Created by Administrator on 2015/5/20.
 */
define(['jsbn2', 'base64', 'md5'], function(BigInteger, base64, md5){

  var PRIME = "f488fd584e49dbcd20b49de49107366b336c380d451d0f7c88b31c7c5b2d8ef" +
    "6f3c923c043f0a55b188d8ebb558cb85d38d334fd7c175743a31d186cde33212cb52aff3c" +
    "e1b1294018118d7c84a70a72d686c40319c807297aca950cd9969fabd00a509b0246d3083" +
    "d66a45d419f9c7cbd894b221926baaba25ec355e92f78c7";
  var BASE = "2";
  var privateKey = "6c8d06a30131282a50e67f0da618ee00c9da747b027ff6df53d906548c" +
    "f8c79d3255c357d38a3efdca6ab6d750";

  var p = new BigInteger(PRIME, 16, true);
  var g = new BigInteger(BASE, 16, true);
  var priv = new BigInteger(privateKey, 16, true);

  return {
    getPublicKey: function(){
      var localPub = g.modPow(priv, p);
      return base64.encode(localPub);
    },
    getSharedKey: function(remotePub){
      if(remotePub instanceof BigInteger){
        return remotePub.modPow(priv, p);
      }
    },
    getEncryptKey: function(remotePub){
      var wrap = new BigInteger(remotePub, 16, true);
      var secretKey = this.getShared(wrap);
      return md5(base64.encode(secretKey));
    }
  }

});