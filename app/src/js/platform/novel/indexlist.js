"use strict";
var commonUtil = require('../../util/commonUtil');
var novelListRender = require('../../../../platform/novel/tpl/index-list-item.tpl');
var timeout = null;
var list ={
    currentPage:0,
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        $("#novelIndexList").html("");
        this.renderPage();
    },
    renderPage:function(){
        var _this = this;
        var novelId = commonUtil.getQueryString("novelId");
        var pno = this.currentPage;
        commonUtil.giveMeNovelIndexListPage(novelId,pno,function(data){
            var novelIndexList = data.indexList;
            var html = novelListRender(novelIndexList);
            $("#novelIndexList").append(html);
            _this.currentPage++;
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".novel-item",function(){
            var novelId = commonUtil.getQueryString("novelId");
            var chapter = $(this).attr("chapter");
            window.location.href = "read.html?novelId="+novelId+"&chapter="+chapter;
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                if(timeout){
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = setTimeout(function(){
                    _this.renderPage();
                },300);
            }
        });
    }
}

$(document).ready(function(){
    list.init();
});