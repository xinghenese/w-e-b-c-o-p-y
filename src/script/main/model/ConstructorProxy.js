/**
 * Created by Administrator on 2014/12/29.
 */
define(['../base/FunctionBase'], function(Base){
    return {
        createConstructor: function(template){
            return (new Function()).inherits(template);
        }
    };
});