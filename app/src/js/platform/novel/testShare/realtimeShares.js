var commonUtil = require('../util/NovelCommonUtil');

var realtimeSharesApi = "/shares/realTimeCheck";

var realtimeShares = {
    init:function(){
        this.initTimer();
    },
    initTimer:function(){
        var _this = this;
        setInterval(function(){
            commonUtil._api(realtimeSharesApi,{},function(code,des,data,res){
                console.log(res);
                var resultMap = res;

                var resultList = res.hasOver;

                var openhtml = "";
                for(var i=0;i<resultList.length;i++){
                    var result = resultList[i];
                    openhtml += '<div class="share-item h-c">'+
                        '<div class="code">'+result.code+'</div>'+
                        '<div class="name">'+result.name+'</div>'+
                        '</div>';
                }
                $("#opensharesList").html(openhtml);


                resultList = res.currentOver;
                var html = "";
                for(var i=0;i<resultList.length;i++){
                    var result = resultList[i];
                    html += '<div class="share-item h-c">'+
                        '<div class="code">'+result.code+'</div>'+
                        '<div class="name">'+result.name+'</div>'+
                        '</div>';
                }
                $("#sharesList").html(html);

            });
        },5000);
    }
}

$(function(){
    realtimeShares.init();
})