var commonUtil = require('../../util/commonUtil');
var novelDetailRender = require('../../../../platform/novel/tpl/detailcontent.tpl');

var novelDetail = {
    novelId:"",
    novelData:null,
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        this.initData(function(data){
            _this.renderPage(data);
        });
    },
    initData:function(callback){
        if(!callback){
            return;
        }
        var novelId =this.novelId = commonUtil.getQueryString("novelId");
        var _this = this;
        commonUtil.giveMeNovelAllById(novelId,function(data){
            _this.novelData = data;
            callback(data);
        })
    },
    renderPage:function(novelData){
        console.log(novelData);
        var html = novelDetailRender(novelData);
        $("body").html(html);
    },
    initListener:function(){
        var _this = this;
        $("body").on("click","#readBtn",function(){
            window.location.href = "read.html?novelId="+_this.novelId;
        });
        $("body").on("click",".novel-index-item",function(){
            var chapter = $(this).attr("chapter");
            window.location.href = "read.html?novelId="+_this.novelId+"&chapter="+chapter;
        });
    }
};
$(document).ready(function(){
    novelDetail.init();
});
