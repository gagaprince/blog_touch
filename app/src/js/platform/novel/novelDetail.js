var commonUtil = require('../../util/commonUtil');
var LoadingUtil = require('../../util/loadingUtil');
var novelDetailRender = require('../../../../platform/novel/tpl/detailcontent.tpl');
var bookshelfUtil = require('../../util/bookshelfUtil');

var novelDetail = {
    novelId:"",
    novelData:null,
    init:function(){
        LoadingUtil.init();
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        LoadingUtil.show();
        this.initData(function(data){
            LoadingUtil.hide();
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
        $("#detailPage").html(html).show();
        $("img").error(function(){
            $(this).attr("src","http://www.37zw.com/d/image/3/3753/3753s.jpg");
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click","#readBtn",function(){
            bookshelfUtil.addBook(_this.novelData);
            window.location.href = "read.html?novelId="+_this.novelId;
        });
        $("body").on("click",".novel-index-item",function(){
            bookshelfUtil.addBook(_this.novelData);
            var chapter = $(this).attr("chapter");
            window.location.href = "read.html?novelId="+_this.novelId+"&chapter="+chapter;
        });
    }
};
$(document).ready(function(){
    novelDetail.init();
});
