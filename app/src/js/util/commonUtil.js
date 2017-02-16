"use strict";
var novelListAllUrl = '/blog/pl/nv/novelListAll';
var novelListPageUrl = '/blog/pl/nv/novelListPage';
var novelContentGetUrl = "/blog/pl/nv/getNovelContent";

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
                console.log(res);
                var status = res.status;
                if(callback){
                    callback(status.code,status.des,res.data,res);
                }
            }
        });
    },
    giveMeNovelListAll:function(callback){
        this._api(novelListAllUrl,{},function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    giveMeNovelListPage:function(pno,callback){
        this._api(novelListPageUrl,{
            pno:pno,
            psize:20
        },function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    giveMeNovelByIdAndChapter:function(novelId,chapter,callback){
        commonUtil._api(novelContentGetUrl,{
            novelId:novelId,
            chapter:chapter
        },function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    getQueryString:function(name,urldefault) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var url = urldefault || window.location.search.substr(1);
        var r = url.match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    }
};
module.exports = commonUtil;