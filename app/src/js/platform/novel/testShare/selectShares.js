var commonUtil = require('../util/NovelCommonUtil');

var threeSharesApi = "/shares/selectSharesByThreeK";

var selectShares = {
    init:function(){
        this.initDate();
        this.initListener();
    },
    initDate:function(){
        var today = this.giveMeToday();
        $("#sharesDate").val(today);
    },
    giveMeToday:function(){
        return this.giveMeDate(new Date());
    },
    giveMeDate:function(date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        return year+"-"+month+"-"+day;
    },
    initListener:function(){
        $("#threeBtn").on("click",function(){
           var date = $("#sharesDate").val();
            $("#sharesList").html('<div class="share-item h-c">正在计算....</div>');
            if(date){
                commonUtil._api(threeSharesApi,{
                    date:date
                },function(code,des,data,res){
                    console.log(res);
                    var resultList = res.resultList;
                    var html = "";
                    for(var i=0;i<resultList.length;i++){
                        var result = resultList[i];
                        html += '<div class="share-item h-c">'+
                            '<div class="code">'+result.codeAll+'</div>'+
                            '<div class="name">'+result.name+'</div>'+
                            '</div>';
                    }
                    $("#sharesList").html(html);
                });
            }
        });


    }
}

$(function(){
    selectShares.init();
})