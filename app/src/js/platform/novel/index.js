"use strict";
var commonUtil = require('./util/NovelCommonUtil');
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
        //没有加载出来的图片 使用默认图片代替
        $("img").error(function(){
            $(this).attr("src","http://www.37zw.com/d/image/3/3753/3753s.jpg");
        });
    },
    initListener:function(){
        $("body").on("click",".backFrame",function(){
            history.back();
        });
        $("body").on("click",".linkbook",function(){
            var novelId = $(this).attr("novelId");
            window.location.href = "detail.html?novelId="+novelId;
        });
        $("body").on("click",".cate",function(){
            var cate = $(this).html()+"小说";
            window.location.href = "list.html?cate="+cate;
        });
        $("body").on("click","#searchBtn",function(){
            var key = $("#keyInput").val().trim();
            if(key!=""){
                window.location.href = "list.html?type=search&key="+key;
            }
        });
    }
};

$(document).ready(function(){
    index.init();
});