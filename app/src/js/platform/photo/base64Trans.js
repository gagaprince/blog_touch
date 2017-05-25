"use strict";

var commonUtil = require('./util/commonUtil');
var transLoadUrl = "/blog/pl/mm/base64LoadTrans";

var timeout = null;

var base64Page = {
    init:function(){
        this.initListener();
    },
    initListener:function(){
        var _this = this;
        $("#transBtn").on("click",function(){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(function(){
                var img = $("#imgUrl").val().trim();
                if(img){
                    commonUtil._api(transLoadUrl,{
                        photoUrl:img
                    },function(code,des,data,res){
//                        console.log(res);
                        if(code==0){
                            var domainImg = data;
                            _this.createBase64Img(domainImg);
                        }
                        timeout = null;
                    });
                    /*_this.createBase64Img({
                     url:img,
                     ext:"png" //跨域不行
                     });*/
                }
            },300);
        });
    },
    createBase64Img:function(urlObj){
        var img = new Image();
        img.src = urlObj.url;
        img.onload=function(){
            var iw = img.width;
            var ih = img.height;
            var $canvas = $("<canvas></canvas>");
            var c = $canvas[0];
            var ctx = c.getContext("2d");
            $canvas.attr("width",iw);
            $canvas.attr("height",ih);
            ctx.drawImage(img,0,0,iw,ih,0,0,iw,ih);
            var base64Str = c.toDataURL("image/"+urlObj.ext);
            $("#result").val(base64Str);
        }
    }
};

$(function(){
    base64Page.init();
});