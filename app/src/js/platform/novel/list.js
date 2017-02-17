"use strict";
var commonUtil = require('../../util/commonUtil');
var novelListRender = require('../../../../platform/novel/tpl/list-item.tpl');
var timeout = null;
var list = {
    currentPage:0,
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        $("#novelList").html("");
        this.renderPage();
    },
    renderPage:function(){
        var _this = this;
        var currentPage = this.currentPage;
        commonUtil.giveMeNovelListPage(currentPage,function(data){
            var novelList = data.novelList;
            var html = novelListRender(novelList);
            $("#novelList").append(html);
            _this.currentPage++;
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".novel-item",function(){
            var novelId = $(this).attr("novelId");
            window.location.href = "read.html?novelId="+novelId;
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