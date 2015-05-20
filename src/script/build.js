/**
 * Created by Administrator on 2015/5/11.
 */
({
    //relative to build.js by default.
    baseUrl:'./main/app'
    //relative to baseUrl. javascript extension would be automatically added to the module name.
    ,name: 'socket'   //relative
    ,mainConfigFile: './main/app/socket.js'
    //relative to baseUrl. map the paths of libraries with relevant module IDs.
//    ,paths:{
//        requireLib: '../../lib/require'
//    }
    //include the library(ies) into the main module if it's(they're) not required in the main
    //module yet.
    ,include: 'requirejs'

    //path of output file, relative to build.js
    ,out:'../../bin/js/socket.js'

    ,optimize:"none"

    //build sourcemap, which facilitates debugging.
//    ,generateSourceMaps:true
//    ,preserveLicenseComments:false

    //not intend to clean the target directory.
    ,keepBuildDir:true
})