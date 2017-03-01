"use strict";
var htmlRender = require('../../../platform/common/tpl/loading.tpl');

var LoadingUtil = {
    init:function(){
        var html = htmlRender({});
        $("body").append(html);
    },
    show:function(){
        $(".loading-frame").show();
    },
    hide:function(){
        $(".loading-frame").hide();
    }
}

module.exports = LoadingUtil;