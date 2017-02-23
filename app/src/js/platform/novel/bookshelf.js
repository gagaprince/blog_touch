var commonUtil = require('../../util/commonUtil');
var bookshelfRender = require('../../../../platform/novel/tpl/bookshelf-list.tpl');
var defaultNum = 16;

var bookShelf = {
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        this.renderPage();
    },
    initListener:function(){},
    renderPage:function(){
        commonUtil.giveMeRandomBooks(defaultNum,function(data){
            var novelList = data;
            var html = bookshelfRender(novelList);
            $("#bookshelfFrame").html(html);
        });
    },
    _filterNovelList:function(novelList){
        if(novelList){
            for(var i=0;i<novelList.length;i++){
                var novel = novelList[i];

            }
        }
    }

};

$(document).ready(function(){
    bookShelf.init();
});