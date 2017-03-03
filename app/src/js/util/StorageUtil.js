"use strict";

var localStorage = window.localStorage;

var StorageUtil = {

    setItem:function(key,obj){
        if(localStorage&&localStorage.setItem){
            if(obj){
                var saveItem = obj;
                if(typeof obj=="object"){
                    saveItem = JSON.stringify(obj);
                }
                localStorage.setItem(key,saveItem);
            }
        }

    },
    getItem:function(key){
        if(localStorage&&localStorage.getItem) {
            var obj = localStorage.getItem(key);
            if (obj) {
                obj = JSON.parse(obj);
            }
            return obj;
        }
        return null;
    },
    removeItem:function(key){
        if(localStorage&&localStorage.removeItem) {
            localStorage.removeItem(key);
        }
    }
};
module.exports = StorageUtil;