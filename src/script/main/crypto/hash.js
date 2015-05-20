/**
 * Created by Administrator on 2015/5/20.
 */
define(function(){

  var hashAdapter = {

    hashEncode: function(rawText, hashKey){
      return  rawText;
    },
    hashDecode: function(hashText, hashKey){
      return hashText;
    }

  };

  var hashFinal = {

    hash: function(rawText, hashKey){
      return this.hashEncode(rawText, hashKey);
    }

  };

  var keys = _.keys(hashAdapter);

  function Hash(obj){
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

  Hash.prototype = _.assign(hashAdapter, hashFinal);
  Hash.prototype.constructor = Hash;

  return Hash;

});