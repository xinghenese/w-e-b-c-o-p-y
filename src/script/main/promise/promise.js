/**
 * Created by Administrator on 2015/5/18.
 */
define(['eventEmitter', 'lodash'], function(EventEmitter, _){

  if(window.Promise){
    return window.Promise;
  }

  var State = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2,
    SETTLED: 3
  };
  var _id_ = 0;



  var promisePrototype = {

    _resolve: function(value){
      console.group('Promise#resolve');
    },

    _reject: function(reason){
      console.group('Promise#reject');
      if(reason instanceof Promise){
        console.log('Promise#reject/Promise');
        var pro = reason;
        if(pro.state == State.PENDING){
          this.value = pro._run().value;
          this.state = State.FULFILLED;
        }
        else if(pro.state = State.FULFILLED){
          this.state = State.FULFILLED;
        }
        else{
          this.state = State.FULFILLED;
        }
      }

    },

    _run: function(executor){
      console.log('Promise#run executor');
      try{
        var args = _.slice(arguments, 1);
        if(!_.isFunction(executor)){
          executor = this._resolve;
          args = [this.value];
        }
        executor.apply(this, args);
      }
      catch(e){
        this._reject(e);
      }
      finally{
        return this;
      }
    },

    then: function(onFulfiiled, onRejected){
      var that = this
        , executor = function(resolve, reject){
          if(that.state == State.FULFILLED){
            console.log('Promise#onFulfilled');
            if(_.isFunction(onFulfiiled)){
              resolve(onFulfiiled(that.value));
            }
            else{
              resolve(that.value);
            }
          }
          else if(that.state == State.REJECTED){
            console.log('Promise#onRejected');
            if(_.isFunction(onRejected)){
              reject(onRejected(that.reason));
            }
            else{
              reject(that.reason);
            }
          }
        }
      ;

      return new Promise(function(resolve, reject){
        var self = this;
        if(that.state == State.PENDING){
          console.log('Promise#state == PENDING');
          that.onstatechange = function(e){

          };
        }
      });
    },

    catch: function(onRejected){
      return this.then(null, onRejected);
    }


  };

  _.assign(promisePrototype, new EventEmitter());


  function promise(executor){

    var _state = State.PENDING
      , _value
      , _reason
      , _id = _id_ ++;

    Object.defineProperties(this, {
      state: {
        get: function(){
          return _state;
        },
        set: function(state){
          _state = state;
        },
        writable: false
      },
      value: {
        get: function(){
          return _value;
        },
        set: function(value){
          _value = value;
        },
        writable: false
      },
      reason: {
        get: function(){
          return _reason;
        },
        set: function(reason){
          _reason = reason;
        }
      },
      onstatechange: {
        set: function(callback){
          this.on('statechage', callback);
        }
      }
    });

    this.run(executor, this._resolve, this._reject);

  }

});