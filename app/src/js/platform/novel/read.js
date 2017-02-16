"use strict";
require('./lib/novelCanvas');
var commonUtil = require('../../util/commonUtil');

var read = {
    novelId:140,
    init:function(){
        var _this = this;
        this.novelId = commonUtil.getQueryString("novelId")||this.novelId;
        var pno = 0;
        this.initReader(pno);
    },
    initReader:function(pno){
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
            currentArtIndex:pno,
            rect:{
                top:10,
                bottom:25,
                left:20,
                right:15
            },
            pullData:function(currentArtIndex,onGet){
                if(currentArtIndex>=0){
                    _this.getContentByPage(currentArtIndex,function(novel){
                        onGet(novel.content);
                    });
                }
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
