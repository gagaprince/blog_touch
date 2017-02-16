"use strict";
var commonUtil = require('../../util/commonUtil');
var novelListRender = require('../../../../platform/novel/tpl/list-item.tpl');
var list = {
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        commonUtil.giveMeNovelListAll(function(data){
            var novelList = data.novelList;
            var html = novelListRender(novelList);
            $("#novelList").html(html);
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".novel-item",function(){
            var novelId = $(this).attr("novelId");
            window.location.href = "read.html?novelId="+novelId;
        });
    }
}

$(document).ready(function(){
    list.init();
});