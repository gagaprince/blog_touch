"use strict";
var HClass = require('../../../util/HClass');
var Img = HClass.extend({
    src:"",
    width:0,
    height:0,
    loadNum:0,

    loadCall:null,
    ctor:function(src,loadCall){
        this.src = src;
        this.loadCall = loadCall;
        this.initLoad();
    },

    initLoad:function(){
        var _this = this;
        this.load(function(img){
            _this.width = img.width;
            _this.height = img.height;
            if(_this.loadCall){
                _this.loadCall(_this,true);
            }
        },function(img){
            if(_this.loadCall){
                _this.loadCall(_this,false);
            }
        });
    },
    addLoadCallListener:function(loadCall){
        this.loadCall = loadCall;
    },

    load:function(onSuccess,onFailed){
        if(this.src&&onSuccess){
            var _this = this;
            var img = new Image();
            img.src = this.src;
            img.onload = function(){
                onSuccess(img);
            }
            img.onerror = function(){
                _this.loadNum++;
                if(_this.loadNum<=3){
                    _this.load(onSuccess,onFailed)
                }else{
                    onFailed(img);
                }
            }
        }
    }
});

module.exports = Img;