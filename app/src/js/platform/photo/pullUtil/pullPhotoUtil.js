"use strict";
var Img = require('./img');


var pullUtil = {
    imgs:null,//放置Imgs
    id:"",
    dom:null,
    init:function(imgSrcList,id){
        this.imgs = [];
        this.id = id;
        this.dom = $("#"+id);
        this.addImgs(imgSrcList);
    },
    createSuccessCall:function(num,imgList,loadComplete){
        return function(img,isSuccess){
            num--;
            if(!isSuccess){
                //如果没有成功要将其从列表中去除
                for(var i=0;i<imgList.length;i++){
                    var imgIn = imgList[i];
                    if(imgIn == img){
                        imgList.splice(i,1);
                        break;
                    }
                }
            }
            if(num==0){
                loadComplete();
            }
        }
    },
    addImgs:function(imgs){
        if(imgs){
            var imgList = [];
            var _this = this;
            var fun = this.createSuccessCall(imgs.length,imgList,function(){
                //所有图片都加载完毕 且 没有成功的图片被删掉了
                for(var i=0;i<imgList.length;i++){
                    var imgIn = imgList[i];
                    _this.imgs.push(imgIn);
                    _this.render(imgList);
                }
            });
            var img = imgs[0];
            for(var i=0;img;img = imgs[++i]){
                var imgObj = new Img(img,fun);
                imgList.push(imgObj);
            }
        }
    },
    render:function(imgList){

    }
};
module.exports = pullUtil;