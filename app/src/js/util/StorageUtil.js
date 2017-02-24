"use strict";

var localStorage = window.localStorage;

var StorageUtil = {
    setItem:function(key,obj){
        if(obj){
            var saveItem = obj;
            if(typeof obj=="object"){
                saveItem = JSON.stringify(obj);
            }
            localStorage.setItem(key,saveItem);
        }
    },
    getItem:function(key){
        var obj = localStorage.getItem(key);
        if(obj){
            obj = JSON.parse(obj);
        }
        return obj;
    }
};
module.exports = StorageUtil;