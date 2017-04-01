"use strict";
var commonUtil = require('./util/NovelCommonUtil');
var novelListRender = require('../../../../platform/novel/tpl/list-item.tpl');
var LoadingUtil = require('../../util/loadingUtil');
var timeout = null;
var list = {
    currentPage:0,
    cate:null,
    type:"cate",
    key:"",
    init:function(){
        LoadingUtil.init();
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        this.type = commonUtil.getQueryString("type")||this.type;
        if(this.type=="search"){
            this.key = commonUtil.getQueryString("key");
            if(this.key){
                $(".title").html(this.key);
                $("title").html(this.key);
                $("#novelList").html("");
                this.renderPage();
            }
        }else{
            this.cate = commonUtil.getQueryString("cate")||"玄幻小说";
            $(".title").html(this.cate);
            $("title").html(this.cate);
            $("#novelList").html("");
            this.renderPage();
        }

    },
    renderPage:function(){
        LoadingUtil.show();
        var _this = this;
        var currentPage = this.currentPage;
        if(this.type=="search"){
            var key = this.key;
            commonUtil.giveMeNovelListByKey(currentPage,key,function(data){
                var novelList = data.novelList;
                var html = novelListRender(novelList);
                $("#novelList").append(html);
                _this.currentPage++;
                LoadingUtil.hide();
            });
        }else{
            var cate = this.cate;
            commonUtil.giveMeNovelCateListPage(currentPage,cate,function(data){
                var novelList = data.novelList;
                var html = novelListRender(novelList);
                $("#novelList").append(html);
                _this.currentPage++;
                LoadingUtil.hide();
            });
        }

    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".backFrame",function(){
            history.back();
        });
        $("body").on("click",".novel-item",function(){
            var novelId = $(this).attr("novelId");
            window.location.href = "detail.html?novelId="+novelId;
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