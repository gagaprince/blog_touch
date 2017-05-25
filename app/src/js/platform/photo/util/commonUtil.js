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
    }
}
module.exports = commonUtil;