/**
 * Created by Administrator on 2014/12/22.
 */
define(['../base/Base', '../utils/TypeCheckExtender', '../utils/CommonUtils'], function(Base, TypeCheck, CommonUtils){
//    if(window.Worker){
    var WorkerPrototype = function(){
        return {
            onerror: CommonUtils.FUNCTION_NOT_SET,
            onmessage: CommonUtils.FUNCTION_NOT_SET,
            postMessage: function(msg){
                if(TypeCheck.isNonEmptyObject(msg)){
                    var _args = msg.arguments || "",
                        _task = msg.task || "",
                        _module = require(this._url),
                    //a map from name of task, which includes big loops and inevitably costs rather long time, to that
                    //of small monomers.
                        _taskMap = _module && _module.smallTaskMap,
                        _initializeMap = _module && _module.initializeMap,
                        _method = _task && _taskMap &&  _taskMap[_task] && _module[_taskMap[_task]],
                        _initialize = _task && _initializeMap && _initializeMap[_task] && _module[_initializeMap[_task]];
                    if(TypeCheck.isFunction(_method) && _method){
                        try{
                            _method = _process.call(this, _method, 4);  //??How to set limit
                            _args = _initialize.apply(this, _args);
                            _method.apply(this, _args);
                        }
                        catch(e){
                            this.onerror(e);
                        }
                    }
                }
            }
        };

        function _process(execution, limit){
            var _self = this,
                _f =  function(){
                    var _args = arguments, _result;
                    for(var i = 0; i < limit; i++){
                        if((_result = execution.apply(_self, _args))){
                            //cache the args of the last time before it finishes.
                            _args = _result;
                        }
                        else{
                            break;
                        }
                    }
                    if(_result){
                        setTimeout(function(){
                            _f.apply(_self, _args);
                        }, 0);
                    }
                    else{
                        for(var j = 0, _data = [], len = _args.length; j < len; j ++){
                            _data.push(_args[j].toString());
                        }
                        _self.onmessage({
                            data: _data
                        });
                    }
                };
            return _f;
        }

    }();

    var Worker = (function(url){

        this._url = (url.split(".js"))[0];  //url = url.replace(/^(.+)\.js/, '$1'); url = url.replace(/.js/g, '');

    }).inherits(WorkerPrototype);

    return Worker;

//    }
});