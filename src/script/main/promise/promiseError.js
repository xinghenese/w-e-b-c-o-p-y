/**
 * Created by Administrator on 2015/5/19.
 */
define(['lodash'], function(_){

  function PromiseError(reason){
    this.reason = reason;
    Error.call(this);
  }

  PromiseError.prototype = _.create(Error.prototype, {
    'constructor': PromiseError
  });

  return PromiseError;

});