/**
 * Created by Administrator on 2015/5/20.
 */
define(['lodash'], function(){

  var CIPHER_DELIMETER = 'l'; // l letter;

  return {

    hashEncode: function(rawText, hashKey){
      if(!rawText || !hashKey){
        return '';
      }
      rawText = rawText + '';
      hashKey = hashKey + '';

      var hashText = '';
      var strLength = rawText.length;
      var pwdLength = hashKey.length;

      for(var i = 0, j = 0; i < strLength; i ++){
        if(i > 0){
          hashText += CIPHER_DELIMETER;
        }
        hashText += rawText.charCodeAt(i) ^ hashKey.charCodeAt(j);
        j = j % pwdLength + 1;
      }

      return hashText;
    },

    hashDecode: function(hashText, hashKey){
      if(!hashText || !hashKey){
        return '';
      }
      hashText = hashText + '';
      hashKey = hashKey + '';

      var rawText = '';
      var pwdLength = hashKey.length;
      var hashTexts = hashText.split(CIPHER_DELIMETER);

      _.forEach(hashTexts, function(text){
        rawText += String.fromCharCode(parseInt(text) ^ hashKey.charCodeAt(i));
        i = i % pwdLength + 1;

      });

      return rawText;
    }

  }

});