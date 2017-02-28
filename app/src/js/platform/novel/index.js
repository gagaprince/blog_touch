"use strict";
var commonUtil = require('../../util/commonUtil');
var indexRender = require('../../../../platform/novel/tpl/recommend-index.tpl');

var index = {
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        this.initData(function(recommendData){
            _this.render(recommendData);
        });
    },
    initData:function(callback){
        if(!callback)return;
        commonUtil.giveMeRecommendData(function(data){
            console.log(data);
            callback(data);
        });
    },
    render:function(recommendData){
        var html = indexRender(recommendData);
        $("#recommendFrame").html(html);
    },
    initListener:function(){

    }
};

$(document).ready(function(){
    index.init();
});