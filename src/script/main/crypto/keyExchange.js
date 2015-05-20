/**
 * Created by Administrator on 2015/5/20.
 */
define(['lodash', 'jsbn2'], function(_, BigInteger){

  var keyExchangeAdapter = {

    /**
     * generate the publicKey locally.
     * @returns {String}
     *    local publicKey
     */
    getPublicKey: function(){
      return '';
    },

    /**
     * generate the shared key with the publicKey fetched from the remote.
     * @param remotePub
     *    the publicKey fetched from the remote
     * @returns {*} BigInteger recommended
     */
    getSharedKey: function(remotePub){
      return new BigInteger(remotePub, 16, true);
    },

    /**
     * generate the key used for encryption and decryption with the remote publicKey
     * @param remotePub
     *    the publicKey fetched from the remote
     * @returns {String}
     */
    getEncryptKey: function(remotePub){
      return remotePub;
    }

  };

  var keyExchangeFinal = {

  };

  var keys = _.keys(keyExchangeAdapter);

  function KeyExchange(obj){
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

  KeyExchange.prototype = _.assign(keyExchangeAdapter, keyExchangeFinal);
  KeyExchange.prototype.constructor = KeyExchange;

  return KeyExchange;

});