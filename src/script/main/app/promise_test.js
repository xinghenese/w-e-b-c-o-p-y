require.config({
  shim: {

  },
  paths: {
    core: "../../lib/cryptojslib/components/core",
    aes: "../../lib/cryptojslib/components/aes",
    md5: "../../lib/cryptojslib/components/md5",
    "cipher-core": "../../lib/cryptojslib/components/cipher-core",
    evpkdf: "../../lib/cryptojslib/components/evpkdf",
    "enc-base64": "../../lib/cryptojslib/components/enc-base64",
    "mode-ecb": "../../lib/cryptojslib/components/mode-ecb",
    eventEmitter: "../../lib/eventEmitter/EventEmitter",
    jsbn: "../../lib/jsbn/jsbn",
    jsbn2: "../../lib/jsbn/jsbn2",
    base64: "../../lib/jsbn/base64",
    lodash: "../../lib/lodash/lodash",
    react: "../../lib/react/react",
    require: "../../lib/require/build/require.min",
    requirejs: "../../lib/requirejs/require",
    underscore: "../../lib/underscore/underscore"
  },
  packages: [

  ]
});

require(['../promise/promise'], function(promise){

});
