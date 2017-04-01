"use strict";
var commonUtil = require('./util/MMCommonUtil');
var pullUtil = require('./pullUtil/pullPhotoUtil');
var index = {
    pno:0,
    init:function(){
        this.initPage();
        this.appendData();
        this.initListener();
    },
    appendData:function(){
        var _this = this;
        commonUtil.giveMeMMs(this.pno,function(data){
            if(typeof data=="string"){
                data = JSON.parse(data);
                console.log(data);
                var imgs = _this.parseImgs(data);
                pullUtil.addImgs(imgs);
                _this.pno++;
            }
        });
    },
    initPage:function(){
        pullUtil.init([],"photoFrame")
    },
    initListener:function(){

    },
    parseImgs:function(data){
        var returnValue = data.returnValue;
        var items = returnValue.items;
        var imgs = [];
        if(items){
            var item = items[0];
            for(var i=0;item;item = items[++i]){
                imgs.push(item["cover"]);
            }
        }
        return imgs;
    }
};


$(document).ready(function(){
    index.init();
});