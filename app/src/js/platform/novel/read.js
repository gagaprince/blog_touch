"use strict";
require('./lib/novelCanvas');
var commonUtil = require('../../util/commonUtil');
var bookshelfUtil = require('../../util/bookshelfUtil');

var read = {
    novelId:140,
    init:function(){
        var _this = this;
        this.novelId = commonUtil.getQueryString("novelId")||this.novelId;
        var chapter = commonUtil.getQueryString("chapter");
        var cpObj = bookshelfUtil.getBookTag(this.novelId)||[0,0];
        var currentPage = 0;
        if(chapter==null){
            //url参数没有chapter参数 查看local中有没有
            chapter = cpObj[0];
            currentPage = cpObj[1];
        }else{
            if(chapter==cpObj[0]){
                currentPage = cpObj[1];
            }
        }
        chapter = parseInt(chapter);
        this.initReader(chapter,currentPage);
        bookshelfUtil.saveBookTag(this.novelId,chapter,currentPage);
    },
    initReader:function(chapter,currentPage){
        var _this = this;
        var height = $("body").height();
        var width = $("body").width();
        var devicePixelRatio = window.devicePixelRatio;
//        var art = novel.content;
        NovelCanvas.init({
            width:width,
            height:height,
            bgUrl:"http://img1.qunarzz.com/car/1702/98/bcea154fb2e12802.jpg",//"http://img1.qunarzz.com/car/1611/95/839845570c445c02.jpg",
            fontSize:16*devicePixelRatio,
            lineHeight:28*devicePixelRatio,
            scale:devicePixelRatio,
            fontColor:"#123456",
            turnType:1,
            currentArtIndex:chapter,
            currentPage:currentPage,
            rect:{
                top:20,
                bottom:35,
                left:20,
                right:15
            },
            pullData:function(currentArtIndex,onGet){
                if(currentArtIndex>=0){
                    _this.getContentByPage(currentArtIndex,function(novel){
                        onGet(novel);
                    });
                }
            },
            onPageTurn:function(currentChapter,pno){
                //可以记录自动书签
                console.log("当前章节："+currentChapter+"  当前页码："+pno);
                var novelId = commonUtil.getQueryString("novelId");
                bookshelfUtil.saveBookTag(novelId,currentChapter,pno);
            }
        });
    },
    getContentByPage:function(pno,callback){
        commonUtil.giveMeNovelByIdAndChapter(this.novelId,pno,function(data){
            if(callback){
                callback(data);
            }
        });

    }
};

window.onload=function(){
    read.init();
};
