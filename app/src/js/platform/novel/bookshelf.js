"use strict";
var commonUtil = require('../../util/commonUtil');
var bookshelfUtil = require('../../util/bookshelfUtil');
var bookshelfRender = require('../../../../platform/novel/tpl/bookshelf-list.tpl');
var defaultNum = 6;

var bookShelf = {
    bookShelfState:0,//0正常状态，1 编辑状态
    novelList:null,
    updateMap:null,
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        this.initBookList(function(novelList){
            _this.novelList = novelList;
            var renderObj = {
                state:_this.bookShelfState,
                novelList:_this.cloneNovelList(novelList)
            }
            _this.renderPage(renderObj);
            _this.checkUpdate();
        });
    },
    checkUpdate:function(){
        //检测更新情况
        var _this = this;
        var novelList = this.novelList;
        var len = novelList.length;
        var ids = "";
        for(var i=0;i<len;i++){
            var novel = novelList[i];
            ids+=","+novel.id;
        }
        if(ids){
            ids = ids.substring(1);
        }
        if(ids){
            commonUtil.giveMeNovelsByIds(ids,function(data){
                console.log(data);
                _this.updateMap = _this._makeUpdateMap(data);
                _this.renderUpdate();
            });
        }
    },
    _makeUpdateMap:function(novelList){
        var novelMap = {};
        var len = novelList.length;
        for(var i=0;i<len;i++){
            var novel = novelList[i];
            var id = novel.id;
            novelMap[id] = novel;
        }
        return novelMap;
    },
    renderUpdate:function(){
        var novelList = this.novelList;
        var updateMap = this.updateMap;
        if(novelList&&updateMap&&novelList.length>0){
            var len = novelList.length;
            for(var i=0;i<len;i++){
                var novel = novelList[i];
                var id = novel.id;
                var novelUpdate = updateMap[id];
                if(novel.updateTime!=novelUpdate.updateTime){
                    //更新了
                    this.renderUpdateNovel(novel);
                }
            }
        }
    },
    renderUpdateNovel:function(novel){
        var id = novel.id;
        $("#novel_"+id).find(".update").show();
    },
    updateBookShelfWidthNew:function(novelId){
        var updateMap = this.updateMap;
        var newNovel = updateMap[novelId];
        bookshelfUtil.updateBook(newNovel);
        $("#novel_"+novelId).find(".update").hide();
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".bookItem",function(){
            //查看是否有章节信息 如果有 直接跳转
            //如果没有 跳转到详情页
            if(_this.bookShelfState==0){
                var novelId = $(this).attr("novelId");
                window.location.href = "detail.html?novelId="+novelId;
                //更新bookshelf中的updateTime
                _this.updateBookShelfWidthNew(novelId);
            }
        });
        $("body").on("click",".bookAddBtn",function(){
            //跳转到列表页
            if(_this.bookShelfState==0) {
                window.location.href = "index.html";
            }
        });
        $("body").on("click","#bjBtn",function(){
            if(_this.bookShelfState==0){
                $(".remove-btn").show();
                _this.bookShelfState = 1;
                $(this).html("完成");
            }else{
                $(".remove-btn").hide();
                _this.bookShelfState = 0;
                $(this).html("编辑");
            }
        });
        $("body").on("click",".remove-btn",function(){
            var novelId = $(this).attr("novelId");
            bookshelfUtil.removeBookById(novelId);
            _this.initPage();
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
            if(!bookshelfUtil.isHasGetInitBook()){
                commonUtil.giveMeRandomBooks(defaultNum,function(data){
                    callback(data);
                    bookshelfUtil.saveBookList(data);
                });
            }else{
                callback([]);
            }

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
    },
    cloneNovelList:function(novelList){
        var novelListCp = [];
        for(var i=0;i<novelList.length;i++){
            var novel = novelList[i];
            var novelCp = commonUtil.clone(novel);
            novelListCp.push(novelCp);
        }
        return novelListCp;
    }
};

$(document).ready(function(){
    bookShelf.init();
});