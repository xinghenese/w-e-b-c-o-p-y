/**
 * Created by Administrator on 2015/5/20.
 */
define(['./keyExchange', './hellman', './hash', './rsahash', './crypto', './aeswrapper'],
  function(KeyExchange, hellman, Hasher, rsahash, Crypto, aes){

  return {
    createHasher: function(){
      return new Hasher(rsahash);
    },
    createKeyExchange: function(){
      return new KeyExchange(hellman);
    },
    createCrypto: function(){
      return new Crypto(aes);
    }
  }

});