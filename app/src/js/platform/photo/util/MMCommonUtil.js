"use strict";
var mmPhotoUrl = '/blog/pl/mm/getMMPhotos';

var commonUtil = {

    _api:function(url,data,callback){
        $.ajax({
            url:url,
            data:data,
            type : 'POST',
            dataType : 'json',
            timeout : 3e4,
            success:function(res){
                if(typeof res=="string"){
                    res = JSON.parse(res);
                }
                var status = res.status;
                if(callback){
                    callback(status.code,status.des,res.data,res);
                }
            }
        });
    },
    giveMeMMs:function(pno,callback){
        this._api(mmPhotoUrl,{
            pno:pno
        },function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    clone:function(obj){
        var objCp = {};
        for(var key in obj){
            var value = obj[key];
            if(typeof value == "object"){
                value = this.clone(value);
            }
            objCp[key]=value;
        }
        return objCp;
    }
};
module.exports = commonUtil;