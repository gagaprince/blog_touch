"use strict";
var commonUtil = require('../../util/commonUtil');
var bookshelfUtil = require('../../util/bookshelfUtil');
var bookshelfRender = require('../../../../platform/novel/tpl/bookshelf-list.tpl');
var defaultNum = 2;

var bookShelf = {
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        this.initBookList(function(novelList){
            _this.renderPage(novelList);
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".bookItem",function(){
            //查看是否有章节信息 如果有 直接跳转
            //如果没有 跳转到详情页
        });
        $("body").on("click",".bookAddBtn",function(){
            //跳转到列表页
        });
    },
    initBookList:function(callback){
        if(!callback){
            return;
        }
        //查看local中是否有记录 没有记录要去后端请求 首次
        var novelList = bookshelfUtil.getBookList();
        if(novelList&&novelList.length){
            callback(novelList);
        }else{
            commonUtil.giveMeRandomBooks(defaultNum,function(data){
                callback(data);
                bookshelfUtil.saveBookList(data);
            });
        }
    },
    renderPage:function(novelList){
        var html = bookshelfRender(novelList);
        $("#bookshelfFrame").html(html);
    },
    _filterNovelList:function(novelList){
        if(novelList){
            for(var i=0;i<novelList.length;i++){
                var novel = novelList[i];
            }
        }
    }

};

$(document).ready(function(){
    bookShelf.init();
});