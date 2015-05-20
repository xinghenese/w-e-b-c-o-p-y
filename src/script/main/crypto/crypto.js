/**
 * Created by Administrator on 2015/5/20.
 */
define(function(){

  var cryptoAdapter = {

    encrypt: function(rawText, key){
      return rawText;
    },
    decrypt: function(encryptedText, key){
      return encryptedText;
    }

  };

  var keys = _.keys(cryptoAdapter);

  function Crypto(obj){
    if(_.isFunction(obj)){
      obj = obj();
    }
    if(obj && _.isObject(obj)){
      _.forEach(keys, function(key){
        var prop = obj[key];
        if(!_isUndefined(prop)){
          this[key] = prop;
        }
      })
    }
  }

  Crypto.prototype = _.assign(cryptoAdapter);
  Crypto.prototype.constructor = Crypto;

  return Crypto;

});