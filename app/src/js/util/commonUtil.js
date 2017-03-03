"use strict";
var novelListAllUrl = '/blog/pl/nv/novelListAll';
var novelListPageUrl = '/blog/pl/nv/novelListPage';
var novelCateListPageUrl = '/blog/pl/nv/novelCateListPage';
var novelContentGetUrl = "/blog/pl/nv/getNovelContent";
var novelIndexListPageUrl = '/blog/pl/nv/novelIndexListPage';
var novelRandomBooksUrl = '/blog/pl/nv/novelRandomBooks';
var novelInfoByIdUrl = '/blog/pl/nv/novelById';
var novelRecommendUrl = '/blog/pl/nv/recommendPage';

var NOVEL_LOCAL_KEY='blog_touch_novel_history';

var commonUtil = {
    novelHistory:null,
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
    giveMeNovelCateListPage:function(pno,cate,callback){
        this._api(novelCateListPageUrl,{
            pno:pno,
            psize:20,
            cate:cate
        },function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    giveMeNovelIndexListPage:function(novelId,pno,callback){
        this._api(novelIndexListPageUrl,{
            novelId:novelId,
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
    giveMeRandomBooks:function(num,callback){
        commonUtil._api(novelRandomBooksUrl,{
            num:num
        },function(code,des,data,res){
            if(code==0){
                if(callback){
                    callback(data);
                }
            }
        });
    },
    giveMeNovelById:function(id,callback){
        if(!callback)return;
        commonUtil._api(novelInfoByIdUrl,{
            id:id
        },function(code,des,data,res){
            if(code==0){
                callback(data);
            }
        });
    },
    giveMeNovelAllById:function(id,callback){
        if(!callback)return;
        commonUtil._api(novelInfoByIdUrl,{
            id:id,
            needAll:1
        },function(code,des,data,res){
            if(code==0){
                callback(data);
            }
        });
    },
    giveMeRecommendData:function(callback){
        if(!callback)return;
        commonUtil._api(novelRecommendUrl,{},function(code,des,data,res){
            if(code==0){
                callback(data);
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
    },
    initLocal:function(){
        if(!this.novelHistory){
            this.novelHistory = localStorage.getItem(NOVEL_LOCAL_KEY);
            if(!this.novelHistory){
                this.novelHistory = {

                };
            }else{
                this.novelHistory = JSON.parse(this.novelHistory);
            }
        }
    },
    saveLocal:function(novelId,chapter,pno) {
        this.initLocal();
        this.novelHistory[novelId] = [chapter, pno];
        localStorage.setItem(NOVEL_LOCAL_KEY,JSON.stringify(this.novelHistory));

    },
    getLocal:function(novelId){
        this.initLocal();
        return this.novelHistory[novelId];
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