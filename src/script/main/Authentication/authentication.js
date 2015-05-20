/**
 * Created by Administrator on 2015/5/20.
 */
define(['lodash', '../hasher/rsahash'], function(_, rsahash){

  var INVALID_SEQUENCE = -1;
  var HASH_KEY = 'Ml1A&Yx<D5Q8-5gY/KpxrK@z^;O+n[uIpW\"h:JN;dt4/P=:44cy@`Cfn)z^8=eAt';

  var sequence = INVALID_SEQUENCE;

  return {


    isValidSequence: function(value){
      value = +value;
      if(value && _.isFinite(value)){
        return INVALID_SEQUENCE != value;
      }
      return false;
    },

    setSequence: function(value){
      value = +value;
      if(value && _.isFinite(value)){
        sequence = ~~value;
      }
    },

    validateSequence: function(value){
      if(!value){
        return false;
      }
      value = value + '';

      var decoded = rsahash.hashDecode(value, HASH_KEY);
      var seq = ~~parseFloat(decoded);

      if(this.isValidSequence(seq)){
        this.setSequence(seq);
        return true;
      }

      return false;

    },

    isAuthenticated: function(){
      return sequence != INVALID_SEQUENCE;
    },

    getSequenceKey: function(){

      if(!this.isAuthenticated()){
        throw new Error("Not authenticated yet!");
      }
      return rsahash.hashEncode((++ sequence), HASH_KEY);

    }


  };


});